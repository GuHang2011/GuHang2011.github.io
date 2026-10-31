# Hang Gu · Research & Engineering

A bilingual engineering and research portfolio for **Hang Gu (顾航)**, connecting frontend systems, data workflows, model evaluation and teaching.

**Intended website:** [guhang2011.github.io](https://guhang2011.github.io/) · **GitHub:** [@GuHang2011](https://github.com/GuHang2011)

## Climate-risk research · 27 October 2026

**Hybrid AI Framework for Multi-Hazard Climate Risk Governance in Renewable Energy-Water Nexus Systems** — first author, submitted to **Climate Risk Management**, **not accepted**. [Bilingual overview](https://guhang2011.github.io/research/climate-risk.html) · [Abstract and status record](research/climate-risk.md).

研究范围：中国 30 个省份，2005—2024 年；方法：TFT + GNN-CRP。页面整理研究问题、方法分工、摘要报告的发现及后续方向，并同步首页、研究指南、在线简历与 GitHub Overview。内容依据作者提供的摘要及身份／状态说明，不提供尚未公开的数据、性能数值或代码承诺。

## Design

The homepage's **30 October 2026 visual redesign** uses a warm ivory canvas, navy typography and restrained rust accents. A large name lockup and real project previews introduce the portfolio. Selected projects use large screenshot covers, the interactive demos sit in a contrasting navy section, and research and notes retain an editorial reading layout. Earlier academic organization was inspired by [winsleo.github.io](https://winsleo.github.io/); the current visual composition uses Hang Gu's own project material.

The opening links directly to the React workflow demo, selected projects and the academic CV. Three representative projects lead the engineering section; all 13 remain searchable. Three initial demos each suggest an interaction to try. Education and work history share the experience section, while detailed research context, engineering diagrams, highlights and films expand on demand. Publication status and learning-project labels retain distinct meanings.

- Complete English / Chinese interface with a saved language preference.
- Research filters for manuscripts, conference work and thesis; native expandable summaries and an expand / collapse all summaries control.
- Project filters for engineering, research and learning, with accessible selection states and result counts.
- Engineering-card links clear incompatible project filters and searches before navigating. Cards use four columns on wide screens, two on tablets and one on phones; print output uses two columns.
- Screenshot previews, mobile navigation, print styles, reading progress and restrained hover / keyboard-focus accents. Language, filter and palette changes use brief transitions; content remains visible on arrival.
- The highlights carousel supports arrows, tabs, Home / End keys and horizontal touch swipes. An explicit pause / start button controls autoplay; manual navigation stops it until restarted. Rotation runs only while the carousel is visible, stops on hover / focus and honors both system and saved reduced-motion preferences. Inactive panels are inert, slide changes preserve the layout height, and all four cards remain readable without JavaScript and in print.
- Reading preferences offer light and dark palettes and a reduced-motion option, saved locally when browser storage is available. The system's reduced-motion preference takes priority, including for the back-to-top action.
- Semantic HTML, visible keyboard focus, a skip link, and reduced-motion support.
- The homepage needs no build step. React example source changes require a local build; its committed bundle needs no runtime CDN. No remote fonts or analytics are used. The experiments bundle pinned [Chart.js](https://www.chartjs.org/) 4.4.9 and [PapaParse](https://www.papaparse.com/) 5.5.3 under MIT licenses. Local tool icons are from [Lucide](https://lucide.dev/) under the ISC license.
- The English content and navigation work without JavaScript.

## Content

1. **Research:** manuscripts, conference work, and master’s research, with explicit publication status.
2. **Engineering:** public repositories and selected project descriptions.
3. **Engineering lens:** a compact map of interface contracts, data quality, model evaluation and evidence-shaped delivery, linked to the relevant public cases and verification records.
4. **Notebook:** [fifteen bilingual study notes and project reflections](notebook/) on frontend interaction, data quality, model validation, prompt contracts, order consistency, permission boundaries, digital-human pipelines, text-to-image diffusion and reproducible generative workflows. The three October 25 notes cover multimodal decision gates, total annotation budgets and model-version rollback. Searchable by title, summary and tag, with topic filters, source references, code examples and printable article pages. Earlier repositories remain available in the homepage's expandable reading list.
5. **Background:** education and professional experience.
6. **Interactive experiments:** financial clustering, data preparation audits, model evaluation, a React workflow board and a schema-driven low-code form studio, with synthetic data, source code, notes and reproducible checks. [Reading map](demos/README.md).
7. **AI engineering case:** a full-stack module with account-bound key handling, endpoint policy, editable presentation generation, human review and documented mocked-provider tests. [Case study](https://github.com/GuHang2011/engineering-notes/blob/main/notes/personal-ai-keys.md).

The Neurocomputing entry was updated on 24 October 2026 from the supplied revision and author confirmation: submitted, not accepted. It describes 344 archived training runs, operating-point analysis and archive-artifact audits; FCP is not claimed as a new architecture. The Climate Risk Management entry follows the abstract and author update of 27 October 2026. Other research states follow the supplied CV. DASFAA author order and official proceedings records for conference work are not fully linked yet; confirm current decisions and citations before relying on them. Manuscripts and accepted work are labeled separately. The KICP project links to its implementation and setup documentation; the learning lab uses synthetic data.

## Local Engineering Cases

- [Counselor collaboration and release verification](https://guhang2011.github.io/cases/counselor/): role-scoped collaboration, tasks, release evidence and an extracted release-gate example. Existing October 13 records are distinguished from newly executed example tests.
- [College materials archive](https://guhang2011.github.io/cases/archive/): permissions, versioning, review, logical deletion and audit. Its interactive lifecycle illustration uses synthetic records; the original application was reviewed but not rerun for this site update.
- [Personal AI workspace](https://github.com/GuHang2011/engineering-notes/blob/main/notes/personal-ai-keys.md): an existing archive-system module, with synthetic UI fixtures, public engineering notes and documented tests that mock the provider; no real provider key was used.
- [Release-gate example](cases/examples/README.md): dependency-free JavaScript, tests and limitations.

Project screenshots use synthetic demo content. Public cases exclude original databases, credentials, private configuration and student records. Latest notebook additions: **2026-10-25**. The Neurocomputing entry follows the October 24 revision and author confirmation; other research statuses follow the September CV. The new notes were compiled with AI-assisted drafting and translation; each distinguishes code observations, examples and proposed checks. Generative-model examples are learning guides and were not run locally for this update.

The React workflow and low-code form entries were added **2026-10-22**. The Personal AI Workspace case was added **2026-10-23** as an engineering highlight from an existing archive-system module: its page links to public engineering notes, synthetic screenshots and recorded mock-provider checks. It is not presented as an independently deployed product. The React page runs its locally bundled TypeScript source, and the low-code page has a schema editor and native-control renderer. Neither learning entry is a production deployment or a claim about an existing private application.

## Preview locally

Serve this folder to load the experiments' local data and JavaScript modules:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

Push these files to the root of the `GuHang2011.github.io` repository. In **Settings → Pages**, choose **Deploy from a branch**, the `main` branch, and `/ (root)`. Once Pages finishes deployment, the site is available at the intended website address above. No custom domain or extra build service is required.

## Maintain

- Edit content in `index.html`. Translated text uses paired `data-en` and `data-zh` attributes; keep both in sync. The visible text should match the English attribute for the no-JavaScript version.
- For the notebook, edit `notebook/content/*.json` and run `python notebook/build.py` to regenerate committed HTML; see [notebook maintenance](notebook/README.md). Serving the generated site requires no build service.
- For translated accessible names, use paired `data-en-label` and `data-zh-label` attributes.
- Research titles remain in their original English in both interface languages.
- Update research statuses only when supported by evidence. Add a DOI or proceedings URL only after verifying it.
- `academic.css` and `academic.js` provide shared layouts and interactions. Homepage refinements load afterward; `portfolio-design.css` is the final homepage-only visual layer for the ivory / navy palette, image-led cards, typography, themes, responsive layout and motion. Keep new homepage visual overrides there. `highlights.js` owns the carousel's keyboard, touch and optional autoplay behavior. Research and article pages retain their own styles.
- `reader.js` manages the homepage's reading-preferences disclosure, saved appearance and motion choices, and research-summary expansion. Keep the controls' `data-reader-*` attributes and `aria-controls` targets intact. Theme and motion state are applied to the root element as `data-reader-theme` and `data-reader-motion`; preference storage is optional and controls remain usable when it fails. A short palette transition runs only for a deliberate theme change, and the page-head script restores a valid saved palette before the first paint.
- When adding animation, respect both the system reduced-motion preference and the reader's saved choice. Use motion to clarify an action or selection, and keep the content readable before scripts run. Keep all-summary labels synchronized after individual summary toggles and language changes.
- The learning-lab card links to the [live dashboard](https://guhang2011.github.io/frontend-data-lab/) and the [dynamic-form demo](https://guhang2011.github.io/frontend-data-lab/demos/form/). Keep these URLs aligned with the learning lab's GitHub Pages deployment; each link has both English and Chinese labels.
- Update the source note and `sitemap.xml` after substantive content changes.
- Before publishing, check both languages, light and dark palettes, saved preferences, system and manual reduced motion, individual and all-summary controls, research and project filters, dialogs, section links, keyboard navigation, mobile layout, print output, local links and the release example.

## Files

```text
index.html          Semantic page content and bilingual copy
academic.css        Flat academic layout and responsive / print styles
academic.js         Language, filters, navigation, dialogs and reading progress
homepage.css        Homepage palette, reading layout, themes and print overrides
portfolio-design.css Final homepage visual layer: project previews, cards and themes
highlights.js       Evidence-led highlights carousel and motion controls
reader.js           Saved reading preferences and research-summary controls
cases/              Selected local cases and an extracted release example
notebook/           Bilingual notes, source content and an optional static renderer
demos/              Interactive experiments, generators, tests and methods
styles.css          Legacy research-page styles
script.js           Legacy research-page interactions
assets/favicon.svg  Local vector favicon
robots.txt          Search crawler instructions
sitemap.xml         Canonical page sitemap
.nojekyll           Serve the static files without Jekyll
```

### Learning desk · 20 October 2026

The homepage presents a compact editorial reading desk with latest, frontend, data, model and engineering filters. Topic changes retain keyboard focus and respect reduced-motion settings. A short update link near the introduction leads directly to the collection. Without JavaScript all twelve article links remain readable. New notes cover RAG evaluation, async request races and SQL windows, with standalone teaching examples.

## Virtual presenter videos / 虚拟主播展示

新增带中文配音的 34 秒二维主播展示、22 秒操作流程回放，以及[公开交互样例](demos/virtual-host/)。原有模型早停和数据质量视频保留，首页共四段视频。每段提供封面、字幕、项目说明和下载入口。

角色取自本地丝路智链 VirtualHost 组件，商品采用合成教学内容；配音为通用合成声音。该展示不代表写实数字人模型推理。详见[实现与项目心得](demos/virtual-host/README.md)。

## Research refresh · 24 October 2026

The homepage, GitHub profile, public CV and proposed research brief now use consistent manuscript status. [Study overview](research/fusion-audit.html) documents findings and scope. The proposed emotion-recognition agenda separates existing evidence from future work. Native disclosure controls and a responsive research spotlight provide a short reading path; reduced-motion and no-JavaScript reading are supported. Private manuscript and RP attachments are not part of this publication.

## Homepage review · 26 October 2026

The review focuses on what a prospective supervisor can verify: the research question, existing evidence, engineering work and proposed next step.

- The opening now names concrete areas of work. A full-width research map distinguishes the current news-classification study from proposed emotion-recognition work; detailed interests remain in an expandable section.
- Each highlight includes a source or scope note. The Neurocomputing manuscript is submitted, not accepted; U Mobile figures are reported in the supplied CV without public measurement logs; the data example is synthetic; the AI workspace checks use a mocked provider.
- The research entry distinguishes related implementation from a complete artifact release for the revision. Decorative diagrams illustrate the topic and do not present new measurements.
- The homepage again links all fifteen published notes and the existing [Reliability Gate Lab](demos/reliability-gates/). The lab illustrates explicit rules on synthetic inputs and is not a trained emotion-recognition result.
- Carousel controls, keyboard focus, screen-reader states, stable slide height, motion preferences, mobile layout, printing and reading without JavaScript were checked. Browser checks cover English desktop and Chinese widths of 1280, 1024, 768, 390 and 320 pixels, plus light and dark palettes.

This is a review of the public page, not a new experiment or a publication-status update. Official conference citations, confirmed author order for DASFAA and complete revision artifacts still require primary records; they are not invented or implied by the page design.

## 2026-10-27 · Project archive and learning notes

- [四个历史前端项目 / Four historical frontend cases](cases/early-frontend/README.md): desktop/mobile production feedback, factory administration and telecom service interfaces; responsibilities from the author’s supplied CV.
- [学习笔记集 / Notebook](https://guhang2011.github.io/notebook/) now has 19 articles, including TFT inputs, graph semantics, time-aware validation and demo handoffs.
- [Runnable protocol examples](notebook/examples/climate-protocol-README.md): 10 synthetic checks passed; no manuscript training or performance claims.

## 2026-10-27 · Homepage frontend review

[Review findings, changes and validation](docs/frontend-review-20261027.md): repaired filtered-project anchors and mobile-menu dismissal; added a six-project default view and notebook search; improved text contrast and reduced display-media bytes by 51.4%. All twelve projects and nineteen notes remain accessible.


## 2026-10-28 · Engineering workflow demos

- [Production Reporting Workbench](https://guhang2011.github.io/demos/production-workbench/): machine selection, synthetic scan, quantity validation, a frozen submission snapshot, progress and retry.
- [Telecom Service Desk](https://guhang2011.github.io/demos/telecom-service/): customer lookup, new install / suspension / relocation, order review and explicit duplicate-conflict recovery.

Each has a sample preset, bilingual guidance, responsive layout, keyboard support and motion preferences. These are newly written browser learning prototypes based on historical CV scenarios; no original employer source code or production data is published. [Design and verification](demos/operations-notes.md).


## 2026-10-29 · Frontend learning notes

Six new bilingual notes cover cross-platform boundaries, request ownership, weather fallback, attachment readiness, low-code contracts and safe demo initialization. [Learning log](https://guhang2011.github.io/notebook/journal.html) · [Source review and 27 rerun checks](notebook/frontend-review-20261029.md).

新增六篇大前端笔记，结合近期项目代码整理具体取舍与后续问题；本次复跑 5 个请求作用域场景、12 个天气场景及 10 项表单配置测试。


### AI 与前端学习感悟

新增[个人感悟：AI 对前端的冲击很大，我想怎样继续学下去](https://guhang2011.github.io/notebook/ai-frontend-reflection.html)。结合近期项目笔记，整理对 AI 编程的看法与下一步学习计划。笔记集现有 26 篇。


## 2026-10-30 · Homepage reading review

Three selected engineering projects and three actionable demos now lead the page. Supplementary diagrams and films remain available on demand. [Review, fixes and verification](reviews/homepage-20261030.md).

## 2026-10-30 · Portfolio visual redesign

Real project previews, larger image-led case cards, a navy demo section and a quieter research / notebook layout now give the homepage a clearer visual identity. The original project screenshot remains available in the lightbox; its 47,700-byte WebP cover serves the opening and selected-work card. [Visual decisions and browser checks](reviews/visual-design-20261030.md).


## 2026-10-31 · Engineering case and learning notes

新增[沭阳之家工程案例](https://guhang2011.github.io/cases/shuyang/)及[四篇学习笔记](https://guhang2011.github.io/notebook/engineering-log-20261031.html)：目录迁移、移动端接口契约、上传队列与发布产物校验。笔记总数为 30。首页同步公开项目版本；历史验收记录仍按原版本与日期引用。

Added a source-based Shuyang Home case and four bilingual engineering notes. This is a portfolio content update, not a new full application acceptance run.


## 2026-10-31 · Functional review

修复项目／笔记筛选与视频链接状态、截图失败恢复、图片说明翻译、键盘焦点和研究计划页打印恢复。

[逐项问题与验证范围](reviews/functional-review-20261031.md) · [浏览器回归脚本](reviews/checks/functional-review.js) · [复跑方法](reviews/checks/README.md)。

The review covers 49 portfolio assertions plus focused checks of the existing engineering demos. Research status and project acceptance claims are unchanged.

## 2026-10-31 · Floating project cinema

首页新增可收起的项目放映室，展示虚拟主播、操作流程、模型早停与数据处理四段现有短片。支持中英字幕、项目切换、失败重试和页面内观看；默认不播放，收起即暂停，适配手机与深色模式。

[设计与验证](reviews/floating-player-20261031.md) · [播放器回归脚本](reviews/checks/floating-player.js)。视频使用范围和合成内容标注保持可见。
