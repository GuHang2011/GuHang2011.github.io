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
  }));
  more.addEventListener("click", () => {
    expanded = !expanded;
    update(true);
    // Continue reading at the first newly revealed item, without losing keyboard position.
    if (expanded) entries[3]?.querySelector("a")?.focus({preventScroll:true});
  });
  function revealAnchor() {
    const target = entries.find(el => "#" + el.id === location.hash);
    if (!target) return;
    topic = "all"; expanded = true; update();
    target.scrollIntoView({behavior:"instant",block:"start"});
  }
  controls.hidden = false;
  update();
  revealAnchor();
  addEventListener("hashchange", revealAnchor);
  document.addEventListener("portfolio-language-change", () => update());
})();
