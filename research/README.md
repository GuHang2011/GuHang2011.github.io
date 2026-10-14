# Research Reading Guide | 研究阅读指南

[Portfolio](https://guhang2011.github.io/) · [Research direction brief](https://guhang2011.github.io/research/statement.html) · [Evidence guide](https://guhang2011.github.io/research/#evidence) · [Academic CV](https://guhang2011.github.io/research/cv.html)

Updated: 2026-10-15. This guide connects public code with questions, reproduction steps and evidence boundaries. The proposed research direction is a discussion draft; manuscript and project statuses follow the supplied September 2026 CVs. Research implementations, engineering cases and learning tools have distinct scopes.

## Start here | 导师阅读入口

1. [Research direction brief / 研究方向简述](./statement.html): two proposed questions about frozen multimodal adaptation and validation sensitivity, with experimental controls and failure criteria.
2. [Inspect evidence / 查看证据](https://guhang2011.github.io/research/#evidence): KICP implementation, KAPT source attribution and 31 recorded Python component checks, plus the five-test release-check example.
3. [Academic CV / 学术简历](./cv.html): selected research, confirmed first authorship for FCP and ISCAIT, project leadership, education and experience; printable in either language.

Academic contact / 学术联系: [guhang2011@126.com](mailto:guhang2011@126.com).

## Research interests | 研究兴趣

- Multimodal representations for news and document understanding / 面向新闻与文档理解的多模态表征
- Reliable evaluation with limited labels: validation sensitivity, leakage and data artifacts / 有限标注下的可靠评估：验证敏感性、泄漏与数据伪影
- Intelligent information systems: retrieval and human-reviewed workflows / 智能信息系统：检索与人工复核工作流

## Three reading routes | 三条阅读路径

1. **Research implementation: [KICP](https://github.com/GuHang2011/KICP).** Inspect CLIP representations, learned prompts, co-attention and knowledge retrieval. Read the external dataset and model-asset requirements before running the code. Manuscript status is listed separately on the [portfolio](https://guhang2011.github.io/#research); this guide adds no performance result.
2. **Learning and reproducibility: [KAPT Reproducibility Lab](https://github.com/GuHang2011/KAPT).** A focused study extracted from a local KANO/KAPT project. Inspect explicit early-stopping state, sample-ID alignment and prediction-level evaluation. Start with the [case and synthetic validation replay](https://guhang2011.github.io/cases/kapt/), then follow repository reproduction commands. KANO is third-party upstream; local engineering changes are documented separately. No molecular benchmark reproduction or original KANO model is claimed.
3. **Engineering evidence: [Counselor collaboration](https://guhang2011.github.io/cases/counselor/).** Follow scoped tasks, review states and artifact-bound release verification. Read the [release-check source example](https://guhang2011.github.io/cases/examples/README.md). Existing acceptance records and synthetic demonstrations have different evidence scopes.

## Evidence map | 问题与证据

| Question | Public entry | What to inspect | Boundary |
| --- | --- | --- | --- |
| How are visual and text features adapted and fused? | [KICP](https://github.com/GuHang2011/KICP) | Input contracts, model path, external assets, split assumptions | Availability of code alone does not verify reported model performance |
| Is model selection independent of held-out evaluation? | [KAPT case](https://guhang2011.github.io/cases/kapt/) | Best versus stopped epoch, strict improvement, finite scores | Synthetic replay is a learning example, not a trained benchmark |
| Is an ensemble computed on matching predictions? | [KAPT source](https://github.com/GuHang2011/KAPT) | Sample IDs, labels, prediction ranges and fixed thresholds | Averaged run metrics are not prediction-ensemble metrics |
| Can a workflow and release be inspected? | [Counselor case](https://guhang2011.github.io/cases/counselor/) | Role scope, state transitions, artifact hashes and check assumptions | Hashes establish artifact consistency, not report authenticity |
| Can data work be reproduced and reviewed? | [Frontend & Data Lab](https://github.com/GuHang2011/frontend-data-lab) | Python / SQL pipeline, data-quality checks and offline fixtures | Small synthetic examples do not establish production throughput |

## Executable examples and notes | 可执行示例与笔记

- [Model Evaluation Lab](https://guhang2011.github.io/demos/model-evaluation/): thresholds, ROC / PR curves, confusion matrices and aligned prediction means.
- [Data Preparation Audit](https://guhang2011.github.io/demos/data-preparation/): nulls, duplicate conflicts, quarantine reasons and group totals.
- [Data labeling](https://github.com/GuHang2011/frontend-data-lab/tree/main/examples/data-labeling): paired agreement, coverage, guidelines and disagreement review.
- [Bounded public crawler](https://github.com/GuHang2011/frontend-data-lab/tree/main/examples/public-crawler): robots rules, origin scope, request budgets and offline tests.
- [Model reading map](https://github.com/GuHang2011/frontend-data-lab/blob/main/docs/modeling-reading-map.md): baselines, feature engineering, leakage and error analysis.
- [Engineering notes](https://github.com/GuHang2011/engineering-notes): implementation decisions with stated testing limits.

## Review sequence | 审阅顺序

1. Identify the question, upstream source, input data and scope.
2. Inspect the small implementation and its input/output contracts.
3. Follow the repository's reproduction and test commands.
4. Read limitations before interpreting a result or screenshot.

## Questions to develop | 待进一步研究的问题

These are working questions, not claims of completed research:

- How does validation selection vary when labels are scarce or data artifacts change?
- Which adaptations of frozen multimodal features remain useful under controlled data splits?
- How can a retrieval workflow expose uncertainty and support meaningful human review?
- Which interface states help users recover from partial failure without losing responsibility or evidence?

## Public material boundaries | 公开材料边界

Public learning examples use synthetic fixtures. Engineering cases document selected behavior with synthetic or redacted material. The KAPT public study excludes original datasets, trained weights, production logs and private checkpoints. Upstream licenses and attribution accompany extracted code where applicable.

Learning notes document methods. They do not establish model novelty, institutional impact or production throughput. A future experiment should record data source, split, method, selection rule, measured result and limitations before presenting a research conclusion.
