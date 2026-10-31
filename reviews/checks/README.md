# 页面功能回归

`functional-review.js` 使用 Playwright CLI 打开真实浏览器，检查筛选状态、视频链接、截图错误恢复、焦点、打印状态与响应式布局。图片失败使用请求拦截模拟，不会修改服务器文件；操作都发生在本机预览站。

需要 Python 3、Node.js/npm 和 Edge 或 Playwright CLI 支持的浏览器。在仓库根目录准备截图目录和 axe：

```powershell
New-Item -ItemType Directory -Force output/playwright
npm install --prefix output/frontend-audit --no-save axe-core@4.10.3
python -m http.server 8777 --bind 127.0.0.1
```

在另一个终端执行（仍在仓库根目录）：

```powershell
npx --yes --package @playwright/cli playwright-cli -s=portfolio-review open http://127.0.0.1:8777/ --browser=msedge
npx --yes --package @playwright/cli playwright-cli -s=portfolio-review run-code --filename=reviews/checks/functional-review.js
```

脚本成功时返回 `passed: 49`、断言名称、axe 结果与异常列表。`output/playwright/functional-preview-error.png` 记录模拟图片失败后的界面。自动扫描不等于完整人工无障碍评估；模拟视口不替代真实手机验收。

为复查本轮工程演示，可使用既有 `demos/checks/workflows.js`。它包含动态效果开关测试，请在系统和浏览器均未强制减少动态的上下文中开始执行；脚本会另行检查系统减少动态偏好的优先级。
