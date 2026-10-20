import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createLatestRequest } from './latest-request.mjs';

function fixture() {
  const states = [], requests = [];
  const control = createLatestRequest((query, signal) => new Promise((resolve, reject) => {
    requests.push({ query, signal, resolve, reject });
  }), state => states.push(state));
  return { control, states, requests };
}
test('newer success survives an older response that ignores abort', async () => {
  const {control, states, requests} = fixture();
  const a = control.search('A'), ab = control.search('AB');
  assert.equal(requests[0].signal.aborted, true);
  requests[1].resolve(['new']); await ab;
  requests[0].resolve(['old']); await a;
  assert.deepEqual(states.at(-1), {status:'success',items:['new']});
  assert.equal(states.filter(s => s.status === 'success').length, 1);
});
test('stale rejection stays silent while current rejection is visible', async () => {
  const {control, states, requests} = fixture();
  const a = control.search('A'), ab = control.search('AB');
  requests[0].reject(new Error('old failure')); await a;
  assert.equal(states.at(-1).status, 'loading');
  requests[1].reject(new Error('network')); await ab;
  assert.equal(states.at(-1).status, 'error');
});
test('cleared input and disposal prevent late responses from rendering', async () => {
  const {control, states, requests} = fixture();
  const a = control.search('A'); await control.search('  ');
  requests[0].resolve(['old']); await a;
  assert.equal(states.at(-1).status, 'idle');
  const b = control.search('B'); control.dispose();
  const count = states.length;
  requests[1].resolve(['late']); await b;
  assert.equal(states.length, count);
});
test('empty data is distinct from error and idle', async () => {
  const {control, states, requests} = fixture();
  const a = control.search('A'); requests[0].resolve([]); await a;
  assert.deepEqual(states.at(-1), {status:'empty',items:[]});
});
