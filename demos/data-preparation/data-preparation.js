import { MIXED_CSV, MAX_ROWS, STAGE_COUNT, makeScenario, runPipeline, exportRows, protectCsvCell } from "./pipeline.mjs";

const $ = selector => document.querySelector(selector);
const language = () => document.documentElement.lang.startsWith("zh") ? "zh" : "en";
const text = (en, zh) => language() === "zh" ? zh : en;
const money = cents => (cents / 100).toFixed(2);
const reasonNames = {
  invalid_id: ["Invalid ID", "ID 不符合契约"],
  invalid_date: ["Invalid UTC date", "UTC 日期不合法"],
  invalid_group: ["Missing / invalid group", "组别缺失或不合法"],
  invalid_amount: ["Invalid amount", "金额不合法"],
  missing_amount: ["Missing amount", "金额缺失"],
  duplicate_conflict: ["Conflicting ID: all versions", "同 ID 冲突：全部版本"],
  duplicate_keep_first: ["Conflict: later version", "同 ID 冲突：后续版本"],
  duplicate_exact: ["Exact duplicate", "完全相同的重复事件"],
};
const stageNames = [["Source", "源数据"], ["Validation", "校验"], ["Missing values", "缺失处理"], ["Deduplication", "去重"], ["Aggregation", "聚合"]];
let fixture = [];
let result;
let stage = STAGE_COUNT;
let view = "cleaned";

function create(tag, value, className) {
  const element = document.createElement(tag);
  if (value !== undefined) element.textContent = value;
  if (className) element.className = className;
  return element;
}

function sourceState(row) {
  if (view === "source" || stage === 0) return [text("Source value", "原始值"), "source"];
  if (row.reason) return [text(...reasonNames[row.reason]), "quarantine"];
  if (row.imputed) return [text("Zero imputed", "零值填充"), "imputed"];
  if (row.conflictRetained) return [text("Conflict kept first", "冲突保留第一条"), "imputed"];
  if (row.amount === null) return [text("Missing: pending", "缺失：待处理"), "source"];
  if (row.amount === 0) return [text("Observed zero", "观测零值"), "retained"];
  return [text("Valid event", "有效事件"), "retained"];
}

