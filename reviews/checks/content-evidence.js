// Run via Playwright CLI run-code against the site preview.
async page => {
 const base='http://127.0.0.1:8778';
 const report={checks:[],layouts:[],accessibility:[],errors:[]};
 const check=(name,ok,detail=null)=>report.checks.push({name,ok,detail});
 const onError=e=>report.errors.push(e.message);page.on('pageerror',onError);
 await page.emulateMedia({reducedMotion:'reduce'});
 const palette=async name=>{await page.locator('[data-reader-toggle]').click();await page.locator(`button[data-reader-theme="${name}"]`).click();await page.keyboard.press('Escape');};
 const scan=async name=>{
  if(!await page.evaluate(()=>!!window.axe))await page.addScriptTag({path:'output/frontend-audit/node_modules/axe-core/axe.min.js'});
  const violations=await page.evaluate(async()=>(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,reason:n.failureSummary}))})));
  report.accessibility.push({name,violations});
 };
 for(const path of ['/','/research/reviewer-guide.html','/notebook/','/notebook/ai-code-race-review.html','/notebook/workflow-recovery-review.html','/notebook/schema-import-review.html']){
  await page.goto(base+path+'?qa=evidence-layout');
  for(const lang of ['zh','en']){
   await page.locator(`[data-language="${lang}"]`).click();
   for(const theme of path.startsWith('/notebook')?['light']:['light','dark']){
    if(!path.startsWith('/notebook'))await palette(theme);
    for(const width of [320,390,768,1440]){
     await page.setViewportSize({width,height:1000});
     await page.locator('.experience-task').evaluateAll(es=>es.forEach(e=>e.open=true));
     const layout=await page.evaluate(()=>({width:innerWidth,page:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('.project-case-facts,.experience-task,.review-work,.review-facts,.review-evidence-grid,.article-prose,.notebook-search,.article-heading,.journal-row')].filter(e=>e.checkVisibility()&&(e.scrollWidth>e.clientWidth+1||e.getBoundingClientRect().right>innerWidth+1)).map(e=>e.className)}));
     report.layouts.push({path,lang,theme,...layout});
     if(width===390)await scan(`${path}/${lang}/${theme}`);
    }
   }
  }
 }
 await page.goto(base+'/');await palette('light');await page.locator('[data-language="zh"]').click();
 const selected=await page.locator('.project-item:visible').evaluateAll(es=>es.map(e=>e.id));
 check('Three chosen projects',selected.join()==='project-shuyang,project-react-workflow,project-low-code',selected);
 check('Four facts per chosen project',await page.locator('.project-item:visible .project-case-facts').evaluateAll(es=>es.length===3&&es.every(e=>e.querySelectorAll('dt').length===4)));
 check('All fourteen projects retained',await page.locator('.project-item').count()===14);
 await page.locator('[data-project-expand]').click();check('All projects discoverable',await page.locator('.project-item:visible').count()===14);
 await page.locator('#project-search').fill('FieldLens');check('Nonfeatured project searchable',await page.locator('#project-fieldlens').isVisible());
 await page.locator('[data-clear-search]').click();
 check('33 homepage notes',await page.locator('[data-desk-note]').count()===33);
 check('Three newest worked reviews',await page.locator('[data-desk-note]:visible a').evaluateAll(es=>es.length===3&&es.every(e=>e.href.endsWith('-review.html'))));
 await page.locator('[data-desk-topic="engineering"]').click();check('New and previous engineering notes remain accessible',await page.locator('[data-desk-note]:visible').count()>3);
 await page.locator('#demos').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
 for(const details of await page.locator('.experience-task').all())await details.locator('summary').click();
 check('Three demo tasks expand',await page.locator('.experience-task[open]').count()===3);
 await page.locator('#demo-data-preparation img').scrollIntoViewIfNeeded();
 await page.locator('#demo-data-preparation img').evaluate(async e=>{if(!e.complete)await new Promise(r=>{e.onload=r;e.onerror=r});});
 check('Data demo preview loads',await page.locator('#demo-data-preparation img').evaluate(e=>e.naturalWidth>0));
 await page.screenshot({path:'output/playwright/evidence-demos-expanded.png'});
 await page.goto(base+'/research/reviewer-guide.html');
 check('Both submission statuses remain unaccepted',await page.locator('.review-status').evaluateAll(es=>es.length===2&&es.every(e=>e.textContent.includes('尚未录用'))));
 check('Contribution and proposed work sections available',await page.locator('#contribution').count()===1&&await page.locator('#next').count()===1);
 await page.setViewportSize({width:320,height:844});await page.locator('.menu-toggle').click();await page.locator('#navigation a[href="#next"]').click();
 check('Reviewer mobile menu closes',await page.locator('.menu-toggle').getAttribute('aria-expanded')==='false');
 await page.goto(base+'/notebook/?q=竞态');
 check('New note found through notebook search',await page.locator('[data-note]:visible a[href="ai-code-race-review.html"]').count()===1);
 await page.locator('[data-note-clear]').click();check('Notebook count matches 33',await page.locator('[data-note]:visible').count()===33);
 // Follow the published tasks using actual UI controls.
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/demos/react-workflow/');
 await page.locator('[data-language="zh"]').click();await page.locator('#reset-board').click();
 const scenario=async text=>{await page.locator('#scenario-select').click();await page.getByRole('option',{name:text,exact:true}).click();};
 const version=()=>page.locator('#task-WF-104 [data-version]').innerText();
 await scenario('网络错误');await page.locator('#task-WF-104 [data-action="approved"]').click();
 await page.locator('#retry-action').waitFor();
 check('Network failure preserves status and version',await version()==='3'&&await page.locator('[data-status="review"] #task-WF-104').count()===1);
 await scenario('正常响应');await page.locator('#retry-action').click();
 await page.locator('[data-status="approved"] #task-WF-104').waitFor();check('Retry reaches approved version 4',await version()==='4');
 await page.locator('#reset-board').click();await scenario('版本冲突');await page.locator('#task-WF-104 [data-action="approved"]').click();await page.locator('#refresh-snapshot').waitFor();
 check('Conflict leaves version 3 and blocks submission',await version()==='3'&&await page.locator('#task-WF-104 [data-action="approved"]').isDisabled());
 await page.locator('#refresh-snapshot').click();check('Refresh updates to 4 without approving',await version()==='4'&&await page.locator('[data-status="review"] #task-WF-104').count()===1);
 await scenario('正常响应');await page.locator('#task-WF-104 [data-action="approved"]').click();await page.locator('[data-status="approved"] #task-WF-104').waitFor();check('New decision reaches approved version 5',await version()==='5');
 await page.locator('#reset-board').click();await page.locator('#task-WF-104 [data-action="approved"]').click();await page.locator('#reset-board').click();await page.waitForTimeout(750);
 check('Reset remains stable after simulated response deadline',await version()==='3'&&await page.locator('[data-status="review"] #task-WF-104').count()===1);
 await page.goto(base+'/demos/low-code-form/');await page.locator('#field-topic').fill('保留这段合成输入');
 await page.locator('.json-details summary').click();const original=await page.locator('#schema-json').inputValue();
 await page.locator('#schema-json').fill('{invalid');await page.locator('#apply-json').click();
 check('Invalid JSON preserves preview input',await page.locator('#field-topic').inputValue()==='保留这段合成输入'&&(await page.locator('#schema-status').innerText()).includes('拒绝应用'));
 const duplicate=JSON.parse(original);duplicate.fields[1].key=duplicate.fields[0].key;
 await page.locator('#schema-json').fill(JSON.stringify(duplicate));await page.locator('#apply-json').click();
 check('Duplicate key preserves preview fields and input',await page.locator('.dynamic-field').count()===4&&await page.locator('#field-topic').inputValue()==='保留这段合成输入');
 await page.locator('#schema-json').fill(original);await page.locator('#apply-json').click();check('Valid import resets preview values',await page.locator('#field-topic').inputValue()==='');
 await page.locator('#field-topic').fill('排序仍保留');await page.locator('#down-topic').click();check('Reordering retains values by key',await page.locator('#field-topic').inputValue()==='排序仍保留');
 await page.goto(base+'/demos/data-preparation/');await page.locator('#reset').click();await page.locator('[data-stage="4"]').click();
 check('Default data fixture agrees with task result',await page.locator('#kept-count').innerText()==='10'&&await page.locator('#quarantine-count').innerText()==='7');
 await page.locator('#tab-quarantine').click();check('Quarantine rows are inspectable',await page.locator('#records-body tr').count()===7);
 await page.goto(base+'/research/reviewer-guide.html');await page.locator('[data-language="zh"]').click();
 for(const width of [1440,390]){await page.setViewportSize({width,height:1000});await page.screenshot({path:`output/playwright/evidence-guide-final-${width}.png`});}
 await page.goto(base+'/?v=20261101-evidence');await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'output/playwright/evidence-home-final.png'});
 page.off('pageerror',onError);report.failed=report.checks.filter(c=>!c.ok);report.passed=report.checks.length-report.failed.length;
 return report;
}
