# HTML（网页结构）
> 网页的“结构工程师”，负责搭建页面的骨架和内容。

## 元数据（meta）

> [元数据](https://web.dev/learn/html/metadata?hl=zh-cn)

1️⃣ 官方定义的元标记，主要有两种类型

- 一种是包含 `http-equiv` 属性的 `pragma` 指令
- 另一种是已命名的元类型（例如带有 `name` 属性的视口元标记）

2️⃣ `http-equiv` 属性

- `content-language`：内容语言状态，（此功能不符合规范。建议改用 `lang` 属性。）
- `content-type`：编码声明状态， `http-equiv="content-type"` 和 `<meta charset="utf-8" />`不能同时存在（设置 `charset` 的另一种方法。）。
- `default-style`：默认样式
- `refresh`：起到定时刷新或者重定向的作用（）
- `set-cookie`：设置 Cookie，不符合规范，没有效果。
- `x-ua-compatible`： X-UA-Compatible X-UA 兼容
- `content-security-policy`：内容安全策略

## 开放图谱协议（The Open Graph protocol）

1️⃣ 介绍

- 即将你的网站地址（http://域名.xx）,发给其他人，看看你的网站在不同平台上的呈现情况
- 基于元数据（Meta）

2️⃣ 支持配置与测试

- ❇️ 开发图谱协议：https://ogp.me/
- ㊙️ 测试你的域名：https://auraplusplus.com/tools/meta-previews

3️⃣ Example

::: code-group
```html [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <meta property="og:site_name" content="%VITE_APP_WEB_TITLE%" />
    <meta property="og:title" content="%VITE_APP_WEB_TITLE%" />
    <meta property="og:description" content="%VITE_APP_WEB_DESCRIPTION%" />
    <meta property="og:url" content="%VITE_APP_WEB_URL%" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="%VITE_APP_WEB_IMAGE%" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./src/main.ts"></script>

    <noscript> 网站或者应用描述...... </noscript>
  </body>
</html>
```

```text [.evn.production]
# 其他环境变量
# og info
VITE_APP_WEB_DESCRIPTION="你的或者APP描述"
VITE_APP_WEB_TITLE='你的网站或者APP标题'
VITE_APP_WEB_URL='你的网站或者APP地址（如：https://example.com）'
VITE_APP_WEB_NAME='你的网站或者APP名称'
VITE_APP_WEB_IMAGE='你的网站或者APP logo地址（如：https://example.com/logo.png）'
```
:::

> ⚠️ 注意: `VITE_APP_WEB_IMAGE` 使用的是网络地址（你可以将图片资源放到你的public目录下，网络地址就是你的域名/xxx.png）
