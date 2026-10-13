# Financial Ratio Explorer / 财务比率探索

An interactive learning experiment in exploratory financial analysis, built from **synthetic data only**. It is newly authored around financial-analysis study topics; no original business workbook, company name, report output or source screenshot is published.

[Open the live demo](https://guhang2011.github.io/demos/financial-analysis/)

## Dataset

24 fictitious company IDs (`S01`–`S24`) over 2023 and 2024 produce 48 records. A deterministic Python generator uses seed `20261013`. Sector-specific ranges are illustrative assumptions, not empirical estimates. Monetary fields use a simulated CNY 10,000 unit; no real firm is represented.

The data deliberately include valid zero receivables and zero cash flow, missing receivables and expenses, and zero revenue/assets denominators. These cases expose the difference between a true zero observation and an undefined ratio. They do not indicate actual business conditions.

| Feature | Definition | Missing rule |
| --- | --- | --- |
| Gross margin | `(revenue - cost) / revenue` | Undefined if an input is missing or revenue is zero |
| Receivables / revenue | `receivables / revenue` | Same denominator rule; zero receivables remains zero |
| Operating cash / revenue | `operatingCash / revenue` | Negative or zero cash flow is a valid observed value |
| Liabilities / assets | `liabilities / assets` | Undefined if an input is missing or assets are zero |
| Expenses / revenue | `expenses / revenue` | Missing expenses remains missing in the observed table |

## Pipeline

For each year independently:

1. Derive five ratios and retain invalid observations as `null`.
2. Impute the clustering input with the annual median of each feature. An entirely missing feature fails explicitly instead of receiving an invented fallback value.
3. Fit `StandardScaler` to the five imputed ratios.
4. Fit scikit-learn `KMeans` with `k = 2, 3, 4`, `n_init = 20`, `random_state = 42`.
5. Fit full-SVD `PCA` to the same standardized five-feature matrix and display two principal components. KMeans still uses five dimensions, not the projection.
6. Compute each point's Euclidean distance to the annual mean in standardized feature space, then min-max scale those distances to 0–100. If every distance is equal, all relative scores are zero.

The site loads the six precomputed year/k scenarios, with no server or remote data service. Year or k selection selects a fitted scenario; filtering changes visible rows only and does not refit preprocessing or clustering. The raw ratio comparison omits points with an undefined axis ratio; the table and selected-company panel preserve the original missing value and disclose the imputed model input.

## Interpretation and limitations

- **There are no risk or violation labels.** Clusters describe geometric similarity. They cannot be interpreted as low/medium/high tax risk.
- Cluster numbers are arbitrary. Annual models are fitted independently, so a group number does not track the same population across years.
- The 0–100 relative distance is **not a probability**, not a calibrated anomaly threshold, and not comparable between years. Its minimum and maximum are defined by the current annual sample.
- KMeans assumes Euclidean geometry and can be sensitive to scaling, extreme values, initialization and k. No best k is claimed. Inertia usually falls as k grows and alone does not establish model quality.
- PCA is lossy. Its variance coverage is reported so the two-dimensional view is not mistaken for the full feature space.
- Annual median imputation is transparent but can alter distance structure. This is an exploratory fit to all annual synthetic observations, not a predictive evaluation. A supervised or future-year study would require an explicit split and preprocessing fitted only on training data.
- The simulated sector distributions and sample size are small design choices. No empirical conclusion about firms, industries or tax compliance follows from this example.

## Reproduce

Python 3.11 or 3.12 is recommended. The pinned requirements capture the tested preprocessing/model stack.

```sh
python -m venv .venv
# Activate .venv using the command for your operating system.
python -m pip install -r requirements.txt
python generate_data.py
python -m unittest -v test_generate_data.py
```

The generator reads no local notebook, spreadsheet or credential. It writes `data.json` beside itself. Serve the site over HTTP to load the JSON. Chart.js is bundled locally by the site; the browser does not fit a model or fetch third-party analytics.

## Data-quality checks

`test_generate_data.py` checks zero numerator preservation, zero/missing denominators, median imputation without mutating observations, explicit failure for all-missing features, constant-distance scoring, unique company/year keys, deterministic records, valid cluster labels and finite serialized projections. Tests support the implementation; they do not validate any predictive outcome.

## 学习要点

这个演示围绕“原始财务数据 → 比率 → 缺失处理 → 标准化 → 聚类 → 降维展示”的过程组织。零值和缺失值应分开处理；比率图应保留观测含义；聚类结果和相对距离不应包装成风险预测。公开版本使用全新合成样本，原始业务资料未上传。

后续可研究的问题包括：不同缺失策略是否改变邻近关系、极端值对 StandardScaler 与 RobustScaler 的影响、不同 k 的稳定性，以及跨年度评估如何避免将测试年度参与预处理拟合。这些是待探索方向，不是已完成实验结论。

## References

- [StandardScaler](https://scikit-learn.org/1.7/modules/generated/sklearn.preprocessing.StandardScaler.html)
- [KMeans](https://scikit-learn.org/1.7/modules/generated/sklearn.cluster.KMeans.html)
- [PCA](https://scikit-learn.org/1.7/modules/generated/sklearn.decomposition.PCA.html)
- [Clustering evaluation](https://scikit-learn.org/1.7/modules/clustering.html#clustering-performance-evaluation)
