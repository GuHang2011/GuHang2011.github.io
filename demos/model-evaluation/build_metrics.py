"""Build static teaching metrics with scikit-learn; no model training is performed."""

import hashlib
import json
from pathlib import Path

import numpy as np
import sklearn
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    average_precision_score,
    precision_recall_curve,
    roc_auc_score,
    roc_curve,
)

BASE = Path(__file__).resolve().parent
THRESHOLDS = np.arange(101) / 100


def validate_samples(samples):
    if not samples:
        raise ValueError("A scenario must have samples")
    if len({sample["id"] for sample in samples}) != len(samples):
        raise ValueError("Sample IDs must be unique")
    for sample in samples:
        if sample["label"] not in (0, 1):
            raise ValueError("Labels must be binary")
        for model in ("a", "b"):
            if not isinstance(sample[model], (float, int)) or not np.isfinite(sample[model]):
                raise ValueError("Scores must be finite numbers")
            if not 0 <= sample[model] <= 1:
                raise ValueError("Scores must be in [0, 1]")
    if len({sample["label"] for sample in samples}) != 2:
        raise ValueError("Both classes are required for ROC AUC")


def rounded(value):
    return round(float(value), 8)


def model_metrics(labels, scores):
    rows = []
    for threshold in THRESHOLDS:
        prediction = scores >= threshold
        tn, fp, fn, tp = confusion_matrix(labels, prediction, labels=[0, 1]).ravel()
        rows.append({
            "threshold": rounded(threshold),
            "accuracy": rounded(accuracy_score(labels, prediction)),
            "precision": rounded(precision_score(labels, prediction, zero_division=0)),
            "recall": rounded(recall_score(labels, prediction, zero_division=0)),
            "f1": rounded(f1_score(labels, prediction, zero_division=0)),
            "tn": int(tn), "fp": int(fp), "fn": int(fn), "tp": int(tp),
            "predictions": prediction.astype(int).tolist(),
        })
    fpr, tpr, _ = roc_curve(labels, scores, drop_intermediate=False)
    precision, recall, _ = precision_recall_curve(labels, scores)
    return {
        "scores": [rounded(score) for score in scores],
        "thresholds": rows,
        "auc": rounded(roc_auc_score(labels, scores)),
        "averagePrecision": rounded(average_precision_score(labels, scores)),
        "roc": [{"x": rounded(x), "y": rounded(y)} for x, y in zip(fpr, tpr)],
        "pr": [{"x": rounded(x), "y": rounded(y)} for x, y in zip(recall, precision)],
    }


def build_scenario(scenario):
    samples = scenario["samples"]
    validate_samples(samples)
    labels = np.array([sample["label"] for sample in samples])
    a = np.array([sample["a"] for sample in samples])
    b = np.array([sample["b"] for sample in samples])
    return {
        "id": scenario["id"], "name": scenario["name"], "samples": samples,
        "positiveCount": int(np.sum(labels)), "negativeCount": int(len(labels) - np.sum(labels)),
        "models": {
            "a": model_metrics(labels, a),
            "b": model_metrics(labels, b),
            "ensemble": model_metrics(labels, (a + b) / 2),
        },
    }


def build_payload(source):
    return {
        "schemaVersion": 1,
        "generator": {"library": "scikit-learn", "version": sklearn.__version__,
                      "inputSha256": hashlib.sha256(source).hexdigest(),
                      "decisionRule": "score >= threshold", "zeroDivision": 0},
        "scenarios": [build_scenario(scenario) for scenario in json.loads(source)["scenarios"]],
    }


def serialize(payload):
    return json.dumps(payload, ensure_ascii=False, separators=(",", ":"), allow_nan=False) + "\n"


if __name__ == "__main__":
    source = (BASE / "scenario-input.json").read_bytes()
    payload = build_payload(source)
    output = BASE / "metrics.json"
    output.write_text(serialize(payload), encoding="utf-8", newline="\n")
    print(f"Built {len(payload['scenarios'])} scenarios, 101 thresholds per model -> {output.name}")
