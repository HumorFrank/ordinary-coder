# 更新日志

## [2026-07-11 v1.0.3]
- 完善 `config.mts` 配置
  - 搜索 新增 `search` 的 `options` 配置
  - 首页 新增 `footer` 配置
  - 新增 构建优化 `vite -> build & rollupOptions` 配置
  - 新增 缓存策略 `meta -> Cache-Control` 配置

## [2026-07-11 v1.0.2]
- 修复 `sitemap.xml` 文件中主机名解析问题
  - 添加末尾 `/` 后，相对路径会解析到子目录，**loc** 会包含 `/ordinary-coder` 路径
  - 末尾未加 `/` 后，解析到域名根目录，而不是子目录，**loc** 不包含 `/ordinary-coder` 路径
- 新增 `OpenGraph` 元数据优化
  - 新增 `og:title` 元标签
  - 新增 `og:type` 元标签
  - 新增 `og:url` 元标签
  - 新增 `og:description` 元标签
  - 新增 `og:image` 元标签
  
## [2026-07-09 v1.0.1]
- 程序员工具箱
  - 新增电脑磁盘空间分析工具
- 新增 `CHANGELOG.md` 文件
- 新增 `SEO` 优化
  - 新增 `robots.txt` 文件
  - 新增 `sitemap.xml` 文件
- 新增 `style.css` 文件
- 优化博客标题和描述
