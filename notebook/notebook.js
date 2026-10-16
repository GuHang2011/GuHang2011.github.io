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
    const normalize = value => value.normalize("NFKC").trim().toLowerCase();
    let topic = "all";
    let urlTimer;
    function readURL() {
      const params = new URL(location.href).searchParams;
      topic = buttons.some(b => b.dataset.noteTopic === params.get("topic")) ? params.get("topic") : "all";
      input.value = params.get("q") || "";
    }
    function writeURL() {
      const url = new URL(location.href);
      if (topic === "all") url.searchParams.delete("topic"); else url.searchParams.set("topic", topic);
      if (input.value.trim()) url.searchParams.set("q", input.value.trim()); else url.searchParams.delete("q");
      try { history.replaceState(null, "", url); } catch { /* Filtering still works without history access. */ }
    }
    function filter() {
      const terms = normalize(input.value).split(/\s+/u).filter(Boolean);
      rows.forEach(row => { row.hidden = (topic !== "all" && row.dataset.topic !== topic) || !terms.every(term => normalize(row.dataset.search).includes(term)); });
      buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.noteTopic === topic)));
      const visible = rows.filter(row => !row.hidden).length;
      count.textContent = text(`${visible} of ${rows.length} notes`, `${visible} / ${rows.length} 篇笔记`);
      empty.hidden = visible > 0;
      clear.disabled = input.value.length === 0;
    }
    tools.hidden = false;
    readURL();
    filter();
    tools.addEventListener("submit", event => { event.preventDefault(); clearTimeout(urlTimer); writeURL(); });
    buttons.forEach(button => button.addEventListener("click", () => { topic = button.dataset.noteTopic; clearTimeout(urlTimer); filter(); writeURL(); }));
    input.addEventListener("input", () => { filter(); clearTimeout(urlTimer); urlTimer = setTimeout(writeURL, 250); });
    clear.addEventListener("click", () => { input.value = ""; clearTimeout(urlTimer); filter(); writeURL(); input.focus(); });
    document.querySelector("[data-note-reset]").addEventListener("click", () => { topic = "all"; input.value = ""; clearTimeout(urlTimer); filter(); writeURL(); input.focus(); });
    addEventListener("popstate", () => { clearTimeout(urlTimer); readURL(); filter(); });
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
  if (toc.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!current) return;
      toc.forEach(link => { if (link.hash === `#${current.target.id}`) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current"); });
    }, { rootMargin: "-100px 0px -55% 0px", threshold: 0 });
    toc.forEach(link => { const target = document.getElementById(link.hash.slice(1)); if (target) observer.observe(target); });
  }
})();
