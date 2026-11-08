# Learning & project reflections · 学习笔记与项目心得

## 2026-11-08 · 前端与 AI 的个人感触

更新[AI 写代码越来越快，前端还怎么往下走](ai-frontend-reflection.html)。从整理个人主页和项目演示说起，记录对 AI 编程的压力、学习打算与项目复盘想法。沿用原文章链接，目前共 **43 篇中英双语笔记**；以下旧篇数为当时记录。

## 2026-11-04 · 目录盘点工程复盘

新增[文件整理心得：先定义统计范围，再看容量数字](inventory-scope-review.html)，结合当天工具修复、合成样例与验证范围；目前共 **40 篇中英双语笔记**。[配套交互案例](../cases/file-inventory/)。以下按批次保留，旧篇数为当时记录。


## 2026-11-03 · 近期项目源码复盘

目前共 **39 篇中英双语笔记**。新增内容连接可检查的源码、设计取舍和建议验证项。

- [事项汇总之后，权限还要逐项检查](work-center-boundaries.html)
- [已读不等于办完：通知与业务状态怎样分开](notification-read-state.html)
- [备份恢复：先看差异，再决定覆盖哪些记录](backup-restore-review.html)

首页新增页内关键词检索、全部主题、分批展开及可分享的筛选地址。无 JavaScript 时仍可阅读全部文章，搜索表单进入完整笔记集。


## 2 November 2026 · 低代码专题 / Low-code series

当前笔记集共 **36 篇**。[在线目录](https://guhang2011.github.io/notebook/) · [低代码专题筛选](https://guhang2011.github.io/notebook/?q=low%20code) · [表单 Demo](../demos/low-code-form/)

- [低代码表单：配置、用户输入和界面状态为什么要分开](low-code-state-layers.html) / Low-code forms: separate configuration, values and interface state
- [低代码字段联动：隐藏、必填和权限不能混为一谈](low-code-rules.html) / Conditional forms: visibility is not permission
- [低代码上线心得：配置也需要版本、迁移与回滚](low-code-release.html) / Publishing low-code configuration: versions, migrations and rollback

第一篇结合现有源码和操作检查；字段联动、配置迁移与发布回滚为扩展设计，未表述为已实现功能。现有表单 10 项核心测试于 2026-11-02 重跑通过。

此前三篇复盘：[AI 辅助代码审阅](ai-code-race-review.html) · [工作流恢复](workflow-recovery-review.html) · [安全导入配置](schema-import-review.html)。

以下按整理批次保留，历史篇数只表示各批次当时的数量。


[Read online / 在线阅读](https://guhang2011.github.io/notebook/)

Thirty bilingual notes connect code observations, small examples, implementation tradeoffs and questions for further study. Collection updated on **2026-10-31**, with AI-assisted drafting and translation. Each article retains its compilation date. They are learning summaries, not a historical lab diary or evidence of new research results.

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


## 29 October 2026 · AI 与前端学习感悟

[AI 写代码越来越快，前端还怎么往下走](ai-frontend-reflection.html) / [AI writes code faster. Where do I go from here as a frontend developer?](ai-frontend-reflection.html)

补充个人观点与下一步学习打算，讨论 AI 辅助开发中的基础知识、任务拆分、代码阅读与结果验证。关联前面的请求竞态、低代码与上传笔记。当前共 26 篇。


## 31 October 2026 · Engineering notes

[本次学习记录 / Latest learning log](engineering-log-20261031.html) · [沭阳之家工程案例 / Engineering case](../cases/shuyang/)

- [目录改名之后：启动脚本、历史链接与 Linux 权限 / After a directory rename: scripts, history and Linux permissions](directory-rename-release.html)
- [移动端接口：HTTP 成功之后，还要判断什么 / Mobile API contracts: what to check after HTTP succeeds](mobile-response-contracts.html)
- [照片上传队列：失败重试与账号切换怎么处理 / Photo upload queues: retries and account changes](photo-queue-ownership.html)
- [发布包校验：通过测试的代码，是否就是交付的文件 / Release integrity: do the delivered files match what was checked?](release-artifact-integrity.html)

新增 4 篇，合计 30 篇。基于公开 v1.2.2 源码与已有发布记录整理，历史业务测试结果不计为本轮复跑结果。
