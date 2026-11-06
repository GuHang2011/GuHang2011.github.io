/* Preserve old entry points while the homepage becomes a shorter selection. */
(() => {
  'use strict';
  const data = document.getElementById('legacy-home-routes');
  if (!data) return;
  let routes = {};
  try { routes = JSON.parse(data.textContent); } catch { return; }
  function migrate() {
    const current = new URL(location.href);
    let id = '';
    try { id = decodeURIComponent(current.hash.slice(1)); } catch { return; }
    if (['project','project-q','projects'].some(key => current.searchParams.has(key))) {
      const target = new URL('projects.html', current);
      for (const key of ['project','project-q','projects']) {
        if (current.searchParams.has(key)) target.searchParams.set(key,current.searchParams.get(key));
      }
      target.hash = id && routes[id]?.startsWith('projects.html#') ? '#' + id : '#work';
      location.replace(target); return;
    }
    if (current.searchParams.has('notes') || current.searchParams.has('notes-q')) {
      const target = new URL('notebook/',current), topic = current.searchParams.get('notes');
      if (topic && !['recent','all'].includes(topic)) target.searchParams.set('topic',topic);
      if (current.searchParams.has('notes-q')) target.searchParams.set('q',current.searchParams.get('notes-q'));
      location.replace(target); return;
    }
    if (!id || document.getElementById(id) || !routes[id]) return;
    const target = new URL(routes[id],current);
    if (target.origin === current.origin) location.replace(target);
  }
  migrate();
  addEventListener('hashchange',migrate);
  // Make the timeline discoverable from an older deep link, even inside a disclosure.
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reduce.matches && document.documentElement.dataset.readerMotion !== 'reduce') {
    document.body.classList.add('folio-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-entering');
        observer.unobserve(entry.target);
      });
    },{threshold:.08});
    document.querySelectorAll('.work-feature').forEach(el => observer.observe(el));
  }
})();
