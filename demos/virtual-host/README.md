# Virtual presenter / 虚拟主播交互演示

[在线操作](https://guhang2011.github.io/demos/virtual-host/) · [101 秒展示视频](../../assets/videos/virtual-host-showcase.mp4) · [60 秒控制流程](../../assets/videos/virtual-host-workflow.mp4)

## 展示内容

新增本地“技能系统 / 丝路智链”使用的 **Mao / 虹色まお** Live2D 官方示例角色，并保留 `VirtualHost.vue` 中的小林 SVG 角色。舞台采用暖白与深青配色，六章讲解涵盖角色介绍、商品核对、讲稿组织、人工检查、播放控制与后续验证。无需账户、后端、摄像头或麦克风即可操作。

- 101.016 秒中文合成语音与双语讲稿；角色动作随章节切换。
- Mao 与小林切换时保留音频播放位置；Mao 加载失败时可重试或使用小林。
- 暂停、重播、章节定位与进度拖动。
- 离开标签页时暂停播放；支持键盘与减少动作偏好。
- 从音频 PCM 计算每秒 24 个音量采样，驱动嘴部开合。**这是音量驱动，不是音素级口型同步。**

## 原理与取舍

`script.json` 保存章节起点、语音时长、双语文字和音量曲线。`studio.js` 以音频的 `currentTime` 为时间源，更新字幕、章节、滑块与当前角色。`mao-renderer.js` 用 PixiJS + pixi-live2d-display 渲染 Cubism 模型，将测量音量写入 `ParamA`，结合模型自带动作与头部参数展示讲解。暂停停止外部动画帧循环，渲染器不运行自己的后台计时器。

没有逐词强制对齐，字幕按章节展示。Mao 使用 Live2D 模型，未使用面部捕捉、写实数字人推理或声音克隆。展示片由同一个公开页面逐帧录制并混入相同配音；60 秒操作片无声，按七个步骤演示开始、暂停、章节定位、切换小林、切回 Mao、减少动作和重播。步骤是可复查的界面回放，不是生产直播录像。

为减少下载量，Mao 纹理由原始 4096×4096 PNG 转为 2048×2048 WebP，从约 8.21 MB 减至 0.95 MB；角色设计、模型与原始动作保持不变。Live2D 运行库和模型仅由本演示页加载，首页使用延迟播放的视频。

## 运行

从网站仓库根目录运行 `python tools/serve_presenter.py`，访问 `http://127.0.0.1:8778/demos/virtual-host/`。该预览支持 Range 请求，用于长音频拖动；普通 `python -m http.server` 在部分浏览器中无法正确拖动 MP3。语音文件已经包含，观看时不需要外部合成服务。

生成步骤（Node.js、Playwright CLI、Python、edge-tts、Pillow 和 FFmpeg）：

```powershell
# 已有配音无需重新合成；重新合成只发送公开讲稿。
python tools/build_presenter_voice.py --site . --ffmpeg <ffmpeg-path>
New-Item -ItemType Directory -Force output/playwright/presenter-frames
npx --yes --package @playwright/cli playwright-cli -s=presenter open http://127.0.0.1:8778/demos/virtual-host/ --browser=msedge
npx --yes --package @playwright/cli playwright-cli -s=presenter run-code --filename=tools/record_host_videos.js
python tools/encode_host_videos.py --site . --ffmpeg <ffmpeg-path>
```

录制是 1280×720、24 fps，使用同一份章节数据与音量曲线。若更改配音，需同步重新录制视频、生成字幕和更新视频时长文案。

## 素材与边界

- Mao：Live2D Inc. 的官方示例角色，非本人原创人物。模型说明见 `models/mao_pro/ReadMe.txt`，使用条款保留于 [LIVE2D-NOTICE.md](LIVE2D-NOTICE.md)。仅本公开演示需要的运行时文件随作品提供。
- 小林：既有本地项目的二维 SVG 组件；项目基于 MIT 许可的 vue-next-admin。原许可保留在 `THIRD-PARTY-LICENSE.txt`。
- 运行库：PixiJS 6.5.10、pixi-live2d-display 0.4.0，其 MIT 许可保留于 `vendor/`。Cubism Core 的版权头保留，适用 [Live2D Proprietary Software License](https://www.live2d.com/eula/live2d-proprietary-software-license-agreement_en.html)，不受本项目代码的 MIT 许可覆盖。
- 声音：通过 Microsoft Edge TTS 的通用 `zh-CN-XiaoxiaoNeural` 声音生成，无真人录音和声音克隆；公开讲稿见 `script.json`。
- 商品：合成草原蜂蜜教学样品，没有真实交易、价格承诺、用户或订单数据。
- 这是一段工程展示，不能据此推断数字人模型效果、实时服务延迟或商业部署能力。

This content uses sample data owned and copyrighted by Live2D Inc. The sample data are utilized in accordance with terms and conditions set by Live2D Inc. This content itself is created at the author’s sole discretion.

## 自学与项目心得

1. **统一时钟**：字幕、角色和进度以音频时钟为准，避免各自计时产生漂移。
2. **暂停是状态变化**：既要停止声音，也要停止角色动作、进度更新和过期异步结果。
3. **把展示与模型能力分开**：二维动画适合验证交互；写实数字人另需评估身份保持、遮挡、同步和渲染成本。
4. **公开可复查的材料**：同一讲稿、音频、源代码与视频便于检查；不能把教学数据解释为真实业务结果。

后续练习：逐词时间戳、更细粒度口型、真实移动设备与更多辅助技术兼容性。
