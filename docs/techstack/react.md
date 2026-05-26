# React

> React 与 React Native 技术栈全景 —— 从 Web 架构到移动跨端，覆盖核心差异、生态选型与工程实践

React 生态的核心决策不是"选哪个库"，而是理解 React 的设计哲学 —— UI = f(state)。本专题梳理 React Web 与 React Native 的核心差异、共享策略与各自生态选型，帮助你构建完整的技术认知地图。

## React vs React Native

### 一句话总结

**React**（React.js）是构建 Web 界面的 JavaScript 库，操作 DOM；**React Native** 是构建原生移动应用的框架，操作原生 UI 组件。两者共享 React 核心（组件、状态、JSX、Hooks），但渲染目标不同。

### 核心差异

| 维度         | React (React DOM)                      | React Native                                      |
| ------------ | -------------------------------------- | ------------------------------------------------- |
| **定位**     | Web 前端 UI 库                         | 移动端跨平台框架                                  |
| **渲染目标** | 浏览器 DOM / HTML                      | iOS / Android 原生 UI                             |
| **平台**     | Web（PC、移动浏览器）                  | Android、iOS（以及 tvOS、visionOS 等）            |
| **组件体系** | HTML 元素（`div`、`span`、`input` 等） | 原生组件（`View`、`Text`、`TextInput` 等）        |
| **样式方案** | CSS / CSS-in-JS / Tailwind 等          | Flexbox 布局（Yoga 引擎），StyleSheet API，无 CSS |
| **导航**     | React Router 等                        | React Navigation / Expo Router                    |
| **动画**     | CSS Animation / Framer Motion / GSAP   | Animated API / Reanimated / LayoutAnimation       |
| **调试工具** | Chrome DevTools / React DevTools       | Flipper / React DevTools / Expo Dev Tools         |
| **打包**     | Webpack / Vite / Turbopack             | Metro bundler                                     |
| **发布方式** | 靼态资源部署到服务器 / CDN             | App Store / Google Play / OTA 热更新              |

### 架构对比

```
React (Web):
  JSX → React.createElement → Virtual DOM → ReactDOM → 真实 DOM → 浏览器渲染

React Native:
  JSX → React.createElement → Virtual DOM → React Native Bridge / JSI → 原生 UI 组件 → 系统渲染
```

- **React DOM**：通过 `react-dom` 包将虚拟 DOM 映射为浏览器 DOM 操作
- **React Native**：通过 Bridge（旧架构）或 JSI / Fabric（新架构）将虚拟 DOM 映射为原生平台组件

#### React Native 新旧架构对比

| 特性         | 旧架构（Bridge）                                 | 新架构（Fabric + TurboModules + JSI）                 |
| ------------ | ------------------------------------------------ | ----------------------------------------------------- |
| **通信方式** | 异步 Bridge（JSON 序列化），JS → Native 串行传递 | JSI（JavaScript Interface），JS 直接调用 Native，同步 |
| **线程模型** | JS 线程、UI 线程、Shadow 线程分离                | 多线程可配，支持同步渲染                              |
| **渲染引擎** | Shadow Tree（旧）                                | Fabric Renderer                                       |
| **性能**     | Bridge 存在拥塞瓶颈                              | 更低延迟，接近原生性能                                |
| **组件**     | Native UI 组件                                   | Fabric Native Components                              |

### 代码层面差异

#### 组件映射

```jsx
// React (Web)
<div>
  <h1>Hello World</h1>
  <input type="text" value={text} onChange={handleChange} />
  <button onClick={handleClick}>Click</button>
</div>

// React Native
<View>
  <Text style={{ fontSize: 24 }}>Hello World</Text>
  <TextInput value={text} onChangeText={setText} />
  <Button onPress={handleClick} title="Click" />
</View>
```

