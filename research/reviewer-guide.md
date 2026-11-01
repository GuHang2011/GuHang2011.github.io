# Reviewer guide | 博导快速阅读入口

更新日期：2026-11-02。推荐先打开[双语导师阅读页](https://guhang2011.github.io/research/reviewer-guide.html)，集中查看研究问题、第一作者投稿、实现证据及拟研究计划。

工程实践以复杂业务系统前端、数据质量和 AI 应用为主；研究关注有限标注下的可靠多模态评估。以下状态依据本人已提供的稿件信息与作品集记录整理，不将投稿表述为录用。

## 当前第一作者投稿

- **Neurocomputing**：原投稿被拒后修改并重新投稿，尚未录用。修订研究重分析 344 次归档训练运行，检查融合收益、决策工作点与归档伪线索。[研究解读](https://guhang2011.github.io/research/fusion-audit.html)与 KICP 关联代码可读；修订稿完整复现材料尚未公开。
- **Climate Risk Management**：第一作者，已投稿，尚未录用。题目为 *Hybrid AI Framework for Multi-Hazard Climate Risk Governance in Renewable Energy-Water Nexus Systems*。介绍基于已提供摘要，涉及 TFT、GNN-CRP 和中国 30 省 2005—2024 年能源—水系统风险。[研究介绍](https://guhang2011.github.io/research/climate-risk.html)包含概念方法图，不作为公开基准复现包。

第一作者身份不替代细分贡献说明。合作者分工、具体实现与实验职责应结合稿件贡献记录核对，本页不从作者排序推断团队工作量。

## 1. 研究简述：先理解问题

从[研究简述讨论稿](https://guhang2011.github.io/research/statement.html)开始，再查看[研究与稿件列表](https://guhang2011.github.io/#research)。重点区分已有研究实现、当前证据与未来实验问题。

讨论稿提出面向情绪识别的预算约束适配、证据感知决策与遗忘约束更新，尚待实验验证。其他会议工作、硕士论文及作者信息见公开简历中的独立记录。

## 2. KICP：查看研究实现

[KICP 源码与运行要求](https://github.com/GuHang2011/KICP)整理多模态虚假新闻检测的 CLIP 表征、提示学习、协同注意力与知识检索实现。

建议先看外部数据和模型资源要求，再阅读特征输入、融合路径、数据切分与模型选择方式。公开源码是实现证据；本入口没有重新运行研究实验，也不据此新增准确率、改进幅度或研究创新结论。

## 3. KAPT：核对来源、复现与验证范围

[KAPT 审阅入口](https://github.com/GuHang2011/KAPT/blob/main/REVIEWER_ENTRY.md)是从本地 KANO/KAPT 项目整理的复现学习案例。

- [来源与改造说明](https://github.com/GuHang2011/KAPT/blob/main/docs/source-and-changes.md)：区分第三方 KANO 上游与本地整理的工程改造。
- [复现指南](https://github.com/GuHang2011/KAPT/blob/main/docs/reproduction.md)：查看环境、执行步骤与预期输出。
- [验证记录](https://github.com/GuHang2011/KAPT/blob/main/docs/verification.json)：核对检查项目、记录环境与证据范围。
- [早停交互案例](https://guhang2011.github.io/cases/kapt/)：比较最佳轮次、停止轮次以及预测对齐规则。

组件检查与合成回放不等于分子基准复现，也不建立原创 KANO 模型或新性能结论。

## 4. 工程案例：查看研究之外的实现能力

首页精选三项，按问题、公开实现、技术取舍和验证阅读：

- [沭阳之家](https://guhang2011.github.io/cases/shuyang/)：共享前端状态、平台适配、上传恢复与版本化交付；当前为本地试点。
- [React 工作流](https://guhang2011.github.io/demos/react-workflow/)：React + Ant Design，模拟失败、版本冲突与恢复；[实现复盘](https://guhang2011.github.io/notebook/workflow-recovery-review.html)对应 8 项模型测试。
- [低代码表单](https://guhang2011.github.io/demos/low-code-form/)：稳定字段键、配置导入和校验；[导入复盘](https://guhang2011.github.io/notebook/schema-import-review.html)对应 10 项核心测试。

React 与低代码表单属于 AI 辅助实现的合成数据学习示例。上述 18 项测试于 2026-11-01 重新运行通过，不能替代后端授权或生产验收。另有[异步竞态复盘](https://guhang2011.github.io/notebook/ai-code-race-review.html)及 4 项控制器测试。

[辅导员协作案例](https://guhang2011.github.io/cases/counselor/)和[资料归档案例](https://guhang2011.github.io/cases/archive/)仍可从完整项目目录阅读。

既有验收记录、源码审阅与合成在线演示具有不同证据范围。产物哈希用于核对一致性，不能单独证明报告真实性或生产应用成效。

进一步查看[Frontend & Data Lab 阅读指南](https://github.com/GuHang2011/frontend-data-lab/blob/main/REVIEWER_ENTRY.md)，了解数据质量、标注、采集与模型评估的小型可执行示例。这些内容支撑可复查的工程能力，不替代研究实验。

## 继续交流

已整理[公开学术简历](https://guhang2011.github.io/research/cv.html)，专业邮箱为 [guhang2011@126.com](mailto:guhang2011@126.com)。

工程经验为数据检查、实验操作和版本追踪提供基础；研究方法的有效性仍由受控实验建立。正式出处、DOI 与完整实验材料按实际可公开情况补充。可沿[问题与证据地图](https://guhang2011.github.io/research/)继续审阅。
