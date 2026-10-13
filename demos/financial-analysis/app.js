"use strict";

(() => {
  const $ = id => document.getElementById(id);
  const colors = ["#2365a4", "#267562", "#bd6648", "#8b6ea8"];
  const sectors = {
    services: { en: "Services", zh: "服务业" },
    manufacturing: { en: "Manufacturing", zh: "制造业" },
    retail: { en: "Retail", zh: "零售业" },
  };
  let dataset;
  let chart;
  let selectedId = "S01";
  const language = () => document.documentElement.lang.startsWith("zh") ? "zh" : "en";
  const t = (en, zh) => language() === "zh" ? zh : en;
  const percent = value => value === null ? "—" : `${(value * 100).toFixed(1)}%`;
  const scenario = () => dataset.scenarios[$("year").value];
  const currentRows = () => scenario().variants[$("clusters").value].rows;
  const featureName = id => dataset.features.find(feature => feature.id === id)[language()];
  const clusterName = cluster => t(`Cluster ${cluster}`, `聚类 ${cluster}`);

  function visibleRows() {
    const query = $("search").value.trim().toLowerCase();
    const rows = currentRows().filter(row => {
      const sector = sectors[row.sector];
      return `${row.id} ${row.sector} ${sector.en} ${sector.zh}`.toLowerCase().includes(query);
    });
    return rows.sort((a, b) => {
      if ($("sort").value === "distance") return b.distanceScore - a.distanceScore || a.id.localeCompare(b.id);
      if ($("sort").value === "cluster") return a.cluster - b.cluster || a.id.localeCompare(b.id);
      return a.id.localeCompare(b.id);
    });
  }

  function buildFeatureOptions() {
    for (const id of ["x-ratio", "y-ratio"]) {
      const select = $(id);
      const previous = select.value;
      select.replaceChildren(...dataset.features.map(feature => {
        const option = document.createElement("option");
        option.value = feature.id;
        option.textContent = feature[language()];
        return option;
      }));
      select.value = previous || (id === "x-ratio" ? "grossMargin" : "cashRevenue");
    }
  }

  function renderLegend() {
    $("cluster-legend").replaceChildren(...Array.from({ length: Number($("clusters").value) }, (_, i) => {
      const entry = document.createElement("span");
      const swatch = document.createElement("i");
      swatch.style.backgroundColor = colors[i];
      entry.append(swatch, document.createTextNode(clusterName(i + 1)));
      return entry;
    }));
  }

  function renderChart(rows) {
    const isPca = $("view").value === "pca";
    $("ratio-controls").hidden = isPca;
    const xKey = $("x-ratio").value;
    const yKey = $("y-ratio").value;
    const plotted = rows.filter(row => isPca || (row.ratios[xKey] !== null && row.ratios[yKey] !== null));
    const groups = Array.from({ length: Number($("clusters").value) }, (_, i) => {
      const data = plotted.filter(row => row.cluster === i + 1).map(row => ({
        x: isPca ? row.pca[0] : row.ratios[xKey] * 100,
        y: isPca ? row.pca[1] : row.ratios[yKey] * 100,
        id: row.id, sector: row.sector, ratios: row.ratios, distanceScore: row.distanceScore,
      }));
      return {
        label: clusterName(i + 1), data, backgroundColor: colors[i], borderColor: "#fff",
        pointRadius: context => context.raw?.id === selectedId ? 8 : 5,
        pointBorderWidth: context => context.raw?.id === selectedId ? 2.5 : 1,
        pointHoverRadius: 8,
      };
    });
    const variance = scenario().explainedVariance;
    const xTitle = isPca ? `${t("PC1", "主成分 1")} (${percent(variance[0])})` : `${featureName(xKey)} (%)`;
    const yTitle = isPca ? `${t("PC2", "主成分 2")} (${percent(variance[1])})` : `${featureName(yKey)} (%)`;
    const options = {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220 },
      interaction: { intersect: true, mode: "nearest" },
      onClick: (_event, elements) => {
        if (!elements.length) return;
        const { datasetIndex, index } = elements[0];
        selectedId = chart.data.datasets[datasetIndex].data[index].id;
        render();
      },
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: "#25313c", padding: 11, displayColors: true,
          callbacks: {
            title: items => `${items[0].raw.id} · ${sectors[items[0].raw.sector][language()]}`,
            label: context => context.dataset.label,
            afterLabel: context => {
              const row = context.raw;
              return [
                `${t("Gross margin", "毛利率")}: ${percent(row.ratios.grossMargin)}`,
                `${t("Operating cash / revenue", "经营现金流 / 营收")}: ${percent(row.ratios.cashRevenue)}`,
                `${t("Relative distance", "相对距离")}: ${row.distanceScore.toFixed(1)} / 100`,
              ];
            },
          },
        },
      },
      scales: {
        x: { title: { display: true, text: xTitle, color: "#5d6d7d", font: { size: 11 } }, ticks: { color: "#637383", font: { size: 10 }, maxTicksLimit: 6 }, grid: { color: "#edf0f3" }, border: { color: "#dfe6ed" } },
        y: { title: { display: true, text: yTitle, color: "#5d6d7d", font: { size: 11 } }, ticks: { color: "#637383", font: { size: 10 }, maxTicksLimit: 6 }, grid: { color: "#edf0f3" }, border: { color: "#dfe6ed" } },
      },
    };
    if (typeof Chart !== "undefined") {
      if (!chart) chart = new Chart($("scatter"), { type: "scatter", data: { datasets: groups }, options });
      else { chart.data.datasets = groups; chart.options = options; chart.update(); }
    }
    $("chart-caption").textContent = isPca
      ? t(`${plotted.length} companies · five standardized features → two principal components. All annual observations determine the model.`, `${plotted.length} 家企业 · 五项标准化特征 → 两个主成分。模型由全部年度样本决定。`)
      : t(`${plotted.length} companies plotted · ${rows.length - plotted.length} omitted for undefined axis values. Colors still reflect five-feature clustering.`, `已绘制 ${plotted.length} 家企业 · ${rows.length - plotted.length} 家因坐标比率缺失未绘制。颜色仍表示五维特征聚类。`);
  }

  function renderSelected(rows) {
    const row = rows.find(item => item.id === selectedId);
    $("selected-id").textContent = row?.id || "—";
    $("selected-sector").textContent = row ? sectors[row.sector][language()] : t("No matching company", "没有匹配企业");
    $("selected-cluster").textContent = row ? clusterName(row.cluster) : "";
    $("selected-distance").textContent = row ? `${row.distanceScore.toFixed(1)} / 100` : "—";
    $("distance-bar").style.width = `${row?.distanceScore || 0}%`;
    $("ratio-breakdown").replaceChildren();
    if (!row) { $("selection-note").textContent = ""; return; }
    for (const feature of dataset.features) {
      const label = document.createElement("dt");
      label.textContent = feature[language()];
      const value = document.createElement("dd");
      value.textContent = percent(row.ratios[feature.id]);
      if (row.ratios[feature.id] === null) {
        const imputed = document.createElement("small");
        imputed.textContent = t(`Model input: ${percent(row.imputedRatios[feature.id])}`, `模型输入：${percent(row.imputedRatios[feature.id])}`);
        value.append(imputed);
      }
      $("ratio-breakdown").append(label, value);
    }
    $("selection-note").textContent = row.missingFeatures.length
      ? t(`${row.missingFeatures.length} observed ratios are missing; annual medians fill only the model input.`, `${row.missingFeatures.length} 项观测比率缺失；仅模型输入采用年度中位数填补。`)
      : t("All five observed ratios are defined. Zero numerators remain valid zero values.", "五项观测比率均有效。零分子保留为有效零值。");
  }

  function renderTable(rows) {
    const body = $("company-table");
    const focusedCompany = body.contains(document.activeElement) ? document.activeElement.dataset.company : null;
    body.replaceChildren();
    if (!rows.length) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 8;
      cell.textContent = t("No matching companies.", "没有匹配的企业。");
      row.append(cell); body.append(row); return;
    }
    for (const row of rows) {
      const tr = document.createElement("tr");
      if (row.id === selectedId) tr.classList.add("is-selected");
      const cell = document.createElement("td");
      const button = document.createElement("button");
      button.type = "button"; button.className = "company-select"; button.textContent = row.id;
      button.dataset.company = row.id;
      button.setAttribute("aria-pressed", String(row.id === selectedId));
      button.setAttribute("aria-label", t(`Select ${row.id}`, `选择 ${row.id}`));
      cell.append(button); tr.append(cell);
      for (const value of [sectors[row.sector][language()], clusterName(row.cluster), percent(row.ratios.grossMargin), percent(row.ratios.receivableRevenue), percent(row.ratios.cashRevenue), percent(row.ratios.debtAssets), row.distanceScore.toFixed(1)]) {
        const td = document.createElement("td");
        td.textContent = value;
        tr.append(td);
      }
      body.append(tr);
    }
    if (focusedCompany) {
      [...body.querySelectorAll("[data-company]")].find(button => button.dataset.company === focusedCompany)?.focus({ preventScroll: true });
    }
  }

  function render() {
    if (!dataset) return;
    const rows = visibleRows();
    if (!rows.some(row => row.id === selectedId)) selectedId = rows[0]?.id || "";
    $("metric-count").textContent = `${rows.length} / 24`;
    $("metric-missing").textContent = currentRows().reduce((sum, row) => sum + row.missingFeatures.length, 0);
    $("metric-variance").textContent = percent(scenario().explainedVariance.reduce((sum, value) => sum + value, 0));
    $("metric-inertia").textContent = scenario().variants[$("clusters").value].inertia.toFixed(1);
    $("export-csv").disabled = !rows.length;
    $("export-json").disabled = false;
    renderLegend(); renderChart(rows); renderSelected(rows); renderTable(rows);
    document.querySelectorAll(".demo-actions [data-en-label]").forEach(button => {
      button.title = button.dataset[`${language()}Label`];
      button.setAttribute("aria-label", button.title);
    });
  }

  function download(filename, content, mime) {
    const url = URL.createObjectURL(new Blob([content], { type: mime }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = filename;
    document.body.append(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  $("controls").addEventListener("submit", event => event.preventDefault());
  for (const id of ["year", "view", "clusters", "x-ratio", "y-ratio", "sort"]) $(id).addEventListener("change", render);
  $("search").addEventListener("input", render);
  $("company-table").addEventListener("click", event => {
    const button = event.target.closest("[data-company]");
    if (!button) return;
    selectedId = button.dataset.company; render();
  });
  $("reset").addEventListener("click", () => {
    HTMLFormElement.prototype.reset.call($("controls")); $("sort").value = "id"; $("x-ratio").value = "grossMargin"; $("y-ratio").value = "cashRevenue";
    selectedId = "S01"; render();
  });
  $("export-csv").addEventListener("click", () => {
    const featureIds = dataset.features.map(feature => feature.id);
    const header = ["dataset_type", "year", "company_id", "synthetic_sector", "cluster", ...featureIds, "relative_distance_not_probability", "missing_ratios"];
    const csvRows = visibleRows().map(row => ["synthetic", $("year").value, row.id, row.sector, row.cluster, ...featureIds.map(id => row.ratios[id] ?? ""), row.distanceScore, row.missingFeatures.join(";")]);
    const quote = value => `"${String(value).replaceAll('"', '""')}"`;
    const content = "\uFEFF" + [header, ...csvRows].map(row => row.map(quote).join(",")).join("\r\n") + "\r\n";
    download(`synthetic-financial-${$("year").value}-k${$("clusters").value}.csv`, content, "text/csv;charset=utf-8");
  });
  $("export-json").addEventListener("click", () => { if (dataset) download("synthetic-financial-data.json", JSON.stringify(dataset, null, 2) + "\n", "application/json"); });

  new MutationObserver(() => { if (dataset) { buildFeatureOptions(); render(); } }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  fetch("data.json").then(response => { if (!response.ok) throw new Error("Dataset unavailable"); return response.json(); }).then(data => {
    dataset = data;
    buildFeatureOptions(); render();
    if (typeof Chart === "undefined") {
      $("status").hidden = false;
      $("status").textContent = t("The chart could not load. Company values remain available in the table.", "图表暂未加载，企业观测值仍可通过表格阅读。");
    }
  }).catch(() => {
    $("status").hidden = false;
    $("status").textContent = t("The synthetic dataset could not load. Please reload the page.", "合成数据暂未加载，请刷新页面。");
    $("export-csv").disabled = true; $("export-json").disabled = true;
  });
})();
