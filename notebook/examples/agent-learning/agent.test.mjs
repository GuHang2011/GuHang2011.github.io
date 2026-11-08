import test from 'node:test';
import assert from 'node:assert/strict';
import { AgentSession, scriptedModel } from './agent.mjs';

const search = { kind: 'tool', name: 'search_notes', args: { query: 'Agent' } };
const save = { kind: 'tool', name: 'save_draft', args: { title: 'Reading', noteIds: ['tools'] } };
const answer = { kind: 'answer', text: 'Done' };
const sequence = (...steps) => { let i = 0; return async () => steps[Math.min(i++, steps.length - 1)]; };
const results = state => state.messages.filter(m => m.role === 'tool').map(m => m.content);

test('read, pause, approve and continue: write occurs only after the host decision', async () => {
  const s = new AgentSession({ model: scriptedModel });
  const pending = await s.run();
  assert.equal(pending.status, 'awaiting_approval'); assert.equal(pending.drafts.length, 0);
  assert.equal(pending.turns, 2);
  s.decide(pending.pending.id, true);
  const done = await s.run();
  assert.equal(done.status, 'done'); assert.equal(done.drafts.length, 1);
  assert.equal(done.turns, 3); assert.ok(done.messages.at(-1).content.includes('进程内存'));
});

test('denial is returned to the model and causes no write', async () => {
  const s = new AgentSession({ model: scriptedModel }); const a = await s.run();
  s.decide(a.pending.id, false); const done = await s.run();
  assert.equal(done.drafts.length, 0); assert.equal(results(done).at(-1).error, 'USER_DENIED');
  assert.ok(done.messages.at(-1).content.includes('没有保存'));
});

test('unknown tool is refused even with a friendly name', async () => {
  const s = new AgentSession({ model: sequence({ kind: 'tool', name: 'publish_to_github', args: {} }, answer) });
  assert.equal(results(await s.run())[0].error, 'TOOL_NOT_ALLOWED');
});

test('model-supplied approval and surplus fields do not grant permission', async () => {
  const s = new AgentSession({ model: sequence(search, { ...save, args: { ...save.args, approved: true } }, answer) });
  const result = await s.run();
  assert.equal(results(result).at(-1).error, 'INVALID_ARGUMENTS'); assert.equal(result.drafts.length, 0);
});

test('wrong types, blank query, oversized text and duplicate IDs fail validation', async () => {
  for (const proposal of [
    { ...search, args: { query: 1 } }, { ...search, args: { query: ' ' } },
    { ...search, args: { query: 'x'.repeat(81) } }, { ...search, args: null },
    { ...save, args: { title: 'x', noteIds: ['tools', 'tools'] } },
  ]) {
    const s = new AgentSession({ model: sequence(proposal, answer) });
    assert.equal(results(await s.run())[0].error, 'INVALID_ARGUMENTS');
  }
});

test('write cannot cite a guessed ID without retrieval', async () => {
  const s = new AgentSession({ model: sequence(save, answer) });
  const r = await s.run(); assert.equal(results(r)[0].error, 'SOURCE_NOT_RETRIEVED');
  assert.equal(r.pending, null);
});

test('a mutated preview cannot change the approved payload', async () => {
  const s = new AgentSession({ model: scriptedModel }); const a = await s.run();
  const original = structuredClone(a.pending.args);
  a.pending.args.title = 'Injected'; a.pending.args.noteIds.push('not-retrieved');
  s.decide(a.pending.id, true);
  assert.equal(s.snapshot().drafts[0].title, original.title);
  assert.deepEqual(s.snapshot().drafts[0].noteIds, original.noteIds);
});

test('wrong-session IDs and repeated decisions are rejected', async () => {
  const s = new AgentSession({ model: scriptedModel }); const a = await s.run();
  assert.throws(() => s.decide('other-session', true), /NO_MATCHING_APPROVAL/);
  assert.equal(s.snapshot().drafts.length, 0);
  s.decide(a.pending.id, true);
  assert.throws(() => s.decide(a.pending.id, true), /NO_MATCHING_APPROVAL/);
  assert.equal(s.snapshot().drafts.length, 1);
});

