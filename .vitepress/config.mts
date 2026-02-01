import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端防脱发指南",
  description: "试图记录今天学废、明天就会忘掉的前端知识，给未来的自己留条活路。",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: '试图记录会忘掉的前端知识',
        items: [
          { text: 'CV 工程师', link: '/docs/cv/index' },
          { text: '对抗遗忘曲线', link: '/docs/memory/index' },
          { text: 'Bug 制造与修复', link: '/docs/bug/index' },
          { text: '面向工资编程', link: '/docs/salary/index' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
