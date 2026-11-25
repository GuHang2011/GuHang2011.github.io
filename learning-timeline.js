/* Entries are ordinary links; filtering is optional progressive enhancement. */
(() => {
  "use strict";
  const root = document.getElementById("learning-timeline");
  if (!root) return;
  const controls = root.querySelector("[data-timeline-controls]");
  const entries = [...root.querySelectorAll("[data-timeline-entry]")];
  const buttons = [...root.querySelectorAll("[data-timeline-filter]")];
  const more = root.querySelector("[data-timeline-more]");
  const count = root.querySelector("[data-timeline-count]");
  if (!controls || !entries.length || !more || !count) return;
  let topic = "all";
  let expanded = false;
  function linkedEntry() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return null; }
    return entries.find(entry => entry.id === id);
  }
  function writeView() {
    const url = new URL(location.href);
    if (topic === "all" && !expanded) url.searchParams.delete("timeline");
    else url.searchParams.set("timeline", topic);
    const entry = linkedEntry();
    if (!entry || entry.hidden) url.hash = root.id;
    if (url.href !== location.href) {
      try { history.pushState(history.state, "", url); } catch { /* The controls still work locally. */ }
    }
  }
  function update(animate = false) {
    const zh = document.documentElement.lang.startsWith("zh");
    const matches = entries.filter(el => topic === "all" || el.dataset.timelineTopic === topic);
    const visible = topic === "all" && !expanded ? matches.slice(0, 3) : matches;
    entries.forEach(el => {
      const wasHidden = el.hidden;
      el.hidden = !visible.includes(el);
      el.classList.toggle("is-last", el === visible.at(-1));
      el.classList.toggle("is-new", animate && wasHidden && !el.hidden);
    });
    buttons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.timelineFilter === topic)));
    count.textContent = zh ? `显示 ${visible.length} / ${matches.length} 条` : `${visible.length} of ${matches.length} entries`;
    more.hidden = topic !== "all" || matches.length <= 3;
    more.setAttribute("aria-expanded", String(expanded));
    more.textContent = expanded
      ? (zh ? "收起更早记录" : "Show recent entries")
      : (zh ? `展开更早 ${Math.max(0, matches.length - 3)} 条记录` : `Show ${Math.max(0, matches.length - 3)} earlier entries`);
  }
  buttons.forEach(button => button.addEventListener("click", () => {
    topic = button.dataset.timelineFilter;
    expanded = false;
    update(true);
    writeView();
  }));
  more.addEventListener("click", () => {
    expanded = !expanded;
    update(true);
    writeView();
    // Continue reading at the first newly revealed item, without losing keyboard position.
    if (expanded) entries[3]?.querySelector("a")?.focus({preventScroll:true});
  });
  function restoreView() {
    const requested = new URL(location.href).searchParams.get("timeline");
    topic = buttons.some(button => button.dataset.timelineFilter === requested) ? requested : "all";
    expanded = requested === "all";
    const target = linkedEntry();
    if (target && topic !== target.dataset.timelineTopic) {
      topic = "all";
      expanded = expanded || entries.indexOf(target) >= 3;
    }
    update();
    if (target) target.scrollIntoView({behavior:"instant",block:"start"});
  }
  controls.hidden = false;
  restoreView();
  addEventListener("hashchange", restoreView);
  addEventListener("popstate", restoreView);
  document.addEventListener("portfolio-language-change", () => update());
})();
