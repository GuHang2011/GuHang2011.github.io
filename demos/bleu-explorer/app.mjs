import { bleu } from './bleu.mjs';

const $ = id => document.getElementById(id);
const expandedOrders = new Set();

function scoreMessage(result, order) {
  if (result.c === 0) return '候选译文为空，BLEU 得分为 0。';
  if (result.c < order) return `候选译文只有 ${result.c} 个词，无法组成 ${order}-gram。按固定阶数、无平滑计算，BLEU-${order} 得分为 0。`;
  if (result.score === 0) return '至少一阶的匹配数为 0，无平滑 BLEU 得分为 0。';
  return '裁剪精度的几何平均 × 短句惩罚。';
}

function update() {
  const detailsList = $('details');
  for (const details of detailsList.children) {
    if (details.open) expandedOrders.add(details.dataset.order);
    else expandedOrders.delete(details.dataset.order);
  }
  $('rows').replaceChildren();
  detailsList.replaceChildren();
  try {
    const order = Number($('order').value);
    const result = bleu($('candidate').value, $('references').value.split('\n'), order);
    $('score').textContent = (result.score * 100).toFixed(2);
    $('lengths').textContent = `候选长度 c = ${result.c} · 参考长度 r = ${result.r} · BP = ${result.bp.toFixed(4)}`;
    $('message').textContent = scoreMessage(result, order);
    for (const row of result.rows) {
      const tr = document.createElement('tr');
      const precision = row.total ? `${(row.precision * 100).toFixed(2)}%` : '—（无候选词组）';
      for (const value of [`${row.n}-gram`, `${row.matches} / ${row.total}`, precision]) {
        const td = document.createElement('td');
        td.textContent = value;
        tr.append(td);
      }
      $('rows').append(tr);

      const details = document.createElement('details');
      details.dataset.order = String(row.n);
      details.open = expandedOrders.has(details.dataset.order);
      const summary = document.createElement('summary');
      summary.textContent = `${row.n}-gram 计数明细（词组 · 裁剪数 / 候选数 · 参考最大数）`;
      const grams = document.createElement('div');
      grams.className = 'grams';
      if (!row.total) grams.textContent = `当前候选译文无法组成 ${row.n}-gram。`;
      for (const item of row.details) {
        const span = document.createElement('span');
        span.className = 'gram';
        span.textContent = `${item.gram} · ${item.clipped}/${item.count} · ref ${item.max}`;
        grams.append(span);
      }
      details.append(summary, grams);
      detailsList.append(details);
    }
  } catch (error) {
    $('score').textContent = '—';
    $('lengths').textContent = '';
    $('message').textContent = error.message;
  }
}

for (const id of ['candidate', 'references', 'order']) $(id).addEventListener('input', update);
const examples = {
  exact: ['the cat is on the mat', 'the cat is on the mat', 4],
  repeat: ['the the the the the the the', 'the cat is on the mat', 1],
  short: ['the cat is on', 'the cat is on the mat', 4]
};
document.querySelectorAll('[data-example]').forEach(button => button.addEventListener('click', () => {
  const [candidate, references, order] = examples[button.dataset.example];
  $('candidate').value = candidate;
  $('references').value = references;
  $('order').value = order;
  update();
}));
update();
