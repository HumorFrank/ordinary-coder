# Vue

## 组件与插件

### 基础介绍

1️⃣ 组件 (`Component`) 是什么？

> 在Vue中，组件是可复用、独立的代码模块，用于构建用户界面（通常包括：`HTML`、`JS`、`CSS`）。

2️⃣ 插件 (`Plugin`) 是什么？

> 在Vue中，插件是指对Vue的功能的增强或补充，可以扩展Vue的功能，添加全局方法、指令、过滤器或混入等。

3️⃣ 作用的区别

- 组件的作用是`构建用户界面`。
- 插件的作用是`扩展Vue的功能`。

4️⃣ 使用场景

- 组件 (`Component`) 是用来构成你的 App 的`业务模块`，它的目标是 `App.vue`。
- 插件 (`Plugin`) 是用来增强Vue的功能模块，它的目标是 `Vue` 本身。

### 两者的区别

1️⃣ 两者的区别主要表现在以下几个方面

- 编写形式
- 注册形式
- 功能范围
- 使用场景

#### 编写形式

1️⃣ 组件：通常是`.vue`文件，包含`template`、`script`、`style`。
::: code-group

```vue [vue2]
<template>
  <div class="alert">{{ message }}</div>
</template>
<script>
export default {
  props: ["message"],
};
</script>
<style lang="less" scoped></style>
```

```vue [vue3]
<template>
  <div class="alert">{{ message }}</div>
</template>
<script setup lang="ts">
const props = defineProps({
  message: String,
});
</script>
<style lang="less" scoped></style>
```

:::

2️⃣ 插件：必须暴露一个`install`方法，接收`app`和`可选参数`。
::: code-group

```js [my-plugin-vue2]
export default {
  // Vue 2 中 install 接收的是 Vue 构造函数
  install(Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = () => {
      console.log("全局方法被调用", options);
    };

    // 2. 添加全局资源（指令/过滤器/过渡等）
    Vue.directive("focus", {
      inserted(el) {
        el.focus();
      },
    });

    // 3. 添加全局组件
    Vue.component("GlobalComp", {
      template: "<div>全局组件</div>",
    });

    // 4. 添加实例方法（通过原型链）
    Vue.prototype.$myMethod = function () {
      console.log("实例方法被调用", options);
    };

    // 5. 添加全局混入
    Vue.mixin({
      created() {
        console.log("插件混入的 created 钩子");
      },
    });

    // 6. 添加全局过滤器（Vue 3 已移除）
    Vue.filter("myFilter", (value) => {
      return value.toUpperCase();
    });
  },
};
```

```js [my-plugin-vue3]
export default {
  install(app, options) {
    // 添加全局属性
    app.config.globalProperties.$myMethod = () => {...}
    // 添加全局组件
    app.component('GlobalComp', {...})
    // 添加全局指令
    app.directive('focus', {...})
    // 注入provide
    app.provide('key', 'value')
  }
}
```

:::

::: info Vue 2 vs Vue 3 插件编写核心对照表

| 功能           | Vue 2 写法                    | Vue 3 写法                       |
| -------------- | ----------------------------- | -------------------------------- |
| 全局属性/方法  | Vue.prototype.$xxx            | app.config.globalProperties.$xxx |
| 创建应用       | new Vue()                     | createApp(App)                   |
| install 参数   | install(Vue, options)         | install(app, options)            |
| 全局组件       | Vue.component()               | app.component()                  |
| 全局指令       | Vue.directive()               | app.directive()                  |
| 全局混入       | Vue.mixin()                   | app.mixin()                      |
| provide/inject | Vue.prototype.$xxx + 手动实现 | app.provide() 原生支持           |
| 过滤器         | Vue.filter()                  | 已移除，用计算属性或方法替代     |
| 注册插件       | Vue.use(plugin)               | app.use(plugin)                  |

:::

#### 注册形式

::: code-group

```ts [组件注册]
// 局部注册（常用）—— vue2
import MyButton from "./MyButton.vue";
export default {
  components: { MyButton },
};

// 局部注册（常用）—— vue3
import MyButton from "./MyButton.vue";
// 直接使用
// <template>
//   <MyButton />
// </template>

// 全局注册
import MyButton from "./MyButton.vue";
Vue.component("MyButton", MyButton); // Vue 2
app.component("MyButton", MyButton); // Vue 3
```

```ts [插件注册]
// 使用插件
import { createApp } from "vue";
import MyPlugin from "./my-plugin";

const app = createApp(App);
app.use(MyPlugin, { option: "value" });
```

:::
::: danger 注册插件的时机

- Vue 2：必须在 `new Vue()` 之前
  > `Vue.use()` 会修改 `Vue` 构造函数的原型链和静态方法，必须在实例化之前完成。

```js [main.js]
// ✅ 正确：先注册插件
Vue.use(VueRouter)
Vue.use(Vuex)

// 再创建实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// ❌ 错误：在实例创建后注册（会报错或无效）
const vm = new Vue({...})
Vue.use(MyPlugin) // 此时注册的全局内容不会影响已创建的实例
```

- Vue 3：必须在 `app.mount()` 之前

```ts [main.ts]
// ✅ 正确：先注册插件
const app = createApp(App);
app.use(router);
app.use(store);
app.use(myPlugin);

// 最后挂载
app.mount("#app");

// ❌ 错误：挂载后再注册
app.mount("#app");
app.use(anotherPlugin); // 警告：插件不会生效，已创建的组件无法获取
```

