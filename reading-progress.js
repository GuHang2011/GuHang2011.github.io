/* Scroll position, not a read/completion tracker. No persistence or analytics. */
(() => {
  "use strict";
  const strip = document.querySelector("[data-browse-progress]");
  const header = document.querySelector(".site-header");
  const main = document.querySelector("main");
  if (!strip || !header || !main) return;
  const meter = strip.querySelector('[role="progressbar"]');
  const fill = strip.querySelector("[data-browse-fill]");
  const percent = strip.querySelector("[data-browse-percent]");
  const current = strip.querySelector("[data-browse-section]");
  if (!meter || !fill || !percent || !current) return;
  const sections = [
    ["about", "About", "关于我"], ["work", "Projects", "工程项目"],
    ["demos", "Live demos", "在线体验"], ["research", "Research", "研究工作"],
    ["notebook", "Learning", "学习记录"], ["background", "Experience", "教育与经历"],
    ["skills", "Skills", "技术能力"], ["contact", "Contact", "联系信息"],
  ].map(([id,en,zh]) => ({element:document.getElementById(id),en,zh})).filter(item => item.element);
  let queued = false;
  let measuredHeader = 0;
  function update() {
    queued = false;
    const viewport = document.documentElement.clientHeight || innerHeight;
    const scrolling = document.scrollingElement || document.documentElement;
    const max = Math.max(0, scrolling.scrollHeight - viewport);
    const top = Math.max(0, scrolling.scrollTop);
    const ratio = max <= 1 ? 1 : Math.min(1, top / max);
    // Keep 100% for the actual bottom, rather than rounding up before it.
    const value = max <= 1 || max - top <= 1 ? 100 : Math.min(99, Math.round(ratio * 100));
    const height = Math.ceil(header.getBoundingClientRect().height);
    if (height && measuredHeader !== height) {
      measuredHeader = height;
      document.documentElement.style.setProperty("--reading-header-height", height + "px");
    }
    const marker = Math.min(viewport * .5, height + 32);
    const available = sections.filter(item => item.element.getClientRects().length);
    let selected = available[0];
    for (const item of available) {
      if (item.element.getBoundingClientRect().top <= marker) selected = item;
    }
    // At the bottom of a long page the footer can prevent the final section reaching the marker.
    if (value === 100 && max > 1) selected = available.at(-1);
    const zh = document.documentElement.lang.startsWith("zh");
    const label = selected ? selected[zh ? "zh" : "en"] : (zh ? "首页" : "Home");
    fill.style.transform = `scaleX(${ratio})`;
    meter.setAttribute("aria-valuenow", String(value));
    meter.setAttribute("aria-valuetext", zh ? `${value}%，当前：${label}` : `${value}%, viewing ${label}`);
    percent.firstChild.nodeValue = String(value);
    current.textContent = label;
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
      if (selected && link.hash === "#" + selected.element.id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }
  strip.hidden = false;
  update();
  addEventListener("scroll", schedule, {passive:true});
  addEventListener("resize", schedule, {passive:true});
  addEventListener("pageshow", schedule);
  addEventListener("hashchange", schedule);
  document.addEventListener("portfolio-language-change", schedule);
  document.addEventListener("visibilitychange", schedule);
  document.addEventListener("load", schedule, true);
  document.addEventListener("toggle", schedule, true);
  document.addEventListener("input", schedule);
  document.addEventListener("click", schedule);
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(schedule);
    for (const node of [document.body, main, header]) observer.observe(node);
  }
  document.fonts?.ready.then(schedule);
})();