| React (Web)                      | React Native                  | 说明                           |
| -------------------------------- | ----------------------------- | ------------------------------ |
| `<div>`                          | `<View>`                      | 容器组件                       |
| `<span>` / `<p>` / `<h1>`-`<h6>` | `<Text>`                      | 所有文本必须包裹在 `<Text>` 内 |
| `<input>`                        | `<TextInput>`                 | 文本输入                       |
| `<button>`                       | `<Button>` / `<Pressable>`    | 按钮，RN 建议用 `Pressable`    |
| `<img>`                          | `<Image>`                     | 图片                           |
| `<ul>` / `<ol>`                  | `<FlatList>` / `<ScrollView>` | 列表                           |
| `onClick`                        | `onPress`                     | 点击事件                       |
| `className`                      | `style`                       | 样式传递                       |

#### 样式差异

```jsx
// React (Web) — CSS
.box {
  display: flex;
  justify-content: center;
  padding: 16px;
  background-color: blue;
}

// React Native — StyleSheet
const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "blue",
  },
});
```

| CSS (Web)                               | React Native StyleSheet                 |
| --------------------------------------- | --------------------------------------- |
| 全部 CSS 属性可用                       | 仅支持 Flexbox 布局 + 部分 CSS 属性子集 |
| 属性名用 kebab-case：`background-color` | 属性名用 camelCase：`backgroundColor`   |
| 数值单位：px、rem、em、%                | 纯数字（逻辑像素），无需单位            |
| 选择器、伪类、媒体查询                  | 不支持，通过 JS 逻辑实现                |
| `display: block/inline/flex/grid`       | 默认 `flex`，不支持 `grid`              |
| 层叠优先级、继承                        | 无层叠；通过 JS 继承样式对象            |

#### 平台 API 差异

```jsx
// React (Web) — 浏览器 API
window.localStorage.setItem("key", "value");
document.getElementById("app");
fetch("/api/data");

// React Native — 跨平台 API
import AsyncStorage from "@react-native-async-storage/async-storage";
AsyncStorage.setItem("key", "value");

// 使用 ref 而不是 DOM 查询
const viewRef = useRef(null);

// fetch 同样可用
fetch("https://api.example.com/data");
```

### 共享与复用

#### 可共享的部分

- ✅ React 核心（Hooks、Context、ref、Suspense 等）
- ✅ 业务逻辑（自定义 Hooks、状态管理 Redux/Zustand）
- ✅ 数据层（API 请求、数据处理、数据验证）
- ✅ 类型定义（TypeScript interfaces / types）
- ✅ 工具函数

#### 不可共享的部分

- ❌ UI 组件（`div` vs `View`）
- ❌ 样式（CSS vs StyleSheet）
- ❌ 路由（React Router vs React Navigation）
- ❌ 平台特定 API（DOM API vs Native API）

#### Monorepo 中的常见共享策略

```
packages/
├── shared/            # 共享业务逻辑、Hooks、类型
│   ├── hooks/
│   ├── utils/
│   └── types/
├── ui-web/            # React DOM 组件
├── ui-native/         # React Native 组件
└── app-web/           # Next.js / Vite 项目
└── app-mobile/        # Expo / React Native 项目
```

### 开发体验对比

| 维度             | React (Web)                      | React Native                             |
| ---------------- | -------------------------------- | ---------------------------------------- |
| **开发环境**     | 浏览器 + DevTools                | 模拟器 / 真机 / Expo Go                  |
| **热更新速度**   | 极快（Vite HMR）                 | 较快（Fast Refresh）                     |
| **UI 调试**      | Chrome DevTools 直接查看 DOM/CSS | 无 DOM 检查，通过 RN DevTools / Flipper  |
| **生产部署**     | `npm run build` → CDN            | `npx expo build` /Archive → 应用商店审核 |
| **第三方库生态** | 极丰富（npm 全部可用）           | 丰富（需兼容 RN 环境，无 DOM 依赖）      |
| **学习曲线**     | 中等（需了解 HTML/CSS 基础）     | 较高（需了解原生平台概念 + RN 限制）     |

### 选择建议

