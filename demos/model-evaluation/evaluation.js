"use strict";

(() => {
  const modelIds = ["a", "b", "ensemble"];
  const colors = { a: "#2365a4", b: "#ac5049", ensemble: "#267562" };
  const state = { scenario: "balanced", model: "ensemble", thresholdIndex: 50, curve: "roc", filter: "all" };
  const labels = {
    en: { a: "Model A", b: "Model B", ensemble: "Mean ensemble", accuracy: "Accuracy", precision: "Precision", recall: "Recall", f1: "F1", fpr: "False positive rate", tpr: "True positive rate", selected: "Selected threshold", correct: "Correct", error: "Error", none: "No samples match this filter.", summary: "fixed synthetic samples", positive: "positive", negative: "negative", shown: "shown", of: "of", exported: "samples exported", failure: "Evaluation data could not be loaded. Please refresh this page.", chartFailure: "The chart library could not be loaded. Please refresh this page." },
    zh: { a: "模型 A", b: "模型 B", ensemble: "均值集成", accuracy: "准确率", precision: "精确率", recall: "召回率", f1: "F1", fpr: "假阳性率", tpr: "真阳性率", selected: "所选阈值", correct: "正确", error: "错误", none: "此筛选下没有样本。", summary: "条固定合成样本", positive: "正类", negative: "负类", shown: "已显示", of: "共", exported: "条样本已导出", failure: "评估数据加载失败，请刷新页面。", chartFailure: "图表库加载失败，请刷新页面。" },
  };
  let payload;
  let comparisonChart;
  let rankingChart;
  const language = () => document.documentElement.lang.startsWith("zh") ? "zh" : "en";
  const t = () => labels[language()];
  const element = id => document.getElementById(id);
  const percentage = value => `${(value * 100).toFixed(1)}%`;
  const scenario = () => payload.scenarios.find(item => item.id === state.scenario);
  const metrics = (data, model) => data.models[model].thresholds[state.thresholdIndex];
  const setText = (id, value) => { element(id).textContent = value; };

  function createCharts() {
    Chart.defaults.font.family = '"Segoe UI", "Microsoft YaHei", sans-serif';
    Chart.defaults.font.size = 11;
    Chart.defaults.color = "#5d6d7d";
    const base = {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 120 },
      plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, padding: 14 } } },
    };
    comparisonChart = new Chart(element("comparison-chart"), {
      type: "bar", data: { labels: [], datasets: [] },
      options: { ...base, scales: { y: { min: 0, max: 1, ticks: { callback: value => `${Math.round(value * 100)}%` }, grid: { color: "#edf0f3" } }, x: { grid: { display: false } } } },
    });
    rankingChart = new Chart(element("ranking-chart"), {
      type: "scatter", data: { datasets: [] },
      options: { ...base, scales: { x: { min: 0, max: 1, title: { display: true, text: "" }, grid: { color: "#edf0f3" } }, y: { min: 0, max: 1, title: { display: true, text: "" }, grid: { color: "#edf0f3" } } },
        plugins: { ...base.plugins, legend: { ...base.plugins.legend, labels: { ...base.plugins.legend.labels, filter: item => item.datasetIndex < 3 } }, tooltip: { callbacks: { label: context => `${context.dataset.label}: (${context.parsed.x.toFixed(3)}, ${context.parsed.y.toFixed(3)})` } } },
      },
    });
  }

  function renderCharts(data) {
    const words = t();
    const keys = ["accuracy", "precision", "recall", "f1"];
    comparisonChart.data.labels = keys.map(key => words[key]);
    comparisonChart.data.datasets = modelIds.map(model => ({
      label: words[model], data: keys.map(key => metrics(data, model)[key]),
      backgroundColor: colors[model], borderColor: colors[model],
      borderWidth: state.model === model ? 2 : 0, borderRadius: 2, maxBarThickness: 20,
    }));
    comparisonChart.options.plugins.tooltip = { callbacks: { label: context => `${context.dataset.label}: ${percentage(context.raw)}` } };
    comparisonChart.update();
    const row = metrics(data, state.model);
    const marker = state.curve === "roc"
      ? { x: row.fp / data.negativeCount, y: row.recall }
      : { x: row.recall, y: row.precision };
    rankingChart.data.datasets = modelIds.map(model => ({
      label: words[model], data: state.curve === "roc" ? data.models[model].roc : [...data.models[model].pr].reverse(),
      borderColor: colors[model], backgroundColor: colors[model],
      showLine: true, borderWidth: state.model === model ? 2.5 : 1.5,
      pointRadius: 0, pointHitRadius: 7, tension: 0,
      stepped: state.curve === "pr" ? "before" : false,
    }));
    rankingChart.data.datasets.push({ label: words.selected, data: [marker], borderColor: "#fff", backgroundColor: colors[state.model], borderWidth: 2, pointRadius: 7, pointHoverRadius: 9, showLine: false });
    if (state.curve === "roc") {
      rankingChart.data.datasets.push({ label: "", data: [{ x: 0, y: 0 }, { x: 1, y: 1 }], showLine: true, borderColor: "#adb9c3", borderDash: [4, 5], borderWidth: 1, pointRadius: 0 });
    }
    rankingChart.options.scales.x.title.text = state.curve === "roc" ? words.fpr : words.recall;
    rankingChart.options.scales.y.title.text = state.curve === "roc" ? words.tpr : words.precision;
    rankingChart.update();
    setText("ranking-summary", modelIds.map(model => `${words[model]}: ${state.curve === "roc" ? "AUC" : "AP"} ${data.models[model][state.curve === "roc" ? "auc" : "averagePrecision"].toFixed(3)}`).join(" · "));
  }

  function cell(text, className = "") {
    const td = document.createElement("td");
    td.textContent = text;
    if (className) td.className = className;
    return td;
  }

  function renderComparison(data) {
    const body = element("comparison-body");
    body.replaceChildren();
    for (const model of modelIds) {
      const tr = document.createElement("tr");
      if (model === state.model) tr.className = "is-selected";
      tr.append(cell(t()[model]));
      for (const key of ["accuracy", "precision", "recall", "f1"]) tr.append(cell(percentage(metrics(data, model)[key])));
      body.append(tr);
    }
  }

  function sampleRows(data) {
    return data.samples.map((sample, index) => ({
      id: sample.id, label: sample.label,
      a: data.models.a.scores[index], b: data.models.b.scores[index], mean: data.models.ensemble.scores[index],
      predictionA: metrics(data, "a").predictions[index],
      predictionB: metrics(data, "b").predictions[index],
      predictionEnsemble: metrics(data, "ensemble").predictions[index],
      prediction: metrics(data, state.model).predictions[index],
      correct: metrics(data, state.model).predictions[index] === sample.label,
    }));
  }

  function renderSamples(data) {
    const rows = sampleRows(data).filter(row => state.filter === "all" || (state.filter === "errors" ? !row.correct : row.predictionA !== row.predictionB));
    const body = element("sample-body");
    body.replaceChildren();
    for (const row of rows) {
      const tr = document.createElement("tr");
      tr.append(cell(row.id), cell(row.label));
      for (const [key, model] of [["a", "a"], ["b", "b"], ["mean", "ensemble"]]) tr.append(cell(row[key].toFixed(3), state.model === model ? "score-selected" : ""));
      tr.append(cell(row.prediction), cell(row.correct ? t().correct : t().error, row.correct ? "result-correct" : "result-error"));
      body.append(tr);
    }
    if (!rows.length) {
      const tr = document.createElement("tr");
      const empty = cell(t().none, "empty-row");
      empty.colSpan = 7;
      tr.append(empty);
      body.append(tr);
    }
    setText("sample-count", language() === "zh" ? `已显示 ${rows.length} / ${data.samples.length} 条样本` : `${rows.length} of ${data.samples.length} samples shown`);
  }

  function render() {
    if (!payload) return;
    const data = scenario();
    const selected = data.models[state.model];
    const row = metrics(data, state.model);
    const words = t();
    element("scenario").value = state.scenario;
    element("threshold").value = String(state.thresholdIndex);
    element("sample-filter").value = state.filter;
    setText("threshold-output", (state.thresholdIndex / 100).toFixed(2));
    element("threshold").setAttribute("aria-valuetext", (state.thresholdIndex / 100).toFixed(2));
    element("reset").title = language() === "zh" ? "重置评估" : "Reset evaluation";
    document.querySelectorAll("[data-model]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.model === state.model)));
    document.querySelectorAll("[data-curve]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.curve === state.curve)));
    setText("scenario-summary", `${data.samples.length} ${words.summary} · ${data.positiveCount} ${words.positive} / ${data.negativeCount} ${words.negative}`);
    setText("accuracy", percentage(row.accuracy));
    setText("f1", row.f1.toFixed(3));
    setText("auc", selected.auc.toFixed(3));
    setText("ap", selected.averagePrecision.toFixed(3));
    setText("mean-accuracy", percentage((metrics(data, "a").accuracy + metrics(data, "b").accuracy) / 2));
    setText("ensemble-accuracy", percentage(metrics(data, "ensemble").accuracy));
    for (const key of ["tn", "fp", "fn", "tp"]) setText(key, row[key]);
    setText("confusion-model", `${words[state.model]} · ${language() === "zh" ? "阈值" : "Threshold"} ${(state.thresholdIndex / 100).toFixed(2)}`);
    renderComparison(data);
    renderSamples(data);
    renderCharts(data);
    setText("export-status", "");
  }

  function download(content, extension, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `synthetic-evaluation-${state.scenario}-t${state.thresholdIndex}.${extension}`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setText("export-status", `${scenario().samples.length} ${t().exported}`);
  }

  element("scenario").addEventListener("change", event => { state.scenario = event.target.value; render(); });
  element("threshold").addEventListener("input", event => { state.thresholdIndex = Math.min(100, Math.max(0, Number(event.target.value))); render(); });
  element("sample-filter").addEventListener("change", event => { state.filter = event.target.value; render(); });
  document.querySelectorAll("[data-model]").forEach(button => button.addEventListener("click", () => { state.model = button.dataset.model; render(); }));
  document.querySelectorAll("[data-curve]").forEach(button => button.addEventListener("click", () => { state.curve = button.dataset.curve; render(); }));
  element("reset").addEventListener("click", () => { Object.assign(state, { scenario: "balanced", model: "ensemble", thresholdIndex: 50, curve: "roc", filter: "all" }); render(); });
  element("export-json").addEventListener("click", () => {
    const data = scenario();
    const exported = {
      purpose: "Synthetic teaching example; not a trained model or research result",
      scenario: data.id, threshold: state.thresholdIndex / 100, selectedModel: state.model,
      decisionRule: payload.generator.decisionRule, generator: payload.generator,
      metrics: Object.fromEntries(modelIds.map(model => [model, { ...metrics(data, model), auc: data.models[model].auc, averagePrecision: data.models[model].averagePrecision }])),
      samples: sampleRows(data),
    };
    download(JSON.stringify(exported, null, 2) + "\n", "json", "application/json;charset=utf-8");
  });
  element("export-csv").addEventListener("click", () => {
    const lines = [["synthetic_sample_id", "true_label", "score_a", "score_b", "mean_score", "threshold", "pred_a", "pred_b", "pred_ensemble", "displayed_model", "displayed_prediction", "correct"].join(",")];
    for (const row of sampleRows(scenario())) lines.push([row.id, row.label, row.a, row.b, row.mean, state.thresholdIndex / 100, row.predictionA, row.predictionB, row.predictionEnsemble, state.model, row.prediction, row.correct].join(","));
    download(lines.join("\r\n") + "\r\n", "csv", "text/csv;charset=utf-8");
  });
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  fetch("metrics.json").then(response => {
    if (!response.ok) throw new Error("Missing metric payload");
    return response.json();
  }).then(data => {
    if (typeof Chart === "undefined") throw new Error("Missing chart library");
    payload = data;
    element("load-status").hidden = true;
    element("evaluation-workspace").hidden = false;
    createCharts();
    render();
  }).catch(() => {
    const status = element("load-status");
    status.dataset.en = typeof Chart === "undefined" ? labels.en.chartFailure : labels.en.failure;
    status.dataset.zh = typeof Chart === "undefined" ? labels.zh.chartFailure : labels.zh.failure;
    status.textContent = status.dataset[language()];
    status.setAttribute("role", "alert");
  });
})();
