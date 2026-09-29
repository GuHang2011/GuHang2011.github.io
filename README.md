# Hang Gu · Research & Engineering

A bilingual academic portfolio for **Hang Gu (顾航)**, connecting research interests, frontend engineering, and data-science learning.

**Intended website:** [guhang2011.github.io](https://guhang2011.github.io/) · **GitHub:** [@GuHang2011](https://github.com/GuHang2011)

## Design

Warm paper, deep ink, and restrained green accents. Editorial typography, a custom vector illustration, a readable research list, and an accessible layout that adapts to phones and desktops.

- Complete English / Chinese interface with a saved language preference.
- An interactive research diagram: switch between Vision, Text, and Evaluation. The active node and research question update together; arrow keys, Home, and End work in the tab list.
- Project filters for all work, public code, and applied engineering, with accessible selection states and a result count.
- A reading-progress indicator, subtle section entrances, and flat hover / keyboard-focus accents.
- Semantic HTML, visible keyboard focus, a skip link, and reduced-motion support.
- No build step, third-party JavaScript, remote fonts, analytics, or CDN dependencies.
- The English content and navigation work without JavaScript.

## Content

1. **Research:** manuscripts, conference work, and master’s research, with explicit publication status.
2. **Engineering:** public repositories and selected project descriptions.
3. **Notebook:** entry points to the [Frontend & Data Lab](https://github.com/GuHang2011/frontend-data-lab).
4. **Background:** education and professional experience.

Research status is updated September 2026. Manuscripts and accepted work are labeled separately. The KICP project links to its implementation and setup documentation; the learning lab uses synthetic data.

## Preview locally

Open `index.html` directly in a modern browser, or serve this folder:

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
- Edit design tokens and responsive rules in `styles.css`.
- The learning-lab card links to the [live dashboard](https://guhang2011.github.io/frontend-data-lab/) and the [dynamic-form demo](https://guhang2011.github.io/frontend-data-lab/demos/form/). Keep these URLs aligned with the learning lab's GitHub Pages deployment; each link has both English and Chinese labels.
- Update the source note and `sitemap.xml` after substantive content changes.
- Before publishing, check both languages, all three research tabs, all three project filters, section links, keyboard navigation, mobile layout, and reduced-motion behavior.

## Files

```text
index.html          Semantic page content and bilingual copy
styles.css          Responsive editorial design
script.js           Language, research tabs, filters, progress, and entrances
assets/favicon.svg  Local vector favicon
robots.txt          Search crawler instructions
sitemap.xml         Canonical page sitemap
.nojekyll           Serve the static files without Jekyll
```
