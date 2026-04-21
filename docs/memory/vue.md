# Vue

> 前端界的“拼装大师”，数据和界面说合就合，开发效率像开挂一样，适合“懒人”与“强迫症”共同拥有。

## 响应式 API 指南

### 快速决策流程图
```txt
1️⃣ 数据需要响应式更新吗？
├─ 否 → 普通变量 / const / markRaw
└─ 是 → 数据是什么类型/规模？
    ├─ 基础类型（string/number/boolean）→ ref
    ├─ 对象/数组
    │   ├─ 需要深度响应式（默认）→ reactive 或 ref
    │   ├─ 只需要整体替换触发更新 → shallowRef
    │   └─ 只需要第一层属性响应式 → shallowReactive
    └─ 第三方实例/超大静态数据 → markRaw
2️⃣ 数据是否用于模板（template）中渲染？
├─ 否 → 仅在 setup 逻辑中使用，不需要显示在页面上，普通 JS 变量/对象（不可用于渲染动态数据，普通对象模板无法感知变化）
└─ 是 → 必须是响应式数据，否则后续即使数据变了视图也不更新 
```
### 响应式变量定义

#### 核心 API

| API               | 使用方式                            | 访问方式  | 适用场景           |
| ----------------- | ----------------------------------- | --------- | ------------------ |
| `ref`             | `const count = ref(0)`              | `.value`  | 基础类型           |
| `reactive`        | `const state = reactive({})`        | 直接访问  | 复杂对象/表单数据  |
| `computed`        | `const double = computed(() => {})` | `.value`  | 依赖其他响应式数据 |
| `shallowRef`      | `const data = shallowRef({})`       | `.value ` | 大型数据全量替换   |
| `shallowReactive` | `const state = shallowReactive({})` | 直接访问  | 只关心顶层属性变化 |

#### 组合式 API 辅助函数

| API               | 使用方式                           | 作用                                       |
| ----------------- | ---------------------------------- | ------------------------------------------ |
| `toRef`           | `const name=toRef(props,'name')`   | 从响应式对象中提取单个属性，保持响应式连接 |
| `toRefs`          | `const {name,age}=toRefs(state)`   | 解构响应式对象时保持每个属性的响应式       |
| `customRef`       | `customRef((track,trigger) => {})` | 自定义响应式行为（如防抖、节流）           |
| `readonly`        | `const a=readonly(state)`          | 创建只读版本，防止意外修改                 |
| `shallowReadonly` | `const b=shallowReadonly(state)`   | 只读但仅限制顶层属性                       |

### API 对比表

| API               | 响应式深度                   | 触发更新条件                   | 适用场景                             | 性能开销 |
| ----------------- | ---------------------------- | ------------------------------ | ------------------------------------ | -------- |
| `ref`             | 深度（`.value`内对象全递归） | `.value`整体替换或内部属性变化 | 基础类型、需要重新赋值的对象         | 中~高    |
| `reactive`        | 深度（全递归）               | 属性直接修改                   | 表单数据、复杂状态对象               | 中~高    |
| `shallowRef`      | 浅层（仅`.value`本身）       | `.value`整体替换               | 大数据集、不需要修改内部属性的场景   | 低       |
| `shallowReactive` | 浅层（仅第一层属性）         | 第一层属性修改                 | 配置对象、浅层状态                   | 低       |
| `markRaw`         | 无（永久阻断）               | 不触发更新                     | 第三方库实例、静态常量、超大只读数据 | 零       |

### Demo

::: code-group

```ts [核心选择原则.ts]
// 1️⃣ ref - 基础类型首选，对象也可用
const count = ref(0)           // ✅ 基础类型
const user = ref({ name: 'John' })  // ✅ 对象也可以

// 2️⃣ reactive - 仅限对象，适合复杂状态
const state = reactive({
  user: { name: 'John', age: 18 },
  posts: [],
  loading: false
})

// 3️⃣ shallowRef - 大数据集，整体替换
const items = shallowRef([...10000条数据])
// 修改：整体替换才触发
items.value = [...newItems]

// 4️⃣ shallowReactive - 浅层配置
const config = shallowReactive({
  theme: 'dark',        // 修改 theme 触发更新
  nested: {             // 修改 nested 内部不触发
    api: 'xxx'
  }
})

// 5️⃣ markRaw - 阻断响应式
const threeScene = markRaw(new THREE.Scene())
const state = reactive({
  scene: threeScene,    // 保持原始对象，不会被代理
  staticConfig: markRaw({ version: '1.0' })
})
```

```ts [常见陷阱与最佳实践.ts]
// ❌ 陷阱1：reactive 重新赋值会丢失响应式
let state = reactive({ count: 0 });
state = reactive({ count: 1 }); // 响应式丢失！

// ✅ 解决：使用 ref 或 Object.assign
const state = ref({ count: 0 });
state.value = { count: 1 }; // ref 可以整体替换
// 或
Object.assign(state, { count: 1 });

// ❌ 陷阱2：解构 reactive 丢失响应式
const state = reactive({ count: 0 });
let { count } = state; // count 是普通数字

// ✅ 解决：使用 toRefs
const { count } = toRefs(state); // count 是 ref

// ❌ 陷阱3：shallowRef 内部属性变更不触发
const data = shallowRef({ list: [] });
data.value.list.push(1); // 不会触发更新！

// ✅ 解决：整体替换
data.value = { list: [...data.value.list, 1] };

// ✅ 最佳实践：合理选择响应式深度
// 80% 场景用 ref/reactive 就够了
// 性能瓶颈时再考虑 shallow 系列
```

:::

### 响应式 API Demo

::: code-group

```ts [ref.ts]
const count = ref(0);
const user = ref({ name: "John" });

count.value++; // 触发更新
user.value.name = "Jane"; // 深度响应式，触发更新
user.value = { name: "Ann" }; // 整体替换，触发更新
```

```ts [reactive.ts]
const state = reactive({
  user: { name: "John", age: 18 },
  posts: [],
});

state.user.name = "Jane"; // 触发更新
state.posts.push("new"); // 触发更新

// ✅ 正确：修改属性
const state = reactive({ count: 0 });
state.count = 1;

// ❌ 错误：重新赋值
let state = reactive({ count: 0 });
state = reactive({ count: 1 }); // 新对象不再响应式！

// ✅ 正确解构
const { count } = toRefs(state); // count 是 ref
```

