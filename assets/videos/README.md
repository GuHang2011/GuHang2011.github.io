# Project Video Library

Four videos explain inspectable engineering examples. The two virtual-presenter videos were extended on 2026-11-01 with the Mao Live2D sample character; the original two silent algorithm explainers remain below. These are public demonstrations, not production streams, real training runs or private-data recordings.

## Virtual Presenter Showcase

`virtual-host-showcase.mp4` (about 101 seconds; narration 101.016 seconds) records the [public presenter](../../demos/virtual-host/) with Chinese synthesized narration. Six chapters cover the character, product checks, script preparation, human review, playback controls and next steps. Mao is an official Live2D sample character; mouth opening follows measured audio amplitude, not phoneme alignment. The video includes bilingual on-screen text and VTT captions.

## Virtual Presenter Workflow

`virtual-host-workflow.mp4` (60 seconds, silent) replays seven steps: start, pause, chapter selection, switch to Lin, return to Mao, reduced motion and restart. Highlighted controls and step labels explain transitions. [Implementation and provenance](../../demos/virtual-host/README.md).

To reproduce: run `python tools/serve_presenter.py`, run `tools/record_host_videos.js` using Playwright CLI `run-code --filename`, then run `python tools/encode_host_videos.py --site . --frames output/playwright/presenter-frames --ffmpeg <executable>`. Browser recording uses 1280 × 720 at 24 fps. `virtual-host-metadata.json` describes the clips.

This content uses sample data owned and copyrighted by Live2D Inc. The sample data are utilized in accordance with terms and conditions set by Live2D Inc. This content itself is created at the author’s sole discretion.

## Early Stopping Replay

`kapt-early-stopping.mp4` animates the actual output of `traceEarlyStopping(syntheticScores("min"))` in [`demo-core.mjs`](../../cases/kapt/demo-core.mjs). The parameters are `mode=min`, `patience=3`, and `minDelta=0.005`. The synthetic validation scores produce a best checkpoint at epoch 5 and a stop at epoch 8. No model benchmark is claimed.

[Interactive case and explanation](https://guhang2011.github.io/cases/kapt/)

## Data Preparation Audit

`data-preparation-audit.mp4` parses the built-in `MIXED_CSV` fixture using the bundled Papa Parse 5.5.3 parser and runs stages 0 through 4 of [`pipeline.mjs`](../../demos/data-preparation/pipeline.mjs). The default policies quarantine missing values and reject conflicting duplicates. The actual output contains 17 input records, 10 retained records, 7 quarantined records, and an amount total of 47.50. Source-row identities, rejection reasons, and group totals come directly from those outputs.

[Interactive audit and explanation](https://guhang2011.github.io/demos/data-preparation/)

## Accessibility and Provenance

- Each original algorithm video is 18 seconds at 1280 x 720 and 24 frames per second, encoded as H.264/YUV420p with fast-start playback and no audio.
- The homepage provides captions and an equivalent text summary. The linked cases provide detailed text and interactive alternatives.
- Posters show the final verified state. `metadata.json` records the exact synthetic scores, epoch trace, pipeline audit, source-row identities, source hashes, and decoded-frame checks.
- `validation-contact-sheet.jpg` contains decoded first, middle, and final frames of both videos for visual inspection.
- The KAPT case is a learning and engineering exercise; its page and repository retain the KANO upstream attribution and explain what has and has not been reproduced.

## Reproduce

The renderer is published at `tools/render_project_videos.py` in the website repository. Install Pillow, ensure Node.js and FFmpeg are available, then run from the repository root:

```text
python tools/render_project_videos.py --site . --ffmpeg <executable>
```

Replace `<executable>` with your FFmpeg executable path. Alternatively install `imageio-ffmpeg` and omit `--ffmpeg`. The script executes the JavaScript modules rather than maintaining duplicate implementations of the algorithms. Use `--preview` to inspect posters before encoding. Segoe UI (Windows) or DejaVu Sans (Linux) supplies the fonts. The videos include English and Chinese WebVTT caption files aligned with their actual replay stages.