| 场景                            | 推荐方案                           |
| ------------------------------- | ---------------------------------- |
| Web 网站 / 后台管理 / H5 活动页 | React                              |
| 跨平台移动 App（Android + iOS） | React Native                       |
| 同时需要 Web + 移动端           | React + React Native 共享业务逻辑  |
| 高性能游戏 / AR / 复杂原生交互  | 原生开发（Swift/Kotlin）或 Flutter |
| 快速验证 MVP 移动应用           | React Native（Expo）               |

## 构建 React 应用

### 官方推荐的生产级框架

React 官方文档明确建议**新项目使用框架**开始，框架提供了 React 应用所需的路由、数据获取、构建等开箱即用的能力。

#### 1. Next.js（Vercel 维护）

当前 React 生态中最主流的全栈框架，完整实现 React Server Components（RSC）规范。

```bash
npx create-next-app@latest
```

**核心特性：**

- **App Router**：基于文件系统的路由，支持 React Server Components、Suspense 数据获取
- **渲染模式全覆盖**：SSR、SSG、ISR、CSR，可按路由粒度选择
- **Server Actions**：在服务端执行的函数，无需手动创建 API 路由即可处理表单提交和数据变更
- **Route Handlers**：基于 Web 标准 API（Request/Response）的 API 路由
- **Middleware**：基于 Edge Runtime 的请求拦截
- **内置优化**：图片（`next/image`）、字体（`next/font`）、脚本加载等
- **部署灵活**：支持 Node.js、Docker 容器、静态导出，也可部署至 Vercel 等平台

#### 2. React Router v7（Shopify 维护）

从路由库演进为全栈框架，强调标准 Web API，前身为 Remix。

```bash
npx create-react-router@latest
```

**核心特性：**

- **标准 Web API 优先**：直接使用 `Request`/`Response`、`FormData`、`URL` 等
- **多运行时支持**：可部署至 Node.js、Deno、Cloudflare Workers、Netlify 等多种环境
- **嵌套路由**：成熟的嵌套布局和数据加载方案
- **loader / action 模式**：每个路由有独立的服务端数据加载和变更函数

#### 3. Expo — 同时支持 Web + 原生移动端

React 官方推荐的通用跨平台方案，一套代码同时覆盖 Web、Android、iOS。

```bash
npx create-expo-app@latest
```

### 新兴框架

| 框架               | 特点                                                          | 状态 |
| ------------------ | ------------------------------------------------------------- | ---- |
| **TanStack Start** | TanStack Router + Nitro + Vite，SSR/流式传输/Server Functions | Beta |
| **RedwoodSDK**     | 全栈框架，预装大量依赖和配置，集成度高                        | 稳定 |

::: info 选择框架

React 官方已明确不推荐新项目裸用 CRA（Create React App）。选择框架意味着获得路由、SSR、数据获取等开箱即用的能力，而非自己从零搭建。
:::

### 构建工具（自建方案）

当现有框架无法满足需求或仅用于学习时，可使用以下构建工具自行搭建：

| 工具          | 特点                                                  |
| ------------- | ----------------------------------------------------- |
| **Vite**      | 极速 HMR，Rollup 打包，Vue/React 原生支持，生态最活跃 |
| **Parcel**    | 零配置，开箱即用，适合中小项目快速启动                |
| **RSbuild**   | 基于 Rust（Rspack），高性能，取代 Webpack 场景        |
| **Turbopack** | Next.js 团队维护的 Rust 打包器，Next.js 内置使用      |

### 状态管理库

| 库                | 特点                                              | 适用场景               |
| ----------------- | ------------------------------------------------- | ---------------------- |
| **Redux Toolkit** | React 生态最广泛的状态管理，含 RTK Query 数据获取 | 大型项目、复杂全局状态 |
| **Zustand**       | 轻量（~1KB），API 极简，无 boilerplate            | 中小型项目首选         |
| **Jotai**         | 原子化状态，按组件粒度订阅，自动优化渲染          | 需要细粒度响应式       |
| **Valtio**        | 基于 Proxy 的响应式状态，直接修改对象             | 简单直观的全局状态     |
| **MobX**          | 基于装饰器的响应式，OOP 风格                      | 习惯 OOP 模式的团队    |

