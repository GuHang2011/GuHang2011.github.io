import { syntheticScores, traceEarlyStopping } from "./demo-core.mjs";

const tool = document.querySelector("[data-stopping-tool]");
if (tool) {
  const find = id => document.getElementById(id);
  const patienceInput = find("patience");
  const deltaInput = find("min-delta");
  const slider = find("epoch-slider");
  const playButton = find("play-toggle");
  const stepButton = find("step-forward");
  const resetButton = find("reset-replay");
  const chart = find("stopping-chart");
  const context = chart.getContext("2d");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let mode = "min";
  let patience = 3;
  let minDelta = 0.005;
  let trace = traceEarlyStopping(syntheticScores(mode), { mode, patience, minDelta });
  let cursor = trace.length;
  let timer = null;
  let valid = true;

  const isChinese = () => document.documentElement.lang.startsWith("zh");
  const text = (en, zh) => isChinese() ? zh : en;

  function labelButton(button, label) { button.title = label; button.setAttribute("aria-label", label); }

  function pause() {
    if (timer !== null) clearInterval(timer);
    timer = null;
  }

  function drawChart() {
    if (!context) return;
    const bounds = chart.getBoundingClientRect();
    const width = Math.max(250, bounds.width);
    const height = Math.max(200, bounds.height);
    const ratio = window.devicePixelRatio || 1;
    chart.width = Math.round(width * ratio);
    chart.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const margin = { left: 48, right: 22, top: 24, bottom: 37 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;
    const x = epoch => margin.left + ((epoch - 1) / (trace.length - 1 || 1)) * plotWidth;
    const yMin = mode === "min" ? 0.5 : 0.1;
    const yMax = mode === "min" ? 0.9 : 0.5;
    const y = score => margin.top + (1 - ((score - yMin) / (yMax - yMin))) * plotHeight;
    context.clearRect(0, 0, width, height);
    context.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    context.lineWidth = 1;
    context.textBaseline = "middle";
    for (let i = 0; i <= 4; i += 1) {
      const value = yMin + ((yMax - yMin) / 4) * i;
      const rowY = y(value);
      context.strokeStyle = "#e5e9ed";
      context.beginPath(); context.moveTo(margin.left, rowY); context.lineTo(width - margin.right, rowY); context.stroke();
      context.fillStyle = "#637383"; context.textAlign = "right"; context.fillText(value.toFixed(2), margin.left - 10, rowY);
    }
    const labels = [...new Set([1, Math.ceil(trace.length / 2), trace.length])];
    context.fillStyle = "#637383"; context.textAlign = "center";
    labels.forEach(epoch => context.fillText(String(epoch), x(epoch), height - 23));
    context.textAlign = "right"; context.fillText(text("Epoch", "轮次"), width - margin.right, height - 8);
    context.textAlign = "left"; context.fillText(text("Validation score", "验证指标"), margin.left, 10);
    const visible = trace.slice(0, cursor);
    const current = visible.at(-1);
    context.strokeStyle = "#2365a4"; context.lineWidth = 2;
    context.beginPath(); visible.forEach((point, index) => { if (index === 0) context.moveTo(x(point.epoch), y(point.score)); else context.lineTo(x(point.epoch), y(point.score)); }); context.stroke();
    visible.forEach(point => {
      context.fillStyle = point.epoch === current.bestEpoch ? "#267562" : "#2365a4";
      context.beginPath(); context.arc(x(point.epoch), y(point.score), point.epoch === current.bestEpoch ? 5 : 3, 0, 2 * Math.PI); context.fill();
    });
    const best = trace[current.bestEpoch - 1];
    context.fillStyle = "#267562";
    context.textAlign = best.epoch > trace.length / 2 ? "right" : "left";
    context.fillText(text(`Best: ${best.epoch}`, `最佳：${best.epoch}`), x(best.epoch) + (best.epoch > trace.length / 2 ? -9 : 9), y(best.score) - 17);
    if (current.stopped) {
      context.strokeStyle = "#ac5049"; context.lineWidth = 1.5; context.setLineDash([4, 4]);
      context.beginPath(); context.moveTo(x(current.epoch), margin.top); context.lineTo(x(current.epoch), margin.top + plotHeight); context.stroke(); context.setLineDash([]);
      context.fillStyle = "#ac5049"; context.beginPath(); context.arc(x(current.epoch), y(current.score), 5, 0, 2 * Math.PI); context.fill();
      context.textAlign = "right"; context.fillText(text(`Stop: ${current.epoch}`, `停止：${current.epoch}`), x(current.epoch) - 9, margin.top + 10);
    }
  }

  function render() {
    const current = trace[cursor - 1];
    find("current-epoch").textContent = String(current.epoch);
    find("best-epoch").textContent = String(current.bestEpoch);
    find("bad-epochs").textContent = `${current.badEpochs} / ${patience}`;
    find("stop-epoch").textContent = current.stopped ? String(current.epoch) : "—";
    slider.max = String(trace.length); slider.value = String(cursor);
    find("epoch-position").textContent = `${cursor} / ${trace.length}`;
    labelButton(playButton, timer !== null ? text("Pause", "暂停") : cursor === trace.length ? text("Replay", "重新回放") : text("Play", "播放"));
    playButton.setAttribute("aria-pressed", String(timer !== null));
    playButton.querySelector("img").src = timer !== null ? "pause.svg" : "play.svg";
    labelButton(stepButton, text("Next epoch", "下一轮")); labelButton(resetButton, text("Reset to first epoch", "重置到第一轮"));
    stepButton.disabled = !valid || cursor >= trace.length;
    playButton.disabled = !valid; resetButton.disabled = !valid; slider.disabled = !valid;
    const status = current.stopped ? text("Stopped; restore the best checkpoint.", "已停止；恢复最佳检查点。") : cursor === trace.length ? text("Sequence ended without triggering a stop.", "序列结束，尚未触发早停。") : current.improved ? text("New best score; patience reset.", "指标改善；耐心计数归零。") : text("No sufficient improvement; patience counts up.", "改善量不足；耐心计数增加。");
    find("replay-status").textContent = status;
    chart.setAttribute("aria-label", text(`Synthetic validation replay. Current epoch ${current.epoch}, best epoch ${current.bestEpoch}, ${current.badEpochs} epochs without sufficient improvement. ${status} Data are listed below.`, `合成验证回放。当前第 ${current.epoch} 轮，最佳第 ${current.bestEpoch} 轮，连续 ${current.badEpochs} 轮未充分改善。${status} 下方列出数据。`));
    const body = find("trace-body"); body.replaceChildren();
    for (const point of trace.slice(0, cursor)) {
      const row = document.createElement("tr");
      row.dataset.best = String(point.epoch === current.bestEpoch);
      row.dataset.stopped = String(point.stopped);
      const decision = point.stopped ? text("Stop", "停止") : point.improved ? text("New best", "刷新最佳") : text("Wait", "等待");
      [point.epoch, point.score.toFixed(3), point.bestEpoch, decision].forEach(value => { const cell = document.createElement("td"); cell.textContent = String(value); row.append(cell); });
      body.append(row);
    }
    drawChart();
  }

  function configure() {
    pause();
    const nextPatience = patienceInput.valueAsNumber;
    const nextDelta = deltaInput.valueAsNumber;
    const patienceValid = Number.isInteger(nextPatience) && nextPatience >= 1 && nextPatience <= 8;
    const deltaValid = Number.isFinite(nextDelta) && nextDelta >= 0 && nextDelta <= 0.05;
    valid = patienceValid && deltaValid;
    patienceInput.setAttribute("aria-invalid", String(!patienceValid)); deltaInput.setAttribute("aria-invalid", String(!deltaValid));
    find("control-error").hidden = valid;
    find("control-error").textContent = text("Patience must be an integer from 1 to 8; min delta must be from 0 to 0.05.", "耐心轮数须为 1 至 8 的整数；最小变化量须在 0 至 0.05 之间。");
    if (valid) {
      patience = nextPatience; minDelta = nextDelta;
      trace = traceEarlyStopping(syntheticScores(mode), { mode, patience, minDelta });
      cursor = trace.length;
    }
    render();
  }

  document.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => {
    mode = button.dataset.mode;
    document.querySelectorAll("[data-mode]").forEach(option => option.setAttribute("aria-pressed", String(option === button)));
    configure();
  }));
  patienceInput.addEventListener("input", configure); deltaInput.addEventListener("input", configure);
  slider.addEventListener("input", () => { pause(); cursor = Number(slider.value); render(); });
  playButton.addEventListener("click", () => {
    if (timer !== null) { pause(); render(); return; }
    if (cursor >= trace.length) cursor = 1;
    timer = setInterval(() => { cursor += 1; if (cursor >= trace.length) pause(); render(); }, reducedMotion.matches ? 1100 : 750);
    render();
  });
  stepButton.addEventListener("click", () => { pause(); cursor = Math.min(cursor + 1, trace.length); render(); });
  resetButton.addEventListener("click", () => { pause(); cursor = 1; render(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) { pause(); render(); } });
  reducedMotion.addEventListener("change", () => { pause(); render(); });
  document.addEventListener("portfolio-language-change", () => { render(); if (!valid) configure(); });
  if ("ResizeObserver" in window) new ResizeObserver(drawChart).observe(chart);
  else window.addEventListener("resize", drawChart);
  render();
}
