"use strict";
(() => {
  const tools = document.querySelector('[data-desk-tools]');
  if (!tools) return;
  const buttons = [...tools.querySelectorAll('[data-desk-topic]')];
  const notes = [...document.querySelectorAll('[data-desk-note]')];
  const count = tools.querySelector('[data-desk-count]');
  let topic = 'recent';
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
  }));
  document.addEventListener('portfolio-language-change', update);
  tools.hidden = false;
  update();
})();
