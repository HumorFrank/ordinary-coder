# 面向资料编程

> 面试官问我怎么造火箭，进去让我拧螺丝？但我真的准备了造火箭的资料。"

## DOM/HTML标准

- [DOM标准](https://htmlspecs.com/dom/)：现行标准，DOM 定义了一个平台中立的模型，用于事件、活动中止和节点树。
- [HTML标准](https://htmlspecs.com/)：现行标准，该规范定义了网页平台的大部分内容，详细程度很高。

## 前端框架

- `Vue`
- `React`
- `AngularJS`：支持已于 2022 年 1 月正式结束，由继承者 Angular 代替
- `Svelte`

## Web 开发构建工具

- `webpack`
- `Rollup`
- `esbuild`：一款 Go 编写的 JS 打包和压缩工具
- `vite`
  - < 8.0：使用 esbuild 进行开发环境依赖预打包，使用 Rollup 进行生产构建
  - > = 8.0：Rolldown，目标是将这两个过程统一到一个高性能的打包工具中，以降低复杂性
- `Rolldown`：一款 JS 模块打包器，可以将 JS 模块打包成单个文件。
- `Turbopack`：一款 Rust 编写，用于构建高性能 JS 应用的工具。
- `Rspack`：一款基于 Rust 的高性能构建引擎，具备与 Webpack 生态系统的互操作性
- `Parcel`：一个快速、零配置的前端打包工具
- `Rome`：一款由 Facebook 工程师创建的新一代 JS 工具链。
- `swc`：一款基于 Rust 编写的 JS 和 TS 编译器
- `Gulp`：一款基于Node.js的自动化构建工具，用于简化开发过程中的任务处理
- `Snowpack`：一款新兴的 JS/WebAssembly 打包工具，专注于快速构建现代 web 应用程序。

## 依赖管理工具

- `npm`
- `yarn`
- `pnpm`
- ...

## JavaScript引擎

- `V8 引擎`

  > 由 Google 开发，开源。

- `JavaScriptCore 引擎`
  > 由 Apple 开发，开源。

## CSS 预处理语言

- `Less`
- `Scss/Sass`
- `Stylus`

## 原子化CSS
### 什么是 CSS 原子化？
> CSS 原子化（Atomic CSS）是一种 `CSS 架构方法`，其`核心思想`是`将样式拆分为最小的、单一职责的原子类`（Atomic Classes）。每个原子类只负责一个具体的样式属性，如 `margin-top: 8px`-> `mt-2`，`color: red` -> `text-red`。

### 原子化 CSS 的优势
- `高度复用性` - 原子类可以在整个项目中复用
- `样式一致性` - 强制使用设计系统中的预定义值
- `包体积优化` - 避免样式重复，CSS 体积可控
- `开发效率` - 快速组合样式，无需命名困扰
- `维护性强` - 样式变更影响范围可预测

### 原子化 CSS 的挑战
- `学习成本` - 需要记忆大量原子类名
- `HTML 复杂度` - 类名可能会很长
- `设计约束` - 受限于预定义的设计系统
- `调试困难` - 样式分散在多个原子类中
- `书写繁琐` 
  - 伪类
  - 渐变
  - transition过渡 和 animate动画

### 原子化 CSS 的演进历程

<AtomicCssFlow />

### 原子化库

- `Tailwind CSS`
- `Unocss`
- `AtomicCSS`
- `Tachyons`

## PostCSS：CSS转换工具的基石
### 什么是 PostCSS？
> PostCSS 是一个用 JavaScript 工具转换 CSS 的平台。它本身`不是预处理器`，而是一个允许使用`插件`来转换 `CSS 的工具`。PostCSS 可以做很多事情：添加浏览器前缀、使用未来的 CSS 语法、内联图片等。

### 常用 PostCSS 插件
- `autoprefixer` - 自动添加浏览器前缀
- `postcss-preset-env` - 使用现代 CSS 语法
- `cssnano` - CSS 压缩优化
- `postcss-nested` - 支持嵌套语法
- `postcss-import` - 处理@import 语句

## unocss/tailwindcss/postcss架构

### UnoCSS 核心架构

<UnoCssFlow />

### Tailwind CSS 核心架构

<TailwindFlow />

### PostCSS 核心架构

<PostCssFlow />

## 图表

### ECharts5

一个基于 JavaScript 的开源可视化图表库

📙 资源地址

- 官方文档：[官方文档地址](https://echarts.apache.org/zh/index.html)
- 仓库资源：[github地址](https://github.com/apache/echarts)

### Vue-echarts

用于 Apache ECharts™ 的 Vue.js 组件。

📙 资源地址

- 官方文档：[官方文档地址](https://vue-echarts.vercel.app/)
- 仓库资源：[github地址](https://github.com/ecomfe/vue-echarts)

## 图标库

### xicons

整合自 fluentui-system-icons、ionicons、ant-design-icons、material-design-icons、Font-Awesome tabler-icons 和 carbon 的 SVG Vue/React 组件。

📙 资源地址

- 官方文档：[官方文档地址](https://www.xicons.org/)
- 仓库资源：[github地址](https://github.com/07akioni/xicons)

### Font-Awesome

标志性的 SVG、字体和 CSS 工具包

📙 资源地址

- 官方文档：[官方文档地址](https://fontawesome.com/)
- 仓库资源：[github地址](https://github.com/FortAwesome/Font-Awesome)

### icones

⚡️图标浏览器，支持即时搜索，由 Iconify 提供技术支持

📙 资源地址

- 官方文档：[官方文档地址](https://icones.js.org/)
- 仓库资源：[github地址](https://github.com/antfu-collective/icones)

### Material Design Icons

@mdi/font 用于 Material Design 图标。

📙 资源地址

- 官方文档：[官方文档地址](https://pictogrammers.com/library/mdi/)
- 仓库资源：[github地址](https://github.com/Templarian/MaterialDesign-Webfont)

### Iconify

通用图标框架。一套语法即可兼容 FontAwesome、Material Design Icons、DashIcons、Feather Icons、EmojiOne、Noto Emoji 以及众多其他开源图标集（超过 150 个图标集，20 万个图标）。支持 SVG 框架、React、Vue 和 Svelte 组件！

📙 资源地址

- 官方文档：[官方文档地址](https://iconify.design/)
- 仓库资源：[github地址](https://github.com/iconify/iconify)

### heroicons

一套免费的、采用 MIT 许可的高质量 SVG 图标，适用于 UI 开发。

📙 资源地址

- 官方文档：[官方文档地址](https://heroicons.com/)
- 仓库资源：[github地址](https://github.com/tailwindlabs/heroicons)

### simple-icons

热门品牌的 SVG 图标

📙 资源地址

- 官方文档：[官方文档地址](https://simpleicons.org/)
- 仓库资源：[github地址](https://github.com/simple-icons/simple-icons)

## 后台管理系统解决方案

### vue-element-admin

一个神奇的 Vue 管理员

📙 资源地址

- 官方文档：[官方文档地址](https://panjiachen.github.io/vue-element-admin-site/zh/)
- 仓库资源：[github地址](https://github.com/PanJiaChen/vue-element-admin)

### Geeker-Admin

✨✨✨ Geeker Admin，基于 Vue3.4、TypeScript、Vite5、Pinia、Element-Plus 开源的一套后台管理框架。

📙 资源地址

- 官方文档：[官方文档地址](https://docs.spicyboy.cn)
- 仓库资源：[github地址](https://github.com/HalseySpicy/Geeker-Admin)

### Vue-vben-admin

基于 Vue3.0、Vite、 Ant-Design-Vue、TypeScript 的后台解决方案

📙 资源地址

- 官方文档：[官方文档地址](https://www.vben.pro)
- 仓库资源：[github地址](https://github.com/vbenjs/vue-vben-admin)

✨ 特性

- 最新技术栈：使用 Vue3+vite 等前端前沿技术开发
- TypeScript: 应用程序级 JavaScript 的语言
- 主题：可配置的主题
- 国际化：内置完善的国际化方案

### Vue-pure-admin

Vue3.0+TypeScript+Vite2.0+Element-Plus编写的一套后台管理系统

📙 资源地址

- 官方文档：[官方文档地址](https://github.com/pure-admin/vue-pure-admin#readme)
- 仓库资源：[github地址](https://github.com/pure-admin/vue-pure-admin)

### Naive-ui-admin

基于 vue3,vite2,TypeScript 的中后台解决方案

📙 资源地址

- 官方文档：[官方文档地址](https://naive-ui-admin-docs.vercel.app/)
- 仓库资源：[github地址](https://github.com/jekip/naive-ui-admin)

### Gin-vue-admin

基于vite+vue3+gin搭建的开发基础平台，集成jwt鉴权，权限管理，动态路由，分页封装，多点登录拦截，资源权限，上传下载，代码生成器，表单生成器等开发必备功能
热门品牌的 SVG 图标

📙 资源地址

- 官方文档：[官方文档地址](https://www.gin-vue-admin.com/)
- 仓库资源：[github地址](https://github.com/flipped-aurora/gin-vue-admin)

## Web UI 库

### Element-Plus

Element Plus，一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库

📙 资源地址

- 官方文档：[官方文档地址](https://element-plus.org/)
- 仓库资源：[github地址](https://github.com/element-plus/element-plus)

### Ant Design Vue

Ant Design Vue 是 Ant Design 的 Vue.js 实现，开发和服务于企业级后台产品

📙 资源地址

- 官方文档：[官方文档地址](https://antdv.com/docs/vue/introduce-cn/)
- 仓库资源：[github地址](https://github.com/vueComponent/ant-design-vue)

### Arco Design Vue

字节跳动基于 Arco Design 开源的 Vue UI 组件库。60 多个开箱即用的高质量组件, 可以覆盖绝大部份的业务场景。

📙 资源地址

- 官方文档：[官方文档地址](https://arco.design/vue/docs/start)
- 仓库资源：[github地址](https://github.com/arco-design/arco-design-vue)

### Quasar

构建高性能的 VueJS 用户界面,开箱即用,支持桌面和移动浏览器（包括 iOS Safari！）

📙 资源地址

- 官方文档：[官方文档地址](https://quasar.dev/introduction-to-quasar)
- 仓库资源：[github地址](https://github.com/quasarframework/quasar)

### Vuetify

Vuetify 是一个无需任何设计技能的开源 UI 库，它拥有精美的手工打造的 Vue 组件。

📙 资源地址

- 官方文档：[官方文档地址](https://vuetifyjs.com/zh-Hans/)
- 仓库资源：[github地址](https://github.com/vuetifyjs/vuetify)

### Naive UI

Naive UI 一个 Vue 3 组件库，比较完整，主题可调，使用 TypeScript

📙 资源地址

- 官方文档：[官方文档地址](https://www.naiveui.com/zh-CN/light)
- 仓库资源：[github地址](https://github.com/tusen-ai/naive-ui)

## Mobile UI 库

### Vant

Vant是有赞前端团队开源的移动端组件库，于 2017 年开源，已持续维护 4 年时间。Vant 对内承载了有赞所有核心业务，对外服务十多万开发者，是业界主流的移动端组件库之一。

📙 资源地址

- 官方文档：[官方文档地址](https://vant.pro/vant/#/zh-CN)
- 仓库资源：[github地址](https://github.com/youzan/vant)

### NutUI 3.0

NutUI 是京东风格的 Vue 移动端组件库，开发和服务于移动 Web 界面的企业级产品。

📙 资源地址

- 官方文档：[官方文档地址](https://nutui.jd.com/#/)
- 仓库资源：[github地址](https://github.com/jd-opensource/nutui)

### Varlet

Varlet是一个基于 Vue3 开发的 Material 风格移动端组件库，全面拥抱 Vue3 生态，由社区的小伙伴开发和维护。

📙 资源地址

- 官方文档：[官方文档地址](https://varletjs.org/#/en-US/home)
- 仓库资源：[github地址](https://github.com/varletjs/varlet)

### WeUI

WeUI是一个基于微信原生视觉体验的移动端 UI 框架，提供了丰富的组件和工具，可以快速搭建高质量的移动应用。它采用了HTML5和CSS3等现代化技术，具有灵活性和可定制性。

📙 资源地址

- 官方文档：[官方文档地址](https://weui.io/)
- 仓库资源：[github地址](https://github.com/Tencent/weui/)

### Cube UI

Cube UI是一个基于Vue.js的移动端 UI 框架，提供了丰富的组件和工具，可以快速搭建高质量的移动应用。它采用了ES6和Sass等现代化技术，具有灵活性和可定制性。

📙 资源地址

- 官方文档：[官方文档地址](https://didi.github.io/cube-ui/#/zh-CN/)
- 仓库资源：[github地址](https://github.com/didi/cube-ui/)

### Onsen UI

Onsen UI是一个基于HTML5和CSS3的移动端 UI 框架，提供了丰富的组件和工具，可以快速搭建高质量的移动应用。它支持多种平台和框架，包括Angular、React和Vue.js等。此外，它还提供了多种自定义主题和插件，使得用户可以自定义移动应用的外观和行为。

📙 资源地址

- 官方文档：[官方文档地址](https://onsen.io/)
- 仓库资源：[github地址](https://github.com/OnsenUI/OnsenUI/)

### Muse UI

Muse UI 是 Adobe 开发的用户界面（UI）设计系统，用于构建响应式的 Web 和移动应用程序。它包括一个预设计的组件和模板库，可以根据特定项目的品牌和设计进行自定义。Muse UI 还包括原型设计和测试工具，以及与其他 Adobe Creative Cloud 产品（如 Photoshop 和 Illustrator）的集成。Muse UI 的目标是简化设计流程，使设计人员能够快速高效地创建高质量、一致的界面。

📙 资源地址

- 官方文档：[官方文档地址](https://muse-ui.org/)
- 仓库资源：[github地址](https://github.com/museui/muse-ui/)

### Ionic Vue

Ionic Vue 是 Ionic 团队推出的一个基于 Vue.js 的移动应用程序开发框架。它提供了丰富的 UI 组件和工具，可以帮助开发者快速构建高性能、跨平台的移动应用程序。Ionic Vue 兼容 Vue 3，并支持 Vue.js 生态系统中的许多插件和库。

📙 资源地址

- 官方文档：[官方文档地址](https://ionicframework.com/vue)
- 仓库资源：[github地址](https://github.com/ionic-team/ionic-framework/)

### Framework7 Vue

Framework7 Vue 是一个基于 Vue.js 的移动应用程序开发框架，它提供了丰富的 UI 组件和工具，可以帮助开发者快速构建高性能、跨平台的移动应用程序。Framework7 Vue 可以与 Vue.js 生态系统中的许多插件和库集成，支持多种主题和样式定制。

📙 资源地址

- 官方文档：[官方文档地址](https://framework7.io/vue/)
- 仓库资源：[github地址](https://github.com/framework7io/framework7/)

### Ionic Framework

Ionic Framework 是一个开源 UI 工具包，用于使用 Web 技术（HTML、CSS 和 JavaScript）构建高性能、高质量的移动和桌面应用程序，并集成了 Angular、React 和 Vue 等流行框架。

📙 资源地址

- 官方文档：[官方文档地址](https://ionicframework.com/docs/vue/overview)
- 仓库资源：[github地址](https://github.com/ionic-team/ionic-framework)

## 小程序

### Taro UI

Taro UI是一个基于Taro框架的多端 UI 组件库，可以在微信小程序、支付宝小程序、百度小程序、字节跳动小程序、H5和React Native等多个平台上使用。它提供了丰富的组件和工具，可以快速搭建高质量的跨端应用。此外，它还支持自定义主题和插件，使得用户可以自定义应用的外观和行为。

📙 资源地址

- 官方文档：[官方文档地址](https://taro-ui.jd.com/#/)
- 仓库资源：[github地址](https://github.com/NervJS/taro-ui/)

### uniapp

一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、鸿蒙Next、Web（响应式）、以及各种小程序（微信/支付宝/百度/抖音/飞书/QQ/快手/钉钉/淘宝/京东/小红书）、快应用、鸿蒙元服务等多个平台。

📙 资源地址

- 官方文档：[官方文档地址](https://uniapp.dcloud.net.cn/)
- 仓库资源：[github地址](https://github.com/dcloudio/uni-app)

### Vant-weapp

轻量、可靠的小程序 UI 组件库

📙 资源地址

- 官方文档：[官方文档地址](https://vant-ui.github.io/vant-weapp/#/home)
- 仓库资源：[github地址](https://github.com/youzan/vant-weapp)

### Mpvue

一个使用 Vue.js 开发小程序的前端框架。

📙 资源地址

- 官方文档：[官方文档地址](http://mpvue.com/)
- 仓库资源：[github地址](https://github.com/mpvue/mpvue-docs)

### Wepy

一个最受欢迎的小程序框架。。

📙 资源地址

- 官方文档：[官方文档地址](https://wepyjs.github.io/wepy-docs/index.html)
- 仓库资源：[github地址](https://github.com/Tencent/wepy)

### Kbone

一个致力于微信小程序和 Web 端同构的解决方案

📙 资源地址

- 官方文档：[官方文档地址](https://wechat-miniprogram.github.io/kbone/docs/)
- 仓库资源：[github地址](https://github.com/Tencent/kbone)

## 常用库

### 浮点数精度库

- [number-precision](https://github.com/nefe/number-precision)：使用 JavaScript 精确执行加、减、乘、除运算。
- [big.js](https://github.com/MikeMcl/big.js)：用于任意精度十进制和非十进制算术的 JavaScript 库。
- [decimal.js](https://github.com/MikeMcl/decimal.js)：JavaScript 的任意精度 Decimal 类型。
- [mathjs](https://github.com/josdejong/mathjs)：一个功能强大的 JavaScript 和 Node.js 数学库。
- [bignumber.js](https://github.com/MikeMcl/bignumber.js)：用于任意精度十进制和非十进制算术运算的 JavaScript 库。
- [numeral](https://github.com/adamwdraper/Numeral-js)：一个用于格式化和操作数字的 JavaScript 库。

### 日期库

- [dayjs](https://github.com/iamkun/dayjs)：一个轻量级的日期库，支持链式调用和链式操作。
- [date-fns](https://github.com/date-fns/date-fns)：一个功能丰富的日期库，支持多种日期格式和时区。
- [date-fns-tz](https://github.com/marnusw/date-fns-tz)：一个扩展了 `date-fns` 的日期库，支持时区操作。
- [moment](https://github.com/moment/moment)：一个功能强大的日期库，支持多种日期格式和时区。
- [dateformat](https://github.com/felixge/node-dateformat)：一个简单易用的日期格式化库。

### Lodash替代库

- [Lodash](https://github.com/lodash/lodash)：是一个一致性、模块化、高性能的 JavaScript 实用工具库
- [lodash-es](https://github.com/lodash/lodash)：lodash 的 ES 模块版本，适合现代前端项目，本质还是 lodash。
- [remeda](https://github.com/remeda/remeda)：现代、类型安全、专为 TypeScript 优化的函数式工具库。
- [radash](https://github.com/rayepps/radash)：轻量、现代、类型友好，API 设计更贴合现代 JS/TS 习惯。
- [rambda](https://github.com/selfrefactor/rambda)：轻量、函数式、tree-shaking 友好，部分 API 与 lodash 类似。

### CSS动画库

- [Hover.css](https://ianlunn.github.io/Hover)：开箱即用的鼠标悬停动画库
- [Animate.css](https://animate.style/)：一款跨浏览器的简单便捷的CSS动画库
- [CSShake](https://elrumordelaluz.github.io/csshake/)：一个能够提供震动和晃动Dom元素的CSS库
- [hint.css](https://kushagra.dev/lab/hint/)：一个纯 CSS 工具提示库，适用于您精美的网站
- [kite.css](https://hiloki.github.io/kitecss/)：一个灵活的布局辅助 CSS 库。
- [Three Dots](https://nzbin.github.io/three-dots/)：一组仅使用单个元素创建的 CSS 加载动画

### CSS样式库

- [normalize.css](https://github.com/necolas/normalize.css)： 一个用于重置浏览器内置样式的库

### 前端加密库

| 加密库               | 主要用途       | 支持算法              | 适用场景                                               |
| ---------------- | -------------- | --------------------- | ------------------------------------------------------ |
| `crypto-js`      | 通用加密库     | AES/DES/MD5/SHA-56/等 | 大多数常规项目                                         |
| `jsencrypt`      | RSA 非对称加密 | RSA                   | 登录注册时的密码传输、敏感数据公钥加密。               |
| `Web Crypto API` | 浏览器原生     | AES-GCM/SHA-256/等    | 即时通讯（E2E加密），对性能和包体积敏感的项目。        |
| `sm-crypto`      | 国密算法       | SM2/SM3/SM4           | 政府、金融、国企及任何需通过等保测评、密评的国内项目。 |

## 音效资源
- [Myinstants](https://myinstants.net/): 音效按钮与表情包音板。

## 效率工具

- [Angrytools](https://angrytools.com/)：Flexbox、Grid等免费网络生成工具，助您加速开发

## 其他
- [纸由我 PaperMe](https://paperme.toolooz.com/)
> 多种纸张模板，满足不同场景的需求。

- [Pacdora](https://www.pacdora.cn)
> Pacdora - 最大的样机和刀版模板平台

- [ChromeAppHeroes](https://github.com/zhaoolee/ChromeAppHeroes)
> 🌈谷粒-Chrome插件英雄榜, 为优秀的Chrome插件写一本中文说明书, 让Chrome插件英雄们造福人类

- [StarsAndClown](https://github.com/zhaoolee/StarsAndClown)
> ☀️Github星聚弃疗榜, 让吃瓜群众也能享受Github带来的乐趣~Github