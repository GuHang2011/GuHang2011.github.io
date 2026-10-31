/* Vue state for the presenter. Build with npm ci / npm run build in ui/. */
import { ref, shallowRef, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';

export function usePresenter() {
  const audio = document.querySelector('#narration');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const data = shallowRef(null), time = ref(0), phase = ref('loading'), host = ref('mao');
  const avatarReady = ref(false), avatarLoading = ref(false), avatarError = ref(false);
  const loadError = ref(''), reducedMotion = ref(media.matches), systemReduced = ref(media.matches);
  const speed = ref(1), bilingual = ref(true), poses = shallowRef({});
  let epoch = 0, frame, recording = false, renderer, maoTask, disposed = false;
  const duration = computed(() => data.value?.duration || 0);
  const index = computed(() => data.value?.segments.reduce((found, item, i) => time.value >= item.start ? i : found, 0) || 0);
  const cue = computed(() => data.value?.segments[index.value]);
  const reduced = computed(() => reducedMotion.value || systemReduced.value);
  const clock = t => `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
  const timeLabel = computed(() => `${clock(time.value)} / ${data.value ? clock(duration.value) : '--:--'}`);
  const status = computed(() => ({idle:'准备就绪', playing:'正在讲解', paused:'已暂停', ended:'讲解结束', loading:'正在加载', error:'加载失败'}[phase.value]));
  const playLabel = computed(() => phase.value === 'playing' ? '暂停讲解' : phase.value === 'ended' ? '重新播放' : '开始讲解');
  const avatarStatus = computed(() => host.value === 'lin' ? '小林已就绪 · SVG 角色' : avatarReady.value ? 'Mao 已就绪 · Live2D 示例角色' : avatarError.value ? '动态形象未加载，可重试或切换小林。' : '正在加载 Mao 动态形象…');

  function draw(position, playing = !audio.paused) {
    if (!data.value || disposed) return;
    time.value = Math.max(0, Math.min(position, duration.value));
    const level = playing ? data.value.levels[Math.min(data.value.levels.length - 1, Math.floor(time.value * data.value.envelopeFps))] || 0 : 0;
    document.querySelectorAll('.host-mouth').forEach(m => m.style.transform = `scaleY(${.12 + level * 1.6})`);
    document.querySelectorAll('.stage-meter i').forEach((bar, i) => bar.style.transform = `scaleY(${.1 + level * (.35 + .65 * Math.abs(Math.sin(i * 1.3 + time.value * 7)))})`);
    if (host.value === 'mao' && renderer) renderer.render({time: time.value, playing, level, reduced: reduced.value, gesture: cue.value.gesture});
  }
  function tick() { draw(audio.currentTime); if (!audio.paused && !recording) frame = requestAnimationFrame(tick); }
  function pause() { ++epoch; audio.pause(); cancelAnimationFrame(frame); phase.value = 'paused'; draw(audio.currentTime, false); }
  async function start() {
    if (!data.value) return;
    const version = ++epoch;
    if (audio.ended || audio.currentTime >= duration.value - .1) audio.currentTime = 0;
    document.querySelectorAll('video').forEach(v => v.pause());
    phase.value = 'loading';
    try {
      await audio.play();
      if (disposed || version !== epoch) return;
      loadError.value = ''; phase.value = 'playing'; cancelAnimationFrame(frame); tick();
    } catch { if (version === epoch) { phase.value = 'paused'; loadError.value = '播放失败，请再次点击开始讲解，或观看下方视频。'; } }
  }
  const toggle = () => audio.paused ? start() : pause();
  function restart() { pause(); audio.currentTime = 0; draw(0, false); phase.value = 'idle'; }
  function seek(position) { if (!data.value) return; audio.currentTime = Number(position); draw(audio.currentTime); }
  async function loadMao() {
    if (renderer || maoTask || disposed) return maoTask || renderer;
    avatarLoading.value = true; avatarError.value = false;
    maoTask = Promise.resolve().then(() => window.MaoPresenter.create(document.querySelector('#mao-canvas'))).then(result => {
      if (disposed) { result.destroy(); return null; }
      renderer = result; avatarReady.value = true; draw(time.value, phase.value === 'playing'); return result;
    }).catch(() => { avatarError.value = true; return null; }).finally(() => { avatarLoading.value = false; maoTask = null; });
    return maoTask;
  }
  async function selectHost(value) {
    host.value = value === 'lin' ? 'lin' : 'mao';
    await nextTick();
    if (host.value === 'mao') { await loadMao(); if (host.value === 'mao') renderer?.resize(); }
    draw(time.value, phase.value === 'playing');
  }
  const visibility = () => { if (document.hidden && !recording && !audio.paused) pause(); };
  const ended = () => { ++epoch; cancelAnimationFrame(frame); phase.value = 'ended'; draw(duration.value, false); };
  const audioError = () => { pause(); loadError.value = '音频加载失败，请重试播放或观看下方视频。'; };
  const preference = event => systemReduced.value = event.matches;
  const exclusiveVideo = event => {
    if (event.target.tagName !== 'VIDEO') return;
    if (!audio.paused) pause();
    document.querySelectorAll('video').forEach(v => { if (v !== event.target) v.pause(); });
  };
  watch(speed, value => { audio.playbackRate = value; });
  watch(reduced, value => { document.body.dataset.reduced = String(value); draw(time.value, phase.value === 'playing'); }, {immediate: true});
  onMounted(async () => {
    audio.addEventListener('ended', ended); audio.addEventListener('error', audioError);
    document.addEventListener('visibilitychange', visibility); document.addEventListener('play', exclusiveVideo, true);
    addEventListener('pagehide', pause); media.addEventListener('change', preference);
    try {
      const [script, ...svgs] = await Promise.all([
        fetch('script.json?v=20261101').then(r => { if (!r.ok) throw Error('Script'); return r.json(); }),
        ...['welcome', 'present', 'nod'].map(pose => fetch(`host-${pose}.svg`).then(r => { if (!r.ok) throw Error('Character'); return r.text(); }))
      ]);
      if (disposed) return;
      data.value = script; poses.value = Object.fromEntries(['welcome', 'present', 'nod'].map((p, i) => [p, svgs[i]]));
      phase.value = 'idle'; await nextTick(); draw(0, false); void loadMao();
      // Shared recording interface uses the same measured audio envelope.
      window.hostDemo = { data: script, selectHost, get avatarReady() { return avatarReady.value; }, get host() { return host.value; },
        async seek(position, playing = true) { recording = true; cancelAnimationFrame(frame); phase.value = playing ? 'playing' : 'paused'; draw(position, playing); await nextTick(); document.getAnimations().forEach(a => { a.pause(); a.currentTime = position * 1000; }); },
        interactive() { recording = false; pause(); }, ready: true };
    } catch { phase.value = 'error'; loadError.value = '讲稿或角色资源加载失败，请刷新页面，或观看下方演示视频。'; }
  });
  onBeforeUnmount(() => {
    disposed = true; pause(); renderer?.destroy();
    audio.removeEventListener('ended', ended); audio.removeEventListener('error', audioError);
    document.removeEventListener('visibilitychange', visibility); document.removeEventListener('play', exclusiveVideo, true);
    removeEventListener('pagehide', pause); media.removeEventListener('change', preference);
    delete window.hostDemo;
  });
  return {data, time, phase, host, avatarReady, avatarLoading, avatarError, loadError, reducedMotion, systemReduced, speed, bilingual, poses, duration, index, cue, clock, timeLabel, status, playLabel, avatarStatus, toggle, restart, seek, selectHost, loadMao};
}
