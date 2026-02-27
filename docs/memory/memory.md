# 对抗遗忘曲线

> 试图记录今天学废、明天就会忘掉的前端知识。

## 开发备忘清单【速查表】

[Quick Reference](https://quickref.me/zh-CN/index.html)

> 为开发人员分享快速参考备忘清单【速查表】。这是英文版 [Reference](https://github.com/Fechin/reference) 的中文版本，目的是为了方便自己的技术栈查阅，如果您提供一个清单，我将抽空搬运，立即撸起来 :)。如果您发现此处的备忘单不合适，您可以通过提交 PR 来修复它或提供更好的备忘清单，只针对【中文】用户。

## Markdown教程

> [Markdown教程](https://markdown.com.cn/)

## HTML

### 元数据（meta）

> [元数据](https://web.dev/learn/html/metadata?hl=zh-cn)

1️⃣ 官方定义的元标记，主要有两种类型

- 一种是包含 `http-equiv` 属性的 `pragma` 指令
- 另一种是已命名的元类型（例如带有 `name` 属性的视口元标记）

2️⃣ `http-equiv` 属性

- `content-language`：内容语言状态，（此功能不符合规范。建议改用 `lang` 属性。）
- `content-type`：编码声明状态， `http-equiv="content-type"` 和 `<meta charset="utf-8" />`不能同时存在（设置 `charset` 的另一种方法。）。
- `default-style`：默认样式
- `refresh`：起到定时刷新或者重定向的作用（）
- `set-cookie`：设置 Cookie，不符合规范，没有效果。
- `x-ua-compatible`： X-UA-Compatible X-UA 兼容
- `content-security-policy`：内容安全策略

### 开放图谱协议（The Open Graph protocol）

1️⃣ 介绍

- 即将你的网站地址（http://域名.xx）,发给其他人，看看你的网站在不同平台上的呈现情况
- 基于元数据（Meta）

2️⃣ 支持配置与测试

- ❇️ 开发图谱协议：https://ogp.me/
- ㊙️ 测试你的域名：https://auraplusplus.com/tools/meta-previews

3️⃣ Example

```html [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <meta property="og:site_name" content="%VITE_APP_WEB_TITLE%" />
    <meta property="og:title" content="%VITE_APP_WEB_TITLE%" />
    <meta property="og:description" content="%VITE_APP_WEB_DESCRIPTION%" />
    <meta property="og:url" content="%VITE_APP_WEB_URL%" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="%VITE_APP_WEB_IMAGE%" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./src/main.ts"></script>

    <noscript> 网站或者应用描述...... </noscript>
  </body>
</html>
```

```txt [.evn.production]
## 其他环境变量
## og info
VITE_APP_WEB_DESCRIPTION="你的或者APP描述"
VITE_APP_WEB_TITLE='你的网站或者APP标题'
VITE_APP_WEB_URL='你的网站或者APP地址（如：https://example.com）'
VITE_APP_WEB_NAME='你的网站或者APP名称'
VITE_APP_WEB_IMAGE='你的网站或者APP logo地址（如：https://example.com/logo.png）'
```

> ⚠️ 注意: `VITE_APP_WEB_IMAGE` 使用的是网络地址（你可以将图片资源放到你的public目录下，网络地址就是你的域名/xxx.png）

## CSS

### 实现元素隐藏的方式

#### display: non

> 最彻底的隐藏，元素仿佛不存在。

- `效果`：元素从 DOM 树中保留，但从渲染树（Render Tree）中移除。
- `特点`
  - `不占空间`：原本的位置会被周围元素挤占。
  - `不可交互`：无法点击、无法触发事件。
  - `重排重绘 (Reflow)`：切换时会触发页面的重排，性能开销较大。
  - `子元素`：所有子元素也会被隐藏，无法单独显示。
  - `无障碍性`：屏幕阅读器会忽略该内容。
- `适用场景`：彻底不需要显示、不需要交互的元素（如移动端侧边栏未打开时的状态）。

#### visibility: hidden

> 看不见，但还在那里。

- `效果`：元素在渲染树中，但不可见。
- `特点`
  - `占据空间`：元素虽然不可见，但依然占据原来的宽高位置，像一个透明的盒子。
  - `不可交互`：无法点击、不阻挡下方元素点击（鼠标穿透）。
  - `重绘 (Repaint)`：切换时只触发重绘，不触发重排，性能优于 `display: none`。
  - `子元素`：子元素可以通过设置 `visibility: visible` 重新显示出来（这是与 `display: none `最大的区别）。
  - `无障碍性`：屏幕阅读器通常会忽略该内容。
- `适用场景`：需要保持布局占位，避免页面抖动的情况。

#### opacity: 0

> 透明度为 0，完全透明。

- `效果`：元素完全透明，但依然存在。
- `特点`
  - `占据空间`：保留原有位置。
  - `可交互`：依然可以点击、触发 hover 等事件（除非配合 `pointer-events: none`）。
  - `硬件加速`：可以通过 `transform`/`opacity` 动画触发 GPU 加速，性能较好。
  - `无障碍性`：屏幕阅读器可以读取该内容。
- `适用场景`：需要淡入淡出动画效果时（如 `transition: opacity 0.3s`）。

#### 移出可视区域

> `position: absolute/fixed` 并移出可视区域,如 `left: -9999px` 或 `top: -9999px`。

- `效果`：元素被移到了屏幕外面。
- `特点`
  - `不占空间`（在当前可视区域内）。
  - `可交互`：虽然看不见，但理论上可以操作（通常配合 JS 使用）。
  - `无障碍性`：屏幕阅读器可以读取该内容（这对 SEO 和无障碍访问非常重要）。
- `适用场景`：SEO 优化文本、屏幕阅读器专用文本（SR-only）。

#### 高度为 0 并裁剪溢出

> `height: 0; overflow: hidden`,高度为 0 并裁剪溢出。

- `效果`：像卷帘门一样收起。
- `特点`
  - `不占空间`（垂直方向）。
  - `不可交互`。
  - `可做动画`：极其适合做手风琴（Accordion）折叠效果。
- `适用场景`：折叠面板、下拉菜单的展开收起。

#### 缩放为 0

> `transform: scale(0)` 缩放为 0。

- `效果`：元素缩小到一个点。
- `特点`
  - `占据空间`：原始占位其实还在（取决于布局流），但视觉上消失。
  - `不可交互`。
  - `高性能`：不触发重排，动画性能极佳。
- `适用场景`：如弹窗出现的放大缩小动画

#### HTML hidden 属性

> 原生的 HTML 属性 `<div hidden></div>`。

- `效果`：浏览器默认样式通常是 `display: none`。
- `特点`：语义化更好，但 CSS 中的 `display` 样式优先级高于它，容易被覆盖。
- `适用场景`：语义化标记不需要显示的元素。

#### 常用方案的对比

| 需求场景                     | 推荐方案             | 常用组合技                                        |
| ---------------------------- | -------------------- | ------------------------------------------------- |
| 彻底消失，不占空间，不可交互 | `display: none`      |                                                   |
| 仅视觉隐藏，保留占位         | `visibility: hidden` |                                                   |
| 透明度                       | `opacity: 0`         | 配合 `pointer-events: none` 防止误触              |
| 为了 SEO 或盲人阅读          | `移出可视区`         | `.sr-only { position: absolute; left: -9999px; }` |
| 折叠/展开动画                | `height: 0`          | 配合 `overflow: hidden; transition: height 0.3s`  |

### 伪类与伪元素

- [菜鸟教程 runoob.com](https://www.runoob.com/css/css-pseudo-classes.html): CSS 伪类(Pseudo-classes)
- [MDN 伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Pseudo-classes): 伪类
- [MDN 伪元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Pseudo-elements): 伪元素

#### 核心对比

| 特性     | 伪类 (`:`)                                                   | 伪元素 (`::`)                                             |
| -------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| 定义     | 用于描述元素的特殊状态（如鼠标悬停、某个子元素等）           | 用于创建或选择元素的特定部分（如内容之前、首字母等）      |
| 符号     | 单冒号 `:`(例如: `:hover`)                                   | 双冒号 `::`(例如: `::before/::after`)                     |
| 数量限制 | 一个选择器中可以同时使用多个伪类                             | 一个选择器中只能出现一个伪元素                            |
| 本质作用 | 弥补了 CSS 选择器的不足,像是给元素添加了一个虚拟的类 (class) | 创造了新的文档树内容,像是给元素添加了一个虚拟的 HTML 标签 |

#### 伪类

> 伪类用于`选择`处于`特定状态`的`元素`。

(一) 常见分类与示例

1️⃣ 用户交互状态

| 伪类            | 说明                                   |
| --------------- | -------------------------------------- |
| `:link`         | 未访问的链接                           |
| `:visited`      | 已访问的链接                           |
| `:hover`        | 鼠标悬停                               |
| `:focus`        | 获得焦点（输入框、按钮）               |
| `:focus-within` | 自身或其子元素获得焦点时（非常实用！） |

2️⃣ 结构/位置选择

| 伪类             | 说明                                    |
| ---------------- | --------------------------------------- |
| `:first-child`   | 第一个                                  |
| `:last-child`    | 最后一个子元素。                        |
| `:nth-child(n)`  | 第 n 个子元素（支持 even, odd, 2n+1）。 |
| `:not(selector)` | 否定伪类，排除特定元素。                |

3️⃣ 表单状态

| 伪类        | 说明                         |
| ----------- | ---------------------------- |
| `:checked`  | 选中状态（checkbox/radio）。 |
| `:disabled` | 禁用状态。                   |
| `:valid`    | 表单验证通过。               |
| `:invalid`  | 失败。                       |

(二) 🔥 实战应用场景

::: code-group
```css [表格斑马纹.css]
/* 偶数行背景变灰 */
tr:nth-child(even) {
  background-color: #f2f2f2;
}
```
```css [实现 Tab 切换或开关.css]
/* 利用 input[type="checkbox"] 和 :checked 状态控制兄弟元素的样式。 */
input[type="checkbox"]:checked + .toggle-content {
  display: block; /* 选中时显示内容 */
}
```
```css [排除最后一个元素的边框.css]
/* 列表中间有分割线，但最后一个不需要。 */
li:not(:last-child) {
  border-bottom: 1px solid #ccc;
}
```
:::

#### 伪元素

> 伪元素用于创建一些在 HTML 文档树中不存在的抽象元素，或者选中特定文本片段。

(一) 常见分类与示例

1️⃣ 内容生成 (最常用)

- `::before` - 在元素内容之前插入虚拟元素。
- `::after` - 在元素内容之后插入虚拟元素。
- 注意：必须配合 `content: ""` 属性使用，否则不生效。

2️⃣ 文本部分

- `::first-letter` - 块级元素的第一行第一个字母（如下沉首大写）。
- `::first-line` - 块级元素的第一行文本。
- `::selection` - 用户用鼠标选中（高亮）的文本部分。

1️⃣ 表单相关

- `::placeholder` - 输入框的占位符文本样式。

(二) 🔥 实战应用场景


::: code-group

```css [清除浮动.css]
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

```css [增加装饰性标识.css]
/* 不想在 HTML 里多写一个 <i> 或 <span> 标签时，用来做红点、箭头、引号。 */
/* 给按钮加个红点 */
.btn-notification::after {
  content: "";
  width: 8px;
  height: 8px;
  background: red;
  border-radius: 50%;
  position: absolute; /* 基于父元素定位 */
  top: 0;
  right: 0;
}
```

```css [修改选中文本的颜色.css]
/* 让网站的选中效果符合品牌色。 */
::selection {
  background-color: #ffcc00; /* 黄色背景 */
  color: #333;
}
```

```css [自定义滚动条.css]
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
```
:::

#### 注意事项

- 一些早期的`伪元素(::)`曾使用单冒号的语法，所以你可能会在代码或者示例中看到。现代的浏览器为了保持后向兼容，支持早期的带有单双冒号语法的伪元素。

### 实现渐变边框

```scss
.current-system-card-bg {
  border-radius: 6px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.15) 100%
  );
  // 伪元素实现渐变边框
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    pointer-events: none;
    z-index: 1;
    /* 
    线性渐变边框: 
    Border colors
      Linear Gradient
        #FFFFFF . 68%
        #FFFFFF . 14%
        #FFFFFF . 20%
    */
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.68) 0%,
      rgba(255, 255, 255, 0.14) 60%,
      rgba(255, 255, 255, 0.2) 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    /* 只显示边框区域 */
    box-sizing: border-box;
  }
}
```

### filter
> [filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/filter) 属性将模糊或颜色偏移等图形效果应用于元素。滤镜通常用于调整图像、背景和边框的渲染。

::: tip TIP
当单个 `filter` 属性具有多个函数时，滤镜将按顺序依次应用。
:::

#### blur()
> 将高斯模糊应用于输入图像。

#### brightness()
> 调整输入图像的对比度
> - `0%`， 将使图像变灰；
> - `100%`，则无影响；
> - `>100%`，将增强对比度；

#### contrast()
> 调整输入图像的对比度
> - `0%`，将使图像变灰；
> - `100%`，则无影响；
> - `超过 100%`，将增强对比度。

#### drop-shadow()
> 使用 `<shadow>` 参数沿图像的轮廓生成阴影效果。阴影语法类似于`<box-shadow>`

#### grayscale()
> 将图像转换为灰度图
> - `100%`， 则完全转为灰度图像；
> - `0%`，  则图像无变化;
> - `100% > n% > 0%`，则是该效果的线性乘数。

#### hue-rotate()
> 应用色相旋转。`<angle>` 值设定图像会被调整的色环角度值。值为 `0deg`，则图像无变化。

#### invert()
> 反转输入图像。
> - `100%`，则图像完全反转，
> - `0%`，则图像无变化。
> - 0`% 和 100% 之间`，则是该效果的线性乘数。
#### opacity()
> 应用透明度。
> - `0%`, 则使图像完全透明
> - `100%`, 则图像无变化。

#### saturate()
> 改变图像饱和度。
> - `0%`，则是完全不饱和，
> - `100%`，则图像无变化。
> - `超过 100%`，则增加饱和度。

#### sepia()
> 将图像转换为深褐色。
> - `100%`，则完全是深褐色的。
> - `0%`，图像无变化。

#### 组合函数
> 你可以`组合任意`数量的`函数`来控制渲染。滤镜将按`声明顺序依次`应用。

## Vue

### 生命周期

1️⃣ 生命周期对比表

| 阶段         | Vue2          | Vue3(选项式)    | Vue3(组合式)      | 说明                                                     |
| ------------ | ------------- | --------------- | ----------------- | -------------------------------------------------------- |
| 创建前       | beforeCreate  | beforeCreate    | setup()           | setup 在组件实例创建之前执行                             |
| 创建完成     | created       | created         | setup()           | 在组合式 API 中，直接写在 setup 里的代码即相当于 created |
| 挂载前       | beforeMount   | beforeMount     | onBeforeMount     | DOM 挂载之前                                             |
| 挂载完成     | mounted       | mounted         | onMounted         | DOM 挂载完成，可操作 DOM                                 |
| 更新前       | beforeUpdate  | beforeUpdate    | onBeforeUpdate    | 响应式数据变化，DOM 更新之前                             |
| 更新完成     | updated       | updated         | onUpdated         | DOM 更新完成                                             |
| 卸载前       | beforeDestroy | beforeUnmount   | onBeforeUnmount   | 名称变更：Destroy 改为 Unmount                           |
| 卸载完成     | destroyed     | unmounted       | onUnmounted       | 名称变更：Destroy 改为 Unmount                           |
| 激活         | activated     | activated       | onActivated       | 仅在 `<KeepAlive>` 缓存组件激活时调用                    |
| 失活         | deactivated   | deactivated     | onDeactivated     | 仅在 `<KeepAlive>` 缓存组件离开时调用                    |
| 错误捕获     | errorCaptured | errorCaptured   | onErrorCaptured   | 捕获子孙组件的错误                                       |
| 调试渲染追踪 | -             | renderTracked   | onRenderTracked   | 新增：Dev 模式下调试依赖追踪                             |
| 调试渲染触发 | -             | renderTriggered | onRenderTriggered | 新增：Dev 模式下调试触发更新                             |

2️⃣ 资源可用性速查表

> ❌ 不可用；✅ 完全可用

| 生命周期        | Props/Methods/Data/Computed | DOM/Refs    | 最佳操作                                                      |
| --------------- | --------------------------- | ----------- | ------------------------------------------------------------- |
| beforeCreate    | ❌ (未定义)                 | ❌          | 初始化非响应式变量，`data`还没变成响应式，`methods`还没绑定。 |
| created/setup() | ✅ (可用)                   | ❌          | 发请求 (API)、初始化数据                                      |
| beforeMount     | ✅                          | ❌          | (极少使用)                                                    |
| mounted         | ✅                          | ✅ (Ready)  | 图表库初始化、DOM 操作、订阅事件                              |
| beforeUpdate    | ✅ (新值)                   | ✅ (Old UI) | 移除旧 DOM 的监听器                                           |
| updated         | ✅                          | ✅ (New UI) | 需要基于新布局计算位置时                                      |
| beforeUnmount   | ✅                          | ✅          | 清理定时器、取消订阅、销毁插件                                |
| unmounted       | ❌ (断开连接)               | ❌          | (极少使用)                                                    |

3️⃣ Methods

| 阶段         | Methods的状态 | 说明                                                                        |
| ------------ | ------------- | --------------------------------------------------------------------------- |
| beforeCreate | ❌ 不可用     | 此时 `this.someMethod` 是 `undefined`。                                     |
| 初始化过程   | ⚙️            | 正在绑定 Vue 遍历 methods 选项，将函数通过 `.bind(this)` 绑定到组件实例上。 |
| created      | ✅ 可用       | 方法已绑定，可以随意调用（如 this.fetchData()）。                           |
| mounted      | ✅ 可用       | 常用于作为事件回调（如 @click="handleClick"）。                             |
| setup()      | ✅ 可用       | 在组合式 API 中，函数就是普通的 JS 变量，定义了就能用。                     |

4️⃣ Props/Methods/Data/Computed/Watch 初始化顺序

> Vue 的初始化流程（initState）中，`Props/Methods/Data/Computed/Watch` 都是在 `beforeCreate` 和 `created` 之间这个狭窄的时间窗口内完成初始化的。虽然它们大致在同一时间可用，但 Vue 内部其实有一个非常严格的初始化顺序。
>
> - 初始化顺序： `Props -> Setup (Vue3) -> Methods -> Data -> Computed -> Watch`
> - ⚠️ 重要的细节：`Data 其实是可以访问 Methods 的！`

5️⃣ 详细的阶段拆解

- `beforeCreate`
  - `能做的事`：初始化非响应式变量。
  - `实例初始化`：Vue 实例刚初始化，`data`还没变成响应式，`methods`还没绑定。
  - `Props/Methods/Data/Computed`: ❌ 不可用。
  - `DOM ($el)`： ❌ 不可用。
- `created`
  - `Props/Methods/Data/Computed`: ✅ 可用。
  - `DOM ($el)`： ❌ 不可用（模板还没编译，真实 DOM 还没挂载）。
  - 在 setup 顶层声明的变量（如 `const count = ref(0)`）此时已初始化完毕。
  - 典型应用
    - `Ajax/Fetch` 异步请求
    - 从 `LocalStorage` 读取数据初始化变量。
- `beforeMount / onBeforeMount`
  - `Props/Methods/Data/Computed`: ✅ 可用。
  - `DOM ($el)`： ❌ 不可用（首次调用render 函数。虚拟 DOM 已经生成，但还没替换到页面上）。
- `mounted / onMounted`
  - `Props/Methods/Data/Computed`: ✅ 可用。
  - `DOM ($el)`： ✅ 可用（组件已挂载到页面，真实 DOM 存在）。
  - `典型应用`
    - **访问/操作 DOM**：如 `ref` 绑定的元素、获取元素实际宽高。
    - **启动外部库**：需要绑定 DOM 的插件（如 ECharts、Swiper、高德地图）。
    - **绑定全局事件**：如 `window.addEventListener('resize')`。
  - `⚠️ 注意`：此时是发起请求、操作 DOM 的最佳时机。
- `beforeUpdate / onBeforeUpdate`
  - `触发时机`：响应式数据发生变化，Vue 即将更新 DOM 之前。
  - `DOM 状态`：此时获取的是 **更新前** 的 DOM。
  - `典型应用`：在 DOM 更新前访问现有的 DOM，比如手动移除已添加的事件监听器。
  - `⚠️ 注意`：千万别在这里修改数据，否则会触发死循环。
- `updated / onUpdated`
  - `触发时机`：数据变化导致的虚拟 DOM 重新渲染和打补丁完成之后。
  - `DOM 状态`：此时获取的是 **更新后** 的最新 DOM。
  - `典型应用`：当数据更新后，需要基于新的 DOM 尺寸进行计算或操作（如调整滚动条位置）。
- `beforeUnmount / onBeforeUnmount` (Vue3) / `beforeDestroy` (Vue2)
  - `触发时机`：组件卸载之前。
  - `状态`：组件实例依然完全可用，父子组件通信依然正常。
  - `✅ 最佳实践`：**清理工作的核心战场**。
    - 清除定时器 (`clearInterval`, `clearTimeout`)
    - 取消未完成的 API 请求
    - 解绑全局事件 (如 `window.removeEventListener`)
    - 销毁第三方库实例 (如 `ECharts.dispose()`, `SortableJS.destroy()`)
  - `⚠️ 注意`：此时是清理垃圾（定时器、事件）的最后机会，**不仅是为了性能，更是为了防止内存泄漏**。
- `unmounted / onUnmounted` (Vue3) / `destroyed` (Vue2)
  - `触发时机`：组件卸载之后。
  - `状态`：组件实例已被销毁，所有指令解绑、事件监听器移除、子组件也都被卸载。
  - `能做的事`：一般不需要在这里做太多操作，核心清理工作应在 `beforeUnmount` 完成。
- `onActivated / onDeactivated` (仅 KeepAlive)
  - `onActivated`：组件被 `<KeepAlive>` 缓存并**重新插入** DOM 时调用。
  - `onDeactivated`：组件被 `<KeepAlive>` 缓存并**从 DOM 移除**时调用（此时组件并未真正销毁，不会触发 Unmount）。
  - `⚠️ 注意`
    - 若使用 `keep-alive` 缓存了组件，当离开该组件跳转到详情或者其他页面（该组件失活），返回缓存组件需要刷新数据,则在（`onActivated`）中做数据请求/刷新。
    - 若离开`keep-alive` 缓存的组件，需要做一些操作（移除定时器，移除监听等），则在（`onDeactivated`）中添加相关逻辑

### diff算法

> `Diff算法`的核心：针对具有`相同父节点`的`同层新旧子节点`进行比较，而不是使用逐层搜索递归遍历的方式。

⚠️ 注意事项

> 时间复杂度为`O(n)`。

### emit

> [官方参考文档](https://cn.vuejs.org/guide/components/events.html): 组件事件

1️⃣ emit 自定义事件命名规范

> 小驼峰命名（camelCase ），如`emit('someEvent')`

2️⃣ 模板编写

> 推荐使用 `kebab-case` (短横线连字符) 形式

⚠️ 注意事项

::: warning TIP
所有传入 `$emit()` 的额外参数都会被直接传向监听器。举例来说，`$emit('foo', 1, 2, 3) `触发后，监听器函数将会收到这三个参数值。
:::

::: danger TIP

若一个`原生事件`的名字 (例如 click) `被定义`在 `emits` 选项中，则监听器`只会监听`组件触发的 `click` 事件而`不会再响应原生的 click 事件`。

:::

### 虚拟 DOM (Virtual DOM)

> 虚拟DOM: 用 `JavaScript` 对象来`模拟`真实的 DOM 结构。

1️⃣ 特性

- `虚拟DOM`对象的节点与`真实DOM`的属性一一照应。
- `虚拟 DOM`就是为了`解决浏览器性能问题`而被设计出来的。
- 有效避免真实DOM操作频次，减少多次引起重绘与回流，提高性能。
- 跨平台的能力。

2️⃣ virtual DOM和真实DOM

- 用`JS`对象`模拟DOM`（将真实的DOM的数据抽取出来，以对象的形式模拟树形结构）
- 把此虚拟DOM转成真实DOM并插入页面中
- 若有事件发生修改了虚拟DOM
- `diff`算法比较两棵虚拟DOM树的差异，得到差异对象
- 把差异对象应用到真正的DOM树上
  3️⃣ Virtual DOM的
- 先根据真实DOM生成一颗`Virtual DOM` 树
- 当`Virtual DOM` 某个节点的数据改变后会生成一个新的`VNode`
- 然后`VNode`和`OldVNode`作对比，发现有不一样的地方就直接修改在真实的DOM上

4️⃣ diff的过程

> 是调用名为`patch`的函数，`比较`新旧节点，一边比较一边给`真实的DOM`打补丁。

### Vue3多根节点

- 支持多根节点
- ⚠️若封装通用组件，多根节点需要注意`Attributes`透传问题
  > - 禁用`Attributes`透传
  > - 明确给节点绑定 `Attributes`（v-bind="$attrs"）
> ⚠️ 和`单根节`点组件有所不同，有着`多个根节点`的组件没有自动 attribute 透传行为。若 `$attrs` 没有被`显式绑定`，将会`抛出`一个`运行时警告`。

### 组件基础

#### 组件命名和模板使用

- 🅰 `kebab-case`：短横线分隔命名，模板使用只能 `kebab-case`方式，可自闭合
- 🅱 `PascalCase`：帕斯卡/大驼峰命名，模板使用可选`kebab-case`/`PascalCase`方式，可自闭合

> 学习目标？
>
> - 在哪命名？
>   > 答：在 `components:{name: 导入符号}`/`defineOptions({name:组件名称})` 选项中。
> - 如何命名？
>   > 答：`kebab-case`/`PascalCase`方式命名。
> - 如何使用？
>   > 答：`kebab-case`/`PascalCase`方式以及可选自闭。
> - 组件中name用途?
>   > 答：组件递归、调试、搭配`keep-alive` 使用.
> - 注意事项？
>   > 答：无论选用那种命名方式/模板使用方式，都应该保持统一。

#### 插槽

- 默认插槽：`<slot></slot>`
- 具名插槽：`<slot name="header"></slot>`
- 条件插槽：有时需根据内容是否被传入插槽来渲染某部分，可结合`$slots`与`v-if`实现。
  > - `<div v-if="$slots.header"><slot name="header" /></div>`
- 动态插槽：`<template #[dynamicSlotName]></template>`
- 作用域插槽：`<slot :text="msg" :count="1"></slot>`

### 动态组件&异步组件

1️⃣ 动态组件

> `<component :is="currentTabComponent"></component>`

2️⃣ 异步组件

> `defineAsyncComponent`

### 透传 Attributes

> “透传 attribute”指的是传递给一个组件，却没有被该组件声明为 props 或 emits 的 attribute 或者 v-on 事件监听器。

- `Attributes 继承`：当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上。
- `对 class 和 style 的合并`：若一个子组件的根元素已经有了 class 或 style attribute，它会和从父组件上继承的值合并。
- `v-on 监听器继承`：click 监听器会被添加到 子组件 的根元素。
- `禁用 Attributes 继承`：你不想要一个组件自动地继承 attribute，你可以在组件选项(`defineOptions`)中设置 `inheritAttrs: false`。
- `v-bind="$attrs"`：透传进来的 attribute 可以在模板的表达式中直接用 `$attrs` 访问到。
  - `$attrs` 对象包含了除组件所声明的 `props` 和 `emits` 之外的所有其他 attribute。
- `在 JS 中访问透传 Attributes`：你可以在 `<script setup>`; 中使用 `useAttrs() API` 来访问一个组件的所有透传 attribute。

### 组件 v-model

- Vue 3.0-（`value prop` 以及 `input` 事件）
  - 将其 `value` attribute 绑定到一个名叫 `value` 的 `prop` 上
  - 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出
- Vue 3.4-（`modelValue` 的 prop以及 `update:modelValue` 的事件）
- Vue 3.4+（推荐使用 `defineModel()` ，一个便利宏）
  - 一个名为 `modelValue` 的 `prop`，本地 `ref` 的值与其同步；
  - 一个名为 `update:modelValue` 的事件，当本地 `ref` 的值发生变更时触发
  - ⚠️ 若为 `defineModel` prop 设置了一个 `default` 值且父组件没有为该 prop 提供任何值，会导致`父组件与子组件之间不同步`。

### watch/watchEffect

- watch
  - 只追踪明确侦听的数据源，不会追踪任何在回调中访问到的东西。
  - `默认是懒执行的，即回调不会立即执行`，仅当数据源变化时，才会执行回调。
  - `回调函数携带2个参数`，以便获取`新数据`和`旧数据`。
  - `deep` 选项，强制转成深层侦听器。
  - `immediate: true` 选项，强制侦听器的回调立即执行。
- watchEffect
  - 不需要明确侦听数据源。
  - `回调会立即执行`，不需要指定 `immediate: true`。
  - `自动追踪依赖`，自动追踪任何在回调中访问到的`响应式依赖`，不追踪普通变量。
  - `同步执行期间追踪`，它只追踪在回调函数同步执行期间被读取的依赖。
  - `比深度侦听器更有效`，因为它只跟踪回调中被用到的属性，而非递归地跟踪所有的属性。
  - `回调函数无参`
  - ⚠️注意事项
    > - 仅会在其同步执行期间，才追踪依赖。
    > - 异步回调时，只有在第一个 `await` 正常工作前访问到的属性才会被追踪。
    >   ㊙️ 调试

```ts [index.ts]
watch(source, callback, {
  onTrack(e) {
    console.log("onTrack", e);
  },
  onTrigger(e) {
    console.log("onTrigger", e);
  },
});

watchEffect(callback, {
  onTrack(e) {
    debugger;
  },
  onTrigger(e) {
    debugger;
  },
});
```

⚠️ 注意事项

> 侦听器的 `onTrack` 和 `onTrigger` 选项`仅`会在`开发模式`下工作。

### Teleport（节点传送）

> `<Teleport>`是一个内置组件，它可以将组件内部的一部分模板`“传送”`到该组件的 DOM 结构外层。

1️⃣ 应用场景

- 全屏模态框
- 全局通知
- 全局下拉菜单

2️⃣ 作用

> 保持组件逻辑状态（Props、Events、Inject）依然在父子组件树中，但把`真实的 DOM 节点` "传送" 到`<body> `或`其他指定的 DOM 节点下`，从而脱离父级 CSS 的限制。

3️⃣ 关键特性与注意事项

- 逻辑父子关系不变
- 样式作用域（依然有效）

⚠️ 注意事项

> 凡遇到`"子组件需要突破父组件 CSS 视觉限制"`的情况，`<Teleport>` 即为最佳的解决方案。

### defineEmits&defineExpose

> `defineEmits` & `defineExpose` & `自组件内部事件`，三者的关系和执行顺序

1️⃣ 场景 1：用户点击了子组件内部的按钮（最常见）

> 顺序: `用户点击` -> `内部 click` -> `emit` -> `父组件处理`。

2️⃣ 场景 2：父组件主动调用（父调子）

> 顺序: `父组件直接调用 ref 方法` -> `子组件 click` -> `emit` -> `父组件监听到事件`。

3️⃣ Example

```ts
// 1. 定义对外发射的信号
const emit = defineEmits<{ (e: "openApp"): void }>();

// 2. 定义内部逻辑
// 这个函数既可以被模板点击触发，也可以被父组件通过 Ref 触发
function onClickOpen() {
  // 这里可以加逻辑，比如 console.log('准备打开App');
  emit("openApp"); // 发射信号
}

// 3. 暴露给父组件，若不需要父组件能主动控制子组件，则可以不用暴露出这个内部click
// 如果没有这行，父组件就无法通过 ref.value.onClickOpen() 调用上面的函数
// defineExpose 纯粹是为了让父组件能主动控制子组件。
// 让外部（父组件）能主动调用子组件内部的方法或获取变量。
defineExpose({
  onClickOpen,
});
```

### 过渡和动画

> Vue 提供了两个`内置组件`，可以帮助制作基于状态变化的过渡和动画：`<Transition>` 和 `<TransitionGroup>`

1️⃣ 应用场景

- `<Transition>`：会在`一个元素或组件`进入和离开 DOM 时应用动画。
- `<TransitionGroup>`：会在一个`v-for 列表中的元素或组件`被插入/移动/移除时应用动画。
  - 为列表中的`多个`元素或组件提供过渡效果
  - 拥有与 `<Transition>` 除了 `mode` 以外所有的 props，并增加了两个额外的 props(`tag`,`moveClass`)

2️⃣ `<Transition>` 组件，进入或离开可以由以下的条件之一触发

- 由 `v-if/v-show` 所触发的切换
- 由特殊元素 `<component>` 切换的动态组件
- 改变特殊的 `key` 属性

> ⚠️ `<Transition>` 仅支持`单个元素或组件`作为其插槽内容。若内容是一个组件，该组件必须`仅有`一个根元素（`单根节点组件`）。

3️⃣ `<TransitionGroup>` 组件

- 默认情况下，它不会渲染一个容器元素。但可传入 `tag` prop 来指定一个元素作为容器元素来渲染。
- `过渡模式(mode)`不可用，因为我们不再是在互斥的元素之间进行切换。
- 列表中的`每个元素`都`必须`有一个唯一的 `key`。
- CSS 过渡 class 会被应用在`列表内`的元素上，而`不是容器元素`上。

> ⚠️ 当在 `DOM 内模板`中使用时，组件名需要写为 `<transition-group>`

4️⃣ CSS 过渡 class

- 进入状态
  - `v-enter-from`：进入动画的起始状态。
  - `v-enter-active`：进入动画的生效状态。
  - `v-enter-to`：进入动画的结束状态。
- 离开状态
  - `v-leave-from`：离开动画的起始状态。
  - `v-leave-active`：离开动画的生效状态。
  - `v-leave-to`：离开动画的结束状态。

5️⃣ 为过渡效果命名

- 传一个 `name` prop 来声明一个过渡效果名。
- 有`name`的过渡效果，`name`作为前缀`替换`默认的 `v` 作为前缀。

6️⃣ 自定义过渡 class(即给每个状态单独添加一个过渡效果)

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

```vue [index.vue]
<template>
  <Transition
    name="custom-classes"
    enter-active-class="aaa"
    leave-active-class="bbb"
    ...
  >
    <p v-if="show">hello</p>
  </Transition>
</template>
```

7️⃣ JavaScript 钩子

- `@before-enter`: 在元素被插入到 DOM 之前被调用，用这个来设置元素的 `"enter-from"` 状态
- `@enter`: 在元素被插入到 DOM 之后的下一帧被调用，用这个来开始进入动画
- `@after-enter`: 当进入过渡完成时调用。
- `@enter-cancelled`: 当进入过渡在完成之前被取消时调用
- `@before-leave`: 在 `leave` 钩子之前调用
- `@leave`: 在离开过渡开始时调用，用这个来开始离开动画
- `@after-leave`: 在离开过渡完成、且元素已从 DOM 中移除时调用
- `@leave-cancelled`: 仅在 `v-show` 过渡中可用

> Tip: 上述钩子可以与 `CSS 过渡`或`动画`结合使用，也可以`单独使用`。

### Props

1️⃣ 声明

> 一个组件需要`显式声明`它所接受的 `props`，这样 Vue 才能知道外部传入的哪些是` props`，哪些是透传 `attribute`。
>
> - 非 `<script setup>` 的组件中：使用 `props` 选项来声明。
> - `<script setup>` 的单文件组件中：使用 `defineProps()` 宏来声明。

2️⃣ 声明方式

- 使用`字符串数组`来声明：不校验类型
- 使用`对象的形式`来声明：校验类型

3️⃣ 传递 `prop` 的细节

- 若一个 `prop` 的名字很长，应使用 `camelCase` 形式
- 向子组件传递 `props` 时，应使用 `kebab-case` 形式

4️⃣ 单项数据流

- 所有的 `props` 都遵循着`单向绑定原则`
  - `props` 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。
  - ✅ 子组件应该`抛出一个事件`来通知父组件做出改变
  - ⚠️ 不应该在子组件中去更改一个`prop`

5️⃣ Boolean 类型转换

```vue [index.vue]
<script lang="ts" setup>
// Child.vue
defineProps({
  disabled: Boolean,
});
</script>
<template>
  <!-- 等同于传入 :disabled="true" -->
  <MyComponent disabled />

  <!-- 等同于传入 :disabled="false" -->
  <MyComponent />
</template>
```

### computed

::: code-group

```ts [type.ts]
// 只读
function computed<T>(
  getter: (oldValue: T | undefined) => T,
  // 查看下方的 "计算属性调试" 链接
  debuggerOptions?: DebuggerOptions,
): Readonly<Ref<Readonly<T>>>;

// 可读可写
function computed<T>(
  options: {
    get: (oldValue: T | undefined) => T;
    set: (value: T) => void;
  },
  debuggerOptions?: DebuggerOptions,
): Ref<T>;
```

```ts [readonly.ts]
const count = ref(0);
const plusOne = computed(() => count.value + 1);

console.log(plusOne.value); // 2
plusOne.value++; // ❌ 错误
```

```ts [readAndWrite.ts]
const count = ref(0);
const plusCount = computed({
  get: () => count.value,
  set: (newVal) => {
    count.value = newVal;
  },
});
/**
 *  + 1
 */
function btnPlusCount() {
  plusCount.value++;
}
/**
 * - 1
 */
function btnReduceCount() {
  plusCount.value--;
}
```

```ts [readAndWrite2.ts]
const count = ref(1);
const plusCount = computed({
  get: () => count.value + 1,
  set: (newVal) => {
    count.value = newVal - 1;
  },
});
// 访问 plusCount.value，触发其 get 方法，从而获取最新的 count + 1
console.error(count.value, plusCount.value); // 1 2

plusCount.value = 1; // plusCount 赋值，会触发其 set 方法，从而修改 count

// 访问 plusCount.value，触发其 get 方法，从而获取最新的 count + 1
console.error(count.value, plusCount.value); // 0 1
```

```ts [debugger.ts]
import type { DebuggerEvent } from "vue";
const count = ref(0);
const plusOne = computed(() => count.value + 1, {
  // 当 count.value 被追踪为依赖时触发(访问plusOne)
  onTrack(e: DebuggerEvent) {
    // eslint-disable-next-line no-console
    console.log("plusOne is tracked", e);
  },
  // 当 count.value 被更改时触发(依赖更新/变化)
  onTrigger(e: DebuggerEvent) {
    // eslint-disable-next-line no-console
    console.log("plusOne is triggered", e);
  },
});

// 访问 plusOne，会触发 onTrack
console.log(plusOne.value);

// 更改 count.value，应该会触发 onTrigger
count.value++;
```

:::

⚠️ 注意事项

> 计算属性的 `onTrack` 和 `onTrigger` 选项`仅`会在`开发模式`下工作。

### hooks & utils

`hooks` 目录下的文件是 `hooks` ，`utils` 目录下的文件是 `utils` 。

- `hooks` 内部使用了 `vue` 相关 `API`
- `utils` 内部没有使用 `vue`相关 `API` 。

## ES6

### 运算符的扩展

- `**`：指数运算符，ES2016 新增的一个运算符。
  - `2 ** 2 // 4`
  - `a **= 2 // 等同于 a = a * a;`
- `?.`：链判断运算符，ES2020 新增的一个运算符，左侧的对象是否为`null/undefined`，若是则不再往下运算，而是返回`undefined`。
  - `obj?.prop`：对象属性是否存在
  - `obj?.[expr]`：同上
  - `func?.(...args)`：函数或对象方法是否存在
- `??`：Null 判断运算符，ES2020 新增的一个运算符，只有运算符左侧的值为`null/undefined`时，才会返回右侧的值。
  - `const name = res.nickName ?? 'frank';` 默认值只有在左侧属性值为`null/undefined`时，才会生效

### Set & Map 数据结构

::: details Set & WeakSet

1️⃣ `Set`：ES6 新增的数据结构，类似于数组，但成员值唯一、无重复。

> 常用方法
>
> > - `add(value)`：添加元素
> > - `delete(value)`：删除元素
> > - `has(value)`：判断元素是否存在
> > - `clear()`：清空所有元素
> > - `size`：元素个数

> 遍历：支持 forEach、for...of、keys、values、entries

> 特点
>
> > 只存储值，没有键，值唯一。

2️⃣ `WeakSet`：结构与 Set 类似，但`只能存储对象`（不能存储原始值），且对象为弱引用。

> 常用方法
>
> > - `add(value)`
> > - `delete(value)`
> > - `has(value)`

⚠️ 注意事项

> - `Set`本身是一个`构造函数`，用来`生成` Set 数据结构。

:::

::: details Map & WeakMap

1️⃣ `Map`：ES6 新增的数据结构，键值对集合，键和值都可以是任意类型。。

> 常用方法
>
> > - `set(key, value)`：设置键值对
> > - `get(key)`：获取键值
> > - `has(key)`：判断键是否存在
> > - `delete(key)`：删除键值对
> > - `clear()`：清空所有
> > - `size`键值对数量

> 遍历：支持 forEach、for...of、keys、values、entries

> 特点
>
> > 键可以是对象，顺序按插入顺序。

2️⃣ `WeakMap`：键值对集合，`键必须是对象`，值可以是任意类型，键为弱引用。

> 常用方法
>
> > - `set(key, value)`：设置键值对
> > - `get(key)`：获取键值
> > - `has(key)`：判断键是否存在
> > - `delete(key)`：删除键值对

> 特点
>
> > - 不能遍历（无 size、无 forEach）。
> > - 键对象被垃圾回收后自动移除。
> > - 适合存储与对象相关的私有数据。

:::

::: details 区别与联系总结表

| 特性         | Set        | WeakSet      | Map             | WeakMap            |
| ------------ | ---------- | ------------ | --------------- | ------------------ |
| 成员         | 只存值     | 只存对象     | Record<any,any> | Record<object,any> |
| 唯一         | 是         | 是           | 键唯一          | 键唯一             |
| 可遍历       | 是         | 否           | 是              | 否                 |
| 弱引用       | 否         | 是           | 否              | 是                 |
| 垃圾回收影响 | 否         | 是           | 否              | 是                 |
| 应用场景     | 唯一值集合 | 临时对象集合 | 映射关系        | 关联私有数据       |

:::

### Symbol 函数

> 作用：主要用于定义对象的唯一属性名，`避免属性名冲突`。

1️⃣ 使用规则

- `Symbol` 一种新的原始数据类型，通过 `Symbol()` 函数创建。
- `Symbol` 不能与其他类型直接运算（如 +），只能显式转换为字符串或布尔值。
- 作为对象属性时，不会被常规遍历方法枚举出来，可用 `Object.getOwnPropertySymbols()`。
- 作为属性名时，不能用点语法访问，必须用方括号 `[]` 访问，如`obj[sym] = value;`
- 全局注册的 `Symbol（Symbol.for/ Symbol.keyFor）`可跨文件共享。

2️⃣ 经典用法
::: code-group

```js [唯一性.js]
// 唯一性：每个 Symbol 都是唯一的，即使描述相同。
const a = Symbol("desc");
const b = Symbol("desc");
console.log(a === b); // false
```

```js [作为对象属性.js]
// 作为对象属性：防止属性名冲突，常用于对象“私有”属性。
const key = Symbol("id");
const obj = {
  [key]: 123,
  name: "Tom",
};
console.log(obj[key]); // 123
```

```js [定义常量枚举值.js]
// 用 Symbol 定义状态常量，含义明确
const STATUS = {
  RED: Symbol("red"),
  GREEN: Symbol("green"),
};

function getColor(color) {
  switch (color) {
    case STATUS.RED:
      return "红色";
    case STATUS.GREEN:
      return "绿色";
  }
}
getColor(STATUS.RED);
```

```js [内置 Symbol 用法.js]
// 内置 Symbol 用法（如自定义迭代器）
const obj = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        return i < 3 ? { value: i++, done: false } : { done: true };
      },
    };
  },
};
for (const v of obj) console.log(v); // 0 1 2
```

:::

3️⃣ 使用场景

⚠️ 注意事项

> Symbol 是原始数据类型，不是对象，所以`不能`用 `new Symbol()` 创建，否则会报错

## JavaScript

### JS学习技巧

> Debugger/断点调试 + 在线js编辑器（https://playcode.io/javascript-compiler）

### 面向过程与对象编程

> JavaScript 是一门多范式语言，它既支持函数式编程（偏向面向过程），也支持基于原型（Prototype）和类（Class）的面向对象编程。

#### 面向过程编程（POP）

##### 概念

面向过程编程是一种以过程为中心的编程范式，它将程序看作是一系列的步骤或过程，每个过程完成特定的任务。程序的执行流程是按照这些过程的顺序依次进行的。
这种编程方式强调的是功能的实现，将大问题分解为一个个小的函数或过程，通过调用这些函数来完成整个程序的功能。

##### 特点

- 模块化：将程序分解为多个独立的函数，每个函数负责一个特定的任务，提高了代码的可维护性和复用性。
- 顺序执行：程序按照函数调用的顺序依次执行，逻辑清晰，易于理解。
- 数据和操作分离：数据和操作数据的函数是分开的，函数通过参数来传递数据。

##### Example

```js
// 定义加法函数
function add(a, b) {
  return a + b;
}

// 定义减法函数
function subtract(a, b) {
  return a - b;
}

// 定义乘法函数
function multiply(a, b) {
  return a * b;
}

// 定义除法函数
function divide(a, b) {
  if (b === 0) {
    console.log("除数不能为零");
    return;
  }
  return a / b;
}

// 使用函数进行计算
const num1 = 10;
const num2 = 5;
const sum = add(num1, num2);
const difference = subtract(num1, num2);
const product = multiply(num1, num2);
const quotient = divide(num1, num2);

console.log("和:", sum);
console.log("差:", difference);
console.log("积:", product);
console.log("商:", quotient);
```

#### 面向对象编程（OOP）

##### 概念

面向对象编程是一种以对象为中心的编程范式，它将数据和操作数据的方法封装在一起，形成一个对象。对象是类的实例，类是一种抽象的模板，定义了对象的属性和方法。
通过继承、封装和多态等特性，面向对象编程可以提高代码的可维护性、可扩展性和复用性。

##### 特点

- 封装：将数据和操作数据的方法封装在一个对象中，对外提供公共的接口，隐藏内部的实现细节。
- 继承：允许一个类继承另一个类的属性和方法，从而实现代码的复用和扩展。
- 多态：同一个方法在不同的对象上可以有不同的实现，提高了代码的灵活性和可扩展性。

##### Example

```js
// 定义计算器类
class Calculator {
  constructor() {
    // 可以在这里初始化一些属性
  }

  // 定义加法方法
  add(a, b) {
    return a + b;
  }

  // 定义减法方法
  subtract(a, b) {
    return a - b;
  }

  // 定义乘法方法
  multiply(a, b) {
    return a * b;
  }

  // 定义除法方法
  divide(a, b) {
    if (b === 0) {
      console.log("除数不能为零");
      return;
    }
    return a / b;
  }
}

// 创建计算器对象
const calculator = new Calculator();
const num1 = 10;
const num2 = 5;
const sum = calculator.add(num1, num2);
const difference = calculator.subtract(num1, num2);
const product = calculator.multiply(num1, num2);
const quotient = calculator.divide(num1, num2);

console.log("和:", sum);
console.log("差:", difference);
console.log("积:", product);
console.log("商:", quotient);
```

#### 核心理念对比

| 特性       | 面向过程 (POP)                                 | 面向对象 (OOP)                                                       |
| ---------- | ---------------------------------------------- | -------------------------------------------------------------------- |
| 核心关注点 | `"怎么做" (How)`。关注解决问题的步骤和流程。   | `"谁来做" (Who)`。关注由于哪些实体（对象）组成，以及对象之间的交互。 |
| 代码组织   | 以`函数`为中心。数据和操作数据的函数是分离的。 | 以`对象`为中心。数据（属性）和操作数据的函数（方法）封装在一起。     |
| 思维方式   | 线性思维：第一步做什么，第二步做什么。         | 模块化思维：在这个系统里有哪些角色？每个角色有什么属性和能力？       |
| 适用场景   | 简单的脚本、算法逻辑、工具函数、小型应用。     | 复杂的业务系统、大型应用、需要高度复用和维护的项目。                 |

#### 结合现代前端 (Vue 3) 的思考

> Vue 3 Composition API (组合式 API) , 它在形式上看起来像`“面向过程”`（定义一堆 const 变量和 function），但实际上通过闭包和响应式系统，实现了比传统 OOP 更灵活的逻辑复用。
>
> - Options API (Vue 2): 典型的 OOP 结构。data 是属性，methods 是行为，this 指向实例。
> - Composition API (Vue 3)
>   > - 看起来像过程式：代码按功能块组织（hooks/composables）。
>   > - 核心是封装：一个`useGameLogic()` 函数内部封装了状态和方法，返回给组件使用。这本质上是`函数式编程`与`封装思想`的结合。

#### 实战代码演练

##### 面向过程 (POP) 写法

> 在面向过程中，我们会定义全局变量（数据）和独立的函数（行为）。

```js
/* --- 数据 --- */
let chickenName = "小黄";
let chickenX = 0;
let chickenY = 0;
let chickenHealth = 100;

/* --- 过程/函数 --- */
function moveChicken(x, y) {
  chickenX += x;
  chickenY += y;
  console.log(`${chickenName} 移动到了 (${chickenX}, ${chickenY})`);
}

function feedChicken(foodAmount) {
  chickenHealth += foodAmount;
  console.log(`${chickenName} 吃饱了，生命值: ${chickenHealth}`);
}

// 执行过程 (步骤清晰)
moveChicken(10, 5);
feedChicken(20);
```

⚠️ 特点

- 数据散落在外部。
- 如果我们要增加第二只小鸡（chicken2Name, chicken2X...），代码会变得非常混乱且难以管理。
- 函数需要依赖外部变量或者通过参数传递数据。

##### 面向对象 (OOP) 写法

> 在面向对象中，我们将“小鸡”视为一个独立的个体，它自己包含坐标信息（数据）和移动能力（方法）。

```js
// 使用 ES6 Class 语法
class Chicken {
  // 构造函数：初始化数据
  constructor(name) {
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.health = 100;
  }

  // 方法：封装行为
  move(x, y) {
    this.x += x;
    this.y += y;
    console.log(`${this.name} 移动到了 (${this.x}, ${this.y})`);
  }

  feed(foodAmount) {
    this.health += foodAmount;
    console.log(`${this.name} 吃饱了，生命值: ${this.health}`);
  }
}

// 实例化对象
const chicken1 = new Chicken("小黄");
const chicken2 = new Chicken("小白");

// 对象自己执行行为
chicken1.move(10, 5);
chicken2.feed(10);
```

⚠️ 特点

- `封装`：数据 (x, y) 和操作数据的方法 (move) 被绑在一起。外部不需要知道 move 内部是如何修改坐标的，只需要调用即可。
- `复用性`：可以轻松创建无数只小鸡，互不干扰。

### 位运算符

- `a << b`：算术左移，将 a 的二进制串向左移动 b 位，右边移入 0.
- `a >> b`：算术右移，把 a 的二进制表示向右移动 b 位，丢弃被移出的所有位。
- `a >>> b`：逻辑右移，左侧补 0，把值当作无符号 32 位整数处理，结果总为非负数。
- `a ^ b`：异或，在 a,b 的位表示中，每一个对应的位，两个`不相同`则返回 1，`相同`则返回 0.
- `a | b`：或，在 a,b 的位表示中，每一个对应的位，只要有一个为 1 则返回 1，否则返回 0.
- `~ a`：按位非，反转被操作数的位，将所有的 32 位取反，而值的最高位 (最左边的一位) 为 1 则表示负数 (2-补码表示法)。

::: tip 直观记忆

- `“左移补 0”`：<< 低位补 0（乘法效果，可能改变符号）。
- `“算术右移保符号”`：>> 用符号位填充，负数仍负。
- `“逻辑右移补 0 且无符号”`：>>> 总是补 0，结果非负。

> ⚠ 操作数被转换为 32bit 整数，以位序列（0 和 1 组成）表示。若超过 32bits，则取低位 32bit

:::

### bind/call/apply

> `bind/call/apply`都是 `Function.prototype` 的方法，都用于显式设置函数执行时 `this` 指向，同时可传入参数。

#### bind

- 用法: `const bound = fn.bind(thisArg, arg1, ...)`
- 行为: 不立即执行，返回一个新函数；调用该新函数时 `this` 被固定为 `thisArg`。
- 返回值: 新函数（bound function）。

#### call

- 用法: `fn.call(thisArg, arg1, arg2, ...)`
- 行为: 立即调用 `fn`，`this` 指向` thisArg`，其余参数逐一传入。
- 返回值: `fn` 的返回值。
- 要点: 参数逐个列出，适合已知数量参数的直接调用。

#### apply

- 用法: `fn.apply(thisArg, argsArray)`
- 行为: 立即调用 `fn`，`this`指向 `thisArg`，参数从数组/类数组展开。
- 返回值: `fn` 的返回值。
- 要点: 当参数已在数组或类数组中时很方便；等价于 `fn(...argsArray)`（ES6+）。

#### 对比

| 函数    | 执行时机   | 参数传递                     | 常见用途                              |
| ------- | ---------- | ---------------------------- | ------------------------------------- |
| `bind`  | 返回新函数 | 可预设部分参数，调用时可追加 | 事件处理器、回调中保持 `this`、偏函数 |
| `call`  | 立即执行   | 逐个列出                     | 调用函数并显式设置 `this`             |
| `apply` | 立即执行   | 数组/类数组                  | 当参数已经是数组时                    |

#### 常见误区与注意点

- `bind 不会改变函数内部作用域链` — 仅固定调用时的 `this`。
- `bind 产生新函数`，重复 bind 会浪费内存并影响比较（引用不同）。
- `apply 参数必须可迭代/类数组`，传 `null/undefined` 时相当于空数组。
- `构造调用与 bind`: 用 `new` 调用 `bound` 函数时，`thisArg` 被忽略，实例为新创建对象。
- 对于箭头函数，`call/apply/bind` 无效。

#### 函数选择

- 需要立即执行且参数逐个列出：`call`。
- 需要立即执行且参数为数组：`apply`。
- 需要返回固定 `this` 的可重用函数或做偏函数：`bind`。
- 参数形式
  - `call(thisArg, a, b, ...)`，立即执行。
  - `apply(thisArg, [a,b,...])`，立即执行。
  - `bind(thisArg, preArgs...)`，返回新函数（延迟执行）。

#### 示例

::: code-group

```js [bind.js]
// 1.方法借用,将类数组转为数组
function listArgs() {
  return Array.prototype.slice.call(arguments);
}
listArgs(1, 2, 3); // [1,2,3]
// 现代写法：Array.from(arguments) 或 [...arguments]

// 2.bind 创建偏函数与保持 this
function multiply(a, b) {
  return a * b;
}
const double = multiply.bind(null, 2);
double(5); // 10

const obj = {
  x: 42,
  getX() {
    return this.x;
  },
};
const getX = obj.getX;
getX(); // undefined (或 window.x) ——失去 this
const boundGetX = getX.bind(obj);
boundGetX(); // 42

// 3.bind 与 new 的交互:
function Person(name) {
  this.name = name;
}
const BoundPerson = Person.bind({ fake: true }, "Alice");
const p = new BoundPerson();
p.name; // "Alice" — 实例化成功，this 被新对象替代，预设参数仍然生效
```

```js [call.js]
function greet(greeting) {
  return greeting + ", " + this.name;
}
const person = { name: "张三" };
greet.call(person, "你好"); // "你好, 张三"
```

```js [apply.js]
function sum(a, b, c) {
  return a + b + c;
}
const arr = [1, 2, 3];
sum.apply(null, arr); // 6
// 等价于: sum(...arr)
```

:::

### 模块化规范

#### 分类

- `CJS(CommonJS)`：Node.js采用的规范，主要用于`服务端`。
- `AMD`：专门为`浏览器端`设计的`异步加载规范`，代表库是`RequireJS`。
- `CMD`：为浏览器端设计，代表库是 `Sea.js`（阿里玉伯提出），主要在国内流行。
- `UMD`：通用模块定义，为了解决跨平台（浏览器和 Node.js）兼容问题。
- `ESM`(ES Modules)：ES2015 (ES6) 推出的官方标准，旨在统一前后端

#### CommonJS

1️⃣ 特点

- 同步加载
- 运行时加载
- 缓存
- 值拷贝

2️⃣ 语法

- 导出：`module.exports = {}` 或 `exports.xxx = xxx`
- 导入：`const xxx = require('xxx')`

#### AMD

1️⃣ 特点

- 异步加载
- 依赖前置（定义模块前必须声明其依赖，加载完成依赖后才执行回调）。

2️⃣ 语法

- 导出：`difine(id?,dependencies?,factory)`
- 导入：`requires([dependencies],callback)`

#### CMD

1️⃣ 特点

- 依赖就近：用到某个模块时再去 `require`，延迟执行。
- 同步书写：写法像 CommonJS，但底层是异步加载。

2️⃣ 语法

- `define(function(require, exports, module) { ... })`
- AMD vs CMD：AMD 推崇依赖前置（提前执行），CMD 推崇依赖就近（延迟执行）。

#### UMD

1️⃣ 原理

> 一个能够在一个文件中同时支持 AMD/CommonJS/全局变量（Global）的模式。

2️⃣ 实现逻辑

- 判断是否支持AMD（`typeof define === 'function'`），是则用 `define`。
- 判断是否支持CommonJS（`typeof module === 'object'`），是则用
  `module.exports`
- AMD和CommonJS 都不支持，挂载到全局对象上（`window/global`）

#### ESM

1️⃣ 特点

- 静态分析：在编译时就确定模块依赖关系（`import` 必须在顶层）。
- 异步/同步：浏览器端异步加载，且支持 `import()` 动态导入。
- 引用传递：import 的变量是只读引用，模块内部值变化，外部引用的值也会跟着变（与 CommonJS 的值拷贝不同）。

2️⃣ 语法

- 导出：`export const x= 1`/`export default {}`
- 导入：`import {x} from '@/utils'`/`import x from '@/utils'`

#### 对比总结

| 分类     | 加载方式       | 运行/编译时 | 核心语法                               | 备注                                |
| :------- | :------------- | :---------- | :------------------------------------- | :---------------------------------- |
| CommonJS | 同步           | 运行时      | require/module.exports                 | Nodejs服务端，输出值的拷贝          |
| AMD      | 异步           | 运行时      | define/require                         | 浏览器，依赖前置、通过回调使用      |
| CMD      | 同步           | 运行时      | define/require                         | 浏览器，依赖就近，已过时            |
| UMD      | 异步           | 运行时      | define/require，require/module.exports | 通用库开发，兼容CommonJS/AMD/Global |
| ESM      | 编译时静态分析 | 编译时      | import/export                          | 现代前端/服务端，官方标准           |

### 防抖与节流

- 防抖（Debounce）：延迟执行，`仅最后一次操作停止后生效`（频繁操作，会重新计时，仅最后一次点击后，达到间隔时间才生效）
- 节流（Throttle）：`降低频率`（频繁操作，节流时间不变，满足设定的节流时间就执行）

### 延时函数

- `setTimeout`：是非阻塞的，设定定时器后，代码会继续往下执行，3 秒后才执行回调函数。
- `sleep 函数`：结合 `async/await` 使用时是阻塞的，`await` 会暂停当前异步函数的执行，等 `Promise` 完成后才继续执行后续代码。
- Example

  ```js
    // sleep 暂停阻塞执行函数
    async function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function getList(){
      // 阻塞的
      await sleep(200)
      const {data,code} = getGameList()

      // 非阻塞的
      setTimeout(()=>{
        const {data,code} = getGameList()
      },200)
    }
  ```

### 正确判断相等性

1️⃣ `==`、`===`、`Object.is()`

> 1.1 `==`：先类型转换，然后在比较 —— 宽松相等
>
> > 会按照`IEEE 754`标准对`NaN`、`-0`、`+0` 进行特殊处理(`NaN != NaN`，`-0 == +0`)

> 1.2 `===`：不进行类型转换，值和类型都相等 —— 严格相等
>
> > 会按照`IEEE 754`标准对`NaN`、`-0`、` +0` 进行特殊处理(`NaN != NaN`，`-0 === +0`)

> 1.3 `Object.is()`：既不进行类型转换，也不对 `NaN`、`-0`、`+0`进行特殊处理

2️⃣ JavaScript 提供三种不同的值比较运算
| x | y | == | === | Object.is |
|-------------------|-------------------|--------|--------|-----------|
| undefined | undefined | `true` | `true` | `true` |
| null | null | `true` | `true` | `true` |
| true | true | `true` | `true` | `true` |
| false | false | `true` | `true` | `true` |
| "str" | "str" | `true` | `true` | `true` |
| 0 | 0 | `true` | `true` | `true` |
| +0 | -0 | `true` | `true` | false |
| 0 | false | `true` | false | false |
| "" | false | `true` | false | false |
| "" | 0 | `true` | false | false |
| "0" | 0 | `true` | false | false |
| "10" | 10 | `true` | false | false |
| "[1,2]" | "1,2" | `true` | false | false |
| new String("str") | "str" | `true` | false | false |
| null | undefined | `true` | false | false |
| null | false | false | false | false |
| undefined | false | false | false | false |
| {foo:"bar} | {foo:"bar"} | false | false | false |
| new String("str") | new String("str") | false | false | false |
| 0 | null | false | false | false |
| 0 | NaN | false | false | false |
| "str" | NaN | false | false | false |
| NaN | NaN | false | false | `true` |

⚠️ 注意事项

- `Object.is(value1,value2)`，以下其中一项成立，则两个值相同，返回 `true`
  - 都是 `undefined`
  - 都是 `null`
  - 都是 `true`
  - 都是 `false`
  - 都是长度相同、字符相同、顺序相同的字符串
  - 都是相同的对象（意味着两个值都引用了内存中的同一对象）
  - 都是 `BigInt` 且具有相同的数值
  - 都是 `symbol` 且引用相同的 `symbol` 值
  - 都是数字且
    - 都是 `+0`
    - 都是 `-0`
    - 都是 `NaN`
    - 都有相同的值，非零且都不是 `NaN`

## vite

### vite < 8.0.0

- 开发环境：基于 `esbuild` 构建
- 生产环境：基于 `rollup` 构建

### vite >= 8.0.0

- 基于：`Rolldown` 构建

## Pinia

### 基础

- `defineStore()` 定义 `Store`
- `defineStore()` 的返回值的命名——名称
  > - 最好含有 `store` 的名字，且以 `use` 开头，以 `Store` 结尾。
  > - 如：`useUserStore`，`useCartStore`，`useProductStore`
- `defineStore(storeId,[Setup Store | Option Store])` 参数
  > - `storeId`：第一个参数是应用中 Store 的唯一 ID。
  > - `[Setup | Option`：第二个参数可接受两类值（Setup 函数或 Option 对象）。

### Setup Store

> 必须在 `setup store` 中返回 `state` 的所有属性

- `ref()` -> state 属性
- `computed()` -> getters
- `function()` -> actions

```ts [index.ts]
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const name = ref("Eduardo");
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, name, doubleCount, increment };
});
```

### Option Store

- `state` -> store 的数据 (data)
- `getters` -> store 的计算属性 (computed)
- `actions` -> store 的方法 (methods)

```ts [index.ts]
export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0, name: "Eduardo" }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

### 组件使用 Store

```ts [index.ts]
import { useCounterStore } from "@/stores/counter";
// 在组件内部的任何地方均可以访问变量 `store` ✨
const store = useCounterStore();
```

### 持久化

> 持久化插件：`pinia-plugin-persistedstate`

1️⃣ 自动恢复流程

- 初始化 Store 时：`pinia-plugin-persist` 会在 Pinia Store 初始化时，自动从配置的存储引擎（默认 localStorage）中读取数据，并将数据同步到 Store 的响应式变量中。
- 响应式变量更新：持久化的数据会直接赋值给 Store 中定义的 `ref` 或 `reactive` 变量，保持响应性。

2️⃣ 总结

- 无需手动操作：插件会自动处理持久化数据的 `读取` 和 `赋值`。
- 直接使用 Store 状态：在组件中直接访问 `Store` 的响应式变量即可获取持久化后的值。

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

## 辅助开发资源

### 开发资源

- [Pixelrepo.com](https://pixelrepo.com/browse)：像素仓库
- [Cssbuttons.io](https://cssbuttons.io/)：button
- [UIVerse](https://uiverse.io/)：最大的开源用户界面库

### DOM/HTML标准

- [DOM标准](https://htmlspecs.com/dom/)
- [HTML标准](https://htmlspecs.com/)

### github 官方API

- [github-api](https://api.github.com/)

### pnpm/npm/yarn

- 快速查看依赖文：`pnpm home <package-name>`

## 进阶——源码学习

- [Marvin](https://canyuegongzi.github.io/)
- [vue-toastification](https://github.com/Maronato/vue-toastification#readme)
