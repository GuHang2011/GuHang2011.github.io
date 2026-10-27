# 时空建模协议小例子 / Spatiotemporal protocol examples

纯 Python 标准库，Python 3.8+。所有输入均为合成教学数据，不训练 TFT / GNN，也不是 Climate Risk Management 稿件的实验复现。

```sh
python notebook/examples/climate_protocol.py
python -m unittest discover -s notebook/examples -p test_climate_protocol.py -v
```

2026-10-27 实际执行：10 项测试通过。检查覆盖未来特征的可用时间、历史数据修订、分位数损失、边方向与孤立节点、非法图输入，以及完整预测窗口在训练/验证/测试边界处的隔离。

| 教学检查 | 实际输出 |
| --- | --- |
| 预测时已知的未来日历 | 允许 |
| 未来实测降雨 / 晚于预测时点发布的历史修订值 | 拒绝 |
| 示例 0.9 分位数损失 | 1.0 |
| 指向 C 的加权聚合 | 6.5 |
| 移除 B → C 后的聚合 | 2.0 |
| 两年预测窗口跨越分割边界 | purged |

[完整实际输出](climate-protocol-results.json) · [源码](climate_protocol.py) · [测试](test_climate_protocol.py)

The examples check information availability, quantile loss, directed weighted aggregation and label-window isolation. The illustrative year boundaries are not the paper's split. Weighted averaging is not a trained GNN; an edge-removal difference is not a causal effect. No score for the submitted manuscript is reported here.