- 核心要点总结

| 特性     | Vue 2                                | Vue 3                           |
| -------- | ------------------------------------ | ------------------------------- |
| 注册时机 | `new Vue()` 之前                     | `app.mount()` 之前              |
| 重复注册 | 自动阻止（基于 `_installedPlugins`） | 自动阻止（基于 `Set`）          |
| 不同实例 | 同一 Vue 构造函数只注册一次          | 不同 `app` 实例可分别注册       |
| 注册记录 | ` Vue._installedPlugins`             | `app._installedPlugins`（内部） |
| 重复警告 | 静默忽略                             | 控制台警告                      |

:::

#### 功能范围

| 对比项   | 组件                      | 插件                                |
| -------- | ------------------------- | ----------------------------------- |
| 作用域   | 局部（通常）或全局注册    | 全局                                |
| 主要用途 | 封装 HTML/CSS/JS `UI片段` | 添加全局方法、指令、混入、provide等 |
| 典型例子 | 表格、日历、图表          | 国际化、HTTP封装、通知条            |

#### 使用场景

- `组件`：需要封`可复用`的`UI片段`（表单、卡片、弹窗）。
- `插件`：需要提供跨多个组件的`全局功能`（路由、状态管理、国际化、自定义指令库）。

## Vue2.x

### 生命周期

| 生命周期      | 可访问 data | 可访问 $el | 可操作 DOM | 适合做什么                                                                 |
| ------------- | ----------- | ---------- | ---------- | -------------------------------------------------------------------------- |
| beforeCreate  | ❌          | ❌         | ❌         | 插件初始化/非响应式配置                                                    |
| created       | ✅          | ❌         | ❌         | 数据请求/初始化                                                            |
| beforeMount   | ✅          | ❌         | ❌         | 最后的数据修改                                                             |
| mounted       | ✅          | ✅         | ✅         | DOM 操作/第三方库初始化/启动定时器/获取数据/ref操作                        |
| beforeUpdate  | ✅          | ✅(旧)     | ✅(旧)     | 获取旧 DOM 状态                                                            |
| updated       | ✅          | ✅(新)     | ✅(新)     | 操作更新后的 DOM                                                           |
| activated     | ✅          | ✅         | ✅         | ⚠️keep-alive 缓存组件激活时：刷新数据/开始轮询/恢复状态/重新获取焦点       |
| deactivated   | ✅          | ✅         | ✅         | ⚠️keep-alive 缓存组件失活时：停止轮询/保存滚动位置/清理临时资源/暂停音视频 |
| beforeDestroy | ✅          | ✅         | ✅         | 清理定时器/取消请求/移除事件监听/销毁第三方实例/解绑事件总线（最重要）     |
| destroyed     | ❌          | ❌         | ❌         | 清理完成的通知/日志记录/全局状态清理（实例已不可用）                       |

### 生命周期钩子对比总结

| 特点                         | 说明                                                 |
| ---------------------------- | ---------------------------------------------------- |
| 首次进入 keep-alive 缓存组件 | `created → beforeMount → mounted → activated`        |
| 缓存后再次进入               | `activated`（不经过 created/mounted）                |
| 组件失活                     | `deactivated`（不经过 beforeDestroy）                |
| 组件被销毁（v-if=false）     | `deactivated`（如有）→ `beforeDestroy → destroyed`   |
| 子组件先于父组件挂载         | 子组件 `mounted` 先执行，父组件 `mounted` 后执行     |
| 子组件先于父组件销毁         | 子组件 `destroyed` 先执行，父组件 `destroyed` 后执行 |

## Vue3.x

### 生命周期

| Options API     | Composition API   | 可访问 data | 可访问 DOM | 主要用途                                                   |
| --------------- | ----------------- | ----------- | ---------- | ---------------------------------------------------------- |
| -               | setup() 本身      | ✅          | ❌         | 数据初始化、异步请求                                       |
| beforeMount     | onBeforeMount     | ✅          | ❌         | 最后的数据修改，DOM未生成                                  |
| mounted         | onMounted         | ✅          | ✅         | DOM操作、第三方库初始化                                    |
| beforeUpdate    | onBeforeUpdate    | ✅          | ✅(旧)     | 获取旧DOM状态，避免无限循环                                |
| updated         | onUpdated         | ✅          | ✅(新)     | 操作更新后的DOM                                            |
| activated       | onActivated       | ✅          | ✅         | keep-alive缓存组件激活时：刷新数据/开始轮询/恢复状态         |
| deactivated     | onDeactivated     | ✅          | ✅         | keep-alive缓存组件失活时：停止轮询/保存滚动位置/清理临时资源 |
| beforeUnmount   | onBeforeUnmount   | ✅          | ✅         | 清理资源（最重要）                                         |
| unmounted       | onUnmounted       | ❌          | ❌         | 清理完成的通知                                             |
| renderTracked   | onRenderTracked   | ✅          | ❌         | 开发调试：依赖被收集时                                     |
| renderTriggered | onRenderTriggered | ✅          | ❌         | 开发调试：依赖触发重渲染时                                 |
| errorCaptured   | onErrorCaptured   | ✅          | ✅         | 捕获子组件错误                                             |
