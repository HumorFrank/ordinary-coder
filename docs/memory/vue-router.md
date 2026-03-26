# Vue Router
> 你迷路了，它还能帮你重定向回正道。它让单页应用（SPA）像多页网站一样切换自如，页面跳转丝滑流畅，历史记录、动态路由、懒加载全都安排得明明白白。用 Vue Router，路由管理不再迷路，页面切换不再“尬住”，你的 Vue 项目也能“说走就走”！

## 路由模式(3种)
- **History/HTML5 History 模式**: `createWebHistory()`，需服务器配置回退路由，否则404。
- **Hash 模式**: `createWebHashHistory()`，有 `#`，不利于`SEO`优化。
- **Memory 模式**: `createMemoryHistory()`，适合 `Node` 环境和 `SSR`。

## 导航守卫
- **全局前置守卫**: `router.beforeEach` - 导航触发前执行
- **全局解析守卫**: `router.beforeResolve` - 导航确认前执行
- **全局后置守卫**: `router.afterEach` - 导航完成后执行
- **路由独享守卫**: `beforeEnter` - 特定路由的守卫
- **组件内守卫**
  - `beforeRouteEnter` - 在导航确认前被调用
  - `beforeRouteUpdate/onBeforeRouteUpdate` - 在当前路由改变，但是该组件被复用时调用
  - `beforeRouteLeave/onBeforeRouteLeave` - 在导航离开渲染该组件的对应路由时调用

## 完整的导航解析流程
- 1.导航被触发。
- 2.在失活的组件里调用 `beforeRouteLeave` 守卫。 
- 3.调用 `beforeEach` 全局前置守卫。
- 4.在重用的组件里调用 `beforeRouteUpdate` 守卫。
- 5.在路由配置里调用 `beforeEnter` 路由独享守卫。
- 6.解析异步路由组件。
- 7.在被激活的组件里调用 `beforeRouteEnter` 守卫。
- 8.调用 `beforeResolve` 全局解析守卫。
- 9.导航被确认。
- 10.调用 `afterEach` 全局后置守卫。
- 11.触发 DOM 更新。
- 12.调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 基于文件的路由
> [基于文件的路由](https://router.vuejs.org/zh/file-based-routing/): Vue Router 内置了基于文件的路由插件。它会自动从你的页面组件生成路由和类型，因此你不再需要手动维护 `routes` 数组。