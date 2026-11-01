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

  function revealHash() {
    const card = cards.find(item => '#' + item.id === location.hash);
    if (!card) return;
    selected = card.dataset.demoGroup;
    update();
    requestAnimationFrame(() => card.scrollIntoView({block:'start',behavior:'instant'}));
  }

  controls.forEach(button => button.addEventListener('click', () => {
    if (button.dataset.demoFilter === selected) return;
    selected = button.dataset.demoFilter;
    update(true);
  }));
  document.addEventListener('portfolio-language-change', () => update());
  window.addEventListener('hashchange', revealHash);
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
