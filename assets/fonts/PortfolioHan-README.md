# Portfolio Han webfont subsets

The Chinese glyphs are Noto Sans SC, distributed under the SIL Open Font License 1.1. See [the bundled license](NotoSansSC-OFL.txt) and [the upstream family](https://github.com/google/fonts/tree/main/ofl/notosanssc).

The three WOFF2 files were obtained through the Google Fonts text-subsetting API for the public homepage, directories and notebook content on 2026-11-11. CSS uses the alias “Portfolio Han”. The two core subsets serve the portfolio; the notes subset adds characters needed by the articles. Browsers request only relevant subsets. Weights 400 through 650 are available; Latin text keeps the existing IBM Plex font.

Both fonts are hosted in this repository. The rendered pages make no Google Fonts requests. Chinese characters added in future content fall back to PingFang SC / Microsoft YaHei until the subsets are regenerated. Keep this license and the existing IBM Plex license when redistributing.

On 2026-11-12, the notes subset was regenerated as `PortfolioHan-notes-20261112.woff2` to cover nine additional Chinese characters in the mobile-workspace note and current project descriptions. The two core subsets remain the same.

On 2026-11-15, `PortfolioHan-update-20261115.woff2` adds 13 Chinese glyphs used in the release-check note and updated project pages. It was obtained through the same Google Fonts text-subsetting API under the bundled Noto Sans SC OFL license. The two core files and the 2026-11-12 notes subset are unchanged. This supplement is also served locally, with an explicit unicode range, at weights 400 through 650.
