# SEO 优化

SEO 全称 Search Engine Optimization（搜索引擎优化），是一种通过优化网站结构和内容，提高网站在搜索引擎中的排名，从而吸引更多流量和用户的策略。

::: tip 注意
SEO是一个长期优化过程(一般优化1-3个月才能看到效果)，无需急于求成。
:::

## 黑帽SEO vs 白帽SEO

### 黑帽SEO

黑帽SEO是指通过不正当的手段，如关键词堆砌、隐藏文本、欺诈性链接等，来提高网站在搜索引擎中的排名。这种做法虽然可以在短期内获得较好的效果，但长期来看会对网站造成严重的负面影响，甚至可能导致网站被搜索引擎惩罚。

### 白帽SEO

白帽SEO就是通过正当技术手段，例如优化 `robots.txt` / `sitemap.xml` / `TDK` / `JSON-LD` / `Open Graph` / `Web Vitals`等，来提高网站在搜索引擎中的排名。

## Google搜索引擎

Google 搜索是一款`全自动搜索引擎`，会使用名为“网页抓取工具”的软件定期探索网络，找出可添加到 Google 索引中的网页。
实际上，Google 搜索结果中收录的大多数网页都不是手动提交的，而是网页抓取工具在探索网络时找到并自动添加的。

### 搜索引擎原理

Google 搜索的工作流程分为 3 个阶段：抓取->索引编制->呈现搜索结果

- 1️⃣ **抓取**
  > Google 会使用名为“抓取工具”的自动程序从互联网上发现各类网页，并下载其中的文本、图片和视频。
- 2️⃣ **索引编制**
  > Google 会分析网页上的文本、图片和视频文件，并将信息存储在大型数据库 Google 索引中。
- 3️⃣ **呈现搜索结果**
  > 当用户在 Google 中搜索时，Google 会返回与用户查询相关的信息。

### 抓取

谷歌会使用(Googlebot)去抓取网页，Googlebot也被称为(抓取工具、漫游器或“蜘蛛”程序)，他会通过算法来决定哪些网页需要抓取，并且确保不会过快抓取，以免对网站造成负担。

那么它是怎么抓取的呢？

- 1️⃣ 通过链接抓取例如你的网站有a标签，那么Googlebot会通过a标签的href属性来抓取网页。`<a href="https://www.xx.com">xx</a>`
- 2️⃣ `robots.txt`(告诉爬虫机器人哪些页面可以抓取，哪些页面不能抓取，后面会详细讲)
- 3️⃣ 站点地图 `sitemap.xml`（列出网站中的网页/文件/视频等 URL，方便爬虫发现和抓取这些资源）
- 4️⃣ 若网站未收录，可以通过`Google Search Console`提交网站。
- 5️⃣ RSS订阅，例如你的网站有RSS订阅，那么Googlebot会通过RSS订阅来抓取网页。
- 6️⃣ 重定向，谷歌机器人也会根据你301/302重定向来抓取网页。
- 7️⃣ 现代谷歌浏览器已经可以识别 JS 代码中动态生成的链接，也会被收录。

### 索引编制

什么是索引编制？

- 索引编制是把抓取到的内容匹配成用户查询的形式，插入到索引数据库中。用户搜索时，Google 是在索引数据库中进行匹配和排序的，并不是实时抓取全网的，所以你修改的网页一般要(2-3周)才会被同步
- 被抓取 `≠` 被索引如果你在代码中编写了`noindex`，则该页面不会加入索引数据库中。

```html
<meta name="robots" content="noindex" />
```

- 索引信号 索引信号是指Googlebot分析网页的内容，例如`TDK`，`HTML语义化标签`，`JSON-LD`，`Open Graph`，`Web Vitals`，`alt属性`，分析这些内容和网站质量，用于进行评估提升排名。
- 注意事项 如果你的网站有以下情况，则会被降低排名
  > `伪装真实内容` `滥用门页` `滥用过期域名` `被黑内容` `滥用隐藏文字和链接` `关键字堆砌` `垃圾链接` `机器生成的流量` `恶意软件和恶意行为` `误导性功能`
  > `滥用规模化内容` `滥用网站声誉` `内容贫乏的联属营销` `用户生成的垃圾内容`

### 呈现搜索结果

谷歌官方承诺：`Google 不会通过收取费用来提高网页排名，网页排名是程序化地完成的`(靠的是你对SEO的实力)