test('an expired decision produces no side effect', async () => {
  let now = 0;
  const s = new AgentSession({ model: scriptedModel, now: () => now, approvalTtlMs: 100 });
  const a = await s.run(); now = 100; s.decide(a.pending.id, true);
  assert.equal(s.snapshot().drafts.length, 0);
  assert.equal(results(s.snapshot()).at(-1).error, 'APPROVAL_EXPIRED');
});

test('same payload has one draft within a session, even if requested and approved twice', async () => {
  const s = new AgentSession({ model: sequence(search, save, save, answer) });
  let r = await s.run(); s.decide(r.pending.id, true);
  r = await s.run(); s.decide(r.pending.id, true); r = await s.run();
  assert.equal(r.drafts.length, 1); assert.equal(results(r).at(-1).data.duplicate, true);
});

test('repeated tool errors consume the turn budget and terminate', async () => {
  const s = new AgentSession({ model: sequence({ kind: 'tool', name: 'shell', args: {} }), maxTurns: 3 });
  const r = await s.run(); assert.equal(r.status, 'limit'); assert.equal(r.turns, 3);
  assert.equal(results(r).length, 3);
});

test('approval does not reset the turn budget', async () => {
  const s = new AgentSession({ model: sequence(search, save, save), maxTurns: 2 });
  const r = await s.run(); s.decide(r.pending.id, true);
  assert.equal((await s.run()).status, 'limit'); assert.equal(s.snapshot().turns, 2);
});

test('timeout rejects late model output even if the model ignores abort', async () => {
  let resolve;
  const s = new AgentSession({ model: () => new Promise(r => { resolve = r; }), modelTimeoutMs: 10 });
  const r = await s.run(); assert.equal(r.status, 'failed');
  assert.equal(r.events.at(-1).error, 'MODEL_TIMEOUT');
  resolve(save); await new Promise(r => setImmediate(r));
  assert.equal(s.snapshot().pending, null); assert.equal(s.snapshot().drafts.length, 0);
});

test('cancel during a model call and reject a concurrent run', async () => {
  let entered, resolve;
  const started = new Promise(r => { entered = r; });
  const s = new AgentSession({ model: () => new Promise(r => { resolve = r; entered(); }) });
  const first = s.run(); await started;
  await assert.rejects(s.run(), /RUN_ALREADY_ACTIVE/);
  s.cancel(); assert.equal((await first).status, 'cancelled'); resolve(save);
  await new Promise(r => setImmediate(r)); assert.equal(s.snapshot().pending, null);
});

test('cancel invalidates a pending approval', async () => {
  const s = new AgentSession({ model: scriptedModel }); const r = await s.run(); s.cancel();
  assert.throws(() => s.decide(r.pending.id, true), /NO_MATCHING_APPROVAL/);
  assert.equal(s.snapshot().drafts.length, 0);
});

test('empty retrieval returns an explicit empty array', async () => {
  const s = new AgentSession({ model: sequence({ ...search, args: { query: 'missing-keyword' } }, answer) });
  assert.deepEqual(results(await s.run())[0], { ok: true, data: [] });
});

test('malformed model response ends the run instead of executing data', async () => {
  const s = new AgentSession({ model: sequence({ kind: 'tool', name: 'search_notes', args: {}, approved: true }) });
  const r = await s.run(); assert.equal(r.status, 'failed');
  assert.equal(r.events.at(-1).error, 'INVALID_MODEL_RESPONSE'); assert.equal(results(r).length, 0);
});

test('terminal states do not invoke the model again', async () => {
  let calls = 0;
  const s = new AgentSession({ model: async () => { calls++; return answer; } });
  await s.run(); await s.run(); s.cancel(); assert.equal(calls, 1); assert.equal(s.snapshot().status, 'done');
});
