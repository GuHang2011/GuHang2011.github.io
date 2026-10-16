# Hang Gu · Research & Engineering

A bilingual academic portfolio for **Hang Gu (顾航)**, connecting research interests, frontend engineering, and data-science learning.

**Intended website:** [guhang2011.github.io](https://guhang2011.github.io/) · **GitHub:** [@GuHang2011](https://github.com/GuHang2011)

## Design

The academic reading structure is inspired by [winsleo.github.io](https://winsleo.github.io/), adapted to Hang Gu's own background and evidence. The homepage's October 17, 2026 design uses navy text, muted teal accents, white and pale-gray surfaces, flat research lists and screenshot-led project rows. The layout adapts to phones and desktops, with larger text for research status, project context and evidence links.

The research brief, code and verification evidence, and academic CV appear immediately after the introduction so prospective supervisors can find the application materials quickly. Education sits beside the introduction in the profile panel. Publication status and learning-project labels retain distinct meanings.

- Complete English / Chinese interface with a saved language preference.
- Research filters for manuscripts, conference work and thesis; native expandable summaries and an expand / collapse all summaries control.
- Project filters for engineering, research and learning, with accessible selection states and result counts.
- Screenshot previews, mobile navigation, print styles, reading progress and restrained hover / keyboard-focus accents. Filter feedback and highlighted project destinations help readers keep their place; content remains visible on arrival.
- Reading preferences offer light and dark palettes and a reduced-motion option, saved locally when browser storage is available. The system's reduced-motion preference takes priority, including for the back-to-top action.
- Semantic HTML, visible keyboard focus, a skip link, and reduced-motion support.
- No site build step, remote fonts, analytics, or runtime CDN dependencies. The experiments bundle pinned [Chart.js](https://www.chartjs.org/) 4.4.9 and [PapaParse](https://www.papaparse.com/) 5.5.3 under MIT licenses. Local tool icons are from [Lucide](https://lucide.dev/) under the ISC license.
- The English content and navigation work without JavaScript.

## Content

1. **Research:** manuscripts, conference work, and master’s research, with explicit publication status.
2. **Engineering:** public repositories and selected project descriptions.
3. **Notebook:** [six bilingual study notes and project reflections](notebook/) on frontend interaction, data quality, model validation, prompt contracts, order consistency and permission boundaries. Searchable by title, summary and tag, with topic filters, source references, code examples and printable article pages. Earlier repositories remain available in the homepage's expandable reading list.
4. **Background:** education and professional experience.
5. **Interactive experiments:** financial clustering, data preparation audits and model evaluation, with synthetic data, source code, notes and reproducible checks. [Reading map](demos/README.md).

Research status is updated September 2026. Manuscripts and accepted work are labeled separately. The KICP project links to its implementation and setup documentation; the learning lab uses synthetic data.

## Local Engineering Cases

- [Counselor collaboration and release verification](https://guhang2011.github.io/cases/counselor/): role-scoped collaboration, tasks, release evidence and an extracted release-gate example. Existing October 13 records are distinguished from newly executed example tests.
- [College materials archive](https://guhang2011.github.io/cases/archive/): permissions, versioning, review, logical deletion and audit. Its interactive lifecycle illustration uses synthetic records; the original application was reviewed but not rerun for this site update.
- [Release-gate example](cases/examples/README.md): dependency-free JavaScript, tests and limitations.

Project screenshots use synthetic demo content. Public cases exclude original databases, credentials, private configuration and student records. Notebook content updated **2026-10-17**; research statuses remain based on the September CV. The new notes were compiled with AI-assisted drafting and translation; each distinguishes code observations, examples and proposed checks.

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
- `academic.css` and `academic.js` provide shared academic layouts and interactions, including language, filters, navigation, previews and reading progress. `homepage.css`, loaded after the shared stylesheet only on the homepage, defines the navy / teal palette, light and dark theme variables, homepage layout, responsive refinements and print overrides. Existing research pages retain `styles.css` and `script.js`.
- `reader.js` manages the homepage's reading-preferences disclosure, saved appearance and motion choices, and research-summary expansion. Keep the controls' `data-reader-*` attributes and `aria-controls` targets intact. Theme and motion state are applied to the root element as `data-reader-theme` and `data-reader-motion`; preference storage is optional and controls remain usable when it fails.
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
