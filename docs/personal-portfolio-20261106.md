# Personal portfolio · 6 November 2026

The homepage now selects three engineering projects, two first-author submissions and three recent notes. Full records remain in the project directory (15 projects), research directory (five entries) and notebook (43 articles). The six-entry learning timeline and older learning resources remain available through disclosures.

## Design decisions

- Direct personal introduction and contact links, followed immediately by selected work.
- Each project places its interface screenshot, demonstration or case, source and scope together. A counselor case is not presented as a publicly deployable application. Learning prototypes and synthetic data stay labeled.
- Screenshot crops make interface details larger. Full public screenshots remain accessible through an image dialog and a no-JavaScript fallback. Before publication, the concurrent FieldLens v1.9 update was merged: its current public screenshot, project record, case and demonstration links are retained. All depicted detection annotations are preset demonstration data.
- A warm neutral reading surface, blue actions and muted green/blue/ochre screenshot backgrounds create a consistent hierarchy. Main body copy uses 17–19px text, with 14px secondary labels on the new homepage.
- Animation is limited to project entry and image hover feedback. User and OS reduced-motion preferences are honored. No auto-advancing hero or floating video player is loaded on the homepage; the project directory retains the existing films and optional player.
- The compact section/progress strip remains. Its percentage measures scroll position in the visible page, not reading completion.

References: [Anthony Fu](https://antfu.me/) for direct personal writing and separate directories; [Linear](https://linear.app/) for interface-focused project presentation; [Josh W. Comeau](https://www.joshwcomeau.com/) for readable learning content and color; [Distill](https://distill.pub/) for clear research summaries. No reference site's images, font files or source code are copied.

## Navigation and record preservation

`projects.html` preserves the complete project collection, filters, demonstrations, films and engineering explanations. `research.html` preserves the full publication records, submission statuses, summaries, evidence limits and proposed research. Both use root-relative directory placement so existing asset and case paths remain valid.

The new homepage has a small migration map for moved fragment identifiers. Prior project-filter URLs move to the project directory; prior notebook search/topic URLs map to the existing notebook filters. Direct links to the two featured studies, experience and learning timeline remain on the homepage.

No new study dates, performance results, admissions claims or author statuses were introduced.

## Validation

Local validation completed before publication:

- 13 browser check groups and three additional edge-case groups passed. No runtime exceptions or failed loaded same-origin assets were observed in the main browser checks.
- All three pages were checked in Chinese and English at 320, 390, 768, 1024, 1440 and 1920px widths, with no horizontal overflow. Homepage introduction, project summary and note copy measured 17–19px.
- All 26 sampled foreground/background pairs across light and dark themes met a 4.5:1 text contrast ratio.
- Screenshot enlargement, failed-image retry, keyboard dismissal and focus return, mobile navigation, filters, print layout and reduced-motion preferences were checked.
- Scroll progress reached 0%, 50% and 100% at the corresponding page positions and updated after disclosures changed the page height.
- Static checks preserved all 15 project records, 43 note links, five research records and six timeline entries. Checks covered 267 local paths and 92 migrated fragment targets, with no reported issues.
- All four existing films loaded video metadata and retained two caption tracks each. This verifies playback resources and captions, not the underlying model or application backend.

The homepage HTML decreased from 242,334 to 57,740 bytes. This is a source-size comparison, not a network-performance benchmark. These checks cover the public presentation and navigation; they do not establish project backend correctness or research-model performance.
