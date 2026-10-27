# Two engineering workflows / 两个工程流程的实现心得

Updated: **28 October 2026**. [Production reporting](production-workbench/) · [Telecom services](telecom-service/).

These are newly written learning prototypes inspired by scenarios in the author's historical CV. The public source and browser captures belong to these prototypes; no employer source code, real customer details or business measurements are included. Both run in the browser using synthetic records and timers to simulate requests.

这两个页面根据历史简历中的生产反馈和固网业务场景重新编写。截图是新原型的浏览器实拍，数据为合成样例。它们展示前端实现取舍，不等同于原企业系统的源码、截图或上线成果。

## 1. Freeze the input before waiting / 等待前先保存输入

A successful response must describe the values that were submitted. If a callback reads an editable input after a delay, it may report a different machine or quantity. The reporting demo captures a small object first, then disables the related controls. A generation counter makes an unfinished callback harmless after Reset.

异步回调直接读取表单可能把“提交时的数量”变成“后来输入的数量”。报工页先保存快照，再锁定输入；重置递增请求代次，旧回调即使返回也不能继续写入界面。按钮禁用只解决一部分交互问题，状态检查也必须覆盖程序触发的重复提交。

## 2. Put recovery where the user can act / 把恢复操作放回可处理的位置

The telecom demo returns a duplicate conflict to the order-review step. The message, summary and recovery control are visible together. It also distinguishes reaching the final step from receiving confirmation: progress reaches 100% only after the simulated acknowledgement.

冲突提示如果放在已经隐藏的步骤中，技术上“显示了错误”，用户实际上仍然不知道发生了什么。这里返回订单复核，展示摘要和解除模拟冲突按钮；直到收到确认才显示 100%。这比单纯增加弹窗更能说明业务状态。

## 3. Motion should explain a state change / 动画应解释状态变化

The progress bar interpolates between workflow stages; step panels appear with a short transition; a newly confirmed row enters once; the activity indicator pulses only during a pending request. There is no endless background animation. A visible motion checkbox honors the saved site preference and the operating system's reduced-motion setting.

进度条、步骤切换、确认记录入场和请求状态提示分别对应具体操作。减少动态效果后，状态和文字照常更新，不依赖动画传递结果。页面翻译同样属于状态更新，不能把“已确认”重新覆盖成静态的“草稿”。

## 4. Browser safeguards have limits / 浏览器保护的边界

These examples do not implement authentication, server-side idempotency, billing, camera scanning, durable storage or real telecom provisioning. A production extension would validate again on the server, bind mutations to a user and request ID, persist an audit trail, and reconcile retries with committed state. Clicking the conflict-clear button here is only a simulator action.

这些页面没有后端事务、服务端幂等、计费、摄像头扫码或真实业务开通。迁移到生产系统时，还需在服务端重新校验、绑定用户与请求 ID、记录审计日志，并确认重试是否对应已提交的业务。

## Verification / 验证记录

Playwright with Microsoft Edge was used on **28 October 2026**:

- **34 interaction assertions passed**: validation, input locking, failure/retry, duplicate-confirmation prevention, pending-result cancellation, conditional address rules, conflict recovery, step focus, bilingual state retention and motion preferences.
- **16 layout combinations passed**: both demos, English and Chinese, at 320, 390, 768 and 1280 CSS pixels; no document-level horizontal overflow.
- **Three axe-core scans reported zero WCAG 2 A/AA and 2.1 AA violations** in the checked production desktop, telecom completion and Chinese mobile review states. Automated checks are not a complete accessibility assessment.
- No JavaScript page exceptions were observed in these flows. The tests concern synthetic UI behavior, not production performance or backend reliability.

34 项交互断言通过，16 组双语屏宽检查无横向溢出；三个状态的无障碍自动扫描未发现违规。所有结果仅描述这个合成原型，不能推导原企业系统的质量或性能。

An additional **21 integration assertions passed**, including both homepage themes, eight gallery entries, mobile navigation, keyboard radio controls, the no-JavaScript fallback and delayed-script loading. Native controls stay disabled until workflow handlers are attached, preventing an early click from submitting the browser's default GET form. The two homepage theme scans reported zero violations after palette transitions completed. See the [browser-check source and commands](checks/README.md) to reproduce the checks.

另有 21 项集成断言通过，覆盖首页双主题、演示入口、手机导航、键盘选择、无 JavaScript 的阅读回退与脚本延迟加载。业务脚本准备好后才启用表单，避免过早点击触发浏览器默认提交。两次首页主题扫描未发现违规；[验证脚本与运行方法](checks/README.md)随源码公开。
