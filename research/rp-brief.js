(() => {
  'use strict';
  // Deep links reveal the question they name; native details work without JS.
  const revealHash = () => {
    const id = location.hash.slice(1);
    const target = document.getElementById(id);
    if (target?.matches('details.rp-question')) {
      target.open = true;
      requestAnimationFrame(() => target.scrollIntoView({block: 'start', behavior: 'instant'}));
    }
  };
  window.addEventListener('hashchange', revealHash);
  document.querySelectorAll('a[href^="#rq-"]').forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (target) target.open = true;
    });
  });
  revealHash();
  // Include evidence in print, then restore the reader's disclosure state.
  let printState = null;
  window.addEventListener('beforeprint', () => {
    if (printState) return;
    printState = [...document.querySelectorAll('details')].map(el => [el, el.open]);
    printState.forEach(([el]) => { el.open = true; });
  });
  window.addEventListener('afterprint', () => {
    printState?.forEach(([el, wasOpen]) => { el.open = wasOpen; });
    printState = null;
  });
})();
