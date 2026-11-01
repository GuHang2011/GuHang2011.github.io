async (page) => {
  const base='http://127.0.0.1:8778';
  const report={checks:[],layouts:[],accessibility:[],errors:[]};
  const check=(name,ok,detail=null)=>report.checks.push({name,ok,detail});
  const onError=error=>report.errors.push(error.message);
  page.on('pageerror',onError);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base+'/?qa='+Date.now()+'#demos');
  await page.locator('#demos').evaluate(el=>el.scrollIntoView({behavior:'instant',block:'start'}));
  await page.waitForFunction(()=>document.body.dataset.demoReading==='true');
  check('Three featured projects',await page.locator('.experience-card:visible').count()===3);
  check('All ten demos remain in HTML',await page.locator('.experience-card').count()===10);
  check('Idle film launcher does not obscure cards',await page.locator('.floating-cinema').evaluate(el=>getComputedStyle(el).visibility==='hidden'));

  const counts={featured:3,engineering:4,data:5,creative:1};
  const covered=new Set();
  for(const lang of ['zh','en']) {
    await page.locator(`[data-language="${lang}"]`).click();
    for(const [filter,count] of Object.entries(counts)) {
      await page.locator(`[data-demo-filter="${filter}"]`).click();
      const visible=page.locator('.experience-card:visible');
      check(`${lang} ${filter} filter`,await visible.count()===count);
      check(`${lang} ${filter} pressed state`,await page.locator('[data-demo-filter][aria-pressed="true"]').count()===1);
      for(const id of await visible.evaluateAll(els=>els.map(el=>el.id)))covered.add(id);
      for(const width of [1920,1440,768,390,320]) {
        await page.setViewportSize({width,height:900});
        const layout=await page.locator('#demos').evaluate(el=>({width:innerWidth,page:document.documentElement.scrollWidth,overflows:[...el.querySelectorAll('.experience-card:not([hidden]),.experience-filters,.experience-heading')].filter(e=>e.getBoundingClientRect().right>innerWidth+1||e.scrollWidth>e.clientWidth+1).map(e=>e.className)}));
        report.layouts.push({lang,filter,...layout});
      }
    }
  }
  check('Every demo is discoverable in a category',covered.size===10);
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('[data-demo-filter="engineering"]').focus();
  await page.keyboard.press('Enter');
  check('Keyboard activates category',await page.locator('.experience-card:visible').count()===4);
  check('Category focus remains after filtering',await page.locator('[data-demo-filter="engineering"]').evaluate(el=>el===document.activeElement));
  check('Reduced motion disables filter animation',await page.locator('.experience-card:visible').first().evaluate(el=>getComputedStyle(el).animationName==='none'));
  check('Descriptions are at least 15px',await page.locator('.experience-description').first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize)>=15));
  check('Controls have at least 44px targets',await page.locator('#demos .experience-actions a,#demos .experience-filters button').evaluateAll(els=>els.filter(el=>el.getClientRects().length).every(el=>el.getBoundingClientRect().height>=44)));
  await page.locator('.experience-film').click();
  check('Inline film entry opens player',await page.locator('[data-cinema-panel]').isVisible());
  check('Inline film entry references existing panel',await page.locator('.experience-film').evaluate(el=>!!document.getElementById(el.getAttribute('aria-controls'))));
  await page.locator('[data-cinema-panel] [data-cinema-dismiss]').click();
  check('Closing film returns focus to inline entry',await page.locator('.experience-film').evaluate(el=>el===document.activeElement));
  await page.goto(base+'/#demo-telecom-service');
  check('Existing deep link reveals nonfeatured project',await page.locator('#demo-telecom-service').isVisible());
  check('Deep link chooses engineering category',await page.locator('[data-demo-filter="engineering"]').getAttribute('aria-pressed')==='true');

  await page.addScriptTag({path:'output/frontend-audit/node_modules/axe-core/axe.min.js'});
  for(const theme of ['light','dark']) {
    await page.locator('[data-reader-toggle]').click();
    await page.locator(`button[data-reader-theme="${theme}"]`).click();
    await page.keyboard.press('Escape');
    for(const lang of ['zh','en']) {
      await page.locator(`[data-language="${lang}"]`).click();
      for(const filter of Object.keys(counts)) {
        await page.locator(`[data-demo-filter="${filter}"]`).click();
        const violations=await page.evaluate(async()=>(await axe.run('#demos',{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})));
        report.accessibility.push({theme,lang,filter,violations});
      }
    }
    await page.locator('[data-demo-filter="featured"]').click();
    await page.locator('[data-language="zh"]').click();
    await page.locator('#demos').evaluate(el=>el.scrollIntoView({behavior:'instant',block:'start'}));
    await page.screenshot({path:`output/playwright/demo-gallery-${theme}.png`});
  }
  const broken=await page.locator('#demos img').evaluateAll(els=>els.filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src));
  check('All demo previews load',!broken.length,broken);
  const paths=await page.locator('.experience-start,.experience-directory').evaluateAll(els=>[...new Set(els.map(e=>e.href))]);
  for(const url of paths) {const response=await page.request.get(url);check('Destination '+new URL(url).pathname,response.ok());}
  await page.locator('[data-reader-toggle]').click();
  await page.locator('button[data-reader-theme="light"]').click();
  await page.keyboard.press('Escape');
  await page.setViewportSize({width:390,height:844});
  await page.locator('#demos').evaluate(el=>el.scrollIntoView({behavior:'instant',block:'start'}));
  await page.screenshot({path:'output/playwright/demo-gallery-mobile-tested.png'});
  const noJs=await page.context().browser().newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const plain=await noJs.newPage();
  await plain.goto(base+'/#demos');
  check('Without JavaScript all ten demos remain visible',await plain.locator('.experience-card:visible').count()===10);
  check('Without JavaScript inactive filter controls stay hidden',!await plain.locator('[data-demo-toolbar]').isVisible());
  await noJs.close();
  page.off('pageerror',onError);
  report.passed=report.checks.filter(c=>c.ok).length;
  report.failed=report.checks.filter(c=>!c.ok);
  return report;
}
