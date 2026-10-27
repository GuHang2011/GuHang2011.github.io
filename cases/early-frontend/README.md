# 早期前端工程项目 / Early frontend projects

[在线阅读 / Read online](https://guhang2011.github.io/cases/early-frontend/)

根据本人提供的旧简历整理项目描述；本次未提供这四个项目的原始源码、截图或量化结果。

Project descriptions from a historical CV supplied by the author. No original source, screenshots or measured outcomes were supplied for these four projects.

整理日期：2026-10-27。以下是历史经历整理，不是 2026 年新完成的项目。保留当时技术栈；不补写项目日期、用户规模、效率提升或未提供的源码成果。

## 生产反馈 · PC 端 / Production feedback · Desktop

**业务场景：** 面向工厂生产流程的报表管理系统，支持大版反馈、后工反馈等业务。

**我的职责：** 参与团队开发，主要负责整体页面排版、浏览器表现一致性、部分交互与项目整合，并优化页面结构和功能。

**技术栈：** Vue, Vuex, Vue Router, Webpack, ES6, Element UI, vw

A reporting interface for production-process feedback, including printing-sheet and post-processing feedback.
Worked within a team on overall page layout, cross-browser consistency, selected interactions and project integration; refined page structure and functionality.

### 回看与学习 / Retrospective learning

回看报表类界面，统一布局只是第一步。更值得检查的是切换页面后筛选条件、表格状态和错误提示是否一致。

A shared layout is only part of consistency. When revisiting a reporting interface, check whether filters, table state and error feedback stay aligned during navigation.

- 分别检查表格长文本、空结果与请求失败。 / Test long table values, empty results and failed requests separately.
- 将通用布局组件与业务状态分开维护。 / Keep reusable layout components separate from business-specific state.

[延伸笔记：异步请求竞态](https://guhang2011.github.io/notebook/async-interfaces.html)

## 生产反馈 · 移动端 / Production feedback · Mobile

**业务场景：** 方便工厂业务人员及时报工、选择机台和扫描查询，支持移动场景中的生产进度反馈。

**我的职责：** 主要负责页面布局、页面切换和移动端效果实现。

**技术栈：** HTML5, CSS3, rem, transform / animation, LocalStorage, Swiper

A mobile interface for workers to report progress, choose a machine and access scan-based queries in printing workflows.
Implemented page layouts, page transitions and mobile presentation.

### 回看与学习 / Retrospective learning

本地缓存与提交成功是两种状态。缓存的表单不应被误认成已确认的报工记录；旧简历仅记载使用 LocalStorage，不能据此认定实现了离线同步。

Local caching and successful submission are different states. A cached form should not look like a confirmed production record; the old CV records LocalStorage use but does not establish an offline synchronization mechanism.

- 检查小屏布局、触摸目标、键盘遮挡和减少动态效果设置。 / Check small screens, touch targets, keyboard obstruction and reduced-motion settings.
- 明确缓存过期规则，区分待提交输入与服务端已确认数据。 / Define cache expiry and distinguish pending input from server-confirmed data.

[延伸笔记：可访问的交互](https://guhang2011.github.io/notebook/accessible-interactions.html)

## 思悦后台管理系统 / Siyue administration system

**业务场景：** 面向印刷工厂的网页后台，覆盖生产工序反馈、发货管理、收款统计及报价算价等功能。

**我的职责：** 主要负责页面布局与页面渲染。上述业务范围属于系统整体功能，不表示独立完成全部模块。

**技术栈：** Vue CLI, Webpack, Element UI, vue-resource

A web administration system for a printing factory, covering production feedback, shipment management, receipt statistics and quotation calculation.
Primarily responsible for page layout and rendering. The business scope describes the system as a whole, not sole ownership of every module.

### 回看与学习 / Retrospective learning

后台页面的复用需要明确字段规则和请求状态，不能只统一表格样式。配置驱动表单可以作为独立练习，用来拆解这种边界。

A reusable admin page needs explicit field rules and request states, not just matching table styles. A schema-driven form is a useful separate exercise for examining that boundary.

- 抽取公共表单前，先列清字段类型、默认值与校验规则。 / List field types, defaults and validation rules before extracting shared forms.
- 分别表达加载、空数据、校验错误与请求失败。 / Separate loading, empty, validation-error and request-error states.

[体验独立的表单设计学习 Demo](https://guhang2011.github.io/demos/low-code-form/)

## 固网开发平台 / Fixed-network service platform

**业务场景：** 为海外客户定制的电信后台，包含开户、停机、移机、收银台和订单预览等界面。

**我的职责：** 负责前台页面逻辑，参与 Bundle 模块及开户、停机、移机等功能页面开发。

**技术栈：** Fish framework, Handlebars templates, Event listeners

A customized telecom administration platform for overseas customers, with account opening, service suspension, relocation, cashier and order-preview interfaces.
Implemented frontend page logic for the Bundle module and account-opening, suspension and relocation pages.

### 回看与学习 / Retrospective learning

按钮可见不等于业务操作合法。状态化界面练习有助于说明哪些操作允许执行、过期响应如何处理；旧简历未记录具体状态机实现。

A visible action is not necessarily a valid business transition. State-based UI exercises help describe which actions are permitted and how stale responses should be handled; the historical CV does not document a specific state-machine implementation.

- 写清操作前置条件、预期响应与失败提示。 / State each action’s preconditions, expected response and failure display.
- 检查页面反复挂载、卸载时监听器是否正确清理。 / Check listener cleanup when views are mounted and removed repeatedly.

[体验独立的 React 工作流 Demo](https://guhang2011.github.io/demos/react-workflow/)

## 阅读范围 / Scope

关联 Demo 与笔记是独立学习材料，不是原企业系统源码、截图或重建版本。回看部分的设计建议不表示原系统曾实现或通过相应检查。

The linked demos are separate public examples. Retrospective checks are suggestions, not historical test results.

原始简历未公开；仅整理项目经历。技术名称 Handlebars 按通常写法整理，旧简历拼写为 Handlerbars。

[结构化项目索引 / Project index](projects.json)
