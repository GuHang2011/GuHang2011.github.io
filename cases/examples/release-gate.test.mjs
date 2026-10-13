import assert from 'node:assert/strict';
import test from 'node:test';
import { checkReleaseEvidence } from './release-gate.mjs';

function fixture() {
  const currentDigests = {
    jarSha256: 'a'.repeat(64),
    frontendSha256: 'b'.repeat(64),
    browserReportSha256: 'c'.repeat(64),
  };
  return {
    acceptance: {
      status: 'passed', browser: 'passed', httpSmoke: 'passed',
      chatSmoke: 'passed', restart: 'passed', ...currentDigests,
    },
    browser: { stats: { expected: 3, unexpected: 0, flaky: 0, skipped: 0 }, errors: [] },
    currentDigests,
  };
}

test('a complete matching report permits release', () => {
  const f = fixture();
  assert.equal(checkReleaseEvidence(f.acceptance, f.browser, f.currentDigests).allowed, true);
});

test('a changed production artifact blocks release even when every check passed', () => {
  const f = fixture();
  f.currentDigests.frontendSha256 = 'd'.repeat(64);
  assert.deepEqual(checkReleaseEvidence(f.acceptance, f.browser, f.currentDigests), {
    allowed: false, errors: ['Missing or changed digest: frontendSha256'],
  });
});

test('a skipped browser check cannot be reported as a completed release', () => {
  const f = fixture();
  f.browser.stats.skipped = 1;
  assert.equal(checkReleaseEvidence(f.acceptance, f.browser, f.currentDigests).allowed, false);
});

test('missing digest and unfinished persistence evidence both block release', () => {
  const f = fixture();
  delete f.acceptance.jarSha256;
  f.acceptance.restart = 'not-run';
  const result = checkReleaseEvidence(f.acceptance, f.browser, f.currentDigests);
  assert.equal(result.allowed, false);
  assert.equal(result.errors.length, 2);
});

test('malformed browser evidence is rejected without throwing', () => {
  const f = fixture();
  assert.equal(checkReleaseEvidence(f.acceptance, null, f.currentDigests).allowed, false);
  assert.equal(checkReleaseEvidence(null, null, null).allowed, false);
});
