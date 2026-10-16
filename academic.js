"use strict";

(() => {
  const storageKey = "hang-gu-language";
  let language = "en";
  const progress = document.querySelector(".reading-progress span");
  const menu = document.querySelector(".menu-toggle");
  const header = document.querySelector(".site-header");
  const filterState = { publications: "all", projects: "all" };
  const projectSearch = document.querySelector("#project-search");
  const clearSearch = document.querySelector("[data-clear-search]");
  // Keep both languages searchable when the visible language changes.
  const projectText = new Map([...document.querySelectorAll('[data-collection="projects"] [data-category]')].map(item => {
    const translations = [...item.querySelectorAll("[data-en][data-zh]")].flatMap(element => [element.dataset.en, element.dataset.zh]);
    return [item, [item.textContent, ...translations].join(" ").normalize("NFKC").toLowerCase()];
  }));

  function updateCounts() {
    const query = (projectSearch?.value || "").normalize("NFKC").trim().toLowerCase();
    const terms = query.split(/\s+/u).filter(Boolean);
    for (const [group, filter] of Object.entries(filterState)) {
      const items = [...document.querySelectorAll(`[data-collection="${group}"] [data-category]`)];
      items.forEach(item => {
        const matchesQuery = group !== "projects" || terms.every(term => projectText.get(item).includes(term));
        item.hidden = (filter !== "all" && item.dataset.category !== filter) || !matchesQuery;
        item.classList.remove("first-visible", "last-visible");
      });
      const visible = items.filter(item => !item.hidden);
      visible[0]?.classList.add("first-visible");
      visible.at(-1)?.classList.add("last-visible");
      const label = document.querySelector(`[data-count="${group}"]`);
      if (label) label.textContent = language === "zh" ? `${visible.length} / ${items.length} 项` : `${visible.length} / ${items.length} items`;
      if (group === "projects") {
        const empty = document.querySelector("[data-project-empty]");
        if (empty) empty.hidden = visible.length > 0;
      }
    }
    if (clearSearch) clearSearch.disabled = !projectSearch.value;
  }

  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-en][data-zh]").forEach(el => { el.textContent = el.dataset[next]; });
    document.querySelectorAll("[data-en-label][data-zh-label]").forEach(el => {
      el.setAttribute("aria-label", el.dataset[`${next}Label`]);
    });
    document.querySelectorAll("[data-en-placeholder][data-zh-placeholder]").forEach(el => {
      el.placeholder = el.dataset[`${next}Placeholder`];
    });
    document.querySelectorAll("[data-language]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.language === next));
    });
    for (const [selector, en, zh] of [
      [".menu-toggle", "Menu", "菜单"],
      [".back-top", "Back to top", "返回顶部"],
      [".lightbox-close", "Close preview", "关闭预览"],
      [".lightbox", "Project screenshot", "项目截图"],
      [".search-clear", "Clear search", "清除搜索"],
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
  projectSearch?.addEventListener("input", updateCounts);
  clearSearch?.addEventListener("click", () => {
    projectSearch.value = "";
    updateCounts();
    projectSearch.focus();
  });
  function resetProjects() {
    filterState.projects = "all";
    if (projectSearch) projectSearch.value = "";
    document.querySelectorAll('[data-filter-group="projects"] button').forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === "all"));
    });
    updateCounts();
  }
  document.querySelector("[data-reset-projects]")?.addEventListener("click", () => {
    resetProjects();
    projectSearch?.focus();
  });
  document.querySelectorAll('.project-routes a[href^="#"]').forEach(link => {
    link.addEventListener("click", resetProjects);
  });

  document.querySelectorAll("[data-video-gallery]").forEach(gallery => {
    const tabList = gallery.querySelector("[data-video-tabs]");
    const tabs = [...gallery.querySelectorAll("[data-video-tab]")];
    const panels = [...gallery.querySelectorAll("[data-video-panel]")];
    function pauseVideo(video) {
      if (video && !video.paused) video.pause();
    }
    function selectFilm(index, focus = false) {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        const panel = panels.find(item => item.id === tab.dataset.videoTab);
        panel.hidden = !selected;
        if (!selected) pauseVideo(panel.querySelector("video"));
      });
      if (focus) tabs[index].focus();
    }
    tabs.forEach((tab, index) => {
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", tab.dataset.videoTab);
      const panel = panels.find(item => item.id === tab.dataset.videoTab);
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tab.id);
      panel.tabIndex = 0;
      tab.addEventListener("click", () => selectFilm(index));
      tab.addEventListener("keydown", event => {
        let next;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        selectFilm(next, true);
      });
    });
    gallery.querySelectorAll("video").forEach(video => {
      video.addEventListener("play", () => {
        gallery.querySelectorAll("video").forEach(other => { if (other !== video) pauseVideo(other); });
      });
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) gallery.querySelectorAll("video").forEach(pauseVideo);
    });
    tabList.setAttribute("role", "tablist");
    tabList.hidden = false;
    gallery.dataset.enhanced = "true";
    function selectLinkedFilm() {
      const index = tabs.findIndex(tab => `#${tab.dataset.videoTab}` === location.hash);
      if (index >= 0) selectFilm(index);
    }
    selectFilm(0);
    selectLinkedFilm();
    addEventListener("hashchange", selectLinkedFilm);
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
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.readerMotion === "reduce";
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
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
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    if (!reducedMotion.matches) {
      const reveal = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          reveal.unobserve(entry.target);
        });
      }, { threshold: 0.08 });
      document.documentElement.classList.add("js");
      document.querySelectorAll(".project-item, .demo-entry, .note-entry").forEach(item => {
        item.classList.add("reveal-ready");
        reveal.observe(item);
      });
      reducedMotion.addEventListener("change", event => {
        if (event.matches) document.querySelectorAll(".reveal-ready").forEach(item => item.classList.add("is-visible"));
      });
    }
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
