# Project Video Library

These two silent videos are generated explanations of the online demonstrations. They are not recordings of the original private projects and do not show real training experiments or production data.

## Early Stopping Replay

`kapt-early-stopping.mp4` animates the actual output of `traceEarlyStopping(syntheticScores("min"))` in [`demo-core.mjs`](../../cases/kapt/demo-core.mjs). The parameters are `mode=min`, `patience=3`, and `minDelta=0.005`. The synthetic validation scores produce a best checkpoint at epoch 5 and a stop at epoch 8. No model benchmark is claimed.

[Interactive case and explanation](https://guhang2011.github.io/cases/kapt/)

## Data Preparation Audit

`data-preparation-audit.mp4` parses the built-in `MIXED_CSV` fixture using the bundled Papa Parse 5.5.3 parser and runs stages 0 through 4 of [`pipeline.mjs`](../../demos/data-preparation/pipeline.mjs). The default policies quarantine missing values and reject conflicting duplicates. The actual output contains 17 input records, 10 retained records, 7 quarantined records, and an amount total of 47.50. Source-row identities, rejection reasons, and group totals come directly from those outputs.

[Interactive audit and explanation](https://guhang2011.github.io/demos/data-preparation/)

## Accessibility and Provenance

- Each video is 18 seconds at 1280 x 720 and 24 frames per second, encoded as H.264/YUV420p with fast-start playback and no audio.
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
