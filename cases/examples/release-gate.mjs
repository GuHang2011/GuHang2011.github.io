// Educational extraction of the local release checks; supplied summaries use synthetic data.
const digestPattern = /^[0-9a-f]{64}$/i;

export function checkReleaseEvidence(acceptance, browser, currentDigests) {
  const errors = [];
  for (const check of ['status', 'browser', 'httpSmoke', 'chatSmoke', 'restart']) {
    if (acceptance?.[check] !== 'passed') errors.push(`Incomplete check: ${check}`);
  }

  for (const key of ['jarSha256', 'frontendSha256', 'browserReportSha256']) {
    const recorded = acceptance?.[key];
    const current = currentDigests?.[key];
    if (typeof recorded !== 'string' || typeof current !== 'string'
        || !digestPattern.test(recorded) || !digestPattern.test(current)
        || recorded.toLowerCase() !== current.toLowerCase()) {
      errors.push(`Missing or changed digest: ${key}`);
    }
  }

  const stats = browser?.stats;
  if (!Number.isInteger(stats?.expected) || stats.expected <= 0
      || ['unexpected', 'flaky', 'skipped'].some(key => stats?.[key] !== 0)
      || !Array.isArray(browser?.errors) || browser.errors.some(error => error != null)) {
    errors.push('Browser checks must pass without failures, skips or global errors');
  }

  return { allowed: errors.length === 0, errors };
}
