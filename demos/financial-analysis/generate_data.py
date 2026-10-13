"""Build a public financial-ratio learning dataset without reading local files."""

from __future__ import annotations

import json
import math
import random
from pathlib import Path

import numpy as np
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler


SEED = 20261013
FEATURES = [
    {"id": "grossMargin", "en": "Gross margin", "zh": "毛利率", "formula": "(revenue - cost) / revenue"},
    {"id": "receivableRevenue", "en": "Receivables / revenue", "zh": "应收账款 / 营收", "formula": "receivables / revenue"},
    {"id": "cashRevenue", "en": "Operating cash / revenue", "zh": "经营现金流 / 营收", "formula": "operatingCash / revenue"},
    {"id": "debtAssets", "en": "Liabilities / assets", "zh": "资产负债率", "formula": "liabilities / assets"},
    {"id": "expenseRevenue", "en": "Operating expenses / revenue", "zh": "期间费用 / 营收", "formula": "expenses / revenue"},
]


def safe_ratio(numerator: float | None, denominator: float | None) -> float | None:
    """Zero numerators are valid; absent or zero denominators are not."""
    if numerator is None or denominator is None:
        return None
    if not math.isfinite(numerator) or not math.isfinite(denominator) or denominator == 0:
        return None
    return numerator / denominator


def ratios(record: dict) -> dict:
    revenue = record["revenue"]
    cost = record["cost"]
    gross = revenue - cost if revenue is not None and cost is not None else None
    return {
        "grossMargin": safe_ratio(gross, revenue),
        "receivableRevenue": safe_ratio(record["receivables"], revenue),
        "cashRevenue": safe_ratio(record["operatingCash"], revenue),
        "debtAssets": safe_ratio(record["liabilities"], record["assets"]),
        "expenseRevenue": safe_ratio(record["expenses"], revenue),
    }


def impute_medians(matrix: np.ndarray) -> tuple[np.ndarray, list[float]]:
    values = np.asarray(matrix, dtype=float).copy()
    medians = []
    for column in range(values.shape[1]):
        finite = values[np.isfinite(values[:, column]), column]
        if not len(finite):
            raise ValueError("Cannot impute a feature with no finite observations")
        median = float(np.median(finite))
        medians.append(median)
        values[~np.isfinite(values[:, column]), column] = median
    return values, medians


def relative_distance_scores(distances: np.ndarray) -> np.ndarray:
    """A within-scenario distance scale, never a probability or risk assessment."""
    values = np.asarray(distances, dtype=float)
    if not np.all(np.isfinite(values)) or np.any(values < 0):
        raise ValueError("Distances must be finite and non-negative")
    if len(values) == 0:
        return values.copy()
    span = float(values.max() - values.min())
    if span <= 1e-12:
        return np.zeros_like(values)
    return 100 * (values - values.min()) / span


def synthetic_records() -> list[dict]:
    rng = random.Random(SEED)
    records = []
    # Sector-specific ranges expose scale effects without simulating violations.
    sectors = ["services", "manufacturing", "retail"]
    for company in range(1, 25):
        sector = sectors[(company - 1) % 3]
        base_revenue = rng.uniform(260, 3600)
        base_assets = base_revenue * rng.uniform(0.9, 2.8)
        for year in (2023, 2024):
            revenue = base_revenue * rng.uniform(0.84, 1.25)
            assets = base_assets * rng.uniform(0.92, 1.16)
            margin = rng.uniform(0.32, 0.64) if sector == "services" else rng.uniform(0.11, 0.39)
            record = {
                "id": f"S{company:02d}", "year": year, "sector": sector,
                "revenue": round(revenue, 2), "cost": round(revenue * (1 - margin), 2),
                "receivables": round(revenue * rng.uniform(0.04, 0.58), 2),
                "operatingCash": round(revenue * rng.uniform(-0.10, 0.30), 2),
                "assets": round(assets, 2), "liabilities": round(assets * rng.uniform(0.16, 0.76), 2),
                "expenses": round(revenue * rng.uniform(0.04, 0.23), 2),
            }
            if company == 6:
                record["receivables"] = 0.0
            if company == 9:
                record["operatingCash"] = 0.0
            if company == 12 and year == 2024:
                record["revenue"] = 0.0
            if company == 15 and year == 2023:
                record["assets"] = 0.0
            if company == 18:
                record["receivables"] = None
            if company == 21 and year == 2024:
                record["expenses"] = None
            records.append(record)
    return sorted(records, key=lambda record: (record["year"], record["id"]))


def build_dataset() -> dict:
    records = synthetic_records()
    scenarios = {}
    feature_ids = [feature["id"] for feature in FEATURES]
    for year in (2023, 2024):
        selected = [record for record in records if record["year"] == year]
        observed = [ratios(record) for record in selected]
        matrix = np.array([[row[key] if row[key] is not None else np.nan for key in feature_ids] for row in observed])
        imputed, medians = impute_medians(matrix)
        scaler = StandardScaler()
        standardized = scaler.fit_transform(imputed)
        pca = PCA(n_components=2, svd_solver="full")
        projection = pca.fit_transform(standardized)
        distance = np.linalg.norm(standardized - standardized.mean(axis=0), axis=1)
        scores = relative_distance_scores(distance)
        variants = {}
        for clusters in (2, 3, 4):
            model = KMeans(n_clusters=clusters, random_state=42, n_init=20)
            labels = model.fit_predict(standardized)
            variants[str(clusters)] = {
                "inertia": round(float(model.inertia_), 6),
                "rows": [
                    {
                        "id": record["id"], "sector": record["sector"],
                        "ratios": {key: round(value, 8) if value is not None else None for key, value in observed[index].items()},
                        "imputedRatios": {key: round(float(imputed[index, j]), 8) for j, key in enumerate(feature_ids)},
                        "missingFeatures": [key for key in feature_ids if observed[index][key] is None],
                        "cluster": int(labels[index]) + 1,
                        "pca": [round(float(coordinate), 8) for coordinate in projection[index]],
                        "distanceScore": round(float(scores[index]), 3),
                    }
                    for index, record in enumerate(selected)
                ],
            }
        scenarios[str(year)] = {
            "medians": {key: round(value, 8) for key, value in zip(feature_ids, medians)},
            "explainedVariance": [round(float(value), 8) for value in pca.explained_variance_ratio_],
            "standardization": {"mean": scaler.mean_.tolist(), "scale": scaler.scale_.tolist()},
            "variants": variants,
        }
    return {
        "metadata": {
            "datasetType": "synthetic_learning_example", "recordCount": len(records), "companyCount": 24,
            "unit": "simulated CNY 10,000", "generatorSeed": SEED,
            "model": "scikit-learn 1.7.2", "nInit": 20, "modelSeed": 42,
            "distanceScore": "Min-max scaled distance to the annual mean in standardized five-feature space; not a risk probability.",
            "missingPolicy": "Zero denominators and missing inputs produce null; annual feature medians impute clustering inputs only.",
        },
        "features": FEATURES, "records": records, "scenarios": scenarios,
    }


if __name__ == "__main__":
    destination = Path(__file__).with_name("data.json")
    dataset = build_dataset()
    destination.write_text(json.dumps(dataset, ensure_ascii=False, indent=2, allow_nan=False) + "\n", encoding="utf-8")
    print(f"Built {len(dataset['records'])} synthetic records and 6 clustering scenarios: {destination.name}")
