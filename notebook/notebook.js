"use strict";
(() => {
  const language = () => document.documentElement.lang.startsWith("zh") ? "zh" : "en";
  const text = (en, zh) => language() === "zh" ? zh : en;
  const tools = document.querySelector("[data-notebook-tools]");
  if (tools) {
    const input = document.querySelector("#note-search");
    const rows = [...document.querySelectorAll("[data-note]")];
    const buttons = [...document.querySelectorAll("[data-note-topic]")];
    const count = document.querySelector("[data-note-count]");
    const clear = document.querySelector("[data-note-clear]");
    const empty = document.querySelector("[data-note-empty]");
    const pagination = document.querySelector("[data-note-pagination]");
    const more = document.querySelector("[data-note-more]");
    const batchSize = 12;
    let limit = batchSize;
    let matches = [];
    const normalize = value => value.normalize("NFKC").trim().toLowerCase();
    let topic = "all";
    let editingSearch = false;
    function readURL() {
      const params = new URL(location.href).searchParams;
      topic = buttons.some(b => b.dataset.noteTopic === params.get("topic")) ? params.get("topic") : "all";
      input.value = params.get("q") || "";
      const requested = Number(params.get("shown"));
      limit = Number.isInteger(requested) && requested > batchSize ? Math.min(requested, rows.length) : batchSize;
    }
    function writeURL(replace = false) {
      const url = new URL(location.href);
      if (topic === "all") url.searchParams.delete("topic"); else url.searchParams.set("topic", topic);
      if (input.value.trim()) url.searchParams.set("q", input.value.trim()); else url.searchParams.delete("q");
      if (limit > batchSize) url.searchParams.set("shown", String(limit)); else url.searchParams.delete("shown");
      if (url.href === location.href) return false;
      try {
        if (replace) history.replaceState(history.state, "", url);
        else history.pushState(history.state, "", url);
        return true;
      } catch { return false; }
    }
    function filter() {
      const terms = normalize(input.value).split(/\s+/u).filter(Boolean);
      matches = rows.filter(row => (topic === "all" || row.dataset.topic === topic) && terms.every(term => normalize(row.dataset.search).includes(term)));
      const shown = new Set(matches.slice(0, limit));
      rows.forEach(row => { row.hidden = !shown.has(row); });
      buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.noteTopic === topic)));
      const visible = rows.filter(row => !row.hidden).length;
      count.textContent = text(`Showing ${visible} of ${matches.length} matching notes`, `找到 ${matches.length} 篇，当前显示 ${visible} 篇`);
      empty.hidden = matches.length > 0;
      pagination.hidden = visible >= matches.length;
      more.textContent = text(`Show ${Math.min(batchSize, matches.length - visible)} more`, `再显示 ${Math.min(batchSize, matches.length - visible)} 篇`);
      clear.disabled = input.value.length === 0;
    }
    tools.hidden = false;
    readURL();
    filter();
    function commitView() {
      editingSearch = false;
      filter();
      writeURL();
    }
    function editSearch(event) {
      limit = batchSize;
      filter();
      // Commit the first edit immediately so even the next click can open an article safely.
      // Further keystrokes refine the same history entry.
      if (!event.isComposing && writeURL(editingSearch)) editingSearch = true;
    }
    tools.addEventListener("submit", event => { event.preventDefault(); commitView(); });
    buttons.forEach(button => button.addEventListener("click", () => { topic = button.dataset.noteTopic; limit = batchSize; commitView(); }));
    input.addEventListener("input", editSearch);
    input.addEventListener("compositionend", editSearch);
    input.addEventListener("blur", () => { editingSearch = false; });
    clear.addEventListener("click", () => { input.value = ""; limit = batchSize; commitView(); input.focus(); });
    document.querySelector("[data-note-reset]").addEventListener("click", () => { topic = "all"; input.value = ""; limit = batchSize; commitView(); input.focus(); });
    more.addEventListener("click", () => {
      const next = matches[limit]?.querySelector("h2 a");
      limit = Math.min(limit + batchSize, matches.length);
      commitView();
      next?.focus();
    });
    addEventListener("popstate", () => { editingSearch = false; readURL(); filter(); });
    document.addEventListener("portfolio-language-change", filter);
  }
  let copyTimer;
  let copyState = null;
  const status = document.querySelector("[data-copy-status]");
  function showCopyStatus() {
    if (!status) return;
    status.textContent = copyState === "ok" ? text("Code copied.", "代码已复制。") : copyState === "error" ? text("Copy unavailable. Select the code and copy it manually.", "无法自动复制，请选中代码后手动复制。") : "";
  }
  if (navigator.clipboard?.writeText) {
    document.querySelectorAll("[data-copy-code]").forEach(button => {
      button.hidden = false;
      button.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(button.closest(".notebook-code").querySelector("code").textContent); copyState = "ok"; }
        catch { copyState = "error"; }
        showCopyStatus();
        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => { copyState = null; showCopyStatus(); }, 5000);
      });
    });
  }
  document.addEventListener("portfolio-language-change", showCopyStatus);
  const directory = document.querySelector(".article-directory");
  if (directory) {
    const narrow = matchMedia("(max-width: 850px)");
    const adjustDirectory = () => { directory.open = !narrow.matches; };
    adjustDirectory();
    narrow.addEventListener("change", adjustDirectory);
  }
  const toc = [...document.querySelectorAll('.article-toc a[href^="#"]')];
  if (toc.length) {
    const entries = toc.map(link => ({ link, section: document.getElementById(link.hash.slice(1)) })).filter(entry => entry.section);
    const header = document.querySelector(".site-header");
    let scheduled = false;
    function updateCurrentSection() {
      scheduled = false;
      if (!entries.length) return;
      // Use the same reading position as anchor navigation, below the fixed header.
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const margin = parseFloat(getComputedStyle(entries[0].section).scrollMarginTop) || 0;
      const marker = Math.max(header?.getBoundingClientRect().bottom || 0, padding) + margin + 1;
      let current = entries[0];
      for (const entry of entries) {
        if (entry.section.getBoundingClientRect().top <= marker) current = entry;
      }
      const scrolling = document.scrollingElement || document.documentElement;
      const max = scrolling.scrollHeight - document.documentElement.clientHeight;
      if (max > 1 && max - scrolling.scrollTop <= 1) current = entries.at(-1);
      toc.forEach(link => { if (link === current.link) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current"); });
    }
    function scheduleCurrentSection() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(updateCurrentSection);
    }
    addEventListener("scroll", scheduleCurrentSection, { passive: true });
    addEventListener("resize", scheduleCurrentSection);
    addEventListener("hashchange", scheduleCurrentSection);
    addEventListener("pageshow", scheduleCurrentSection);
    document.addEventListener("portfolio-language-change", scheduleCurrentSection);
    document.addEventListener("toggle", scheduleCurrentSection, true);
    if ("ResizeObserver" in window) new ResizeObserver(scheduleCurrentSection).observe(document.body);
    document.fonts?.ready.then(scheduleCurrentSection);
    updateCurrentSection();
  }
})();
