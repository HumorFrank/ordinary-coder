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