```ts [shallowRef.ts]
const data = shallowRef({ list: [] });

// ✅ 触发更新
data.value = { list: [1, 2, 3] };

// ❌ 不会触发更新
data.value.list.push(4);

const state = shallowRef({ user: { name: "John" } });
state.value = { user: { name: "Jane" } }; // 整体替换触发更新

state.value.user.name = "Bob"; // 手动触发内部变更的更新
triggerRef(state); // 强制更新

// 配合 markRaw 保证内部完全非响应式
const bigList = shallowRef(markRaw(veryLargeArray));
```

```ts [shallowReactive.ts]
const state = shallowReactive({
  visible: true, // 响应式
  config: {
    theme: "dark", // 非响应式
  },
});

state.visible = false; // ✅ 触发更新
state.config.theme = "light"; // ❌ 不会触发更新

const settings = shallowReactive({
  theme: "dark",
  user: { name: "John" }, // 普通对象
});

// 顶层属性更新正常
settings.theme = "light"; // 触发 UI 更新

// 嵌套更新无效
settings.user.name = "Jane"; // UI 不更新

// 正确更新嵌套数据的方式
settings.user = { name: "Jane" }; // 整体替换，触发更新
```

```ts [markRaw.ts]
const staticData = markRaw({ version: '1.0', items: [...] })
const threeObject = markRaw(new THREE.Scene())

const state = reactive({
  config: staticData,      // 保持原始对象
  scene: threeObject       // 第三方实例不被代理
})

// ❌ 错误：只用在普通对象上，但从未放入响应式容器
const obj = markRaw({ a: 1 })   // 多此一举，不如直接用 const

// ✅ 正确：确保放入响应式容器时不会被转换
const hugeList = markRaw(Array.from({ length: 100000 }))
const state = reactive({ data: hugeList })  // 无响应式开销

// ❌ 错误：先放入再标记无效
const state = reactive({ data: {} })
markRaw(state.data)   // 无效，已经是响应式对象了

// ✅ 正确：标记后再放入
const raw = markRaw({})
const state = reactive({ data: raw })
```

:::

## defineAsyncComponent

1️⃣ 动态(按需)加载组件

> - 一个用于显式`声明异步组件`的`辅助函数`，它主要用于`性能优化和按需加载`。
> - 它通过结合 ES 模块的动态导入 (`import()`)，实现组件只有在被渲染时才从服务器下载和加载。

```ts
import { defineAsyncComponent } from "vue";

// 无配置项定义方式
const asyncPage = defineAsyncComponent(() => import("./HeavyComponent.vue"));

// 配置项定义方式
const AsyncHeavyComponent = defineAsyncComponent({
  // 异步加载组件的函数，通常使用 import()
  loader: () => import("./HeavyComponent.vue"),
  // 加载时显示的组件（例:如加载动画）
  loadingComponent: LoadingComponent,
  // 加载失败/发生错误显示的组件
  errorComponent: ErrorComponent,
  // 显示加载组件前延迟，默认值是 200 毫秒。
  // 若组件加载的时间小于这个延迟，loadingComponent 不会显示。
  delay: 200,
  // 超时时间（超时限制），若加载时间超过此时间，将显示 errorComponent。
  timeout: 3000,
});
```

2️⃣ defineAsyncComponent 的核心价值

- `提升性能`：优化初始加载时间。
- `按需加载`：延迟加载，减小内存占用。
- `状态管理`：内置支持加载失败、超时和 loading 状态的处理。

## 生命周期

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

## diff算法

> `Diff算法`的核心：针对具有`相同父节点`的`同层新旧子节点`进行比较，而不是使用逐层搜索递归遍历的方式。

⚠️ 注意事项

> 时间复杂度为`O(n)`。

## emit

