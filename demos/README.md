# Interactive Learning Experiments / 交互学习实验

Small, newly written experiments based on themes found in local study and teaching materials. All records and supplied model scores are synthetic. These examples demonstrate implementation and reasoning; they are not evidence of production deployment or new research results.

| Experiment | Online | Code and Notes |
| --- | --- | --- |
| MeteoFormer weather workspace | [Synthetic snapshot](https://guhang2011.github.io/meteoformer-weather-system/) | [Source and setup](https://github.com/GuHang2011/meteoformer-weather-system) |
| React typed workflow board | [Workflow board](https://guhang2011.github.io/demos/react-workflow/) | [React source and state notes](react-workflow/README.md) |
| React streaming response lab | [Demo](https://guhang2011.github.io/demos/ai-stream/) | [Source, limits and tests](ai-stream/README.md) |
| Schema-driven low-code form | [Form studio](https://guhang2011.github.io/demos/low-code-form/) | [Schema and renderer notes](low-code-form/README.md) |
| Production Reporting Workbench | [Demo](https://guhang2011.github.io/demos/production-workbench/) | [Code and notes](production-workbench/README.md) |
| Telecom Service Desk | [Demo](https://guhang2011.github.io/demos/telecom-service/) | [Code and notes](telecom-service/README.md) |
| Financial ratios, clustering and PCA | [Explorer](https://guhang2011.github.io/demos/financial-analysis/) | [Reproduction](financial-analysis/README.md) |
| Data preparation and quality audit | [Audit](https://guhang2011.github.io/demos/data-preparation/) | [Spark notes](data-preparation/spark-notes.md) |
| Classification thresholds and prediction ensembles | [Evaluation](https://guhang2011.github.io/demos/model-evaluation/) | [Evaluation notes](model-evaluation/note.md) |
| Sentence BLEU and clipped n-grams | [Explorer](https://guhang2011.github.io/demos/bleu-explorer/) | [Protocol and tests](bleu-explorer/README.md) |
| Evidence-aware reliability gate | [Gate lab](https://guhang2011.github.io/demos/reliability-gates/) | [Rules and limits](reliability-gates/README.md) |
| Virtual presenter | [Presenter](https://guhang2011.github.io/demos/virtual-host/) | [Controls and notes](virtual-host/README.md) |

这些示例由本地财务分析、Spark 课程及模型代码阅读主题重新整理。公开文件不含原始业务数据、试题、教材页面、模型权重或未公开论文。第三方代码阅读来源在各示例说明中标注，不能将第三方基线归为个人原创成果。

## Directory update · 16 November 2026

[The demo directory](https://guhang2011.github.io/demos/) now includes MeteoFormer and the streaming-response lab. Its entries follow the same order as the reading map above. Each card uses a real UI capture dated **13 November 2026**, with the sample-data scope shown beside it; this date describes the screenshot, not a claim that the project was updated today. [Capture provenance](../assets/project-previews/20261113/manifest.json).

目录补齐气象工作台与流式回答实验，预览统一为 2026-11-13 的实际界面截图。气象页使用合成预报快照；流式回答使用本地预设文本，不连接模型服务。截图保留完整画面，卡片附数据范围与对应源码。

## Reproduce

2026-11-01：十个演示统一深藏蓝导航、亮蓝色操作、浅灰背景与白色面板。虚拟主播使用 Vue 3 + Element Plus，React 工作流使用 Ant Design；其他静态实验复用 `element-theme.css` 与 `demo-navigation.js`，保留各自计算与校验实现。公开示例免登录；学院真实登录、授权与资料管理仍属于本地系统，公开案例保留学院标识与脱敏截图。详见 [界面改版与验收](../reviews/element-demos-20261101.md)。

- Financial analysis uses a fixed seed and scikit-learn. Run the generator and its tests with the pinned requirements in the example directory.
- Model evaluation uses supplied synthetic probabilities, with metrics computed by scikit-learn over 101 thresholds. It does not train a model.
- Data preparation parses fixed CSV fixtures with PapaParse and tests its reusable transformation core using Node.js.
- React workflow uses React + TypeScript and an explicit reducer. Run `npm ci`, `npm test` and `npm run dev` inside `react-workflow/`; the online app runs the committed bundle built from that source.
- Low-code forms use a custom application schema v1. Run `node --test low-code-form/schema.test.mjs` from this directory, then serve the website root to try the form builder.

[Frontend verification record](frontend-verification.md) documents the 18 new unit tests, browser walkthrough and limits of the two examples.

The website serves precomputed JSON where applicable. Browser filtering changes the displayed subset, not the fitted analysis or evaluation protocol. Tables provide the numerical values represented in charts.

## Dependencies

Chart.js **4.4.9** and PapaParse **5.5.3** are stored locally in `vendor/` with their MIT licenses. Interface icons use the existing local Lucide assets (ISC). No runtime CDN, external analytics or remote font is required.

Prepared: **2026-10-13**. React and low-code examples added: **2026-10-22**.

## Added 2026-10-17

- [BLEU Translation Explorer](https://guhang2011.github.io/demos/bleu-explorer/): editable sentence-level BLEU with clipped counts, multiple references and brevity penalty. [Protocol and tests](bleu-explorer/README.md).
- [Crop detection architecture review](../cases/crop-detection-review.md): a bounded local-source review with attribution and clearly marked unverified integration.


## Engineering workflows · 28 October 2026

Two CV-inspired workflow prototypes were added: production reporting and fixed-network service orders. Both use synthetic data and run locally in the browser. They are newly written learning examples, not releases of historical employer source code. [Design and verification](operations-notes.md).

新增生产报工与固网业务办理两个学习原型，依据历史简历中的业务场景重新编写，使用合成数据。详见[设计与验证记录](operations-notes.md)。
