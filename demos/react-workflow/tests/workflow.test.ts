import test from "node:test";
import assert from "node:assert/strict";
import { initialState, reducer, transitions } from "../src/workflow.ts";
const operation = { token: 1, id: "WF-104", to: "approved" as const, version: 3 };
const start = () => reducer(initialState(), { type: "start", operation });
test("success changes only the target task and increments its version", () => {
  const state = reducer(start(), { type: "settle", token: 1, outcome: "success" });
  assert.equal(state.tasks[0].status, "approved"); assert.equal(state.tasks[0].version, 4);
  assert.deepEqual(state.tasks.slice(1), initialState().tasks.slice(1)); assert.equal(state.pending, null);
});
test("owner cannot approve and reviewer cannot submit a draft", () => {
  assert.deepEqual(transitions("owner", "review"), []);
  const owner = reducer(initialState(), { type: "role", role: "owner" });
  assert.equal(reducer(owner, { type: "start", operation }).message, "forbidden");
  assert.deepEqual(transitions("reviewer", "draft"), []);
  assert.deepEqual(transitions("owner", "draft"), ["review"]);
});
test("stale version and invalid transition are rejected", () => {
  assert.equal(reducer(initialState(), { type: "start", operation: { ...operation, version: 2 } }).pending, null);
  assert.equal(reducer(initialState(), { type: "start", operation: { ...operation, to: "draft" } }).message, "forbidden");
});
test("a pending operation blocks another command and role changes", () => {
  const state = start(); assert.equal(reducer(state, { type: "start", operation: { ...operation, token: 2 } }), state);
  assert.equal(reducer(state, { type: "role", role: "owner" }), state);
});
test("network failure preserves tasks and supports a later retry", () => {
  const failed = reducer(start(), { type: "settle", token: 1, outcome: "error" });
  assert.deepEqual(failed.tasks, initialState().tasks); assert.deepEqual(failed.failed, operation);
  const retry = reducer(failed, { type: "start", operation: { ...operation, token: 2 } });
  assert.equal(reducer(retry, { type: "settle", token: 2, outcome: "success" }).tasks[0].status, "approved");
});
test("conflict requires refreshing before resubmitting with a new version", () => {
  const conflicted = reducer(start(), { type: "settle", token: 1, outcome: "conflict" });
  assert.equal(conflicted.tasks[0].version, 3); assert.equal(conflicted.conflict?.version, 4);
  assert.equal(reducer(conflicted, { type: "start", operation }), conflicted);
  const refreshed = reducer(conflicted, { type: "refresh" }); assert.equal(refreshed.tasks[0].version, 4);
  const pending = reducer(refreshed, { type: "start", operation: { ...operation, token: 2, version: 4 } });
  assert.equal(reducer(pending, { type: "settle", token: 2, outcome: "success" }).tasks[0].version, 5);
});
test("reset and newer request ignore late callbacks", () => {
  const reset = reducer(start(), { type: "reset" }); assert.equal(reducer(reset, { type: "settle", token: 1, outcome: "success" }), reset);
  const newer = reducer(reset, { type: "start", operation: { ...operation, token: 2 } });
  assert.equal(reducer(newer, { type: "settle", token: 1, outcome: "success" }), newer);
});
test("initial fixtures and previous state are never mutated", () => {
  const before = start(), snapshot = structuredClone(before);
  reducer(before, { type: "settle", token: 1, outcome: "success" }); assert.deepEqual(before, snapshot);
  const initial = initialState(); initial.tasks[0].version = 99; assert.equal(initialState().tasks[0].version, 3);
});
