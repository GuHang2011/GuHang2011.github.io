"use strict";

(() => {
  const root = document.documentElement;
  const keys = { theme: "hang-gu-reader-theme", motion: "hang-gu-reader-motion" };

  function readPreference(key, choices, fallback) {
    try {
      const value = localStorage.getItem(key);
      return choices.includes(value) ? value : fallback;
    } catch { return fallback; }
  }

  function savePreference(key, value) {
    try { localStorage.setItem(key, value); } catch { /* Reading controls also work without storage. */ }
  }

  let theme = readPreference(keys.theme, ["light", "dark"], "light");
  let motion = readPreference(keys.motion, ["full", "reduce"], "full");
  const systemMotion = typeof matchMedia === "function" ? matchMedia("(prefers-reduced-motion: reduce)") : null;
  const settings = document.querySelector("[data-reader-settings]");
  const toggle = settings?.querySelector("[data-reader-toggle]");
  const panel = settings?.querySelector("[data-reader-panel]");
  const themes = settings ? [...settings.querySelectorAll("[data-reader-theme]")] : [];
  const motionControl = settings?.querySelector("[data-reduce-motion]");
  const systemNote = document.getElementById("motion-system-note");

  function applyTheme() {
    root.dataset.readerTheme = theme;
    themes.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.readerTheme === theme)));
  }

  function applyMotion() {
    const systemReduced = Boolean(systemMotion?.matches);
    const reduced = systemReduced || motion === "reduce";
    root.dataset.readerMotion = reduced ? "reduce" : "full";
    if (motionControl) {
      motionControl.checked = reduced;
      motionControl.disabled = systemReduced;
      const descriptions = new Set((motionControl.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean));
      descriptions.delete("motion-system-note");
      if (systemReduced && systemNote) descriptions.add("motion-system-note");
      if (descriptions.size) motionControl.setAttribute("aria-describedby", [...descriptions].join(" "));
      else motionControl.removeAttribute("aria-describedby");
    }
    if (systemNote) systemNote.hidden = !systemReduced;
  }

  applyTheme();
  applyMotion();
  if (systemMotion?.addEventListener) systemMotion.addEventListener("change", applyMotion);
  else if (systemMotion?.addListener) systemMotion.addListener(applyMotion);

  themes.forEach(button => {
    button.addEventListener("click", () => {
      if (!["light", "dark"].includes(button.dataset.readerTheme)) return;
      theme = button.dataset.readerTheme;
      applyTheme();
      savePreference(keys.theme, theme);
    });
  });

  motionControl?.addEventListener("change", () => {
    if (systemMotion?.matches) { applyMotion(); return; }
    motion = motionControl.checked ? "reduce" : "full";
    applyMotion();
    savePreference(keys.motion, motion);
  });

  if (settings && toggle && panel) {
    function setOpen(open) {
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
    }
    setOpen(false);
    toggle.addEventListener("click", () => setOpen(panel.hidden));
    document.addEventListener("click", event => {
      if (!panel.hidden && !settings.contains(event.target)) setOpen(false);
    });
    document.addEventListener("keydown", event => {
      if (event.key !== "Escape" || panel.hidden) return;
      event.preventDefault();
      setOpen(false);
      toggle.focus();
    });
    settings.hidden = false;
  }

  const abstractToggle = document.querySelector("[data-abstract-toggle]");
  const abstracts = [...document.querySelectorAll("#research details.abstract")];
  if (abstractToggle && abstracts.length) {
    abstracts.forEach((item, index) => {
      if (item.id) return;
      let id = `research-summary-${index + 1}`;
      while (document.getElementById(id)) id += "-detail";
      item.id = id;
    });
    abstractToggle.setAttribute("aria-controls", abstracts.map(item => item.id).join(" "));
    function updateAbstractControl() {
      const allOpen = abstracts.every(item => item.open);
      abstractToggle.setAttribute("aria-expanded", String(allOpen));
      abstractToggle.dataset.en = allOpen ? "Collapse all summaries" : "Expand all summaries";
      abstractToggle.dataset.zh = allOpen ? "收起全部概要" : "展开全部概要";
      abstractToggle.textContent = abstractToggle.dataset[root.lang.startsWith("zh") ? "zh" : "en"];
    }
    abstractToggle.addEventListener("click", () => {
      const open = !abstracts.every(item => item.open);
      abstracts.forEach(item => { item.open = open; });
      updateAbstractControl();
    });
    abstracts.forEach(item => item.addEventListener("toggle", updateAbstractControl));
    document.addEventListener("portfolio-language-change", updateAbstractControl);
    updateAbstractControl();
    abstractToggle.hidden = false;
  }
})();
