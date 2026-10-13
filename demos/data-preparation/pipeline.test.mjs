import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { MIXED_CSV, isStrictUtcDate, parseAmount, runPipeline, makeScenario, protectCsvCell, MAX_ROWS } from "./pipeline.mjs";

const Papa = createRequire(import.meta.url)("../vendor/papaparse.min.js");

const event = (id, amount = "0", overrides = {}) => ({ id, timestamp: "2026-10-01T09:00:00Z", group: "A", amount, ...overrides });

test("zero and negative adjustment remain valid events", () => {
  const result = runPipeline([event("a", "0"), event("b", "-2.50")]);
  assert.equal(result.cleaned.length, 2);
  assert.equal(result.summary.zeros, 1);
  assert.equal(result.summary.totalCents, -250);
});
test("missing is distinguished from zero", () => {
  const result = runPipeline([event("zero", 0), event("missing", " ")]);
  assert.deepEqual(result.cleaned.map(row => row.id), ["zero"]);
  assert.equal(result.quarantine[0].reason, "missing_amount");
});
test("zero imputation is flagged and cannot hide malformed input", () => {
  const result = runPipeline([event("missing", ""), event("bad", "NaN")], { missing: "zero" });
  assert.equal(result.cleaned[0].imputed, true);
  assert.equal(result.summary.imputed, 1);
  assert.equal(result.quarantine[0].reason, "invalid_amount");
});
test("calendar validation rejects rollover and accepts leap day", () => {
  assert.equal(isStrictUtcDate("2026-02-30T09:00:00Z"), false);
  assert.equal(isStrictUtcDate("2024-02-29T23:59:59Z"), true);
  assert.equal(isStrictUtcDate("2026-02-29T09:00:00Z"), false);
  assert.equal(isStrictUtcDate("2026-10-01T24:00:00Z"), false);
  assert.equal(isStrictUtcDate("2026-10-01T09:00:00+08:00"), false);
});
test("exact copies collapse while conflicting IDs quarantine all versions", () => {
  const result = runPipeline([event("a", "1.00"), event("a", "1"), event("b", "2"), event("b", "3")]);
  assert.deepEqual(result.cleaned.map(row => row.id), ["a"]);
  assert.equal(result.reasons.duplicate_exact, 1);
  assert.equal(result.reasons.duplicate_conflict, 2);
});
test("keep-first policy is input-order dependent and records the retained conflict", () => {
  const result = runPipeline([event("a", "2"), event("a", "3")], { duplicate: "first" });
  assert.equal(result.cleaned[0].amount, 2);
  assert.equal(result.cleaned[0].conflictRetained, true);
  assert.equal(result.reasons.duplicate_keep_first, 1);
});
test("deduplication compares group and timestamp as well as amount", () => {
  const result = runPipeline([event("a", "2"), event("a", "2", { group: "B" })]);
  assert.equal(result.cleaned.length, 0);
  assert.equal(result.reasons.duplicate_conflict, 2);
});
test("reapplying the completed pipeline is idempotent on data and totals", () => {
  const first = runPipeline([event("a", "1"), event("a", "1"), event("b", "0"), event("c", "")], { missing: "zero" });
  const second = runPipeline(first.cleaned, first.policies);
  assert.deepEqual(second.cleaned, first.cleaned);
  assert.deepEqual(second.groups, first.groups);
  assert.equal(second.quarantine.length, 0);
});
test("reapplication preserves the retained conflict provenance flag", () => {
  const first = runPipeline([event("a", "2"), event("a", "3")], { duplicate: "first" });
  const second = runPipeline(first.cleaned, first.policies);
  assert.deepEqual(second.cleaned, first.cleaned);
});
test("amount parsing has decimal precision, bounds and no coercion", () => {
  assert.equal(parseAmount("0.10").cents + parseAmount("0.20").cents, 30);
  for (const amount of ["Infinity", "1e3", "0x10", "1.001", "1000001", "a"]) assert.equal(parseAmount(amount).error, "invalid_amount");
  assert.equal(parseAmount("-0").cents, 0);
});
test("group totals reconcile with cleaned total and every source row has one destination", () => {
  const rows = [event("a", "0.10"), event("b", "0.20"), event("b", "0.20"), event("bad", "0", { group: "" })];
  const result = runPipeline(rows);
  assert.equal(result.groups.reduce((sum, item) => sum + item.cents, 0), result.summary.totalCents);
  assert.equal(result.cleaned.length + result.quarantine.length, rows.length);
  assert.deepEqual([...result.cleaned, ...result.quarantine].map(row => row.sourceRow).sort(), [1, 2, 3, 4]);
});
test("bounded stages stop before later transformations", () => {
  const rows = [event("a", "1"), event("a", "1"), event("b", "")];
  assert.equal(runPipeline(rows, {}, 0).cleaned.length, 3);
  assert.equal(runPipeline(rows, {}, 1).cleaned.length, 3);
  assert.equal(runPipeline(rows, {}, 2).cleaned.length, 2);
  assert.equal(runPipeline(rows, {}, 3).cleaned.length, 1);
  assert.equal(runPipeline(rows, {}, 3).groups.length, 0);
});
test("limits and unknown policies fail explicitly", () => {
  assert.throws(() => runPipeline(Array.from({ length: MAX_ROWS + 1 }, () => event("a"))), RangeError);
  assert.throws(() => runPipeline([], { duplicate: "last" }), RangeError);
  assert.throws(() => runPipeline([], {}, 5), RangeError);
  assert.throws(() => makeScenario([], "unknown"), RangeError);
});
test("CSV formula prefixes are neutralized for spreadsheet export", () => {
  for (const value of ["=1+1", " @SUM(A1)", "\t+cmd", "-2"]) assert.equal(protectCsvCell(value), `'${value}`);
  assert.equal(protectCsvCell("EV001"), "EV001");
});
test("the real CSV fixture yields the documented quality and exact totals", () => {
  const parsed = Papa.parse(MIXED_CSV, { header: true, skipEmptyLines: "greedy" });
  assert.equal(parsed.errors.length, 0);
  const result = runPipeline(parsed.data);
  assert.deepEqual(result.summary, { input: 17, kept: 10, quarantined: 7, zeros: 2, imputed: 0, totalCents: 4750 });
  assert.deepEqual(result.groups.map(({ group, cents }) => [group, cents]), [["A", 1650], ["B", 900], ["C", 1200], ["D", 1000]]);
});
test("scenarios preserve source input and vary missing or duplicate evidence", () => {
  const rows = Papa.parse(MIXED_CSV, { header: true, skipEmptyLines: "greedy" }).data;
  const original = JSON.stringify(rows);
  assert.equal(runPipeline(makeScenario(rows, "complete")).summary.quarantined, 0);
  assert.equal(runPipeline(makeScenario(rows, "missing")).reasons.missing_amount, 3);
  assert.equal(runPipeline(makeScenario(rows, "conflicts")).reasons.duplicate_conflict, 2);
  assert.equal(JSON.stringify(rows), original);
});
