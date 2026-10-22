# React Workflow Board / React 工作流面板

一个围绕“状态是否可解释、异步结果是否会过期、冲突是否能被看见”整理的 React + TypeScript 学习项目。它不连接学校系统，也不包含账号、接口密钥、数据库或真实用户数据。

## 在线阅读

- [React 在线演示](https://guhang2011.github.io/demos/react-workflow/)
- [React 源码 `src/App.tsx`](src/App.tsx)
- [入口 `src/main.tsx`](src/main.tsx)

在线页面加载由 `src/App.tsx` 与 `src/workflow.ts` 构建的本地 React bundle，不依赖运行时 CDN。`npm run build` 只把 React 入口打包到 `assets/workflow.js`；npm 开发依赖仅用于本地类型检查与构建。

## 设计要点

1. **有限状态**：`Status` 和 `transitions` 让可接受的状态转换成为显式契约，避免在按钮事件中散落字符串判断。
2. **版本保护**：每个任务带有 `version`。提交转换时携带期望版本，版本已变化时拒绝写入，避免旧页面覆盖新状态。
3. **过期请求**：`token` 让较早的模拟响应无法覆盖较新的操作。真实服务应在服务端再次校验版本，并返回可读的冲突信息。
4. **异步边界**：重置会取消待处理的模拟响应；请求令牌会忽略过期回调。网络错误保留可重试的操作，版本冲突要求先刷新快照。
5. **可访问交互**：按钮使用原生控件，状态消息使用 `role=status`，状态列和错误路径都能通过键盘操作观察。

## 本地运行

```bash
npm ci
npm test
npm run dev
```

在本网站仓库 `demos/react-workflow` 目录执行，使用 Node.js 22.18+；本次验证环境为 Node.js 25.2.1。`npm run dev` 先构建，再在 `http://127.0.0.1:4173/demos/react-workflow/` 提供预览；源码修改后需重新构建。页面复用网站根目录的导航与样式，请克隆整个网站仓库。发布目录包含构建后的 React bundle，线上打开不需要安装依赖。

## 三分钟体验

1. 审核人点击“通过”，查看任务跨列和版本递增。
2. 重置，将“下次响应”选为“网络错误”，通过任务后观察失败；切回正常响应再重试。
3. 选择“版本冲突”，操作后先刷新快照，再重新确认决定。
4. 请求进行时重置，等待后确认旧结果没有覆盖新面板。
5. 切换负责人，提交草稿；用键盘检查操作后的焦点。

## 工程笔记与验证

[实现取舍与学习记录](design-notes.md) · [状态测试](tests/workflow.test.ts) · [验证记录](../frontend-verification.md) · [第三方许可](THIRD-PARTY-LICENSES.txt)。新增于 2026-10-22，采用 AI 辅助实现与整理。数据为合成任务，不是历史工作交付或论文实验。

React 与 React DOM 为 18.3.1（MIT）。锁文件记录构建依赖，发布时仅包含源码、锁文件、构建产物与说明；不包含 node_modules。

## 边界与下一步

这是客户端学习示例。角色限制由浏览器 reducer 执行，任何人都能修改页面状态；它不能替代服务端授权、数据库事务、审计或生产 SLA。线上冲突和网络错误是确定性模拟，没有连接后端或执行真实请求。
