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

## 悬浮项目播放器

使用相同的本机服务器和 axe 依赖执行：

```powershell
npx --yes --package @playwright/cli playwright-cli -s=portfolio-review run-code --filename=reviews/checks/floating-player.js
```

成功时返回 `passed: 55`、断言名称、两种配色的 axe 结果和异常列表。脚本在测试浏览器内重置语言、配色和播放器会话偏好；不会修改服务器文件。视频播放使用静音，失败重试通过拦截一条 MP4 请求模拟；打印、离页和标签页隐藏通过派发生命周期事件检查。输出桌面入口、桌面窗口及手机窗口三张截图至 `output/playwright/`。

## Mao 双角色演示

先在仓库根目录运行 `python tools/serve_presenter.py`，该服务在 `127.0.0.1:8778` 支持音频范围请求。使用相同 axe 依赖与浏览器会话运行：

```powershell
npx --yes --package @playwright/cli playwright-cli -s=portfolio-review run-code --filename=reviews/checks/mao-presenter.js
```

成功时返回 `passed: 27`，包括真实画布动画、暂停稳定性、角色与章节切换、模型请求失败恢复，以及四种视口检查。测试会暂时拦截模型请求模拟失败，控制台会记录这条预期的失败；`errors` 统计页面脚本异常。
