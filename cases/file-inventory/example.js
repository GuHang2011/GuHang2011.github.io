"use strict";
(() => {
 const root=document.querySelector('[data-inventory-example]');
 if(!root)return;
 const files=JSON.parse(document.getElementById('inventory-fixture').textContent);
 const exclude=root.querySelector('[name="exclude"]');
 const threshold=root.querySelector('[name="threshold"]');
 const body=root.querySelector('tbody');
 const status=root.querySelector('[data-example-status]');
 function update(){
  const zh=document.documentElement.lang.startsWith('zh');
  const included=files.filter(f=>!exclude.checked||!f.relative_path.startsWith('node_modules/'));
  const large=included.filter(f=>f.bytes>=Number(threshold.value)).sort((a,b)=>b.bytes-a.bytes||a.relative_path.localeCompare(b.relative_path));
  const total=included.reduce((sum,f)=>sum+f.bytes,0);
  root.querySelector('[data-file-count]').textContent=included.length;
  root.querySelector('[data-byte-count]').textContent=total;
  root.querySelector('[data-large-count]').textContent=large.length;
  body.replaceChildren();
  for(const file of large){
   const row=document.createElement('tr');
   for(const value of [file.relative_path,String(file.bytes)]){const cell=document.createElement('td');cell.textContent=value;row.append(cell);}
   body.append(row);
  }
  if(!large.length){const row=document.createElement('tr');const cell=document.createElement('td');cell.colSpan=2;cell.textContent=zh?'没有达到阈值的文件。':'No files meet this threshold.';row.append(cell);body.append(row);}
  status.textContent=zh?`当前纳入 ${included.length} 个文件，共 ${total} 字节；${large.length} 个文件达到阈值。`:`${included.length} files included, ${total} bytes total; ${large.length} files meet the threshold.`;
 }
 root.querySelector('form').addEventListener('submit',e=>e.preventDefault());
 exclude.addEventListener('change',update);threshold.addEventListener('change',update);
 root.querySelector('[data-example-reset]').addEventListener('click',()=>{exclude.checked=true;threshold.value='10';update();});
 document.addEventListener('portfolio-language-change',update);
 root.querySelectorAll('input,select,button').forEach(e=>e.disabled=false);
 update();
})();
