# Portfolio design review · 7 November 2026

The homepage, project directory, research directory and notebook now share a warm reading surface, green actions and clearer typography. The first project has a prominent image and dark background; two supporting cases sit side by side. The recently added MeteoFormer demo retains its read-only, synthetic-data description and gains an image entry.

## Findings and changes

| Finding | Change |
| --- | --- |
| Earlier directory skins overrode the newer palette | Scope shared tokens explicitly and align headings, search and filter controls |
| Every homepage project had the same visual weight | One prominent case, two supporting cases, followed by the recent weather demo |
| Chinese headings inherited tight English tracking | Restore normal Chinese heading spacing; keep line lengths and consistent 600-weight headings |
| Notebook summaries remained at 14px | Use 17px summaries and 17–18px article prose; metadata is secondary |
| Notebook navigation pointed to earlier landing paths | Link the index and generator to the full project and research directories |

## References and assets

- [Pentagram](https://www.pentagram.com/): work-led visual hierarchy and a restrained portfolio grid.
- [IBM Design](https://www.ibm.com/design/): consistent alignment and clear typographic hierarchy.
- [IBM Plex](https://github.com/IBM/plex): unmodified Regular and SemiBold WOFF2 files, hosted locally. Copyright IBM Corp.; SIL Open Font License 1.1 is included in `assets/fonts/OFL.txt`. Font loading uses `swap`, with Chinese platform fonts and local fallbacks.

References were inspected online. Layout code is independently implemented; reference-site imagery is not copied. Project screenshots come from the existing public portfolio. No publication statuses, research results, project claims or study dates were added.

## Verification scope

Browser and static checks cover presentation, responsive layout, navigation and existing interactions. They do not establish backend correctness or model performance. The release preserves 15 project records, five research records, 43 note entries and six learning-timeline entries, including both language versions and the recent weather demo.

- 13 main browser check groups, three media/image edge-case groups and six notebook/typography groups passed.
- Main pages and a sample notebook article were checked in Chinese and English across 320, 390, 768, 1024, 1440 and 1920px widths, with no horizontal overflow in those checks.
- All 34 sampled text/background pairs across light and dark homepage themes met 4.5:1 contrast. This sampling is not a complete accessibility certification.
- 333 local asset/link/fragment references passed static validation.
- Screenshot enlargement, retry after image failure, keyboard dismissal/focus return, filters, saved queries, timeline expansion, scroll progress and reduced motion were checked. All four existing project films retained working metadata and bilingual caption tracks.
- Browser font inspection confirmed that the locally hosted Plex font renders Latin text. Blocking font downloads still left readable fallback text.
