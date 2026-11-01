async(page)=>{
  const base='http://127.0.0.1:8778';
  const report={checks:[],layouts:[],accessibility:[],errors:[]};
  const check=(name,ok,detail=null)=>report.checks.push({name,ok,detail});
  const onError=e=>report.errors.push(e.message);page.on('pageerror',onError);
  await page.setViewportSize({width:1440,height:1000});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(base+'/?qa=decisions-'+Date.now()+'#highlights');
  const carousel=page.locator('[data-highlight-carousel]');
  await page.locator('.decision-disclosure').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.waitForFunction(()=>document.body.dataset.highlightReading==='true');
  check('Direct section link expands disclosure',await page.locator('.decision-disclosure').getAttribute('open')!==null);
  check('One visible panel',await page.locator('[data-highlight-slide]:visible').count()===1);
  check('Autoplay starts paused',await carousel.getAttribute('data-rotation')==='paused');
  check('Reduced motion disables autoplay',await page.locator('[data-highlight-rotation]').isDisabled());
  check('Idle floating cinema leaves controls unobscured',await page.locator('.floating-cinema').evaluate(el=>getComputedStyle(el).visibility==='hidden'));
  const keys=['research','delivery','data','review'];
  for(const lang of ['zh','en']) {
    await page.locator(`[data-language="${lang}"]`).click();
    for(const key of keys){
      await page.locator('#highlight-dot-'+key).click();
      check(`${lang}: select ${key}`,await page.locator('#highlight-slide-'+key).isVisible());
      check(`${lang}: ${key} tab and panel association`,await page.locator('#highlight-slide-'+key).getAttribute('aria-labelledby')==='highlight-dot-'+key);
      for(const width of [1920,1440,768,390,320]) {
        await page.setViewportSize({width,height:1000});
        const layout=await page.locator('.decision-disclosure').evaluate(el=>({width:innerWidth,page:document.documentElement.scrollWidth,overflows:[...el.querySelectorAll('.decision-tabs,.highlight-slide:not([hidden]),.decision-visual,.decision-playback')].filter(e=>e.getClientRects().length&&(e.scrollWidth>e.clientWidth+1||e.getBoundingClientRect().right>innerWidth+1)).map(e=>e.className)}));
        report.layouts.push({lang,key,...layout});
      }
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('#highlight-dot-research').click();
  await page.keyboard.press('ArrowRight');
  check('Arrow key selects next named tab',await page.locator('#highlight-dot-delivery').evaluate(el=>el===document.activeElement&&el.getAttribute('aria-selected')==='true'));
  await page.keyboard.press('End');
  check('End selects final tab',await page.locator('#highlight-dot-review').getAttribute('aria-selected')==='true');
  await page.keyboard.press('Home');
  check('Home selects first tab',await page.locator('#highlight-dot-research').getAttribute('aria-selected')==='true');
  await page.keyboard.press('Tab');
  check('Tab enters the active panel',await page.locator('#highlight-slide-research').evaluate(el=>el===document.activeElement));
  check('Inactive panels cannot receive focus',await page.locator('[data-highlight-slide]:not(.is-active)').evaluateAll(els=>els.every(el=>el.hidden&&el.inert)));
  check('Selected title is announced',await page.locator('[data-highlight-status]').textContent().then(t=>t.includes('Revisit the training evidence')));
  check('Announcement is visually hidden',await page.locator('[data-highlight-status]').evaluate(el=>el.getBoundingClientRect().width===1));
  await page.locator('[data-highlight-prev]').click();
  check('Previous wraps from first to last',await page.locator('#highlight-slide-review').isVisible());
  await page.locator('[data-highlight-next]').click();
  check('Next wraps from last to first',await page.locator('#highlight-slide-research').isVisible());
  const description=page.locator('#highlight-slide-research .decision-description');
  await description.dispatchEvent('pointerdown',{pointerType:'touch',pointerId:41,clientX:250,clientY:150});
  await description.dispatchEvent('pointerup',{pointerType:'touch',pointerId:41,clientX:150,clientY:150});
  check('Horizontal touch swipe changes panel',await page.locator('#highlight-slide-delivery').isVisible());
  await carousel.dispatchEvent('pointerdown',{pointerType:'touch',pointerId:42,clientX:200,clientY:100});
  await carousel.dispatchEvent('pointerup',{pointerType:'touch',pointerId:42,clientX:195,clientY:250});
  check('Vertical touch scroll does not change panel',await page.locator('#highlight-slide-delivery').isVisible());
  await page.goto(base+'/?qa=deep-link#highlight-slide-review');
  check('Direct slide link opens requested slide',await page.locator('#highlight-slide-review').isVisible());
  await page.locator('[data-language="zh"]').click();
  check('Language switch preserves selected slide',await page.locator('#highlight-slide-review').isVisible());
  check('Chinese title uses a sans-serif font',await page.locator('#highlight-title-review').evaluate(el=>getComputedStyle(el).fontFamily.includes('Microsoft YaHei')&&!getComputedStyle(el).fontFamily.includes('Georgia')));

  await page.addScriptTag({path:'output/frontend-audit/node_modules/axe-core/axe.min.js'});
  for(const theme of ['light','dark']){
    await page.locator('[data-reader-toggle]').click();await page.locator(`button[data-reader-theme="${theme}"]`).click();await page.keyboard.press('Escape');
    for(const lang of ['zh','en']){
      await page.locator(`[data-language="${lang}"]`).click();
      for(const key of keys){
        await page.locator('#highlight-dot-'+key).click();
        const violations=await page.evaluate(async()=>(await axe.run('.decision-disclosure',{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})));
        report.accessibility.push({theme,lang,key,violations});
      }
    }
    await page.locator('[data-language="zh"]').click();
    await page.locator('.decision-disclosure').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
    await page.screenshot({path:`output/playwright/highlight-${theme}-tested.png`});
  }
  await page.locator('[data-reader-toggle]').click();await page.locator('button[data-reader-theme="light"]').click();await page.keyboard.press('Escape');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.locator('.decision-disclosure').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.locator('#highlight-dot-research').click();
  check('Transition enabled with normal motion',await page.locator('#highlight-slide-research .highlight-copy').evaluate(el=>getComputedStyle(el).animationName==='decision-enter'));
  await page.locator('[data-highlight-rotation]').click();
  await page.locator('[data-reader-toggle]').focus();await page.mouse.move(3,3);
  await page.waitForFunction(()=>document.querySelector('[data-highlight-carousel]').dataset.rotation==='running');
  await page.waitForFunction(()=>document.querySelector('[data-highlight-carousel]').dataset.highlightCurrent==='2',null,{timeout:10000});
  check('Opt-in autoplay advances slide',await page.locator('#highlight-slide-delivery').isVisible());
  await page.locator('#highlight-slide-delivery').hover();
  check('Hover pauses autoplay',await carousel.getAttribute('data-rotation')==='paused');
  await page.locator('#highlight-dot-data').click();await page.mouse.move(3,3);await page.locator('[data-reader-toggle]').focus();
  check('Manual selection pauses autoplay',await carousel.getAttribute('data-rotation')==='paused');
  await page.locator('.decision-disclosure > summary').click();
  check('Disclosure closes cleanly',!await carousel.isVisible());
  await page.locator('.decision-disclosure > summary').click();
  check('Reopening retains selection',await page.locator('#highlight-slide-data').isVisible());
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:390,height:844});
  await page.locator('.decision-disclosure').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.screenshot({path:'output/playwright/highlight-mobile-tested.png'});
  const context=await page.context().browser().newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const plain=await context.newPage();await plain.goto(base+'/',{waitUntil:'domcontentloaded'});await plain.locator('.decision-disclosure > summary').click();
  check('All four examples readable without JavaScript',await plain.locator('[data-highlight-slide]:visible').count()===4);
  check('Inactive controls hidden without JavaScript',await plain.locator('[data-highlight-controls]:visible').count()===0);
  await context.close();page.off('pageerror',onError);
  report.passed=report.checks.filter(x=>x.ok).length;report.failed=report.checks.filter(x=>!x.ok);return report;
}
