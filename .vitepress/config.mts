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
          { text: "面向工资编程", link: "/docs/salary/salary" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  vite:{
    plugins: [
        groupIconVitePlugin()
      ]
  }
});
