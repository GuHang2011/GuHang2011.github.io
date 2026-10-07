# GitHub Profile Review for PhD Applications

这份清单把 GitHub 主页整理成可快速评估的研究工程档案：导师应能在 2–5 分钟内看见研究方向、个人贡献、证据和可复现入口。

## Overview

主页首屏建议围绕一条主线组织：**前端系统工程 + 教育数据分析 + 可复现研究实践**。

- 用 2–3 句说明研究兴趣、当前能力边界和博士阶段希望研究的问题。
- 通过 `Selected work` 固定展示 4–6 个仓库，每个仓库只写一句结果导向说明。
- 设置 `Research notes` 和 `Online demos` 两个入口，分别指向笔记总览和可直接打开的 GitHub Pages。
- 联系方式只保留专业主页、Google Scholar/ORCID（如已建立）和 GitHub；不要公开手机号、家庭住址或未审查的邮箱。
- 主页中的数字必须能在仓库、实验记录或截图中核验；不能核验的百分比改成方法说明。

推荐置顶顺序：

1. `counselor-workflow-showcase`：脱敏后的真实工程案例。
2. `frontend-data-lab`：前端、SQL、数据质量和模型笔记。
3. `GuHang2011.github.io`：在线作品集与研究叙事入口。
4. 一个有数据说明、指标和误差分析的数据分析项目。
5. 一个展示交互、可访问性和性能意识的前端项目。

## Repositories

每个重点仓库的 README 使用统一结构：

```text
一句话定位
研究/工程问题
我的贡献
在线演示或截图
方法与技术栈
目录导览
运行步骤
结果与证据
局限性与下一步
许可证与数据说明
```

仓库元数据需同时检查：Description 使用“问题 + 方法 + 产出”；Topics 使用英文小写，例如 `frontend`、`data-analysis`、`reproducible-research`、`education-technology`；设置明确的许可证、默认分支和 Pages 地址。公开仓库不得提交 `.env`、数据库、日志、上传文件、真实学生数据、测试账号或内部截图。截图使用合成数据，并标明 `synthetic/demo data`。

学习笔记仓库需要注明资料来源、阅读日期、最小实验和未解决问题，避免把笔记包装成论文结论。

## Projects

建议建立三个公开 Project 看板：

### Research Portfolio

字段：`Stage`、`Research question`、`Evidence`、`Next milestone`。列：`Research question`、`Building`、`Evaluation`、`Documented`、`Archived`。

示例卡片：教育事务工作流状态建模；学习行为数据质量；前端可访问性检查。每张卡都应写下一步与验收标准。

### Reading and Modeling Notes

每张卡片记录资料、核心概念、一个最小实验和一个开放问题。可按 `ML foundations`、`Model evaluation`、`Data engineering`、`Frontend systems` 分组。

### Engineering Backlog

用于显示工程成熟度。任务写成可验收的结果，例如“补充时间切分基线并记录 PR-AUC”，不要只写“优化模型”。

## 博导通常会关注

- 是否能说明数据为何重要、现有方案哪里不足。
- 是否有基线、指标、误差分析和失败案例。
- 团队项目中个人负责的模块、取舍和边界。
- 别人能否按 README 在干净环境中运行最小示例。
- 是否主动说明数据偏差、隐私限制、外推风险和当前不能声称的结论。
- 最近 6–12 个月是否有连续、可解释的提交和笔记更新。
- 核心 README、项目摘要和图表说明是否提供英文版本。

## 发布前检查

- [ ] Overview 首屏能在 30 秒内看懂研究方向。
- [ ] 置顶仓库不超过 6 个，且每个有在线入口或清晰截图。
- [ ] 每个重点仓库包含个人贡献、运行方法、证据和局限性。
- [ ] 所有数据和截图已脱敏，并说明数据性质。
- [ ] Project 卡片都有下一步和验收标准。
- [ ] 公开仓库没有密钥、真实联系方式和内部系统信息。
- [ ] 主页链接可访问，移动端布局没有溢出。

