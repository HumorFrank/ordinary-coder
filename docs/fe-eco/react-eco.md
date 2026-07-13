# React 生态

## UI 库

- [Shadcn UI](https://ui.shadcn.com/)
  > shadcn/ui 是一套设计精美、易于使用的组件和一个代码分发平台。
- [Ant Design](https://ant.design/)
  > Ant Design - 一套企业级 UI 设计语言和 React 组件库，基于 Ant Design 设计体系的 React UI 组件库，用于研发企业级中后台产品。
- [Chakra UI](https://chakra-ui.com/)
  > Chakra UI 是一个简单、模块化和可访问的组件库。
- [MUI](https://mui.com/)
  > MUI：你一直想要的 React 组件库
- [React Bootstrap](https://react-bootstrap.netlify.app/)
  > React Bootstrap 最流行的前端框架，已针对 React 进行了重构。
- [Radix UI](https://www.radix-ui.com/)
  > Radix UI 是一个 React 组件库，提供了一套高度可定制的组件，用于构建企业级界面。
- [Headless UI](https://headlessui.com/)
  > Headless UI 无头 UI - 无样式、完全可访问的 UI 组件
- [React Aria](https://react-aria.adobe.com/)
  > 打造具有定制风格的世界一流无障碍组件。

## UI 组件与样式体系

- **Tailwind CSS + shadcn/ui**
  > 原子化 CSS + 无样式组件库，定制自由度极高。
- **Material UI / Chakra UI / Ant Design / DaisyUI**
  > 成熟组件生态，快速落地企业级界面。
- 样式方案
  > - **CSS Modules**：作用域隔离，适合渐进式迁移。
  > - **Styled Components**：JS 内写样式，方便主题切换，略有运行时开销。
  > - **Emotion**：轻量灵活，支持静态提取和 CSS-in-JS。

## 全栈框架

- **Next.js**
  > 适用于 Web 的React 框架，支持服务器端渲染、静态站点生成和增量静态站点生成。
- **Remix**
  > 一个用于构建任何内容的网络框架，支持从 Markdown、JSON、CMS 等来源获取数据。
- **Astro**
  > Astro是一个 JavaScript Web 框架，专为构建快速、内容驱动的网站而优化。
- **Gatsby**
  > Gatsby 是一个基于 React 的开源网站框架。无论您的网站有 100 个页面还是 10 万个页面——如果您非常重视性能、
  > 可扩展性和内置安全性——您都会爱上使用 Gatsby 构建网站。轻松从您喜爱的无头 CMS 系统中提取数据！

## 移动与跨平台

- **React Native + Expo**：一套代码多端运行。
- **Electron + React**：桌面应用开发方案。

## 数据管理方案

- [TanStack Query (React Query)](https://tanstack.com/query)
  > 强大的异步状态管理、服务器状态工具和数据获取功能，适用于 Web。支持 TS/JS、React Query、Solid Query、Svelte Query 和 Vue Query。
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
  > RTK Query是一款功能强大的数据获取和缓存工具。它的设计旨在简化 Web 应用程序中常见的数据加载场景，无需用户手动编写数据获取和缓存逻辑。
- [SWR](https://swr.vercel.app/)
  > 专为 React 构建的现代化数据获取机制，无需手动处理状态和错误。
- [Relay](https://relay.dev/)
  > Relay 专为各种规模的高性能应用而设计。无论您的应用拥有数十、数百还是数千个组件，Relay 都能轻松管理数据获取。
  > 此外，得益于 Relay 的增量编译器，即使应用规模不断扩大，也能保持快速迭代。
- [tRPC](https://trpc.io/)
  > tRPC允许您构建和使用完全类型安全的 API，无需模式或代码生成。
  > 它融合了REST和 GraphQL的概念——如果您对其中任何一项都不熟悉，请查看关键概念。

## 路由管理

- [React Router v7](https://reactrouter.com/)：支持 SSR、全栈开发，灵活的多页面方案。
- [TanStack Router](https://tanstack.com/router/latest)：TS 友好、现代化设计，未来计划与 RSC 深度结合，潜力股。
- [Next.js 内置路由](https://nextjs.org/docs/app/getting-started/layouts-and-pages)：基于文件系统，简单直观，适合全栈和企业级项目。

## 状态管理

| 场景                           | 推荐            | 描述                                 |
| ------------------------------ | --------------- | ------------------------------------ |
| 企业级大型应用，需可预测状态流 | Redux Toolkit   | Redux 官方升级版                     |
| 追求极简                       | Zustand         | 极简全局状态，几行代码搞定。         |
| 异步 & 依赖复杂                | Recoil / Jotai  | 原子化状态管理，依赖自动追踪。       |
| 响应式、自动依赖追踪           | MobX            | 响应式状态管理，写法简洁，性能好。   |
| 状态流程图清晰                 | XState          | 适合状态流程复杂、需要可视化的项目。 |
| 局部+全局结合                  | Zustand + Jotai | 实现局部状态和全局状态的结合。       |

## 测试框架
- **Cypress**
  > Cypress 是一个高质量的平台，专为开发现代 Web 应用的团队而设计。可以测试任何在浏览器中运行的程序。
- **Jest**
  > Jest 是一个令人愉悦的 JavaScript 测试框架，其重点在于简洁性。
- **Playwright**
  > Playwright为测试、脚本编写和 AI 代理提供可靠的 Web 自动化功能。
- **Storybook**
  > Storybook 是一个前端工作坊，用于独立构建 UI 组件和页面。成千上万的团队使用它进行 UI 开发、测试和文档编写。它是开源且免费的。
- **Testing Library**
  > 简单而全面的测试工具，鼓励良好的测试实践。
- **Vitest**
  > 下一代测试框架，一个原生支持 Vite 的测试框架。快得惊人！

## 构建工具

- **Vite**
  > 启动快到飞起，HMR 热更新秒响应，非常适合轻量 SPA 和快速迭代。
- **Bun**
  > 新晋 JavaScript 运行时，集打包、依赖管理、SSR 一体，性能极快。
- **Webpack**
  > 虽然不再是新宠，但在大型项目、微前端场景中依然稳得一批，生态成熟。
- **Rspack**
  > 基于 Rust 的 Web 打包工具，用现代化的 webpack API 无缝替换 webpack
- **esbuild**
  > esbuild 打包器项目的主要目标是开启构建工具性能的新时代，并在此过程中打造一款易于使用的现代化打包器
- **Rollup**
  > Rollup 是一个用于 JavaScript 的模块打包工具，它将小的代码片段编译成更大、更复杂的代码，例如库或应用程序。
- **Parcel**
  > Parcel 开箱即用，支持多种语言和文件类型，从 HTML、CSS 和 JavaScript 等 Web 技术，到图像、字体、视频等资源，应有尽有。
  > 如果您使用的文件类型未包含在默认列表中，Parcel 还会自动为您安装所有必要的插件和开发依赖项！
- **Turbopack**
  > Turbopack 是一个增量打包工具，针对 JavaScript 和 TypeScript 进行了优化，使用 Rust 编写，并集成到Next.js中。
  > 您可以将 Turbopack 与 Pages 和 App Router 结合使用，从而获得更快的本地开发体验。
- **tsup**
  > 使用 esbuild 打包您的 TypeScript 库，无需任何配置。

## React 技术选型

| 场景       | 推荐技术栈                                    | 理由                           |
| ---------- | --------------------------------------------- | ------------------------------ |
| 企业级全栈 | Next.js + Prisma + Zod + Tailwind + shadcn/ui | 类型安全、SSR + Edge、快速迭代 |
| 内容型站点 | Astro + Tailwind + MDX                        | 性能极致、SEO 强、零 JS        |
| 跨平台应用 | React Native + Expo + Zustand                 | 一套逻辑多端运行               |
| 数据密集型 | TanStack Query + Zustand + shadcn/ui          | 数据缓存高效、UI 流畅          |
| 中小型 Web | Vite + React + Zustand + Tailwind             | 极简高效、学习成本低           |

## 部署与运维

- **Vercel / Netlify**：前端部署神器，自动化构建 + CDN 分发。
- **Docker + Nginx**：企业常用生产部署方案。
- **CI/CD**：GitHub Actions / GitLab CI 持续集成与部署。

## 参考资料

- [React 生态系统](https://risingstars.js.org/2025/en#section-react)
- [react-hook-form](https://react-hook-form.com/)
- [awesome-react-native](https://www.awesome-react-native.com/)
- [TanStack Vue libraries](https://tanstack.com/libraries/vue)
