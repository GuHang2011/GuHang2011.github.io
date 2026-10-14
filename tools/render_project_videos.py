"""Render silent, reproducible project explainers from the site's JavaScript logic."""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
from pathlib import Path
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parent
SITE = ROOT / "site"
OUT = SITE / "assets" / "videos"
CACHE = ROOT.parent / ".cache" / "homepage-media"
if CACHE.is_dir():
    sys.path.insert(0, str(CACHE))

from PIL import Image, ImageDraw, ImageFont, ImageStat

WIDTH, HEIGHT, FPS, DURATION = 1280, 720, 24, 18
INK = "#182a30"
MUTED = "#5d7076"
BLUE = "#1863c6"
GREEN = "#087d64"
RED = "#bf3c40"
LINE = "#dce5e7"
SURFACE = "#f3f7f8"
PALE_BLUE = "#e8f0fd"
PALE_GREEN = "#e8f6f0"
PALE_RED = "#fbecee"
WHITE = "#ffffff"


def font(size, bold=False):
    name = "segoeuib.ttf" if bold else "segoeui.ttf"
    windows = Path(os.environ.get("WINDIR", "C:/Windows")) / "Fonts" / name
    portable = Path("/usr/share/fonts/truetype/dejavu") / ("DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf")
    for candidate in (windows, portable):
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    raise FileNotFoundError("Install Segoe UI or DejaVu Sans to render this explainer.")


FONTS = {(size, bold): font(size, bold) for size in (20, 22, 24, 26, 28, 32, 38, 42, 48, 64) for bold in (False, True)}


def label(draw, xy, text, size=24, color=INK, bold=False, anchor=None):
    text = str(text)
    face = FONTS[size, bold]
    if anchor and not hasattr(draw, "textbbox"):
        width, height = face.getsize(text)
        x, y = xy
        x -= width if anchor[0] == "r" else width / 2 if anchor[0] == "m" else 0
        y -= height / 2 if anchor[1] == "m" else 0
        xy = x, y
        anchor = None
    draw.text(xy, text, font=face, fill=color, anchor=anchor)


def box(draw, rect, fill, outline=None, radius=6):
    if hasattr(draw, "rounded_rectangle"):
        draw.rounded_rectangle(rect, radius=radius, fill=fill, outline=outline, width=1)
    else:
        draw.rectangle(rect, fill=fill, outline=outline, width=1)


def ease(value):
    value = max(0.0, min(1.0, value))
    return value * value * (3 - 2 * value)


def mix(first, second, amount):
    a = tuple(int(first[i:i + 2], 16) for i in (1, 3, 5))
    b = tuple(int(second[i:i + 2], 16) for i in (1, 3, 5))
    return tuple(round(x + (y - x) * amount) for x, y in zip(a, b))


