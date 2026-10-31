"""Render the bilingual notebook with Python's standard library; no runtime build needed."""
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATE = "2026-10-31"
VERSION = "20261031-engineering-notes"
ORDER = ['directory-rename-release', 'mobile-response-contracts', 'photo-queue-ownership', 'release-artifact-integrity', 'ai-frontend-reflection', 'cross-platform-boundaries', 'request-scope-lifecycle', 'weather-fallback', 'upload-readiness', 'low-code-contracts', 'progressive-demo-loading', 'tft-information-boundary', 'gnn-risk-graphs', 'spatiotemporal-validation', 'research-demo-handoff', "multimodal-gates", "label-budget-ledger", "model-version-rollback", "rag-evaluation", "async-interfaces", "sql-windows", "model-selection", "order-idempotency", "accessible-interactions", "data-quality", "prompt-contracts", "permission-boundaries", "digital-human", "text-to-image", "generative-workflow"]
CATEGORIES = {
    "all": {"en": "All topics", "zh": "全部主题"},
    "frontend": {"en": "Frontend", "zh": "前端交互"},
    "data": {"en": "Data & SQL", "zh": "数据与 SQL"},
    "models": {"en": "Model learning", "zh": "模型学习"},
    "engineering": {"en": "Project reflections", "zh": "项目心得"},
}


def esc(value):
    return html.escape(str(value), quote=True)


def tr(value, tag="span", attrs=""):
    return '<{0}{1} data-en="{2}" data-zh="{3}">{2}</{0}>'.format(
        tag, " " + attrs if attrs else "", esc(value["en"]), esc(value["zh"]))


def pair(en, zh, tag="span", attrs=""):
    return tr({"en": en, "zh": zh}, tag, attrs)


def frame(title, description, path, body):
    return f'''<!doctype html>
<html lang="en" data-title-en="{esc(title['en'])} | Hang Gu" data-title-zh="{esc(title['zh'])} | 顾航">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title['en'])} | Hang Gu</title><meta name="description" content="{esc(description['en'])}">
<meta property="og:title" content="{esc(title['en'])} | Hang Gu"><meta property="og:description" content="{esc(description['en'])}">
<meta property="og:type" content="{'website' if path == '' else 'article'}"><meta property="og:url" content="https://guhang2011.github.io/notebook/{path}">
<link rel="canonical" href="https://guhang2011.github.io/notebook/{path}"><link rel="icon" href="../assets/favicon.svg">
<link rel="stylesheet" href="../academic.css?v={VERSION}"><link rel="stylesheet" href="notebook.css?v={VERSION}">
<script src="../academic.js?v={VERSION}" defer></script><script src="notebook.js?v={VERSION}" defer></script></head>
<body class="notebook-page"><a class="skip-link" href="#main">{pair('Skip to content','跳至正文')}</a>
<div class="reading-progress" aria-hidden="true"><span></span></div>
<header class="site-header" data-open="false"><div class="wrap header-inner">
<a class="brand" href="../">Hang Gu<span> / 顾航</span></a>
<nav class="nav-links" id="navigation" aria-label="Main navigation" data-en-label="Main navigation" data-zh-label="主导航">
<a href="../">{pair('Portfolio','个人主页')}</a><a href="../research/">{pair('Research','研究')}</a>
<a href="./" aria-current="page">{pair('Notebook','学习与实践')}</a><a href="../#work">{pair('Projects','项目')}</a></nav>
<div class="header-controls"><div class="language-controls" role="group" aria-label="Language">
<button type="button" data-language="zh" aria-pressed="false" aria-label="中文">中</button><button type="button" data-language="en" aria-pressed="true" aria-label="English">EN</button></div>
<button class="menu-toggle icon-button" type="button" aria-expanded="false" aria-controls="navigation" aria-label="Menu"><img src="../assets/icons/menu.svg" alt=""></button></div></div></header>
<main id="main">{body}</main>
<footer class="site-footer"><div class="wrap footer-inner"><div><strong>Hang Gu · 顾航</strong>{pair('Learning through questions, code and review.','从问题、代码与复查中学习。','p')}</div><div>{pair('Collection updated 31 October 2026','笔记集更新于 2026-10-31','p')}<a href="../">{pair('Back to portfolio','返回个人主页')}</a><a href="https://github.com/GuHang2011/GuHang2011.github.io/tree/main/notebook">GitHub</a></div></div></footer>
<button class="back-top icon-button" type="button" aria-label="Back to top"><img src="../assets/icons/arrow-up.svg" alt=""></button></body></html>
'''


