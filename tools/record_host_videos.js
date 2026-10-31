// Playwright CLI run-code. Serve with byte ranges at 127.0.0.1:8778.
// Run from the repository root; output/playwright/presenter-frames must exist.
async page => {
  await page.setViewportSize({width:1280,height:720});
  await page.emulateMedia({media:'screen',reducedMotion:'no-preference'});
  await page.goto('http://127.0.0.1:8778/demos/virtual-host/');
  await page.waitForFunction(()=>window.hostDemo?.ready&&window.hostDemo.avatarReady);
  await page.locator('#reduce-motion').uncheck();
  await page.evaluate(()=>document.body.classList.add('capture-mode'));
  const duration=await page.evaluate(()=>hostDemo.data.duration),fps=24;
  for(let frame=0;frame<Math.ceil(duration*fps);frame++){
    await page.evaluate(t=>hostDemo.seek(t,true),frame/fps);
    await page.screenshot({path:`output/playwright/presenter-frames/showcase-${String(frame).padStart(4,'0')}.jpg`,type:'jpeg',quality:88});
  }
  await page.evaluate(()=>{
    const hint=document.createElement('div');hint.id='recording-hint';
    hint.style.cssText='position:absolute;left:36px;bottom:205px;padding:12px 16px;background:#153e3a;color:#fff;border-radius:6px;font-size:14px;z-index:4;max-width:385px';
    document.querySelector('.stage').append(hint);
  });
  let previousHost='mao',previousReduced=false;
  for(let frame=0;frame<60*fps;frame++){
    const t=frame/fps,host=t>=24&&t<34?'lin':'mao',reduce=t>=44&&t<52;
    if(host!==previousHost){await page.evaluate(value=>hostDemo.selectHost(value),host);previousHost=host}
    if(reduce!==previousReduced){await page.locator('#reduce-motion').setChecked(reduce);previousReduced=reduce}
    await page.evaluate(t=>{
      const s=hostDemo.data.segments;let time,playing=true,text,target;
      if(t<8){time=t;text='01 / 开始讲解 · Mao 动作与字幕联动';target='#play'}
      else if(t<14){time=8;playing=false;text='02 / 暂停 · 声音、角色和进度一起停止';target='#play'}
      else if(t<24){time=s[1].start+t-14;text='03 / 选择章节 · 定位商品信息核对';target='[data-chapter="1"]'}
      else if(t<34){time=s[2].start+t-24;text='04 / 切换小林 · 同一讲稿，不同角色';target='[data-host-choice="lin"]'}
      else if(t<44){time=s[3].start+t-34;text='05 / 切换回 Mao · 检查内容与素材来源';target='[data-host-choice="mao"]'}
      else if(t<52){time=s[4].start+t-44;text='06 / 减少动作 · 保留字幕与语音进度';target='#reduce-motion'}
      else{time=t-52;text='07 / 从头开始 · 回到第一章';target='#restart'}
      hostDemo.seek(time,playing);document.querySelector('#recording-hint').textContent=text;
      document.querySelectorAll('.recording-target').forEach(e=>{e.classList.remove('recording-target');e.style.outline=''});
      const control=document.querySelector(target);control.classList.add('recording-target');control.style.outline='3px solid #b37538';control.style.outlineOffset='2px';
    },t);
    await page.screenshot({path:`output/playwright/presenter-frames/workflow-${String(frame).padStart(4,'0')}.jpg`,type:'jpeg',quality:88});
  }
  return {fps,showcaseFrames:Math.ceil(duration*fps),showcaseSeconds:duration,workflowFrames:60*fps,workflowSeconds:60};
}
