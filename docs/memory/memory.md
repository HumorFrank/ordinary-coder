# 对抗遗忘曲线
> 试图记录今天学废、明天就会忘掉的前端知识。

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
- `x-ua-compatible`：	X-UA-Compatible  X-UA 兼容
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
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

## Vue
### diff算法
> `Diff算法`的核心：针对具有`相同父节点`的`同层新旧子节点`进行比较，而不是使用逐层搜索递归遍历的方式。

⚠️ 注意事项
  - 时间复杂度为`O(n)`。

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
  - 禁用`Attributes`透传
  - 明确给节点绑定 `Attributes`（v-bind="$attrs"）
> ⚠️ 和`单根节`点组件有所不同，有着`多个根节点`的组件没有自动 attribute 透传行为。若 `$attrs` 没有被`显式绑定`，将会`抛出`一个`运行时警告`。
### 组件基础
#### 组件命名和模板使用
- 🅰 `kebab-case`：短横线分隔命名，模板使用只能 `kebab-case`方式，可自闭合
- 🅱 `PascalCase`：帕斯卡/大驼峰命名，模板使用可选`kebab-case`/`PascalCase`方式，可自闭合

> 学习目标？
> - 在哪命名？答：在 `components:{name: 导入符号}`/`defineOptions({name:组件名称})` 选项中。
> - 如何命名？答：`kebab-case`/`PascalCase`方式命名。
> - 如何使用？答：`kebab-case`/`PascalCase`方式以及可选自闭。
> - 组件中name用途? 答：组件递归、调试、搭配`keep-alive` 使用.
> - 注意事项？答：无论选用那种命名方式/模板使用方式，都应该保持统一。
#### 插槽
- 默认插槽：`<slot></slot>`
- 具名插槽：`<slot name="header"></slot>`
- 条件插槽：有时需根据内容是否被传入了插槽来渲染某些内容，可结合`$slots`属性与`v-if`来实现。
  - `<div v-if="$slots.header"><slot name="header" /></div>`
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
1️⃣ 差异
  - watch
    - 只追踪明确侦听的数据源，不会追踪任何在回调中访问到的东西。
    - `默认是懒执行的，即回调不会立即执行`，仅当数据源变化时，才会执行回调。
    - `回调函数携带2个参数`，以便获取`新数据`和`旧数据`。
    - `deep` 选项，强制转成深层侦听器。
    - `immediate: true` 选项，强制侦听器的回调立即执行。
  - watchEffect
    - 不需要明确侦听数据源。
    - `回调会立即执行`，不需要指定 `immediate: true`。
    - `自动追踪依赖(和计算属性类似)`，自动追踪任何在回调中访问到的`响应式依赖`，不追踪普通变量。
    - `同步执行期间追踪`，它只追踪在回调函数同步执行期间被读取的依赖。
    - `比深度侦听器更有效`，因为它将只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性。
    - `回调函数无参`
    - ⚠️
      - 仅会在其同步执行期间，才追踪依赖。
      - 异步回调时，只有在第一个 `await` 正常工作前访问到的属性才会被追踪。
