# Agent 入门练习：查笔记、确认、保存草稿

这是[教程](https://guhang2011.github.io/notebook/agent-development-guide.html)的离线配套代码，另有[实现笔记](https://guhang2011.github.io/notebook/agent-runtime-notes.html)。它用固定脚本代替模型决策，让工具循环和失败行为可以稳定复现。

没有模型调用、API Key、第三方依赖、联网、文件写入或 GitHub 上传。三条笔记是合成教学资料。`save_draft` 写入本次进程的内存，退出后消失。

## 运行

使用支持所用 API 的 Node.js 22 或以上环境；实际验证版本为 **25.2.1**。从本目录下载三个 `.mjs` 文件到同一个目录即可运行，不必安装依赖。

```sh
node run.mjs --preview
node run.mjs --interactive
node run.mjs --deny
node --test agent.test.mjs
```

每个命令启动独立会话。`--preview` 是默认模式，在写入前退出；`--interactive` 显示完整提案，只有终端输入 `yes` 才确认；`--deny` 模拟用户拒绝。交互输入等待时按 Ctrl+C 会取消本次会话。

| 模式 | 应看到的状态 | 草稿数量 |
| --- | --- | --- |
| preview | `awaiting_approval`，显示待确认提案 | 0 |
| interactive，输入 yes | `done`，工具返回 `storage: memory-only` | 1 |
| interactive，输入其他内容 / deny | `done`，工具返回 `USER_DENIED` | 0 |

`done` 表示这轮对话结束，**不代表写入必定成功**。是否写入，应检查工具结果和 `drafts`。

## 文件与职责

| 文件 | 责任 |
| --- | --- |
| `agent.mjs` | 工具声明、运行时参数检查、会话状态、轮次限制、模型超时、取消、确认和固定模型脚本 |
| `run.mjs` | 可信终端入口：预览具体内容，接收用户确认，输出结果 |
| `agent.test.mjs` | 18 项确定性测试，覆盖正常流程与失败情况 |

一次典型运行是：查询资料 → 返回带编号的来源 → 提议保存 → 暂停 → 终端确认／拒绝 → 把工具结果交回脚本 → 结束。参数由模型提出，权限由宿主检查。代码不向模型暴露确认方法。

## 关键约定

- 每轮最多一个工具调用，默认最多六轮，恢复确认不会重置轮次数。
- 每次模型调用有三秒本地超时。这是教学参数，需要按真实服务的延迟重新设计。
- `save_draft` 只能引用本会话已检索过的资料编号；这不证明来源相关性或回答准确性。
- 手写参数检查只覆盖两个工具，不是通用 JSON Schema 实现。
- 预览返回深拷贝；宿主按保存的参数快照执行。确认有效期一分钟，同一确认只能消费一次。
- 相同参数在本会话内按内容摘要去重；没有跨进程的数据库事务或持久化。
- `AbortSignal` 与等待竞争用于拒收迟到结果，不能强制终止忽略信号的远端服务或撤销已经发生的写入。
- 模型异常统一转成有界的错误信息；真实系统还需在服务端存放经过脱敏的详细诊断。

## 接真实服务之前

将 `scriptedModel` 换成服务端适配器，映射供应商消息、工具声明和调用编号。本例使用自定义内部消息协议，不是任何 SDK 的直接请求格式。适配器需处理结构化输出、拒答、截断、限流、取消和多工具返回。

网页确认接口必须验证登录身份、会话归属、操作权限和 CSRF／重复请求。随机确认编号本身不是授权凭证。网络工具也要设置超时、访问范围和返回长度限制。接数据库后，再做事务、唯一操作编号、故障恢复与日志脱敏。

本次只验证宿主逻辑。没有测量真实模型成功率、费用、检索效果或提示注入防御能力。[验证记录](https://guhang2011.github.io/reviews/agent-learning-20261108.md)列出了实际执行范围。

## 建议的下一次练习

1. 给搜索增加一个明确选定的公开笔记目录，保留文件和段落来源。
2. 为没有结果、资料重复和权限不足补测试。
3. 接一个真实模型适配器，用固定任务集记录失败轨迹。
4. 将待确认状态接到 React + Ant Design 页面，保留拒绝、取消和键盘操作。

## English

This is an offline teaching runner, not a live LLM agent. A scripted model chooses between searching three synthetic notes and saving a draft in process memory after host approval. No dependencies, credentials, network, file writes or publication are involved.

Run the commands above with Node.js 22+; the checked runtime was 25.2.1. Preview stops before the write. Interactive mode requires `yes` in the terminal. Denial leaves zero drafts. Each invocation starts a new session. `done` means the conversation ended, not necessarily that a write succeeded.

The 18 tests check validation, approval snapshots, expiry, replay rejection, in-session deduplication, turn budgets, concurrent-run rejection, timeouts and late output. They establish no live-model success rate or general prompt-injection protection. A production adapter needs provider-specific message mapping, authenticated session-bound approval, persisted operation IDs, network-tool limits, recovery and separate task evaluation.
