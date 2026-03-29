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


## replaceState vs replace

1️⃣ 异同

- ✅ `history.replaceState` 是"静默"更新，不触发路由响应
- ✅ `router.replace` 会触发完整的导航流程

2️⃣ `history.replaceState` 与 `router.replace`对比

| `维度`            | `history.replaceState`       | `router.replace`              |
| ----------------- | ---------------------------- | ----------------------------- |
| **API层级**       | 浏览器原生 API               | Vue Router 封装 API           |
| **触发场景**      | 仅更新 URL                   | 完整的路由导航流程            |
| **导航守卫**      | ❌ 不触发                    | ✅ 触发全部守卫               |
| **组件生命周期**  | ❌ 不触发                    | ✅ 可能触发组件销毁/创建/更新 |
| **$route 响应性** | ❌ 不变                      | ✅ 响应式更新                 |
| **异步处理**      | ❌ 同步执行                  | ✅ 返回 Promise，支持异步     |
| **导航取消**      | ❌ 无法取消                  | ✅ 可通过守卫取消             |
| **滚动行为**      | ❌ 无影响                    | ✅ 触发滚动行为               |
| **性能开销**      | 极小                         | 较大（需要执行完整导航流程）  |
| **适用场景**      | 静默更新 URL，不改变应用状态 | 需要触发路由切换和状态更新    |

3️⃣ 实际场景对比

```js
// 场景1：使用 history.replaceState（静默更新）
// 适用：不希望在路由层面产生任何影响，只是单纯修改 URL
history.replaceState(null, "", "/user/123?tab=profile");
// 结果：
// - URL 变了 ✅
// - 页面不重新渲染 ❌
// - 不触发任何守卫 ❌
// - $route 对象不变 ❌

// 场景2：使用 router.replace（完整的路由切换）
router.replace("/user/123?tab=profile");
// 结果：
// - URL 变了 ✅
// - 触发全局守卫 beforeEach ✅
// - 触发组件守卫 beforeRouteUpdate ✅
// - $route 对象更新 ✅
// - 组件响应式更新 ✅
// - 触发 afterEach 守卫 ✅
```

4️⃣ 选择 `history.replaceState`与 `router.replace`的场景

- 选择 `history.replaceState`

```js
// 1. 修改 URL 但不影响页面状态（如过滤条件）
function updateFiltersWithoutRefresh(filters) {
  const url = new URL(location.href);
  Object.entries(filters).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  history.replaceState(null, "", url.toString());
  // 注意：需要手动同步组件状态
}

// 2. 第三方库集成，需要修改 URL 但不触发路由
function integrateWithThirdParty() {
  history.replaceState(null, "", "/special-view");
  // 手动触发第三方库的更新
  thirdPartyLibrary.update();
}
```

- 选择 `router.replace` 的场景

```js
// 1. 需要触发组件更新的路由切换
async function updateUserProfile() {
  await saveProfile();
  // 触发路由更新，组件会自动响应
  router.replace("/profile");
}

// 2. 需要利用导航守卫进行权限控制
router.replace("/admin"); // 会触发权限守卫检查

// 3. 需要异步等待路由切换完成
try {
  await router.replace("/dashboard");
  console.log("导航成功");
} catch (err) {
  console.log("导航被取消或失败");
}
```

5️⃣ 注意事项
> 在 Vue 项目中，除非有特殊需求，否则优先使用 `router.replace`

## 路由传参

### 传参方式

- 方式1: `path + query`
- 方式2: `name + params`
- 方式3: 手动建立 `url`，但我们必须自己处理编码（不推荐）。
  - Example: `/user/${username}`

### 传参区分

- `/path/xxx/sss`: 是 `params` 传参
- `/path/xxx?key=value`: 是 `query` 传参


## 基于文件的路由
> [基于文件的路由](https://router.vuejs.org/zh/file-based-routing/): Vue Router 内置了基于文件的路由插件。它会自动从你的页面组件生成路由和类型，因此你不再需要手动维护 `routes` 数组。