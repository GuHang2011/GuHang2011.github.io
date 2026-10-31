/* Local Live2D sample renderer. Only the demo page loads this runtime. */
(() => {
  const scripts=new Map();
  function script(src,ready){
    if(ready())return Promise.resolve();
    if(scripts.has(src))return scripts.get(src);
    const promise=new Promise((resolve,reject)=>{
      const node=document.createElement('script');node.src=src;
      const fail=()=>{clearTimeout(timer);node.remove();scripts.delete(src);reject(Error('Avatar runtime unavailable'))};
      const timer=setTimeout(fail,20000);
      node.onload=()=>{if(!ready())return fail();clearTimeout(timer);resolve()};node.onerror=fail;
      document.head.append(node);
    });scripts.set(src,promise);return promise;
  }
  window.MaoPresenter={async create(container){
    await script('vendor/pixi.min.js',()=>!!window.PIXI);
    await script('vendor/live2dcubismcore.min.js',()=>!!window.Live2DCubismCore);
    await script('vendor/cubism4.min.js',()=>!!window.PIXI?.live2d?.Live2DModel);
    let app,model,observer;
    try {
      model=await PIXI.live2d.Live2DModel.from('models/mao_pro/runtime/mao_pro.model3.json',{
        autoUpdate:false,autoInteract:false,motionPreload:'ALL'
      });
      await model.motion('Idle',0,3);
      for(let i=0;i<24;i++)model.update(1000/24);
      app=new PIXI.Application({width:360,height:480,backgroundAlpha:0,antialias:true,resolution:Math.min(devicePixelRatio,2),autoDensity:true,autoStart:false,preserveDrawingBuffer:true});
      app.stop();model.anchor.set(.5,.5);app.stage.addChild(model);
      container.replaceChildren(app.view);
      app.view.setAttribute('aria-hidden','true');
      let state={time:0,level:0,playing:false,reduced:false,gesture:'welcome'},lastTime=0,lastMotion='';
      model.internalModel.on('beforeModelUpdate',()=>{
        const core=model.internalModel.coreModel,t=state.time;
        core.setParameterValueById('ParamA',state.playing?state.level*.9:0);
        if(!state.reduced&&state.playing){
          core.addParameterValueById('ParamAngleX',Math.sin(t*.65)*2.5+(state.gesture==='present'?-3:0));
          core.addParameterValueById('ParamAngleY',state.gesture==='nod'?-Math.pow(Math.sin(t*1.4),2)*6:Math.sin(t*.4));
          core.addParameterValueById('ParamAngleZ',Math.sin(t*.8)*1.3);
        }
      });
      function render(next){
        state=next;
        const dt=next.playing&&!next.reduced?Math.min(80,Math.max(0,(next.time-lastTime)*1000)):0;
        const motionKey=next.reduced?'still':next.gesture+':'+Math.floor(next.time/10);
        if(next.reduced){model.internalModel.motionManager.stopAllMotions();lastMotion='still'}
        else if(next.playing&&motionKey!==lastMotion){
          lastMotion=motionKey;
          const index=next.gesture==='welcome'?1:next.gesture==='present'?2:0;
          void model.motion('',index,3).catch(()=>{});
        }
        if(next.time<lastTime)model.internalModel.motionManager.stopAllMotions();
        lastTime=next.time;model.update(dt);app.render();
      }
      function resize(){
        const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;
        app.renderer.resize(w,h);
        model.scale.set(Math.min(w/model.internalModel.width,h/model.internalModel.height)*.98);
        model.position.set(w/2,h/2);model.update(0);app.render();
      }
      observer=new ResizeObserver(resize);observer.observe(container);resize();
      render(state);
      return {render,resize,destroy(){observer.disconnect();app.destroy(true,{children:true,texture:true,baseTexture:true})}};
    }catch(error){observer?.disconnect();if(app)app.destroy(true,{children:true,texture:true,baseTexture:true});else model?.destroy();throw error}
  }};
})();
