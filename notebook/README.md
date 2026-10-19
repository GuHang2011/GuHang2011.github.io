# Learning & project reflections · 学习笔记与项目心得

[Read online / 在线阅读](https://guhang2011.github.io/notebook/)

Nine bilingual notes connect code observations, small examples, implementation tradeoffs and questions for further study. Compiled on **2026-10-19**, with AI-assisted drafting and translation. They are learning summaries, not a historical lab diary or evidence of new research results.

| Topic | Note | Related work |
| --- | --- | --- |
| Models | [早停、样本对齐与集成 / Model selection](https://guhang2011.github.io/notebook/model-selection.html) | KAPT and model-evaluation demo |
| Models | [提示学习的张量契约 / Prompt contracts](https://guhang2011.github.io/notebook/prompt-contracts.html) | KANO-derived KAPT components |
| Frontend | [可访问的交互 / Accessible interactions](https://guhang2011.github.io/notebook/accessible-interactions.html) | Bilingual portfolio |
| Data | [数据质量与可追溯性 / Data quality](https://guhang2011.github.io/notebook/data-quality.html) | Synthetic CSV audit |
| Engineering | [订单一致性 / Order consistency](https://guhang2011.github.io/notebook/order-idempotency.html) | Silk Road teaching workflow |
| Engineering | [权限边界 / Permission boundaries](https://guhang2011.github.io/notebook/permission-boundaries.html) | Archive and counselor cases |
| Models | [数字人技术路线 / Digital human pipelines](https://guhang2011.github.io/notebook/digital-human.html) | Portrait motion transfer and audio-driven lip sync |
| Models | [文生图原理与操作 / Text-to-image](https://guhang2011.github.io/notebook/text-to-image.html) | Latent diffusion and SDXL inference |
| Engineering | [生成式项目复现 / Generative workflow](https://guhang2011.github.io/notebook/generative-workflow.html) | Model, prompt, runtime and review manifest |

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