function renderRecords() {
  const rows = result[view];
  const tbody = $("#records-body");
  tbody.replaceChildren();
  for (const row of rows) {
    const tr = create("tr");
    const [stateLabel, state] = sourceState(row);
    tr.dataset.state = state;
    let amount = row.amount === "" || row.amount === null || row.amount === undefined ? "∅" : String(row.amount);
    if (view !== "source" && stage > 0 && typeof row.amount === "number") amount = row.amount.toFixed(2);
    for (const value of [row.sourceRow, row.id, row.timestamp, row.group || "∅", amount, stateLabel]) tr.append(create("td", value));
    tbody.append(tr);
  }
  $("#row-count").textContent = text(`${rows.length} rows`, `${rows.length} 行`);
  $("#empty-state").hidden = rows.length > 0;
  $("#empty-state").textContent = view === "quarantine" ? text("No quarantined events at this stage.", "当前阶段没有隔离事件。") : text("No retained events at this stage.", "当前阶段没有保留事件。");
  document.querySelectorAll("[data-view]").forEach(button => {
    const selected = button.dataset.view === view;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  $("#records-panel").setAttribute("aria-labelledby", `tab-${view}`);
  const scope = view === "cleaned" ? text("Retained events", "保留事件") : view === "quarantine" ? text("Quarantined events", "隔离事件") : text("Source events", "源事件");
  $("#export-scope").textContent = `${scope} · ${rows.length}`;
  $("#export-csv").disabled = rows.length === 0;
}

function renderChart() {
  const chart = $("#group-chart");
  chart.replaceChildren();
  if (stage < 4 || !result.groups.length) {
    chart.append(create("p", stage < 4 ? text("Aggregation pending.", "聚合阶段尚未执行。") : text("No retained events to aggregate.", "没有可聚合的保留事件。"), "prep-chart-empty"));
    return;
  }
  const max = Math.max(1, ...result.groups.map(item => Math.abs(item.cents)));
  for (const item of result.groups) {
    const row = create("div", undefined, "prep-chart-row");
    row.setAttribute("aria-label", text(`Group ${item.group}: ${item.count} events, amount ${money(item.cents)}`, `组 ${item.group}：${item.count} 条事件，金额 ${money(item.cents)}`));
    row.append(create("span", item.group));
    const track = create("div", undefined, "prep-bar-track");
    const bar = create("span", undefined, `prep-bar${item.cents < 0 ? " negative" : ""}`);
    bar.style.width = `${Math.abs(item.cents) / max * 50}%`;
    track.append(bar);
    row.append(track, create("span", money(item.cents)));
    chart.append(row);
  }
}

function renderAudit() {
  const list = $("#reason-list");
  list.replaceChildren();
  for (const [reason, count] of Object.entries(result.reasons)) {
    const li = create("li");
    li.append(create("span", text(...reasonNames[reason])), create("strong", count));
    list.append(li);
  }
  if (!list.children.length) list.append(create("li", text("No rejected events", "没有隔离事件")));
  const missing = $("#missing-policy").value;
  const duplicate = $("#duplicate-policy").value;
  const statements = [
    missing === "zero" ? text("Zero imputation is a demonstration assumption for this synthetic amount field; it is not a general missing-data rule.", "填充 0 是本合成金额字段的演示假设，不是通用缺失处理规则。") : text("Missing amounts remain unknown and are quarantined.", "缺失金额保持未知，进入隔离区。"),
    duplicate === "first" ? text("Keep-first is source-order dependent; the retained conflict is flagged.", "保留第一条依赖源顺序，保留的冲突事件带有标记。") : text("Different valid versions of an ID are quarantined together.", "同 ID 的有效版本不一致时，全部进入隔离区。"),
    text("Totals are intermediate until aggregation. Exact duplicates retain one event.", "聚合前的合计为阶段结果；完全相同的重复事件只保留一条。"),
  ];
  $("#policy-note").textContent = statements.join(" ");
}

function render() {
  if (!result) return;
  $("#input-count").textContent = result.summary.input;
  $("#kept-count").textContent = result.summary.kept;
  $("#quarantine-count").textContent = result.summary.quarantined;
  $("#amount-total").textContent = result.summary.totalCents === null ? "—" : money(result.summary.totalCents);
  const stageLabel = text(...stageNames[stage]);
  const zeroCount = result.summary.zeros - result.summary.imputed;
  $("#stage-status").textContent = text(`${stageLabel} · ${Math.max(0, zeroCount)} observed zeros retained · ${result.summary.imputed} zero imputations · ${result.summary.kept + result.summary.quarantined}/${result.summary.input} events accounted for`, `${stageLabel} · 保留 ${Math.max(0, zeroCount)} 个观测零值 · ${result.summary.imputed} 个零值填充 · 已对账 ${result.summary.kept + result.summary.quarantined}/${result.summary.input} 条事件`);
  document.querySelectorAll("[data-stage]").forEach(button => {
    const buttonStage = Number(button.dataset.stage);
    button.setAttribute("aria-pressed", String(buttonStage === stage));
    button.dataset.complete = String(buttonStage < stage);
  });
  $("#reset").title = text("Reset experiment", "重置实验");
  renderRecords();
  renderChart();
  renderAudit();
}

function recompute() {
  try {
    const rows = makeScenario(fixture, $("#scenario").value);
    result = runPipeline(rows, { duplicate: $("#duplicate-policy").value, missing: $("#missing-policy").value }, stage);
    $("#error-message").hidden = true;
    render();
  } catch (error) {
    $("#error-message").hidden = false;
    $("#error-message").textContent = text(`Experiment unavailable: ${error.message}`, `实验暂不可用：${error.message}`);
    $("#export-csv").disabled = true;
    $("#export-json").disabled = true;
  }
}

function download(content, type, suffix) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = create("a");
  anchor.href = url;
  anchor.download = `synthetic-events-${$("#scenario").value}-stage-${stage}-${suffix}`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function activateView(next, focus = false) {
  view = next;
  renderRecords();
  if (focus) $(`#tab-${view}`).focus();
}

function initialize() {
  try {
    if (!globalThis.Papa) throw new Error("CSV parser did not load");
    const parsed = Papa.parse(MIXED_CSV, { header: true, skipEmptyLines: "greedy" });
    if (parsed.errors.length || parsed.data.length > MAX_ROWS) throw new Error("Synthetic CSV failed validation");
    if (parsed.meta.fields.join(",") !== "id,timestamp,group,amount") throw new Error("Unexpected CSV schema");
    fixture = parsed.data;
    for (const selector of ["#scenario", "#duplicate-policy", "#missing-policy"]) $(selector).addEventListener("change", recompute);
    document.querySelectorAll("[data-stage]").forEach(button => button.addEventListener("click", () => { stage = Number(button.dataset.stage); recompute(); }));
    document.querySelectorAll("[data-view]").forEach(button => {
      button.addEventListener("click", () => activateView(button.dataset.view));
      button.addEventListener("keydown", event => {
        const tabs = ["cleaned", "quarantine", "source"];
        const index = tabs.indexOf(view);
        let target;
        if (event.key === "ArrowRight") target = tabs[(index + 1) % tabs.length];
        if (event.key === "ArrowLeft") target = tabs[(index + tabs.length - 1) % tabs.length];
        if (event.key === "Home") target = tabs[0];
        if (event.key === "End") target = tabs[tabs.length - 1];
        if (target) { event.preventDefault(); activateView(target, true); }
      });
    });
    $("#reset").addEventListener("click", () => {
      $("#scenario").value = "mixed";
      $("#duplicate-policy").value = "reject";
      $("#missing-policy").value = "quarantine";
      stage = STAGE_COUNT;
      view = "cleaned";
      recompute();
    });
    $("#export-csv").addEventListener("click", () => {
      const rows = exportRows(result[view]).map(row => Object.fromEntries(Object.entries(row).map(([key, value]) => [key, typeof value === "string" ? protectCsvCell(value) : value])));
      download(`\uFEFF${Papa.unparse(rows)}`, "text/csv;charset=utf-8", `${view}.csv`);
    });
    $("#export-json").addEventListener("click", () => {
      const payload = { schema: "synthetic-event-audit/v1", synthetic: true, scenario: $("#scenario").value, stage, policies: result.policies, summary: result.summary, stageAudit: result.audit, reasons: result.reasons, source: exportRows(result.source), retained: exportRows(result.cleaned), quarantined: exportRows(result.quarantine), groups: result.groups };
      download(JSON.stringify(payload, null, 2), "application/json;charset=utf-8", "audit.json");
    });
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    recompute();
  } catch (error) {
    $("#error-message").hidden = false;
    $("#error-message").textContent = text(`Experiment unavailable: ${error.message}`, `实验暂不可用：${error.message}`);
    $("#export-csv").disabled = true;
    $("#export-json").disabled = true;
  }
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
else initialize();
