import { defineConfig } from "vitepress";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 你的 GitHub Pages 部署在 /ordinary-coder/ 子路径下
  // 智能配置 base 路径：若在 CI 环境下（如 GitHub Actions）则使用子路径，否则使用根路径
  base: process.env.CI ? "/ordinary-coder/" : "/",
  title: "前端防脱发指南",
  description: "试图记录今天学废、明天就会忘掉的前端知识，给未来的自己留条活路。",
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "首页", link: "/" }],
    // 配置侧边栏，按照目录结构组织文档
    sidebar: [
      {
        text: "试图记录会忘掉的前端知识",
        items: [
          { text: "CV 工程师", link: "/docs/cv/cv" },
          { text: "对抗遗忘曲线", link: "/docs/memory/memory" },
          { text: "Bug 制造与修复", link: "/docs/bug/bug" },
          { text: "面向资料编程", link: "/docs/salary/salary" },
          { text: "面向玄学部署", link: "/docs/deploy/deploy" },
          { text: "程序员单词发音", link: "/docs/words/words" },
          { text: "语义版本规范", link: "/docs/semver/semver" },
          { text: "魔幻的包管理器", link: "/docs/pkg/pkg" },
          { text: "Emmet 指南", link: "/docs/emmet/emmet" },
          { text: "版本控制", link: "/docs/version-control/index" },
          { text: "TypeScript", link: "/docs/typescript/typescript" },
          { text: "VSCode常用插件", link: "/docs/vscode-plugins/index" },
        ],
      },
    ],
    // 启用最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    // 启用文档页脚（上一页/下一页）
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    // 配置搜索功能，使用本地搜索提供者
    search: {
      provider: "local",
    },
    // 配置社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/HumorFrank/ordinary-coder" },
    ],
    // 配置大纲显示 1~3 级标题
    outline: {
      level: [1, 3], // Vite 默认通常是显示 h1~h3
      label: '本页目录' // 修改文本为 "本页目录"
    },
  },
  vite:{
    plugins: [
        groupIconVitePlugin()
      ]
  }
});
