"""Synthetic learning examples: information timing, quantiles, graphs and label splits.

Python 3.8+, standard library only. This does not implement or evaluate the paper's
TFT-GNN model. Years and graph values below are invented teaching inputs.
"""
import json
import math
from numbers import Real


def finite(value):
    if isinstance(value, bool) or not isinstance(value, Real) or not math.isfinite(value):
        raise ValueError('Expected a finite numeric value')
    return float(value)


def feature_allowed(*, origin, valid_year, available_year, kind):
    """Check information availability at a forecast origin, not its target date."""
    if kind not in {'observed', 'known_future'}:
        raise ValueError('Unknown feature kind')
    if any(type(value) is not int for value in [origin, valid_year, available_year]):
        raise ValueError('Years must be integers')
    return available_year <= origin and (kind == 'known_future' or valid_year <= origin)


def pinball_loss(actual, prediction, quantile):
    """Mean pinball loss; observations and predictions must be aligned by caller."""
    q = finite(quantile)
    if not 0 < q < 1:
        raise ValueError('Quantile must be strictly between zero and one')
    if not actual or len(actual) != len(prediction):
        raise ValueError('Need nonempty, equally sized vectors')
    residuals = [finite(y) - finite(p) for y, p in zip(actual, prediction)]
    return sum(max(q * error, (q - 1) * error) for error in residuals) / len(residuals)


def incoming_average(values, edges):
    """One deterministic aggregation: directed (source, destination, weight) edges.

    No training, no inferred links and no implicit self-loops. Isolated destinations
    return None; zero-weight edges have no effect. Duplicate edges are rejected.
    """
    values = {key: finite(value) for key, value in values.items()}
    numerators, denominators, seen = dict.fromkeys(values, 0.0), dict.fromkeys(values, 0.0), set()
    for source, destination, weight in edges:
        if source not in values or destination not in values:
            raise ValueError('Edge endpoint missing from node values')
        if (source, destination) in seen:
            raise ValueError('Duplicate directed edge')
        seen.add((source, destination))
        weight = finite(weight)
        if weight < 0:
            raise ValueError('Negative weights are not supported by this example')
        numerators[destination] += values[source] * weight
        denominators[destination] += weight
    return {key: numerators[key] / denominators[key] if denominators[key] else None for key in values}


def split_window(origin, horizon, *, start=2005, train_end=2016, validation_end=2020, test_end=2024):
    """Assign by the full future-label interval; purge windows crossing a split.

    The dates are illustrative, not the paper's experimental protocol. This only
    handles time boundaries; spatial holdouts and feature vintages need own checks.
    """
    if any(type(value) is not int for value in [origin, horizon, start, train_end, validation_end, test_end]):
        raise ValueError('Years and horizon must be integers')
    if horizon < 1 or not start <= train_end < validation_end < test_end:
        raise ValueError('Invalid horizon or boundaries')
    if origin < start or origin + horizon > test_end:
        raise ValueError('Window outside the example observation range')
    label_start, label_end = origin + 1, origin + horizon
    for name, first, last in [('train', start, train_end), ('validation', train_end + 1, validation_end), ('test', validation_end + 1, test_end)]:
        if first <= label_start and label_end <= last:
            return name
    return 'purged'


def example():
    return {
        'scope': 'Synthetic protocol checks; no model training or manuscript results.',
        'features': {
            'future_calendar': feature_allowed(origin=2016, valid_year=2017, available_year=2015, kind='known_future'),
            'future_observed_rainfall': feature_allowed(origin=2016, valid_year=2017, available_year=2017, kind='observed'),
            'late_revised_history': feature_allowed(origin=2016, valid_year=2015, available_year=2018, kind='observed'),
        },
        'pinball_q90': pinball_loss([10, 20], [12, 18], 0.9),
        'graph_full': incoming_average({'A': 2, 'B': 8, 'C': 4}, [('A', 'C', 1), ('B', 'C', 3)]),
        'graph_drop_B_to_C': incoming_average({'A': 2, 'B': 8, 'C': 4}, [('A', 'C', 1)]),
        'windows': [{'origin': y, 'horizon': 2, 'split': split_window(y, 2)} for y in [2014, 2015, 2016, 2019, 2020, 2022]],
    }


if __name__ == '__main__':
    print(json.dumps(example(), indent=2, allow_nan=False))
