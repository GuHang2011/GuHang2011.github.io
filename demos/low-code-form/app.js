import { checkSchema, fieldTypes, MAX_FIELDS, nextKey, validateField } from "./schema.mjs";

const form = document.querySelector("#dynamic-form"), list = document.querySelector("#schema-list");
const json = document.querySelector("#schema-json"), result = document.querySelector("#form-result");
const configurationStatus = document.querySelector("#schema-status");
const zh = () => document.documentElement.lang.startsWith("zh");
const t = (en, cn) => zh() ? cn : en;
const title = field => zh() && field.labelZh ? field.labelZh : field.label;
const types = { text: "文本", email: "邮箱", select: "选择", textarea: "多行文本", number: "数字", date: "日期" };
let initial, schema, values = {}, submitted = false;

function make(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
function control(field) {
  const input = make(field.type === "select" ? "select" : field.type === "textarea" ? "textarea" : "input");
  if (input instanceof HTMLInputElement) input.type = field.type;
  if (field.type === "select") {
    const blank = make("option", t("Choose one…", "请选择……")); blank.value = ""; input.append(blank);
    field.options.forEach(option => { const choice = make("option", title(option)); choice.value = option.value; input.append(choice); });
  }
  input.id = `field-${field.key}`; input.name = field.key; input.value = values[field.key] ?? "";
  input.required = field.required; input.setAttribute("aria-describedby", `error-${field.key}`);
  if (field.placeholder) input.placeholder = field.placeholder;
  if (["text", "email", "textarea"].includes(field.type)) {
    if (field.maxLength !== undefined) input.maxLength = field.maxLength;
    if (field.minLength !== undefined) input.minLength = field.minLength;
  }
  if (field.type === "number") { input.step = "any"; if (field.min !== undefined) input.min = field.min; if (field.max !== undefined) input.max = field.max; }
  input.addEventListener("input", () => {
    values[field.key] = input.value; result.textContent = ""; result.removeAttribute("data-tone");
    showError(field, submitted ? errorFor(field, input) : "");
  });
  return input;
}
function errorFor(field, input) {
  return input.validity.badInput ? t("Enter a valid value.", "请输入有效值。") : validateField(field, input.value, zh());
}
function showError(field, message) {
  document.getElementById(`error-${field.key}`).textContent = message;
  const input = document.getElementById(`field-${field.key}`);
  if (message) input.setAttribute("aria-invalid", "true"); else input.removeAttribute("aria-invalid");
}
function render(focusId) {
  form.replaceChildren(); list.replaceChildren();
  schema.fields.forEach((field, index) => {
    const wrapper = make("div", undefined, "dynamic-field"), label = make("label", title(field)); label.htmlFor = `field-${field.key}`;
    if (field.required) label.append(make("span", t("required", "必填")));
    const input = control(field), error = make("small", "", "field-error"); error.id = `error-${field.key}`;
    wrapper.append(label, input, error); form.append(wrapper);
    if (submitted) showError(field, errorFor(field, input));
    list.append(editor(field, index));
  });
  const submit = make("button", t("Validate request", "校验申请"), "form-submit"); submit.type = "submit"; form.append(submit);
  document.querySelector("#field-count").textContent = t(`${schema.fields.length} / ${MAX_FIELDS} fields`, `${schema.fields.length} / ${MAX_FIELDS} 个字段`);
  document.querySelector("#add-field").disabled = schema.fields.length >= MAX_FIELDS;
  json.value = JSON.stringify(schema, null, 2);
  if (focusId) document.getElementById(focusId)?.focus({ preventScroll: true });
}
function editSchema(focusId) {
  submitted = false; result.textContent = ""; result.removeAttribute("data-tone");
  configurationStatus.textContent = t("Schema updated; unchanged fields retain their preview values.", "配置已更新；未改变字段的预览值会保留。"); render(focusId);
}
function button(symbol, name, id, disabled, onClick) {
  const button = make("button", symbol); button.type = "button"; button.id = id; button.disabled = disabled;
  button.title = name; button.setAttribute("aria-label", name); button.addEventListener("click", onClick); return button;
}
function editor(field, index) {
  const row = make("div", undefined, "schema-row"); row.dataset.key = field.key;
  const main = make("div", undefined, "schema-row-main");
  const editLabel = make("label", t("Label", "标题")), text = make("input"); text.id = `label-${field.key}`; text.value = title(field); text.maxLength = 80;
  editLabel.append(text); main.append(editLabel, make("small", field.key));
  text.addEventListener("change", () => { if (!text.value.trim()) { text.value = title(field); return; } field.label = text.value.trim(); field.labelZh = field.label; editSchema(text.id); });
  const typeLabel = make("label", t("Type", "类型")), select = make("select"); select.id = `type-${field.key}`;
  fieldTypes.forEach(type => { const option = make("option", zh() ? types[type] : type); option.value = type; select.append(option); }); select.value = field.type; typeLabel.append(select);
  select.addEventListener("change", () => {
    field.type = select.value; delete values[field.key]; delete field.options; delete field.minLength; delete field.maxLength; delete field.min; delete field.max;
    if (field.type === "select") field.options = [{ label: "Option A", labelZh: "选项 A", value: "a" }, { label: "Option B", labelZh: "选项 B", value: "b" }];
    editSchema(select.id);
  });
  const requiredLabel = make("label", undefined, "required-control"), required = make("input"); required.type = "checkbox"; required.id = `required-${field.key}`; required.checked = field.required;
  requiredLabel.append(required, document.createTextNode(t("Required", "必填")));
  required.addEventListener("change", () => { field.required = required.checked; editSchema(required.id); }); main.append(typeLabel, requiredLabel);
  const actions = make("div", undefined, "schema-actions");
  const move = offset => { [schema.fields[index], schema.fields[index + offset]] = [schema.fields[index + offset], schema.fields[index]]; editSchema(`label-${field.key}`); };
  actions.append(button("↑", `${t("Move up", "上移")} ${title(field)}`, `up-${field.key}`, index === 0, () => move(-1)), button("↓", `${t("Move down", "下移")} ${title(field)}`, `down-${field.key}`, index === schema.fields.length - 1, () => move(1)), button("×", `${t("Remove", "删除")} ${title(field)}`, `remove-${field.key}`, schema.fields.length === 1, () => {
    schema.fields.splice(index, 1); delete values[field.key]; editSchema(`label-${schema.fields[Math.min(index, schema.fields.length - 1)].key}`);
  })); row.append(main, actions); return row;
}
form.addEventListener("submit", event => {
  event.preventDefault(); if (!schema) return; submitted = true; let first = null;
  schema.fields.forEach(field => { const input = document.getElementById(`field-${field.key}`), message = errorFor(field, input); showError(field, message); if (message && !first) first = input; });
  result.dataset.tone = first ? "error" : "success";
  result.textContent = first ? t("Review the highlighted fields.", "请检查标出的字段。") : t("Validation passed. No data was submitted.", "校验通过，未提交任何数据。"); first?.focus();
});
document.querySelector("#add-field").addEventListener("click", () => {
  if (!schema || schema.fields.length >= MAX_FIELDS) return;
  const key = nextKey(schema.fields); schema.fields.push({ key, label: `New ${key}`, labelZh: `新字段 ${key}`, type: "text", required: false }); editSchema(`label-${key}`);
});
document.querySelector("#reset-schema").addEventListener("click", () => { if (!initial) return; schema = structuredClone(initial); values = {}; editSchema(); });
document.querySelector("#copy-json").addEventListener("click", async () => {
  if (!schema) return;
  try { await navigator.clipboard.writeText(JSON.stringify(schema, null, 2)); configurationStatus.textContent = t("JSON copied.", "JSON 已复制。"); }
  catch { configurationStatus.textContent = t("Clipboard unavailable. Select and copy from the JSON editor.", "剪贴板不可用，请在 JSON 编辑区中选中并复制。"); }
});
document.querySelector("#apply-json").addEventListener("click", () => {
  try {
    if (json.value.length > 65536) throw Error("Configuration exceeds 64 KB / 配置超过 64 KB。");
    const next = checkSchema(JSON.parse(json.value)); schema = next; values = {}; editSchema();
    configurationStatus.textContent = t("JSON applied. Preview values were reset.", "JSON 已应用，预览值已重置。");
  } catch (error) { configurationStatus.textContent = `${t("Rejected", "拒绝应用")}: ${error.message}`; }
});
document.addEventListener("portfolio-language-change", () => { if (schema) { result.textContent = ""; configurationStatus.textContent = ""; render(); } });
try {
  const response = await fetch("./schema.json"); if (!response.ok) throw Error(`HTTP ${response.status}`);
  initial = checkSchema(await response.json()); schema = structuredClone(initial); render();
  configurationStatus.textContent = t("Configuration loaded. Changes stay in this tab.", "配置已加载，修改只保留在此标签页。");
} catch {
  result.textContent = t("Unable to load schema.json. Reload over HTTP to retry.", "无法加载 schema.json，请通过 HTTP 访问后刷新重试。");
  document.querySelectorAll(".studio-actions button, #apply-json, #copy-json").forEach(button => { button.disabled = true; });
}
