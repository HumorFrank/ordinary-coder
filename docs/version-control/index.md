# Git
> [Git](https://git-scm.com/book/zh/v2/起步-关于版本控制) 是一个`免费且开源`的`分布式版本控制系统`设计用于处理从小型到 非常大型且高效且快速的项目。

## 初始化仓库
要对一个目录使用git进行版本管理，必须先将该目录设置为git仓库。
```sh [初始化]
# 使用 git init 命令初始化一个新的git仓库。
## 该命令会在当前目录下创建一个.git 目录，该目录就是git仓库，里面记录了仓库的所有信息。
## 该目录不可删除，一旦删除，该仓库就不存在了。
git init

```

## 配置

### 配置命令
```sh
# 查看当前生效的所有配置
git config -l

# 查看当前生效的某个配置的值
git config key(键)

# 更新配置
git config --范围 键 “值”
```

### 配置范围
- `local`：【常见】 默认，仅对当前仓库(目录)有效
- `global`：【常见】对当前用户的所有仓库有效
- worktress：仅对当前工作树有效
- system：对所有用户有效

::: tip 优先级从高到低
`wroktree` > `local` > `global` > `system`

:::

### 常见配置（key）
- `user.name`：【必配】配置用户名，后续提交代码会使用该用户名。
- `user.email`：【必配】配置邮箱，后续提交代码会使用该邮箱。
- `core.editor`：配置默认文本编辑器。
- `core.ignorecase`：配置是否忽略文件名大小写，默认`true`，即忽略大小写。
- `init.defaultbranch`：配置初始化后默认的分支名。

```sh
git config --global user.name 'Your Name'
git config --global user.email 'your.email@example.com'
git config --global core.editor 'code --wait'
git config --global core.ignorecase false
git config --global init.defaultbranch 'BranchName'
```

## gitignore 文件
```gitignore [.gitignore]
# 依赖
node_modules/

# 构建产物
dist/
build/
.output/

# 测试与覆盖率
coverage/
.nyc_output/

# 日志
logs/
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*

# 环境变量（按需保留 .env）
.env.local
.env.*.local

# 缓存
.cache/
.vite/
.turbo/
.eslintcache
*.tsbuildinfo

# IDE / 编辑器
.idea/
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json

# 操作系统文件
.DS_Store
Thumbs.db

# 临时文件
*.tmp
*.temp
```
## 创建并切换分支

::: code-group

```bash [创建分支]
git branch dev
```

```bash [切换分支]
git checkout dev
```

```bash [新建并切换到分支]
git checkout -b dev
```

```bash [将分支推送到远程]
git push -u origin dev
```

:::

## 创建备份分支（存档）

1️⃣ 假设你当前在 main 分支，准备进行撤销操作

```bash
# 语法：git branch <备份分支名>
# 习惯上加上 -backup 和 日期/时间 以便区分
git branch main-backup-20260131
```

> ⚠️ 注意：上述git命令`单纯执行 git branch 仅仅是在本地买了一份“保险”，这份保险并不在远程服务器（GitHub/GitLab）上`。
>
> > 本地备份的原理：Git 的机制是，只要有一个指针（分支）指向某个 Commit，则该 Commit 的数据就不会丢失。
> > 场景模拟
> >
> > - 你创建了 backup 分支（指向 Commit A）。
> > - 你在 main 分支执行 git reset --hard 回到了过去（指向 Commit B）。
> > - 此时，Commit A 虽然不在 main 上了，但因为它被 backup 抓着，所以它还在你的硬盘里，安然无恙。
> > - 若你发现撤销搞错了，你只需把 main 重置回 backup 即可。

2️⃣ 如果搞砸了，如何恢复？（读档）

```bash
# 方法 A：直接把当前分支重置到备份分支的状态（推荐）
git reset --hard main-backup-20260131

# 方法 B：如果方法 A 也不放心，可以先切到备份分支看看
git checkout main-backup-20260131
```

3️⃣ 完美结局：操作成功后清理（删除存档）

```bash
# 如果你对撤销的结果满意，备份分支就没有利用价值了。
git branch -D main-backup-20260131
```

## 撤回已暂存文件

✅ 适用场景：撤销 `git add`（状态：已暂存，未提交）
✅ 安全方案（推荐）：将文件从`暂存区`移回工作区，`文件内容的修改会被保留`，非常安全。

```bash
# 撤销指定文件的暂存
git restore --staged <fileName>

# 撤销所有已暂存的文件
git restore --staged .
```

> (注：旧版本 Git 可能使用 `git reset HEAD <fileName>`，效果一样，但 restore 语义更清晰)

## 撤回已提交，未推送

1️⃣ 本地提交（未推送），想保留代码修改

✅ 适用场景：刚 `git commit` 但未 `git push`
✅ 安全操作

```bash
# 保留修改在【暂存区】（推荐！可直接重提交）
git reset --soft HEAD~1
git commit -m "修正后的提交信息"

# 或撤销最近一次 commit，代码保留在暂存区 (绿色状态)
git reset --soft HEAD^

# 或保留修改在【工作区】（需重新 git add）
git reset HEAD~1  # --mixed 是默认参数，可省略
```

> :bulb: `HEAD~1` = 上一次提交（也可用`git log` 查看 `commit hash` 替代）

2️⃣ 场景二：本地提交，彻底丢弃所有修改

> :warning: 警告：此操作不可逆！代码将永久删除

✅ 仅当确认不需要本次提交的任何内容时使用

```bash
# ⚠️ 警告方案：Hard Reset（慎用）
git reset --hard HEAD~1

# ⚠️ 警告方案：Hard Reset（慎用）
# 彻底回退到上一个版本，丢弃所有修改
# 会直接删除最后一次提交的代码修改，恢复到上一次提交时的状态。你的代码会丢失！
git reset --hard HEAD^
```

## 撤回已推送到远程（团队协作场景！）

✅ 黄金法则：绝不直接 `reset + force push`！
✅ 安全方案：用 `revert` 生成“反向提交”

```bash
# 撤销最近一次提交（多人共用的分支）
git revert HEAD

# 或指定 commit hash：
# 1. 找到你想撤销的那个 commit 的 ID (hash)
git log

# 2. 生成一个“反向提交”
git revert a1b2c3d

# 按提示编辑撤销提交信息 → 保存退出
git push                 # 正常推送，无风险！
```

> 优势
>
> - 历史记录完整（原提交 + 撤销提交）
> - 不破坏他人本地仓库
> - 团队协作零冲突

## 撤回对比

| 场景        | 状态         | 推荐命令                       | 后果                           |
| :---------- | :----------- | :----------------------------- | :----------------------------- |
| 撤销 add    | 还在暂存区   | `git restore --staged .`       | 回到工作区，代码保留           |
| 撤销 commit | 保留代码修改 | `git reset --soft HEAD^`       | 撤销提交记录，代码保留在暂存区 |
| 撤销 commit | 丢弃所有修改 | `git reset --hard HEAD^`       | 不保留代码，不影响远程         |
| 撤销 push   | 公共分支     | `git revert <commit-id>/HEAD^` | 新增一条“反悔”记录，`最安全`   |
| 撤销 push   | 私有分支     | `reset + push --force`         | 抹除远程记录，`需谨慎`         |
