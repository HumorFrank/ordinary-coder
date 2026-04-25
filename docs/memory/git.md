# Git

## 参考文档
- [Git](https://git-scm.com/book/zh/v2): Git Books

## 分支管理

### 创建分支

::: code-group

```bash [创建分支]
git branch <branch_name>
```
```bash [切换分支]
git checkout <branch_name>
# 或 
git switch <branch_name>
```

```bash [创建并切换到创建分支]
git checkout -b <branch_name>
# 或者
git switch -c <branch_name>
```
:::


### 删除分支

::: code-group
```bash [删除本地分支]
git branch -d <branch_name>
```
```bash [强制删除本地分支]
git branch -D <branch_name>
```
```bash [删除远程仓库分支]
git push origin --delete <branch_name>
# 或者 简写
git push origin :<branch_name>
```
:::

### 查看分支
::: code-group
```bash [查看所有分支]
git branch -a
```
```bash [查看当前分支]
git branch
# 或者
git status
```

:::