㊙️ 调试
```ts [index.ts]
watch(source,callback,{
  onTrack(e){
    console.log('onTrack',e)
  },
  onTrigger(e){
    console.log('onTrigger',e)
  }
})

watchEffect(callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})
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
  - ⚠️ 凡是遇到`"子组件需要突破父组件 CSS 视觉限制"`的情况，`<Teleport>` 就是最佳的标准解决方案。
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
  disabled: Boolean
})
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
```ts [index.ts] [type.ts]
// 只读
function computed<T>(
  getter: (oldValue: T | undefined) => T,
  // 查看下方的 "计算属性调试" 链接
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// 可读可写
function computed<T>(
  options: {
    get: (oldValue: T | undefined) => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>
```

```ts [index.ts] [readonly.ts]
const count = ref(0)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2
plusOne.value++ // ❌ 错误
```

```ts [index.ts] [readAndWrite.ts]
const count = ref(0)
const plusCount = computed({
  get: () => count.value,
  set: (newVal) => {
    count.value = newVal
  },
})
/**
 *  + 1
 */
function btnPlusCount() {
  plusCount.value++
}
/**
 * - 1
 */
function btnReduceCount() {
  plusCount.value--
}
```

```ts [index.ts] [readAndWrite2.ts]
const count = ref(1)
const plusCount = computed({
  get: () => count.value + 1,
  set: (newVal) => {
    count.value = newVal - 1
  },
})
// 访问 plusCount.value，触发其 get 方法，从而获取最新的 count + 1
console.error(count.value, plusCount.value) // 1 2

plusCount.value = 1 // plusCount 赋值，会触发其 set 方法，从而修改 count

// 访问 plusCount.value，触发其 get 方法，从而获取最新的 count + 1
console.error(count.value, plusCount.value) // 0 1
```

```ts [index.ts] [debugger.ts]
import type { DebuggerEvent } from 'vue'
const count = ref(0)
const plusOne = computed(() => count.value + 1, {
  // 当 count.value 被追踪为依赖时触发(访问plusOne)
  onTrack(e: DebuggerEvent) {
    // eslint-disable-next-line no-console
    console.log('plusOne is tracked', e)
  },
  // 当 count.value 被更改时触发(依赖更新/变化)
  onTrigger(e: DebuggerEvent) {
    // eslint-disable-next-line no-console
    console.log('plusOne is triggered', e)
  },
})

// 访问 plusOne，会触发 onTrack
console.log(plusOne.value)

// 更改 count.value，应该会触发 onTrigger
count.value++
```

:::

⚠️ 注意事项
> 计算属性的 `onTrack` 和 `onTrigger` 选项`仅`会在`开发模式`下工作。


## TypeScript

### 常见类型
1️⃣ 种类
- 基本类型：string ｜ number ｜ boolean
- Arrays
- Functions
- Object
- 联合类型(`|`)
- 交叉类型(`&`)
- 字面量类型
- Enums 枚举
- 特殊类型
  - null
  - undefined
  - any
  - unknown
  - never

2️⃣ Example

```ts [index.ts]
// 字面量类型
type Params = "left" | "right" | "center"
// Enums 枚举
enum DirectionNumber {
  Up,
  Down,
  Left,
  Right,
}
enum UserResponse {
  No = 0,
  Yes = 1,
}
enum DirectionString {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

### 特殊类型
- `any`：会绕过所有类型检查(即不会进行类型检查)。
- `unknown`：必须通过`类型断言/收窄`后才能使用，只能赋值给 `any` 和 `unknown`类型本身。
- `never`：表示 `永远不会发生` 的类型
- `undefined`：未初始化/表示未定义
- `null`：显式为空

### 联合类型 & 交叉类型
- 联合类型：`|`
- 交叉类型：`&`

### 非空断言与断言
1️⃣ 介绍
- 非空断言：`!`，非空断言运算符是一个后缀运算符
  - ⚠️ 只有在`确定`值不能为 `null` 或 `undefined` 时才使用
- 类型断言：`as`

2️⃣ Example

```ts [index.ts] [as.ts]
// 类型断言 // 
const x = "hello" as number;

// 非空断言 //
let input: string | null = document.getElementById('input')?.value;
// 非空断言：明确告诉编译器input不为null
let inputValue: string = input!; 
```

3️⃣ 特性对比表
- `非空断言（!）`
  - 目的：强制跳过空检查
  - 安全性：低（依赖开发者判断）
  - 适用场景：确定非空时
- `可选链（?.）`
  - 目的：安全访问属性
  - 安全性：高（自动短路）
  - 适用场景：可能为空的深层访问
- `空值合并（??）`
  - 目的：提供默认值
  - 安全性：高（处理null/undefined）
  - 适用场景：需要默认值时


### readonly vs const

> 选择 `readonly`/ `const`（判断条件：将它做为`变量`使用还是`属性`使用？） 

- 将其作为变量使用：选 `const`
- 将其作为属性使：选 `readonly`

### type & interface

1️⃣ 基础
- `type`：类型别名
- `interface`：接口

2️⃣ 区别
- 类型定义
  - type：可用于`基本/联合/元组/对象类型`等的类型定义。
  - interface：主要用于`对象类型`的类型定义。
- 继承/扩展
  - type：能使用`交叉类型（&）`实现类似扩展，但不能使用 `extends` 继承；
  - interface：能使用 `extends` 继承一个或多个接口。
- 重复定义
  - type：不能重复定义，重复定义会引发编译错误。
  - interface：可以重复定义，并且会自动合并（若类型相同）。
- 定义联合类型
  - type：能直接声明联合类型
  - interface：本身不能，但可通过类型别名实现接口的联合。
- 声明合并
  - type：不能参与`声明合并`
  - interface：可以进行`声明合并`

⚠️ 注意事项
- interface 接口合并
  - 接口的`非函数的成员应该是唯一`的。若它们不是唯一的，那么它们`必须是相同的类型`。
  - 若两个接口中`同时声明`了`同名的非函数成员`且它们的`类型不同`，则`编译器会报错`。
  - 每个同名函数声明都会被当成这个函数的一个重载。
  - 当接口A与后来的接口A合并时，后面的接口具有更高的优先级。
  - 接口合并后的顺序，接口重载出现在靠前位置（类似于->弹夹压子弹->先压的最底层，后压的在最上层）。

### 类型运算符(typeof&keyof)
```ts [index.ts] [typeof&keyof.ts]
/** typof：从值获取类型 */
const person = { name: 'Alice', age: 30 };
type PersonType = typeof person;
// PersonType = { name: string; age: number }

/**  keyof 示例：从类型获取键 */
interface User {
  id: number;
  name: string;
  email: string;
}
type UserKeys = keyof User;
// UserKeys = "id" | "name" | "email"

// 类型安全的属性访问
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: 'Alice', email: 'alice@example.com' };
getProperty(user, 'name'); // ✅ 正确
getProperty(user, 'age');  // ❌ 错误：'age' 不在 keyof User 中

/*** typeof 和 keyof 结合使用 ***/
// 1. 定义一个常量对象（作为事实来源）
const ThemeColors = {
  primary: '#1890ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#f5222d',
} as const; // 加上 as const 可以让属性变成只读字面量类型，推导更精确

// 2. 结合使用 typeof 和 keyof
// typeof ThemeColors -> 获取对象的类型结构 { readonly primary: "#1890ff"; ... }
// keyof ...         -> 获取该类型所有键的联合 "primary" | "success" | "warning" | "error"
type ThemeType = keyof typeof ThemeColors;

// 3. 使用类型
function getThemeColor(type: ThemeType) {
  return ThemeColors[type];
}

// ✅ 正确
getThemeColor('primary');

// ❌ 报错：Argument of type '"secondary"' is not assignable to parameter of type '"primary" | "success" | "warning" | "error"'.
getThemeColor('secondary');

/** 枚举反向映射 (Enum替代方案) */
const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
} as const;

// 获取 "GET" | "POST" | "PUT" | "DELETE"
type HttpMethod = keyof typeof HttpMethods;

function request(url: string, method: HttpMethod) {
  // ...
}
```

### 常用实用工具类型整理
> TypeScript 文档->工具类型。
- `Omit<Type, Keys>`：从类型`Type`中排除属于`Keys`属性名的类型，组成新类型。
- `Pick<Type, Keys>`：从指定类型`Type`中，挑选出属于`Keys`属性名的类型，组成新类型。
- `Partial<Type>`：将`Type`的所有属性设置为可选类型（`?`）。
- `Required<Type>`：将`Type`的所有属性设置为必选。
- `Readonly<Type>`：将`Type`中的所有属性设置为只读。
- `Record<Keys, Type>`：快速创建一个属性名为`Keys`、属性值为`Type`类型的对象类型。
- `NonNullable<Type>`：从`Type`中排除`null`和`undefined`来构造一个类型。
- `Parameters<Type>`：从函数类型`Type`的参数中使用的类型构造元组类型。
- `ReturnType<Type>`：构造一个由函数`Type`的返回类型`组成的类型。
- `Extract<T, K>`：从联合类型`T`中，提取出可以赋值给`U`的类型，来构造一个类型。
- `Exclude<T, U>`：从联合类型`T`中，排除可以赋值给`U`的类型，保留剩余类型。
- `InstanceType<Type>`: 构造一个由`Type`中的构造函数的`实例类型`组成的类型。

### 高频实用符号

- `?`：可选属性或者参数或者条件类型，用于标记 `属性或参数是可选的`（可能不存在）
  - 条件类型：（条件 ? true-表达式 : false-表达式）
    - `SomeType extends OtherType ? TrueType : FalseType;`（`T extends U ? X : Y`）
    - 当 `extends` 左边的类型可以赋值给右边的类型时，你将获得` TrueType` 类型；
    - 否则你将获得` FalseType` 类型。
  - 可选参数：`testFunction(name:string,account?:number)`
  - 属性：`const props = defineProps<{title?:string; icon?: string;}>()`
- `!.`：非空断言运算符，明确知晓 变量不会是 `null` 或者 `undefined`（info!.name：明确知晓info不为 `null`或者`undefined`）。
- `|`：联合类型，表示一个值可以是 `多种类型之一`（`A | B `表示 `A` 或 `B`）。
- `&`：交叉类型，表示一个值必须 `同时满足多个类型`（`A & B` 表示 `A` 和 `B` 的组合）。
- `!`：告诉 TS 某个变量一定不是 `null` 或 `undefined`（即使 TS 认为它可能是），`慎用，可能导致运行时错误！`。
- `??`：空值合并运算符，如果左侧是 `null` 或 `undefined`，则返回右侧的默认值，否则返回左侧的值。
- `&&`: 逻辑与运算符，当左侧为 `false` 时，直接返回左侧的值，否则返回右侧的值。
- `||`：逻辑或运算符，当左侧为 `true` 时，直接返回左侧的值，否则返回右侧的值。
- `...`：展开运算符，在 TS 中，还能用于 `合并类型`(对象类型不能直接使用展开运算符 `...` 来合并，你需要使用交叉类型 `&`来合并多个对象类型)。
- `as`：类型断言，`强制告诉 TS 某个值的类型`（类似于强制类型转换）。
- `keyof`：索引类型查询，获取 `某个类型的所有键（属性名）的联合类型`。(keyof T)
- `typeof`：类型查询，获取 `某个值的类型`（返回的是 `TS` 类型）。(typeof obj)
- `in`：映射类型的键遍历，在 `映射类型（Mapped Types）` 中 `遍历键`。([K in Keys]: T)

### 条件类型（?）

#### 基本语法与概念
1️⃣ 条件类型的基本形式如下
```ts [index.ts] [index.ts]
T extends U ? X : Y
```
> 含义：若类型`T`能够赋值给类型`U`（即`T`是`U`的`子类型`），则结果类型是`X`，否则为`Y`。

#### 基础判断
```ts [index.ts] [index.ts]
// 若 T 类型是 string 类型的子类型 ? true : false
// 若 T 类型能够赋值给 string 类型 ? true : false
type IsString<T> = T extends string ? true : false

type A = IsString<string> // true
type B = IsString<number> // false
type C = IsString<'hello'> // true（'hello' 是 string 的子类型）
```


#### 基于类型选择结果
> 假设我们需要一个函数，根据输入是 `string` 还是 `number` 来决定返回值的标签类型

```ts [index.ts] [index.ts]
interface IdLabel { id: number }
interface NameLabel { name: string}
// 定义条件类型
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;
// 通过函数使用条件类型判断返回的标签类型
function labelType<T extends number | string>(IdOrName:T):NameOrId<T> {
  // 这里通常需要类型断言，因为 TS 在函数内部很难推断具体的运行时逻辑
  throw 'unimplemented';
}
let a = labelType('typescript'); // 类型：NameLabel
let b = labelType(108.8); // 类型：IdLabel
```

#### 分布式条件类型
> 规则：当待检查的类型（泛型参数）是`联合类型`时，条件类型会进行`分发`计算。

🛠 若`T`是`A|B`，那么 `T extends U ? X : Y` 会变成：`(A extends U ? X : Y) | (B extends U ? X : Y)`

1️⃣ 实现 Exclude (排除)，TS 内置的 `Exclude<T, U>` 就是利用了这个特性

```ts [index.ts] [index.ts]
// 定义：从 T 中排除可以赋值给 U 的类型
type MyExclude<T, U> = T extends U ? never : T;

// 过程解析：MyExclude<'a' | 'b' | 'c', 'a'>
// 1. 分发：
//    ('a' extends 'a' ? never : 'a') |
//    ('b' extends 'a' ? never : 'b') |
//    ('c' extends 'a' ? never : 'c')
// 2. 计算结果为：never | 'b' | 'c'
// 3. 结果 (never 在联合类型中会被忽略)：则结果为 'b' | 'c'

type Result = MyExclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
```
> 技巧：如何阻止分发？如果你不希望发生这种分发行为（即希望把联合类型看作一个整体），可以将类型包裹在元组 [] 中：

```ts [index.ts] [index.ts]
type NoDistribute<T> = [T] extends [string] ? "yes" : "no";

type A = NoDistribute<string | number>; 
// 结果: "no"
// 解释: [string | number] 作为一个整体，并不能赋值给 [string]
```

#### infer 关键字与类型推断
1️⃣ 定义
> `infer`是条件类型的`“杀手锏”`。它允许你在 `extends` 条件语句的`真分支`中声明一个变量，用来`捕获`（推断）类型的一部分

2️⃣ 语法

```ts [index.ts] [语法.ts]
T extends SomeType<infer R> ? R : Y
```

3️⃣ 获取数组元素的类型
> 我们需要一个类型，若是数组，就取出里面的元素类型；若不是数组，就返回它自己。
```ts [index.ts] [index.ts]
type Flatten<T> = T extends Array<infer Item> ? Item : T;

type StrArray = Flatten<string[]>; // string
type NumArray = Flatten<number>; // number
// 解析：“若 T 是某种数组，就把那个数组里面的元素类型命名为 Item，然后在结果里直接使用 Item”。
```

4️⃣ 实现 ReturnType (获取函数返回值)

```ts [index.ts] [ReturnType.ts]
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Func = () => { name: string; age: number };
type Result = MyReturnType<Func>; // { name: string; age: number }
```

#### 递归与实战组合

1️⃣ DeepReadonly (深度只读),将对象的所有属性（包括嵌套对象的属性）都变为 readonly。
```ts [index.ts] [DeepReadonly.ts]
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object 
    ? (T[K] extends Function ? T[K] : DeepReadonly<T[K]>) // 如果是对象但不是函数，递归调用
    : T[K];
};

interface Profile {
  name: string;
  settings: {
    theme: string;
  }
}

type ReadonlyProfile = DeepReadonly<Profile>;
// ReadonlyProfile.settings.theme 也是只读的
```

2️⃣ 取 Promise 内部类型 ( Awaited 原理),若一个类型被多层 Promise 包裹，我们想拿到最终的值
```ts [index.ts] [index.ts]
type MyAwaited<T> = T extends PromiseLike<infer U> 
  ? MyAwaited<U> // 递归：如果还是 Promise，继续解包
  : T;           // 终止：不是 Promise，返回类型

type Res = MyAwaited<Promise<Promise<number>>>; // number
```

#### 总结

- `?`：`基本判断`，`IsString<T> = T extends string ? true : false`
- `Union`：`分布式`，`string | number`，传入条件类型会分别计算
- `[T]`：`阻止分发`，`[T] extends [U]`，视作整体比较
- `infer R`：`类型推断`，`Array<infer U>`，提取数组元素类型
- `extends never`：`过滤`，返回 `never`，表示在联合类型中删除该项

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

## JavaScript

### JS学习技巧
> Debugger/断点调试 + 在线js编辑器（https://playcode.io/javascript-compiler）


### 模块化规范

#### 分类
- `CJS(CommonJS)`：Node.js采用的规范，主要用于`服务端`。
- `AMD`：专门为`浏览器端`设计的`异步加载规范`，代表库是`RequireJS`。
- `CMD`：为浏览器端设计，代表库是 `Sea.js`（阿里玉伯提出），主要在国内流行。
- `UMD`：通用模块定义，为了解决跨平台（浏览器和 Node.js）兼容问题。
- `ESM`(ES Modules)：ES2015 (ES6) 推出的官方标准，旨在统一前后端。

#### 详解
##### CommonJS
1️⃣ 特点
- 同步加载
- 运行时加载
- 缓存
- 值拷贝

2️⃣ 语法
- 导出：`module.exports = {}` 或 `exports.xxx = xxx`
- 导入：`const xxx = require('xxx')`

##### AMD
1️⃣ 特点
- 异步加载
- 依赖前置（定义模块前必须声明其依赖，加载完成依赖后才执行回调）。

2️⃣ 语法
- 导出：`difine(id?,dependencies?,factory)`
- 导入：`requires([dependencies],callback)`
##### CMD
1️⃣ 特点
- 依赖就近：用到某个模块时再去 `require`，延迟执行。
- 同步书写：写法像 CommonJS，但底层是异步加载。

2️⃣ 语法
- `define(function(require, exports, module) { ... })`
- AMD vs CMD：AMD 推崇依赖前置（提前执行），CMD 推崇依赖就近（延迟执行）。
##### UMD
1️⃣ 原理
> 一个能够在一个文件中同时支持 AMD/CommonJS/全局变量（Global）的模式。

2️⃣ 实现逻辑
- 判断是否支持AMD（`typeof define === 'function'`），是则用 `define`。
- 判断是否支持CommonJS（`typeof module === 'object'`），是则用
`module.exports`
- AMD和CommonJS 都不支持，挂载到全局对象上（`window/global`）

##### ESM
1️⃣ 特点
- 静态分析：在编译时就确定模块依赖关系（`import` 必须在顶层）。
- 异步/同步：浏览器端异步加载，且支持 `import()` 动态导入。
- 引用传递：import 的变量是只读引用，模块内部值变化，外部引用的值也会跟着变（与 CommonJS 的值拷贝不同）。

2️⃣ 语法
- 导出：`export const x= 1`/`export default {}`
- 导入：`import {x} from '@/utils'`/`import x from '@/utils'`

#### 对比总结
- CommonJS
  - 主要应用场景：Nodejs服务端
  - 加载方式：同步
  - 运行时/编译时：运行时
  - 核心语法：require/module.exports
  - 备注：输出值的拷贝
- AMD
  - 主要应用场景：浏览器
  - 加载方式：异步
  - 运行时/编译时：运行时
  - 核心语法：define/require
  - 备注：依赖前置、通过回调使用
- CMD
  - 主要应用场景：浏览器
  - 加载方式：异步
  - 运行时/编译时：运行时
  - 核心语法：define/require
  - 备注：依赖就近，已过时
- UMD
  - 主要应用场景：通用库开发
  - 加载方式：异步
  - 运行时/编译时：运行时
  - 核心语法：define/require，require/module.exports
  - 备注：兼容CommonJS、AMD、Global
- ESM
  - 主要应用场景：现代前端/服务端
  - 加载方式：编译时静态分析
  - 运行时/编译时：编译时
  - 核心语法：import/export
  - 备注：官方标准，支持树摇（Tree-Shaking）

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
  - `==`：先类型转换，然后在比较 —— 宽松相等
    - 会按照`IEEE 754`标准对`NaN`、`-0`、`+0` 进行特殊处理(`NaN != NaN`，`-0 == +0`)
  - `===`：不进行类型转换，值和类型都相等 —— 严格相等
    - 会按照`IEEE 754`标准对`NaN`、`-0`、` +0` 进行特殊处理(`NaN != NaN`，`-0 === +0`)
  - `Object.is()`：既不进行类型转换，也不对 `NaN`、`-0`、`+0`进行特殊处理

2️⃣ JavaScript 提供三种不同的值比较运算
| x                 | y                 | ==     | ===    | Object.is |
|-------------------|-------------------|--------|--------|-----------|
| undefined         | undefined         | `true` | `true` | `true`    |
| null              | null              | `true` | `true` | `true`    |
| true              | true              | `true` | `true` | `true`    |
| false             | false             | `true` | `true` | `true`    |
| "str"             | "str"             | `true` | `true` | `true`    |
| 0                 | 0                 | `true` | `true` | `true`    |
| +0                | -0                | `true` | `true` | false     |
| 0                 | false             | `true` | false  | false     |
| ""                | false             | `true` | false  | false     |
| ""                | 0                 | `true` | false  | false     |
| "0"               | 0                 | `true` | false  | false     |
| "10"              | 10                | `true` | false  | false     |
| "[1,2]"           | "1,2"             | `true` | false  | false     |
| new String("str") | "str"             | `true` | false  | false     |
| null              | undefined         | `true` | false  | false     |
| null              | false             | false  | false  | false     |
| undefined         | false             | false  | false  | false     |
| {foo:"bar}        | {foo:"bar"}       | false  | false  | false     |
| new String("str") | new String("str") | false  | false  | false     |
| 0                 | null              | false  | false  | false     |
| 0                 | NaN               | false  | false  | false     |
| "str"             | NaN               | false  | false  | false     |
| NaN               | NaN               | false  | false  | `true`    |

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
  - 最好含有 `store` 的名字，且以 `use` 开头，以 `Store` 结尾。
  - 如：`useUserStore`，`useCartStore`，`useProductStore`
- `defineStore(storeId,[Setup Store | Option Store])` 参数
  - `storeId`：第一个参数是应用中 Store 的唯一 ID。
  - `[Setup Store | Option Store]`：第二个参数可接受两类值（Setup 函数或 Option 对象）。

### Setup Store
> 必须在 `setup store` 中返回 `state` 的所有属性
- `ref()` -> state 属性
- `computed()` -> getters
- `function()` -> actions


```ts [index.ts]
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
```

### Option Store
- `state` -> store 的数据 (data)
- `getters` -> store 的计算属性 (computed)
- `actions` -> store 的方法 (methods)

```ts [index.ts]
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

### 组件使用 Store

```ts [index.ts]
import { useCounterStore } from '@/stores/counter'
// 在组件内部的任何地方均可以访问变量 `store` ✨
const store = useCounterStore()
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
  - 1.《W3C 标准方案》—— CORS (Cross-Origin Resource Sharing)
    - 通过服务器设置 HTTP 响应头来告诉浏览器：“允许这个源访问资源”。
      - `Access-Control-Allow-Origin`: 允许的域名（如 http://localhost:3000 或 *）。
      - `Access-Control-Allow-Methods`: 允许的方法（GET, POST 等）。
      - `Access-Control-Allow-Headers`: 允许的请求头。
      - `Access-Control-Allow-Credentials`: 是否允许发送 Cookie。
  - 2.《开发环境推荐》—— 代理 (Proxy)
    - 同源策略是浏览器的限制，服务器之间没有同源策略
    - 前端请求本地开发服务器，本地服务器转发请求到后端，绕过浏览器限制。
  - 3.《生产环境推荐》—— Nginx 反向代理 
    - 在生产部署时，由 `Nginx` 作为中转站，将前端静态资源和后端 API 聚合在同一个域名（或端口）下，从而在浏览器端看起来是“同源”的。
  - 4.《窗口间通信》—— postMessage
    - HTML5 引入的 API，专门用于 `Window` 对象之间的跨域通信（如页面与 iframe，或父子窗口）。
    - 缺点：仅限于窗口间通信，不适合数据接口请求。
  - 5.《网络通信协议》—— WebSocket
    - `WebSocket` 协议 (`ws://` 或 `wss://`) 本身不受同源策略限制。
    - 需要后端实现 WebSocket 服务，成本高于 HTTP；不适合普通的 RESTful API 场景。
  - 6.《古老方案》—— JSONP (JSON with Padding)
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

| 解决方案 | 场景 | 推荐指数 | 推荐指数 |
| --- | --- | --- | --- |
| `CORS` | 标准前后端分离 API | ⭐⭐⭐⭐⭐ | 后端配置请求 Header，官方标准 |
| `Nginx 反向代理` | 生产环境部署 | ⭐⭐⭐⭐⭐ | 运维配置，性能最好，同源伪装 |
| `Proxy` | 开发环境	 | ⭐⭐⭐⭐⭐ | Vite/Webpack 配置 |
| `PostMessage` | iframe/微前端通信	 | ⭐⭐⭐⭐ | 窗口间互发消息通信 |
| `WebSocket` | 实时聊天/股票推送	 | ⭐⭐⭐⭐ | 协议层面无限制 |
| `JSONP` | 老旧系统维护 | ⭐ | 只支持 GET，不安全 |
| `document.domain` | 主域名相同 | ⭐ | 即将废弃，勿用 |

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
      [/^child-(\d+):(.+)$/, ([, n, style]) => `[&:nth-child(${n})]:${style}`]// use child-1:bg-[#f00]
    ]
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
  - [DOM标准](https://htmlspecs.com/dom/ )
  - [HTML标准](https://htmlspecs.com/ )

### github 官方API
- [github-api](https://api.github.com/)

### pnpm/npm/yarn
- 快速查看依赖文：`pnpm home <package-name>`

## 进阶——源码学习
- [Marvin](https://canyuegongzi.github.io/)
- [vue-toastification](https://github.com/Maronato/vue-toastification#readme)

## Git

### 创建备份分支（存档）

1️⃣ 假设你当前在 main 分支，准备进行撤销操作

```bash 
# 语法：git branch <备份分支名>
# 习惯上加上 -backup 和 日期/时间 以便区分
git branch main-backup-20260131
```
> ⚠️ 注意：上述git命令`单纯执行 git branch 仅仅是在本地买了一份“保险”，这份保险并不在远程服务器（GitHub/GitLab）上`。
>> 本地备份的原理：Git 的机制是，只要有一个指针（分支）指向某个 Commit，则该 Commit 的数据就不会丢失。
>> 场景模拟
>> - 你创建了 backup 分支（指向 Commit A）。
>> - 你在 main 分支执行 git reset --hard 回到了过去（指向 Commit B）。
>> - 此时，Commit A 虽然不在 main 上了，但因为它被 backup 抓着，所以它还在你的硬盘里，安然无恙。
>> - 若你发现撤销搞错了，你只需把 main 重置回 backup 即可。

2️⃣ 如果搞砸了，如何恢复？（读档）
```bash
# 方法 A：直接把当前分支重置到备份分支的状态（推荐）
git reset --hard main-backup-20260131

# 方法 B：如果方法 A 也不放心，可以先切到备份分支看看
git checkout main-backup-20260131
```

3️⃣ 完美结局：操作成功后清理（删除存档）
```bash
# 如果你对撤销的结果满意，备份分支就没有利用价值了。
git branch -D main-backup-20260131
```

### 撤回已暂存文件

✅ 适用场景：撤销 `git add`（状态：已暂存，未提交）
✅ 安全方案（推荐）：将文件从`暂存区`移回工作区，`文件内容的修改会被保留`，非常安全。

```bash
# 撤销指定文件的暂存
git restore --staged <fileName>

# 撤销所有已暂存的文件
git restore --staged .
```
> (注：旧版本 Git 可能使用 `git reset HEAD <fileName>`，效果一样，但 restore 语义更清晰)

### 撤回已提交，未推送
1️⃣ 本地提交（未推送），想保留代码修改

✅ 适用场景：刚 `git commit` 但未 `git push`
✅ 安全操作
```bash
# 保留修改在【暂存区】（推荐！可直接重提交）
git reset --soft HEAD~1
git commit -m "修正后的提交信息"

# 或撤销最近一次 commit，代码保留在暂存区 (绿色状态)
git reset --soft HEAD^

# 或保留修改在【工作区】（需重新 git add）
git reset HEAD~1  # --mixed 是默认参数，可省略
```
> :bulb: `HEAD~1` = 上一次提交（也可用`git log` 查看 `commit hash` 替代）

2️⃣ 场景二：本地提交，彻底丢弃所有修改
> :warning: 警告：此操作不可逆！代码将永久删除

✅ 仅当确认不需要本次提交的任何内容时使用

```bash
# ⚠️ 警告方案：Hard Reset（慎用）
git reset --hard HEAD~1

# ⚠️ 警告方案：Hard Reset（慎用）
# 彻底回退到上一个版本，丢弃所有修改
# 会直接删除最后一次提交的代码修改，恢复到上一次提交时的状态。你的代码会丢失！
git reset --hard HEAD^
```
### 撤回已推送到远程（团队协作场景！）
✅ 黄金法则：绝不直接 `reset + force push`！
✅ 安全方案：用 `revert` 生成“反向提交”

```bash
# 撤销最近一次提交（多人共用的分支）
git revert HEAD  

# 或指定 commit hash：
# 1. 找到你想撤销的那个 commit 的 ID (hash)
git log

# 2. 生成一个“反向提交”
git revert a1b2c3d

# 按提示编辑撤销提交信息 → 保存退出
git push                 # 正常推送，无风险！
```
> 优势
> - 历史记录完整（原提交 + 撤销提交）
> - 不破坏他人本地仓库
> - 团队协作零冲突

### 撤回对比
| 场景        |  状态   |                           推荐命令 |               后果 |
|:----------|:-----|:-------------------------------|:-----------------|
| 撤销 add    | 还在暂存区 |       `git restore --staged .` |       回到工作区，代码保留 |
| 撤销 commit | 保留代码修改 |       `git reset --soft HEAD^` |  撤销提交记录，代码保留在暂存区 |
| 撤销 commit | 丢弃所有修改  |       `git reset --hard HEAD^` |      不保留代码，不影响远程 |
| 撤销 push   | 公共分支  | `git revert <commit-id>/HEAD^` | 新增一条“反悔”记录，`最安全` |
| 撤销 push   | 私有分支  |         `reset + push --force` |     抹除远程记录，`需谨慎` |


## UI库
### PC
- Element-Plus：一套为开发者、设计师和产品经理准备的基于 Vue3.0 的桌面端组件库。
- Ant Design Vue：Ant Design 的 Vue.js 实现，开发和服务于企业级后台产品。
- Arco Design Vue：字节跳动基于 Arco Design 开源的 Vue UI 组件库。
- Vuetify：一个无需设计技能的开源 UI 库，拥有精美手工制作的 Vue 组件（vue3）。
- Quasar：构建高性能的 VueJS 用户界面,开箱即用,支持桌面和移动浏览器（包括 iOS Safari！）
- Naive UI：一个 Vue3 组件库，比较完整，主题可调，使用 TypeScript
- Element3：一套为开发者、设计师和产品经理准备的基于 Vue3.0 的桌面端组件库
- Heyui：HeyUI@2.0 是一套基于 Vue3.0 的开源 UI 组件库，主要服务于一些中后台产品。
- Vuestic UI：为 Vue3.0 量身订制的模块化且高可定制化的 Material Design UI 库。
- IDUX UI：一套企业级中后台 UI 组件库, 基于 Vue 3.x + TypeScript 开发（开源）
- Vexip UI：该组件库使用全新的 vue3.0 组合式 Api 编写，是新一代 vue 组件库项目的一次尝试。
- BalmUI：为 Vue3.0 量身订制的模块化且高可定制化的 Material Design UI 库。
### Mobile
- UniApp: uni-app 是一个使用 Vue.js 开发所有前端应用的框架(跨端)
- Vant:有赞前端团队开源的移动端组件库，于 2017 年开源，已持续维护 4 年时间。
- NutUI 3.0:京东风格的 Vue 移动端组件库，开发和服务于移动 Web 界面的企业级产品。
- Varlet:一个基于 Vue3 开发的 Material 风格移动端组件库，全面拥抱 Vue3 生态。
- Ionic Framework: 一个开源 UI 工具包，用于使用 Web 技术构建移动和桌面应用程序。
- Vuetify: 一个纯手工精心打造的 Material 样式的 Vue UI 组件库。
- Cube UI: 一个基于Vue.js的移动端 UI 框架。
- Onsen UI: 一个基于HTML5和CSS3的移动端 UI 框架。
- WeUI: 一个基于微信原生视觉体验的移动端 UI 框架。
- Taro UI: 一个基于Taro框架的多端 UI 组件库（跨端）。
- Muse UI: Adobe 开发的用户界面（UI）设计系统，用于构建响应式的 Web 和移动应用程序（）。
- Ionic Vue: 是 Ionic 团队推出的一个基于 Vue.js 的移动应用程序开发框架（跨平台）。
- Framework7 Vue: 一个基于 Vue.js 的移动应用程序开发框架（跨平台）
- WaveUI:提供的组件非常漂亮，动画效果也非常好，它的风格在整个框架中是一致的。
### Mini Program
- UniApp: 一个使用 Vue.js 开发所有前端应用的框架(跨端)。
- Vant-weapp：轻量、可靠的小程序 UI 组件库。
- Nut-UI：京东风格移动端 Vue2、Vue3 组件库。
- mpvue：一个使用 Vue.js 开发小程序的前端框架。
- wepy：一个最受欢迎的小程序框架。
- Wot Design Uni：是一个基于 Vue3 + TS 开发的 uni-app 组件库

> 框架：Uni-app、Taro、Kbone

## 开箱即用
> `Gin-vue-admin`
> 基于vite+vue3+gin搭建的开发基础平台，集成jwt鉴权，权限管理，动态路由，分页封装，多点登录拦截，资源权限，上传下载，代码生成器，表单生成器等开发必备功能

> `Vue-vben-admin`
> 基于 Vue3.0、Vite、 Ant-Design-Vue、TypeScript 的后台解决方案

> `Vue-pure-admin`
> Vue3.0+TypeScript+Vite2.0+Element-Plus编写的一套后台管理系统

> `Vue3-composition-admin`
> 基于vue3 的管理端模板(Vue3 TS Vuex4 element-plus vue-i18n-next composition-api)

> `Vue3-antd-admin`
> 基于vue-cli/vite + vue3.0 + ant-design-vue2.0 + typescript hooks 的基础后台管理系统模板 RBAC的权限系统, JSON Schema动态表单,动态表格,漂亮锁屏界面

> `Naive-ui-admin`
> 基于 vue3,vite2,TypeScript 的中后台解决方案

## 部署
### 部署静态站点
- [部署静态站点,基于vite构建](https://cn.vitejs.dev/guide/static-deploy)
- [部署](https://cli.vuejs.org/zh/guide/deployment.html)