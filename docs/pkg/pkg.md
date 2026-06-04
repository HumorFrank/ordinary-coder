# npm

## 初始化项目

### 初始化询问
```sh [npm]
 npm init
```

### 初始化不询问

```sh [npm]
npm init -y
```

## 常用镜像源

## 配置 npm

### npmrc

> `.npmrc` -> npm 配置文件，npm 从`命令行`、`环境变量`和 `npmrc` 文件`获取配置设置`。

1️⃣ `.npmrc` Files 种类

- `project/.npmrc`：每个项目的配置文件
- `~/.npmrc`：用户配置文件
- 全局配置文件
- `npm/npmrc`：npm 内置配置文件

> ⚠️ TIP
>
> - `.npmrc` 文件中以分号/井号（ `;/#`）开头的行会被解释为注释。
> - `.npmrc` 文件由 `npm/ini` 解析， `.npmrc /ini` 定义了这种注释语法。
> - `.npmrc` 仅适用于运行 npm 的项目根目录。`模块发布后，此设置无效`。

### package.json

| 字段                   | 必填 | 说明                             | 备注                                                                     |
| ---------------------- | ---- | -------------------------------- | ------------------------------------------------------------------------ |
| `name`                 | 是   | 包名/项目名                      | 若需发布软件包，则必填，否则选填。                                       |
| `version`              | 是   | 版本                             | 必须能被 `node-semver` 解析。                                            |
| `description`          | 否   | 描述                             | 添加描述。                                                               |
| `private`              | 否   | 是否发布该软件包                 | 防止意外发布私有仓库                                                     |
| `keywords`             | 否   | 关键词                           | 有助于人们在 `npm search` 中找到你的软件包。                             |
| `type`                 | 否   | 类型                             | 定义了 Node.js 应该如何解析包中的 .js 文件。                             |
| `scripts`              | 否   | 脚本                             | 包含在包生命周期的不同阶段运行的脚本命令。                               |
| `homepage`             | 否   | 首页                             | 项目主页的网址。                                                         |
| `license`              | 否   | 许可证                           | 允许如何使用它，或它施加的任何限制。                                     |
| `files`                | 否   | npm包作为依赖安装时要包括的文件  | 被包含在最终的发布包（tarball）中的文件或目录                            |
| `exports`              | 否   | 导出                             | 提供了一种替代 `main` 的现代方案                                         |
| `main`                 | 否   | 程序的主要入口点                 | 指定npm包的入口文件                                                      |
| `browser`              | 否   | 浏览器                           | 若你的模块是要在客户端使用，应该使用 browser 字段。                      |
| `bin`                  | 否   | 一个命令名称到本地文件名的映射   | 将文件安装到 PATH 环境变量中。                                           |
| `man`                  | 否   | 主要用于提供命令行工具的帮助文档 | 指定单个文件或文件名数组，供 `man` 程序查找。                            |
| `bugs`                 | 否   | 问题/漏洞                        | 项目问题跟踪系统的网址和/或用于报告问题的邮件地址。                      |
| `directories`          | 否   | 项目目录                         | 用来规范项目的目录。                                                     |
| `repository`           | 否   | 仓库                             | 指定代码存放位置。                                                       |
| `dependencies`         | 否   | 运行依赖                         | 运行依赖项                                                               |
| `devDependencies`      | 否   | 开发依赖                         | 开发依赖项                                                               |
| `peerDependencies`     | 否   | 对等依赖                         | 对等依赖项                                                               |
| `peerDependenciesMeta` | 否   | 对等依赖元数据                   | 向 npm 提供更多关于如何使用对等依赖项的信息。                            |
| `bundleDependencies`   | 否   | 捆绑依赖                         | 向 npm 提供更多关于如何使用对等依赖项的信息。                            |
| `optionalDependencies` | 否   | 可选依赖                         | 若需要在找不到包或者安装包失败时，npm仍然能够继续运行。                  |
| `overrides`            | 否   | 覆盖                             | 您需要对依赖项的依赖项进行特定更改，如：替换存在已知安全问题的依赖项版本 |
| `engines`              | 否   | 引擎                             | 指定npm/pnpm/Node版本等                                                  |
| `os`                   | 否   | 指定运行系统                     | 指定模块将在哪些操作系统上运行                                           |
| `cpu`                  | 否   | 指定处理器                       | 指定代码只能在某些特定的 CPU 架构上运行                                  |
| `devEngines`           | 否   | 开发引擎                         | 该属性将在 install 、 ci 和 run 命令之前运行。                           |
| `publishConfig`        | 否   | 发布配置                         | 一组将在发布时使用的配置值。                                             |
| `workspaces`           | 否   | 工作区                           | 描述要用作工作区的文件夹的直接路径或者通配符                             |
| `funding`              | 否   | 资金                             | 有关如何资助您的软件包开发的最新信息。                                   |

