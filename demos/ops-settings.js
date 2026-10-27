"use strict";
(() => {
  const system = matchMedia('(prefers-reduced-motion: reduce)');
  const checkbox = document.querySelector('[data-ops-motion]');
  let preference = false;
  try { preference = localStorage.getItem('hang-gu-reader-motion') === 'reduce'; } catch { /* Preference storage is optional. */ }
  function render() {
    document.documentElement.dataset.readerMotion = preference || system.matches ? 'reduce' : 'full';
    checkbox.checked = preference || system.matches;
    checkbox.disabled = system.matches;
  }
  checkbox.addEventListener('change', () => {
    preference = checkbox.checked; render();
    try { localStorage.setItem('hang-gu-reader-motion', preference ? 'reduce' : 'full'); } catch { /* Controls still work. */ }
  });
  system.addEventListener('change', render);
  render();
})();
