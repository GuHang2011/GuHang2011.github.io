"use strict";

(() => {
  const carousel = document.querySelector("[data-highlight-carousel]");
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll("[data-highlight-slide]")];
  const dots = [...carousel.querySelectorAll("[data-highlight-dot]")];
  if (!slides.length || slides.length !== dots.length) return;
  const rotation = carousel.querySelector("[data-highlight-rotation]");
  const current = carousel.querySelector("[data-highlight-current]");
  const status = carousel.querySelector("[data-highlight-status]");
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = () => media.matches || document.documentElement.dataset.readerMotion === "reduce";
  let index = 0, timer = 0, pointer = null;
  let userPaused = false, hovering = false, focused = false;
  let inView = !("IntersectionObserver" in window);

  slides.forEach((slide, i) => {
    slide.setAttribute("role", "tabpanel");
    slide.setAttribute("aria-labelledby", dots[i].id);
    slide.removeAttribute("aria-roledescription");
    slide.removeAttribute("aria-posinset");
    slide.removeAttribute("aria-setsize");
    dots[i].setAttribute("aria-controls", slide.id);
  });

  function select(value) {
    index = (value + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.inert = !active;
    });
    dots.forEach((dot, i) => {
      dot.setAttribute("aria-selected", String(i === index));
      dot.tabIndex = i === index ? 0 : -1;
    });
    current.textContent = String(index + 1).padStart(2, "0");
    carousel.dataset.highlightCurrent = String(index + 1);
  }

  function sync() {
    clearInterval(timer);
    timer = 0;
    const blocked = reduced();
    const running = !blocked && !userPaused && !hovering && !focused && !document.hidden && inView;
    carousel.dataset.rotation = running ? "running" : "paused";
    status.setAttribute("aria-live", running ? "off" : "polite");
    rotation.disabled = blocked;
    rotation.dataset.en = blocked ? "Motion reduced" : userPaused ? "Start autoplay" : "Pause autoplay";
    rotation.dataset.zh = blocked ? "已减少动态" : userPaused ? "开启自动播放" : "暂停自动播放";
    rotation.textContent = rotation.dataset[document.documentElement.lang.startsWith("zh") ? "zh" : "en"];
    if (running) timer = setInterval(() => select(index + 1), 6800);
  }

  function navigate(value) { userPaused = true; sync(); select(value); }
  carousel.querySelector("[data-highlight-prev]").addEventListener("click", () => navigate(index - 1));
  carousel.querySelector("[data-highlight-next]").addEventListener("click", () => navigate(index + 1));
  rotation.addEventListener("click", () => { userPaused = !userPaused; sync(); });
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => navigate(i));
    dot.addEventListener("keydown", event => {
      const target = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: slides.length - 1 }[event.key];
      if (target === undefined) return;
      event.preventDefault(); navigate(target); dots[index].focus();
    });
  });
  carousel.addEventListener("keydown", event => {
    if (event.target !== carousel) return;
    const target = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: slides.length - 1 }[event.key];
    if (target !== undefined) { event.preventDefault(); navigate(target); }
  });
  carousel.addEventListener("mouseenter", () => { hovering = true; sync(); });
  carousel.addEventListener("mouseleave", () => { hovering = false; sync(); });
  carousel.addEventListener("focusin", () => { focused = true; sync(); });
  carousel.addEventListener("focusout", event => { focused = carousel.contains(event.relatedTarget); sync(); });
  carousel.addEventListener("pointerdown", event => {
    if (event.pointerType !== "touch" || event.target.closest("a, button, input")) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
  });
  carousel.addEventListener("pointerup", event => {
    const start = pointer; pointer = null;
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy) * 1.5) navigate(index + (dx < 0 ? 1 : -1));
  });
  carousel.addEventListener("pointercancel", () => { pointer = null; });
  document.addEventListener("visibilitychange", sync);
  document.addEventListener("portfolio-language-change", sync);
  media.addEventListener("change", sync);
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ["data-reader-motion"] });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); }, { threshold: 0.15 }).observe(carousel);
  }
  carousel.dataset.enhanced = "true";
  carousel.querySelector("[data-highlight-controls]").hidden = false;
  select(0); sync();
})();
