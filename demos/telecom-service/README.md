# Telecom Service Desk / 电信业务办理台

This is a public, synthetic workflow prototype based on the fixed-network service and account-opening scenarios recorded in Hang Gu's earlier CV. It turns a multi-step request into a small state machine: customer lookup, service selection, order review and confirmation.

这是根据顾航早期简历中的固网开发平台、开户、停机和移机场景整理的公开合成原型，把业务办理拆成客户查询、业务选择、订单复核和确认四个状态。

## What to try / 操作步骤

1. Select **Load fictional customer**, or enter a fictional name and an 11-digit demo number, then look up the account.
2. Choose new install, suspend or move line. New install and move line require a synthetic address.
3. Review the generated order summary before submission.
4. Turn on **Simulate duplicate-order conflict** at review, continue, and submit. The flow returns to review without accepting the order. Select **Clear simulated conflict**, continue, and submit again.

中文操作：载入虚构客户 → 查询 → 选择新装、停机或移机 → 复核 → 提交。复核时勾选“模拟重复订单冲突”，提交后会退回复核；点击“解除本次模拟冲突”后继续。点击“新建请求”会取消尚未完成的查询或提交。

## Design decisions / 实现取舍

- Lookup and commit use an explicit pending state. The customer cannot change midway through a pending lookup.
- Validate before leaving each step. New install and relocation require an address; suspension hides it and reports it as not required.
- Keep order progress at 75% until acknowledgement. A screen reaching the final step is not the same as a successful commit.
- A duplicate conflict returns to the visible review panel and blocks Continue until reviewed or revised. An explicit control clears only the synthetic conflict; a real duplicate order would need server reconciliation.
- Move keyboard focus to the new step's heading, retain radio-key navigation, and keep status text in both languages.
- Lock the completed order. New request resets state, invalidates pending callbacks, and clears the old receipt.

流程完成度以确认结果为准，不以“进入最后一步”为准。冲突应出现在用户能够处理的步骤，不能只在隐藏面板中写入提示。这里的冲突解除仅是教学模拟；真实订单需要服务端唯一约束、版本检查或人工核对。

## Engineering boundary / 工程边界

- Customer details, addresses and order IDs are fictional.
- The prototype has no carrier API, authentication, billing, persistence or real customer data.
- It documents a reusable front-end workflow idea; it does not recreate the original telecom platform or source code.
- Step transitions, the progress bar and conflict feedback respect `prefers-reduced-motion` and the site's saved motion preference.

## Reading path / 阅读路径

- [Online demo](https://guhang2011.github.io/demos/telecom-service/)
- [CV-based frontend cases](../../cases/early-frontend/README.md)
- [Portfolio project section](https://guhang2011.github.io/#demos)
- [Verification and engineering reflections](../operations-notes.md)

Serve the site root with `python -m http.server 8000`, then open `/demos/telecom-service/`. No build or runtime dependency is required. Source: [app.js](app.js), [shared styles](../operations.css).
