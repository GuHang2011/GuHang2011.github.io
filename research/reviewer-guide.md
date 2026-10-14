# Reviewer guide | 博导快速阅读入口

更新日期：2026-10-15。研究主线为**有限标注下的可靠多模态学习**，关注冻结表征适配、验证敏感性与数据伪影；前端、数据管道和工作流案例提供工程支撑。

以下路线连接现有公开材料。本次文档更新未核对 GitHub 实际置顶顺序或论文最新状态；首页和 Profile README 的研究状态仍沿用 2026 年 9 月记录。

## 1. 研究简述：先理解问题

从[研究简述讨论稿](https://guhang2011.github.io/research/statement.html)开始，再查看[研究与稿件列表](https://guhang2011.github.io/#research)。重点区分已有研究实现、当前证据与未来实验问题。

讨论稿用于交流研究方向，不代表已完成的新成果。稿件、录用工作和硕士论文的状态分别标注。提供的简历明确 FCP 与 ISCAIT 2026 论文为第一作者；其他论文作者排序、团队具体分工与正式出版链接仍待补充。

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

[辅导员协作案例](https://guhang2011.github.io/cases/counselor/)展示角色范围、状态转换与[发布检查代码](https://guhang2011.github.io/cases/examples/README.md)；[资料归档案例](https://guhang2011.github.io/cases/archive/)展示授权范围、版本关系与审核流程。

既有验收记录、源码审阅与合成在线演示具有不同证据范围。产物哈希用于核对一致性，不能单独证明报告真实性或生产应用成效。

进一步查看[Frontend & Data Lab 阅读指南](https://github.com/GuHang2011/frontend-data-lab/blob/main/REVIEWER_ENTRY.md)，了解数据质量、标注、采集与模型评估的小型可执行示例。这些内容支撑可复查的工程能力，不替代研究实验。

## 继续交流

已整理[公开学术简历](https://guhang2011.github.io/research/cv.html)，并提供本人同意公开的专业邮箱 [guhang2011@126.com](mailto:guhang2011@126.com)。简历中的论文与项目状态按 2026 年 9 月记录列示。

其他论文作者排序、正式出处或 DOI、9 月后的投稿状态、团队具体职责及可公开的真实实验报告仍待补充。可沿[问题与证据地图](https://guhang2011.github.io/research/)继续审阅已有材料。
