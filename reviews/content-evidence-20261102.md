# 首页内容与证据入口改进

发布整理日期：2026-11-02。

## 五项改进

1. **明确定位**：首屏直接说明“复杂业务系统的前端工程、数据质量与 AI 应用”，背景与研究兴趣分开表达。
2. **三个代表项目**：社区系统、React 工作流、低代码表单。各卡片用问题、公开实现、技术取舍和验证四项说明；全部 14 个项目仍可筛选、搜索或展开。更新 React／表单截图为现有新版演示截图。
3. **带任务进入演示**：精选 React、低代码表单和数据质量实验，增加可展开的操作步骤及预期结果。真实步骤分别覆盖失败恢复、错误配置保留和数据隔离；其余演示仍保留在分类中。
4. **三篇工程复盘**：[异步竞态](../notebook/ai-code-race-review.html)、[工作流恢复](../notebook/workflow-recovery-review.html)、[配置导入](../notebook/schema-import-review.html)。每篇包含具体失败顺序、实现选择、运行方法、局限与源码链接。笔记总数更新为 33，原笔记保留。
5. **导师阅读入口**：新增[研究与工程概览](../research/reviewer-guide.html)，从问题、已有研究、贡献与来源、工程证据读到拟研究计划。同步修订 Markdown 指南中的过期状态，并在首屏、研究区和研究目录添加入口。

## 内容依据

- 两项第一作者投稿依据本人已提供信息：Neurocomputing 修订后重新投稿，以及 Climate Risk Management 投稿，均明确尚未录用。
- 不从第一作者排序推断细分合作者职责；细分贡献应以稿件贡献记录核对。
- 公开工程实现、AI 辅助学习示例、KANO 上游归属和拟研究计划分别说明，未新增性能指标或生产应用成效。
- 新笔记以源码和合成示例作为复盘对象，不编造历史线上事故，也不声称某个 AI 实际生成过文中分析的缺陷。

## 已执行检查

- 2026-11-01，Node.js v25.2.1 重跑 22 项既有代码测试：异步控制器 4 项、React 状态模型 8 项、低代码核心 10 项，全部通过。命令：

  ```console
  node --test notebook/examples/latest-request.test.mjs demos/react-workflow/tests/workflow.test.ts demos/low-code-form/schema.test.mjs
  ```

- 27 项浏览器检查通过，包含精选项目、全量目录、搜索、33 篇笔记、任务展开、研究状态、手机菜单及三项演示中的实际恢复路径。
- 首页和导师入口测试中英文、明暗主题；笔记目录和三篇新文章测试中英文。视口 320 / 390 / 768 / 1440px，共 64 组布局检查无页面或检查容器的横向溢出。
- 16 次 axe WCAG A/AA 自动扫描无违规；检查过程无 JavaScript 异常。
- 已检查桌面与手机截图，CSS 解析通过；发布前还核对新增链接、锚点、原研究条目和原笔记保留情况。

浏览器脚本：[checks/content-evidence.js](checks/content-evidence.js)。使用本地 8778 端口预览和 Playwright CLI；axe 沿用 `output/frontend-audit/node_modules/axe-core/axe.min.js`。这些检查覆盖公开静态页面与合成演示，不替代真实设备、服务端验收或研究基准实验。
