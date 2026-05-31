# 工程化

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

::: tip  ⚜ Polyrepo‌（Polygon Repository 称多仓库） 本质 — 单仓库单项目。
:::

### Monorepo 

> ‌Monorepo‌ 是指将多个相关的`项目/库/应用`集中存储在一个代码仓库中 — **单仓库多项目**

::: tip  ⚜ Monorepo（Monolithic Repository 称单体仓库） 本质 — 单仓库多项目。
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
