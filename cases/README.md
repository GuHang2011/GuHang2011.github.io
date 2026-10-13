# Selected local engineering cases / 本地工程案例

These cases connect frontend and service implementation to explicit engineering questions. They describe reviewed local projects without publishing the original configurations, databases, user records or full application source.

这些案例从前端与服务端实现中提炼可阅读的工程问题；原始配置、数据库、用户资料和完整应用源码不在公开范围内。

| Case / 案例 | Start here / 阅读入口 | Evidence / 证据范围 |
| --- | --- | --- |
| College Materials Archive / 学院资料归档 | [Bilingual case & synthetic policy sketch](https://guhang2011.github.io/cases/archive/) · [Engineering note](./college-archive.md) | Source reviewed 2026-10-13; integration tests not rerun / 源码审阅，未重跑集成测试 |
| Counselor Collaboration & Release Verification / 辅导员协作与发布验证 | [Bilingual case & screenshots](https://guhang2011.github.io/cases/counselor/) · [Engineering note](./counselor-release.md) | Existing 17 browser and 18 packaging checks reviewed; full acceptance not rerun / 审阅既有 17 项浏览器与 18 项打包检查记录 |
| Release-check example / 发布检查示例 | [Scope and execution](./examples/README.md) · [Pure function](./examples/release-gate.mjs) · [Synthetic fixtures](./examples/release-gate.test.mjs) | Five synthetic tests run for this public example / 本公开示例执行 5 项合成测试 |

The archive interaction is a simplified client-side policy sketch, not an authorization service. Counselor screenshots use synthetic demonstration content; the online workflow showcase is a separate static sample. SHA-256 comparison checks artifact consistency, not the authenticity of a report.

归档交互是简化的客户端策略示意，不是授权服务。辅导员截图使用合成演示内容；在线工作流展示是独立的静态样例。SHA-256 比对用于检查产物一致性，不能证明报告真实性。
