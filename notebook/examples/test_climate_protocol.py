import unittest
from climate_protocol import feature_allowed, pinball_loss, incoming_average, split_window


class ClimateProtocolChecks(unittest.TestCase):
    def test_known_future_is_available_at_issue_time(self):
        self.assertTrue(feature_allowed(origin=2016, valid_year=2017, available_year=2015, kind='known_future'))
        self.assertFalse(feature_allowed(origin=2016, valid_year=2017, available_year=2017, kind='known_future'))

    def test_observed_future_and_late_revision_are_blocked(self):
        self.assertFalse(feature_allowed(origin=2016, valid_year=2017, available_year=2016, kind='observed'))
        self.assertFalse(feature_allowed(origin=2016, valid_year=2015, available_year=2018, kind='observed'))
        self.assertTrue(feature_allowed(origin=2016, valid_year=2015, available_year=2016, kind='observed'))

    def test_pinball_asymmetric_penalty(self):
        self.assertAlmostEqual(pinball_loss([10], [8], .9), 1.8)
        self.assertAlmostEqual(pinball_loss([10], [12], .9), .2)
        self.assertAlmostEqual(pinball_loss([10, 20], [12, 18], .9), 1.0)

    def test_pinball_rejects_invalid_and_misaligned_vectors(self):
        for actual, predicted, q in [([], [], .5), ([1], [1, 2], .5), ([1], [float('nan')], .5), ([1], [1], 1)]:
            with self.assertRaises(ValueError): pinball_loss(actual, predicted, q)

    def test_directed_graph_hand_calculation_and_isolates(self):
        result = incoming_average({'A': 2, 'B': 8, 'C': 4}, [('A', 'C', 1), ('B', 'C', 3)])
        self.assertEqual(result, {'A': None, 'B': None, 'C': 6.5})
        self.assertEqual(incoming_average({'A': 2, 'C': 4}, [('C', 'A', 1)]), {'A': 4, 'C': None})

    def test_removing_edge_changes_destination_only(self):
        self.assertEqual(incoming_average({'A': 2, 'B': 8, 'C': 4}, [('A', 'C', 1)]), {'A': None, 'B': None, 'C': 2})

    def test_graph_rejects_duplicates_unknown_nodes_and_bad_weights(self):
        for edges in [[('A', 'B', 1), ('A', 'B', 1)], [('A', 'X', 1)], [('A', 'B', -1)], [('A', 'B', float('inf'))]]:
            with self.assertRaises(ValueError): incoming_average({'A': 1, 'B': 2}, edges)
        self.assertEqual(incoming_average({'A': 1, 'B': 2}, [('A', 'B', 0)]), {'A': None, 'B': None})

    def test_full_horizon_crossing_boundaries_is_purged(self):
        self.assertEqual(split_window(2014, 2), 'train')
        self.assertEqual(split_window(2015, 2), 'purged')
        self.assertEqual(split_window(2016, 2), 'validation')
        self.assertEqual(split_window(2019, 2), 'purged')
        self.assertEqual(split_window(2020, 2), 'test')

    def test_accepted_target_years_are_disjoint(self):
        years = {name: set() for name in ['train', 'validation', 'test']}
        for origin in range(2005, 2023):
            name = split_window(origin, 2)
            if name != 'purged': years[name].update(range(origin + 1, origin + 3))
        self.assertFalse(years['train'] & years['validation'])
        self.assertFalse(years['train'] & years['test'])
        self.assertFalse(years['validation'] & years['test'])

    def test_split_rejects_invalid_horizons_and_dates(self):
        for origin, horizon in [(2004, 1), (2024, 1), (2010, 0), (2010, True), (2010, 1.5)]:
            with self.assertRaises(ValueError): split_window(origin, horizon)


if __name__ == '__main__':
    unittest.main()
