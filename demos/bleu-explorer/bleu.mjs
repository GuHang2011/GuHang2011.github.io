// Sentence BLEU, fixed order, uniform weights, no smoothing.
export const tokenize = text => text.trim() ? text.trim().split(/\s+/u) : [];
function grams(tokens, n) {
  const counts = new Map();
  for (let i = 0; i <= tokens.length - n; i++) {
    const key = JSON.stringify(tokens.slice(i, i + n));
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
}
export function bleu(candidate, references, order = 4) {
  if (!Number.isInteger(order) || order < 1 || order > 4) throw new Error('Order must be 1–4');
  const c = tokenize(candidate), refs = references.map(tokenize).filter(r => r.length);
  if (!refs.length) throw new Error('至少填写一条非空参考译文');
  const r = refs.map(x => x.length).sort((a,b) => Math.abs(a-c.length)-Math.abs(b-c.length) || a-b)[0];
  const bp = c.length === 0 ? 0 : Math.exp(Math.min(0, 1-r/c.length));
  const rows = [];
  for (let n=1; n<=order; n++) {
    const cg=grams(c,n), rg=refs.map(ref=>grams(ref,n));
    const details=[...cg].map(([key,count])=>{
      const max=Math.max(...rg.map(ref=>ref.get(key)||0));
      return {gram:JSON.parse(key).join(' '),count,max,clipped:Math.min(count,max)};
    });
    const matches=details.reduce((sum,x)=>sum+x.clipped,0), total=Math.max(0,c.length-n+1);
    rows.push({n,matches,total,precision:total ? matches/total : 0,details});
  }
  const score=rows.some(x=>x.precision===0) ? 0 : bp*Math.exp(rows.reduce((sum,x)=>sum+Math.log(x.precision),0)/order);
  return {score,bp,c:c.length,r,rows};
}