- 1️⃣ 排名的考量
  > - 相关性-内容与搜搜意图的匹配
  > - 权威性-域名权重，外链质量
  > - 用户体验性-加载速度SEO友好
- 2️⃣ 收录
  > 在被抓如到索引之后，通常是2-3周才会被收录，排名需要一段时间的积累权重，一般是2-3个月。
- 3️⃣ 结果
  > 搜索的结果会全方面考量，用户的语言，设备，历史记录，SEO优化的是整体，而不是固定某个位置。

## robots.txt

`robots.txt` 是搜索引擎爬虫访问网站时遵循的规则，它告诉搜索引擎哪些页面可以抓取，哪些页面不能抓取。一般是存放在网站根目录下。

### 参数说明

- `User-agent` 搜索引擎爬虫的名称
> 例如 `Googlebot`，`Baiduspider`，`Bingbot`，`YandexBot`，`Sogou spider`，`Yahoo! Slurp`，`BingPreview`等，
> 也可以直接使用*表示所有搜索引擎爬虫都可以访问。

- `Disallow` 搜索引擎爬虫不能访问的页面
> 例如 `/admin/`，`/api/`，`/login/`，`/logout/`等。

- `Allow` 表示搜索引擎爬虫允许抓取的路径。
> 例如 `/`，`/about/`，`/contact/`等。

- `Crawl-delay` 搜索引擎爬虫访问网站的间隔时间
> 例如10，表示搜索引擎爬虫访问网站的间隔时间为10秒。

- `Sitemap` 表示搜索引擎爬虫可以访问网站地图的URL
> 例如 `https://www.xx.com/sitemap.xml`。

- `Host` 网站的域名
> 例如 `https://www.xx.com`。

::: tip 注意事项
若同一份 `robots.txt` 里既有通配符 `*`，又有具名爬虫（如 Googlebot），则对某只爬虫而言，
会优先采用与其名称匹配的那一组规则；没有单独声明时再回退到 `*`。
:::

### 示例

::: code-group
```txt [规则1]
User-agent: *
Disallow: /
Allow: /
Crawl: no
Crawl-delay: 10
```
```txt [规则2]
User-Agent: Googlebot
Allow: /
Disallow: /api/
Crawl-delay: 10

User-Agent: Baiduspider
Allow: /
Disallow: /api/
Crawl-delay: 10

User-Agent: Bingbot
Allow: /
Disallow: /api/
Crawl-delay: 10

User-Agent: YandexBot
Allow: /
Disallow: /api/
Crawl-delay: 10

User-Agent: Sogou spider
Allow: /
Disallow: /api/
Crawl-delay: 10

Sitemap: xxxx
 ```
```txt [规则3]
User-agent: Yisouspider
Allow: /

User-agent: Applebot
Allow: /

User-agent: bingbot
Allow: /

User-agent: Sogou inst spider
Allow: /

User-agent: Sogou web spider
Allow: /

User-agent: 360Spider
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: Bytespider
Allow: /

User-agent: PetalBot
Allow: /
```
:::


## sitemap.xml

`sitemap.xml` 是网站地图，用来向搜索引擎提供一批`希望被发现的页面 URL`（以及可选的更新时间、更新频率、优先级等提示信息），
帮助爬虫更系统地遍历站点。哪些路径`不允许抓取`或`不希望被索引`，
通常由 `robots.txt`、`noindex` 等机制单独声明，而不是靠 sitemap 来“禁止”。

### 主要作用
- 帮助搜索引擎发现页面
- 利于被发现与纳入索引的考虑，提高被抓取、被纳入索引的机会

### 常用字段

- loc（必填）：页面 绝对地址（`http / https`），需与站点实际可访问 URL 一致
> 示例：`https://www.example.com/page`、`https://www.example.com/page/1`

- lastmod（可选）：最后修改时间，建议使用 W3C Datetime（与 协议说明 一致）：
> - 仅日期：`2026-04-20`
> - 日期 + 时间（可带时区）：`2026-04-20T12:00:00+08:00`

- changefreq（可选）
> 相对本站该 URL 的“预期更新频率”，协议允许取值如下（英文为写入 XML 的值）

- priority（可选）
> 仅相对同一站点内其他 URL 的重要程度，浮点数 `0.0–1.0`，默认 `0.5`。

- 图片扩展（可选）
> 在 某个 `<url>` 条目内 使用 Google 图片扩展

- 视频扩展（可选）
> 在 某个 `<url>` 条目内 使用 `<video:video>`

## TDK

## JSON-LD

## Open Graph

## Web Vitals