> [官方参考文档](https://cn.vuejs.org/guide/components/events.html): 组件事件

1️⃣ emit 自定义事件命名规范，`必须`采用`小驼峰（camelCase）`命名法

- ✅ `emit('onSortTap')`
- ❌ `emit('on-sort-tap')`

2️⃣ 模板编写

> 推荐使用 `kebab-case` (短横线连字符) 形式

⚠️ 注意事项

::: warning TIP
所有传入 `$emit()` 的额外参数都会被直接传向监听器。举例来说，`$emit('foo', 1, 2, 3) `触发后，监听器函数将会收到这三个参数值。
:::

::: danger TIP

若一个`原生事件`的名字 (例如 click) `被定义`在 `emits` 选项中，则监听器`只会监听`组件触发的 `click` 事件而`不会再响应原生的 click 事件`。

:::

## 虚拟 DOM (Virtual DOM)

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

## Vue3多根节点

- 支持多根节点
- ⚠️若封装通用组件，多根节点需要注意`Attributes`透传问题
  > - 禁用`Attributes`透传
  > - 明确给节点绑定 `Attributes`（v-bind="$attrs"）
> ⚠️ 和`单根节`点组件有所不同，有着`多个根节点`的组件没有自动 attribute 透传行为。若 `$attrs` 没有被`显式绑定`，将会`抛出`一个`运行时警告`。

## 组件基础

## 组件命名和模板使用

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

## 插槽

- 默认插槽：`<slot></slot>`
- 具名插槽：`<slot name="header"></slot>`
- 条件插槽：有时需根据内容是否被传入插槽来渲染某部分，可结合`$slots`与`v-if`实现。
  > - `<div v-if="$slots.header"><slot name="header" /></div>`
- 动态插槽：`<template #[dynamicSlotName]></template>`
- 作用域插槽：`<slot :text="msg" :count="1"></slot>`

## 动态组件&异步组件

1️⃣ 动态组件

> `<component :is="currentTabComponent"></component>`

2️⃣ 异步组件

> `defineAsyncComponent`

## 泛型组件

1️⃣ 泛型组件的使用场景：子组件的 `某个值的类型` 需要根据父组件传递过来的 数据的某个属性值自动推断。

> - A组件使用：sortBy（排序字段），枚举 `enum SortByA = 'A' | 'B' | 'C'`
> - B组件使用：sortBy（排序字段），枚举 `enum SortByB = 'D' | 'E' | 'F'｜'G' | 'H'`

2️⃣ 范型应用场景：当组件`“结构固定、数据类型可变”`时，用 Vue `泛型组件最合适`。

- `列表/表格类组件`
  > 展示逻辑一样，但每个业务的 item 类型不同（User、Order、Game）。
- `选择器/下拉菜单`
  > value 可能是 'id' | 'name'、枚举、数字等，泛型可让 v-model 和 emit 类型自动联动。
- `排序/筛选组件`
  > 像你现在这个，sortBy 依赖父组件传入项，泛型能从 items.value 推断，避免写死枚举。
- `表单字段包装组件`
  > 同一套 UI，modelValue 可能是 string | number | Date，泛型能保证输入输出一致。
- `通用数据加载组件`（分页、无限滚动）
  > 请求返回类型不固定，泛型保证 list、onSelect、插槽参数全程类型安全。
- `不太需要泛型的情况`
  > 组件只服务单一业务、类型不会变化、团队更看重简单而非类型约束。

## 透传 Attributes

> “透传 attribute”指的是传递给一个组件，却没有被该组件声明为 props 或 emits 的 attribute 或者 v-on 事件监听器。

- `Attributes 继承`：当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上。
- `对 class 和 style 的合并`：若一个子组件的根元素已经有了 class 或 style attribute，它会和从父组件上继承的值合并。
- `v-on 监听器继承`：click 监听器会被添加到 子组件 的根元素。
- `禁用 Attributes 继承`：你不想要一个组件自动地继承 attribute，你可以在组件选项(`defineOptions`)中设置 `inheritAttrs: false`。
- `v-bind="$attrs"`：透传进来的 attribute 可以在模板的表达式中直接用 `$attrs` 访问到。
  - `$attrs` 对象包含了除组件所声明的 `props` 和 `emits` 之外的所有其他 attribute。
- `在 JS 中访问透传 Attributes`：你可以在 `<script setup>`; 中使用 `useAttrs() API` 来访问一个组件的所有透传 attribute。

## 插槽入门到放弃

## 插槽概述

插槽（Slot）是 Vue 中用于内容分发的一种机制，它允许父组件向子组件的指定位置注入模板内容。插槽是`组件复合和复用`的重要工具，类似于 Web Components 中的 `<slot>` 元素。

## 插槽的基本种类

- 1️⃣ `默认插槽（匿名插槽）`：最基本的插槽类型，没有名称的插槽。
- 2️⃣ `具名插槽`：具有名称的插槽，允许在子组件中定义多个不同的插槽位置。
- 3️⃣ `作用域插槽`：允许子组件将数据传递给插槽内容，使父组件能够访问子组件的作用域。

### 默认插槽

1️⃣ 定义

> 最基本的插槽类型，没有名称的插槽。

2️⃣ 特点

- 一个组件`只能有一个`默认插槽
- 父组件中未指定 `v-slot` 的内容都会进入默认插槽

3️⃣ Example

```vue
<!-- 子组件 ChildComponent.vue -->
<template>
  <div class="container">
    <header>头部</header>
    <main>
      <!-- 默认插槽位置 -->
      <slot></slot>
    </main>
    <footer>底部</footer>
  </div>
</template>

<!-- 父组件 -->
<template>
  <ChildComponent>
    <!-- 这里的内容会插入到子组件的默认插槽中 -->
    <p>这是插入的内容</p>
    <div>可以插入多个元素</div>
  </ChildComponent>
</template>
```

### 具名插槽

1️⃣ 定义

> 具有名称的插槽，允许在子组件中定义多个不同名称不同位置的插槽。

2️⃣ 特点

- 允许在子组件中定义多个不同名称的插槽
- 简写语法：`v-slot:header `可以简写为 `#header`

3️⃣ Example

```vue
<!-- 子组件 Layout.vue -->
<template>
  <div class="layout">
    <header>
      <slot name="header">默认头部内容</slot>
    </header>
    <main>
      <slot></slot>
      <!-- 默认插槽 -->
    </main>
    <footer>
      <slot name="footer">默认底部内容</slot>
    </footer>
  </div>
</template>

<!-- 父组件 -->
<template>
  <Layout>
    <!-- v-slot 指令指定插槽名称 -->
    <template v-slot:header>
      <h1>页面标题</h1>
      <nav>导航菜单</nav>
    </template>

    <!-- 默认插槽内容 -->
    <article>主要内容</article>

    <!-- 具名插槽的简写语法 -->
    <template #footer>
      <p>版权信息</p>
    </template>
  </Layout>
</template>
```

### 作用域插槽

1️⃣ 定义

> 允许子组件将数据传递给插槽内容，使父组件能够访问子组件的作用域。

2️⃣ 特点

- 允许在子组件中定义多个不同名称的插槽
- 简写语法：`v-slot:header `可以简写为 `#header`

3️⃣ Example

```vue
<!-- 子组件 UserList.vue -->
<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      <slot :user="user" :index="index" :is-admin="user.role === 'admin'">
        <!-- 默认显示内容 -->
        {{ user.name }}
      </slot>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, name: "张三", role: "admin" },
        { id: 2, name: "李四", role: "user" },
        { id: 3, name: "王五", role: "user" },
      ],
    };
  },
};
</script>

<!-- 父组件 -->
<template>
  <UserList>
    <!-- 接收插槽传递的数据 -->
    <template #default="slotProps">
      <div class="user-item">
        <span class="name">{{ slotProps.user.name }}</span>
        <span v-if="slotProps.isAdmin" class="badge">管理员</span>
        <span class="index">#{{ slotProps.index + 1 }}</span>
      </div>
    </template>
  </UserList>
</template>
```

4️⃣ 解构插槽 Prop

```vue
<template #default="{ user, index, isAdmin }">
  <div>{{ user.name }} - {{ index }} - {{ isAdmin }}</div>
</template>
```

## 插槽的高级用法

- 1️⃣ `动态插槽名`：使用动态的插槽名称。
- 2️⃣ `具名作用域插槽`：结合具名插槽和作用域插槽。
- 3️⃣ `渲染作用域`：插槽内容可以访问到父组件的数据作用域，因为插槽内容本身是在父组件模板中定义的。但插槽内容`无法访问`子组件的数据，除非使用作用域插槽。
  - 父组件模板中的表达式只能访问父组件的作用域；
  - 子组件模板中的表达式只能访问子组件的作用域。
- 4️⃣ `默认内容`：在外部没有提供任何内容的情况下，可以为插槽指定默认内容。

::: code-group

```vue [动态插槽名.vue]
<template>
  <BaseLayout>
    <template #[dynamicSlotName]> 动态插槽内容 </template>
  </BaseLayout>
</template>

<script>
export default {
  data() {
    return {
      dynamicSlotName: "header",
    };
  },
};
</script>
```

```vue [具名作用域插槽.vue]
<!-- 子组件 DataTable.vue -->
<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">
          <slot :name="`header-${column.key}`" :column="column">
            {{ column.title }}
          </slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="column in columns" :key="column.key">
          <slot
            :name="`cell-${column.key}`"
            :row="row"
            :column="column"
            :row-index="rowIndex"
          >
            {{ row[column.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<!-- 父组件使用 -->
<template>
  <DataTable :columns="columns" :data="tableData">
    <template #header-name="{ column }">
      <strong>👤 {{ column.title }}</strong>
    </template>

    <template #cell-status="{ row }">
      <span :class="row.status === 'active' ? 'active' : 'inactive'">
        {{ row.status }}
      </span>
    </template>
  </DataTable>
</template>
```

```vue [渲染作用域.vue]
<!-- 父组件 -->
<template>
  <ChildComponent>
    <!-- 这里可以访问父组件的 message -->
    <div>{{ parentMessage }}</div>
    <!-- ❌ 不能直接访问子组件的 childData -->
  </ChildComponent>
</template>
```

```vue [默认内容.vue]
<!-- 子组件 -->
<template>
  <button class="custom-button">
    <slot>
      <!-- 默认内容 -->
      默认按钮
    </slot>
  </button>
</template>
```

:::

## 实际应用场景

::: code-group

```vue [检查插槽是否存在.vue]
<template>
  <div class="modal">
    <!-- 只有提供了 header 插槽时才显示头部 -->
    <div class="modal-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>

    <div class="modal-body">
      <slot></slot>
    </div>

    <!-- 只有提供了 footer 插槽时才显示底部 -->
    <div class="modal-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
```

```vue [灵活的插槽设计.vue]
<template>
  <div class="data-display">
    <!-- 提供多种插槽组合方式 -->
    <slot name="header" :data="data" :loading="loading">
      <div class="default-header">
        <h3>{{ title }}</h3>
        <button v-if="!loading" @click="refresh">刷新</button>
      </div>
    </slot>

    <slot name="content" :data="data" :loading="loading" :error="error">
      <div v-if="loading">加载中...</div>
      <div v-else-if="error">加载失败: {{ error }}</div>
      <div v-else class="default-content">
        {{ data }}
      </div>
    </slot>

    <slot name="footer" :data="data">
      <div class="default-footer">共 {{ data?.length || 0 }} 条数据</div>
    </slot>
  </div>
</template>
```

:::

## Vue2与Vue3异同

::: code-group

```vue [Vue2语法.vue]
<!-- 具名插槽 -->
<template slot="header">内容</template>

<!-- 作用域插槽 -->
<template slot-scope="props">{{ props.item }}</template>

<!-- 同时使用 -->
<template slot="item" slot-scope="{ item }">{{ item }}</template>
```

```vue [Vue3语法.vue]
<!-- 统一使用 v-slot 指令 -->
<template v-slot:header>内容</template>
<template #default="{ item }">{{ item }}</template>
<template #item="{ item }">{{ item }}</template>
```

:::

## 性能考虑

- `避免不必要的插槽内容`：使用 `v-if` 配合 `$slots` 检查插槽是否存在
- `合理使用作用域插槽`：作用域插槽会有额外的渲染开销
- `动态插槽名`：尽量使用静态插槽名，动态插槽名会阻止编译优化

## 总结

插槽是 Vue 组件设计中的核心特性，主要优势包括

- `内容分发`：灵活地将内容插入到组件指定位置
- `组件复用`：创建可高度定制的通用组件
- `逻辑分离`：组件负责结构和逻辑，父组件负责内容呈现
- `双向通信`：通过作用域插槽实现子向父的数据传递
- `组合能力`：多个插槽组合使用，实现复杂布局

## DOM 内的模板和template选项

## DOM 内的模板

> 指的是 `HTML` 直接写在页面的` DOM 结构`中。
>
> - DOM内模板的特征：直接在 `index.html` 的挂载点内部编写。
> - DOM内模板的解析时机与环境：由`浏览器`的 `HTML 解析器`进行解析。
> - DOM内模板的限制：DOM内模板受浏览器HTML规范限制

## template 选项

> 指的是在 `Vue` 组件定义中，通过 `template` 属性传入的`字符串模板`。
>
> - 特征：在 `vue 实例`/`组件配置`中定义字符串/在 SFC 的 `<template>` 标签中定义。
> - 解析时机与环境：由 `Vue 的模板编译器`进行解析。

## 自定义组件 v-model

## 实现原理

- Vue 3.0-（`value prop` 以及 `input` 事件）
  - 将其 `value` attribute 绑定到一个名叫 `value` 的 `prop` 上
  - 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出
- Vue 3.4-（`modelValue` 的 prop以及 `update:modelValue` 的事件）
- Vue 3.4+（推荐使用 `defineModel()` ，一个便利宏）
  - 一个名为 `modelValue` 的 `prop`，本地 `ref` 的值与其同步；
  - 一个名为 `update:modelValue` 的事件，当本地 `ref` 的值发生变更时触发
  - ⚠️ 若为 `defineModel` prop 设置了一个 `default` 值且父组件没有为该 prop 提供任何值，会导致`父组件与子组件之间不同步`。

## vue2 vs vue3

| 特性         | Vue2                | Vue3                        |
| ------------ | ------------------- | --------------------------- |
| 默认 prop    | `value`             | `modelValue`                |
| 默认事件     | `input`             | `update:modelValue`         |
| 自定义 prop  | `model` 选项        | 直接使用 `v-model:propName` |
| 多个 v-model | 使用 `.sync` 修饰符 | 原生支持多个 `v-model`      |
| 修饰符       | 有限支持            | 完整的修饰符支持            |
| TypeScript   | 支持                | 一般                        |

## v-model(vue2)

1️⃣ 默认绑定

- prop -> `value`
- 事件 -> `input`

2️⃣ 自定义属性和事件

- model 对象，与 props 同级
  - `prop`：自定义 prop
  - `event`：自定义事件(`update:自定义prop`)

3️⃣ 自定义组件和属性Example

```vue [CustomChild.vue]
<template>
  <div>
    <input :value="title" @input="$emit('update:title', $event.target.value)" />
    <button @click="$emit('update:show', false)">关闭</button>
  </div>
</template>

<script>
export default {
  name: "CustomChild",
  model: {
    prop: "title", // 自定义 prop
    event: "update:title", // 自定义事件
  },
  props: {
    title: String,
    show: Boolean,
  },
};
</script>
```

```vue [parent.vue]
<template>
  <div>
    <!-- 方式1：直接使用 v-model -->
    <CustomChild v-model="pageTitle" />

    <!-- 方式2：显式绑定（多个 v-model） -->
    <CustomChild
      :title="pageTitle"
      @update:title="pageTitle = $event"
      :show="isShow"
      @update:show="isShow = $event"
    />

    <!-- 方式3：使用 .sync 修饰符（Vue2 推荐） -->
    <CustomChild :title.sync="pageTitle" :show.sync="isShow" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: "Vue2 教程",
      isShow: true,
    };
  },
};
</script>
```

## v-model(vue3)

> [defineModel()](https://cn.vuejs.org/api/sfc-script-setup.html#definemodel)

㊙️ defineModel 底层机制 (Vue 3.4)

> defineModel 是一个便利宏。编译器将其展开为以下内容：
>
> - 一个名为 `modelValue` 的 `prop`，本地 `ref` 的值与其同步；
> - 一个名为 `update:modelValue` 的事件，当本地 `ref` 的值发生变更时触发。

✍️ 宏 `defineModel()`

- `defineModel()` 返回的值是一个 `ref`。
- 它可以像其他 `ref` 一样`被访问`以`及修改`。
- 它能起到在父组件和当前变量之间的双向绑定的作用：
  - 它的 `.value` 和父组件的 `v-model` 的`值同步`；
  - 当它`被子组件变更`了，会`触发父组件绑定的值`一起`更新`；

🈯️ 实现

- 方式1：`props.modelValue/defineEmits(['update:modelValue'])`
- 方式2：宏 `defineModel()`

❇️ 自定义属性和事件（使用 v-model 参数）

```vue [parent.vue]
<template>
  <div>
    <!-- 使用自定义的 v-model:propName -->
    <CustomInput v-model:title="pageTitle" label="文章标题：" />
    <p>标题内容：{{ pageTitle }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomInput from "./components/CustomInput.vue";

const pageTitle = ref("");
</script>
```

```vue [CustomInput.vue]
<template>
  <div>
    <label>{{ label }}</label>
    <!-- :value="title"  使用自定义 prop 名 -->
    <!-- update:title 使用自定义事件名 -->
    <input :value="title" @input="$emit('update:title', $event.target.value)" />
  </div>
</template>

<script setup>
// 定义自定义的 prop
defineProps({
  title: String, // 自定义 prop 名，不是 modelValue
  label: String,
});

// 定义自定义事件
defineEmits(["update:title"]); // 自定义事件名，格式固定为 update:propName
</script>
```

1️⃣ v-model，原始写法，代码更多，更复杂 ⚠️

```vue [TestChild.vue]
<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();

/**
 * 定义事件，包含 update:modelValue 事件
 */
const emit = defineEmits(["update:modelValue"]);
/**
 * 定义 currentValue 变量，并将其初始值设置为 props.modelValue
 */
const currentValue = ref(props.modelValue);

/**
 * 当 props.modelValue 变化时，更新 currentValue
 */
watch(
  () => props.modelValue,
  (val) => {
    currentValue.value = val;
  },
);

/**
 * 当 currentValue 变化时，如果与 props.modelValue 不同，则更新 props.modelValue
 */
watch(currentValue, (val) => {
  if (val !== props.modelValue) {
    emit("update:modelValue", val);
  }
});
</script>

<template>
  <div v-bind="$attrs">
    <input v-model="currentValue" />
  </div>
</template>
```

2️⃣ v-model，宏写法（defineModel），更简洁、更优雅 ✅

```vue [defineModel.vue]
<script setup lang="ts">
const model = defineModel<string>({ required: true });
</script>

<template>
  <div v-bind="$attrs">
    <input v-model="model" />
  </div>
</template>
```

3️⃣ 父组件

```vue [parent.vue]
<script setup lang="ts">
import TestChild from "@/components/TestChild.vue";
const curDay = ref<string>("");
</script>

<template>
  <div class="container-box">
    <TestChild class="my-2" v-model="curDay" />
  </div>
</template>
```

## watch/watchEffect

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
    > - ㊙️ 调试

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

## watch(ref) 与 watch(() => ref.value)

1️⃣ `watch(currentValue, callback)`

> 直接传 `ref` 对象，Vue 会自动解包 `.value`
>
> - `推荐写法`，简洁直观
> - Vue 内部识别到是 `ref`，自动追踪 `.value` 变化
> - `newVal/oldVal` 直接是解包后的值

```ts
watch(currentValue, (newVal, oldVal) => {
  console.log(newVal); // 直接拿到值
});
```

2️⃣ `watch(() => currentValue.value, callback)`

> 传一个 `getter` 函数，getter 形式更适合需要`派生/组合`值的场景。
>
> - 功能上`等价`，也能正常监听
> - 更适合`复合计算`场景，比如 `() => currentValue.value + otherRef.value`
> - 或者监听`响应式对象的某个属性`时`必须`用 getter：`watch(() => state.count, ...)`

```ts
watch(currentValue, (newVal) => {
  console.log("Selected day range:", newVal);
});
```

3️⃣ 核心区别

|            | `watch(ref)`                     | `watch(() => ref.value)`                   |
| ---------- | -------------------------------- | ------------------------------------------ |
| 适用场景   | 监听单个 `ref`                   | 监听 `reactive` 属性 / 派生值              |
| 简洁度     | 更简洁                           | 稍冗余                                     |
| 深度监听   | `watch(ref, cb, { deep: true })` | 同样可用                                   |
| 监听多个源 | `watch([refA, refB], cb)`        | `watch(() => refA.value + refB.value, cb)` |

## Teleport（节点传送）

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

## defineEmits&defineExpose

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

## 过渡和动画

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

## Props

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

## computed 计算属性

### computed 与 纯函数

1️⃣ 计算属性的函数（推荐用纯函数/Methods替代）

```ts
// TODO: 计算属性的函数写法 (❌ 不推荐)  - 没有缓存
const isHostStreamer = computed(() => (hostId: string | undefined) => {
  return hostId && hostId !== "0";
});

// 每次调用都会重新执行内部函数
isHostStreamer("123"); // 执行
isHostStreamer("123"); // 再次执行，没有缓存
```

::: warning ⚠

🅰 为什么语法上合法？

> Vue 3 的 `computed` 可以接受一个返回函数的 `getter`，这样创建的是一个`计算属性的函数`，而不是计算属性的值。这种写法在某些场景下是允许的。(虽然`语法上是合法的`，但是`不推荐`)

🅱 为什么不推荐？

- ① 失去了计算属性的核心优势
  > 计算属性的主要特点是`缓存`，这样写返回的是一个函数，每次调用都会重新执行，失去了缓存的意义
- ② 语义混乱
  > `computed` 通常用于声明式地`定义派生状态`，而`不是返回函数`。这种写法会让代码阅读者困惑。
  > :::

2️⃣ 纯函数/Methods

```ts
// ✅ 推荐使用纯函数/Methods写法 - 替代计算属性的函数写法
function isHostStreamer(hostId: string | undefined) {
  return hostId && hostId !== "0";
}
```

3️⃣ 真正的计算属性

```ts
// ✅ 计算属性推荐写法，保留其【缓存】特性
const isHostStreamer = computed(() => {
  return props.hostId && props.hostId !== "0";
});

// ✅ 直接返回
const isHostStreamer = computed(() => props.hostId && props.hostId !== "0");
```

4️⃣ 总结

- 若是`参数化判断/需要传递参数`，使用`普通函数/Methods`;
- 若是`依赖响应式数据`，使用`真正`的` computed`;

### Example

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

## composables/utils/store

### 易混淆事项

- Vue 中没有`Hooks`的概念，官方称之为 `组合式函数 (Composables)`。
- `Hooks` 是 React 中的概念。

### 核心原则

- `Utils`：无状态、纯函数、可测试
- `Composables`：有状态、组件级、逻辑复用
- `Store`：全局共享/需要共享状态、跨组件、响应式

### 核心应用原则

- 能用 `Composables` 解决的，不用 `Store`（保持简单）
- 需要在多个不相关的组件间共享的状态，用 `Store`
- 可以组合使用：`Store` 管理全局数据，`Composables` 封装业务逻辑

### 核心特征

1️⃣ Composables 的核心特征

- ✅ 有状态：使用 `ref/reactive/computed` 等响应式 API 创建和管理状态
- ✅ 有副作用：使用 `onMounted/onUnmounted/watch/watchEffect` 等处理副作用
- ✅ 组件级隔离：每次调用创建独立的状态副本，互不影响
- ✅ 可组合：`Composables`之间可以互相调用和组合，实现逻辑复用
- ✅ 生命周期绑定：状态随组件挂载而创建，随组件卸载而销毁，自动清理资源
- ✅ 响应式自动追踪：自动追踪依赖变化，无需手动声明依赖数组
- ✅ 灵活调用时机：可在条件语句、循环中任意调用，无顺序限制

2️⃣ Store 的核心特征

- ✅ 全局共享：应用内多个组件访问同一份数据源，避免重复请求与状态不一致
- ✅ 响应式：数据变化时，依赖该数据的组件自动触发更新
- ✅ 可持久化：常与 `localStorage/sessionStorage`或后端配合，实现状态持久化
- ✅ 跨组件通信：任意组件间可直接共享状态，无需通过 `props` 或事件逐层传递
- ✅ 支持 DevTools：可追踪状态变化，提升开发体验
- ✅ 支持异步操作：通常支持异步 action（如 API 请求），并管理加载、成功、失败等状态

3️⃣ Utils 的核心特征

- ✅ 纯函数优先：多为纯函数无副作用，相同输入得到相同输出，也可能包含少量副作用
- ✅ 无状态：不持有或修改外部状态(即不维护内部状态)，只依赖传入的参数
- ✅ 可测试：易于单元测试
- ✅ 通用性：可在任何地方调用（组件/store/Composables），不依赖特定框架或业务上下文
- ✅ 同步为主：通常是同步函数，若涉及异步，一般会明确返回 `Promise` 并保持行为可预测
- ✅ 职责单一：每个工具函数只做一件事，便于组合与复用

4️⃣ 三者关系图解

```txt
┌─────────────────────────────────────────────────────────────┐
│                        组件层                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Vue 单文件组件 (SFC)                │  │
│  │          <template> + <script setup> + <style>       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓ 使用
┌─────────────────────────────────────────────────────────────┐
│                     Composables 层                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │   封装可复用的响应式逻辑（基于组合式 API）              │  │
│  │   • useUser()        • useCart()                     │  │
│  │   • useForm()        • useFetch()                    │  │
│  │   • useLocalStorage  • useDebounce()                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
              ↓ 使用                    ↓ 使用
┌─────────────────────────┐  ┌─────────────────────────────┐
│       Store 层           │  │        Utils 层             │
│  ┌───────────────────┐  │  │  ┌───────────────────────┐  │
│  │  Pinia 状态管理    │  │  │  │ 纯函数工具库           │  │
│  │ • userStore       │  │  │  │ • formatDate()        │  │
│  │ • cartStore       │  │  │  │ • validateEmail()     │  │
│  │ • useUserStore()  │  │  │  │ • deepMerge()         │  │
│  │ (组合式 store)    │  │  │   │ • throttle()          │  │
│  └───────────────────┘  │  │  │ • camelCase()         │  │
└─────────────────────────┘  │  └───────────────────────┘  │
                             └─────────────────────────────┘
```

🎯 核心原则

| 层级        | 核心原则                                                          |
| ----------- | ----------------------------------------------------------------- |
| Composables | `"封装有状态的逻辑复用"` — 将响应式状态、方法、生命周期组合在一起 |
| Store       | `"管理全局共享状态"` — 确保应用单一数据源，跨组件通信             |
| Utils       | `"提供无副作用的工具"` — 保持纯函数特性，可随处调用               |

5️⃣ 职责边界总结

| 职责         | Composables                               | Store (Pinia)                   | Utils                           |
| ------------ | ----------------------------------------- | ------------------------------- | ------------------------------- |
| 管理组件状态 | ✅ 核心职责(ref/reactive 封装)            | ❌ 不直接管理                   | ❌ 不涉及                       |
| 管理全局状态 | ❌ 不推荐(会导致状态分散)                 | ✅ 核心职责(单一数据源)         | ❌ 不涉及                       |
| 副作用处理   | ✅ 核心职责 (watch/onMounted/onUnmounted) | ✅ 支持(actions 中处理)         | ❌ 纯函数，无副作用             |
| 生命周期管理 | ✅ 核心职责 (onMounted/onUnmounted 等)    | ❌ 不涉及(store 无生命周期)     | ❌ 不涉及                       |
| 状态持久化   | ⚠️ 需手动实现(可封装 useLocalStorage)     | ✅ 内置支持(Pinia 插件生态)     | ❌ 只提供工具函数               |
| 业务逻辑复用 | ✅ 核心场景(跨组件复用逻辑)               | ⚠️ 可选(store 间可互相调用)     | ❌ 不涉及                       |
| 数据验证     | ⚠️ 可选(可封装验证逻辑)                   | ⚠️ 可选(action 中验证)          | ✅ 核心职责(validator 函数)     |
| 数据格式化   | ⚠️ 可选(computed 格式化)                  | ⚠️ 可选(getter 格式化)          | ✅ 核心职责(formatter 函数)     |
| API 调用     | ✅ 推荐做法(封装请求逻辑 + 状态)          | ✅ 可接受(action 中调用)        | ❌ 只提供基础工具(如 http 封装) |
| 响应式依赖   | ✅ 强依赖(基于响应式 API)                 | ✅ 强依赖(store 本身就是响应式) | ❌ 无依赖                       |

🔄 调用关系

```txt
组件 (SFC)
   ↓ 使用
Composables ←→ Store ←→ Store
   ↓ 调用        ↓ 调用
Utils ←--------Utils

------------------------------------------

Composables 可以调用 Utils（数据格式化、验证）
Composables 可以调用 Store（访问全局状态）
Store 可以调用 Utils（数据处理）
Store 可以调用 Store（跨 store 通信）
Utils 不能调用 Composables 或 Store（会引入副作用和依赖）
```

6️⃣ Example

::: code-group

```ts [Utils 的特征]
// utils/format.ts
// 特征1：纯函数（无副作用）
export function formatDate(date: Date | string, format: string): string {
  // ❌ 不访问外部状态
  // ❌ 不修改传入参数
  // ✅ 相同输入总是相同输出
  const d = new Date(date);
  const map: Record<string, string> = {
    YYYY: d.getFullYear().toString(),
    MM: (d.getMonth() + 1).toString().padStart(2, "0"),
    DD: d.getDate().toString().padStart(2, "0"),
  };

  return format.replace(/YYYY|MM|DD/g, (matched) => map[matched]);
}

// 特征2：无状态工具函数
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

// 特征3：数据转换和验证
export const validators = {
  isEmail: (email: string): boolean => {
    return /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);
  },

  isPhone: (phone: string): boolean => {
    return /^1[3-9]\d{9}$/.test(phone);
  },

  isUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};

// 特征4：常量定义
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

// 特征5：辅助函数
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}
```

```ts [ Composables 的特征]// composables/useCounter.ts
import { ref, computed, watch, onUnmounted } from "vue";

// 特征1：封装响应式状态 + 逻辑
export function useCounter(initialValue = 0) {
  // ✅ 有响应式状态
  const count = ref(initialValue);
  const history = ref<string[]>([]);

  // ✅ 计算属性（派生状态）
  const doubled = computed(() => count.value * 2);
  const isEven = computed(() => count.value % 2 === 0);

  const increment = () => {
    count.value++;
    history.value.push("increment");
  };

  const decrement = () => {
    count.value--;
    history.value.push("decrement");
  };

  const reset = () => {
    count.value = initialValue;
    history.value = [];
  };

  // ✅ 有副作用（watch 监听变化）
  const stopWatch = watch(count, (newVal, oldVal) => {
    console.log(`count changed: ${oldVal} -> ${newVal}`);
  });

  // ✅ 生命周期清理
  onUnmounted(() => {
    stopWatch();
    console.log("counter composable unmounted");
  });

  return {
    count, // ref
    doubled, // computed
    isEven, // computed
    history, // ref
    increment,
    decrement,
    reset,
  };
}

// 特征2：每次调用独立
// 在组件中使用
// <script setup>
// const counterA = useCounter(0);  // 独立的 count
// const counterB = useCounter(100); // 独立的 count，不同的初始值
// </script>

// 特征3：可以组合其他 Composables
// composables/useUserWithOrders.ts
import { computed, ref, watch } from "vue";
import { useUser } from "./useUser";
import { useOrders } from "./useOrders";

export function useUserWithOrders(userId: string) {
  // ✅ 组合其他 composables
  const { user, loading: userLoading, error: userError } = useUser(userId);
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
  } = useOrders(userId);

  // 组合派生状态
  const isLoading = computed(() => userLoading.value || ordersLoading.value);
  const hasError = computed(() => userError.value || ordersError.value);

  // 副作用：当用户变化时重新加载订单
  watch(
    () => user.value?.id,
    (newUserId) => {
      if (newUserId) {
        console.log(`User changed to ${newUserId}, refetch orders`);
      }
    },
  );

  return {
    user,
    orders,
    isLoading,
    hasError,
  };
}

// 特征4：封装异步操作
// composables/useFetch.ts
import { ref, readonly } from "vue";

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const execute = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network error");
      data.value = await response.json();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  };

  // 自动执行
  execute();

  return {
    data: readonly(data), // 只读暴露
    loading: readonly(loading),
    error: readonly(error),
    refetch: execute,
  };
}
```

```ts [Store 的特征]
// stores/user.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useAppStore } from "./app";
import { api } from "@/utils/api";
import { validators } from "@/utils/format";

// 特征1：全局单例状态（使用组合式 store 语法）
export const useUserStore = defineStore("user", () => {
  // ✅ 全局共享状态（ref）
  const userInfo = ref<UserInfo | null>(null);
  const token = ref<string | null>(null);
  const permissions = ref<string[]>([]);

  // 特征2：计算属性（派生状态）
  const isLoggedIn = computed(() => !!token.value);
  const userName = computed(() => userInfo.value?.name || "Guest");
  const userAvatar = computed(() => userInfo.value?.avatar || "/default.png");

  // 特征3：修改状态的方法（可包含副作用）
  async function login(credentials: Credentials) {
    // ✅ 可以有副作用（API 调用）
    const response = await api.login(credentials);

    userInfo.value = response.user;
    token.value = response.token;

    // 持久化
    localStorage.setItem("token", response.token);

    // 自动获取权限
    await fetchUserPermissions();
  }

  function logout() {
    userInfo.value = null;
    token.value = null;
    permissions.value = [];
    localStorage.removeItem("token");
  }

  // ✅ 可以调用其他 store
  async function fetchUserPermissions() {
    if (!userInfo.value) return;

    const appStore = useAppStore();
    const perms = await api.getPermissions(userInfo.value.id);

    permissions.value = perms;
    appStore.setPermissions(perms); // 更新其他 store
  }

  // ✅ 数据验证
  function updateUserInfo(data: Partial<UserInfo>) {
    if (data.email && !validators.isEmail(data.email)) {
      throw new Error("Invalid email format");
    }

    if (data.phone && !validators.isPhone(data.phone)) {
      throw new Error("Invalid phone number");
    }

    userInfo.value = { ...userInfo.value, ...data };
  }

  return {
    // 状态
    userInfo,
    token,
    permissions,
    // 计算属性
    isLoggedIn,
    userName,
    userAvatar,
    // 方法
    login,
    logout,
    fetchUserPermissions,
    updateUserInfo,
  };
});

// 特征4：跨组件共享
// 在任意组件中使用
// <script setup>
// const userStore = useUserStore();  // 获取同一个实例
//
// // ComponentA
// userStore.login({ name: 'John' });
//
// // ComponentB（同一应用）
// console.log(userStore.userInfo); // ✅ 能立即访问到 ComponentA 修改后的状态
// </script>
```

:::

### Composables vs Store

1️⃣ 核心概念

| 维度       | Composables                        | Store                        |
| ---------- | ---------------------------------- | ---------------------------- |
| 定义       | 可复用的逻辑函数，封装状态和副作用 | 全局/模块化的状态管理容器    |
| 定位       | 逻辑复用                           | 状态共享                     |
| 作用域     | 组件级（每次调用独立）             | 应用级（全局共享）           |
| 数据持久性 | 组件卸载后状态消失                 | 状态持久存在（除非手动清除） |

2️⃣ 对比

| 对比维度 | Composables         | Store                    |
| -------- | ------------------- | ------------------------ |
| 主要目的 | 逻辑复用            | 状态共享                 |
| 状态范围 | 组件级              | 应用级                   |
| 生命周期 | 跟随组件            | 应用全程                 |
| 通信方式 | props/context       | 直接访问                 |
| 适用场景 | UI 逻辑、副作用封装 | 全局数据、跨组件通信     |
| 性能     | 轻量，按需创建      | 全局单例，需考虑性能优化 |
| 复杂度   | 低到中              | 中到高                   |

### Composables vs utils

`Composables`目录下的文件是 `Composables`，`utils` 目录下的文件是 `utils` 。

- `Composables` 内部使用了 `vue` 相关 `API`
- `utils` 内部没有使用 `vue`相关 `API` 。

## 执行类型检查

✅ 执行类型检查标准命令

```bash
npx vue-tsc --noEmit # Vue 3 + TypeScript 执行类型检查标准命令
```

1️⃣ 命令拆解

- `npx`：Node.js 的包运行工具。它会从你项目的 `.bin` 中寻找可执行文件并运行它。
- `vue-tsc`：只负责 “找茬”（查错）。
  - 专门为 Vue 单文件组件（SFC, `.vue` 文件）设计的 TypeScript 编译器包装器。
  - 标准的 `tsc` 无法理解 `.vue` 文件中的 `<template>` 和 `<script setup>`，而 `vue-tsc` 可以将这些内容解析为 TS 能够理解的形式，从而检查模板中的变量类型错误。
- `--noEmit`
  - 这是 TS 编译器的一个标志（Flag）。
  - 含义：只进行类型检查，不生成任何输出文件（如 `.js/.d.ts`文件）。

2️⃣ 具体作用

执行该命令后，终端会扫描整个项目：

- `检查 .ts 文件`：常规的 TypeScript 逻辑检查。
- `检查 .vue 文件`
  - 检查 `<script>` 里的逻辑。
  - `关键点`：检查 `<template>` 里的绑定（例如 `@click="fn"` 中的 `fn` 是否存在，`:prop="val"` 中的类型是否匹配）。
- `结果`
  - 若有任何类型错误，命令会报错并列出文件和行号，构建流程通常会因此终止。
  - 若没有错误，命令静默结束（返回 `exit code 0`），表示检查通过。
