import {bleu} from './bleu.mjs';
const $=id=>document.getElementById(id);
function update(){
  $('rows').replaceChildren(); $('details').replaceChildren();
  try {
    const result=bleu($('candidate').value,$('references').value.split('\n'),Number($('order').value));
    $('score').textContent=(result.score*100).toFixed(2);
    $('lengths').textContent=`候选长度 c = ${result.c} · 参考长度 r = ${result.r} · BP = ${result.bp.toFixed(4)}`;
    $('message').textContent=result.score===0 ? '存在零精度或空候选：当前无平滑得分为 0。' : '裁剪精度的几何平均 × 短句惩罚。';
    for(const row of result.rows){
      const tr=document.createElement('tr');
      for(const value of [`${row.n}-gram`,`${row.matches} / ${row.total}`,`${(row.precision*100).toFixed(2)}%`]){const td=document.createElement('td');td.textContent=value;tr.append(td);}
      $('rows').append(tr);
      const details=document.createElement('details'),summary=document.createElement('summary'),grams=document.createElement('div');
      summary.textContent=`${row.n}-gram 计数明细（词组 · 裁剪数 / 候选数 · 参考最大数）`;
      grams.className='grams';
      for(const item of row.details){const span=document.createElement('span');span.className='gram';span.textContent=`${item.gram} · ${item.clipped}/${item.count} · ref ${item.max}`;grams.append(span);}
      details.append(summary,grams);$('details').append(details);
    }
  }catch(error){$('score').textContent='—';$('lengths').textContent='';$('message').textContent=error.message;}
}
for(const id of ['candidate','references','order']) $(id).addEventListener('input',update);
const examples={exact:['the cat is on the mat','the cat is on the mat',4],repeat:['the the the the the the the','the cat is on the mat',1],short:['the cat is on','the cat is on the mat',4]};
document.querySelectorAll('[data-example]').forEach(button=>button.addEventListener('click',()=>{const [c,r,n]=examples[button.dataset.example];$('candidate').value=c;$('references').value=r;$('order').value=n;update();}));
update();
