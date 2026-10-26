"use strict";

(() => {
  const carousel = document.querySelector("[data-highlight-carousel]");
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll("[data-highlight-slide]")];
  const dots = [...carousel.querySelectorAll("[data-highlight-dot]")];
  const previous = carousel.querySelector("[data-highlight-prev]");
  const next = carousel.querySelector("[data-highlight-next]");
  const current = carousel.querySelector("[data-highlight-current]");
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.readerMotion === "reduce";
  let index = 0;
  let timer = 0;
  let paused = false;
  let pointerStart = null;

  slides.forEach((slide, slideIndex) => {
    const dot = dots[slideIndex];
    if (!slide.id) slide.id = `highlight-slide-${slideIndex + 1}`;
    slide.setAttribute("aria-posinset", String(slideIndex + 1));
    slide.setAttribute("aria-setsize", String(slides.length));
    if (dot) {
      if (!dot.id) dot.id = `highlight-dot-${slideIndex + 1}`;
      dot.setAttribute("aria-controls", slide.id);
      slide.setAttribute("aria-labelledby", dot.id);
    }
  });

  function select(nextIndex, announce = true) {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.setAttribute("aria-selected", String(active));
      dot.tabIndex = active ? 0 : -1;
    });
    if (current) current.textContent = String(index + 1).padStart(2, "0");
    if (announce) carousel.dataset.highlightCurrent = String(index + 1);
  }

  function stopTimer() {
    if (timer) window.clearInterval(timer);
    timer = 0;
  }

  function startTimer() {
    stopTimer();
    if (reduceMotion() || paused || slides.length < 2) return;
    timer = window.setInterval(() => select(index + 1), 6800);
  }

  function restartTimer() {
    if (!paused) startTimer();
  }

  previous?.addEventListener("click", () => { select(index - 1); restartTimer(); });
  next?.addEventListener("click", () => { select(index + 1); restartTimer(); });
  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => { select(dotIndex); restartTimer(); });
    dot.addEventListener("keydown", event => {
      let target;
      if (event.key === "ArrowRight") target = dotIndex + 1;
      else if (event.key === "ArrowLeft") target = dotIndex - 1;
      else if (event.key === "Home") target = 0;
      else if (event.key === "End") target = slides.length - 1;
      else return;
      event.preventDefault();
      select(target);
      dots[(target + slides.length) % slides.length].focus();
      restartTimer();
    });
  });

  carousel.addEventListener("keydown", event => {
    if (event.target !== carousel) return;
    if (event.key === "ArrowRight") { event.preventDefault(); select(index + 1); restartTimer(); }
    if (event.key === "ArrowLeft") { event.preventDefault(); select(index - 1); restartTimer(); }
  });
  carousel.addEventListener("mouseenter", () => { paused = true; stopTimer(); });
  carousel.addEventListener("mouseleave", () => { paused = false; startTimer(); });
  carousel.addEventListener("focusin", stopTimer);
  carousel.addEventListener("focusout", event => {
    if (!carousel.contains(event.relatedTarget)) startTimer();
  });
  carousel.addEventListener("pointerdown", event => { pointerStart = event.clientX; });
  carousel.addEventListener("pointerup", event => {
    if (pointerStart === null) return;
    const distance = event.clientX - pointerStart;
    pointerStart = null;
    if (Math.abs(distance) < 45) return;
    select(distance > 0 ? index - 1 : index + 1);
    restartTimer();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopTimer();
    else startTimer();
  });
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change", startTimer);

  select(0, false);
  startTimer();
})();
