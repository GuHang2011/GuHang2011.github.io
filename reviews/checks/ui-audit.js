// Run with Playwright CLI's run-code command against the local site preview.
async page => {
  const base='http://127.0.0.1:8778';
  const report={checks:[],layouts:[],accessibility:[],errors:[]};
  const check=(name,ok,detail=null)=>report.checks.push({name,ok,detail});
  const onError=e=>report.errors.push(e.message);page.on('pageerror',onError);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base+'/?qa=ui-audit');
  const theme=async name=>{
    await page.locator('[data-reader-toggle]').click();
    await page.locator(`button[data-reader-theme="${name}"]`).click();
    await page.keyboard.press('Escape');
  };
  const scan=async name=>{
    if(!await page.evaluate(()=>!!window.axe))await page.addScriptTag({path:'output/frontend-audit/node_modules/axe-core/axe.min.js'});
    const violations=await page.evaluate(async()=>(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,reason:n.failureSummary}))})));
    report.accessibility.push({name,violations});
  };
  for(const lang of ['zh','en']){
    await page.locator(`[data-language="${lang}"]`).click();
    for(const palette of ['light','dark']){
      await theme(palette);
      for(const width of [320,390,768,1024,1440,1920]){
        await page.setViewportSize({width,height:1000});
        // Include expanded supplementary sections and all projects in layout checks.
        await page.locator('details').evaluateAll(els=>els.forEach(e=>e.open=true));
        if(await page.locator('[data-project-expand]').getAttribute('aria-expanded')==='false')await page.locator('[data-project-expand]').click();
        const layout=await page.evaluate(()=>{
          const selectors='.header-inner,.about-grid,.project-toolbar,.project-list,.project-body,.research-context,.pub-body,.learning-desk,.learning-feature,.learning-entry,.profile-background,.skills-grid,.portfolio-contact,.footer-inner,.decision-tabs,.experience-grid,.engineering-grid,.advisor-scan-grid';
          return {width:innerWidth,page:document.documentElement.scrollWidth,overflows:[...document.querySelectorAll(selectors)].filter(e=>e.checkVisibility()&&(e.scrollWidth>e.clientWidth+1||e.getBoundingClientRect().right>innerWidth+1)).map(e=>({class:e.className,width:e.clientWidth,scroll:e.scrollWidth}))};
        });
        report.layouts.push({lang,palette,...layout});
        if([320,390,1440].includes(width)){
          await scan(`${lang}/${palette}/${width}/expanded`);
          await page.locator('#notebook').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
          await page.screenshot({path:`output/playwright/ui-verified-notebook-${lang}-${palette}-${width}.png`});
        }
      }
    }
  }
  await theme('light');
  await page.locator('[data-language="zh"]').click();
  await page.goto(base+'/?qa=ui-controls#work');
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('#project-search').fill('KICP');
  check('Project search narrows cards',await page.locator('.project-item:visible').count()===1&&await page.locator('#project-kicp').isVisible());
  await page.locator('[data-clear-search]').click();
  check('Clear search restores cards',await page.locator('#project-search').inputValue()===''&&await page.locator('.project-item:visible').count()>1);
  await page.locator('[data-filter-group="projects"] [data-filter="engineering"]').click();
  check('Engineering category applied',await page.locator('[data-filter-group="projects"] [data-filter="engineering"]').getAttribute('aria-pressed')==='true');
  await page.locator('[data-filter-group="projects"] [data-filter="all"]').click();
  await page.locator('[data-project-expand]').click();
  check('Project expand exposes full collection',await page.locator('.project-item:visible').count()===await page.locator('.project-item').count());
  await page.locator('[data-project-expand]').click();
  check('Project collapse restores four featured projects',await page.locator('.project-item:visible').count()===4&&await page.locator('#project-fieldlens').isVisible());
  const trigger=page.locator('#project-shuyang [data-preview]');
  await trigger.click();
  await page.waitForFunction(()=>{const e=document.querySelector('.lightbox-image');return e.complete&&e.naturalWidth>0});
  check('Project screenshot opens',await page.locator('.lightbox').isVisible());
  await page.keyboard.press('Escape');
  check('Image close restores keyboard focus',await trigger.evaluate(e=>e===document.activeElement));
  await page.locator('[data-desk-topic="engineering"]').click();
  check('Note category filters actual entries',await page.locator('[data-desk-note]:visible').evaluateAll(els=>els.length>0&&els.every(e=>e.dataset.topic==='engineering')));
  await page.locator('[data-desk-topic="recent"]').click();
  check('Recent notes restores three entries',await page.locator('[data-desk-note]:visible').count()===3);
  await page.locator('#home-note-query').fill('上传');
  await page.locator('.home-note-search button').click();
  await page.waitForURL('**/notebook/?q=*');
  check('Note search navigates with query',new URL(page.url()).searchParams.get('q')==='上传');
  await page.goto(base+'/?qa=ui-research#research');
  await page.locator('[data-abstract-toggle]').click();
  check('All research summaries expand',await page.locator('#research details.abstract:not([open])').count()===0);
  await page.locator('[data-abstract-toggle]').click();
  check('All research summaries collapse',await page.locator('#research details.abstract[open]').count()===0);
  for(const id of ['work','demos','research','notebook','background']){
    await page.locator(`#${id}`).evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
    const offset=await page.locator(`#${id}`).evaluate(e=>({top:e.getBoundingClientRect().top,header:document.querySelector('.site-header').getBoundingClientRect().bottom}));
    check('Section clears header without duplicate offset: '+id,offset.top>=offset.header&&offset.top-offset.header<25,offset);
  }
  for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:844});
    await page.locator('#about').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
    if(await page.locator('[data-cinema-toggle]').isVisible())await page.locator('[data-cinema-toggle]').click();
    else await page.locator('[data-cinema-open]').first().click();
    const panel=page.locator('#cinema-panel');
    check('Video opens within viewport '+width,await panel.evaluate(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight}));
    check('Video waits for deliberate playback '+width,await page.locator('.cinema-screen video').evaluate(e=>e.paused));
    await page.locator('[data-cinema-next]').click();
    check('Video selector advances '+width,await page.locator('[data-cinema-select]').inputValue()!=='0');
    await page.locator('[data-cinema-minimize]').click();
    check('Minimize hides and pauses video '+width,!await panel.isVisible()&&await page.locator('.cinema-screen video').evaluate(e=>e.paused));
    if(width<600)check('Mobile launcher compact and labeled '+width,await page.locator('.cinema-launcher').evaluate(e=>e.clientWidth<=100)&&!!await page.locator('[data-cinema-toggle]').getAttribute('aria-label'));
    if(width<600)check('Mobile floating controls share bottom row '+width,await page.locator('.cinema-launcher').evaluate(e=>{const r=e.getBoundingClientRect(),b=document.querySelector('.back-top').getBoundingClientRect();return innerHeight-r.bottom<25&&r.right<b.left}));
  }
  await page.locator('.cinema-launcher [data-cinema-dismiss]').click();
  check('Video launcher can be dismissed',!await page.locator('[data-project-cinema]').isVisible());
  await page.locator('[data-cinema-open]').first().click();
  check('Page link reopens dismissed player',await page.locator('#cinema-panel').isVisible());
  await scan('mobile/player-open');
  await page.keyboard.press('Escape');
  await page.locator('.menu-toggle').click();
  check('Mobile navigation opens',await page.locator('#navigation').isVisible());
  await page.locator('#navigation a[href="#notebook"]').click();
  await page.waitForFunction(()=>document.activeElement.id==='notebook');
  check('Mobile navigation closes and focuses destination',await page.locator('.menu-toggle').getAttribute('aria-expanded')==='false');
  await page.locator('[data-reader-toggle]').click();
  check('Reader preferences fit small screen',await page.locator('#reader-panel').evaluate(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth}));
  await page.keyboard.press('Escape');
  check('Escape restores reader control focus',await page.locator('[data-reader-toggle]').evaluate(e=>e===document.activeElement));
  await page.goto(base+'/?qa=ui-highlights#highlight-slide-review');
  check('Highlight deep link works',await page.locator('#highlight-slide-review').isVisible());
  await page.locator('#highlight-dot-research').click();
  await page.keyboard.press('ArrowRight');
  check('Highlight keyboard tabs work',await page.locator('#highlight-slide-delivery').isVisible());
  await page.goto(base+'/?qa=ui-demos#demos');
  check('Demo gallery shows featured projects',await page.locator('.experience-card:visible').count()===3);
  await page.setViewportSize({width:720,height:900});
  await page.addStyleTag({content:'body * { line-height:1.5 !important; letter-spacing:.12em !important; word-spacing:.16em !important; } body p { margin-bottom:2em !important; }'});
  check('Text spacing reflow at 720px',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:'output/playwright/ui-text-spacing-720.png'});
  await page.goto(base+'/?qa=ui-final#about');
  await page.setViewportSize({width:390,height:844});
  check('Reading headings use the same sans-serif family',await page.locator('.about-copy h1,.section-heading h2,.learning-feature h3').evaluateAll(els=>els.every(e=>{const font=getComputedStyle(e).fontFamily;return font.includes('Microsoft YaHei')&&!font.includes('Georgia')})));
  check('Main paragraphs are at least 14px',await page.locator('.hero-bio,.project-body > p:not(.source-note),.learning-entry > p,.learning-feature > p:not(.learning-edition),.timeline-entry p').evaluateAll(els=>els.every(e=>parseFloat(getComputedStyle(e).fontSize)>=14)));
  await scan('mobile/default');
  const brokenAnchors=await page.locator('a[href^="#"]').evaluateAll(els=>els.map(e=>e.getAttribute('href').slice(1)).filter(id=>id&&!document.getElementById(id)));
  check('All homepage fragment links resolve',!brokenAnchors.length,brokenAnchors);
  for(const id of ['about','work','research','notebook','background','contact']){
    await page.locator('#'+id).evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
    await page.screenshot({path:`output/playwright/ui-final-${id}-390.png`});
  }
  await page.setViewportSize({width:1440,height:1000});
  for(const id of ['about','work','notebook','contact']){
    await page.locator('#'+id).evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
    await page.screenshot({path:`output/playwright/ui-final-${id}-1440.png`});
  }
  page.off('pageerror',onError);
  report.passed=report.checks.filter(c=>c.ok).length;
  report.failed=report.checks.filter(c=>!c.ok);
  return report;
}
