# 前端工程化

> 前端工程化是现代前端开发的核心技能，涵盖了从`项目架构设计到部署运维`的完整流程。

## 前端工程

::: tip 按工程化流程顺序排列

```txt
概述 → 脚手架 → 包管理 → 模块化 → 组件化 → 构建 → 代码规范 → 测试 → 版本控制 → CI/CD → 性能
→ 监控 → 安全 → 架构
```

:::

### 前端工程 — 概述与演进

> 前端工程化从手工劳作到自动化体系的发展历程，理解每个阶段解决了什么问题、为什么会出现下一阶段

- **第一阶段：库/框架选型**
  > 技术选型
- **第二阶段：简单构建优化**
  > 压缩、校验、资源合并等
- **第三阶段：JS/CSS 模块化开发**
  > AMD → CommonJS → UMD → ES Module / Less、Sass、Stylus
- **第四阶段：组件化**
  > 组件化开发与资源管理
- **第五阶段：自动化工程化闭环**
  > 脚手架 → 开发 → 构建 → 测试 → 部署 → 监控

### 前端工程 — 脚手架

> 项目初始化的命令行工具，快速生成项目骨架、目录结构和基础配置（`create-vue`/`create-vite`）

### 前端工程 — 包管理

> 第三方依赖的安装、版本锁定、更新与卸载，以及 monorepo 多包协作管理（`npm`/`yarn`/`pnpm`）

- **npm**
> npm 是 Node.js 的默认包管理器，也是世界上最大的软件注册表之一。
- **yarn**
> 由 Facebook 开发并维护，旨在解决 npm 在`速度`和`安全性`方面的一些局限性。
- **pnpm**
> pnpm 是一种新型的包管理器，它解决了传统 npm 和 yarn 在`速度快`、`磁盘空间`上的不足
- **Bun**
> Bun 是用于运行 JavaScript 和 TypeScript 应用程序的集成工具包，一种快速 `JavaScript 运行时`，可直接替换 Node.js。
> Bun 采用 Zig 语言编写，底层采用 JavaScriptCore 引擎，大大减少了启动时间和内存使用量。
- **Deno**
> Deno (/ˈdiːnoʊ/，发音为 dee-no) 是一个开源的 JavaScript、TypeScript 和 WebAssembly 运行时。
> 它基于 V8、Rust 和 Tokio 构建。
> 内置开发工具、强大的平台 API，并原生支持 TypeScript 和 JSX。
- **Bower** — ❌ 已弃用
> Bower 一个面向网页的包管理器，可以管理包含 HTML、CSS、JavaScript、字体甚至图片文件的组件。
> Bower 不连接、压缩代码或其他操作——它只是安装你需要的包和它们的依赖的正确版本。

### 前端工程 — 模块化

> 代码按功能拆分与组织，通过模块系统进行导入导出，解决全局污染和依赖顺序问题（`ES Module`/`CommonJS`），原则 — `高内聚低耦合`

#### ES Module vs CommonJS

1️⃣ 加载机制

| 特性     | CommonJS           | ES Module        |
| -------- | ------------------ | ---------------- |
| 加载方式 | 同步加载           | 异步加载         |
| 解析时机 | 运行时解析         | 编译时解析       |
| 阻塞行为 | 会阻塞主线程       | 不会阻塞主线程   |
| 依赖确定 | 代码执行时动态确定 | 编译阶段静态确定 |

2️⃣ 导入导出语法

| 特性         | CommonJS                     | ES Module                   |
| ------------ | ---------------------------- | --------------------------- |
| 导出         | `module.exports` / `exports` | `export` / `export default` |
| 导入         | `require()`                  | `import ... from ...`       |
| 默认导出支持 | 通过赋值实现                 | `export default` 原生支持   |

::: code-group

```js [CommonJS]
// 导出
module.exports = function greet() {
  console.log("Hello from CommonJS");
};

// 导入
const greet = require("./greet");
```

```js [ES Module]
// 导出
export function greet() {
  console.log("Hello from ES6 Modules");
}
export default class Greeter {}

// 导入
import { greet } from "./greet.js";
import Greeter from "./Greeter.js";
```

:::

3️⃣ 单例 vs 多例

| 特性       | CommonJS                       | ES Module                            |
| ---------- | ------------------------------ | ------------------------------------ |
| 实例模式   | 单例模式                       | 每次导入为新实例（除非显式共享状态） |
| 副作用风险 | 较高（共享状态易产生意外影响） | 较低（行为更可预测）                 |

4️⃣ 互操作性

| 环境             | CommonJS    | ES Modules                                                   |
| ---------------- | ----------- | ------------------------------------------------------------- |
| Node.js 原生支持 | ✅ 完全支持 | ⚠️ 需配置（`.mjs`/ `package.json` 中 `type: "module"`） |
| 现代浏览器       | ❌ 不支持   | ✅ 原生支持（`<script type="module">`）                       |
| 转译兼容         | —           | 可通过 `Babel` 等转译为 `CommonJS`                            |

