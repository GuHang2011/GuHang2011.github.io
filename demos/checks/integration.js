async page => {
  const base='http://127.0.0.1:8777';
  const checks=[], scans=[];
  const ok=(value,label)=>{if(!value)throw new Error(label);checks.push(label);};
  await page.goto(base+'/#demos'); await page.setViewportSize({width:1280,height:900});
  await page.locator('[data-language="zh"]').click();
  ok(await page.locator('#demos .demo-entry').count()===8,'Homepage has eight demo entries');
  ok(await page.locator('.project-item:visible').count()===6,'Six selected projects remain visible');
  ok((await page.locator('#demo-production-workbench h3').textContent())==='生产报工工作台','New card Chinese copy is intact');
  for(const slug of ['production-workbench','telecom-service']){
    const img=page.locator('#demo-'+slug+' img'); await img.scrollIntoViewIfNeeded(); await img.evaluate(i=>i.decode());
    ok(await img.evaluate(i=>i.naturalWidth===1280),'New '+slug+' cover decodes');
  }
  await page.addScriptTag({path:'output/frontend-audit/node_modules/axe-core/axe.min.js'});
  for(const theme of ['light','dark']){
    await page.locator('[data-reader-toggle]').click();await page.locator('button[data-reader-theme="'+theme+'"]').click();await page.keyboard.press('Escape');
    await page.waitForFunction(()=>!document.documentElement.classList.contains('theme-changing') && !document.getAnimations().some(a=>a instanceof CSSTransition && a.playState==='running'));
    const violations=await page.evaluate(async()=>(await axe.run(document.querySelector('#demos'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
    scans.push({theme,violations});if(violations.length)throw new Error(JSON.stringify({theme,violations}));ok(violations.length===0,'Homepage demo section accessibility: '+theme);
  }
  await page.setViewportSize({width:390,height:844});await page.locator('#demo-production-workbench').scrollIntoViewIfNeeded();
  ok(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth),'Homepage new cards fit mobile');
  await page.screenshot({path:'output/playwright/ops-home-cards-mobile.png'});
  await page.locator('[data-reader-toggle]').click();await page.locator('button[data-reader-theme="light"]').click();await page.keyboard.press('Escape');
  await page.setViewportSize({width:1280,height:900}); await page.locator('#demo-production-workbench').scrollIntoViewIfNeeded();
  await page.screenshot({path:'output/playwright/ops-home-cards-desktop.png'});
  await page.goto(base+'/demos/');
  ok(await page.locator('.demo-entry').count()===8,'Demo gallery agrees with homepage count');
  await page.locator('a.demo-image[href="telecom-service/"]').click();
  ok(page.url().endsWith('/demos/telecom-service/'),'Gallery link reaches telecom');
  await page.setViewportSize({width:390,height:844});
  await page.locator('.menu-toggle img').evaluate(i=>i.decode());
  ok(await page.locator('.menu-toggle img').evaluate(i=>i.naturalWidth>0),'Mobile menu SVG decodes with correct content type');
  await page.locator('.menu-toggle').click();await page.keyboard.press('Escape');
  ok(await page.locator('.menu-toggle').getAttribute('aria-expanded')==='false','Mobile menu Escape works');
  await page.locator('#sample-customer').click();await page.locator('#service-next').click();
  await page.waitForFunction(()=>document.querySelector('.telecom-step[data-step="1"]').dataset.active==='true');
  ok(await page.locator('#sample-customer').isHidden(),'Sample loader cannot mutate a reviewed order');
  await page.locator('input[value="new"]').focus();await page.keyboard.press('ArrowRight');
  ok(await page.locator('input[value="suspend"]').isChecked(),'Service radios support arrow keys');
  await page.keyboard.press('ArrowRight'); await page.locator('#service-address').fill('Demo Avenue 28'); await page.locator('#service-next').click();
  await page.setViewportSize({width:1280,height:900});await page.locator('[data-language="en"]').click();
  await page.locator('#desk').screenshot({path:'output/playwright/ops-telecom-service.png',animations:'disabled'});
  await page.setViewportSize({width:390,height:844});await page.locator('[data-language="zh"]').click();await page.locator('#desk').scrollIntoViewIfNeeded();
  await page.screenshot({path:'output/playwright/ops-telecom-mobile.png'});
  await page.goto(base+'/demos/production-workbench/');await page.locator('#quantity').fill('10000');await page.locator('#submit-report').click();
  ok(await page.locator('#quantity').getAttribute('aria-invalid')==='true','Production upper quantity bound enforced');
  await page.locator('#workbench').scrollIntoViewIfNeeded();await page.screenshot({path:'output/playwright/ops-production-mobile.png'});
  const browser=page.context().browser();
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const fallback=await nojs.newPage();
  for(const slug of ['production-workbench','telecom-service']){
    await fallback.goto(base+'/demos/'+slug+'/');
    ok(await fallback.locator('#method').isVisible() && await fallback.locator('.ops-workbench').isHidden(),'No-JS method and explanation: '+slug);
  }
  await nojs.close();
  for(const slug of ['production-workbench','telecom-service']){
    let releaseScript;
    const scriptGate=new Promise(resolve=>{releaseScript=resolve;});
    const pattern=base+'/demos/'+slug+'/app.js*';
    await page.route(pattern,async route=>{await scriptGate;await route.continue();});
    await page.goto(base+'/demos/'+slug+'/',{waitUntil:'commit'});
    const sample=page.locator(slug==='production-workbench'?'#sample-report':'#sample-customer');
    await sample.waitFor({state:'visible'});
    ok(await sample.isDisabled(),'Pending script keeps controls disabled: '+slug);
    releaseScript();
    await page.waitForFunction(()=>document.querySelector('.ops-workbench').dataset.ready==='true');
    ok(await sample.isEnabled(),'Loaded script enables controls: '+slug);
    await page.unroute(pattern);
  }
  return {checks,scans};
}
