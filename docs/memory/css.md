# CSS（页面样式）

> 网页的“化妆师/邪术”，专治“丑”，一行代码就能让页面从素颜秒变女神，时尚潮流全靠它。

## 指南

- [Ctrip webkit CSS library](http://ic4.github.io/webkitcss/)
- [CSS Reference](https://tympanus.net/codrops/css_reference/)
  > 这是一个详尽的 CSS 参考书，包含所有重要的属性和信息，帮助你从基础学习 CSS

## 外边距折叠

🈯️ 定义

> 在标准文档流中，两个或多个垂直相邻的块级元素之间，其相邻的外边距（margin）有时会合并成一个单一的外边距，这种现象被称为`"外边距折叠"`。

✅ 数学计算规则

- 若两个外边距都是正数，最终间距取最大值。
- 若一正一负，最终间距取正数减去负数的绝对值（即两者之和）。
- 若都是负数，最终间距取绝对值最大的负数（即最负的值）。

1️⃣ 详解

> 两个垂直相邻的块级元素，如果上方的元素设置了 `margin-bottom: 10px`，下方的元素设置了 `margin-top: 10px`，则他们的外边距是`20px`吗？
>
> - 答案：不是`20px`，在普通的文档流中这两个`margin`不会相加变成`20px`，而是会`取两者中的最大值`。

2️⃣ 计算逻辑，具体计算逻辑如下

- 上方元素的下外边距：`10px`
- 下方元素的上外边距：`10px`
- 比较：两者数值相同，最大值即为`10px`。
- 结果：最终的间距为 `10px`。

3️⃣ 例外情况

> 只有当你触发某些`BFC（块级格式化上下文）`机制时，margin才不会折叠。
>
> - 例如，如果给两个元素外面包了一层父容器，并设置父容器为 `display: flex` 或 `overflow: hidden`，那么这两个子元素的`margin`就`不会折叠`。

4️⃣ Example

```vue
<template>
  <p class="my-5">文本</p>
  <main class="mt-5">文本</main>
</template>
```

## margin 塌陷

🈯️ 定义

> `margin塌陷`（又称`父级塌陷`）是CSS`外边距折叠中`的一种特殊情况。它特指`父子元素之间的外边距合并`问题。

1️⃣ 现象描述

> 在标准的文档流中，如果父元素没有设置上内边距（`padding-top`）或上边框（`border-top`），那么给第一个子元素设置的上外边距（`margin-top`）不会把子元素推离父元素，而是会把整个父元素一起推下去。

2️⃣ Example

```vue
<template>
  <div class="parent">
    <div class="child">子元素</div>
  </div>
</template>
<style>
.parent {
  width: 300px;
  height: 300px;
  background-color: lightblue;
  /* 注意：这里没有设置 border 或 padding */
}

.child {
  margin-top: 50px; /* 我们希望子元素距离父元素顶部50px */
  background-color: pink;
}
</style>
```

> 效果
>
> - 你期望的结果：子元素距离父元素顶部50px，父元素还在原地。
> - 实际发生的结果：父元素带着子元素一起整体向下移动了50px。

3️⃣ 解决方案

> 要解决margin塌陷，核心原则是`把父元素和子元素的上边缘隔开`
>
> - 给父元素设置边框（border）
> - 给父元素设置内边距（padding）
> - 给父元素设置溢出隐藏（overflow: hidden/auto）
> - 使用浮动或绝对定位

## 实现元素隐藏

### display: none

> 最彻底的隐藏，元素仿佛不存在。

- `效果`：元素从 DOM 树中保留，但从渲染树（Render Tree）中移除。
- `特点`
  - `不占空间`：原本的位置会被周围元素挤占。
  - `不可交互`：无法点击、无法触发事件。
  - `重排重绘 (Reflow)`：切换时会触发页面的重排，性能开销较大。
  - `子元素`：所有子元素也会被隐藏，无法单独显示。
  - `无障碍性`：屏幕阅读器会忽略该内容。
- `适用场景`：彻底不需要显示、不需要交互的元素（如移动端侧边栏未打开时的状态）。

### visibility: hidden

> 看不见，但还在那里。

- `效果`：元素在渲染树中，但不可见。
- `特点`
  - `占据空间`：元素虽然不可见，但依然占据原来的宽高位置，像一个透明的盒子。
  - `不可交互`：无法点击、不阻挡下方元素点击（鼠标穿透）。
  - `重绘 (Repaint)`：切换时只触发重绘，不触发重排，性能优于 `display: none`。
  - `子元素`：子元素可以通过设置 `visibility: visible` 重新显示出来（这是与 `display: none `最大的区别）。
  - `无障碍性`：屏幕阅读器通常会忽略该内容。
- `适用场景`：需要保持布局占位，避免页面抖动的情况。

### opacity: 0

> 透明度为 0，完全透明。

- `效果`：元素完全透明，但依然存在。
- `特点`
  - `占据空间`：保留原有位置。
  - `可交互`：依然可以点击、触发 hover 等事件（除非配合 `pointer-events: none`）。
  - `硬件加速`：可以通过 `transform`/`opacity` 动画触发 GPU 加速，性能较好。
  - `无障碍性`：屏幕阅读器可以读取该内容。
- `适用场景`：需要淡入淡出动画效果时（如 `transition: opacity 0.3s`）。

### 移出可视区域

> `position: absolute/fixed` 并移出可视区域,如 `left: -9999px` 或 `top: -9999px`。

- `效果`：元素被移到了屏幕外面。
- `特点`
  - `不占空间`（在当前可视区域内）。
  - `可交互`：虽然看不见，但理论上可以操作（通常配合 JS 使用）。
  - `无障碍性`：屏幕阅读器可以读取该内容（这对 SEO 和无障碍访问非常重要）。
- `适用场景`：SEO 优化文本、屏幕阅读器专用文本（SR-only）。

### 高度为 0 并裁剪溢出

> `height: 0; overflow: hidden`,高度为 0 并裁剪溢出。

- `效果`：像卷帘门一样收起。
- `特点`
  - `不占空间`（垂直方向）。
  - `不可交互`。
  - `可做动画`：极其适合做手风琴（Accordion）折叠效果。
- `适用场景`：折叠面板、下拉菜单的展开收起。

### 缩放为 0

> `transform: scale(0)` 缩放为 0。

- `效果`：元素缩小到一个点。
- `特点`
  - `占据空间`：原始占位其实还在（取决于布局流），但视觉上消失。
  - `不可交互`。
  - `高性能`：不触发重排，动画性能极佳。
- `适用场景`：如弹窗出现的放大缩小动画

## HTML hidden 属性

> 原生的 HTML 属性 `<div hidden></div>`。

- `效果`：浏览器默认样式通常是 `display: none`。
- `特点`：语义化更好，但 CSS 中的 `display` 样式优先级高于它，容易被覆盖。
- `适用场景`：语义化标记不需要显示的元素。

## 常用方案的对比

| 需求场景                     | 推荐方案             | 常用组合技                                        |
| ---------------------------- | -------------------- | ------------------------------------------------- |
| 彻底消失，不占空间，不可交互 | `display: none`      |                                                   |
| 仅视觉隐藏，保留占位         | `visibility: hidden` |                                                   |
| 透明度                       | `opacity: 0`         | 配合 `pointer-events: none` 防止误触              |
| 为了 SEO 或盲人阅读          | `移出可视区`         | `.sr-only { position: absolute; left: -9999px; }` |
| 折叠/展开动画                | `height: 0`          | 配合 `overflow: hidden; transition: height 0.3s`  |

## 伪类与伪元素

- [菜鸟教程 runoob.com](https://www.runoob.com/css/css-pseudo-classes.html): CSS 伪类(Pseudo-classes)
- [MDN 伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Pseudo-classes): 伪类
- [MDN 伪元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/Pseudo-elements): 伪元素

## 核心对比

| 特性     | 伪类 (`:`)                                                   | 伪元素 (`::`)                                             |
| -------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| 定义     | 用于描述元素的特殊状态（如鼠标悬停、某个子元素等）           | 用于创建或选择元素的特定部分（如内容之前、首字母等）      |
| 符号     | 单冒号 `:`(例如: `:hover`)                                   | 双冒号 `::`(例如: `::before/::after`)                     |
| 数量限制 | 一个选择器中可以同时使用多个伪类                             | 一个选择器中只能出现一个伪元素                            |
| 本质作用 | 弥补了 CSS 选择器的不足,像是给元素添加了一个虚拟的类 (class) | 创造了新的文档树内容,像是给元素添加了一个虚拟的 HTML 标签 |

## 伪类(\:)

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

## 伪元素(\:\:)

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

## 注意事项

- 一些早期的`伪元素(::)`曾使用单冒号的语法，所以你可能会在代码或者示例中看到。现代的浏览器为了保持后向兼容，支持早期的带有单双冒号语法的伪元素。

## 实现渐变边框

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

## filter

> [filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/filter) 属性将模糊或颜色偏移等图形效果应用于元素。滤镜通常用于调整图像、背景和边框的渲染。

::: tip TIP
当单个 `filter` 属性具有多个函数时，滤镜将按顺序依次应用。
:::

## blur()

> 将高斯模糊应用于输入图像。

## brightness()

> 调整输入图像的对比度
>
> - `0%`， 将使图像变灰；
> - `100%`，则无影响；
> - `>100%`，将增强对比度；

## contrast()

> 调整输入图像的对比度
>
> - `0%`，将使图像变灰；
> - `100%`，则无影响；
> - `超过 100%`，将增强对比度。

## drop-shadow()

> 使用 `<shadow>` 参数沿图像的轮廓生成阴影效果。阴影语法类似于`<box-shadow>`

## grayscale()

> 将图像转换为灰度图
>
> - `100%`， 则完全转为灰度图像；
> - `0%`， 则图像无变化;
> - `100% > n% > 0%`，则是该效果的线性乘数。

## hue-rotate()

> 应用色相旋转。`<angle>` 值设定图像会被调整的色环角度值。值为 `0deg`，则图像无变化。

## invert()

> 反转输入图像。
>
> - `100%`，则图像完全反转，
> - `0%`，则图像无变化。
> - 0`% 和 100% 之间`，则是该效果的线性乘数。

## opacity()

> 应用透明度。
>
> - `0%`, 则使图像完全透明
> - `100%`, 则图像无变化。

## saturate()

> 改变图像饱和度。
>
> - `0%`，则是完全不饱和，
> - `100%`，则图像无变化。
> - `超过 100%`，则增加饱和度。

## sepia()

> 将图像转换为深褐色。
>
> - `100%`，则完全是深褐色的。
> - `0%`，图像无变化。

## 组合函数

> 你可以`组合任意`数量的`函数`来控制渲染。滤镜将按`声明顺序依次`应用。

## 图形/图像入门到放弃

### 网页上的图形
- `<img>` — 元素显示`静态图像`。
- `background-image` — 属性来设置 HTML 元素的`背景`。
- `更高级图像`
  - `Canvas` — 元素提供了使用 Js 绘制 `2D` 图形的 API。
  - `SVG` — 借助SVG来使用线条、曲线和其他几何形状来渲染 `2D` 图形。
  - `WebGL` — 用于 Web 的 `3D` 图形 API，可让你在 Web 内容中使用标准的 OpenGL ES。

### `img`图像嵌入元素

> `<img>` HTML 元素将一张图像嵌入文档。

#### img标签相关属性

::: info 属性

- `src` — 资源地址
- `width` — 图像宽度
- `height` — 图像高度
- `alt` — 在没有图片时使用的替换文本
- `srcset` — 用于不同场景的图像，例如高分辨率显示器、小型显示器等。
- `sizes` — 不同页面布局的图像尺寸
- `crossorigin` — 元素如何处理交叉起源请求
- `usemap` — 用于图像映射的名称
- `ismap` — 图像是否为服务器端图像映射
- `loading` — 用于确定加载延迟
- `draggable`:
  > 全局属性，用于标识元素是否允许使用浏览器原生行为或 HTML `拖放`操作 API 拖动。
  >
  > - 若该属性没有设值，则默认值 为 `auto`，表示使用浏览器定义的默认行为。
  > - `true`：表示元素可以被拖动
  > - `false`：表示元素不可以被拖动

:::

#### 图像类型与格式

> [图像文件类型与格式指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Image_types)

1️⃣ 常见图像文件类型

| 缩写   | 文件格式             | MIME 类型       | 文件扩展名                             |
| ------ | -------------------- | --------------- | -------------------------------------- |
| `WebP` | Web 图像格式         | `image/webp`    | `.webp`                                |
| `SVG`  | 可缩放矢量图形       | `image/svg+xml` | `.svg`                                 |
| `PNG`  | 便携式网络图形       | `image/png`     | `.png`                                 |
| `JPEG` | 联合图像专家小组图像 | `image/jpeg`    | `.jpg`/`.jpeg`/`.jfif`/`.pjpeg`/`.pjp` |
| `APNG` | 动态可移植网络图形   | `image/apng`    | `.apng `                               |
| `AVIF` | AV1 图像档案格式     | `image/avif`    | `.avif`                                |
| `GIF`  | 图像互换格式         | `image/gif`     | `.gif`                                 |

2️⃣ 选择合适的图像格式

- `照片`: WebP 是首选，JPEG 是次选（JPEG 的`兼容性`更好，但 WebP 的`压缩效果`可能更好）

| 最佳选择        | 回退方案 |
| --------------- | -------- |
| `WebP` / `JPEG` | `JPEG`   |

- `图标`: 对于图标等较小的图像，应使用`无损格式`，以避免在大小受限的图像中丢失细节。

| 最佳选择                  | 回退方案 |
| ------------------------- | -------- |
| `SVG`/ `无损 WebP`/ `PNG` | `PNG`    |

- `截图`: PNG 可能是最好的选择，但无损 WebP 的压缩效果可能更好。

| 最佳选择                                                  | 回退方案                                      |
| --------------------------------------------------------- | --------------------------------------------- |
| 无损 WebP 或 PNG；<br/>若不担心压缩伪影，则使用 JPEG 文件 | PNG 或 JPEG；<br>GIF 用于颜色数较少的屏幕截图 |

- `示意图、绘图和图表`: 对于任何可以使用矢量图形表示的图像，SVG 都是最佳选择。否则，应使用 PNG 等无损格式。

| 最佳选择 | 回退方案 |
| -------- | -------- |
| `SVG`    | `PNG`    |

- `提供回退图像`: 虽然标准 HTML `<img>` 元素不支持图片的兼容性回退，但 `<picture>` 元素支持。

#### 相关的 CSS 属性
- `object-fit` — 指定`内容`应该`如何适应`宽和高固定的`容器`。
```css
/* 图片将被缩放，保持图片的宽高比，宽高比与容器的宽高比不匹配，该图片将被添加“黑边” */ 
object-fit: contain; 
/* 图片保持其宽高比并填充整个容器，图片的宽高比与容器不匹配，该图片将被剪裁以适应容器 */
object-fit: cover;
/* 图片正好填充整个容器，图片的宽高比与容器不匹配，该图片将被拉伸以适应整个容器 */
object-fit: fill;
/* 图片将保持其原有的尺寸 */
object-fit: none;
/* 图片的尺寸与 none/contain 中的一个相同，取决于两个之间谁得到的图像尺寸会更小一些 */
object-fit: scale-down;
```
- `object-position` — 规定了图片在其容器中的位置。

```css
/* <position> 关键字值 */
object-position: top;
object-position: bottom;
object-position: left;
object-position: right;
object-position: center;

/* <percentage> 值 */
object-position: 25% 75%;

/* <length> 值 */
object-position: 0 0;
object-position: 1cm 2cm;
object-position: 10ch 8em;

/* 边缘偏移值 */
object-position: bottom 10px right 20px;
object-position: right 3em bottom 10px;
object-position: top 0 right 10px;

/* 全局关键字 */
object-position: inherit;
object-position: initial;
object-position: revert;
object-position: revert-layer;
object-position: unset;
```

- `image-orientation` — 用来修正某些图片的预设方向。
```css
/* 根据图片的 EXIF 数据来旋转图片，EXIF 中有一个控制图片旋转度的属性。 */
image-orientation: from-image;
/* 图片旋转值 <angle> , 会被自动四舍五入到 90deg (0.25turn) 的整数倍。 */
image-orientation: <angle>;
/* 对图片进行水平翻转，先进行第二个参数执行的旋转，再进行此次翻转。 */
image-orientation: flip;
```

- `image-rendering` — 用于设置图像缩放算法。此属性对于未缩放的图像没有影响。

```css
/* 当页面作者(程序员)指定的尺寸不是图像的原始尺寸（UI 设计尺寸）时，用户代理将缩放图像 */
/* 专有属性值 */
image-rendering: auto;
image-rendering: crisp-edges;
image-rendering: pixelated;

/* 全局属性值 */
image-rendering: inherit;
image-rendering: initial;
image-rendering: unset;
```

- `image-resolution` — 图像分辨率（实验性技术），指定了容器内的图像的内在分辨率。

### background-image

> CSS [background-image](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/background) 属性用于为一个元素设置一个或者多个背景图像。
