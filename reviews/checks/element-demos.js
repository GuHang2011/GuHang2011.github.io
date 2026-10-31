async page => {
  const base='http://127.0.0.1:8778',pages=['','react-workflow/','low-code-form/','financial-analysis/','data-preparation/','model-evaluation/','production-workbench/','telecom-service/','bleu-explorer/','reliability-gates/','virtual-host/'];
  const report={pages:[],errors:[]};let slug;
  page.on('pageerror',e=>report.errors.push({slug,message:e.message}));
  await page.emulateMedia({reducedMotion:'reduce'});
  for(slug of pages){
    await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/demos/'+slug);await page.waitForLoadState('networkidle');
    if(slug==='virtual-host/')await page.waitForFunction(()=>hostDemo?.avatarReady);
    if(await page.locator('[data-language="zh"]').count())await page.locator('[data-language="zh"]').click();
    await page.addScriptTag({path:'output/frontend-audit/node_modules/axe-core/axe.min.js'});
    const violations=await page.evaluate(async()=>(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,reason:n.failureSummary}))})));
    const layouts=[];
    for(const width of [1920,1440,768,390,320]){
      await page.setViewportSize({width,height:width>800?1000:844});
      await page.waitForTimeout(250);
      layouts.push(await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth})));
      if([1440,390].includes(width))await page.screenshot({path:`output/playwright/element-${slug.replace('/','')||'gallery'}-${width}.png`,fullPage:false});
    }
    const brokenImages=await page.locator('img').evaluateAll(images=>images.filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src')));
    report.pages.push({slug,violations,layouts,brokenImages});
  }
  return report;
}
