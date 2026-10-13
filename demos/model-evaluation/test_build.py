"""Regression checks for teaching claims and metric edge cases."""

import copy
import json
import math
import unittest

from build_metrics import BASE, build_payload, build_scenario, serialize


class EvaluationChecks(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.source = (BASE / "scenario-input.json").read_bytes()
        cls.input = json.loads(cls.source)
        cls.payload = build_payload(cls.source)
        cls.sanity = cls.payload["scenarios"][0]

    def test_metric_average_is_not_prediction_ensemble(self):
        models = self.sanity["models"]
        average_accuracy = (models["a"]["thresholds"][50]["accuracy"] +
                            models["b"]["thresholds"][50]["accuracy"]) / 2
        self.assertEqual(average_accuracy, 0.5)
        self.assertEqual(models["ensemble"]["thresholds"][50]["accuracy"], 1.0)
        self.assertEqual(models["ensemble"]["scores"], [0.65, 0.4])

    def test_boundary_rule_includes_equal_scores(self):
        row = self.sanity["models"]["b"]["thresholds"][40]
        self.assertEqual((row["tn"], row["fp"], row["fn"], row["tp"]), (1, 0, 0, 1))

    def test_no_positive_prediction_has_defined_zero_precision(self):
        for model in self.sanity["models"].values():
            row = model["thresholds"][100]
            self.assertEqual((row["precision"], row["recall"], row["f1"]), (0, 0, 0))
            self.assertEqual((row["tn"], row["fn"]), (1, 1))

    def test_zero_threshold_predicts_every_sample_positive(self):
        for scenario in self.payload["scenarios"]:
            for model in scenario["models"].values():
                row = model["thresholds"][0]
                self.assertEqual((row["tn"], row["fn"]), (0, 0))
                self.assertEqual(row["tp"], scenario["positiveCount"])
                self.assertEqual(row["fp"], scenario["negativeCount"])

    def test_counts_and_finite_metrics_for_every_threshold(self):
        for scenario in self.payload["scenarios"]:
            for model in scenario["models"].values():
                self.assertEqual(len(model["thresholds"]), 101)
                for row in model["thresholds"]:
                    self.assertEqual(sum(row[key] for key in ("tn", "fp", "fn", "tp")), len(scenario["samples"]))
                    for key in ("accuracy", "precision", "recall", "f1"):
                        self.assertTrue(math.isfinite(row[key]) and 0 <= row[key] <= 1)

    def test_perfect_ranking_auc_and_average_precision(self):
        for model in self.sanity["models"].values():
            self.assertEqual((model["auc"], model["averagePrecision"]), (1, 1))

    def test_rejects_invalid_input_instead_of_silently_generating(self):
        for field, value in (("label", 2), ("a", 1.1), ("b", float("nan"))):
            scenario = copy.deepcopy(self.input["scenarios"][0])
            scenario["samples"][0][field] = value
            with self.assertRaises(ValueError):
                build_scenario(scenario)

    def test_build_is_deterministic(self):
        self.assertEqual(serialize(self.payload), serialize(build_payload(self.source)))


if __name__ == "__main__":
    unittest.main()
