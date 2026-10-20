// Playwright CLI run-code file. Serve the site at 127.0.0.1:8765 first.
// Screenshots are written to output/playwright/; run from the repository root.
async page => {
  await page.setViewportSize({width:1280,height:720});
  await page.emulateMedia({media:'screen',reducedMotion:'no-preference'});
  await page.goto('http://127.0.0.1:8765/demos/virtual-host/');
  await page.waitForFunction(()=>window.hostDemo?.ready);
  await page.locator('#reduce-motion').uncheck();
  await page.evaluate(()=>document.body.classList.add('capture-mode'));
  const duration=await page.evaluate(()=>window.hostDemo.data.duration);
  const fps=24;
  for(let frame=0;frame<Math.ceil(duration*fps);frame++) {
    await page.evaluate(t=>window.hostDemo.seek(t,true),frame/fps);
    await page.screenshot({path:`output/playwright/host-frames/showcase-${String(frame).padStart(4,'0')}.jpg`,type:'jpeg',quality:88});
  }
  await page.evaluate(()=>{
    const hint=document.createElement('div');hint.id='recording-hint';
    hint.style.cssText='position:absolute;left:36px;bottom:200px;padding:12px 17px;background:#f4e6bd;color:#173d45;border-radius:4px;font-size:16px;z-index:4;max-width:390px';
    document.querySelector('.stage').append(hint);
  });
  for(let frame=0;frame<22*fps;frame++) {
    await page.evaluate(t=>{
      const [a,b,c]=window.hostDemo.data.segments;
      let time,playing,text,target;
      if(t<4){time=t;playing=true;text='01 / 开始讲解：角色与字幕联动';target='#play';}
      else if(t<7){time=4;playing=false;text='02 / 暂停：保留当前播放位置';target='#play';}
      else if(t<11){time=b.start;playing=false;text='03 / 选择章节：直接定位商品讲解';target='[data-chapter="1"]';}
      else if(t<15){time=b.start+t-11;playing=true;text='04 / 继续播放：从选定章节开始';target='#play';}
      else if(t<19){time=c.start;playing=false;text='05 / 定位第三章：切换手势与讲稿';target='[data-chapter="2"]';}
      else{time=t-19;playing=true;text='06 / 重播：回到讲解起点';target='#restart';}
      window.hostDemo.seek(time,playing);
      document.querySelector('#recording-hint').textContent=text;
      document.querySelectorAll('.recording-target').forEach(e=>{e.classList.remove('recording-target');e.style.outline='';});
      const button=document.querySelector(target);button.classList.add('recording-target');button.style.outline='3px solid #bb8b3b';button.style.outlineOffset='3px';
    },frame/fps);
    await page.screenshot({path:`output/playwright/host-frames/workflow-${String(frame).padStart(4,'0')}.jpg`,type:'jpeg',quality:88});
  }
  return {fps,showcaseFrames:Math.ceil(duration*fps),showcaseSeconds:duration,workflowFrames:22*fps,workflowSeconds:22};
}
