export const syntheticLosses = Object.freeze([
  0.820, 0.720, 0.630, 0.585, 0.550, 0.552, 0.548, 0.556,
  0.560, 0.555, 0.546, 0.552, 0.558, 0.561, 0.550, 0.544,
  0.547, 0.552, 0.560, 0.566,
]);

export function syntheticScores(mode) {
  if (mode !== "min" && mode !== "max") throw new RangeError("Mode must be min or max.");
  return syntheticLosses.map(value => mode === "min" ? value : Number((1 - value).toFixed(3)));
}

export function traceEarlyStopping(scores, { mode = "min", patience = 3, minDelta = 0.005 } = {}) {
  if (mode !== "min" && mode !== "max") throw new RangeError("Mode must be min or max.");
  if (!Number.isInteger(patience) || patience < 1) throw new RangeError("Patience must be a positive integer.");
  if (!Number.isFinite(minDelta) || minDelta < 0) throw new RangeError("Min delta must be finite and nonnegative.");
  if (!Array.isArray(scores) || scores.length === 0 || scores.some(score => !Number.isFinite(score))) {
    throw new TypeError("Scores must be a nonempty array of finite numbers.");
  }
  let bestScore = null;
  let bestEpoch = null;
  let badEpochs = 0;
  const trace = [];
  for (const [index, score] of scores.entries()) {
    const epoch = index + 1;
    const improved = bestScore === null || (mode === "min" ? score < bestScore - minDelta : score > bestScore + minDelta);
    if (improved) { bestScore = score; bestEpoch = epoch; badEpochs = 0; }
    else badEpochs += 1;
    const stopped = badEpochs >= patience;
    trace.push(Object.freeze({ epoch, score, bestScore, bestEpoch, badEpochs, improved, stopped }));
    if (stopped) break;
  }
  return Object.freeze(trace);
}
