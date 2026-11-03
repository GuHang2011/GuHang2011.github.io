# Content and reading layout / 内容与阅读布局

Content prepared on 3 November 2026; browser verification completed on 4 November 2026 (Asia/Shanghai).

## Problems addressed

| Before | Change |
| --- | --- |
| Three recent-material cards carried the same visual weight. | One main engineering update, with two smaller entries for FieldLens and teaching materials. |
| Search opened a separate page, while the homepage only offered topic filters. | Search both languages directly on the homepage; keep topic and query in the URL. |
| Engineering notes formed an increasingly long list. | Show six matches at a time, with a visible continuation button and focus moved to the first newly revealed article. |
| Mobile readers passed the feature block before reaching articles. | Put the searchable list before supplementary reading routes on small screens. |
| Recent project changes had little accompanying reasoning. | Add three source-based reflections about task permissions, notification state and backup restoration. |

The existing 36 notes remain available; the collection now contains **39 bilingual notes**. The 14-project directory, research entries and latest FieldLens update remain intact. Existing language, theme and reduced-motion controls are reused.

## Added reading

- [事项汇总之后，权限还要逐项检查](../notebook/work-center-boundaries.html)
- [已读不等于办完：通知与业务状态怎样分开](../notebook/notification-read-state.html)
- [备份恢复：先看差异，再决定覆盖哪些记录](../notebook/backup-restore-review.html)

The articles link to pinned source commits. They distinguish observations from proposed checks and possible future designs. The FieldLens backup note specifically describes v1.2; it does not claim to cover all later inspection features.

## Verification

- **40 responsive combinations:** homepage, notebook index and three articles; Chinese and English; widths 320, 390, 768 and 1440 pixels. No document-width overflow in these checks.
- **23 additional browser assertions:** filtering, search, pagination, focus continuation, language switching, reload, history restoration, shared URLs, empty results, reduced motion, printing and no-JavaScript reading.
- **11 automated accessibility states:** both languages on the five pages, plus the modified homepage sections in dark mode. No violations reported for the selected WCAG A/AA rules. This is automated coverage, not a claim of complete accessibility conformance.
- **268 local links and anchors checked**, 37 earlier article/log links preserved, no duplicate IDs on checked pages. The separately deployed FieldLens route returned HTTP 200.
- Screenshots reviewed at desktop and mobile widths, plus dark mode and an article page. Chinese lead-title wrapping was refined after that review.
- No page script exceptions were captured during the browser checks.

The business applications, real-device behavior, model inference and research experiments were not rerun in this content/layout update. Earlier project acceptance numbers retain their original version and scope.

## Maintenance

Article sources are in `notebook/content/*.json`. Regenerate the three additions and the index with:

```sh
python notebook/build.py --only work-center-boundaries notification-read-state backup-restore-review
```

Homepage search uses `notes` and `notes-q` query parameters, for example:

`/?notes=data&notes-q=backup#notebook`

Without JavaScript, all article links remain readable and the search form navigates to the full notebook. The enhanced list uses six entries per batch; the “latest” view continues to show the three newest additions.