1️⃣ name 命名规则

- 名称长度必须 `<= 214`个字符
- `仅`作用域包的名称可以以`点号`或`下划线`开头。
- 名称`不能包含`任何 `URL 安全字符`。
- 若要发布到 npm 为公开库，则 name 不能和 npm 中已存在同名库。
- 名称可以选择性地添加`作用域前缀`，例如 @npm/example 。

2️⃣ version

- `name` 和 `version` 共同构成一个唯一标识符。
- 软件包的任何更改都应同时更新 version 字段。
- 若您不打算发布软件包，则 `name` 和 `version` 字段是可选的。
- 版本号必须能被 `node-semver` 解析，`node-semver` 是 npm 的依赖项之一。

3️⃣ description

- 有助于人们发现你的软件包，因为它会被列入 `npm search` 列表中。

> ⚠️ TIP
>
> - 它必须是真正的 `JSON` 格式，而不仅仅是 JS 对象字面量。
 
4️⃣ 归纳整理
- 必须属性（但在monorepo 子包/前端 SPA/私有项目等中不强制要求）
  - `name`：包名/项目名
  - `version`：包/项目版本
- 描述信息
  - `description`：描述信息
  - `keywords`：关键词
  - `author`：作者
  - `contributors`：贡献者
  - `homepage`：主页
  - `repository`：仓库
  - `bugs`：bug反馈地址
- 依赖配置
  - `dependencies`：生产/运行依赖
  - `devDependencies`：开发依赖
  - `peerDependencies`：兼容依赖
  - `optionalDependencies`：不阻断安装依赖
  - `bundleDependencies`：打包依赖
  - `engines`：版本要求
- 脚步配置
  - `script`
  - `config`
- 文件&目录
  - `main`：程序入口
  - `browse`r：程序入口
  - `module`：程序入口
  - `bin`：命令行工具入口
  - `files`：发布文件配置
  - `man`：man 文档
  - `directories`：项目目录
- 发布配置
  - `private`：限制发布(私有或开源)
  - `preferGlobal`：警告本地安装
  - `publishConfig`：限制发布仓库、限制发布版本
  - `os`：限制运行系统
  - `cup`：限制处理器
  - `license`：开源协议
- 第三方配置
  - `typings`
  - `eslintConfig`
  - `babel`
  - `unpkg`
  - `lint-staged`
  - `gitHooks`
  - `browserslist`

### package-lock.json
> 介绍：依赖版本锁定文件，不移除该文件，则执行版本安装则不会更改之前安装的依赖版本。

::: info 作用
> 团队协作开发，保持依赖版本一致性。

:::

### npm-shrinkwrap.json
> 介绍：可发布的锁文件

::: warning npm-shrinkwrap.json
`npm-shrinkwrap.json` 是由 `npm shrinkwrap` 创建的文件。它与 `package-lock.json` 相同，但有一个主要限制：与` package-lock.json` 不同，发布包时可以包含 `npm-shrinkwrap.json`。
> 强烈不建议库作者发布该文件，因为这会阻止终端用户控制传递依赖更新。
:::

