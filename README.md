# 顾航 · 工程项目与学习记录

[个人主页](https://guhang2011.github.io/) · [项目与演示](https://guhang2011.github.io/projects.html) · [学习笔记](https://guhang2011.github.io/notebook/) · [简历](https://guhang2011.github.io/research/cv.html)

这里整理我的前端与应用开发项目、教学案例和研究记录。先从首页的作物巡检、辅导员协作和配置化表单看起；项目目录收录 17 个项目入口，笔记集有 49 篇中英双语文章。

This repository contains my engineering portfolio, project demonstrations and bilingual study notes. The homepage starts with crop inspection, campus collaboration and configurable forms. The directory includes 17 projects; the notebook contains 49 articles.

## 可以看什么

| 内容 | 入口 |
| --- | --- |
| 工程案例、截图、源码与在线演示 | [项目目录](projects.html) |
| React 流式回答：停止与重试 | [交互实验](demos/ai-stream/) |
| 字段配置、预览与导入 | [表单编辑器](demos/low-code-form/) |
| 前端、数据处理、模型和 Agent 学习 | [笔记目录](notebook/) |
| 论文说明与拟研究计划 | [研究记录](research.html) |

演示页会注明预设数据、模拟服务和需要本地部署的部分。KANO 等上游代码、Live2D 角色及引用材料保留来源。笔记含 AI 辅助起草与翻译，代码示例和实际运行的检查分别标注。

Neurocomputing 与 Climate Risk Management 两篇稿件均为第一作者投稿，尚未录用；研究页中的计划与已完成工作分开记录。

## 本地预览

站点是静态 HTML、CSS 和 JavaScript，无需安装依赖即可预览：

```sh
python -m http.server 8000
```

打开 `http://localhost:8000`。React 演示的源码、构建方式和依赖见各自目录中的 README。

## 修改内容

- 首页编辑 `index.html`，当前主要样式在 `portfolio.css`。项目目录为 `projects.html`。
- 中英文使用成对的 `data-zh` 和 `data-en` 属性；默认跟随浏览器语言，并记住手动选择。无 JavaScript 时显示英文内容。
- 笔记源文件在 `notebook/content/*.json`，修改后运行 `python notebook/build.py`，提交生成的 HTML。
- `notebook/notebook.js` 处理搜索与每批 12 篇的展开；URL 保留主题、关键词和已展开数量。无 JavaScript 时可阅读全部文章。
- 首页的截图放大、阅读进度、深色模式与减少动态效果仍可使用。修改后检查中英文、手机宽度、键盘操作和链接。
- 投稿状态、作者信息和实验结果按实际材料更新。

## 本轮整理

2026-11-12：同步禾镜、沭阳之家、资料归档与丝路演示的近期信息；将 MeteoFormer 补入项目目录，新增手机工作台阅读笔记。


2026-11-09：重排首页图文，改写项目简介，减少文章中的重复引导语，修复中文样式选择器和项目目录错位，并增加笔记分批展开。

[问题与验证记录](reviews/site-reading-20261109.md) · [历史更新记录](SITE_HISTORY.md)
