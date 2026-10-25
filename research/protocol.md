# Reliable multimodal emotion recognition · Proposed protocol

# 可靠多模态情绪识别：拟实验协议清单

**Status / 状态：拟研究方案，尚未执行。** Updated 2026-10-25 from the supplied research proposal. This is a public checklist, not a completed experiment log. The full private RP and datasets are not included.

[Bilingual research plan / 双语研究计划](https://guhang2011.github.io/research/statement.html) · [Existing research / 已有研究](https://guhang2011.github.io/research/fusion-audit.html) · [Engineering foundation / 工程基础](https://guhang2011.github.io/research/statement.html#preparation)

## 1. Research questions / 研究问题

| Question | Controlled comparison | Evidence |
| --- | --- | --- |
| RQ1 · 预算约束适配 | 冻结表征线性 / MLP、轻量适配器与交互融合；总标注预算及调参机会一致 | Macro-F1、UAR、按类召回、预测类别比例及训练 / 缓存成本 |
| RQ2 · 证据感知决策 | 缺失、噪声、遮挡、转写扰动；分别移除质量、分歧与校准 | 风险—覆盖曲线、相同覆盖率下风险、相同风险下覆盖率、ECE |
| RQ3 · 遗忘约束更新 | 相同类别顺序、固定回放容量和计算预算；沿用阈值与重新校准对照 | 新旧类别表现、阶段均分、遗忘、校准漂移与更新成本 |
| RQ4 · 系统综合验证 | 配对重复、跨数据集分别验证、缺失输入、接口异常、超时与版本回退 | 结论稳定性、逐样本记录、延迟、复核触发、整套配置一致性 |

Studies 1–3 progress in sequence; integrated validation accompanies every stage. Measures above are planned evidence, with no results or performance claims yet.

## 2. Data and label budget / 数据与标注预算

- [ ] 确认 MELD 与拟使用的 IEMOCAP 数据访问授权，记录版本、模态、标签、会话和可用分组信息。
- [ ] 先复现常用划分，再补充分组实验；分别报告官方与额外划分，不直接把 MELD 官方划分称为说话人独立。
- [ ] 审计跨集合的相同会话、素材、近重复、字幕模板与背景线索。
- [ ] 核算训练、选模、校准使用的不同标注样本；同一已标注样本的开发阶段重复使用不重复计费，新增类别标注按阶段累计。
- [ ] 独立测试标签不参与方法或阈值选择，测试集规模单独记录。
- [ ] 预实验后冻结预算网格及重复次数。RP 建议每类 2、4、8、16、32 个训练样本、5 个训练种子、20 次配对验证抽样；这些是拟设置，不是已完成运行。
- [ ] 各方法共享索引、种子与调参次数；不同数据集分别报告，标签映射预先固定。

Count distinct labels across training, selection and calibration; evaluate the final frozen protocol on an independent test set. The proposed grid and repetition counts must be fixed after pilots, before final testing.

## 3. Decision protocol / 决策协议

1. 记录模态缺失掩码和可得质量代理；不得利用情绪测试标签构造质量信号。
2. 缺失模态权重置零，其余权重归一化；全部模态缺失时返回“证据不足”。
3. 在预算内拟合校准参数与联合阈值：最高校准类别概率不低于置信阈值，且模态分歧不高于分歧阈值，才自动输出类别。
4. 分别比较固定融合、质量门控、仅置信规则、仅分歧规则与完整方案；报告覆盖率代价及高置信错误。
5. 未知类别检测、受限开放词表识别作为独立扩展协议，不混用指标或把提供未见类别描述等同于使用其标注训练样本。

Quality, disagreement and calibrated confidence are different signals. Evaluate their individual contributions and combined risk–coverage trade-off. Requesting review does not itself demonstrate that human review is effective.

## 4. Continual updates / 持续更新

- [ ] 预先固定多个类别增量顺序；测试时不提供真实任务编号。
- [ ] 固定回放容量、训练步数或可比计算预算，单独报告新增标注、存储和耗时。
- [ ] 比较顺序微调、参数约束、提示 / 适配器更新与有限回放；全历史联合训练仅作为额外资源参考上界。
- [ ] 每阶段分别记录新类、旧类、遗忘与校准变化，并比较沿用阈值和重新校准。
- [ ] 仅用开发集完成候选版本检查；启用条件在独立测试前冻结。
- [ ] 保存和恢复完整版本：权重、预处理、标签映射、类别描述、校准参数及阈值。

## 5. Recording and failure checks / 记录与异常检查

| Record | Planned fields / 拟记录字段 |
| --- | --- |
| Protocol | 数据版本、划分、分组、预算分配、调参次数、种子、类别顺序 |
| Prediction | 样本 ID、会话 / 分组、真实标签、类别顺序、分数 / 概率、预测类别、模态质量与可用性、复核原因、版本 |
| Update | 旧版与候选版标识、回放清单、更新预算、新旧类结果、校准配置、检查结论 |
| Runtime | 硬件、输入长度、并发、端到端 / 特征提取耗时、超时与异常类型、启用 / 回退记录 |

- [ ] 保存分数或概率，避免只保存硬预测而无法开展后续校准及风险—覆盖分析。
- [ ] 关键结论报告重复结果的均值和离散程度；使用配对比较及按会话分组的区间估计。
- [ ] 在固定硬件、输入长度与并发条件下测量延迟，并同时记录编码、缓存与训练开销。
- [ ] 检查输入缺失、接口错误、超时、候选版本未通过、切换中断及完整版本回退。
- [ ] 若复杂方案没有稳定收益，保留简单基线；若覆盖率降低或旧类退化，报告代价与失败案例。

## 6. What is already available / 已有材料

- [Neurocomputing 修订稿解读](https://guhang2011.github.io/research/fusion-audit.html)：344 次训练运行的保存预测重分析；已投稿、尚未录用。这是新闻任务研究，不能直接作为情绪任务结果。
- [公开研究与工程代码入口](https://guhang2011.github.io/research/#evidence)：关联实现、复现学习与工程检查具有不同范围。
- [React 状态机示例](https://guhang2011.github.io/demos/react-workflow/)：使用合成任务说明状态、冲突和恢复，属于独立学习演示。

Planned period: September 2027–August 2031. No emotion-recognition training, dataset access, model checkpoint or benchmark result is claimed by this checklist.