5️⃣ 性能与优化

| 特性               | CommonJS    | ES Module              |
| ------------------ | ----------- | ---------------------- |
| 静态分析           | ❌ 难以实现 | ✅ 支持                |
| Tree Shaking(摇树) | ❌ 不支持   | ✅ 支持                |
| 打包优化           | 受限        | 更高效                 |
| 依赖预分析         | 困难        | 容易（得益于静态结构） |

### 前端工程 — 组件化

> 将 UI 拆分为独立可复用的组件单元，封装模板、逻辑与样式，通过 `props` / `emit` 通信

### 前端工程 — 构建

将源码编译打包为可上线产物

> - 编译（TS → JS、ES6 → ES5、Less → CSS）、 压缩混淆、代码分割、Tree Shaking
> - 生成 `dist`（`Webpack`、`Vite`、`Rollup`）

### 前端工程 — 代码规范

统一编码风格与质量标准

> - `ESLint` 语法检查
> - `Prettier` 格式化
> - `Stylelint` 样式校验
> - `commitlint` 提交信息规范

### 前端工程 — 测试

验证代码正确性与稳定性

> - 单元测试（`Vitest`/`Jest`）
> - 组件测试
> - 端到端测试（`Playwright`/`Cypress`）

### 前端工程 — 版本控制

> 代码变更追踪与团队协作：`Git` 工作流（`Git Flow`/`Trunk-Based`）、分支策略、提交规范、`Code Review`

### 前端工程 — CI/CD

> 自动化集成与交付：推送代码后自动构建、测试、部署到目标环境（`GitHub Actions`/`GitLab CI`/`Jenkins`）

### 前端工程 — 性能优化

> 提升页面加载速度与运行时性能：首屏优化、懒加载、缓存策略、`CDN`、资源压缩、渲染优化

### 前端工程 — 监控

> 线上应用的可观测性：错误追踪（`Sentry`）、性能指标采集、用户行为埋点、日志系统

### 前端工程 — 安全

> 前端安全防护：`XSS` 防御、`CSRF` 防护、`CSP` 策略、依赖漏洞审计、敏感信息加密

### 前端工程 — 架构设计

> 项目整体技术方案：目录结构设计、分层架构、状态管理、路由设计、多端复用策略、微前端

## multi-repo vs mono-repo

### 两种代码风格仓库

- `multi-repo`（单仓库）：把每个项目都分别用 `git` 托管
- `mono-repo`（多仓库）：统一用一个 `git` 仓库管理所有的项目

### 单/多仓库目录

::: code-group

```js [multi-repo.js]
root
|── project-a
|   ├── ...
|   └── .git
├── project-b
|   ├── ...
|   └── git
├── project-c
|   ├── ...
|   └── .git
├── project-d
|   ├── ...
|   └── .git
...
```

```js [mono-repo.js]
├── .git
├── lerna.json
├── package.json
├── packages
    ├── project-a
    |    ├── README.md
    |    ├── __tests__
    |    ├── lib
    |    └── package.json
    ├── project-b
    |    ├── README.md
    |    ├── __tests__
    |    ├── lib
    |    └── package.json
    ├── project-c
        ├── README.md
        ├── __tests__
        ├── lib
        └── package.json
```

:::

### 单仓库 vs 多仓库

| 单仓库                                                                | 多仓库                                                   |
| --------------------------------------------------------------------- | -------------------------------------------------------- |
| 一个组织的所有项目的代码都存储在一个中央仓库中                        | 每个服务和项目都有一个单独的仓库                         |
| 团队可以协作工作，可以看到彼此的更改                                  | 团队可以自主工作，个人的更改不会影响其他团队或项目的更改 |
| 每个人都可以访问整个项目结构                                          | 管理员可以限制对开发人员需要访问的项目或服务的访问控制   |
| 如果项目规模不断增长，可能会出现扩展问题                              | 性能良好，因为代码量有限，服务单位较小                   |
| 难以实施持续部署（CD）和持续集成（CI）                                | 开发人员可以轻松实现CD和CI，因为他们可以独立构建服务     |
| 开发人员可以轻松共享库、API和其他共享代码，因为它们在中央仓库中被更新 | 应定期同步对库和其他共享代码的任何更改，以避免后续问题   |

### multi-repo 的管理

```sh [sh]
# 初始化git submodules仓库
git submodule init
# 添加一个submodule
git submodule add https://github.com
# 更新所有的submodule
git submodule update
# 查submodule status
git submodule status
# foreach 用于在每个submodule中执行命令
git submodule foreach "git checkout -b featureA"
```

### mono-repo 的管理

1️⃣ 初始化的目录结构

```sh [sh]
# 初始化的目录结构
lerna init
# 创建项目1
lerna create pac-1
# 创建项目2
lerna create pac-2
# 创建项目3
lerna create pac-3
```

