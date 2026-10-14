import assert from "node:assert/strict";
import test from "node:test";
import { syntheticScores, traceEarlyStopping } from "./demo-core.mjs";

test("default replay separates best and stopped epochs", () => {
  const trace = traceEarlyStopping(syntheticScores("min"));
  const last = trace.at(-1);
  assert.equal(last.epoch, 8);
  assert.equal(last.bestEpoch, 5);
  assert.equal(last.badEpochs, 3);
  assert.equal(last.stopped, true);
});

test("maximize replay has the same selection contract", () => {
  const trace = traceEarlyStopping(syntheticScores("max"), { mode: "max" });
  assert.equal(trace.at(-1).epoch, 8);
  assert.equal(trace.at(-1).bestEpoch, 5);
});

test("an improvement equal to min delta does not reset patience", () => {
  const trace = traceEarlyStopping([1, 0.5, 0.25], { patience: 1, minDelta: 0.5 });
  assert.equal(trace.length, 2);
  assert.equal(trace[1].bestEpoch, 1);
  assert.equal(trace[1].stopped, true);
});

test("future better values cannot revive a stopped replay", () => {
  const trace = traceEarlyStopping([0.5, 0.6, 0.1], { patience: 1 });
  assert.equal(trace.length, 2);
  assert.equal(trace.at(-1).bestScore, 0.5);
});

test("zero min delta counts a strictly smaller score as improvement", () => {
  const trace = traceEarlyStopping([1, 1, 0.999], { patience: 2, minDelta: 0 });
  assert.equal(trace.at(-1).bestEpoch, 3);
  assert.equal(trace.at(-1).badEpochs, 0);
  assert.equal(trace.at(-1).stopped, false);
});

test("a finite sequence can finish without stopping", () => {
  const trace = traceEarlyStopping(syntheticScores("min"), { patience: 8, minDelta: 0 });
  assert.equal(trace.length, 20);
  assert.equal(trace.at(-1).stopped, false);
});

test("invalid options and scores fail explicitly", () => {
  for (const mode of ["MIN", "median", null]) assert.throws(() => traceEarlyStopping([1], { mode }), RangeError);
  for (const patience of [0, -1, 1.5, NaN]) assert.throws(() => traceEarlyStopping([1], { patience }), RangeError);
  for (const minDelta of [-0.1, NaN, Infinity]) assert.throws(() => traceEarlyStopping([1], { minDelta }), RangeError);
  for (const scores of [[], [NaN], [Infinity], [1, "2"]]) assert.throws(() => traceEarlyStopping(scores), TypeError);
});
