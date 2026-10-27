# Hang Gu · Research & Engineering

A bilingual engineering and research portfolio for **Hang Gu (顾航)**, connecting frontend systems, data workflows, model evaluation and teaching.

**Intended website:** [guhang2011.github.io](https://guhang2011.github.io/) · **GitHub:** [@GuHang2011](https://github.com/GuHang2011)

## Climate-risk research · 27 October 2026

**Hybrid AI Framework for Multi-Hazard Climate Risk Governance in Renewable Energy-Water Nexus Systems** — first author, submitted to **Climate Risk Management**, **not accepted**. [Bilingual overview](https://guhang2011.github.io/research/climate-risk.html) · [Abstract and status record](research/climate-risk.md).

研究范围：中国 30 个省份，2005—2024 年；方法：TFT + GNN-CRP。页面整理研究问题、方法分工、摘要报告的发现及后续方向，并同步首页、研究指南、在线简历与 GitHub Overview。内容依据作者提供的摘要及身份／状态说明，不提供尚未公开的数据、性能数值或代码承诺。

## Design

The academic reading structure is inspired by [winsleo.github.io](https://winsleo.github.io/), adapted to Hang Gu's own background and evidence. The homepage's October 19, 2026 design uses navy text, muted teal accents, white and pale-gray surfaces, flat research lists and screenshot-led project rows. A short highlights carousel gives early readers four evidence-led entry points: research audit, measurable delivery, data quality and human-reviewed AI. The layout adapts to phones, tablets and desktops, with concise evidence notes, reviewer questions and restrained transition feedback.

Engineering highlights, code and verification evidence, and the academic CV appear immediately after the introduction. The primary link opens four engineering capabilities with routes to the relevant cases; the research brief remains available in the research section. Education sits beside the introduction in the profile panel. Publication status and learning-project labels retain distinct meanings.

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
7. **AI engineering case:** a full-stack module with account-bound key handling, endpoint policy, editable presentation generation, human review and documented mocked-provider tests. [Case study](cases/ai-office/).

The Neurocomputing entry was updated on 24 October 2026 from the supplied revision and author confirmation: submitted, not accepted. It describes 344 archived training runs, operating-point analysis and archive-artifact audits; FCP is not claimed as a new architecture. The Climate Risk Management entry follows the abstract and author update of 27 October 2026. Other research states follow the supplied CV. DASFAA author order and official proceedings records for conference work are not fully linked yet; confirm current decisions and citations before relying on them. Manuscripts and accepted work are labeled separately. The KICP project links to its implementation and setup documentation; the learning lab uses synthetic data.

## Local Engineering Cases

- [Counselor collaboration and release verification](https://guhang2011.github.io/cases/counselor/): role-scoped collaboration, tasks, release evidence and an extracted release-gate example. Existing October 13 records are distinguished from newly executed example tests.
- [College materials archive](https://guhang2011.github.io/cases/archive/): permissions, versioning, review, logical deletion and audit. Its interactive lifecycle illustration uses synthetic records; the original application was reviewed but not rerun for this site update.
- [Personal AI workspace](https://guhang2011.github.io/cases/ai-office/): an existing archive-system module, with synthetic UI fixtures, public engineering notes and documented tests that mock the provider; no real provider key was used.
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
- `academic.css` and `academic.js` provide shared academic layouts and interactions, including language, filters, navigation, previews and reading progress. `homepage.css`, loaded after the shared stylesheet only on the homepage, defines the navy / teal palette, light and dark theme variables, homepage layout, responsive refinements and print overrides. `highlights.js` owns the homepage evidence carousel and its keyboard, touch, auto-play and motion behavior. Existing research pages retain `styles.css` and `script.js`.
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
