"use strict";
(() => {
  const $ = selector => document.querySelector(selector);
  const form = $('#report-form');
  const machine = $('#machine-select'), quantity = $('#quantity'), batch = $('#batch-id');
  const submit = $('#submit-report'), failure = $('#simulate-failure');
  const fields = [machine, quantity, batch, failure, $('#scan-button'), $('#sample-report')];
  const zh = () => document.documentElement.lang.startsWith('zh');
  const text = (node, en, cn) => { node.dataset.en = en; node.dataset.zh = cn; node.textContent = zh() ? cn : en; };
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  let generation = 0, busy = false, confirmed = false, total = 0;
  function feedback(en, cn, tone = 'neutral') { text($('#report-feedback'), en, cn); $('#report-feedback').dataset.tone = tone; }
  function state(en, cn, active, percent, tone = 'neutral') {
    text($('#report-status'), en, cn); $('#report-status').dataset.tone = tone;
    $('.ops-workbench').dataset.busy = String(busy);
    $('#report-progress-bar').style.width = `${percent}%`;
    $('#report-progress-label').textContent = `${percent}%`;
    $('.ops-progress-track').setAttribute('aria-valuenow', String(percent));
    document.querySelectorAll('.ops-step-list li').forEach((step, index) => {
      if (index === active) step.setAttribute('aria-current', 'step'); else step.removeAttribute('aria-current');
      step.dataset.complete = String(index < active || confirmed);
    });
  }
  function lock(value) { busy = value; fields.forEach(el => { el.disabled = value; }); submit.disabled = value || confirmed; form.setAttribute('aria-busy', String(value)); }
  function updateMachine() {
    const option = machine.selectedOptions[0];
    text($('#machine-name'), option.dataset.en, option.dataset.zh);
    const shifts = { 'line-a': ['Morning shift · 07:30–15:30', '早班 · 07:30–15:30'], 'line-b': ['Afternoon shift · 15:30–23:30', '中班 · 15:30–23:30'], 'line-c': ['Night shift · 23:30–07:30', '晚班 · 23:30–07:30'] };
    text($('#machine-detail'), ...shifts[machine.value]);
  }
  function edit() {
    if (busy) return;
    confirmed = false; submit.disabled = false;
    [quantity, batch].forEach(el => el.removeAttribute('aria-invalid'));
    updateMachine(); state('Ready', '待开始', 0, 0);
    feedback('Ready to validate. Data stays in this page until you refresh.', '可以开始校验。数据仅保留在本页，刷新后清空。');
  }
  function validate() {
    const amount = Number(quantity.value), reference = batch.value.trim();
    [quantity, batch].forEach(el => el.removeAttribute('aria-invalid'));
    let invalid;
    if (!quantity.value || !Number.isInteger(amount) || amount < 1 || amount > 9999) {
      invalid = quantity; feedback('Enter a whole number from 1 to 9,999.', '请输入 1 到 9,999 的整数数量。', 'error');
    } else if (reference && !/^[A-Za-z0-9-]{4,24}$/.test(reference)) {
      invalid = batch; feedback('Use 4–24 letters, digits or hyphens for the batch reference.', '批次编号请使用 4–24 位英文字母、数字或连字符。', 'error');
    }
    if (invalid) { invalid.setAttribute('aria-invalid', 'true'); invalid.focus(); return null; }
    return { machineEn: machine.selectedOptions[0].dataset.en, machineZh: machine.selectedOptions[0].dataset.zh, amount, reference: reference || `DEMO-BATCH-${String(total + 1).padStart(3, '0')}`, fail: failure.checked };
  }
  function record(snapshot) {
    total += 1;
    const article = document.createElement('article'); article.className = 'ops-record';
    const content = document.createElement('div'), title = document.createElement('strong'), detail = document.createElement('span'), mark = document.createElement('em');
    title.textContent = snapshot.reference;
    text(detail, `${snapshot.machineEn} · ${snapshot.amount} units`, `${snapshot.machineZh} · ${snapshot.amount} 件`);
    text(mark, 'confirmed', '已确认'); content.append(title, detail); article.append(content, mark);
    $('#record-list').prepend(article);
    if ($('#record-list').children.length > 8) $('#record-list').lastElementChild.remove();
    $('#record-count').textContent = String(total); $('#record-empty').hidden = true;
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || confirmed) return;
    const snapshot = validate(); if (!snapshot) return;
    const run = ++generation;
    lock(true); state('Validating', '正在校验', 1, 25, 'working');
    feedback('Checking the frozen input snapshot…', '正在检查本次提交的输入快照……', 'working');
    await wait(400); if (run !== generation) return;
    state('Submitting', '正在提交', 2, 65, 'working'); feedback('Waiting for a simulated acknowledgement…', '正在等待模拟确认……', 'working');
    await wait(650); if (run !== generation) return;
    if (snapshot.fail) {
      failure.checked = false; lock(false); state('Retry needed', '需要重试', 2, 65, 'error');
      feedback('Simulated request failed; no record was written. Your input is preserved. Submit again to retry.', '模拟请求失败，未写入记录。输入已保留，可再次提交重试。', 'error'); submit.focus(); return;
    }
    confirmed = true; record(snapshot); lock(false); state('Confirmed', '已确认', 3, 100, 'success');
    feedback('Report confirmed once. Edit an input or reset before creating another report.', '报工已确认一次。修改输入或重置后才能创建下一条报工。', 'success'); $('#reset-report').focus();
  });
  function reset() {
    generation += 1; confirmed = false; form.reset(); lock(false);
    [quantity, batch].forEach(el => el.removeAttribute('aria-invalid'));
    updateMachine(); state('Ready', '待开始', 0, 0);
    feedback('Form reset; confirmed history remains until refresh. Pending work was cancelled.', '表单已重置，已确认记录保留至刷新；尚未完成的提交已取消。');
  }
  $('#reset-report').addEventListener('click', reset);
  $('#sample-report').addEventListener('click', () => { reset(); quantity.value = '1200'; batch.value = 'DEMO-BATCH-028'; edit(); quantity.focus(); });
  $('#scan-button').addEventListener('click', () => { batch.value = 'DEMO-BATCH-028'; edit(); feedback('Synthetic scan filled a demo reference; no camera is used.', '已填入合成扫码编号，不调用摄像头。'); batch.focus(); });
  [machine, quantity, batch, failure].forEach(el => el.addEventListener('input', edit));
  updateMachine();
})();
