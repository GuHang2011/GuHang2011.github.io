"use strict";
(() => {
  const tools = document.querySelector('[data-desk-tools]');
  if (!tools) return;
  const buttons = [...tools.querySelectorAll('[data-desk-topic]')];
  const notes = [...document.querySelectorAll('[data-desk-note]')];
  const form = document.querySelector('[data-desk-search]');
  const input = form.querySelector('input');
  const clear = form.querySelector('[data-desk-clear]');
  const count = tools.querySelector('[data-desk-count]');
  const more = document.querySelector('[data-desk-more]');
  const empty = document.querySelector('[data-desk-empty]');
  const normalize = value => value.toLocaleLowerCase().normalize('NFKC').trim();
  // Index both translations once; switching language must not change search results.
  const index = new Map(notes.map(note => [note, normalize([
    note.textContent, ...[...note.querySelectorAll('[data-en],[data-zh]')]
      .flatMap(node => [node.dataset.en || '', node.dataset.zh || ''])
  ].join(' '))]));
  let topic = 'recent', query = '', limit = 6;
  function readView() {
    const params = new URL(location.href).searchParams;
    topic = buttons.some(button => button.dataset.deskTopic === params.get('notes')) ? params.get('notes') : 'recent';
    query = params.get('notes-q') || '';
    if (normalize(query) && topic === 'recent') topic = 'all';
    input.value = query;
    limit = 6;
  }
  function writeView(replace = false) {
    const url = new URL(location.href);
    if (topic === 'recent') url.searchParams.delete('notes'); else url.searchParams.set('notes', topic);
    if (query.trim()) url.searchParams.set('notes-q', query.trim()); else url.searchParams.delete('notes-q');
    if (url.href !== location.href) {
      try { history[replace ? 'replaceState' : 'pushState'](history.state, '', url); } catch { /* Keep local filtering usable. */ }
    }
  }
  function update() {
    const zh = document.documentElement.lang.startsWith('zh');
    const words = normalize(query).split(/\s+/).filter(Boolean);
    const matches = notes.filter(note => (topic === 'all' || (topic === 'recent' ? note.dataset.recent === 'true' : note.dataset.topic === topic)) && words.every(word => index.get(note).includes(word)));
    const visible = new Set(matches.slice(0, limit));
    notes.forEach(note => { note.hidden = !visible.has(note); });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.deskTopic === topic)));
    count.textContent = zh ? `显示 ${visible.size} / ${matches.length} 篇 · 笔记集共 ${notes.length} 篇` : `${visible.size} of ${matches.length} shown · ${notes.length} notes total`;
    empty.hidden = matches.length !== 0;
    more.hidden = visible.size >= matches.length;
    clear.hidden = query.length === 0;
    const next = Math.min(6, matches.length - visible.size);
    more.textContent = zh ? `再显示 ${next} 篇` : `Show ${next} more`;
    return matches;
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    topic = button.dataset.deskTopic;
    if (topic === 'recent') { query = ''; input.value = ''; }
    limit = 6; update(); writeView();
  }));
  function search() {
    query = input.value;
    if (normalize(query) && topic === 'recent') topic = 'all';
    limit = 6; update(); writeView(true);
  }
  input.addEventListener('input', event => { if (!event.isComposing) search(); });
  input.addEventListener('compositionend', search);
  form.addEventListener('submit', event => { event.preventDefault(); search(); });
  clear.addEventListener('click', () => { input.value = ''; search(); input.focus(); });
  empty.querySelector('button').addEventListener('click', () => {
    topic = 'all'; query = ''; input.value = ''; limit = 6; update(); writeView(); input.focus();
  });
  more.addEventListener('click', () => {
    const firstNew = update()[limit];
    limit += 6; update();
    // Continue keyboard reading at the first new article, even when the button disappears.
    if (firstNew) firstNew.querySelector('h3 a').focus({preventScroll: true});
  });
  addEventListener('popstate', () => { readView(); update(); });
  document.addEventListener('portfolio-language-change', update);
  tools.hidden = false;
  readView(); update();
})();
