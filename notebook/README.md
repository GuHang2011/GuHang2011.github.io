# Learning & project reflections · 学习笔记与项目心得

[Read online / 在线阅读](https://guhang2011.github.io/notebook/)

Twenty-five bilingual notes connect code observations, small examples, implementation tradeoffs and questions for further study. Collection updated on **2026-10-29**, with AI-assisted drafting and translation. Each article retains its compilation date. They are learning summaries, not a historical lab diary or evidence of new research results.

| Topic | Note | Related work |
| --- | --- | --- |
| Models | [证据感知多模态决策 / Evidence-aware multimodal decisions](https://guhang2011.github.io/notebook/multimodal-gates.html) | Reliability Gate Lab and doctoral brief |
| Models | [总标注预算 / Label-budget ledger](https://guhang2011.github.io/notebook/label-budget-ledger.html) | Budget protocol and validation audit |
| Engineering | [模型版本回退 / Model-version rollback](https://guhang2011.github.io/notebook/model-version-rollback.html) | React workflow and release gate |
| Models | [早停、样本对齐与集成 / Model selection](https://guhang2011.github.io/notebook/model-selection.html) | KAPT and model-evaluation demo |
| Models | [提示学习的张量契约 / Prompt contracts](https://guhang2011.github.io/notebook/prompt-contracts.html) | KANO-derived KAPT components |
| Frontend | [可访问的交互 / Accessible interactions](https://guhang2011.github.io/notebook/accessible-interactions.html) | Bilingual portfolio |
| Data | [数据质量与可追溯性 / Data quality](https://guhang2011.github.io/notebook/data-quality.html) | Synthetic CSV audit |
| Engineering | [订单一致性 / Order consistency](https://guhang2011.github.io/notebook/order-idempotency.html) | Silk Road teaching workflow |
| Engineering | [权限边界 / Permission boundaries](https://guhang2011.github.io/notebook/permission-boundaries.html) | Archive and counselor cases |
| Models | [数字人技术路线 / Digital human pipelines](https://guhang2011.github.io/notebook/digital-human.html) | Portrait motion transfer and audio-driven lip sync |
| Models | [文生图原理与操作 / Text-to-image](https://guhang2011.github.io/notebook/text-to-image.html) | Latent diffusion and SDXL inference |
| Engineering | [生成式项目复现 / Generative workflow](https://guhang2011.github.io/notebook/generative-workflow.html) | Model, prompt, runtime and review manifest |
| Models | [RAG 学习：把检索质量与回答质量分开检查 / RAG evaluation: separate retrieval from answer quality](rag-evaluation.html) | Runnable teaching example |
| Frontend | [前端异步请求：防抖之外，还要处理响应竞态 / Async interfaces: stale responses beyond debouncing](async-interfaces.html) | Runnable teaching example |
| Data | [SQL 窗口分析：累计值、上一期与并列排名 / SQL windows: running totals, prior values and ties](sql-windows.html) | Runnable teaching example |

Each article states its evidence basis and links to source files. Teaching examples and proposed checks are distinguished from existing implementation and historical reports. Attribution to upstream projects remains intact.

## Read and maintain

- Read in English or Chinese; language preference is shared with the portfolio.
- Search titles, summaries and tags in either language, then filter by topic. The query can be shared in the URL, e.g. `?topic=models&q=validation`.
- Article directories, source links and code remain readable without JavaScript. Browser enhancement adds copying, active directory entries and filtering.
- Use the article's print button and choose “Save as PDF” in your browser.
- Content lives in `content/*.json`; the renderer escapes text and produces committed static HTML. No build is required to serve the site.

After editing source content, regenerate from the repository root:

```sh
python notebook/build.py
```

The renderer uses only Python's standard library. Keep both languages aligned, rerun any changed executable example, and review links and the mobile reading layout before publishing.

## Small examples

Run `python notebook/examples/rag_metrics.py` and `python notebook/examples/sql_windows.py` from the repository root. The async controller is an importable ES module: [latest-request.mjs](examples/latest-request.mjs). All three use synthetic inputs; no model weights or private data are included.

Checks executed on **2026-10-20**: three Python checks cover duplicate retrieval IDs, unanswered-query handling, daily aggregation, ties and missing dates; four Node checks cover late responses, stale failures, cleared input, disposal and empty results. Re-run them with:

```sh
python -m unittest discover -s notebook/examples -p "test_*.py"
node --test notebook/examples/latest-request.test.mjs
```

These checks validate the small examples only. They do not evaluate a deployed search service, a language model or large-scale SQL performance.

## 27 October 2026 additions / 本轮新增

学习笔记共 **19** 篇。以下四篇围绕时空建模和工程交付，使用合成教学例子，不补写论文实验结果。

- [TFT 学习：预测发出时，哪些信息真的已知？ / Learning TFT: what was actually known when a forecast was issued?](tft-information-boundary.html)
- [GNN 学习：消息传递之前，先定义风险图 / Learning GNNs: defining a risk graph before passing messages](gnn-risk-graphs.html)
- [时空数据验证：不能只按样本行随机切分 / Panel-data validation: keep the whole forecast horizon on one side of a split](spatiotemporal-validation.html)
- [项目心得：一个研究 Demo，交付时还应该带上什么？ / Project reflection: what should accompany a research demo?](research-demo-handoff.html)

[Python 示例、运行方法与 10 项测试](examples/climate-protocol-README.md) · [历史前端项目案例](../cases/early-frontend/README.md)


## 29 October 2026 · Frontend learning log

[本次学习日志 / Dated learning log](journal.html) · [来源与复跑记录 / Sources and checks](frontend-review-20261029.md)

- [大前端心得：Web 与移动端，哪些代码值得共用？ / Sharing frontend logic across Web and mobile](cross-platform-boundaries.html)
- [请求回来了，但当前页面还是原来的页面吗？ / Who owns an asynchronous response?](request-scope-lifecycle.html)
- [天气功能复盘：定位失败后，如何尊重用户的选择？ / Location fallback and the user’s latest choice](weather-fallback.html)
- [附件上传心得：进度条走完，文件就能用了吗？ / When is an uploaded attachment ready to use?](upload-readiness.html)
- [低代码表单心得：先规定配置，再生成界面 / A low-code form starts with a configuration contract](low-code-contracts.html)
- [演示上线复盘：脚本还没加载完，按钮就能点了 / Keep a demo safe before its scripts are ready](progressive-demo-loading.html)

本轮新增 6 篇，笔记总数为 25。日志日期表示代码阅读与整理日期，不重构此前逐日经历。

To render selected articles and refresh the full index: `python notebook/build.py --only cross-platform-boundaries request-scope-lifecycle weather-fallback upload-readiness low-code-contracts progressive-demo-loading`.
