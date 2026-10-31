"use strict";
(() => {
  const tools = document.querySelector('[data-desk-tools]');
  if (!tools) return;
  const buttons = [...tools.querySelectorAll('[data-desk-topic]')];
  const notes = [...document.querySelectorAll('[data-desk-note]')];
  const count = tools.querySelector('[data-desk-count]');
  let topic = 'recent';
  function readView() {
    const value = new URL(location.href).searchParams.get('notes');
    topic = buttons.some(button => button.dataset.deskTopic === value) ? value : 'recent';
  }
  function writeView() {
    const url = new URL(location.href);
    if (topic === 'recent') url.searchParams.delete('notes'); else url.searchParams.set('notes', topic);
    if (url.href !== location.href) {
      try { history.pushState(history.state, '', url); } catch { /* Filtering works without history access. */ }
    }
  }
  function update() {
    const zh = document.documentElement.lang.startsWith('zh');
    notes.forEach(note => {
      note.hidden = topic === 'recent' ? note.dataset.recent !== 'true' : note.dataset.topic !== topic;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.deskTopic === topic)));
    const visible = notes.filter(note => !note.hidden).length;
    count.textContent = zh ? `当前 ${visible} 篇 · 全部 ${notes.length} 篇` : `${visible} shown · ${notes.length} in the collection`;
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    topic = button.dataset.deskTopic;
    update();
    writeView();
  }));
  addEventListener('popstate', () => { readView(); update(); });
  document.addEventListener('portfolio-language-change', update);
  tools.hidden = false;
  readView();
  update();
})();
