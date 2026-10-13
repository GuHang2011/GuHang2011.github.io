# Data Preparation Audit / 数据准备与质量审计

An original educational experiment prepared on 13 October 2026. All 17 events are synthetic. No production database, student records, examination questions or textbook excerpts are published.

## Run and reproduce

Serve this directory through the academic site's root and open `/demos/data-preparation/`. The browser uses the site's local PapaParse distribution to parse the CSV fixture. No request is made to an application backend, and there is no upload of event data.

Run the core checks with Node.js:

```console
node --test pipeline.test.mjs
```

The fixture and deterministic scenarios live in `pipeline.mjs`. `runPipeline(rows, policies, stage)` is a pure transformation. `data-preparation.js` handles presentation and downloads. `spark-notes.md` connects these small examples to data engineering study topics.

## Contract

- Up to 1,000 rows in the pure core; the interface offers only the bounded synthetic fixture.
- Nonempty IDs with ASCII letters, digits, underscore or hyphen, at most 48 characters.
- UTC timestamp `YYYY-MM-DDTHH:mm:ssZ` in 2000–2099. Calendar rollover is rejected; local offsets and fractional seconds are outside this teaching contract.
- Nonempty group, at most 48 characters.
- Decimal amount with at most two decimal places and absolute value no larger than 1,000,000 synthetic units. Negative adjustment and observed zero are valid. Empty, null or undefined is missing. NaN, Infinity, exponent notation and extra decimal places are invalid.
- Validation isolates malformed rows first. The missing policy applies only to otherwise valid rows.
- Exact normalized duplicate business records retain one copy. Different valid versions of an ID either all enter quarantine or retain the first source row. The latter is explicitly order-dependent and marked.
- Integer cents produce exact group totals for this bounded fixture. This is a numerical contract for the example, not a universal currency implementation.
- Each source row has exactly one final destination: retained or quarantined. Reason counts refer to rows, not unique IDs. Intermediate stage totals do not yet represent the fully deduplicated result.

## Expected default result

With the mixed fixture, quarantine missing values, reject conflicting IDs, and aggregate:

| Item | Value |
| --- | ---: |
| Input rows | 17 |
| Retained rows | 10 |
| Quarantined rows | 7 |
| Observed zeros retained | 2 |
| Amount total | 47.50 |

Quarantine contains one invalid amount, one impossible date, one missing group, one missing amount, one exact duplicate and two rows belonging to a conflicting ID. Group totals are A = 16.50, B = 9.00, C = 12.00 and D = 10.00.

## Export

CSV exports the currently selected record view. JSON exports source, retained, quarantine, reason counts, stage ledger, group totals and policy settings together. Flags distinguish zero imputation and a retained conflict. Formula-like text cells are prefixed with an apostrophe to avoid spreadsheet execution; therefore source-text CSV is spreadsheet-safe rather than a byte-identical copy of the original fixture. Numeric transformed amounts remain numeric. The UTF-8 CSV includes a BOM for spreadsheet compatibility.

## Limits and attribution

This page runs a small JavaScript experiment, not a Spark cluster. It does not claim distributed performance, production deployment, or a new empirical research result. Arbitrary CSV upload is intentionally outside the interface's current scope. Field contracts would need to be adapted to the actual domain before use.

Original notes were developed from locally stored Spark, text counting, SQL, data collection and preprocessing study topics. The third-party teaching topics are attributed in `spark-notes.md`; their source pages and assessment material are not reproduced. Parser dependency: [PapaParse](https://www.papaparse.com/), MIT licensed; the local vendor directory carries dependency attribution.
