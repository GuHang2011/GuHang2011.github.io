# Spark 与数据准备：从可解释的小实验到可复现的作业

**记录日期：2026-10-13。类型：新编自学笔记与合成示例。**

本笔记依据本地 Spark、词频、SQL、数据采集与预处理学习主题重新组织。例子均为原创合成数据。没有复制教材页面、教学考试题或私人数据，也没有声称本次在本机运行了 Spark 集群。配套浏览器实验只解释处理语义，不能代替分布式实验。

## 1. 零值与缺失值是不同事实

一条金额为 0 的事件是“观测到零”。空金额表示“不知道金额”。把两者都当作假值删除，会改变事件数、分组占比和后续分析的样本范围。

```python
# 原创示例：判断的是未知，不是数值真假。
observed = [amount for amount in [0, None, 12] if amount is not None]
assert observed == [0, 12]
```

缺失处理必须与业务含义对应。在合成演示中，默认将空金额送入隔离区；另一策略将它标记为显式填充零。第二种策略只用于展示假设如何改变结果，并不说明真实消费、成绩或实验观测适合填零。发布结果时应同时记录填充标记与被排除的行数。

## 2. Transformation 描述计划，Action 请求结果

Spark 的 `filter`、`select`、`withColumn` 等 transformation 建立处理计划。`count`、写出、`collect` 等 action 请求计算结果；DataFrame 的优化器可能改写执行计划，不能简单地把每行源码当作独立执行一步。

```python
# 原创 PySpark 结构示例；用于阅读，未在本次作品集更新中执行。
from pyspark.sql import functions as F, types as T
from decimal import Decimal

schema = T.StructType([
    T.StructField("event_id", T.StringType(), False),
    T.StructField("group_id", T.StringType(), False),
    T.StructField("amount", T.DecimalType(12, 2), True),
])
events = spark.createDataFrame(
    [("s1", "A", Decimal("0.00")), ("s2", "A", None),
     ("s3", "B", Decimal("8.00"))], schema,
)

retained = events.filter(F.col("amount").isNotNull())
totals = retained.groupBy("group_id").agg(
    F.count("*").alias("event_count"),
    F.sum("amount").alias("amount_total"),
)
totals.explain(mode="formatted")  # 查看计划，不是性能结论。
totals.show()                     # 请求计算并展示小结果。
```

这段结构只处理缺失与分组；它尚未实现配套页面的日期契约和冲突去重。在真实作业中，解析失败与合法空值需要分开统计。`collect()` 会把结果带到 driver；不能因为小样例成功，就对大型事件表全量调用它。

## 3. “同 ID”不保证“同一个值”

两个相同 ID 的记录可能是重复传输，也可能是修正版本。先定义事件主键和版本语义，再选择策略。

配套实验比较标准化后的时间、组别和金额：完全一致的记录保留一条；不同版本默认整体隔离。“保留第一条”则依赖输入顺序，属于一个可观察的策略假设。Spark 的 `dropDuplicates(["event_id"])` 本身不保证为冲突版本选择业务上的最新记录。

有明确版本时间时，可以用窗口表达顺序，但还应定义同时间的打破平局条件：

```python
# 结构片段：updated_at 与 version_id 都必须有经验证的业务含义。
from pyspark.sql import Window, functions as F

order = Window.partitionBy("event_id").orderBy(
    F.col("updated_at").desc(), F.col("version_id").desc()
)
latest = verified.withColumn("rank", F.row_number().over(order))
latest = latest.filter(F.col("rank") == 1).drop("rank")
```

没有稳定版本字段时，“最新”不可验证。应保留冲突记录和策略日志，而不是在报告中宣称已经恢复真实事件。

## 4. 分区数量与数据倾斜是两类问题

增加分区可以改变并行度，但同一个热点键仍可能聚集大量数据。先查看分组频数、分区数据量、shuffle 读写和慢任务；再判断是并行度不足、热点键、文件碎片还是内存压力。

例如，若 A 组占 90% 的事件，按组聚合时一个热点可能主导耗时。可讨论局部聚合、salting、广播小表或自适应执行，但每一种手段都要验证语义和代价。不能仅凭代码中出现 `repartition` 就声称解决了倾斜。配套的 17 行浏览器实验没有测量分区或运行性能。

## 5. 词频到 SQL：先定义边界，再写聚合

词频的关键通常不在加一，而在什么算“一个词”：大小写、Unicode、标点、空白、中文分词和停用词表会改变结果。建议同时保存分词规则版本和小型反例集。

SQL 聚合同样需要清楚的计数语义：`COUNT(*)` 统计行，`COUNT(amount)` 统计非空金额；`SUM` 对空值的语义不等于把所有空值自动解释为零。跨引擎使用时应读取对应版本文档。

```sql
-- 原创合成表结构示例，不来自教学考试题。
SELECT group_id,
       COUNT(*) AS input_rows,
       COUNT(amount) AS observed_amounts,
       SUM(amount) AS observed_total
FROM synthetic_events
GROUP BY group_id;
```

报告至少同时说明输入行数、有效行数、去重前后行数、隔离原因和金额总量。单个合计值不足以解释数据准备过程。

## 6. 用于建模的统计量只能从训练集拟合

数据准备进入模型任务后，应先固定训练、验证和测试划分，再拟合标准化、词表、编码器和统计型填充。若先在全数据上求均值，再划分样本，验证和测试的信息已经进入训练过程。

同一人、同一文档来源或重复事件还可能跨集合泄漏。分组划分与时间划分应对应研究问题；“随机种子固定”并不能自动解决这些泄漏。

可复现清单：数据版本、筛选规则、划分 ID、随机种子、拟合范围、依赖版本和运行命令。公开资料里应把教学演示、代码复现和实际研究结果区分清楚。

## 7. 配套实验可以验证什么

- 明确区分零值、缺失和不合法数字。
- 拒绝 `2026-02-30` 等自动进位后看似有效的日期。
- 比较完整冲突隔离与源顺序保留第一条的结果。
- 将整数分的组内合计与保留事件总量对账。
- 检查完整清洗再次应用时的数据幂等性。
- 在分步执行中观察哪些决策尚未发生。

这些验证说明有限合成输入上的语义与边界，没有证明真实数据库完整性，也没有提供分布式性能证据。

## 公开参考与教学主题致谢

- [Apache Spark SQL, DataFrames and Datasets](https://spark.apache.org/docs/latest/sql-programming-guide.html)：DataFrame、SQL 和执行计划。
- [Apache Spark RDD Programming Guide](https://spark.apache.org/docs/latest/rdd-programming-guide.html)：惰性计算、transformation、action 和 driver 边界。
- [Apache Spark SQL Performance Tuning](https://spark.apache.org/docs/latest/sql-performance-tuning.html)：shuffle 分区、自适应执行、join 与倾斜问题。
- [PySpark DataFrame.dropDuplicates](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.DataFrame.dropDuplicates.html)：按列去重的接口含义。
- 林子雨的 Spark 与数据采集、预处理教学主题为本次选题提供背景，相关公开教学入口：[厦门大学数据库实验室](https://dblab.xmu.edu.cn/)。本页为重新编写的笔记与样例，不转载教材内容，也不暗示教材作者参与或认可本项目。

文档链接使用 `latest`，实际复现时应固定 Spark 版本并检查对应版本的接口行为。