def note_row(note):
    note_date = note.get("date", "2026-10-19")
    search = " ".join([note['title']['en'], note['title']['zh'], note['summary']['en'], note['summary']['zh']] + note['tags'])
    kind = pair('Project reflection', '项目心得') if note['kind'] == 'reflection' else pair('Study note', '学习笔记')
    tags = ''.join('<span>' + esc(tag) + '</span>' for tag in note['tags'])
    return f'''<article class="journal-row" data-note data-topic="{note['category']}" data-search="{esc(search)}">
<div class="journal-meta">{tr(CATEGORIES[note['category']])}<span>{kind}</span><time datetime="{note_date}">{note_date.replace('-', '.')}</time></div>
<div class="journal-body"><h2><a href="{note['slug']}.html">{tr(note['title'])}</a></h2>{tr(note['summary'],'p')}<div class="journal-tags">{tags}</div></div>
<div class="journal-read">{pair(str(note['minutes']) + ' min read', '约 ' + str(note['minutes']) + ' 分钟')}<span aria-hidden="true">↗</span></div></article>'''


def render_index(notes):
    count = len(notes)
    controls = ''.join(f'<button type="button" data-note-topic="{key}" aria-pressed="{str(key == "all").lower()}">{tr(label)}</button>' for key, label in CATEGORIES.items())
    routes = [
        ('frontend', 'From input to a reliable interface', '从输入到可靠交互', 'Async responses · focus · accessibility', '异步响应 · 焦点 · 可访问性'),
        ('models', 'From model code to credible evaluation', '从模型实现到可信评估', 'TFT inputs · graph edges · model selection', 'TFT 输入 · 图边语义 · 模型选择'),
        ('engineering', 'From a working system to clear boundaries', '从功能实现到工程边界', 'State transitions · retries · authorization', '状态迁移 · 重试 · 权限'),
        ('data', 'From collected records to usable samples', '从采集记录到可用样本', 'SQL windows · conflicts · traceability', 'SQL 窗口 · 冲突处理 · 可追溯性'),
    ]
    paths = ''.join(f'<a href="?topic={key}#entries">{pair(en,zh,"strong")}{pair(sub_en,sub_zh)}</a>' for key,en,zh,sub_en,sub_zh in routes)
    body = f'''<section class="notebook-intro wrap"><div><p class="notebook-kicker">{pair('Research & engineering notebook','研究与工程笔记')}</p>
{pair('Learning, with a trail.','让学习留下可追溯的记录。','h1')}
{pair('Questions from real code, small examples to reason with, and decisions worth revisiting.','围绕真实代码中的问题，记录小型示例、设计取舍与值得继续追问的地方。','p', 'class="notebook-lead"')}</div>
<aside class="notebook-margin"><strong>{pair('Read the reasoning','从判断依据读起')}</strong>{pair(f'{count} notes connect implementation details to verification and open questions.',f'{count} 篇笔记把实现细节、验证方法与后续问题连接起来。','p')}<a href="engineering-log-20261031.html">{pair('Read the latest learning log','阅读本次学习日志')}</a></aside></section>
<div class="wrap"><nav class="notebook-routes" aria-label="Suggested reading paths" data-en-label="Suggested reading paths" data-zh-label="建议阅读路径">{paths}</nav></div>
<section class="wrap notebook-library" id="entries" aria-labelledby="library-title"><div class="library-heading">{pair('Notes & reflections','学习笔记与项目心得','h2','id="library-title"')}<span>{pair('Compiled October 2026','整理于 2026 年 10 月')}</span></div>
<form class="notebook-tools" data-notebook-tools hidden role="search"><div class="notebook-search"><label for="note-search">{pair('Search notes','搜索笔记')}</label><input id="note-search" type="search" autocomplete="off" placeholder="Try: Vue, upload, TFT" data-en-placeholder="Try: Vue, upload, TFT" data-zh-placeholder="试试：跨端、上传、TFT"><button type="button" data-note-clear>{pair('Clear','清除')}</button></div>
<div class="notebook-filters" role="group" aria-label="Note topics" data-en-label="Note topics" data-zh-label="笔记主题">{controls}</div>
<p data-note-count role="status" aria-live="polite" aria-atomic="true"></p></form>
<div class="journal-list">{''.join(note_row(n) for n in notes)}</div>
<div class="notebook-empty" data-note-empty hidden>{pair('No matching notes. Try another keyword or view all topics.','没有匹配的笔记。可以更换关键词，或查看全部主题。','p')}<button type="button" data-note-reset>{pair('Show all notes','显示全部笔记')}</button></div>
</section><section class="wrap notebook-context">{pair('How to read these notes','关于这些记录','h2')}
{pair('These learning summaries were compiled from public code and project documents, with AI assistance in drafting and translation. They distinguish source observations, simplified examples and proposed checks. They are not a dated lab log or evidence of new benchmark results.','这些学习总结结合公开代码与项目文档整理，使用 AI 辅助起草和翻译，区分源码观察、简化示例与建议验证项；不作为逐日实验日志或新增模型成绩的证据。','p')}
<a href="../#notebook">{pair('More learning repositories and earlier notes','更多学习仓库与已有笔记')}</a></section>'''
    title = {'en':'Learning & project reflections','zh':'学习笔记与项目心得'}
    description = {'en':'Frontend interaction, data quality, model validation and engineering reflections with source links.', 'zh':'前端交互、数据质量、模型验证与工程复盘，附来源和阅读路径。'}
    (ROOT / 'index.html').write_text(frame(title, description, '', body), encoding='utf-8')


