"use strict";

(() => {
  const section = document.querySelector('#demos.demo-showcase');
  if (!section) return;
  const gallery = section.querySelector('.experience-gallery');
  const cards = [...gallery.querySelectorAll('[data-demo-group]')];
  const controls = [...section.querySelectorAll('[data-demo-filter]')];
  const result = section.querySelector('[data-demo-result]');
  let selected = 'featured';
  let motionTimer;

  function readView() {
    const requested = new URL(location.href).searchParams.get('demo');
    selected = controls.some(button => button.dataset.demoFilter === requested) ? requested : 'featured';
  }

  function linkedCard(hash) {
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return null; }
    const card = document.getElementById(id)?.closest('[data-demo-group]');
    return cards.includes(card) ? card : null;
  }

  function writeView() {
    const url = new URL(location.href);
    if (selected === 'featured') url.searchParams.delete('demo'); else url.searchParams.set('demo', selected);
    // A newly selected category supersedes an anchor to a card it hides.
    if (linkedCard(url.hash)?.hidden) url.hash = '';
    if (url.href === location.href) return;
    try { history.pushState(history.state, '', url); } catch { /* Local filtering remains available. */ }
  }

  function update(animate = false) {
    let count = 0;
    cards.forEach(card => {
      const matches = selected === 'featured' ? card.dataset.demoFeatured === 'true' : card.dataset.demoGroup === selected;
      card.hidden = !matches;
      if (matches) count++;
    });
    controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.demoFilter === selected)));
    const zh = document.documentElement.lang.startsWith('zh');
    result.textContent = zh ? `显示 ${count} / ${cards.length} 个演示` : `Showing ${count} of ${cards.length} demos`;
    clearTimeout(motionTimer);
    gallery.classList.remove('is-switching');
    const reduced = document.documentElement.dataset.readerMotion === 'reduce' || matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (animate && !reduced) {
      void gallery.offsetWidth;
      gallery.classList.add('is-switching');
      motionTimer = setTimeout(() => gallery.classList.remove('is-switching'), 240);
    }
  }

  function revealHash(hash = location.hash, scroll = true) {
    const card = linkedCard(hash);
    if (!card) return;
    if (card.hidden) {
      selected = card.dataset.demoGroup;
      update();
    }
    if (scroll) requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1))).scrollIntoView({block:'start',behavior:'instant'}));
  }

  controls.forEach(button => button.addEventListener('click', () => {
    if (button.dataset.demoFilter === selected) return;
    selected = button.dataset.demoFilter;
    update(true);
    writeView();
  }));
  document.addEventListener('portfolio-language-change', () => update());
  window.addEventListener('hashchange', () => revealHash());
  window.addEventListener('popstate', () => { readView(); update(); revealHash(); });
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (link) revealHash(link.hash, link.hash === location.hash);
  });
  readView();
  update();
  section.querySelector('[data-demo-toolbar]').hidden = false;
  revealHash();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      document.body.dataset.demoReading = String(entries[0].isIntersecting);
    }, {rootMargin:'-90px 0px -20% 0px',threshold:0});
    observer.observe(section);
  }
})();