### 数据获取

| 方案                              | 特点                                               |
| --------------------------------- | -------------------------------------------------- |
| **TanStack Query（React Query）** | 服务端状态管理，缓存/重试/轮询/乐观更新，最主流    |
| **SWR**                           | Vercel 出品，stale-while-revalidate 策略，API 极简 |
| **RTK Query**                     | Redux Toolkit 内置，与 Redux 无缝集成              |
| **Apollo Client**                 | GraphQL 首选，缓存/订阅/本地状态                   |

### 路由

| 库                  | 特点                                          |
| ------------------- | --------------------------------------------- |
| **React Router**    | 最成熟的路由方案，v7 之后自带框架能力         |
| **TanStack Router** | TypeScript 优先，类型安全的路由参数和搜索参数 |

### CSS / 样式方案

| 方案                  | 特点                                            |
| --------------------- | ----------------------------------------------- |
| **Tailwind CSS**      | 原子化 CSS，当前最主流，配合类名排序和设计令牌  |
| **CSS Modules**       | 原生支持（Vite/Next.js 内置），局部作用域无冲突 |
| **Styled Components** | CSS-in-JS 经典方案，动态样式能力强              |
| **Panda CSS**         | 编译时 CSS-in-JS，零运行时开销                  |
| **Vanilla Extract**   | TypeScript 编写 CSS，编译时生成静态 CSS 文件    |

### UI 组件库

| 库                    | 特点                                                |
| --------------------- | --------------------------------------------------- |
| **shadcn/ui**         | 复制粘贴式组件库，Tailwind + Radix 底层，完全可定制 |
| **Ant Design**        | 企业级中文生态最丰富的组件库                        |
| **MUI (Material UI)** | Material Design 规范，组件完善，主题系统强大        |
| **Chakra UI**         | 基于设计令牌，开发体验好，可访问性内置              |
| **Radix UI**          | 无样式基元组件（Headless），可访问性完善的底层库    |

### 测试

| 工具                      | 特点                                          |
| ------------------------- | --------------------------------------------- |
| **Jest**                  | 最广泛的单元/集成测试框架                     |
| **Vitest**                | Vite 生态测试框架，与 Jest API 兼容，速度更快 |
| **React Testing Library** | 以用户视角测试组件行为，React 官方推荐        |
| **Playwright**            | 微软出品，端到端测试，支持多浏览器并行        |
| **Cypress**               | E2E 测试先驱，实时重载，调试体验好            |

### 技术选型速查

| 项目类型         | 推荐组合                                          |
| ---------------- | ------------------------------------------------- |
| 全栈 Web 应用    | Next.js + Tailwind CSS + TanStack Query + Zustand |
| SPA 后台管理     | Vite + React Router + shadcn/ui + Zustand         |
| 静态博客/文档    | Next.js (静态导出) / Astro + MDX                  |
| 跨平台移动 + Web | Expo + React Navigation                           |
| 企业级中台       | Next.js / Vite + Ant Design + Redux Toolkit       |

## 构建 React Native 应用

### 官方推荐方式 — Expo

React Native 官方强烈推荐使用 **Expo** 框架启动新项目，不推荐裸用 React Native CLI。

```bash
npx create-expo-app@latest
```

**Expo 核心能力：**

- **文件路由（Expo Router）**：基于文件系统的路由，类似 Next.js App Router
- **跨平台**：同时支持 Android、iOS、tvOS、Web
- **通用原生模块标准库**：Camera、Location、Notifications 等开箱即用
- **Expo Go**：手机端调试 App，无需编译即可预览
- **EAS（Expo Application Services）**：云端构建、提交应用商店、OTA 热更新

::: warning 警告

