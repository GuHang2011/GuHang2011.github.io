"use strict";

(() => {
  const tools = document.querySelector("[data-shot-tools]");
  const search = document.querySelector("#shot-search");
  const grid = document.querySelector("#shot-results");
  const cards = [...document.querySelectorAll(".shot-card")];
  const buttons = [...document.querySelectorAll("[data-shot-category]")];
  const count = document.querySelector("[data-shot-count]");
  const empty = document.querySelector("[data-shot-empty]");
  const anchorNote = document.querySelector("[data-shot-anchor-note]");
  if (!tools || !search || !grid || !cards.length) return;

  const normalize = value => value.normalize("NFKC").toLowerCase().trim();
  // Index both languages before the reader replaces visible text.
  const text = new Map(cards.map(card => [card, normalize([
    card.id,
    card.dataset.shotKeywords || "",
    ...[...card.querySelectorAll("h2, .shot-context")].flatMap(node => [node.textContent, node.dataset.zh || "", node.dataset.en || ""]),
  ].join(" "))]));
  const categories = new Set(buttons.map(button => button.dataset.shotCategory));
  let category = "all";
  let timer;
  let anchorRevealed = false;
  const chinese = () => document.documentElement.lang.startsWith("zh");

  function hashCard() {
    try {
      const id = decodeURIComponent(location.hash.slice(1));
      return cards.find(card => card.id === id);
    } catch { return undefined; }
  }

  function matches(card) {
    const terms = normalize(search.value).split(/\s+/u).filter(Boolean);
    return (category === "all" || card.dataset.shotGroup === category) && terms.every(term => text.get(card).includes(term));
  }

  function render() {
    cards.forEach(card => { card.hidden = !matches(card); });
    const visible = cards.filter(card => !card.hidden).length;
    buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.shotCategory === category)));
    count.textContent = chinese() ? `显示 ${visible} / ${cards.length} 个项目` : `Showing ${visible} of ${cards.length} projects`;
    empty.hidden = visible !== 0;
    anchorNote.hidden = !anchorRevealed;
    anchorNote.textContent = chinese()
      ? "已清除筛选，显示链接指定的项目。"
      : "Filters cleared to show the project specified by this link.";
    tools.querySelector("[data-shot-reset]").disabled = !search.value && category === "all";
  }

  function writeURL(method = "pushState") {
    const url = new URL(location.href);
    if (search.value.trim()) url.searchParams.set("q", search.value.trim()); else url.searchParams.delete("q");
    if (category !== "all") url.searchParams.set("category", category); else url.searchParams.delete("category");
    // An explicitly changed filter supersedes a previously opened project anchor.
    if (hashCard()?.hidden) url.hash = "";
    if (url.href === location.href) return;
    try { history[method](history.state, "", url); } catch { /* Filtering still works when URL writes are unavailable. */ }
  }

  function readURL() {
    clearTimeout(timer);
    const params = new URL(location.href).searchParams;
    search.value = params.get("q") || "";
    category = categories.has(params.get("category")) ? params.get("category") : "all";
    const target = hashCard();
    anchorRevealed = Boolean(target && !matches(target));
    if (anchorRevealed) {
      search.value = "";
      category = "all";
    }
    render();
    if (anchorRevealed) writeURL("replaceState");
    if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior: "instant" }));
  }

  function change() {
    anchorRevealed = false;
    render();
  }

  search.addEventListener("input", event => {
    clearTimeout(timer);
    change();
    if (!event.isComposing) timer = setTimeout(() => writeURL(), 350);
  });
  search.addEventListener("compositionend", () => {
    clearTimeout(timer);
    change();
    timer = setTimeout(() => writeURL(), 350);
  });
  tools.addEventListener("submit", event => {
    event.preventDefault();
    clearTimeout(timer);
    change();
    writeURL();
  });
  buttons.forEach(button => button.addEventListener("click", () => {
    clearTimeout(timer);
    category = button.dataset.shotCategory;
    change();
    writeURL();
  }));
  document.querySelectorAll("[data-shot-reset]").forEach(button => button.addEventListener("click", () => {
    clearTimeout(timer);
    search.value = "";
    category = "all";
    change();
    writeURL();
    search.focus({ preventScroll: true });
  }));
  window.addEventListener("popstate", readURL);
  window.addEventListener("hashchange", readURL);
  document.addEventListener("portfolio-language-change", render);
  tools.hidden = false;
  readURL();
})();
