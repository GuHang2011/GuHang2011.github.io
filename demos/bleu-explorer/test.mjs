import assert from 'node:assert/strict';
import {bleu} from './bleu.mjs';
assert.equal(bleu('the cat is on the mat',['the cat is on the mat']).score,1);
assert.equal(bleu('a b c d',['w x y z']).score,0);
assert.equal(bleu('',['a b']).score,0);
assert.equal(bleu('a b',['a b']).score,0); // fixed order, not effective order
assert.equal(bleu('a b',['a b'],2).score,1);
const repeat=bleu('the the the the the the the',['the cat is on the mat'],1);
assert.equal(repeat.rows[0].matches,2);
assert.equal(repeat.rows[0].total,7);
const short=bleu('a b c d',['a b c d e f'],4);
assert.ok(Math.abs(short.score-Math.exp(-0.5))<1e-12);
assert.equal(bleu('a b c d',['a b c','a b c d e']).r,3);
assert.equal(bleu('a a b b',['a a x x','x x b b'],1).rows[0].matches,4);
assert.throws(()=>bleu('a',['']));
assert.throws(()=>bleu('a',['a'],0));
console.log('11 BLEU checks passed');
