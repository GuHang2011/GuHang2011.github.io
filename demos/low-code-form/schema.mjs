export const fieldTypes = ["text", "email", "select", "textarea", "number", "date"];
export const MAX_FIELDS = 12;
const forbiddenKeys = new Set(["__proto__", "prototype", "constructor"]);
function record(value) { return value !== null && typeof value === "object" && !Array.isArray(value); }
function shortText(value, limit = 80) { return typeof value === "string" && value.trim().length > 0 && value.length <= limit; }
// Versioned application schema; intentionally not a JSON Schema implementation.
export function checkSchema(value) {
  if (!record(value) || value.version !== 1 || !shortText(value.id) || !shortText(value.title)) throw Error("Expected version 1, id and title / 需要版本 1、id 和标题。");
  if (!Array.isArray(value.fields) || value.fields.length < 1 || value.fields.length > MAX_FIELDS) throw Error("Use 1–12 fields / 字段数量应为 1–12。");
  const keys = new Set();
  for (const field of value.fields) {
    if (!record(field) || typeof field.key !== "string" || !/^[a-z][a-z0-9_]{0,31}$/.test(field.key) || forbiddenKeys.has(field.key) || keys.has(field.key)) throw Error("Invalid or duplicate field key / 字段键非法或重复。");
    keys.add(field.key);
    if (!shortText(field.label) || !fieldTypes.includes(field.type) || typeof field.required !== "boolean") throw Error("Invalid label, type or required / 字段标题、类型或必填规则非法。");
    if (field.labelZh !== undefined && !shortText(field.labelZh)) throw Error("Invalid Chinese label / 中文标题无效。");
    if (field.placeholder !== undefined && (typeof field.placeholder !== "string" || field.placeholder.length > 160)) throw Error("Placeholder too long / 提示文字过长。");
    for (const rule of ["minLength", "maxLength"]) if (field[rule] !== undefined && (!Number.isInteger(field[rule]) || field[rule] < 0 || field[rule] > 1000)) throw Error("Invalid length bound / 长度限制应为 0–1000 的整数。");
    if ((field.minLength ?? 0) > (field.maxLength ?? 1000)) throw Error("Minimum exceeds maximum / 最小长度大于最大长度。");
    for (const rule of ["min", "max"]) if (field[rule] !== undefined && (typeof field[rule] !== "number" || !Number.isFinite(field[rule]))) throw Error("Invalid numeric bound / 数字范围无效。");
    if ((field.min ?? -Infinity) > (field.max ?? Infinity)) throw Error("Minimum exceeds maximum / 最小值大于最大值。");
    if (field.type === "select") {
      if (!Array.isArray(field.options) || !field.options.length || field.options.length > 20) throw Error("Use 1–20 options / 选项数量应为 1–20。");
      const values = new Set();
      for (const option of field.options) {
        if (!record(option) || !shortText(option.label) || !shortText(option.value, 60) || values.has(option.value)) throw Error("Invalid or duplicate option / 选项无效或重复。");
        if (option.labelZh !== undefined && !shortText(option.labelZh)) throw Error("Invalid option translation / 选项译文无效。");
        values.add(option.value);
      }
    }
  }
  return structuredClone(value);
}
export function nextKey(fields) {
  const keys = new Set(fields.map(field => field.key)); let index = 1;
  while (keys.has(`field_${index}`)) index++;
  return `field_${index}`;
}
export function validateField(field, raw, zh = false) {
  const value = String(raw ?? "").trim(); const t = (en, cn) => zh ? cn : en;
  if (!value) return field.required ? t("This field is required.", "此字段为必填项。") : "";
  if (field.minLength !== undefined && value.length < field.minLength) return t(`Use at least ${field.minLength} characters.`, `至少填写 ${field.minLength} 个字符。`);
  if (field.maxLength !== undefined && value.length > field.maxLength) return t(`Use at most ${field.maxLength} characters.`, `最多填写 ${field.maxLength} 个字符。`);
  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("Enter a valid email.", "请输入有效邮箱。");
  if (field.type === "select" && !field.options.some(option => option.value === value)) return t("Choose a listed option.", "请选择配置中的有效选项。");
  if (field.type === "number") {
    const number = Number(value);
    if (!Number.isFinite(number)) return t("Enter a finite number.", "请输入有限数字。");
    if (field.min !== undefined && number < field.min) return t(`Minimum: ${field.min}.`, `最小值为 ${field.min}。`);
    if (field.max !== undefined && number > field.max) return t(`Maximum: ${field.max}.`, `最大值为 ${field.max}。`);
  }
  if (field.type === "date") {
    const date = new Date(value + "T00:00:00Z");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) return t("Enter a valid calendar date.", "请输入有效日历日期。");
  }
  return "";
}
