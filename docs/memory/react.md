# React

## 准备工作

### 环境配置

- Node.js 18+（npm 9+）
- pnpm 9+（使用 npm 安装）

### 编辑器

- VS Code
- WebStorm
- Trae CN
- 其他编辑器（如 IntelliJ IDEA 等）

## 构建工具

- Vite： 请查看 [Vite 的 React 教程](https://cn.vite.dev/guide/#scaffolding-your-first-vite-project) 以开始。
- Parcel： 请查看 [Parcel 的 React 教程](https://parceljs.org/recipes/react/#getting-started) 以开始。
- Rsbuild： 请查看 [Rsbuild 的 React 指南](https://rsbuild.rs/zh/guide/framework/react) 以开始。

## 生态系统

### 路由管理

> 路由 — 决定当用户访问特定 URL 时显示的内容或页面

- [React Router](https://reactrouter.com/start/data/custom)
- [Tanstack Router](https://tanstack.com/router)

### 数据获取

> 数据获取 — 从服务器或其他数据源获取数据

1️⃣ 大多数后端或 REST 风格的 API 获取数据，建议使用

- [React Query](https://tanstack.com/query/latest)
- [SWR](https://swr.vercel.app/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)

2️⃣ 从 GraphQL API 获取数据，建议使用

- [Apollo](https://www.apollographql.com/docs/react)
- [Relay](https://relay.dev/)

### 代码拆分

> 代码拆分 - 将应用程序分解为可以按需加载的小型包的过程

- [Vite 代码拆分](https://vite.dev/guide/features.html#build-optimizations)
- [Parcel 代码拆分](https://parceljs.org/features/code-splitting/)
- [Rsbuild 代码拆分](https://rsbuild.dev/guide/optimization/code-splitting)

### 状态管理库

- [Redux](https://redux.js.org/)
- [Zustand](https://zustand.docs.pmnd.rs/learn/getting-started/introduction)

### 提高应用性能

- 渲染模式
  - **单页面应用程序 (SPA)**: 加载单个 HTML 页面，并在用户与应用程序交互时动态更新页面。
  - **流式服务器端渲染 (SSR)**: 在服务器上渲染页面并将完全渲染的页面发送到客户端。
  - **静态站点生成 (SSG)**: 在构建时为你的应用生成静态 HTML 文件。
  - **React 服务器组件 (RSC)**: 允许你在单个 React 树中混合构建时、仅服务器和交互式组件。
- [React Compiler](https://reactjs.org/docs/react-compiler.html) - 提高 React 应用程序的性能，通过在构建时进行优化。
- [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) - 优化组件的渲染性能，通过缓存组件的渲染结果。

## 组件通信

### 简单组件通信

> 简单组件通信 — Props 传递数据/回调函数

- 父组件向子组件传递数据：通过 props 传递数据。
- 子组件向父组件传递数据: 通过回调函数（props 中的函数）传递数据。

### 复杂组件通信

> 复杂组件通信 — 状态提升/状态管理

- 状态提升：将状态提升到最近的公共父组件，以避免状态管理的复杂性。
- 统一管理状态：使用状态管理库（如 Redux、Zustand 等）来管理组件的状态。
- 逐级传递状态：在组件树中逐级传递状态，避免使用 props 传递状态。
  - 多级嵌套组件通信
  - 兄弟组件通信
- context API：在组件树中共享状态和方法，避免使用 props 传递状态。
  - 多级嵌套组件通信
  - 兄弟组件通信

::: info 若 `超过两个层级`的通信，`推荐`使用 `Redux` 去管理这个状态。

::: 

### 注意事项

::: tip 注意

React 官方并不建议大量使用 context，因为尽管它可以减少逐层传递，但当组件结构复杂的时候，我们并不知道 context 是从哪里传来的。context 就像一个全局变量，而全局变量正是导致应用走向混乱的罪魁祸首之一。

:::

3️⃣ 状态管理规范（约定）

- 当我们项目中复杂程度较低时，建议只用 state 就可以了
- 若仅仅因为存在多层传递数据的场景，不建议使用 mobx/redux，可使用 context 解决
- 若仅仅因为夸路由数据共享，不建议使用 mobx/redux，可使用 context/路由传参 解决
- 若业务复杂，需要使用第三方状态管理解决复杂度时
  - 复杂度一般，小规模团队或开发周期较短、要求快速上线时，推荐使用 mobx
  - 复杂度较高，团队规模较大或要求对事件分发处理可监控可回溯时，推荐使用 redux，可尝试使用 rematch / @reduxjs/toolkit，减少模板代码
- 若后端数据符合REST风格且数据格式统一且重复数据较多，推荐使用扁平化处理数据

## 状态管理库

- [Redux](https://redux.js.org/)
- [Zustand](https://zustand.docs.pmnd.rs/learn/getting-started/introduction)

## 代码规范工具

- Prettier
- ESLint
- Stylelint

## 测试工具

- Vitest + React Testing Library
- Jest + React Testing Library
