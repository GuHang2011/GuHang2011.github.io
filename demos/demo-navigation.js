/* Shared demo navigation. No application state, storage, network or authentication. */
(() => {
  const main=document.querySelector('main');if(!main)return;
  const gallery=document.body.dataset.demo==='demos';
  const root=new URL('.',document.currentScript.src);
  const nav=document.createElement('nav');nav.className='demo-wayfinding';
  nav.setAttribute('aria-label','演示导航 / Demo navigation');
  const home=document.createElement('a'),list=document.createElement('a'),current=document.createElement('span');
  home.href=new URL('../#work',root).href;list.href=root.href;
  nav.append(home,document.createTextNode(' / '),list);
  if(!gallery)nav.append(document.createTextNode(' / '),current);
  main.prepend(nav);
  const update=()=>{
    const zh=document.documentElement.lang.startsWith('zh');home.textContent=zh?'作品首页':'Portfolio';list.textContent=zh?'全部演示':'All demos';
    current.textContent=document.querySelector('h1')?.textContent.trim().replace(/\s+/g,' ')||'';
    (gallery?list:current).setAttribute('aria-current','page');
  };
  update();document.addEventListener('portfolio-language-change',update);
  // Keyboard scrolling for wide numerical tables, without changing column semantics.
  document.querySelectorAll('.data-table-wrap,.table-wrap,.ops-records').forEach((wrap,i)=>{
    if(!wrap.querySelector('table'))return;
    wrap.tabIndex=0;wrap.setAttribute('role','region');
    wrap.setAttribute('aria-label',document.documentElement.lang.startsWith('zh')?'数据表格，可横向滚动':'Data table, horizontally scrollable');
  });
})();
