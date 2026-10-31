/* Public playback integration; no backend, account, camera or microphone. */
(() => {
  const studio=document.querySelector('#studio'),audio=document.querySelector('#narration');
  const play=document.querySelector('#play'),range=document.querySelector('#timeline'),status=document.querySelector('#play-status');
  const restart=document.querySelector('#restart'),motion=document.querySelector('#reduce-motion'),media=matchMedia('(prefers-reduced-motion: reduce)');
  const maoSlot=document.querySelector('#mao-slot'),linSlot=document.querySelector('#lin-slot'),avatarStatus=document.querySelector('#avatar-status'),retry=document.querySelector('#avatar-retry');
  let data,epoch=0,frame,recording=false,host='mao',maoRenderer,maoTask,lastDraw={time:0,playing:false};
  const clock=t=>`${String(Math.floor(t/60)).padStart(2,'0')}:${String(Math.floor(t%60)).padStart(2,'0')}`;
  const reduced=()=>motion.checked||media.matches;
  function state(next){
    studio.dataset.state=next;
    play.textContent=next==='playing'?'暂停讲解':next==='ended'?'重新播放':'开始讲解';
    status.textContent={idle:'准备就绪',playing:'正在讲解',paused:'已暂停',ended:'讲解结束',loading:'正在加载'}[next]||'已暂停';
  }
  function draw(time,playing=!audio.paused){
    if(!data)return;
    time=Math.max(0,Math.min(time,data.duration));lastDraw={time,playing};
    const index=data.segments.reduce((found,item,i)=>time>=item.start?i:found,0),cue=data.segments[index];
    const level=playing?data.levels[Math.min(data.levels.length-1,Math.floor(time*data.envelopeFps))]||0:0;
    document.querySelectorAll('[data-pose]').forEach(p=>p.hidden=p.dataset.pose!==cue.gesture);
    document.querySelectorAll('[data-chapter]').forEach(b=>Number(b.dataset.chapter)===index?b.setAttribute('aria-current','step'):b.removeAttribute('aria-current'));
    document.querySelector('#stage-title').textContent=cue.title;
    document.querySelector('#chapter-label').textContent=`${String(index+1).padStart(2,'0')} / ${cue.title}`;
    document.querySelector('#caption-zh').textContent=cue.zh;document.querySelector('#caption-en').textContent=cue.en;
    document.querySelector('#time').textContent=`${clock(time)} / ${clock(data.duration)}`;range.value=time;
    range.setAttribute('aria-valuetext',`${clock(time)}，总时长 ${clock(data.duration)}`);
    document.querySelectorAll('.host-mouth').forEach(m=>m.style.transform=`scaleY(${.12+level*1.6})`);
    document.querySelectorAll('.stage-meter i').forEach((bar,i)=>bar.style.transform=`scaleY(${.1+level*(.35+.65*Math.abs(Math.sin(i*1.3+time*7)))})`);
    if(host==='mao'&&maoRenderer)maoRenderer.render({time,playing,level,reduced:reduced(),gesture:cue.gesture});
  }
  function tick(){draw(audio.currentTime);if(!audio.paused&&!recording)frame=requestAnimationFrame(tick)}
  function pause(){++epoch;audio.pause();cancelAnimationFrame(frame);state('paused');draw(audio.currentTime,false)}
  async function start(){
    if(!data)return;
    const version=++epoch;if(audio.ended||audio.currentTime>=data.duration-.1)audio.currentTime=0;
    state('loading');
    try{await audio.play();if(version!==epoch)return;document.querySelector('#load-error').hidden=true;state('playing');cancelAnimationFrame(frame);tick()}
    catch{if(version===epoch){state('paused');status.textContent='播放失败，请点击重试'}}
  }
  async function loadMao(){
    if(maoRenderer)return maoRenderer;
    if(maoTask)return maoTask;
    avatarStatus.textContent='正在加载 Mao 动态形象…';retry.hidden=true;
    document.querySelector('#mao-preview').hidden=false;
    maoTask=window.MaoPresenter.create(document.querySelector('#mao-canvas')).then(renderer=>{
      maoRenderer=renderer;studio.dataset.avatarReady='true';document.querySelector('#mao-preview').hidden=true;
      if(host==='mao')avatarStatus.textContent='Mao 已就绪 · Live2D 示例角色';
      draw(lastDraw.time,lastDraw.playing);return renderer;
    }).catch(()=>{
      studio.dataset.avatarReady='false';
      if(host==='mao'){avatarStatus.textContent='动态形象未加载，可重试或切换小林。';retry.hidden=false}
      return null;
    }).finally(()=>{maoTask=null});return maoTask;
  }
  async function selectHost(value){
    host=value==='lin'?'lin':'mao';studio.dataset.host=host;
    maoSlot.hidden=host!=='mao';linSlot.hidden=host!=='lin';retry.hidden=true;
    document.querySelectorAll('[data-host-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.hostChoice===host)));
    document.querySelector('#host-label').textContent=host==='mao'?'Mao / 虹色まお':'小林 / LIN';
    document.querySelector('#host-kind').textContent=host==='mao'?'Live2D 示例角色 © Live2D Inc.':'二维 SVG 讲解员';
    avatarStatus.textContent=host==='mao'?(maoRenderer?'Mao 已就绪 · Live2D 示例角色':'正在加载 Mao 动态形象…'):'小林已就绪 · SVG 角色';
    draw(lastDraw.time,lastDraw.playing);
    if(host==='mao'){await loadMao();if(host==='mao')maoRenderer?.resize()}
  }
  document.querySelectorAll('[data-host-choice]').forEach(b=>b.addEventListener('click',()=>selectHost(b.dataset.hostChoice)));
  retry.addEventListener('click',loadMao);
  play.addEventListener('click',()=>audio.paused?start():pause());
  restart.addEventListener('click',()=>{pause();audio.currentTime=0;draw(0,false);state('idle')});
  range.addEventListener('input',()=>{audio.currentTime=Number(range.value);draw(audio.currentTime)});
  document.querySelector('.chapters').addEventListener('click',event=>{
    const button=event.target.closest('[data-chapter]');if(!button||!data)return;
    audio.currentTime=data.segments[Number(button.dataset.chapter)].start;draw(audio.currentTime);
  });
  audio.addEventListener('ended',()=>{++epoch;cancelAnimationFrame(frame);state('ended');draw(data.duration,false)});
  audio.addEventListener('error',()=>{pause();document.querySelector('#load-error').hidden=false});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&!recording&&!audio.paused)pause()});
  addEventListener('pagehide',pause);
  motion.checked=media.matches;
  const reduce=()=>{document.body.dataset.reduced=String(reduced());draw(lastDraw.time,lastDraw.playing)};
  motion.addEventListener('change',reduce);media.addEventListener('change',reduce);reduce();
  Promise.all([fetch('script.json?v=20261101').then(r=>{if(!r.ok)throw Error('Script');return r.json()}),...['welcome','present','nod'].map(async pose=>{
    const r=await fetch(`host-${pose}.svg`);if(!r.ok)throw Error('Character');document.querySelector(`[data-pose="${pose}"]`).innerHTML=await r.text();
  })]).then(([script])=>{
    data=script;range.max=data.duration;range.disabled=false;play.disabled=false;restart.disabled=false;
    const transcript=document.querySelector('#transcript'),chapters=document.querySelector('.chapters');
    data.segments.forEach((cue,index)=>{
      const li=document.createElement('li'),button=document.createElement('button'),number=document.createElement('b'),label=document.createElement('span'),time=document.createElement('small');
      button.type='button';button.dataset.chapter=index;number.textContent=String(index+1).padStart(2,'0');label.textContent=cue.title;time.textContent=clock(cue.start);label.append(time);button.append(number,label);li.append(button);chapters.append(li);
      const block=document.createElement('article'),heading=document.createElement('h3');heading.textContent=cue.title;block.append(heading);
      for(const lang of ['zh','en']){const p=document.createElement('p');p.lang=lang;p.textContent=cue[lang];block.append(p)}transcript.append(block);
    });
    state('idle');draw(0,false);void selectHost('mao');
    // Recording controls drive the same page, measured envelope and renderer.
    window.hostDemo={data,selectHost,get avatarReady(){return !!maoRenderer},get host(){return host},
      seek(time,playing=true){recording=true;cancelAnimationFrame(frame);state(playing?'playing':'paused');draw(time,playing);document.getAnimations().forEach(a=>{a.pause();a.currentTime=time*1000})},
      interactive(){recording=false;pause()},ready:true};
  }).catch(()=>{document.querySelector('#load-error').hidden=false;play.textContent='暂时无法加载'});
})();
