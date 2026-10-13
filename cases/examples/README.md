# Release-check example / 发布检查示例

`release-gate.mjs` is a pure-function educational extraction of the local counselor system's release checks. It accepts an acceptance summary, browser statistics and current artifact digests, then returns whether release is allowed and any rejection reasons.

`release-gate.mjs` 根据辅导员系统的发布检查规则整理为一个可复用纯函数。输入为验收摘要、浏览器统计和当前产物的校验值；输出包含是否允许发布及拒绝原因。

```powershell
node --test release-gate.test.mjs
```

测试仅使用合成校验值，没有学校数据、账号或密钥。调用方必须自行计算真实 SHA-256 并读取可信验收报告。本示例不执行构建、不扫描文件、不生成部署包，也不能替代原项目的集成与部署验证。

The five tests use synthetic digests and contain no institutional records or credentials. They cover a matching report, a changed artifact, a skipped browser check, missing or incomplete evidence, and malformed input. The caller must calculate real SHA-256 values and read trusted reports. This example does not build, scan or package the application and does not replace integration or deployment validation.

Matching digests establish artifact consistency. They do not establish report authenticity or permission to release.

校验值相同说明产物一致性，不能证明报告真实性或发布权限。
