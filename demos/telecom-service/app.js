"use strict";
(() => {
  const $ = selector => document.querySelector(selector);
  const form = $('#service-form'), panels = [...form.querySelectorAll('.telecom-step')];
  const name = $('#customer-name'), phone = $('#customer-phone'), address = $('#service-address');
  const back = $('#service-back'), next = $('#service-next'), submit = $('#service-submit');
  const conflict = $('#simulate-conflict'), alertBox = $('#telecom-alert');
  const radios = [...form.querySelectorAll('input[name=service]')];
  const zh = () => document.documentElement.lang.startsWith('zh');
  const text = (el, en, cn) => { el.dataset.en = en; el.dataset.zh = cn; el.textContent = zh() ? cn : en; };
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const types = { new: ['New fixed-line service', '新装固网业务'], suspend: ['Suspend fixed-line service', '固网停机业务'], move: ['Move fixed-line service', '固网移机业务'] };
  let current = 0, generation = 0, busy = false, done = false, needsReview = false;
  const service = () => radios.find(el => el.checked).value;
  function feedback(en, cn, tone = 'neutral') { text($('#service-feedback'), en, cn); $('#service-feedback').dataset.tone = tone; }
  function status(en, cn, tone = 'neutral') { text($('#service-status'), en, cn); $('#service-status').dataset.tone = tone; }
  function controls() {
    [name, phone, address, conflict, ...radios, $('#lookup-customer'), $('#sample-customer')].forEach(el => { el.disabled = busy || done; });
    back.disabled = current === 0 || busy || done;
    next.hidden = current === 3; next.disabled = busy || done || needsReview;
    submit.hidden = current !== 3; submit.disabled = busy || done;
    $('#sample-customer').hidden = current !== 0;
    form.setAttribute('aria-busy', String(busy)); $('.ops-workbench').dataset.busy = String(busy);
  }
  function setStep(step, focus = true) {
    current = step;
    panels.forEach((panel, index) => { panel.dataset.active = String(index === step); panel.hidden = index !== step; });
    document.querySelectorAll('.ops-step-list li').forEach((el, i) => {
      if (i === step) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current');
      el.dataset.complete = String(i < step || done);
    });
    const value = done ? 100 : [0, 25, 50, 75][step];
    $('#service-progress-bar').style.width = `${value}%`; $('#service-progress-label').textContent = `${value}%`;
    $('.ops-progress-track').setAttribute('aria-valuenow', String(value));
    controls();
    if (focus) panels[step].querySelector('h3').focus();
  }
  function invalid(el, en, cn) { el.setAttribute('aria-invalid', 'true'); feedback(en, cn, 'error'); el.focus(); return false; }
  function customerValid() {
    [name, phone].forEach(el => el.removeAttribute('aria-invalid'));
    if (name.value.trim().length < 2) return invalid(name, 'Enter at least two characters for a fictional customer name.', '请填写至少两个字符的虚构客户姓名。');
    if (!/^1\d{10}$/.test(phone.value.trim())) return invalid(phone, 'Enter an 11-digit demo number beginning with 1.', '请输入以 1 开头的 11 位演示号码。');
    return true;
  }
  function serviceValid() {
    address.removeAttribute('aria-invalid');
    if (service() !== 'suspend' && address.value.trim().length < 5) return invalid(address, 'New install and move line need an address of at least five characters.', '新装和移机需要至少五个字符的合成地址。');
    return true;
  }
  function summary() {
    text($('#service-label'), ...types[service()]);
    $('#address-field').hidden = service() === 'suspend';
    $('#summary-customer').textContent = `${name.value.trim()} · ${phone.value.trim()}`;
    text($('#summary-service'), ...types[service()]);
    if (service() === 'suspend') text($('#summary-address'), 'Not required', '无需填写');
    else { $('#summary-address').removeAttribute('data-en'); $('#summary-address').removeAttribute('data-zh'); $('#summary-address').textContent = address.value.trim(); }
  }
  async function lookup() {
    if (busy || done || current !== 0 || !customerValid()) return;
    const run = ++generation; busy = true; controls(); status('Looking up', '正在查询', 'working');
    feedback('Checking a local fictional account…', '正在检查本地虚构账户……', 'working');
    await wait(500); if (run !== generation) return;
    busy = false; setStep(1); status('Choose service', '选择业务');
    feedback('Demo account found. Select a service.', '已找到演示账户，请选择业务。', 'success');
  }
  function advance() {
    if (busy || done || needsReview) return;
    if (current === 0) { lookup(); return; }
    if (current === 1) { if (!serviceValid()) return; summary(); setStep(2); status('Review order', '复核订单'); feedback('Check the generated summary before continuing.', '请复核生成的订单摘要后再继续。'); return; }
    if (current === 2) { setStep(3); status('Ready to submit', '准备提交'); feedback('Submit to request a simulated acknowledgement.', '点击提交以请求模拟确认。'); }
  }
  async function commit() {
    if (busy || done || current !== 3 || !customerValid() || !serviceValid()) return;
    const run = ++generation;
    const snapshot = { name: name.value.trim(), type: service(), conflict: conflict.checked };
    busy = true; controls(); status('Submitting', '正在提交', 'working');
    feedback('Checking for duplicate demo orders…', '正在检查重复的演示订单……', 'working');
    await wait(800); if (run !== generation) return;
    busy = false;
    if (snapshot.conflict) {
      needsReview = true; alertBox.dataset.visible = 'true'; $('#resolve-conflict').hidden = false; setStep(2);
      status('Conflict', '存在冲突', 'error');
      text(alertBox, 'A duplicate was simulated; no order was accepted. Review the summary and clear this simulated conflict before retrying.', '已模拟重复订单，未受理订单。请复核摘要，并先解除本次模拟冲突再重试。');
      feedback('Returned to review. Resolve the simulated conflict to continue.', '已返回复核步骤，请解除本次模拟冲突后继续。', 'error'); return;
    }
    done = true; setStep(3); status('Confirmed', '已确认', 'success');
    $('#telecom-receipt').dataset.visible = 'true';
    text($('#receipt-copy'), `ORD-SYN-042 · ${snapshot.name} · ${types[snapshot.type][0]}. Local demo receipt; no real service was changed.`, `ORD-SYN-042 · ${snapshot.name} · ${types[snapshot.type][1]}。本地演示回执，未变更真实业务。`);
    feedback('Confirmed once. Use New request to start again.', '已确认一次。点击“新建请求”可重新体验。', 'success'); $('#service-reset').focus();
  }
  function reset() {
    generation += 1; busy = false; done = false; needsReview = false; form.reset();
    [name, phone, address].forEach(el => el.removeAttribute('aria-invalid'));
    alertBox.dataset.visible = 'false'; $('#resolve-conflict').hidden = true; $('#telecom-receipt').dataset.visible = 'false';
    summary(); setStep(0, false); status('Draft', '草稿'); feedback('Enter fictional details or load the sample. Pending work is cancelled.', '输入虚构信息或载入示例；尚未完成的请求已取消。'); name.focus();
  }
  $('#lookup-customer').addEventListener('click', lookup);
  $('#sample-customer').addEventListener('click', () => { name.value = 'Demo Lin'; phone.value = '13800004200'; address.value = 'Demo Road 42, Unit 3'; feedback('Sample loaded. Continue to look up the demo account.', '示例已载入，继续以查询演示账户。'); name.focus(); });
  $('#service-reset').addEventListener('click', reset);
  $('#resolve-conflict').addEventListener('click', () => { needsReview = false; conflict.checked = false; alertBox.dataset.visible = 'false'; $('#resolve-conflict').hidden = true; controls(); status('Reviewed', '已复核'); feedback('Simulated conflict cleared. Continue and submit again.', '本次模拟冲突已解除，请继续并再次提交。'); next.focus(); });
  radios.forEach(el => el.addEventListener('change', summary));
  next.addEventListener('click', advance);
  back.addEventListener('click', () => { if (busy || done) return; needsReview = false; alertBox.dataset.visible = 'false'; $('#resolve-conflict').hidden = true; setStep(current - 1); status('Editing', '正在修改'); feedback('Revise this step, then continue.', '修改当前步骤后继续。'); });
  submit.addEventListener('click', commit);
  form.addEventListener('submit', event => { event.preventDefault(); current === 3 ? commit() : advance(); });
  summary(); setStep(0, false);
})();
