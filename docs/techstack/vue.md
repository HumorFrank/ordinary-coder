# Vue 3

> Vue 3 生态技术栈全景 —— 从脚手架、全栈框架、状态管理到跨端方案，覆盖项目选型全链路

整理自 [Vue 官方文档](https://cn.vuejs.org/)、[Nuxt](https://nuxt.com/)、[GitHub](https://github.com/) 等资源，覆盖 Vue 3 生态高频技术栈与选型指南。选型不是堆工具，而是理解每个工具解决什么问题、在什么场景下优于替代方案。

## 汇总表

| 章节              | 内容                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------- |
| 创建项目          | create-vue、CDN 方式、Petite-Vue                                                              |
| 全栈框架          | Nuxt（SSR/SSG/混合渲染/Nitro）、Quasar（跨平台）、VitePress（文档）、Slidev（PPT）            |
| 状态管理          | Pinia（官方）、TanStack Query、provide/inject、shared ref                                     |
| 路由              | Vue Router、unplugin-vue-router（文件路由）                                                   |
| UI 组件库         | Element Plus、Naive UI、Vuetify、Ant Design Vue、PrimeVue、Headless UI、Radix Vue、Shadcn Vue |
| 构建工具          | Vite、Rolldown、Nuxt CLI、Turbopack                                                           |
| CSS / 样式        | UnoCSS、Tailwind CSS、CSS Modules、CSS Scoped                                                 |
| 数据获取          | TanStack Query、Axios、ofetch、Apollo Client                                                  |
| Composables       | VueUse（Browser / Sensors / Animation / State / Network 等分类）                              |
| 测试              | Vitest、Vue Test Utils、Playwright、Cypress                                                   |
| 跨平台 & 桌面     | Quasar、Tauri、Ionic Vue、uni-app                                                             |
| 国际化 & 开发工具 | vue-i18n、Volar、unplugin 系列                                                                |
| 权限管理 & 中后台 | vue-pure-admin、Vue Vben Admin                                                                |
| Nuxt 模块         | image、content、i18n、auth、supabase 等 10+ 模块                                              |
| 技术选型速查      | 8 种项目类型的推荐技术组合 + 社区推荐启动模板                                                 |

## 创建项目

### 官方推荐 — create-vue

Vue 3 官方脚手架，基于 Vite，创建时按需勾选功能。

```bash
npm create vue@latest
```

交互式选择：

| 可选功能                          | 说明           |
| --------------------------------- | -------------- |
| TypeScript                        | 类型支持       |
| JSX                               | JSX/TSX 支持   |
| Vue Router                        | 官方路由       |
| Pinia                             | 官方状态管理   |
| Vitest                            | 单元测试       |
| Playwright / Cypress / Nightwatch | 端到端测试     |
| ESLint                            | 代码检查       |
| Prettier                          | 代码格式化     |
| Vue DevTools 7                    | 浏览器调试工具 |

### 无需构建的 CDN 方式

适用于轻量场景或渐进式增强。

```html
<!-- 全局构建 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- ES 模块构建 -->
<script type="module">
  import {
    createApp,
    ref,
  } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
</script>
```

### Petite-Vue

适用于类似 jQuery / Alpine.js 的轻量渐进式增强场景，仅 ~6KB。

```html
<script src="https://unpkg.com/petite-vue"></script>
<div v-scope="{ count: 0 }">
  <button @click="count++">{{ count }}</button>
</div>
```

## 全栈框架

### 1. Nuxt — Vue 生态最主流的全栈框架

```bash
npx nuxi init my-app
```

**核心特性：**

- **文件路由**：基于 `pages/` 目录自动生成路由
- **自动导入**：components/、composables/、utils/ 中的内容无需手动 import，支持 tree-shaking
- **渲染模式**：SSR（默认）、SSG（静态生成）、CSR、ISR、SWR，可按路由粒度混合配置
- **Nitro 服务端引擎**：从 `server/api/` 自动生成 API 路由，支持 Node.js / Serverless / Workers / Edge 多种部署
- **零配置 TypeScript**：自动生成类型和 `tsconfig.json`
- **HMR 开发体验**：Vite 驱动的热更新
- **模块生态**：官方和社区模块（PWA、SEO、Auth、Content 等）

**三种渲染模式：**

```ts
export default defineNuxtConfig({
  // SSR — 默认，请求时服务端渲染
  // SSG — 构建时预渲染
  nitro: { prerender: { routes: ["/"] } },

  routeRules: {
    "/": { prerender: true }, // SSG
    "/blog/**": { swr: 3600 }, // ISR
    "/admin/**": { ssr: false }, // SPA
  },
});
```

### 2. Quasar

企业级跨平台框架，一套代码同时构建 SPA、SSR、PWA、移动 App（Capacitor/Cordova）、桌面应用（Electron）。

```bash
npm create quasar
```

**核心特性：**

- Material Design 两套主题（Material 2 / 3、iOS 风格）
- 内置丰富的 UI 组件（表格、对话框、编辑器等）
- CLI 驱动的生成器（组件、页面、store、boot 文件）
- 构建目标：SPA、SSR、PWA、BEX（浏览器扩展）、Mobile、Electron
- App Extension 系统

### 3. VitePress

Vue 团队维护的静态站点生成器（SSG），基于 Vite，用于文档和博客。

```bash
npx vitepress init
```

**核心特性：**

- Markdown 为中心，支持 Vue 组件嵌入 Markdown
- 极快的 HMR 和构建速度
- 内置搜索、主题定制、国际化

### 4. Slidev

Vue 团队维护的基于 Markdown 的演示文稿工具，开发者友好。

## 状态管理

### Pinia（官方推荐，Vuex 5 替代）

```bash
npm install pinia
```

**核心特性：**

- 完整的 TypeScript 类型推导
- 模块化设计，无需命名空间
- 支持 Composition API 和 Options API 两种写法
- DevTools 集成、热更新、插件系统
- 去掉了 Mutation（直接用 action 修改 state）

```ts
// stores/counter.ts
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const double = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  return { count, double, increment };
});
```

### 其他状态管理方案

| 方案                            | 特点                                    |
| ------------------------------- | --------------------------------------- |
| **Pinia**                       | 官方推荐，首选                          |
| **Vuex 4**                      | 遗留项目维护，Vue 3 兼容                |
| **TanStack Query（Vue Query）** | 服务端状态管理，缓存/重试/轮询/乐观更新 |
| **provide/inject**              | 轻量级依赖注入，适合组件树内共享        |
| **shared ref / composable**     | 纯响应式变量 + 组合式函数，最简单方案   |

## 路由

### Vue Router（官方路由）

```bash
npm install vue-router
```

**核心特性：**

- 基于文件路由（unplugin-vue-router）和代码式路由两种方式
- 嵌套路由、命名视图、路由守卫
- 动态路由匹配、路由参数
- 支持 History（HTML5）和 Hash 两种模式
- 懒加载：`() => import("./views/About.vue")`

```ts
// router/index.ts
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../views/Home.vue") },
    { path: "/user/:id", component: () => import("../views/User.vue") },
  ],
});

// 路由守卫
router.beforeEach((to, from) => {
  // 权限检查逻辑
});
```

### unplugin-vue-router

基于文件系统的类型安全路由，由 Vue 团队推荐的新一代方案：

```bash
npm install -D unplugin-vue-router
```

`pages/` 目录自动生成路由和类型推导，类似 Nuxt 的路由体验。

## UI 组件库

| 组件库                | 特点                                            | 适用场景                        |
| --------------------- | ----------------------------------------------- | ------------------------------- |
| **Element Plus**      | Vue 3 最流行的中文生态组件库，社区活跃          | 中后台、企业应用                |
| **Naive UI**          | 高性能，完整 TypeScript，Tree-shaking 优秀      | 现代化中后台                    |
| **Vuetify**           | Material Design 3，组件丰富，主题系统强大       | 需要 Material Design 风格的项目 |
| **Ant Design Vue**    | Ant Design 的 Vue 实现，企业级组件库            | 中后台管理系统                  |
| **PrimeVue**          | 主题丰富（Material、Tailwind、Aura 等），组件多 | 多主题需求项目                  |
| **Headless UI (Vue)** | Tailwind CSS 团队出品，无样式基元组件           | 自定义设计系统                  |
| **Radix Vue**         | 无样式可访问性基元组件                          | 构建自定义组件库                |
| **Shadcn Vue**        | Shadcn/ui 的 Vue 版本                           | 配合 Tailwind 的项目            |

## 构建工具

| 工具          | 特点                                                      |
| ------------- | --------------------------------------------------------- |
| **Vite**      | Vue 团队出品，ESM 原生驱动，极速 HMR + Rollup 打包        |
| **Rolldown**  | Vite 下一代打包器（Rust），正在开发中                     |
| **Nuxt CLI**  | Nuxt 全栈框架内置构建工具链                               |
| **Turbopack** | Vercel 维护（Rust），Next.js 内置，Vue 可通过手动配置使用 |

## CSS / 样式方案

| 方案             | 特点                                                              |
| ---------------- | ----------------------------------------------------------------- |
| **UnoCSS**       | 原子化 CSS 引擎，比 Windi/Tailwind 更快，完全可定制，Vue 生态首选 |
| **Tailwind CSS** | 原子化 CSS 最主流方案，Vite 插件支持                              |
| **CSS Modules**  | Vite 内置支持，`<style module>` 原生支持                          |
| **CSS Scoped**   | SFC 内置，`<style scoped>` 组件样式隔离                           |
| **postcss**      | 功能强大的 CSS 转换工具                                           |

## 数据获取

| 方案                           | 特点                                            |
| ------------------------------ | ----------------------------------------------- |
| **TanStack Query (Vue Query)** | 服务端状态管理，缓存/重试/轮询/乐观更新，最主流 |
| **Axios**                      | Vue 生态最常用的 HTTP 客户端                    |
| **ofetch**                     | Nuxt 内置，基于 Fetch API 的轻量请求库          |
| **Apollo Client (Vue)**        | GraphQL 首选                                    |
| **@vueuse/integrations**       | 包含 Axios、Firebase、JWT 等 composable         |

## 状态持久化

| 库                              | 特点                                                                    |
| ------------------------------- | ----------------------------------------------------------------------- |
| **pinia-plugin-persistedstate** | Pinia 官方推荐的持久化插件，支持 localStorage/sessionStorage/自定义存储 |

## 工具函数 & Composables

### VueUse

Vue 生态使用最广泛的工具集合，官方推荐。

```bash
npm install @vueuse/core
```

**核心 composable 分类：**

- **Browser**：`useStorage`、`useClipboard`、`useTitle`、`useFullscreen`
- **Sensors**：`useMouse`、`useScroll`、`useResizeObserver`、`useIntersectionObserver`
- **Animation**：`useTransition`、`useInterval`、`useTimeout`
- **State**：`createGlobalState`、`useLocalStorage`、`useSessionStorage`
- **Utilities**：`useDebounceFn`、`useThrottleFn`、`useAsyncState`
- **Component**：`useVirtualList`、`useVModel`、`templateRef`
- **Network**：`useFetch`、`useWebSocket`

## 测试

| 工具               | 特点                                            |
| ------------------ | ----------------------------------------------- |
| **Vitest**         | Vite 原生单元测试框架，与 Jest API 兼容，速度快 |
| **Vue Test Utils** | Vue 官方组件测试工具库                          |
| **Playwright**     | 微软出品端到端测试，多浏览器支持                |
| **Cypress**        | 前端 E2E 测试先驱，实时重载调试                 |
| **Nightwatch**     | 老牌 E2E 测试框架，create-vue 可选推荐项之一    |

```bash
# create-vue 创建时选 Vitest + Playwright 是最佳搭配
npm create vue@latest  # 勾选 Vitest + Playwright
```

## 跨平台 & 桌面端

| 框架/工具           | 特点                                                   |
| ------------------- | ------------------------------------------------------ |
| **Quasar**          | 一套代码 → SPA / SSR / PWA / Mobile / Desktop / BEX    |
| **Electron + Vite** | 使用 electron-vite 或 electron-builder 构建桌面应用    |
| **Tauri**           | Rust 驱动的轻量桌面框架（替代 Electron），前端可用 Vue |
| **Ionic Vue**       | 基于 Web Components 的移动端框架，配合 Capacitor       |
| **uni-app**         | 国内最主流的跨端框架，一套代码编译到小程序/H5/App      |

## 国际化 (i18n)

| 库               | 特点                                                   |
| ---------------- | ------------------------------------------------------ |
| **vue-i18n**     | Vue 官方国际化库，支持 Composition API，延迟加载语言包 |
| **@nuxtjs/i18n** | Nuxt 国际化模块，自动路由前缀/域名策略                 |

## 关键开发工具

| 工具                         | 用途                                                |
| ---------------------------- | --------------------------------------------------- |
| **Vue DevTools**             | 浏览器调试工具：组件树、Pinia、路由、性能分析       |
| **Vue - Official（Volar）**  | VS Code 扩展，SFC 语法高亮、类型检查、智能提示      |
| **ESLint plugin-vue**        | Vue 特定的 ESLint 规则                              |
| **unplugin-auto-import**     | 自动导入 Vue API / composable，无需手动 import      |
| **unplugin-vue-components**  | 自动导入组件（Element Plus、Naive UI 等），按需加载 |
| **vite-plugin-vue-devtools** | Vite 集成的 DevTools，开发时浮动面板调试            |

## 权限管理 & 中后台

| 方案                            | 特点                                                |
| ------------------------------- | --------------------------------------------------- |
| **vue-pure-admin**              | GitHub 高星 Vue 3 中后台模板，基于 Element Plus     |
| **vben-admin (Vue Vben Admin)** | 企业级中后台方案，Monorepo + Vue 3 + Ant Design Vue |
| **vue-element-admin**           | 经典 Vue 2 方案，有 Vue 3 分支                      |

## Nuxt 模块生态

Nuxt 的模块系统是其核心扩展机制，常见模块：

| 模块                   | 用途                                            |
| ---------------------- | ----------------------------------------------- |
| **@nuxt/image**        | 图片优化（压缩、格式转换、响应式）              |
| **@nuxt/content**      | 基于文件的内容管理（Markdown/YAML/CSV）驱动网站 |
| **@nuxtjs/i18n**       | 国际化                                          |
| **@nuxtjs/pwa**        | PWA 支持                                        |
| **@nuxtjs/sitemap**    | 自动生成 sitemap                                |
| **@nuxtjs/seo**        | SEO 工具集                                      |
| **@nuxt/fonts**        | 字体优化                                        |
| **@nuxt/scripts**      | 第三方脚本性能优化                              |
| **nuxt-auth**          | 认证模块（支持 OAuth、Credentials 等）          |
| **@nuxtjs/supabase**   | Supabase 集成                                   |
| **@nuxtjs/cloudinary** | Cloudinary 图片服务集成                         |
| **nuxt-hub**           | NuxtHub 平台集成（Cloudflare 部署、KV、D1 等）  |

## 技术选型速查

| 项目类型           | 推荐技术组合                                        |
| ------------------ | --------------------------------------------------- |
| 全栈 SSR 网站      | Nuxt + Pinia + Vue Query + Tailwind CSS / UnoCSS    |
| SPA 中后台         | Vite + Element Plus / Naive UI + Pinia + Vue Router |
| 静态文档/博客      | VitePress / Nuxt Content                            |
| 跨端移动 App       | uni-app / Quasar                                    |
| 桌面应用           | Tauri + Vue 3 / Electron + electron-vite            |
| 轻量增强（渐进式） | Petite-Vue / CDN Vue                                |
| 组件库开发         | Vite + Vitest + Storybook (Vue)                     |
| 全栈 SaaS          | Nuxt + Prisma + Supabase / PostgreSQL + Nuxt Auth   |
| 微前端             | Vite + Module Federation / qiankun (适配 Vue)       |

## 社区推荐的项目启动模板

| 模板                      | 适用场景                                         |
| ------------------------- | ------------------------------------------------ |
| `npm create vue@latest`   | Vue 3 SPA 官方起点                               |
| `npx nuxi init`           | Nuxt 全栈应用起点                                |
| `npm create quasar`       | Quasar 跨平台起点                                |
| `npx degit antfu/vitesse` | Vite + Vue 3 + UnoCSS + 最佳实践模板（社区高星） |
