# BLEU Explorer / 翻译评估实验

[在线体验](https://guhang2011.github.io/demos/bleu-explorer/)

根据本地 BLEU 学习材料的主题，重新实现可解释的浏览器实验。未复制原有 Python 实现、NLTK 源码包、语料或可执行文件。人工构造的示例只用于解释指标。

## Protocol

- Sentence-level BLEU, order 1–4, uniform weights, **no smoothing**, fixed order (not effective order).
- Whitespace tokenization, case-sensitive; punctuation is retained. Chinese requires pre-tokenization.
- Each unique candidate n-gram is counted once with its frequency; clip against the maximum count across references.
- Closest reference length; ties choose shorter. BP = exp(min(0, 1-r/c)); empty candidate returns zero.
- Any zero precision gives zero BLEU. Display uses the 0–100 scale.
- This is not corpus BLEU, SacreBLEU, or a substitute for human assessment. Do not average these sentence scores and label the result corpus BLEU.

## Run

From repository root: `python -m http.server 8765`, then open `/demos/bleu-explorer/`.

Tests: `node demos/bleu-explorer/test.mjs` (Node 18+). Covers exact/disjoint sentences, empty input, short sentences, repeated tokens, reference-length ties and multi-reference clipping. No dependencies or server-side requests.

## Method reference

Papineni, Roukos, Ward & Zhu (2002), [BLEU: a Method for Automatic Evaluation of Machine Translation](https://aclanthology.org/P02-1040/). BLEU is an established method; this contribution is the educational implementation and explanation.

Local review found incorrect repeated-token counting, logarithm use, zero-precision handling and brevity penalty in the older exercise. The published module is a fresh implementation of the documented protocol, not an unvalidated copy of that exercise.
