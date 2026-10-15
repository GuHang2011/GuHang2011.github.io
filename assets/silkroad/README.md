# Silk Road interface screenshots / 丝路智链界面截图

These are browser captures of the existing Vue production frontend, with its files served unchanged. A separate loopback-only fixture server supplied synthetic API responses for the business screens. The server did not access the original database or proxy a backend. No business write, paid model call, payment or device operation was executed while capturing these images.

图片为现有 Vue 生产构建的浏览器实拍，前端文件保持原样。业务界面由独立本地接口提供合成教学数据，没有连接原数据库、付费模型、支付或设备。截图用于展示界面与状态表达，不作为后端联调或真实运营成效的证据。

| File | Dimensions | Content |
| --- | --- | --- |
| `login-desktop.jpg` | 1280 × 720 | Empty login form; China–Kazakhstan visual theme / 空白登录表单与中哈合作主题 |
| `login-mobile.jpg` | 390 × 844 | Mobile breakpoint; empty fields / 手机布局与空白字段 |
| `marketing-desktop.jpg` | 1280 × 720 | Synthetic product and reviewed template copy / 合成商品与已审核模板文案 |
| `orders-desktop.jpg` | 1280 × 720 | Synthetic order ledger / 合成教学订单台账 |
| `fulfillment-desktop.jpg` | 1280 × 720 | Scrolled view of simulated task progress / 滚动至教学仿真任务状态 |

`demo-guide`, DEMO order numbers, product names containing “合成样品” and customer labels “合成客户” are fixture values, not real accounts, customers or orders. The login screenshots contain no entered account or password. Browser screenshots are published without replacing UI elements or compositing different states.

`demo-guide`、DEMO 订单编号、“合成样品”和“合成客户”均为专门构造的样例。登录截图没有输入账号与密码；图片没有替换界面元素或拼接不同业务状态。

The UI adapts the existing college application and its MIT-licensed vue-next-admin foundation. Digital trade artwork is identified as project-original in the local design notes. Flag sources: [China / Wikimedia Commons](https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg), [Kazakhstan / country-flags](https://github.com/hampusborgos/country-flags/blob/main/svg/kz.svg).

See the [case](../../cases/silkroad/README.md), [engineering note](../../cases/silkroad/order-consistency.md) and [historical test record](../../cases/silkroad/verification.json) for provenance and scope.