React Native 官方已明确不推荐新项目使用裸 RN CLI。Expo 提供了完整的开发、构建、发布流程，只有在需要深度定制原生层时才考虑裸工作流。

:::

### React Native CLI（裸工作流）

不推荐用于新项目，仅在以下场景考虑：

- 应用有特殊原生约束（如自定义原生模块框架不满足）
- 需要完全控制原生层的配置和构建管线
- 将 React Native 集成到已有原生 App 中

```bash
npx @react-native-community/cli init MyApp
```

### 导航

| 库                   | 特点                                                |
| -------------------- | --------------------------------------------------- |
| **React Navigation** | RN 导航事实标准，支持 Stack/Tab/Drawer 等多种导航器 |
| **Expo Router**      | Expo 团队维护，文件路由，基于 React Navigation 底层 |

### 状态管理

React Web 的状态管理库在 RN 中同样可用：**Zustand**、**Redux Toolkit**、**Jotai** 均可正常运行，因为它们不依赖 DOM。

### 数据持久化

| 库                    | 特点                                                   |
| --------------------- | ------------------------------------------------------ |
| **AsyncStorage**      | 键值对异步存储，轻量方案                               |
| **expo-secure-store** | 安全存储（Keychain / Keystore），适合 Token 等敏感数据 |
| **WatermelonDB**      | 基于 SQLite 的高性能本地数据库，支持懒加载和增量更新   |
| **Realm**             | 嵌入式对象数据库，MongoDB 维护                         |

### UI 组件库

| 库                        | 特点                                            |
| ------------------------- | ----------------------------------------------- |
| **React Native Elements** | 跨平台 UI 组件库，组件丰富                      |
| **NativeBase**            | 基于设计令牌的组件库，支持自定义主题            |
| **React Native Paper**    | Material Design 3 实现，Google 风格             |
| **Tamagui**               | 编译时优化，同时支持 Web 和 Native，性能好      |
| **gluestack-ui**          | NativeBase 团队新作，基于 Tailwind 的通用组件库 |

### 动画

| 库                          | 特点                                         |
| --------------------------- | -------------------------------------------- |
| **React Native Reanimated** | 高性能动画库，在 UI 线程执行动画，60fps 流畅 |
| **React Native Skia**       | Shopify 维护，基于 Skia 引擎的 2D 图形绘制   |
| **Lottie**                  | After Effects 动画直接导出 JSON 渲染         |
| **Moti**                    | 基于 Reanimated 的声明式动画库，API 极简     |

### 构建与发布

| 工具           | 特点                                              |
| -------------- | ------------------------------------------------- |
| **EAS Build**  | Expo 云端构建，免本地 Xcode / Android Studio 环境 |
| **EAS Submit** | 一键提交至 App Store / Google Play                |
| **EAS Update** | OTA 热更新，绕过应用商店审核快速修复 Bug          |
| **Fastlane**   | 开源原生部署自动化工具，适用于裸工作流            |

### 其他关键工具

| 工具                             | 用途                                                          |
| -------------------------------- | ------------------------------------------------------------- |
| **React Native Screens**         | 原生屏幕容器，优化导航性能                                    |
| **React Native Gesture Handler** | 原生手势库，提供平台原生级别的手势响应                        |
| **React Native MMKV**            | 高性能同步键值存储（基于微信 MMKV），比 AsyncStorage 快 30 倍 |
| **Expo Dev Client**              | 自定义开发客户端，支持原生模块调试                            |
| **Reactotron**                   | React Native / React 桌面调试工具                             |

### 技术选型速查

| 项目类型             | 推荐组合                                         |
| -------------------- | ------------------------------------------------ |
| 移动 App 新项目      | Expo + Expo Router + React Navigation + Zustand  |
| 跨平台（Web + 移动） | Expo + Tamagui + React Navigation                |
| 已有原生 App 集成    | React Native CLI + React Navigation              |
| 高性能动画密集型     | React Native Reanimated + React Native Skia      |
| 企业级离线优先       | WatermelonDB + Redux Toolkit + React Native MMKV |
