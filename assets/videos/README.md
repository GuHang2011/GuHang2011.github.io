# Project Video Library

Four videos explain inspectable engineering examples. Two virtual-presenter videos were added on 2026-10-20; the original two silent algorithm explainers remain below. These are public demonstrations, not production streams, real training runs or private-data recordings.

## Virtual Presenter Showcase

`virtual-host-showcase.mp4` (34.128 seconds) combines a browser replay of the [public 2D presenter](../../demos/virtual-host/) with Chinese synthesized narration. The character and three gestures come from the local Silk Road VirtualHost component; the public stage and controls are adapted for this portfolio. Mouth opening follows the actual audio amplitude, not phoneme alignment. The video includes bilingual on-screen text and VTT captions.

## Virtual Presenter Workflow

`virtual-host-workflow.mp4` (22 seconds, silent) replays six control states: start, pause, chapter selection, resume, third chapter and restart. Highlighted controls and step labels explain each transition. It uses the same public interface, rather than a production stream. [Implementation and provenance](../../demos/virtual-host/README.md).

To reproduce: serve the site, run `tools/record_host_videos.js` using Playwright CLI `run-code --filename`, then run `python tools/encode_host_videos.py --site . --frames output/playwright/host-frames --ffmpeg <executable>`. Browser recording uses 1280 × 720 at 24 fps. `virtual-host-metadata.json` describes the new clips.

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
