/* Progressive enhancement: all project summaries remain readable without JavaScript. */
(() => {
  "use strict";
  const root = document.querySelector("[data-spotlight]");
  if (!root) return;
  const tablist = root.querySelector("[data-spotlight-tabs]");
  const tabs = [...root.querySelectorAll("[data-spotlight-tab]")];
  const panels = [...root.querySelectorAll("[data-spotlight-panel]")];
  if (!tablist || tabs.length !== panels.length || !tabs.length) return;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0;

  function select(index, focus = false, animate = true) {
    current = (index + tabs.length) % tabs.length;
    tabs.forEach((tab, i) => {
      const active = i === current;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[i].hidden = !active;
      panels[i].classList.remove("is-entering");
    });
    if (animate && !motion.matches && document.documentElement.dataset.readerMotion !== "reduce") {
      panels[current].classList.add("is-entering");
    }
    if (focus) tabs[current].focus();
  }

  tablist.setAttribute("role", "tablist");
  tabs.forEach((tab, i) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panels[i].id);
    panels[i].setAttribute("role", "tabpanel");
    panels[i].setAttribute("aria-labelledby", tab.id);
    tab.addEventListener("click", () => select(i));
    tab.addEventListener("keydown", event => {
      const target = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: tabs.length - 1 }[event.key];
      if (target === undefined) return;
      event.preventDefault();
      select(target, true);
    });
  });
  select(0, false, false);
  root.dataset.enhanced = "true";
  tablist.hidden = false;
})();
