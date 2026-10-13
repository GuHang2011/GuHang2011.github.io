"""Meaningful data-quality and reproducibility checks for the learning demo."""

import json
import unittest

import numpy as np

from generate_data import build_dataset, impute_medians, relative_distance_scores, safe_ratio, synthetic_records


class DataQualityTests(unittest.TestCase):
    def test_zero_is_valid_and_zero_denominator_is_missing(self):
        self.assertEqual(safe_ratio(0, 12), 0)
        self.assertEqual(safe_ratio(-3, 12), -0.25)
        for numerator, denominator in [(3, 0), (None, 12), (3, None), (float("nan"), 12)]:
            self.assertIsNone(safe_ratio(numerator, denominator))

    def test_imputation_preserves_observed_zero_and_uses_median(self):
        matrix = np.array([[0, 2], [np.nan, 4], [8, np.nan]])
        actual, medians = impute_medians(matrix)
        np.testing.assert_array_equal(actual, [[0, 2], [4, 4], [8, 3]])
        self.assertEqual(medians, [4, 3])
        self.assertTrue(np.isnan(matrix[1, 0]))

    def test_empty_feature_fails_instead_of_inventing_values(self):
        with self.assertRaisesRegex(ValueError, "no finite observations"):
            impute_medians(np.array([[np.nan], [np.nan]]))

    def test_all_equal_distance_has_zero_relative_score(self):
        np.testing.assert_array_equal(relative_distance_scores([2, 2, 2]), [0, 0, 0])
        np.testing.assert_allclose(relative_distance_scores([1, 2, 3]), [0, 50, 100])
        with self.assertRaises(ValueError):
            relative_distance_scores([0, np.nan])

    def test_synthetic_keys_and_generation_are_stable(self):
        records = synthetic_records()
        self.assertEqual(records, synthetic_records())
        self.assertEqual(len(records), 48)
        self.assertEqual(len({(row["id"], row["year"]) for row in records}), 48)
        self.assertEqual(len({row["id"] for row in records}), 24)

    def test_scenarios_are_finite_and_preserve_missing_observations(self):
        dataset = build_dataset()
        json.dumps(dataset, allow_nan=False)
        for year, scenario in dataset["scenarios"].items():
            self.assertEqual(set(scenario["variants"]), {"2", "3", "4"})
            for key, variant in scenario["variants"].items():
                self.assertEqual(len(variant["rows"]), 24)
                self.assertEqual({row["cluster"] for row in variant["rows"]}, set(range(1, int(key) + 1)))
                for row in variant["rows"]:
                    self.assertTrue(0 <= row["distanceScore"] <= 100)
                    self.assertEqual(set(row["missingFeatures"]), {feature for feature, value in row["ratios"].items() if value is None})
                    self.assertTrue(all(np.isfinite(value) for value in row["pca"]))
        zero = next(row for row in dataset["scenarios"]["2024"]["variants"]["3"]["rows"] if row["id"] == "S06")
        self.assertEqual(zero["ratios"]["receivableRevenue"], 0)
        self.assertEqual(zero["imputedRatios"]["receivableRevenue"], 0)
        missing = next(row for row in dataset["scenarios"]["2024"]["variants"]["3"]["rows"] if row["id"] == "S12")
        self.assertIsNone(missing["ratios"]["grossMargin"])
        self.assertTrue(np.isfinite(missing["imputedRatios"]["grossMargin"]))


if __name__ == "__main__":
    unittest.main()