def render_article(note, by_slug):
    note_date = note.get("date", "2026-10-19")
    toc, sections = [], []
    for section in note['sections']:
        sid = esc(section['id'])
        toc.append(f'<a href="#{sid}">{tr(section["title"])}</a>')
        text = ''.join(tr(p, 'p') for p in section.get('paragraphs', []))
        if section.get('bullets'):
            text += '<ul>' + ''.join(tr(p, 'li') for p in section['bullets']) + '</ul>'
        if section.get('code'):
            code = section['code']
            text += f'''<div class="notebook-code"><div class="code-heading"><span>{esc(code['language'])}</span><button type="button" data-copy-code hidden>{pair('Copy code','复制代码')}</button></div><pre tabindex="0" aria-label="Code example" data-en-label="Code example" data-zh-label="代码示例"><code>{esc(code['text'])}</code></pre></div>'''
        if section.get('callout'):
            text += tr(section['callout'], 'p', 'class="notebook-callout"')
        sections.append(f'<section id="{sid}" class="article-section">{tr(section["title"],"h2")}{text}</section>')
    sources = ''.join(f'<li><a href="{esc(s["url"])}">{tr(s["label"])}</a></li>' for s in note['sources'])
    related = ''.join(f'<a href="{slug}.html">{tr(by_slug[slug]["title"])}</a>' for slug in note.get('related', []) if slug in by_slug)
    body = f'''<div class="wrap article-top"><a href="./">{pair('← All notes','← 全部笔记')}</a><button type="button" data-print>{pair('Print / save PDF','打印 / 保存 PDF')}</button></div>
<header class="wrap article-heading"><div class="article-meta">{tr(CATEGORIES[note['category']])}<time datetime="{note_date}">{note_date.replace('-', '.')}</time>{pair(str(note['minutes'])+' min read','约 '+str(note['minutes'])+' 分钟')}</div>
{tr(note['title'],'h1')}{tr(note['summary'],'p','class="article-deck"')}</header>
<div class="wrap article-layout"><aside class="article-sidebar"><details class="article-directory" open><summary>{pair('On this page','本页目录')}</summary><nav class="article-toc" aria-label="On this page" data-en-label="On this page" data-zh-label="本页目录">{pair('On this page','本页目录','h2')}{''.join(toc)}<a href="#sources">{pair('Sources & further reading','来源与延伸阅读')}</a></nav></details></aside>
<article class="article-prose"><div class="article-basis">{pair('Basis of this note','整理依据','strong')}{tr(note['basis'],'p')}</div>{''.join(sections)}
<section id="sources" class="article-section article-sources">{pair('Sources & further reading','来源与延伸阅读','h2')}<ul>{sources}</ul></section>
<div class="article-colophon">{pair('Compiled from code and documents, with AI-assisted drafting and translation. Examples and proposed checks are learning material; only linked evidence establishes what was run.','结合代码与文档整理，使用 AI 辅助起草和翻译。示例及建议验证项属于学习材料，实际执行范围以链接中的证据为准。','p')}</div>
<nav class="article-related" aria-label="Related notes" data-en-label="Related notes" data-zh-label="相关笔记">{pair('Continue reading','继续阅读','h2')}{related}<a href="./">{pair('Browse all notes','浏览全部笔记')}</a></nav>
<p class="copy-status" role="status" aria-live="polite" data-copy-status></p></article></div>'''
    (ROOT / (note['slug'] + '.html')).write_text(frame(note['title'], note['summary'], note['slug']+'.html', body), encoding='utf-8')


def main(only=None):
    notes = [json.loads((ROOT / 'content' / (slug+'.json')).read_text(encoding='utf-8')) for slug in ORDER]
    by_slug = {n['slug']: n for n in notes}
    for note in notes:
        assert note['slug'] in ORDER and note['category'] in CATEGORIES
        assert len(set(s['id'] for s in note['sections'])) == len(note['sections'])
        assert all(s in by_slug for s in note.get('related', []))
        if only is None or note["slug"] in only:
            render_article(note, by_slug)
    render_index(notes)
    print('Rendered notebook index and', sum(only is None or n['slug'] in only for n in notes), 'bilingual articles.')


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", nargs="+", choices=ORDER, help="Render selected articles and always refresh the index")
    main(parser.parse_args().only)
