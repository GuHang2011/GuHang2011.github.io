import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { checkSchema, nextKey, validateField, MAX_FIELDS } from "./schema.mjs";
const initial = JSON.parse(readFileSync(new URL("./schema.json", import.meta.url), "utf8"));
const field = { key: "sample", label: "Sample", type: "text", required: false };
test("default schema validates and returns an independent copy", () => {
  const parsed = checkSchema(initial); parsed.fields[0].label = "Changed"; assert.notEqual(initial.fields[0].label, "Changed");
});
test("missing, duplicate and reserved keys are rejected", () => {
  for (const key of ["", "constructor", "__proto__", "space key", "topic"]) {
    const schema = structuredClone(initial); schema.fields[1].key = key; assert.throws(() => checkSchema(schema));
  }
});
test("unsupported types, versions and excessive fields are rejected", () => {
  assert.throws(() => checkSchema({ ...initial, version: 2 }));
  assert.throws(() => checkSchema({ ...initial, fields: [{ ...field, type: "script" }] }));
  assert.throws(() => checkSchema({ ...initial, fields: Array.from({ length: MAX_FIELDS + 1 }, (_, i) => ({ ...field, key: `f${i}` })) }));
});
test("deleting and adding fields never duplicates a key", () => {
  const fields = [{ key: "field_1" }, { key: "field_3" }]; assert.equal(nextKey(fields), "field_2");
  fields.push({ key: nextKey(fields) }); assert.equal(nextKey(fields), "field_4");
});
test("required whitespace fails while optional blank ignores minLength", () => {
  assert.notEqual(validateField({ ...field, required: true }, "  "), "");
  assert.equal(validateField({ ...field, minLength: 3 }, ""), "");
  assert.notEqual(validateField({ ...field, minLength: 3 }, "ab"), "");
});
test("email and enum checks reject malformed values", () => {
  assert.notEqual(validateField({ ...field, type: "email" }, "name@"), "");
  assert.equal(validateField({ ...field, type: "email" }, "demo@example.org"), "");
  assert.notEqual(validateField(initial.fields[2], "not-listed"), "");
  assert.equal(validateField(initial.fields[2], "review"), "");
});
test("numeric bounds retain zero and reject infinities", () => {
  const number = { ...field, type: "number", required: true, min: 0, max: 10 };
  assert.equal(validateField(number, 0), "");
  for (const value of ["Infinity", "not-a-number", -1, 11]) assert.notEqual(validateField(number, value), "");
});
test("dates validate actual calendar days", () => {
  const date = { ...field, type: "date" };
  assert.equal(validateField(date, "2024-02-29"), "");
  assert.notEqual(validateField(date, "2025-02-29"), "");
  assert.notEqual(validateField(date, "2026-02-31"), "");
});
test("invalid rule ranges and duplicate options are rejected", () => {
  assert.throws(() => checkSchema({ ...initial, fields: [{ ...field, minLength: 5, maxLength: 2 }] }));
  assert.throws(() => checkSchema({ ...initial, fields: [{ ...field, type: "number", min: 5, max: 2 }] }));
  assert.throws(() => checkSchema({ ...initial, fields: [{ ...field, type: "select", options: [{ label: "A", value: "a" }, { label: "B", value: "a" }] }] }));
});
test("length bounds and translated errors are explicit", () => {
  assert.notEqual(validateField({ ...field, maxLength: 2 }, "abc"), "");
  assert.match(validateField({ ...field, required: true }, "", true), /必填/);
});
