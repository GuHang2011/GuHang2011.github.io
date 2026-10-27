# Production Reporting Workbench / 生产报工工作台

This is a small, public learning prototype based on the desktop and mobile production-feedback scenarios recorded in Hang Gu's earlier CV. It demonstrates the interface contracts a production report needs: machine selection, quantity validation, scan reference, visible progress, acknowledgement and retry.

这是根据顾航早期简历中的生产反馈 PC 端与移动端场景整理的公开学习原型，展示机台选择、数量校验、扫码编号、进度反馈、提交确认与重试路径。

## What to try / 操作步骤

1. Select **Load sample** or choose a synthetic machine and enter a quantity from 1 to 9,999.
2. Use **Simulate scan** to fill a synthetic batch reference.
3. Submit the report and observe the four workflow states.
4. Reset, turn on **Simulate network failure once**, then submit. The failed request preserves input and adds no record; retry to confirm it.

中文操作：载入示例 → 选择机台 → 模拟扫码 → 提交。重置后勾选“一次网络故障”，观察失败提示，再次提交。处理中点击重置会取消本次结果；已确认后须修改输入或重置才能创建新报工。

## Design decisions / 实现取舍

- Capture the input before the asynchronous delay. Rendering the receipt from live form values could misreport what was submitted.
- Lock inputs while the request is pending and check a generation counter after each delay. Reset invalidates unfinished requests.
- Guard both pending and confirmed states against repeated submit events. This prevents repeated confirmation in this browser session; it is not server-side idempotency.
- Update bilingual attributes together with the current text. Changing language keeps progress, confirmation and record content consistent.
- Keep the latest eight rows in memory, plus a total count. Refresh clears them; there is no persistence or upload.

提交前保存输入快照；处理中锁定字段；重置通过递增请求代次使旧结果失效。按钮禁用和状态检查共同防止重复确认，但真实系统仍需要服务端幂等键、鉴权、事务和审计。

## Engineering boundary / 工程边界

- All machine names, quantities and records are synthetic.
- The page has no backend, authentication, production database or enterprise credentials.
- The UI is a teaching adaptation; it does not publish the original enterprise source code.
- The animations communicate validation, progress and recovery. They respect `prefers-reduced-motion` and the site's saved motion preference.

## Reading path / 阅读路径

- [Online demo](https://guhang2011.github.io/demos/production-workbench/)
- [CV-based frontend cases](../../cases/early-frontend/README.md)
- [Portfolio project section](https://guhang2011.github.io/#demos)
- [Verification and engineering reflections](../operations-notes.md)

Serve the site root with `python -m http.server 8000`, then open `/demos/production-workbench/`. No build or runtime dependency is required. Source: [app.js](app.js), [shared styles](../operations.css).
