# Svelte

> Svelte 与 SvelteKit 技术栈全景 —— 编译时框架的极简哲学，从 Runes 响应式到全栈应用构建

Svelte 的核心理念是将框架的工作从运行时移至编译时 —— 没有虚拟 DOM、没有运行时 diff、没有 Proxy 劫持，编译器直接生成精确的 DOM 更新代码。本专题梳理 Svelte 5 的 Runes 响应式、SvelteKit 全栈框架及生态选型。

## Svelte 核心理念

### Svelte vs 传统框架

| 维度           | React / Vue                      | Svelte                                 |
| -------------- | -------------------------------- | -------------------------------------- |
| **工作时机**   | 运行时（浏览器中执行框架代码）   | 编译时（构建阶段将组件编译为原生 JS）  |
| **虚拟 DOM**   | 有（运行时 diff + patch）        | 无（编译器直接生成精确 DOM 操作）      |
| **运行时体积** | 框架本身需要加载（React ~40KB+） | 仅生成应用本身的代码，框架几乎零运行时 |
| **响应式**     | Hooks / Proxy 劫持               | 编译时信号追踪（Svelte 5 Runes）       |
| **心智模型**   | 声明式 UI = f(state)             | 声明式 + 近似原生写法，直觉式          |
| **更新粒度**   | 组件级（需手动 memo 优化）       | 编译器精确追踪变量级依赖，自动优化     |

## Svelte 5 — Runes 响应式

Svelte 5 引入 **Runes**，统一了响应式原语。Runes 是以 `$` 为前缀的特殊函数，编译器识别后自动处理依赖追踪和更新触发。

### 核心 runes

```svelte
<script>
  // $state — 声明响应式状态
  let count = $state(0);

  // $derived — 派生计算值（自动追踪依赖）
  let doubled = $derived(count * 2);

  // $effect — 副作用（自动追踪依赖，依赖变化时重新执行）
  $effect(() => {
    console.log(`count is ${count}`);
  });

  // $bindable — 组件可双向绑定的 prop
  let { value = $bindable() } = $props();

  // $props — 声明组件 props
  let { name, age } = $props();

  // $inspect — 调试（开发时打印响应式值）
  $inspect(count);
</script>
```

### Runes 与 React Hooks 对比

| Runes         | React Hooks   | 差异                                 |
| ------------- | ------------- | ------------------------------------ |
| `$state()`    | `useState()`  | Runes 可在组件外使用；自动深度响应   |
| `$derived()`  | `useMemo()`   | 无需手动声明依赖数组，编译器自动追踪 |
| `$effect()`   | `useEffect()` | 无需依赖数组；仅在依赖变化时执行     |
| `$props()`    | 函数参数      | Runes 可声明默认值和绑定能力         |
| `$bindable()` | 回调 props    | 原生双向绑定支持                     |

::: info Info
Runes 的核心优势：**无需手动声明依赖**。编译器在构建时分析代码，自动追踪所有响应式依赖，既避免了 React `useEffect` 依赖数组的常见陷阱，又获得了比 Vue `Proxy` 更精确的更新粒度。
:::

## SvelteKit — 全栈框架

SvelteKit 是 Svelte 官方全栈框架，类比 Next.js 之于 React、Nuxt 之于 Vue。

```bash
npx sv create
```

### 核心特性

| 特性                      | 说明                                                            |
| ------------------------- | --------------------------------------------------------------- |
| **文件路由**              | `src/routes/` 目录自动生成路由                                  |
| **渲染模式**              | SSR（默认）、SSG、SPA、Prerendering                             |
| **Server Load Functions** | `+page.server.ts` 在服务端加载数据                              |
| **Server Actions**        | `+page.server.ts` 中的 form actions 处理数据变更                |
| **Layout 系统**           | `+layout.svelte` / `+layout.ts` 共享布局和数据                  |
| **API Routes**            | `+server.ts` 定义 REST/GraphQL API                              |
| **Adapter**               | 适配多种部署目标（Node、Vercel、Cloudflare、Netlify、静态导出） |

### 路由示例

```
src/routes/
├── +layout.svelte       # 根布局
├── +page.svelte         # 首页 /
├── about/
│   └── +page.svelte     # /about
├── blog/
│   ├── +page.svelte     # /blog
│   ├── +page.ts         # 通用数据加载
│   ├── +page.server.ts  # 服务端数据加载
│   └── [slug]/
│       └── +page.svelte # /blog/:slug
└── api/
    └── +server.ts       # API 路由
```