def base(title, subtitle, chapter, t):
    frame = Image.new("RGB", (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(frame)
    draw.rectangle((0, 0, 10, HEIGHT), fill=BLUE)
    label(draw, (48, 34), title, 38, bold=True)
    label(draw, (48, 87), subtitle, 22, MUTED)
    label(draw, (1230, 48), chapter, 20, MUTED, anchor="ra")
    draw.line((48, 126, 1230, 126), fill=LINE, width=2)
    draw.rectangle((48, 704, 1230, 708), fill=LINE)
    draw.rectangle((48, 704, 48 + (1230 - 48) * min(1, t / DURATION), 708), fill=BLUE)
    return frame, draw


def read_sources():
    node = shutil.which("node")
    if not node:
        raise FileNotFoundError("Node.js is required to execute the source logic.")
    source = """
import { syntheticScores, traceEarlyStopping } from __KAPT__;
import { MIXED_CSV, runPipeline } from __PIPELINE__;
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const Papa = require(__PAPA__);
const parsed = Papa.parse(MIXED_CSV, {header: true, skipEmptyLines: true});
if (parsed.errors.length) throw new Error(JSON.stringify(parsed.errors));
const options = {mode: 'min', patience: 3, minDelta: 0.005};
const scores = syntheticScores(options.mode);
const stages = [0, 1, 2, 3, 4].map(stage => runPipeline(parsed.data, {}, stage));
console.log(JSON.stringify({options, scores, trace: traceEarlyStopping(scores, options), stages}));
"""
    for token, path in {"__KAPT__": SITE / "cases/kapt/demo-core.mjs", "__PIPELINE__": SITE / "demos/data-preparation/pipeline.mjs", "__PAPA__": SITE / "demos/vendor/papaparse.min.js"}.items():
        source = source.replace(token, json.dumps(path.as_posix() if token == "__PAPA__" else path.as_uri()))
    result = subprocess.run([node, "--input-type=module", "-e", source], cwd=SITE, capture_output=True, text=True, check=True)
    data = json.loads(result.stdout)
    final = data["trace"][-1]
    assert final["bestEpoch"] == 5 and final["epoch"] == 8 and final["stopped"]
    assert data["stages"][-1]["summary"] == {"input": 17, "kept": 10, "quarantined": 7, "zeros": 2, "imputed": 0, "totalCents": 4750}
    return data


def kapt_frame(t, data):
    trace = data["trace"]
    frame, draw = base("Early Stopping Replay", "Synthetic validation scores  /  KAPT learning case", "01 / MODEL EVALUATION", t)
    reveal = max(0.0, min(len(trace), (t - 0.8) / 1.5))
    complete = int(reveal)
    current = trace[max(0, complete - 1)] if complete else None
    final = bool(current and current["stopped"])
    label(draw, (48, 151), "Validation loss", 26, bold=True)
    label(draw, (830, 154), "Lower is better", 20, MUTED, anchor="ra")
    left, top, right, bottom = 104, 226, 830, 527

    def point(epoch, score):
        return left + (epoch - 1) * (right - left) / 7, bottom - (score - 0.50) / 0.35 * (bottom - top)

    for tick in (0.50, 0.60, 0.70, 0.80):
        _, y = point(1, tick)
        draw.line((left, y, right, y), fill=LINE, width=1)
        label(draw, (88, y), f"{tick:.2f}", 20, MUTED, anchor="rm")
    for epoch in range(1, 9):
        x, _ = point(epoch, 0.5)
        label(draw, (x, 552), epoch, 20, MUTED, anchor="mm")
    label(draw, (left, 587), "EPOCH", 20, MUTED)
    draw.line((left, bottom, right, bottom), fill=MUTED, width=2)
    if current and current["bestEpoch"] >= 5:
        _, threshold_y = point(1, current["bestScore"] - data["options"]["minDelta"])
        for x in range(int(left), int(right), 14):
            draw.line((x, threshold_y, min(x + 7, right), threshold_y), fill=GREEN, width=2)
        label(draw, (right, 587), "Improvement threshold 0.545", 20, GREEN, anchor="ra")

    positions = [point(row["epoch"], row["score"]) for row in trace]
    if complete >= 2:
        draw.line(positions[:complete], fill=BLUE, width=5)
    fractional = reveal - complete
    if 0 < complete < len(trace) and fractional:
        start, end = positions[complete - 1], positions[complete]
        head = tuple(start[i] + (end[i] - start[i]) * ease(fractional) for i in (0, 1))
        draw.line((start, head), fill=BLUE, width=5)
    for index, position in enumerate(positions[:complete]):
        row = trace[index]
        color = GREEN if current and row["epoch"] == current["bestEpoch"] else (RED if row["stopped"] else BLUE)
        x, y = position
        draw.ellipse((x - 6, y - 6, x + 6, y + 6), fill=WHITE, outline=color, width=4)
    if current:
        x, y = positions[complete - 1]
        pulse = 11 + 3 * math.sin(t * 3)
        draw.ellipse((x - pulse, y - pulse, x + pulse, y + pulse), outline=RED if final else BLUE, width=2)
        label(draw, (x, y - 25), f"{current['score']:.3f}", 22, RED if final else BLUE, bold=True, anchor="mm")
        if current["bestEpoch"] == 5:
            bx, by = positions[4]
            label(draw, (bx - 8, by - 78), "BEST 5", 22, GREEN, bold=True, anchor="ra")

    draw.line((875, 151, 875, 593), fill=LINE, width=2)
    label(draw, (914, 156), "Observed epoch", 22, MUTED)
    label(draw, (914, 188), str(current["epoch"]) if current else "--", 64, bold=True)
    label(draw, (914, 277), "Checkpoint epoch", 22, MUTED)
    label(draw, (914, 311), str(current["bestEpoch"]) if current else "--", 48, GREEN, bold=True)
    label(draw, (1040, 323), f"{current['bestScore']:.3f}" if current else "--", 26, GREEN)
    label(draw, (914, 397), "Patience used", 22, MUTED)
    bad = current["badEpochs"] if current else 0
    for index in range(3):
        box(draw, (914 + index * 94, 438, 997 + index * 94, 452), RED if index < bad else LINE, radius=3)
    label(draw, (914, 470), f"{bad} / 3 without improvement", 22, RED if bad else MUTED)
    box(draw, (914, 528, 1229, 577), PALE_RED if final else PALE_GREEN if current and current["improved"] else PALE_BLUE)
    status = "STOP  /  checkpoint retained" if final else "SAVE  /  improved score" if current and current["improved"] else "WAIT  /  below min_delta" if current else "READY  /  replay starts"
    label(draw, (929, 540), status, 20, RED if final else GREEN if current and current["improved"] else BLUE, bold=True)

    box(draw, (48, 633, 1230, 681), SURFACE)
    if final:
        label(draw, (65, 644), "Best checkpoint: epoch 5", 24, GREEN, bold=True)
        label(draw, (1209, 644), "Training stopped: epoch 8", 24, RED, bold=True, anchor="ra")
    else:
        label(draw, (65, 644), "min mode    |    patience 3    |    min_delta 0.005", 24, MUTED)
        label(draw, (1209, 645), "SOURCE: demo-core.mjs", 20, MUTED, anchor="ra")
    return frame


STAGE_TITLES = ["Source CSV", "Validate", "Missing values", "Duplicates", "Aggregate"]
STAGE_START = [0.0, 1.5, 5.0, 8.5, 12.0]
REASON_LABELS = {
    "invalid_amount": "Invalid amount",
    "invalid_date": "Invalid date",
    "invalid_group": "Missing group",
    "missing_amount": "Missing amount",
    "duplicate_exact": "Exact duplicate",
    "duplicate_conflict": "Conflicting duplicate",
}


def audit_frame(t, data):
    stage = sum(t >= start for start in STAGE_START[1:])
    state = data["stages"][stage]
    previous = data["stages"][max(0, stage - 1)]
    progress = ease((t - STAGE_START[stage]) / 0.65) if stage else 1
    frame, draw = base("Data Preparation Audit", "Synthetic events  /  source-row provenance at every stage", "02 / DATA ENGINEERING", t)
    titles = STAGE_TITLES[1:]
    for index, title in enumerate(titles):
        x = 48 + index * 300
        active = stage == index + 1
        done = stage > index + 1
        fill = PALE_BLUE if active else PALE_GREEN if done else SURFACE
        color = BLUE if active else GREEN if done else MUTED
        box(draw, (x, 147, x + 279, 198), fill)
        label(draw, (x + 16, 157), f"0{index + 1}  {title}", 24, color, bold=active or done)
        if index < 3:
            center = x + 290
            draw.line((center - 4, 171, center + 5, 171), fill=MUTED, width=2)
            draw.line((center, 166, center + 5, 171, center, 176), fill=MUTED, width=2)
    label(draw, (48, 223), "Source-row audit", 26, bold=True)
    label(draw, (756, 226), f"{stage} / 4 stages complete", 20, MUTED, anchor="ra")

    rejected = {row["sourceRow"] for row in state["quarantine"]}
    previous_rejected = {row["sourceRow"] for row in previous["quarantine"]}
    for index, row in enumerate(state["source"]):
        column, line = index % 9, index // 9
        x, y = 48 + column * 80, 269 + line * 92
        current_fill = PALE_RED if row["sourceRow"] in rejected else PALE_GREEN if stage else SURFACE
        previous_fill = PALE_RED if row["sourceRow"] in previous_rejected else PALE_GREEN if stage > 1 else SURFACE
        current_color = RED if row["sourceRow"] in rejected else GREEN if stage else MUTED
        box(draw, (x, y, x + 73, y + 78), mix(previous_fill, current_fill, progress), radius=4)
        label(draw, (x + 36, y + 12), row["id"], 20, current_color, bold=True, anchor="ma")
        label(draw, (x + 36, y + 42), f"row {row['sourceRow']:02d}", 20, MUTED, anchor="ma")
    legend = [(PALE_GREEN, GREEN, "Retained"), (PALE_RED, RED, "Quarantined")]
    for index, (fill, color, text) in enumerate(legend):
        x = 48 + index * 190
        box(draw, (x, 460, x + 18, 478), fill, color, radius=2)
        label(draw, (x + 28, 454), text, 22, MUTED)

    label(draw, (48, 510), "Audit reasons", 24, bold=True)
    reasons = list(state["reasons"].items())
    if reasons:
        for index, (reason, count) in enumerate(reasons):
            x, y = 48 + (index % 2) * 368, 551 + (index // 2) * 35
            label(draw, (x, y), REASON_LABELS[reason], 22, MUTED)
            label(draw, (x + 310, y), count, 22, RED, bold=True, anchor="ra")
    else:
        label(draw, (48, 551), "Raw records await validation.", 22, MUTED)
        label(draw, (48, 586), "No project or personal data is included.", 22, MUTED)

    draw.line((792, 223, 792, 633), fill=LINE, width=2)
    summary = state["summary"]
    metrics = [("Input rows", str(summary["input"]), BLUE), ("Retained", str(summary["kept"]), GREEN), ("Quarantined", str(summary["quarantined"]), RED), ("Amount total", f"{summary['totalCents'] / 100:.2f}" if stage else "--", INK)]
    for index, (title, value, color) in enumerate(metrics):
        x, y = 830 + (index % 2) * 210, 222 + (index // 2) * 120
        label(draw, (x, y), title, 22, MUTED)
        label(draw, (x, y + 35), value, 48, color, bold=True)
    label(draw, (830, 466), "Group totals" if stage == 4 else "Current step", 24, bold=True)
    if stage == 4:
        for index, group in enumerate(state["groups"]):
            y = 513 + index * 31
            label(draw, (830, y), group["group"], 20, MUTED)
            amount = group["amount"]
            width = amount / max(item["amount"] for item in state["groups"]) * 220
            box(draw, (870, y + 6, 870 + max(1, width * progress), y + 21), PALE_BLUE, radius=3)
            label(draw, (1228, y), f"{amount:.2f}", 20, BLUE, bold=True, anchor="ra")
    else:
        label(draw, (830, 510), STAGE_TITLES[stage], 26, BLUE, bold=True)
        if stage:
            audit = state["audit"][-1]
            label(draw, (830, 552), f"{audit['rejected']} rows quarantined here", 22, MUTED)
        else:
            label(draw, (830, 552), "17 records from MIXED_CSV", 22, MUTED)
        label(draw, (830, 590), "Zero values remain valid.", 22, GREEN)

    box(draw, (48, 653, 1230, 691), SURFACE)
    label(draw, (65, 659), "Missing: quarantine  |  Conflicts: reject", 22, MUTED)
    label(draw, (1214, 659), "SOURCE: pipeline.mjs + Papa Parse", 20, MUTED, anchor="ra")
    return frame


def encode_video(filename, render, data, ffmpeg):
    path = OUT / filename
    command = [ffmpeg, "-y", "-loglevel", "error", "-f", "rawvideo", "-vcodec", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{WIDTH}x{HEIGHT}", "-r", str(FPS), "-i", "-", "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "25", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(path)]
    process = subprocess.Popen(command, stdin=subprocess.PIPE, stderr=subprocess.PIPE)
    try:
        for number in range(FPS * DURATION):
            process.stdin.write(render(number / FPS, data).tobytes())
        process.stdin.close()
        error = process.stderr.read().decode("utf-8", "replace")
        returncode = process.wait()
        if returncode:
            raise RuntimeError(error)
    except BaseException:
        process.kill()
        process.wait()
        raise
    poster = path.with_suffix(".jpg")
    render(DURATION - 1 / FPS, data).save(poster, quality=92, optimize=True)
    return {"file": path.name, "poster": poster.name, "width": WIDTH, "height": HEIGHT, "duration_seconds": DURATION, "frames": FPS * DURATION, "fps": FPS, "codec": "H.264", "pixel_format": "yuv420p", "audio": False, "faststart": True, "bytes": path.stat().st_size}


def captions():
    kapt_en = [
        (0, 2.3, "Synthetic validation scores.\nLower loss is better."),
        (2.3, 8.3, "Epochs 1-4 improve the validation loss.\nEach improvement saves the checkpoint."),
        (8.3, 9.8, "Epoch 5: best checkpoint, loss 0.550.\nPatience resets to zero."),
        (9.8, 11.3, "Epoch 6: loss 0.552 does not improve.\nPatience used: 1 of 3."),
        (11.3, 12.8, "Epoch 7: loss 0.548 improves by only 0.002.\nIt fails the 0.005 minimum change."),
        (12.8, 18, "Epoch 8: stop after 3 stalled epochs.\nRetain the epoch 5 checkpoint."),
    ]
    kapt_zh = [
        (0, 2.3, "合成验证分数：损失越低越好。\n本动画不表示真实训练实验。"),
        (2.3, 8.3, "第 1 至 4 轮验证损失持续改善。\n每次满足阈值的改善都会保存检查点。"),
        (8.3, 9.8, "第 5 轮：最佳检查点，损失为 0.550。\n未改善轮数重置为零。"),
        (9.8, 11.3, "第 6 轮：损失 0.552，没有改善。\n未改善轮数为 1，耐心上限为 3。"),
        (11.3, 12.8, "第 7 轮：损失 0.548，只改善了 0.002。\n没有达到 0.005 的最小改善阈值。"),
        (12.8, 18, "第 8 轮：连续 3 轮未达改善阈值，停止。\n保留第 5 轮的最佳检查点。"),
    ]
    audit_en = [
        (0, 1.5, "17 synthetic events from the CSV fixture.\nNo personal or production data."),
        (1.5, 5, "Strict validation retains 14 rows.\n3 malformed records are quarantined."),
        (5, 8.5, "Quarantine 1 missing amount; retain 13 rows.\nTwo valid zero amounts remain."),
        (8.5, 12, "Remove 1 exact duplicate and 2 conflicting rows.\n10 retained rows; 7 quarantined."),
        (12, 18, "Aggregate 10 retained rows into 4 groups.\nAmount total: 47.50. Source rows are preserved."),
    ]
    audit_zh = [
        (0, 1.5, "CSV 示例包含 17 条合成事件。\n不包含个人数据或生产数据。"),
        (1.5, 5, "严格校验后保留 14 行。\n3 行格式异常数据进入隔离区。"),
        (5, 8.5, "隔离 1 行金额缺失数据，保留 13 行。\n两个有效的零金额仍然保留。"),
        (8.5, 12, "移除 1 行完全重复与 2 行冲突重复。\n最终保留 10 行，隔离 7 行。"),
        (12, 18, "将保留的 10 行聚合为 4 组。\n金额合计 47.50，并保留源行追踪信息。"),
    ]

    def timestamp(seconds):
        millis = round(seconds * 1000)
        return f"00:{millis // 60000:02}:{millis // 1000 % 60:02}.{millis % 1000:03}"

    for name, cues in {"kapt-early-stopping.en.vtt": kapt_en, "kapt-early-stopping.zh.vtt": kapt_zh, "data-preparation-audit.en.vtt": audit_en, "data-preparation-audit.zh.vtt": audit_zh}.items():
        text = "WEBVTT\n\n" + "\n\n".join(f"{index}\n{timestamp(start)} --> {timestamp(end)}\n{content}" for index, (start, end, content) in enumerate(cues, 1)) + "\n"
        (OUT / name).write_text(text, encoding="utf-8")


def decode_checks(path, ffmpeg):
    checks = []
    thumbs = []
    for stamp in (0, DURATION / 2, DURATION - 1 / FPS):
        command = [ffmpeg, "-v", "error", "-ss", f"{stamp:.6f}", "-i", str(path), "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]
        result = subprocess.run(command, capture_output=True, check=True)
        image = Image.frombytes("RGB", (WIDTH, HEIGHT), result.stdout)
        stat = ImageStat.Stat(image)
        assert max(stat.stddev) > 15, "Decoded frame appears blank"
        checks.append({"second": round(stamp, 6), "decoded_width": WIDTH, "decoded_height": HEIGHT, "rgb_standard_deviation": [round(value, 2) for value in stat.stddev], "pixel_sha256": hashlib.sha256(result.stdout).hexdigest()})
        image.thumbnail((640, 360))
        thumbs.append(image)
    return checks, thumbs


def main():
    global SITE, OUT
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--preview", action="store_true", help="Render only posters for layout inspection")
    parser.add_argument("--site", type=Path, default=SITE, help="Website repository root containing cases/ and demos/")
    parser.add_argument("--ffmpeg", help="FFmpeg executable; otherwise use PATH or imageio-ffmpeg")
    args = parser.parse_args()
    SITE = args.site.resolve()
    OUT = SITE / "assets" / "videos"
    OUT.mkdir(parents=True, exist_ok=True)
    data = read_sources()
    videos = [("kapt-early-stopping.mp4", kapt_frame), ("data-preparation-audit.mp4", audit_frame)]
    if args.preview:
        for filename, render in videos:
            render(DURATION - 1 / FPS, data).save(OUT / Path(filename).with_suffix(".jpg"), quality=92, optimize=True)
        print("Rendered two posters from the current JavaScript outputs.")
        return
    ffmpeg = args.ffmpeg or shutil.which("ffmpeg")
    if not ffmpeg:
        import imageio_ffmpeg

        ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    files = []
    contact = Image.new("RGB", (1920, 720), WHITE)
    for row, (filename, render) in enumerate(videos):
        details = encode_video(filename, render, data, ffmpeg)
        checks, thumbs = decode_checks(OUT / filename, ffmpeg)
        details["decoded_frame_checks"] = checks
        for column, thumb in enumerate(thumbs):
            contact.paste(thumb, (column * 640, row * 360))
        files.append(details)
        print(f"{filename}: {details['bytes']:,} bytes; {DURATION}s; first/middle/final decoded")
    contact.save(OUT / "validation-contact-sheet.jpg", quality=92, optimize=True)
    captions()
    sources = ["cases/kapt/demo-core.mjs", "demos/data-preparation/pipeline.mjs", "demos/vendor/papaparse.min.js"]
    metadata = {
        "created": "2026-10-14",
        "renderer": "Pillow frame rendering, FFmpeg libx264 encoding",
        "content_kind": "Generated explainers from real JavaScript outputs; not recorded application footage",
        "minimum_font_pixels": 20,
        "source_files": [{"path": path, "sha256": hashlib.sha256((SITE / path).read_bytes()).hexdigest()} for path in sources],
        "files": files,
        "kapt": {"synthetic": True, "options": data["options"], "scores": data["scores"], "trace": data["trace"], "best_epoch": data["trace"][-1]["bestEpoch"], "stop_epoch": data["trace"][-1]["epoch"], "online_case": "https://guhang2011.github.io/cases/kapt/"},
        "data_preparation": {"synthetic": True, "fixture": "MIXED_CSV", "parser": "Papa Parse 5.5.3; header:true; skipEmptyLines:true", "policies": data["stages"][-1]["policies"], "stages": [{"stage": state["stage"], "summary": state["summary"], "audit": state["audit"], "reasons": state["reasons"], "groups": state["groups"], "retained_source_rows": [item["sourceRow"] for item in state["cleaned"]], "quarantined_source_rows": [item["sourceRow"] for item in state["quarantine"]]} for state in data["stages"]], "online_case": "https://guhang2011.github.io/demos/data-preparation/"},
    }
    (OUT / "metadata.json").write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
