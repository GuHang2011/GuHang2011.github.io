# Interactive Learning Experiments / 交互学习实验

Small, newly written experiments based on themes found in local study and teaching materials. All records and supplied model scores are synthetic. These examples demonstrate implementation and reasoning; they are not evidence of production deployment or new research results.

| Experiment | Online | Code and Notes |
| --- | --- | --- |
| Financial ratios, clustering and PCA | [Explorer](https://guhang2011.github.io/demos/financial-analysis/) | [Reproduction](financial-analysis/README.md) |
| Data preparation and quality audit | [Audit](https://guhang2011.github.io/demos/data-preparation/) | [Spark notes](data-preparation/spark-notes.md) |
| Classification thresholds and prediction ensembles | [Evaluation](https://guhang2011.github.io/demos/model-evaluation/) | [Evaluation notes](model-evaluation/note.md) |

这些示例由本地财务分析、Spark 课程及模型代码阅读主题重新整理。公开文件不含原始业务数据、试题、教材页面、模型权重或未公开论文。第三方代码阅读来源在各示例说明中标注，不能将第三方基线归为个人原创成果。

## Reproduce

- Financial analysis uses a fixed seed and scikit-learn. Run the generator and its tests with the pinned requirements in the example directory.
- Model evaluation uses supplied synthetic probabilities, with metrics computed by scikit-learn over 101 thresholds. It does not train a model.
- Data preparation parses fixed CSV fixtures with PapaParse and tests its reusable transformation core using Node.js.

The website serves precomputed JSON where applicable. Browser filtering changes the displayed subset, not the fitted analysis or evaluation protocol. Tables provide the numerical values represented in charts.

## Dependencies

Chart.js **4.4.9** and PapaParse **5.5.3** are stored locally in `vendor/` with their MIT licenses. Interface icons use the existing local Lucide assets (ISC). No runtime CDN, external analytics or remote font is required.

Prepared: **2026-10-13**.
