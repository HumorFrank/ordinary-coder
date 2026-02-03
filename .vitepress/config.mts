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
    nav: [{ text: "Home", link: "/" }],

    sidebar: [
      {
        text: "试图记录会忘掉的前端知识",
        items: [
          { text: "CV 工程师", link: "/docs/cv/cv" },
          { text: "对抗遗忘曲线", link: "/docs/memory/memory" },
          { text: "Bug 制造与修复", link: "/docs/bug/bug" },
          { text: "面向资料编程", link: "/docs/salary/salary" },
          { text: "面向玄学部署", link: "/docs/deploy/deploy" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/HumorFrank/ordinary-coder" },
    ],

    // 配置大纲显示 2-3 级标题
    outline: {
      level: [2, 3], // 或者使用 'deep' 显示所有级别
      label: '页面导航' // 可选：修改大纲的标题
    }
  },
  vite:{
    plugins: [
        groupIconVitePlugin()
      ]
  }
});
