"use strict";

(() => {
  const storageKey = "hang-gu-language";
  let language = "en";
  const progress = document.querySelector(".reading-progress span");
  const menu = document.querySelector(".menu-toggle");
  const header = document.querySelector(".site-header");
  const filterState = { publications: "all", projects: "all" };

  function updateCounts() {
    for (const [group, filter] of Object.entries(filterState)) {
      const items = [...document.querySelectorAll(`[data-collection="${group}"] [data-category]`)];
      let visible = 0;
      items.forEach(item => {
        item.hidden = filter !== "all" && item.dataset.category !== filter;
        if (!item.hidden) visible += 1;
      });
      const label = document.querySelector(`[data-count="${group}"]`);
      if (label) label.textContent = language === "zh" ? `${visible} 项` : `${visible} items`;
    }
  }

  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-en][data-zh]").forEach(el => { el.textContent = el.dataset[next]; });
    document.querySelectorAll("[data-en-label][data-zh-label]").forEach(el => {
      el.setAttribute("aria-label", el.dataset[`${next}Label`]);
    });
    document.querySelectorAll("[data-language]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.language === next));
    });
    for (const [selector, en, zh] of [
      [".menu-toggle", "Menu", "菜单"],
      [".back-top", "Back to top", "返回顶部"],
      [".lightbox-close", "Close preview", "关闭预览"],
      [".lightbox", "Project screenshot", "项目截图"],
    ]) {
      const element = document.querySelector(selector);
      if (!element) continue;
      element.setAttribute("aria-label", next === "zh" ? zh : en);
      if (element.hasAttribute("title")) element.title = next === "zh" ? zh : en;
    }
    document.title = document.documentElement.dataset[next === "zh" ? "titleZh" : "titleEn"] || (next === "zh" ? "顾航 | 学术研究与工程实践" : "Hang Gu | Research & Engineering");
    updateCounts();
    document.dispatchEvent(new CustomEvent("portfolio-language-change", { detail: { language: next } }));
    try { localStorage.setItem(storageKey, next); } catch { /* Storage is optional. */ }
  }

  document.querySelectorAll("[data-language]").forEach(button => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });
  try { if (localStorage.getItem(storageKey) === "zh") language = "zh"; } catch { /* Keep English by default. */ }
  setLanguage(language);

  document.querySelectorAll("[data-filter-group]").forEach(group => {
    const name = group.dataset.filterGroup;
    group.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        filterState[name] = button.dataset.filter;
        group.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b === button)));
        updateCounts();
      });
    });
  });

  function closeMenu() {
    if (header) header.dataset.open = "false";
    menu?.setAttribute("aria-expanded", "false");
  }
  menu?.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    header.dataset.open = String(open);
  });
  document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && header?.dataset.open === "true") { closeMenu(); menu?.focus(); }
  });
  let printDetails = [];
  addEventListener("beforeprint", () => {
    printDetails = [...document.querySelectorAll("details")].map(element => [element, element.open]);
    printDetails.forEach(([element]) => { element.open = true; });
  });
  addEventListener("afterprint", () => {
    printDetails.forEach(([element, open]) => { element.open = open; });
    printDetails = [];
  });
  document.querySelector("[data-print]")?.addEventListener("click", () => window.print());
  document.querySelector(".back-top")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  });

  const lightbox = document.querySelector(".lightbox");
  document.querySelectorAll("[data-preview]").forEach(button => {
    button.addEventListener("click", () => {
      lightbox.querySelector(".lightbox-image").src = button.dataset.preview;
      lightbox.querySelector(".lightbox-image").alt = button.querySelector("img").alt;
      lightbox.querySelector("p").textContent = button.querySelector("img").alt;
      lightbox.showModal();
    });
  });
  lightbox?.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox?.addEventListener("click", event => { if (event.target === lightbox) lightbox.close(); });

  let queued = false;
  function scrollState() {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    document.querySelector(".back-top")?.classList.toggle("shown", scrollY > 500);
    queued = false;
  }
  addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(scrollState); } }, { passive: true });
  addEventListener("resize", scrollState);
  scrollState();
  if ("IntersectionObserver" in window) {
    const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -65% 0px" });
    links.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
  }
})();
