/* Isolated public demonstration. No backend, credentials, camera or microphone. */
(() => {
  const studio = document.querySelector('#studio'), audio = document.querySelector('#narration');
  const play = document.querySelector('#play'), range = document.querySelector('#timeline');
  const status = document.querySelector('#play-status'), restart = document.querySelector('#restart');
  const motion = document.querySelector('#reduce-motion');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let data, epoch = 0, frame, recording = false;
  const clock = t => `${String(Math.floor(t / 60)).padStart(2,'0')}:${String(Math.floor(t % 60)).padStart(2,'0')}`;
  function state(next) {
    studio.dataset.state = next;
    play.textContent = next === 'playing' ? '暂停讲解' : next === 'ended' ? '重新播放' : '开始讲解';
    status.textContent = {idle:'准备就绪',playing:'正在讲解',paused:'已暂停',ended:'讲解结束',loading:'正在加载'}[next] || '已暂停';
  }
  function draw(time, playing = !audio.paused) {
    if (!data) return;
    time = Math.max(0, Math.min(time, data.duration));
    const index = data.segments.reduce((found, item, i) => time >= item.start ? i : found, 0);
    const cue = data.segments[index];
    const level = playing ? data.levels[Math.min(data.levels.length-1, Math.floor(time*data.envelopeFps))] : 0;
    document.querySelectorAll('[data-pose]').forEach(p => {p.hidden = p.dataset.pose !== cue.gesture;});
    document.querySelectorAll('[data-chapter]').forEach(b => Number(b.dataset.chapter) === index ? b.setAttribute('aria-current','step') : b.removeAttribute('aria-current'));
    document.querySelector('#stage-title').textContent = cue.title;
    document.querySelector('#chapter-label').textContent = `0${index+1} / ${cue.title}`;
    document.querySelector('#caption-zh').textContent = cue.zh;
    document.querySelector('#caption-en').textContent = cue.en;
    document.querySelector('#time').textContent = `${clock(time)} / ${clock(data.duration)}`;
    range.value = time;
    document.querySelectorAll('.host-mouth').forEach(m => {m.style.transform = `scaleY(${.12 + level*1.6})`;});
    document.querySelectorAll('.stage-meter i').forEach((bar,i) => {bar.style.transform = `scaleY(${.1 + level*(.35 + .65*Math.abs(Math.sin(i*1.3+time*7)))})`;});
  }
  function tick(){ draw(audio.currentTime); if(!audio.paused&&!recording) frame=requestAnimationFrame(tick); }
  function pause(){++epoch; audio.pause();cancelAnimationFrame(frame);state('paused');draw(audio.currentTime,false);}
  async function start(){
    const version=++epoch;
    if(audio.ended||audio.currentTime>=data.duration-.1)audio.currentTime=0;
    state('loading');
    try{await audio.play();if(version!==epoch)return;state('playing');cancelAnimationFrame(frame);tick();}
    catch(error){if(version!==epoch)return;state('paused');status.textContent='播放失败，请点击重试';}
  }
  play.addEventListener('click',()=>audio.paused?start():pause());
  restart.addEventListener('click',()=>{pause();audio.currentTime=0;draw(0,false);state('idle');});
  range.addEventListener('input',()=>{audio.currentTime=Number(range.value);draw(audio.currentTime);});
  document.querySelectorAll('[data-chapter]').forEach(button=>button.addEventListener('click',()=>{if(!data)return;audio.currentTime=data.segments[Number(button.dataset.chapter)].start;draw(audio.currentTime);}));
  audio.addEventListener('ended',()=>{++epoch;cancelAnimationFrame(frame);state('ended');draw(data.duration,false);});
  audio.addEventListener('error',()=>{pause();document.querySelector('#load-error').hidden=false;});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&!recording&&!audio.paused)pause();});
  addEventListener('pagehide',pause);
  motion.checked=media.matches;
  const reduce=()=>document.body.dataset.reduced=String(motion.checked||media.matches);
  motion.addEventListener('change',reduce);media.addEventListener('change',reduce);reduce();
  Promise.all([fetch('script.json').then(r=>{if(!r.ok)throw Error('Script');return r.json();}),...['welcome','present','nod'].map(async pose=>{const r=await fetch(`host-${pose}.svg`);if(!r.ok)throw Error('Character');document.querySelector(`[data-pose="${pose}"]`).innerHTML=await r.text();})]).then(([script])=>{
    data=script;range.max=data.duration;range.disabled=false;play.disabled=false;restart.disabled=false;
    const transcript=document.querySelector('#transcript');
    data.segments.forEach(cue=>{const block=document.createElement('article');const heading=document.createElement('h3');heading.textContent=cue.title;block.append(heading);for(const lang of ['zh','en']){const p=document.createElement('p');p.lang=lang;p.textContent=cue[lang];block.append(p);}transcript.append(block);});
    state('idle');draw(0,false);
    // Deterministic recording uses the same DOM and actual narration envelope.
    window.hostDemo={data,seek(time,playing=true){recording=true;state(playing?'playing':'paused');draw(time,playing);document.getAnimations().forEach(a=>{a.pause();a.currentTime=time*1000;});},interactive(){recording=false;pause();},ready:true};
  }).catch(()=>{document.querySelector('#load-error').hidden=false;play.textContent='暂时无法加载';});
})();
