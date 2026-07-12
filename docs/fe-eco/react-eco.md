# React 生态

## UI 组件与样式体系

- **Tailwind CSS + shadcn/ui**
  > 原子化 CSS + 无样式组件库，定制自由度极高。
- **Material UI / Chakra UI / Ant Design / DaisyUI**
  > 成熟组件生态，快速落地企业级界面。
- 样式方案
  > - **CSS Modules**：作用域隔离，适合渐进式迁移。
  > - **Styled Components**：JS 内写样式，方便主题切换，略有运行时开销。
  > - **Emotion**：轻量灵活，支持静态提取和 CSS-in-JS。

## 移动与跨平台

- **React Native + Expo**：一套代码多端运行。
- **Electron + React**：桌面应用开发方案。

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

## React 技术选型

| 场景       | 推荐技术栈                                       | 理由                           |
| ---------- | ------------------------------------------------ | ------------------------------ |
| 企业级全栈 | Next.js + Prisma + Zod + Tailwind + shadcn/ui | 类型安全、SSR + Edge、快速迭代 |
| 内容型站点 | Astro + Tailwind + MDX                           | 性能极致、SEO 强、零 JS        |
| 跨平台应用 | React Native + Expo + Zustand                    | 一套逻辑多端运行               |
| 数据密集型 | TanStack Query + Zustand + shadcn/ui             | 数据缓存高效、UI 流畅          |
| 中小型 Web | Vite + React + Zustand + Tailwind                | 极简高效、学习成本低           |

## 构建工具

- **Vite**：启动快到飞起，HMR 热更新秒响应，非常适合轻量 SPA 和快速迭代。
- **Bun**：新晋 JavaScript 运行时，集打包、依赖管理、SSR 一体，性能极快。
- **Webpack**：虽然不再是新宠，但在大型项目、微前端场景中依然稳得一批，生态成熟。


## 部署与运维

- **Vercel / Netlify**：前端部署神器，自动化构建 + CDN 分发。
- **Docker + Nginx**：企业常用生产部署方案。
- **CI/CD**：GitHub Actions / GitLab CI 持续集成与部署。

## 参考资料

- [React 生态系统](https://risingstars.js.org/2025/en#section-react)
- [react-hook-form](https://react-hook-form.com/)
- [awesome-react-native](https://www.awesome-react-native.com/)
