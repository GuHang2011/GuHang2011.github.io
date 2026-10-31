async page => {
  const base='http://127.0.0.1:8778',checks=[],errors=[];
  const ok=(v,name)=>{if(!v)throw Error(name);checks.push(name)};
  page.on('pageerror',e=>errors.push(e.message));
  await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1440,height:1000});
  await page.goto(base+'/demos/virtual-host/');
  await page.waitForFunction(()=>window.hostDemo?.ready&&window.hostDemo.avatarReady);
  ok(await page.locator('#narration').evaluate(a=>a.paused),'No autoplay');
  ok(await page.locator('[data-chapter]').count()===6&&await page.evaluate(()=>hostDemo.data.duration)>100,'Six chapters and extended narration');
  ok(await page.locator('#mao-canvas canvas').isVisible()&&!await page.locator('#mao-preview').isVisible(),'Actual Mao model replaces preview image');
  await page.locator('#narration').evaluate(a=>a.muted=true);
  const pixels=()=>page.locator('#mao-canvas canvas').evaluate(c=>c.toDataURL());
  const before=await pixels();await page.locator('#play').click();
  await page.waitForFunction(()=>document.querySelector('#narration').currentTime>1);
  ok(before!==await pixels(),'Mao animates during real audio playback');
  await page.locator('#play').click();
  const paused=await pixels(),time=await page.locator('#narration').evaluate(a=>a.currentTime);
  await page.waitForTimeout(200);
  ok(paused===await pixels()&&Math.abs(await page.locator('#narration').evaluate(a=>a.currentTime)-time)<.02,'Pause freezes both canvas and audio position');
  await page.locator('[data-host-choice="lin"]').click();
  ok(await page.locator('#lin-slot').isVisible()&&!await page.locator('#mao-slot').isVisible()&&Math.abs(await page.locator('#narration').evaluate(a=>a.currentTime)-time)<.02,'Switch to Lin preserves playback position');
  await page.locator('[data-host-choice="mao"]').click();
  ok(await page.locator('#mao-canvas canvas').count()===1,'Returning to Mao reuses one renderer');
  for(let i=0;i<6;i++){
    await page.locator(`[data-chapter="${i}"]`).click();
    ok(await page.evaluate(i=>Math.abs(document.querySelector('#narration').currentTime-hostDemo.data.segments[i].start)<.1,i),`Chapter ${i+1} seeks to its narration`);
  }
  await page.locator('#restart').click();ok(await page.locator('#narration').evaluate(a=>a.paused&&a.currentTime===0),'Restart returns to beginning without autoplay');
  await page.locator('#reduce-motion').check();
  ok(await page.locator('body').getAttribute('data-reduced')==='true','Reduced motion control works');
  await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#reduce-motion').uncheck();
  ok(await page.locator('body').getAttribute('data-reduced')==='true','System reduced-motion preference has priority');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.locator('#play').click();await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))});
  ok(await page.locator('#narration').evaluate(a=>a.paused),'Hidden-tab event pauses narration');await page.evaluate(()=>delete document.hidden);
  for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:900});
    ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Layout fits ${width}px`);
  }
  await page.setViewportSize({width:390,height:844});await page.screenshot({path:'output/playwright/mao-mobile.png',fullPage:true});
  await page.setViewportSize({width:1280,height:720});
  await page.evaluate(()=>{document.body.classList.add('capture-mode');hostDemo.seek(0,false)});
  ok(await page.evaluate(()=>document.documentElement.scrollHeight===720),'Recording frame contains the full console');
  await page.screenshot({path:'output/playwright/mao-capture-preview.png'});
  await page.addScriptTag({path:'output/frontend-audit/node_modules/axe-core/axe.min.js'});
  const violations=await page.evaluate(async()=>(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,reason:n.failureSummary}))})));
  ok(!violations.length,'Demo accessibility scan '+JSON.stringify(violations));
  await page.route('**/mao_pro.moc3',route=>route.abort());
  await page.reload();await page.locator('#avatar-retry').waitFor({state:'visible'});
  ok(await page.locator('#mao-preview').isVisible()&&await page.locator('#play').isEnabled(),'Model failure retains preview and narration controls');
  await page.locator('[data-host-choice="lin"]').click();
  ok(await page.locator('#lin-slot').isVisible(),'Lin remains usable when model loading fails');
  await page.unroute('**/mao_pro.moc3');await page.locator('[data-host-choice="mao"]').click();
  await page.waitForFunction(()=>hostDemo.avatarReady);
  ok(await page.locator('#mao-canvas canvas').isVisible(),'Model can recover after a failed load');
  ok(errors.length===0,'No page exceptions');
  return {passed:checks.length,checks,violations,errors};
}
