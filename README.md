# Hang Gu · Research & Engineering

A bilingual academic portfolio for **Hang Gu (顾航)**, connecting research interests, frontend engineering, and data-science learning.

**Intended website:** [guhang2011.github.io](https://guhang2011.github.io/) · **GitHub:** [@GuHang2011](https://github.com/GuHang2011)

## Design

The academic reading structure is inspired by [winsleo.github.io](https://winsleo.github.io/), adapted to Hang Gu's own background and evidence. White and light-gray bands, blue accents, flat research lists and screenshot-led project rows adapt to phones and desktops.

- Complete English / Chinese interface with a saved language preference.
- Research filters for manuscripts, conference work and thesis; native expandable summaries.
- Project filters for engineering, research and learning, with accessible selection states and result counts.
- Screenshot previews, mobile navigation, print styles, reading progress and restrained hover / keyboard-focus accents.
- Semantic HTML, visible keyboard focus, a skip link, and reduced-motion support.
- No site build step, remote fonts, analytics, or runtime CDN dependencies. The experiments bundle pinned [Chart.js](https://www.chartjs.org/) 4.4.9 and [PapaParse](https://www.papaparse.com/) 5.5.3 under MIT licenses. Local tool icons are from [Lucide](https://lucide.dev/) under the ISC license.
- The English content and navigation work without JavaScript.

## Content

1. **Research:** manuscripts, conference work, and master’s research, with explicit publication status.
2. **Engineering:** public repositories and selected project descriptions.
3. **Notebook:** entry points to the [Frontend & Data Lab](https://github.com/GuHang2011/frontend-data-lab).
4. **Background:** education and professional experience.
5. **Interactive experiments:** financial clustering, data preparation audits and model evaluation, with synthetic data, source code, notes and reproducible checks. [Reading map](demos/README.md).

Research status is updated September 2026. Manuscripts and accepted work are labeled separately. The KICP project links to its implementation and setup documentation; the learning lab uses synthetic data.

## Local Engineering Cases

- [Counselor collaboration and release verification](https://guhang2011.github.io/cases/counselor/): role-scoped collaboration, tasks, release evidence and an extracted release-gate example. Existing October 13 records are distinguished from newly executed example tests.
- [College materials archive](https://guhang2011.github.io/cases/archive/): permissions, versioning, review, logical deletion and audit. Its interactive lifecycle illustration uses synthetic records; the original application was reviewed but not rerun for this site update.
- [Release-gate example](cases/examples/README.md): dependency-free JavaScript, tests and limitations.

Project screenshots use synthetic demo content. Public cases exclude original databases, credentials, private configuration and student records. Site content updated **2026-10-13**.

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
- For translated accessible names, use paired `data-en-label` and `data-zh-label` attributes.
- Research titles remain in their original English in both interface languages.
- Update research statuses only when supported by evidence. Add a DOI or proceedings URL only after verifying it.
- Homepage design and interaction live in `academic.css` and `academic.js`. Existing research pages retain `styles.css` and `script.js`.
- The learning-lab card links to the [live dashboard](https://guhang2011.github.io/frontend-data-lab/) and the [dynamic-form demo](https://guhang2011.github.io/frontend-data-lab/demos/form/). Keep these URLs aligned with the learning lab's GitHub Pages deployment; each link has both English and Chinese labels.
- Update the source note and `sitemap.xml` after substantive content changes.
- Before publishing, check both languages, research and project filters, dialogs, section links, keyboard navigation, mobile layout, local links and the release example.

## Files

```text
index.html          Semantic page content and bilingual copy
academic.css        Flat academic layout and responsive / print styles
academic.js         Language, filters, navigation, dialogs and reading progress
cases/              Selected local cases and an extracted release example
demos/              Interactive experiments, generators, tests and methods
styles.css          Legacy research-page styles
script.js           Legacy research-page interactions
assets/favicon.svg  Local vector favicon
robots.txt          Search crawler instructions
sitemap.xml         Canonical page sitemap
.nojekyll           Serve the static files without Jekyll
```
