"use strict";
(() => {
  const root = document.querySelector("[data-project-cinema]");
  if (!root) return;
  const catalog = [
    { id: "film-host", en: "Virtual presenter", zh: "虚拟主播", summaryEn: "Mao Live2D sample · 101-second narrated demo with bilingual captions.", summaryZh: "Mao Live2D 示例角色 · 101 秒中文讲解，配有中英字幕。", linkEn: "Try the presenter ↗", linkZh: "操作虚拟主播 ↗" },
    { id: "film-host-workflow", en: "Presenter controls", zh: "主播操作流程", summaryEn: "A 60-second silent walkthrough of presenter switching, chapters, pause and reduced motion.", summaryZh: "60 秒无声演示：切换角色、章节定位、暂停与减少动作。", linkEn: "Read implementation ↗", linkZh: "查看实现说明 ↗" },
    { id: "film-kapt", en: "Model early stopping", zh: "模型早停动画", summaryEn: "Synthetic validation values illustrate checkpoints and patience; not a training run.", summaryZh: "用合成验证数值演示检查点与耐心计数，非真实训练记录。", linkEn: "Adjust parameters ↗", linkZh: "亲自调节参数 ↗" },
    { id: "film-data", en: "Data quality audit", zh: "数据处理动画", summaryEn: "Follow validation, deduplication and reconciliation using fictional records.", summaryZh: "跟随虚构记录的校验、去重、隔离与汇总核对过程。", linkEn: "Try the data pipeline ↗", linkZh: "操作数据管道 ↗" },
  ];
  // Reuse the gallery's source, captions, poster and destination instead of duplicating media URLs.
  const films = catalog.flatMap(item => {
    const panel = document.getElementById(item.id);
    const media = panel?.querySelector("video");
    const src = media?.querySelector("source")?.getAttribute("src");
    const destination = panel?.querySelector(".project-links a")?.getAttribute("href");
    if (!src || !destination) return [];
    return [{ ...item, src, destination, poster: media.getAttribute("poster"), tracks: [...media.querySelectorAll("track")].map(track => ({ src: track.getAttribute("src"), language: track.srclang, label: track.label })) }];
  });
  if (!films.length) return;
  const panel = root.querySelector("[data-cinema-panel]");
  const launcher = root.querySelector("[data-cinema-launcher]");
  const toggle = root.querySelector("[data-cinema-toggle]");
  const screen = root.querySelector("[data-cinema-screen]");
  const select = root.querySelector("[data-cinema-select]");
  const status = root.querySelector("[data-cinema-status]");
  const retryActions = root.querySelector("[data-cinema-error-actions]");
  const openers = [...document.querySelectorAll("[data-cinema-open]")];
  const galleryLink = root.querySelector("[data-cinema-gallery]");
  const demoLink = root.querySelector("[data-cinema-demo]");
  const fileLink = root.querySelector("[data-cinema-file]");
  const sessionKey = "hang-gu-cinema-dismissed";
  let index = 0, video = null, playButton = null, generation = 0, message = "";
  let returnFocus = toggle, opened = false;
  const zh = () => document.documentElement.lang.startsWith("zh");
  const text = (en, cn) => zh() ? cn : en;

  function feedback(next) {
    message = next;
    status.hidden = !next;
    const messages = {
      loading: ["Loading video…", "正在加载视频…"],
      error: ["Video unavailable. Reload it or open the file directly.", "视频暂未加载，可以重试或直接打开视频文件。"],
      blocked: ["Playback did not start. Use the video play control to try again.", "播放未能开始，请点击视频播放控件重试。"],
      ended: ["End of film. Replay or choose another project.", "本段已结束，可以重播或切换项目。"],
    };
    status.textContent = next ? text(...messages[next]) : "";
    retryActions.hidden = next !== "error";
  }

  function captions() {
    if (!video) return;
    const language = zh() ? "zh" : "en";
    [...video.textTracks].forEach(track => { track.mode = track.language === language ? "showing" : "disabled"; });
  }

  function translate() {
    const film = films[index];
    root.querySelector("[data-cinema-title]").textContent = text(film.en, film.zh);
    root.querySelector("[data-cinema-summary]").textContent = text(film.summaryEn, film.summaryZh);
    root.querySelector("[data-cinema-counter]").textContent = `${String(index + 1).padStart(2, "0")} / ${String(films.length).padStart(2, "0")}`;
    [...select.options].forEach((option, i) => { option.textContent = `${String(i + 1).padStart(2, "0")} · ${text(films[i].en, films[i].zh)}`; });
    demoLink.textContent = text(film.linkEn, film.linkZh);
    if (playButton) playButton.textContent = text("▷ Play film", "▷ 播放短片");
    if (video) video.setAttribute("aria-label", text(film.en, film.zh));
    feedback(message); captions();
  }

  function pause() { if (video) video.pause(); }
  function mountVideo() {
    const version = ++generation, film = films[index];
    pause();
    if (video) { video.removeAttribute("src"); video.load(); }
    const current = document.createElement("video");
    current.controls = true; current.playsInline = true; current.preload = "none";
    current.width = 1280; current.height = 720;
    current.poster = film.poster;
    current.setAttribute("aria-describedby", "cinema-summary");
    current.src = film.src;
    // Track discovery is asynchronous. Reconcile after the browser selects its
    // initial default, without overriding later changes in the native CC menu.
    current.textTracks.addEventListener("addtrack", () => { if (video === current) captions(); });
    current.addEventListener("loadedmetadata", () => { if (video === current) captions(); });
    film.tracks.forEach(item => {
      const track = document.createElement("track");
      track.kind = "captions"; track.src = item.src; track.srclang = item.language; track.label = item.label;
      track.default = item.language === (zh() ? "zh" : "en"); current.append(track);
    });
    const play = document.createElement("button");
    play.type = "button"; play.className = "cinema-play";
    play.dataset.cinemaPlay = "";
    const active = () => version === generation && video === current && opened;
    play.addEventListener("click", async () => {
      if (!active()) return;
      current.focus({ preventScroll: true });
      feedback("loading");
      try { await current.play(); }
      catch { if (active() && message !== "error") { play.hidden = false; feedback("blocked"); } }
    });
    current.addEventListener("play", () => {
      if (!active()) { current.pause(); return; }
      document.querySelectorAll("video").forEach(other => { if (other !== current) other.pause(); });
      play.hidden = true; feedback("");
    });
    current.addEventListener("waiting", () => { if (active()) feedback("loading"); });
    current.addEventListener("playing", () => { if (active()) feedback(""); });
    current.addEventListener("error", () => { if (active()) { play.hidden = true; feedback("error"); } });
    current.addEventListener("ended", () => { if (active()) { play.hidden = false; feedback("ended"); } });
    screen.replaceChildren(current, play);
    video = current; playButton = play; feedback("");
    demoLink.href = film.destination; galleryLink.href = "#" + film.id; fileLink.href = film.src;
    translate();
  }

  function setExpanded(value) {
    opened = value; root.dataset.open = String(value);
    panel.hidden = !value; launcher.hidden = value;
    [toggle, ...openers].forEach(button => button.setAttribute("aria-expanded", String(value)));
  }
  function minimize(focus = true) {
    pause(); setExpanded(false);
    if (focus) toggle.focus({ preventScroll: true });
  }
  function open(trigger) {
    returnFocus = trigger || toggle;
    try { sessionStorage.removeItem(sessionKey); } catch { /* Optional session preference. */ }
    root.hidden = false; setExpanded(true);
    if (!video) mountVideo();
    root.querySelector("[data-cinema-minimize]").focus({ preventScroll: true });
  }
  function dismiss() {
    minimize(false); root.hidden = true;
    try { sessionStorage.setItem(sessionKey, "1"); } catch { /* Close still works without storage. */ }
    const target = returnFocus && !root.contains(returnFocus) ? returnFocus : openers[0];
    target?.focus({ preventScroll: true });
  }
  function choose(next) {
    index = (next + films.length) % films.length;
    select.value = String(index); mountVideo();
  }

  films.forEach((_, i) => { const option = document.createElement("option"); option.value = String(i); select.append(option); });
  toggle.addEventListener("click", () => open(toggle));
  openers.forEach(button => { button.hidden = false; button.addEventListener("click", () => open(button)); });
  root.querySelector("[data-cinema-minimize]").addEventListener("click", () => minimize());
  root.querySelectorAll("[data-cinema-dismiss]").forEach(button => button.addEventListener("click", dismiss));
  root.querySelector("[data-cinema-prev]").addEventListener("click", () => choose(index - 1));
  root.querySelector("[data-cinema-next]").addEventListener("click", () => choose(index + 1));
  select.addEventListener("change", () => choose(Number(select.value)));
  root.querySelector("[data-cinema-retry]").addEventListener("click", () => { mountVideo(); playButton.focus(); });
  [demoLink, fileLink].forEach(link => link.addEventListener("click", pause));
  galleryLink.addEventListener("click", () => minimize(false));
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape" || !opened || event.defaultPrevented || document.fullscreenElement || document.querySelector("dialog[open]")) return;
    event.preventDefault(); minimize();
  });
  // A single media owner across the floating viewer and the original gallery.
  document.addEventListener("play", event => { if (event.target instanceof HTMLVideoElement && event.target !== video) pause(); }, true);
  document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); });
  addEventListener("pagehide", pause); addEventListener("beforeprint", pause);
  document.addEventListener("portfolio-language-change", translate);
  // Collapse only when the window would cover another keyboard-focused control.
  document.addEventListener("focusin", event => {
    if (!opened || root.contains(event.target) || !event.target.getBoundingClientRect) return;
    const a = panel.getBoundingClientRect(), b = event.target.getBoundingClientRect();
    if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) minimize(false);
  });
  // Opening the full-page gallery should not leave a second player over it.
  addEventListener("hashchange", () => { if (films.some(film => "#" + film.id === location.hash)) minimize(false); });
  translate();
  try { root.hidden = sessionStorage.getItem(sessionKey) === "1"; } catch { root.hidden = false; }
})();
