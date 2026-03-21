# 对抗遗忘曲线

> 试图记录今天学废、明天就会忘掉的前端知识。

## 开发备忘清单【速查表】

[Quick Reference](https://quickref.me/zh-CN/index.html)

> 为开发人员分享快速参考备忘清单【速查表】。这是英文版 [Reference](https://github.com/Fechin/reference) 的中文版本，目的是为了方便自己的技术栈查阅，如果您提供一个清单，我将抽空搬运，立即撸起来 :)。如果您发现此处的备忘单不合适，您可以通过提交 PR 来修复它或提供更好的备忘清单，只针对【中文】用户。

## Markdown教程

> [Markdown教程](https://markdown.com.cn/)

## vite

### vite < 8.0.0

- 开发环境：基于 `esbuild` 构建
- 生产环境：基于 `rollup` 构建

### vite >= 8.0.0

- 基于：`Rolldown` 构建

## 浏览器

### 同源策略

> 作用：帮助阻隔恶意文档，减少可能被攻击的媒介。

1️⃣ 定义

> 同源策略 (Same-Origin Policy, `SOP`)：是一种重要的`安全机制`，限制了从`一个源`加载的`文档或脚本`如何`与`来自`另一个源`的资源进行`交互`。

2️⃣ 同源

- 协议相同（Protocol）
- 域名相同（Host）
- 端口相同（Port）

3️⃣ 跨域解决方案

- 1.《W3C 标准方案》—— `CORS (Cross-Origin Resource Sharing)`
  - 通过服务器设置 HTTP 响应头来告诉浏览器：“允许这个源访问资源”。
    - `Access-Control-Allow-Origin`: 允许的域名（如 `http://localhost:3000` 或 \*）。
    - `Access-Control-Allow-Methods`: 允许的方法（GET, POST 等）。
    - `Access-Control-Allow-Headers`: 允许的请求头。
    - `Access-Control-Allow-Credentials`: 是否允许发送 Cookie。
- 2.《开发环境推荐》—— `代理 (Proxy)`
  - 同源策略是浏览器的限制，服务器之间没有同源策略
  - 前端请求本地开发服务器，本地服务器转发请求到后端，绕过浏览器限制。
- 3.《生产环境推荐》—— `Nginx 反向代理`
  - 在生产部署时，由 `Nginx` 作为中转站，将前端静态资源和后端 API 聚合在同一个域名（或端口）下，从而在浏览器端看起来是“同源”的。
- 4.《窗口间通信》—— `postMessage`
  - HTML5 引入的 API，专门用于 `Window` 对象之间的跨域通信（如页面与 iframe，或父子窗口）。
  - 缺点：仅限于窗口间通信，不适合数据接口请求。
- 5.《网络通信协议》—— `WebSocket`
  - `WebSocket` 协议 (`ws://` 或 `wss://`) 本身不受同源策略限制。
  - 需要后端实现 WebSocket 服务，成本高于 HTTP；不适合普通的 RESTful API 场景。
- 6.《古老方案》—— `JSONP (JSON with Padding)`
  - 利用 `<script>` 标签不受同源策略限制的特性。
    - 前端定义一个回调函数，后端返回一段`JS`代码，调用该回调函数并传入数据。
    - 缺点：只支持 GET 请求，且不安全（容易受 XSS 攻击），现代项目极少使用。

4️⃣ 天生支持跨域引用的 HTML 标签清单及其特性

> 这些标签的 `src`/`href` 属性可以`指向任何域名`的 URL，浏览器会正常加载并渲染/执行，不会报跨域错误。

- `<img src="...">`：加载跨域图片
- `<script src="...">`：加载跨域 JS 库（如 CDN 上的 jQuery、Vue）。
- `<link rel="stylesheet" href="...">`：加载跨域 CSS 文件（如 Bootstrap CDN）。
- `<iframe src="...">`：嵌入别的网站页面。
- `<video src="...">`/`<audio src="...">`：播放跨域音视频。
- `<object>, <embed>`：嵌入插件内容（Flash, PDF 等）。现在用得较少。

5️⃣ "允许嵌入" vs "禁止读取" 的安全边界

- 浏览器允许跨域，因为他们是 `单项` 输出。
  - `图片/视频`：只是渲染在屏幕上，恶意脚本拿不到原始二进制数据。
  - `脚本`：只是被执行，不仅拿不到源码，而且执行环境是当前页面，恶意脚本得不到其他域名的 Cookie 或数据。
- 什么时候需要打破这个边界？(当不仅要“看”，还要“动”它们的时候，就需要 CORS 配合了)
  - `Canvas截图` ：需要读取跨域图片的像素 -> 必须 CORS。
  - `错误监控`：需要读取跨域脚本的报错堆栈 -> 必须 CORS (crossorigin="anonymous").
  - `Fetch/Ajax`：需要读取接口返回的 JSON 文本 -> 必须 CORS。

✅ 总结与选型建议

| 解决方案          | 场景               | 推荐指数   | 推荐指数                      |
| ----------------- | ------------------ | ---------- | ----------------------------- |
| `CORS`            | 标准前后端分离 API | ⭐⭐⭐⭐⭐ | 后端配置请求 Header，官方标准 |
| `Nginx 反向代理`  | 生产环境部署       | ⭐⭐⭐⭐⭐ | 运维配置，性能最好，同源伪装  |
| `Proxy`           | 开发环境           | ⭐⭐⭐⭐⭐ | Vite/Webpack 配置             |
| `PostMessage`     | iframe/微前端通信  | ⭐⭐⭐⭐   | 窗口间互发消息通信            |
| `WebSocket`       | 实时聊天/股票推送  | ⭐⭐⭐⭐   | 协议层面无限制                |
| `JSONP`           | 老旧系统维护       | ⭐         | 只支持 GET，不安全            |
| `document.domain` | 主域名相同         | ⭐         | 即将废弃，勿用                |

⚠️ 注意事项

> - 同源策略是浏览器的限制，服务器之间没有同源策略。
> - 代理（Proxy）仅适用于`开发环境`，生产环境需要 `Nginx` 替代。
> - 同源策略的一个`核心原则`是：通常`允许`跨域`“嵌入”`资源，但`禁止`跨域`“读取”`资源。
> - Web Fonts (字体文件) 也就是 `@font-face` 中引用的 `.woff2`, `.ttf` 等文件，默认受同源策略限制。
> - HTML 标签（img/script/link/ frame）是跨域世界的`通行证`，它们默认被允许展示和执行，但不允许你的 JS 代码去私下分析它们的内容。

## Web API

### WebSocket

> WebSocket 是真正的双向平等对话，属于服务器推送技术的一种。

🈯️ 参考文档

- [阮一峰 —— WebSocket](https://www.ruanyifeng.com/blog/2017/05/websocket.html)
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

1️⃣ 特点

- `服务器`可以`主动`向客户端`推送`信息（服务器 -> 主动推送 -> 客户端）
- `客户端`也可以`主动`向服务器`发送`信息（客户端 -> 主动推送-> 服务器）
- 建立在`TCP协议`之上

## UnoCSS

### nth-child

- `last-border-b/last:border-b`：仅最后一个子元素设置底部边框
- `not-last-bg-[#f00]/not-last:bg-[#f00]`：排除最后一个子元素，其他子元素设置背景颜色
- `odd-bg-[#f00]/odd:bg-[#f00]`：偶数子元素设置背景颜色
- `even-bg-[#f00]/even:bg-[#f00]`：奇数子元素设置背景颜色
- 自定义任意 `nth-child(n)` 选择器
  - 1️⃣ 使用 `Arbitrary Values`
    - `[&:nth-child(n)]:bg-[#f00]`：指定给第一个子元素设置背景颜色
  - 2️⃣ 使用 `shortcuts` 作为替代

  ```ts [index.ts]
  shortcuts: [
    [/^nth-(\d+):(.+)$/, ([, n, style]) => `[&:nth-child(${n})]:${style}`], // use nth-1:bg-[#f00]
    [/^child-(\d+):(.+)$/, ([, n, style]) => `[&:nth-child(${n})]:${style}`], // use child-1:bg-[#f00]
  ];
  ```

  - 3️⃣ 自定义 `nth-child` 变体

## 性能优化

### defer & async

> [async vs defer attributes](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)

- 使用 `defer` 时，在下载过程中不会阻止 `HTML` 渲染，并且 `JavaScript` 仅在文档完成渲染后执行。
- 使用 `async` 时，在下载过程中不会阻止 `HTML` 渲染，但是当脚本下载完毕后，渲染会在 `JavaScript` 执行期间暂停。
  > ⚠️ `async` 和 `defer` 属性`仅对外部脚本`有效。

1️⃣ `<script>`，不带任何属性（阻塞渲染）

- HTML 文件会正常解析，直到遇到脚本文件则停止解析。
- 此时会发出请求来下载该脚本文件（若它是外部文件）。
- 下载完成后，脚本会被立即执行，脚本执行完成后。
- 继续进行 HTML 文件解析。

2️⃣ `<script async>`，携带`异步`属性（阻塞渲染）

> `async` 会在 HTML 解析期间下载文件，并在下载完成后暂停 HTML 解析器以执行该文件，脚本执行完成后继续进行 HTML 文件解析。

3️⃣ `<script defer>`，携带`延迟`属性（不阻塞渲染）

> `defer` 会在 HTML 解析期间下载文件，并在 HTML 解析完成后才执行。`defer` 脚本还能 `defer` 按照它们在文档中出现的顺序执行。

### 代码分析插件

- `rollup-plugin-visualizer`

### 瓶颈定位

- 首屏路由打包过大（框架+UI+图表一次性加载）
- Hero 图像体积大且未按需加载
- 字体/第三方脚本阻塞渲染
- 服务器压缩未启用 & 缓存策略缺失

### 优化策略总览

- `传输层`：HTTP/2/3、Brotli/Gzip 压缩、CDN 与缓存控制
- `资源层`：代码分包与懒加载、图片与字体优化、资源提示（`preload/prefetch`）
- `渲染层`：关键 CSS 内联、骨架屏与占位、SSR/SSG/Streaming（按项目选型）
- `数据层`：首屏数据聚合与缓存、降级策略与超时

### 包体积优化

1️⃣ 资源层优化（代码分包与按需）

- 代码分包与按需
  - vite分包：`vite-plugin-chunk-split`
  - 按需自动引入：`unplugin-auto-import` (按需自动导入 Vite、Webpack、Rspack、Rollup 和 esbuild 的 API。支持 TypeScript。)
- 路由懒加载：`const route = { path: '/', component: () => import('./pages/Home.vue') }`
- 组件按需
- 第三方库替换：体积大的库换体积小的等价物（`dayjs`替代`moment`）
- 配置Terser选项，移除console.log/debugger
  2️⃣ 图片与字体优化
- 图片格式：现代格式（WebP/AVIF）、响应式与占位（`<img src="hero.avif" width="1200" height="800" alt="hero" loading="lazy" />`）
- preload：关键首屏图像
- 字体：子集化与延迟加载
  3️⃣ 资源提示与阻塞减少
- 关键 CSS 内联 + 非关键延迟
- 关键脚本 `defer/async`
- 预连接(preconnect)与预获取(prefetch)
  - preconnect：`<link rel="preconnect" href="https://cdn.example.com" />`
  - prefetch：`<link rel="prefetch" href="/assets/chart.js" as="script" />`

### 图片专题

- 使用图片 CDN
- 压缩图片
- 将 GIF 动画替换为视频
- 延迟加载图片
- 提供自适应图片
- 投放尺寸正确的图片
- 使用 WebP 图片

## 调试

### PC 调试

- 浏览器 DevTools + Vue DevTools
- Debug 断点调试
- console 日志调试

### 移动端调试插件

1️⃣ `vconsole`: 一个轻量级、可扩展的移动网页前端开发者工具(适合移动端控制台调试插件)——腾讯。

```sh
[Vue warn]: Extraneous non-props attributes (data-insp-path) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes
```

2️⃣ `eruda`: 移动浏览器的控制台(适合移动端控制台调试插件)

```sh
# 存在一个bug（多根节点会报警告如下，但是报出的警告内容不是多根节点的，牛头不对马嘴，尽量不使用改插件，使用 vconsole代替）。
[Vue warn]: Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.
```

3️⃣ `AlloyLever`: 适合 WebView 及混合开发调试H5。

### 抓包工具

- `whistle`：跨平台 (macOS/Windows/Linux)
- `Charles`：Mac 原生之选

## 进阶——源码学习

- [Marvin](https://canyuegongzi.github.io/)
- [vue-toastification](https://github.com/Maronato/vue-toastification#readme)

## 开发辅助资源

- [pixabay](https://pixabay.com/zh/): 精彩的免版税图片和免版税库存,任何项目都可使用的免费素材
