# VitePress 示例

## 文档图片资源如何放

这个项目的 VitePress 在生产环境会带上 `/ordinary-coder/` 作为基础路径，所以图片最好按用途分成两类：

1️⃣ 当前文档专用图片

- 存放位置：和 Markdown 页面放在相邻目录，例如 `docs/images/`
- 引用方式：使用相对路径
- 适用场景：文章插图、流程图截图、只在当前页面使用的配图

```md
![当前页面专用图片](../images/html-local-asset.svg)
```

示例效果：

![当前页面专用图片](../images/html-local-asset.svg)

2️⃣ 需要固定公开 URL 的图片

- 存放位置：`public/images/`
- 适用场景：`og:image`、分享封面、需要在站外直接访问的资源
- 特点：构建时会原样复制到产物目录，不会加哈希

如果要在文档页面里引用 `public` 目录的图片，建议通过 `withBase` 处理基础路径：

```vue
<script setup>
import { withBase } from 'vitepress'

const sharedImage = withBase('/images/html-public-asset.svg')
</script>

<img :src="sharedImage" alt="公共图片资源" />
```

示例效果：

<script setup>
import { withBase } from 'vitepress'

const sharedImage = withBase('/images/html-public-asset.svg')
</script>

<img :src="sharedImage" alt="公共图片资源" />

3️⃣ 选择建议

- 页面插图优先放在文档附近，直接走相对路径，打包后最稳。
- 需要固定地址给 `meta`、第三方平台或站外链接使用的图片，放到 `public/images/`。
- 不要把文档内插图也统一写成根路径，否则切到带 base 的生产环境时更容易写错地址。