2️⃣ 目录中 lerna.json

```json [json]
{
  // 配置$schema可以在vscode中，鼠标滑倒每个配置项时候，可以看每个配置项的介绍
  // 可以在https://www.schemastore.org/json/中网站查看知名项目的描述文件
  "$schema": "http://json.schemastore.org/lerna",
  "packages": ["packages/*"],
  "version": "independent" // 可以给各个项目发不同的版本
}
```

3️⃣ 添加项目依赖

```sh [sh]
# 制造依赖关系，对于内部项目的依赖，lerna会以软链接的形式，给它们相互软链接起来
lerna add pac-1 packages/pac-2
lerna add pac-2 packages/pac-3
```

4️⃣ lerna.json 配置

```json [json]
{
  "version": "0.0.0",
  "npmClient": "npm",
  "npmClientArgs": ["--pure-lockfile"],
  "command": {
    "publish": {
      "ignoreChanges": ["ignored-file", "*.md"],
      "message": "chore(replease):publish",
      "registry": "https://npm.pkg.github.com"
    },
    "bootstrap": {
      "ignore": "component-*",
      "npmClientArgs": ["--no-package-lock"]
    }
  },
  "packages": ["packages/*"]
}
```

## Monorepo vs Polyrepo

### 在软件开发体系中的位置

```sh
软件开发工程
├── 需求分析
├── 架构设计（架构模式：微服务、单体、分层等）
├── 代码组织 ◄──── Monorepo vs Polyrepo 在这里
│   ├── 代码仓库管理策略（Monorepo / Polyrepo）
│   ├── 模块划分
│   └── 依赖管理
├── 开发流程（Git Flow、主干开发等）
├── 构建与部署（CI/CD）
├── 测试策略
└── 运维监控
```

### Polyrepo

> ‌Polyrepo‌ 是指每个`项目/库/微服务`拥有独立且隔离的代码仓库 — **单仓库单项目**

::: tip ⚜ Polyrepo‌（Polygon Repository 称多仓库） 本质 — 单仓库单项目。
:::

### Monorepo

> ‌Monorepo‌ 是指将多个相关的`项目/库/应用`集中存储在一个代码仓库中 — **单仓库多项目**

::: tip ⚜ Monorepo（Monolithic Repository 称单体仓库） 本质 — 单仓库多项目。
:::

### 多维度深度对比

| 维度         | Polyrepo (多仓库)                                      | Monorepo (单仓库)                                           |
| ------------ | ------------------------------------------------------ | ----------------------------------------------------------- |
| ‌代码复用‌   | 需发布 npm 包或复制粘贴，存在版本滞后。                | 直接通过 workspace 引用源码，实时同步。                     |
| ‌依赖管理‌   | 各仓库独立安装，存在大量重复依赖，磁盘占用高。         | 依赖提升到根目录，全局去重，节省空间。                      |
| ‌跨项目改动‌ | 修改公共库需分别克隆 N 个仓库，手动升级版本，易出错。  | 原子化提交，一次修改同时更新所有受影响项目。                |
| ‌权限控制‌   | 粒度精细，可按仓库隔离敏感信息。                       | 需借助 CODEOWNERS 实现目录级权限，配置较复杂。              |
| ‌CI/CD 效率‌ | 每个仓库单独构建，资源分散，无法利用缓存加速关联项目。 | 支持增量构建，仅构建受影响部分，可并行执行。                |
| ‌学习成本‌   | 低，各项目独立，符合直觉。                             | 高，需掌握 Workspaces、任务编排、拓扑排序等概念。           |
| ‌仓库体积‌   | 单个仓库小，克隆速度快。                               | 仓库随时间膨胀，克隆耗时较长（可通过 Shallow Clone 优化）。 |

### 选择 Polyrepo 与 Monorepo

1️⃣ 何时选择 Polyrepo？

- ‌**团队高度自治**‌：不同团队负责完全独立的产品，极少共享代码。
- ‌**技术栈差异大**‌：各项目使用完全不同的语言或构建工具，难以统一配置。
- ‌**权限要求严格**‌：涉及敏感数据，需要严格的物理隔离。
- ‌**小型项目或个人开发**‌：维护 Monorepo 的工具链成本高于其带来的收益。

2️⃣ 何时选择 Monorepo？

- **‌高频代码共享‌**：多个应用共用 UI 组件库、工具函数、类型定义。
- **‌紧密协作团队**‌：需要频繁进行跨模块重构或原子化变更。
- **‌统一工程标准**‌：希望强制统一 ESLint、Prettier、TypeScript 配置及测试规范。
- **‌中大型前端工程**‌：包含 Web、小程序、Node 服务等多个端，且依赖关系复杂。

## 参考资源

- [《前端工程化概述》 - 张云龙](https://github.com/fouber/blog)