## 使用 npm

### scripts

### config

### workspaces

## npmmirror 镜像站同步机制

> npm 镜像同步机制说明：为什么新包不会自动出现在 `npmmirror.com`

### 现象描述
- 某个包昨天已成功发布到 `npmjs.com`。
- 今天在 `npmmirror.com` 网站上搜索，找不到该包。
- 通过直接访问 `https://npmmirror.com/package/包名`，页面提示 `这个包还未同步`。
- 手动点击页面上的`“同步”`按钮后，包才成功同步并出现在镜像站。

### 核心原因：按需同步策略

`npmmirror.com` (原淘宝 npm 镜像) 不会主动、实时地拉取 `npmjs.com` 上所有新发布的包。它采用的是**按需同步**为主、**全量同步**为辅的机制。新发布的包会处在该策略的“盲区”。

1️⃣ 主要机制：被动按需同步，这是镜像站最核心、最基础的运行逻辑

- **触发条件**
> 当有用户通过将 npm 源设置为 `npmmirror.com` 的客户端执行 `npm install 你的包名` 命令时。
- **行为**
> 镜像站收到这次下载请求，发现本地不存在该包，会**立刻、实时地**向上游 `npmjs.com` 拉取并同步该包。对触发安装的用户来说，首次下载可能会慢一些，但同步从此完成。
- **你的情况**
> 你的包发布后，在没有任何人通过镜像源安装过它。因此，镜像站从未收到过请求，也就完全不知道这个包的存在。

2️⃣ 辅助机制：全量同步，镜像站会周期性进行全量更新，但其主要目标不是发现全新的包

- **频率**
> 同步间隔较长，可能是数小时乃至一天。
- **目标与优先级**
> 全量同步的核心任务是**更新已知热门包的历史版本**，而非主动探测所有新增的包。一个新包要等待全量同步流程将其“发现”并收录，过程非常缓慢且不可靠。
- **结果**
> 远不如一次按需触发来得直接。

### 结论

你所经历的过程，完全符合 `npmmirror.com` 的预期设计。

- **包发布后**：从未有中国开发者通过镜像源安装过它。
- **镜像站状态**：因为无人访问，所以它不知道这个包的存在。
- **手动操作**：你通过包详情页面的“同步”按钮，手动向镜像站发出了“同步这个包”的指令。这是该包在 `npmmirror.com` 上被第一次触发同步。
- **今后**：一旦有任何人通过 `npmmirror.com` 源成功下载过这个包一次，后续其他人再通过该源下载或搜索，就能立刻发现它。

这种行为是正常的，说明按需同步的逻辑运行良好。

## 安全漏洞和依赖审计

### 相关命令
```sh [npm]
# 检查直接依赖 devDependencies、bundledDependencies 和 optionalDependencies
# 要求报告已知漏洞，但不检查 peerDependencies。
npm audit

# 去重，减少包树中的重复
npm dedupe # alias: ddp

# 比较2个不同版本的npm包的差异
npm diff --diff=<spec-a> --diff=<spec-b> 
# npm diff --diff=abbrev@1.1.0 --diff=abbrev@1.1.1

# 快速打开包/依赖的官方在线文档，在网页浏览器中为包打开文档
npm docs <pkgname>

# 访问 npm 库的延迟
npm ping

# 移除多余的包裹，多余包是指 node_modules 文件夹中存在但未被列为任何包依赖列表的包。
npm prune

# 在浏览器中打开软件包仓库(github)页面
npm repo <pkgname>
```
### 安全漏洞
- [GitHub 咨询数据库](https://github.com/advisories)
- [漏洞报告解读](https://docs.npmjs.com/about-audit-reports)

## 参考资料
- [npm之package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)：本文档包含了关于 `package.json` 文件所需内容的全部信息。
- [package.json 的基础知识](https://nodesource.com/blog/the-basics-of-package-json)：package.json 的基础知识