### 数据加载

```ts
// +page.server.ts — 服务端加载
export async function load({ params, fetch }) {
  const post = await fetch(`/api/posts/${params.slug}`);
  return { post: await post.json() };
}
```

```svelte
<!-- +page.svelte — 使用数据 -->
<script>
  let { data } = $props();
</script>

<h1>{data.post.title}</h1>
```

## 生态工具链

### UI 组件库

| 库                | 特点                                              |
| ----------------- | ------------------------------------------------- |
| **shadcn-svelte** | shadcn/ui 的 Svelte 版本，Tailwind + Bits UI 底层 |
| **Skeleton**      | Svelte 生态最活跃的 UI 库，Tailwind 驱动          |
| **Bits UI**       | 无样式基元组件（Headless），可访问性内置          |
| **daisyUI**       | Tailwind 组件库，支持 Svelte                      |

### 样式方案

| 方案              | 特点                              |
| ----------------- | --------------------------------- |
| **Tailwind CSS**  | Svelte 生态主流原子化方案         |
| **UnoCSS**        | 更快的原子化引擎，完全可定制      |
| **Scoped Styles** | SFC 内置 `<style>` 自动局部作用域 |

### 状态管理

| 方案                           | 特点                               |
| ------------------------------ | ---------------------------------- |
| **Runes（$state / $derived）** | Svelte 5 内置，大多数场景已足够    |
| **Svelte Stores**              | Svelte 4 遗留方案，Svelte 5 仍兼容 |
| **nanostores**                 | 极简响应式 store，框架无关         |

### 数据获取

| 方案                         | 特点                                     |
| ---------------------------- | ---------------------------------------- |
| **SvelteKit Load Functions** | 服务端/通用数据加载，内置方案            |
| **TanStack Query (Svelte)**  | 客户端服务端状态管理，缓存/重试/乐观更新 |

### 测试

| 工具                         | 特点                                  |
| ---------------------------- | ------------------------------------- |
| **Vitest**                   | Vite 生态测试框架，SvelteKit 内置支持 |
| **Playwright**               | 端到端测试                            |
| **Testing Library (Svelte)** | 组件测试，以用户视角测试              |

### 动画

| 库                     | 特点                                    |
| ---------------------- | --------------------------------------- |
| **Svelte Transitions** | 内置 `transition:` 指令，声明式过渡动画 |
| **Svelte Motion**      | 内置 `tweened` / `spring` 响应式动画    |
| **Motion One**         | 轻量动画库，Svelte 适配                 |

### 跨平台

| 方案                      | 特点                                   |
| ------------------------- | -------------------------------------- |
| **Svelte Native**         | Svelte + React Native 渲染器，社区维护 |
| **Capacitor + SvelteKit** | Web 方式构建移动应用                   |
| **Tauri + SvelteKit**     | Rust 驱动的桌面应用                    |

## 技术选型速查

| 项目类型      | 推荐组合                             |
| ------------- | ------------------------------------ |
| 全栈 Web 应用 | SvelteKit + Tailwind CSS + Runes     |
| 静态博客/文档 | SvelteKit (Prerender) + MDSveX       |
| SPA 应用      | SvelteKit (SPA mode) + shadcn-svelte |
| 桌面应用      | SvelteKit + Tauri                    |
| 轻量交互组件  | Svelte (Library mode)                |

## Svelte 适用场景

| 适合                                 | 不太适合                         |
| ------------------------------------ | -------------------------------- |
| 中小型 Web 应用                      | 超大型企业级应用（生态规模有限） |
| 性能敏感场景（首屏加载、低功耗设备） | 依赖大量 React/Vue 专有库的场景  |
| 追求极简开发体验的团队               | 团队缺乏 Svelte 经验且招聘困难   |
| 静态站点、文档站                     | 需要深度原生集成的移动应用       |
| 嵌入式 Web 组件（Web Components）    | 需要成熟微前端方案的团队         |

::: warning 警告
Svelte 的生态成熟度仍不如 React/Vue。在选型前，务必确认所需的 UI 库、工具链是否有 Svelte 版本或替代方案。Svelte 5 的 Runes 仍处于快速演进期，API 可能存在变动。
:::
