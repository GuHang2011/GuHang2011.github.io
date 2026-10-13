# Model Evaluation Lab / 模型评估实验室

[Open the interactive demo](https://guhang2011.github.io/demos/model-evaluation/) · [方法与学习笔记](note.md)

An original synthetic teaching example: 24 fixed binary-labelled samples, plus a two-sample sanity check. Model A and Model B are names for supplied score columns, **not trained models**. No research performance, dataset ownership, or reproduced paper result is claimed.

## The main comparison

With labels `[1, 0]`, scores A `[0.9, 0.6]`, scores B `[0.4, 0.2]`, and threshold `0.5`:

| Operation | Result |
|---|---:|
| A accuracy | 0.5 |
| B accuracy | 0.5 |
| Mean of individual accuracies | 0.5 |
| Accuracy of mean scores `[0.65, 0.4]` | 1.0 |

This difference illustrates that averaging evaluation metrics and evaluating averaged predictions are different operations. It does not prove that ensembling always improves performance.

## Code map

| File | Purpose |
|---|---|
| `scenario-input.json` | Original fixed synthetic IDs, labels, and two score columns |
| `build_metrics.py` | Offline scikit-learn calculation: 101 thresholds, confusion matrices, predictions, ROC AUC, PR curves, average precision |
| `metrics.json` | Reproducible static output consumed by the browser |
| `test_build.py` | Eight checks: known example, equality boundary, zero denominator, threshold endpoints, count conservation, perfect ranking, bad inputs, determinism |
| `evaluation.js` | Scenario/model/threshold controls, Chart.js views, sample filtering, JSON/CSV exports |
| `evaluation.css` | Responsive styling for this demo |
| `index.html` | Accessible Chinese/English page and data tables |

## Reproduce

Python 3.12 is the tested interpreter. Install the pinned metric library in an isolated environment:

```bash
python -m venv .venv
# Windows (PowerShell): .\.venv\Scripts\Activate.ps1
# macOS / Linux: source .venv/bin/activate
python -m pip install -r requirements.txt
python build_metrics.py
python -m unittest -v test_build
```

Serve the **site root**, which contains the shared styles and Chart.js vendor bundle:

```bash
python -m http.server 8000
```

Open `/demos/model-evaluation/`. No runtime backend or training service is needed. The browser reads only the committed static metric file; scikit-learn performs the evaluation during the build. Inputs are fixed, so this example does not need a random seed. The generator records the input SHA-256 and scikit-learn version.

## Metric conventions and limits

- Positive means `score >= threshold`; thresholds run from `0.00` to `1.00`, step `0.01`.
- Precision, recall and F1 use `zero_division=0`. No-positive-prediction precision therefore appears as `0`, not a missing value.
- The PR curve's conventional final point is `(recall=0, precision=1)`; the current-threshold dot follows the explicit `zero_division=0` hard-label metric convention instead.
- ROC AUC and AP use every unique score boundary rather than only the 101 slider positions. AP is scikit-learn's recall-increment weighted precision, not a trapezoidal PR AUC.
- ROC/PR metrics do not change when the decision threshold changes. Confusion matrices and hard-label metrics do.
- JSON and CSV contain **all samples in the selected scenario**, including predictions from all three score columns. The visible sample filter does not silently remove export rows.
- Balanced fixed teaching data cannot establish population performance, calibration, confidence intervals, fairness, or generalization. The two-sample case is too small for scientific conclusions.
- A real experiment must select thresholds/checkpoints using validation data, freeze the procedure, and report held-out test results separately.

## Reading provenance

The distinction between run-level summaries and prediction ensembles was explored while reading the public MIT-licensed [KANO repository](https://github.com/ZJU-Fangyin/KANO). This demo uses new synthetic inputs and original example code. It does not copy that repository's source or claim the upstream work as a personal project. The original project and its authors retain their attribution.

Metric definitions: [scikit-learn model evaluation](https://scikit-learn.org/1.7/modules/model_evaluation.html) · [average_precision_score](https://scikit-learn.org/1.7/modules/generated/sklearn.metrics.average_precision_score.html). Charts use the site's local [Chart.js](https://www.chartjs.org/) vendor bundle.
