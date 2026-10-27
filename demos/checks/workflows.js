async page => {
  const base = 'http://127.0.0.1:8777';
  const report = { checks: [], layouts: [], accessibility: [], errors: [] };
  const assert = (condition, label) => { if (!condition) throw new Error(label); report.checks.push(label); };
  const stage = n => page.waitForFunction(n => document.querySelector(`.telecom-step[data-step="${n}"]`).dataset.active === 'true', n);
  const busy = id => page.waitForFunction(id => document.querySelector(id).getAttribute('aria-busy') !== 'true', id);
  page.on('pageerror', error => report.errors.push(error.message));
  async function scan(label) {
    await page.addScriptTag({path:'output/frontend-audit/node_modules/axe-core/axe.min.js'});
    await page.waitForFunction(()=>!document.getAnimations().some(a=>a.playState==='running' && a.effect?.getTiming().iterations!==Infinity));
    const violations = await page.evaluate(async () => (await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
    report.accessibility.push({label, violations});
    if (violations.length) throw new Error(JSON.stringify({label,violations}));
  }
  async function layouts(label) {
    for (const lang of ['en','zh']) {
      await page.locator(`[data-language="${lang}"]`).click();
      for (const width of [320,390,768,1280]) {
        await page.setViewportSize({width,height:900});
        const size=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
        if (size.scroll>size.width) throw new Error(`${label} ${lang} overflow ${JSON.stringify(size)}`);
        report.layouts.push({label,lang,...size});
      }
    }
    await page.locator('[data-language="en"]').click();
  }
  await page.setViewportSize({width:1280,height:900});
  await page.goto(base+'/demos/production-workbench/');
  await page.locator('[data-language="en"]').click();
  await page.locator('#submit-report').click();
  assert(await page.locator('#quantity').getAttribute('aria-invalid')==='true','Production: empty quantity rejected');
  await page.locator('#quantity').fill('1.5'); await page.locator('#submit-report').click();
  assert(await page.locator('#record-count').textContent()==='0','Production: fractional quantity creates no record');
  await page.locator('#sample-report').click();
  await page.locator('#batch-id').fill('<script>alert(1)</script>'); await page.locator('#submit-report').click();
  assert(await page.locator('#batch-id').getAttribute('aria-invalid')==='true','Production: unsafe reference rejected');
  await page.locator('#scan-button').click();
  assert(await page.locator('#batch-id').inputValue()==='DEMO-BATCH-028','Production: scan fills reference');
  await page.locator('#simulate-failure').check(); await page.locator('#submit-report').click();
  assert(await page.locator('#quantity').isDisabled() && await page.locator('#machine-select').isDisabled(),'Production: submitted inputs are locked');
  await busy('#report-form');
  assert(await page.locator('#report-status').textContent()==='Retry needed' && await page.locator('#record-count').textContent()==='0','Production: failed request writes no record');
  await page.locator('[data-language="zh"]').click();
  assert(await page.locator('#report-status').textContent()==='需要重试','Production: error status survives language switch');
  await page.locator('#submit-report').click(); await busy('#report-form');
  assert(await page.locator('#record-count').textContent()==='1' && await page.locator('#submit-report').isDisabled(),'Production: retry confirms once');
  await page.locator('[data-language="en"]').click();
  assert(await page.locator('#report-status').textContent()==='Confirmed' && (await page.locator('#record-list').textContent()).includes('1200 units'),'Production: record and success state translate together');
  await page.locator('#report-form').evaluate(form=>{form.requestSubmit();form.requestSubmit();});
  assert(await page.locator('#record-count').textContent()==='1','Production: repeated submit is ignored after confirmation');
  await layouts('Production confirmed'); await scan('Production desktop');
  await page.locator('#workbench').screenshot({path:'output/playwright/ops-production-workbench.png',animations:'disabled'});
  await page.locator('#sample-report').click(); await page.locator('#submit-report').click(); await page.locator('#reset-report').click();
  await page.waitForTimeout(1200);
  assert(await page.locator('#record-count').textContent()==='1' && await page.locator('#report-status').textContent()==='Ready','Production: reset cancels pending completion');
  await page.locator('#machine-select').selectOption('line-b'); await page.locator('[data-language="zh"]').click();
  assert((await page.locator('#machine-name').textContent()).includes('B 线'),'Production: machine state translates without reset');
  await page.setViewportSize({width:390,height:844}); await page.locator('#workbench').scrollIntoViewIfNeeded();
  await page.screenshot({path:'output/playwright/ops-production-mobile.png'});
  await page.locator('[data-ops-motion]').check();
  assert(await page.locator('html').getAttribute('data-reader-motion')==='reduce','Manual motion preference applied');
  await page.reload();
  assert(await page.locator('[data-ops-motion]').isChecked(),'Manual motion preference persists');
  assert(await page.locator('#record-count').textContent()==='0','Production: records are memory-only');

  await page.goto(base+'/demos/telecom-service/'); await page.locator('[data-language="en"]').click();
  assert(await page.locator('[data-ops-motion]').isChecked(),'Motion preference shared between demos');
  await page.locator('[data-ops-motion]').uncheck();
  await page.locator('#service-next').click();
  assert(await page.locator('#customer-name').getAttribute('aria-invalid')==='true','Telecom: missing customer blocked');
  await page.locator('#sample-customer').click(); await page.locator('#customer-phone').fill('123'); await page.locator('#lookup-customer').click();
  assert(await page.locator('#customer-phone').getAttribute('aria-invalid')==='true','Telecom: invalid phone blocked');
  await page.locator('#sample-customer').click(); await page.locator('#lookup-customer').click();
  assert(await page.locator('#customer-name').isDisabled(),'Telecom: lookup locks input');
  await stage(1);
  assert(await page.locator('#service-step-title').evaluate(el=>el===document.activeElement),'Telecom: keyboard focus follows step change');
  await page.locator('#service-address').fill(''); await page.locator('#service-next').click();
  assert(await page.locator('#service-address').getAttribute('aria-invalid')==='true','Telecom: new install requires address');
  await page.locator('input[value="suspend"]').check();
  assert(await page.locator('#address-field').isHidden(),'Telecom: suspension hides address');
  await page.locator('#service-next').click(); await stage(2);
  assert(await page.locator('#summary-address').textContent()==='Not required','Telecom: suspension summary');
  await page.locator('#service-back').click();
  await page.locator('input[value="move"]').check(); await page.locator('#service-address').fill('Demo Avenue 28, Building 1');
  await page.locator('#service-next').click(); await stage(2);
  assert((await page.locator('#summary-service').textContent()).includes('Move') && (await page.locator('#summary-address').textContent()).includes('Demo Avenue'),'Telecom: relocation summary updates');
  await page.locator('#simulate-conflict').check(); await page.locator('#service-next').click(); await stage(3);
  assert(await page.locator('.ops-progress-track').getAttribute('aria-valuenow')==='75','Telecom: progress is incomplete before acknowledgement');
  await page.locator('#service-submit').click(); await stage(2);
  assert(await page.locator('#telecom-alert').isVisible() && await page.locator('#service-next').isDisabled(),'Telecom: conflict returns to review and blocks next');
  await page.locator('[data-language="zh"]').click();
  assert(await page.locator('#service-status').textContent()==='存在冲突','Telecom: conflict survives translation');
  await page.locator('#resolve-conflict').click(); await page.locator('#service-next').click(); await page.locator('#service-submit').click(); await busy('#service-form');
  assert(await page.locator('#telecom-receipt').isVisible() && await page.locator('#service-submit').isDisabled(),'Telecom: deliberate conflict recovery confirms once');
  await page.locator('[data-language="en"]').click();
  assert(await page.locator('#service-status').textContent()==='Confirmed' && (await page.locator('#receipt-copy').textContent()).includes('Move fixed-line'),'Telecom: success state and receipt translate');
  await layouts('Telecom confirmed'); await scan('Telecom receipt');
  await page.locator('#service-reset').click(); await page.locator('#sample-customer').click(); await page.locator('#service-next').click(); await stage(1); await page.locator('#service-next').click(); await stage(2);
  await page.locator('#desk').screenshot({path:'output/playwright/ops-telecom-service.png',animations:'disabled'});
  await page.locator('[data-language="zh"]').click(); await page.setViewportSize({width:390,height:844});
  await page.locator('#desk').scrollIntoViewIfNeeded(); await page.screenshot({path:'output/playwright/ops-telecom-mobile.png'}); await scan('Telecom Chinese mobile review');
  await page.locator('#service-reset').click(); await page.locator('#sample-customer').click(); await page.locator('#lookup-customer').click(); await page.locator('#service-reset').click();
  await page.waitForTimeout(650);
  assert(await page.locator('.telecom-step[data-step="0"]').isVisible(),'Telecom: reset invalidates pending lookup');
  await page.locator('#sample-customer').click(); await page.locator('#lookup-customer').click(); await stage(1); await page.locator('#service-next').click(); await stage(2); await page.locator('#service-next').click(); await stage(3); await page.locator('#service-submit').click(); await page.locator('#service-reset').click();
  await page.waitForTimeout(1000);
  assert(await page.locator('#telecom-receipt').isHidden() && await page.locator('.telecom-step[data-step="0"]').isVisible(),'Telecom: reset invalidates pending order');
  await page.emulateMedia({reducedMotion:'reduce'});
  assert(await page.locator('[data-ops-motion]').isChecked() && await page.locator('[data-ops-motion]').isDisabled(),'System reduced motion takes priority');
  const motion = await page.locator('.ops-pulse').evaluate(el=>({animation:getComputedStyle(el,'::before').animationName,transition:getComputedStyle(document.querySelector('.ops-progress-track > span')).transitionDuration}));
  assert(motion.animation==='none' && motion.transition==='0s','Reduced motion removes pulse and progress animation');
  await page.emulateMedia({reducedMotion:'no-preference'});
  assert(report.errors.length===0,'No JavaScript exceptions in either demo');
  return report;
}
