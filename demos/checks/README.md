# Workflow browser checks / 浏览器验证

Run these Playwright CLI functions from the **website repository root**, using Node.js and Microsoft Edge. They use synthetic inputs, create no external orders and write screenshots under `output/playwright/`.

1. Install the audit helper and create the screenshot folder:

   ```powershell
   npm install --prefix output/frontend-audit --no-save --ignore-scripts --no-audit --no-fund axe-core@4.10.3
   New-Item -ItemType Directory -Force output/playwright
   ```

2. Serve the website in a separate terminal. This server supplies the correct SVG MIME type on Windows:

   ```powershell
   npx --yes --package http-server@14.1.1 http-server . -p 8777 -c-1
   ```

3. Open a dedicated browser session, then execute the checks:

   ```powershell
   npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=ops-check open http://127.0.0.1:8777 --browser=msedge
   npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=ops-check run-code --filename=demos/checks/workflows.js
   npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=ops-check run-code --filename=demos/checks/integration.js
   npx --yes --package @playwright/cli@0.1.22 playwright-cli -s=ops-check close
   ```

`workflows.js` checks validation, failed requests, repeated submissions, cancellation, bilingual state and motion preferences, including 16 language/viewport combinations. `integration.js` checks homepage entries, image decoding, both homepage themes, the mobile menu, keyboard radios and the JavaScript-disabled fallback. The contrast check waits for theme transitions to finish before measuring colors.

The scripts print their assertions and accessibility results. A thrown error means the run failed. Automated accessibility scans cover only the sampled states; they do not establish full WCAG conformance. Timer-based requests measure UI behavior, not backend or production performance.

中文：从站点仓库根目录运行，依次安装 axe-core、启动静态预览、运行两份检查脚本。输出包括断言、屏宽和无障碍扫描结果；失败会抛出异常。截图仅记录合成演示，不包含真实客户或业务数据。
