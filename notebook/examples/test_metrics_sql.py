"""Run from this folder with python -m unittest test_metrics_sql.py."""
import unittest
from rag_metrics import recall_at_k, reciprocal_rank
from sql_windows import analyze


class LearningExamples(unittest.TestCase):
    def test_retrieval_duplicates_and_budget(self):
        self.assertEqual(recall_at_k(['a', 'a', 'b'], {'a', 'b'}, 2), 1)
        self.assertEqual(recall_at_k(['x', 'a', 'b'], {'a', 'b'}, 2), .5)
        self.assertEqual(recall_at_k(['x'], {'a'}, 3), 0)

    def test_unanswerable_queries_and_invalid_budget(self):
        self.assertIsNone(recall_at_k(['a'], set(), 2))
        with self.assertRaises(ValueError):
            recall_at_k(['a'], {'a'}, 0)
        self.assertEqual(reciprocal_rank(['x', 'x', 'a'], {'a'}), .5)
        self.assertEqual(reciprocal_rank([], {'a'}), 0)

    def test_daily_grain_ties_and_missing_date(self):
        self.assertEqual(analyze(), [
            ('2026-10-01', 'A', 15, 15, None, 1),
            ('2026-10-01', 'B', 15, 15, None, 1),
            ('2026-10-02', 'B', 7, 22, 15, 1),
            ('2026-10-03', 'A', 20, 35, 15, 1),
            ('2026-10-03', 'B', 3, 25, 7, 2),
        ])


if __name__ == '__main__':
    unittest.main()
