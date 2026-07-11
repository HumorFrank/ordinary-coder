import { defineConfig } from "vitepress";
import {  groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { withMermaid } from "vitepress-plugin-mermaid";
import siteConfig from "./siteConfig.mts";

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    base: siteConfig.base,
    title: siteConfig.title,
    description: siteConfig.description,
    head: [
      ['meta', { property: 'og:title', content: siteConfig.title }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:description', content: siteConfig.description }],
      ['meta', { property: 'og:image', content: siteConfig.ogImg }],
      ['meta', { property: 'og:url', content: siteConfig.fullUrl }],
    ],
    markdown: {
      config(md) {
        md.use(groupIconMdPlugin);
      },
    },
    mermaid: {
      theme: "default",
      themeVariables: {
        fontSize: "16px",
        primaryColor: "#e3f2fd",
        primaryBorderColor: "#1565c0",
        primaryTextColor: "#1a1a1a",
        lineColor: "#546e7a",
        secondaryColor: "#f3e5f5",
        tertiaryColor: "#e8f5e9",
      },
      themeCSS: `
        .node rect,
        .node circle,
        .node ellipse,
        .node polygon {
          rx: 4px;
          ry: 4px;
        }
      `,
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        padding: 8,
      },
    },
    themeConfig: {
      logo: "/ant.png",
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: "首页", link: "/" },
        { text: "示例", link: "/docs/example/example" },
      ],
      // 配置侧边栏，按照目录结构组织文档
      sidebar: [
        {
          text: "试图记录易忘的技能与知识",
          items: [
            { text: "CV 工程师", link: "/docs/cv/cv" },
            {
              text: "对抗遗忘曲线",
              link: "/docs/memory/memory",
              items: [
                { text: "HTML", link: "/docs/memory/html" },
                { text: "CSS", link: "/docs/memory/css" },
                { text: "JavaScript", link: "/docs/memory/javascript" },
                { text: "ES6", link: "/docs/memory/es6" },
                { text: "Vue", link: "/docs/memory/vue" },
                { text: "React", link: "/docs/memory/react" },
                { text: "Vue Router", link: "/docs/memory/vue-router" },
                { text: "Pinia", link: "/docs/memory/pinia" },
                { text: "Vite", link: "/docs/memory/vite" },
                { text: "Git", link: "/docs/memory/git" },
                { text: "高级", link: "/docs/memory/advanced" },
              ],
            },
            { text: "命名指南", link: "/docs/naming-guide/index" },
            { text: "Bug 制造与修复", link: "/docs/bug/bug" },
            { text: "面向资料编程", link: "/docs/salary/salary" },
            { text: "面向玄学部署", link: "/docs/deploy/deploy" },
            { text: "程序员单词发音", link: "/docs/words/words" },
            { text: "语义版本规范(semver)", link: "/docs/semver/semver" },
            {
              text: "魔幻的包管理器",
              link: "/docs/pkg/pkg",
              items: [{ text: "npm publish", link: "/docs/pkg/npm-publish" }],
            },
            { text: "Emmet 指南", link: "/docs/emmet/emmet" },
            { text: "版本控制", link: "/docs/version-control/index" },
            { text: "TypeScript", link: "/docs/typescript/typescript" },
            { text: "小程序系列", link: "/docs/miniprogram/miniprogram" },
            { text: "高级指南", link: "/docs/advanced/advanced" },
            { text: "前端项目架构设计", link: "/docs/fe-arch/index" },
            { text: "前端网络体系", link: "/docs/network/index" },
            { text: "SEO 优化", link: "/docs/seo/seo" },
            {
              text: "前端工程化与模块化",
              link: "/docs/core/fe-eng",
              items: [
                { text: "前端工程化", link: "/docs/core/fe-eng" },
                { text: "Monorepo", link: "/docs/core/fe-monorepo" },
              ],
            },
            {
              text: "技术栈&灵魂伴侣",
              link: "/docs/techstack/index",
              items: [
                { text: "框架导读", link: "/docs/techstack/fw-compare" },
                { text: "React", link: "/docs/techstack/react" },
                { text: "Svelte", link: "/docs/techstack/svelte" },
                { text: "Vue3", link: "/docs/techstack/vue" },
              ],
            },
            {
              text: "前端生态系统",
              link: "/docs/fe-eco/index",
              items: [
                { text: "Vue 生态", link: "/docs/fe-eco/vue-eco" },
                { text: "React 生态", link: "/docs/fe-eco/react-eco" },
              ],
            },
            {
              text: "全栈开发",
              link: "/docs/full-stack/index",
              items: [{ text: "Rust", link: "/docs/full-stack/rust" }],
            },
            {
              text: "基础设施与运维",
              link: "/docs/infra-ops/linux",
              items: [
                { text: "Linux 基础", link: "/docs/infra-ops/linux" },
                { text: "Nginx", link: "/docs/infra-ops/nginx" },
                { text: "Docker", link: "/docs/infra-ops/docker" },
                { text: "Kubernetes(k8s)", link: "/docs/infra-ops/Kubernetes" },
                { text: "CI / CD 自动化", link: "/docs/infra-ops/ci-or-cd" },
                {
                  text: "域名/DNS 与 HTTPS",
                  link: "/docs/infra-ops/domain-dns",
                },
              ],
            },
            {
              text: "程序员宝藏",
              link: "/docs/code-tre/index",
              items: [
                { text: "程序员工具", link: "/docs/code-tre/code-tools" },
                { text: "程序员资源", link: "/docs/code-tre/code-resources" },
              ],
            },
            {
              text: "CSS 原子化",
              link: "/docs/atomic-css/index",
            },
            {
              text: "编程语言与开源项目热度榜单",
              link: "/docs/programe-skills/programe-skills",
            },
            { text: "VSCode常用插件", link: "/docs/vscode-plugins/index" },
          ],
        },
      ],
      // 启用最后更新时间
      lastUpdated: {
        text: "最后更新于",
        formatOptions: {
          dateStyle: "short",
          timeStyle: "medium",
        },
      },
      // 启用文档页脚（上一页/下一页）
      docFooter: {
        prev: "上一页",
        next: "下一页",
      },
      // 配置搜索功能，使用本地搜索提供者
      search: {
        provider: "local",
        options: {
          translations: {
             button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档'
            },
            modal: {
              noResultsText: '无法找到相关结果',
              resetButtonTitle: '清除查询条件',
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭'
              }
            }
          }
        }
      },
      // 配置社交链接
      socialLinks: [
        {
          icon: "github",
          link: "https://github.com/HumorFrank/ordinary-coder",
        },
      ],
      // 配置大纲显示 1~4 级标题
      outline: {
        level: [1, 4], // Vite 默认通常是显示 h1~h4
        label: "目录", // 修改文本为 "本页目录"
      },
      footer: {
        message: 'Released under the MIT License.',
        copyright: `Copyright © ${new Date().getFullYear()}-present Libao-Jun`,
      },
      returnToTopLabel: '回到顶部',
      sidebarMenuLabel: '菜单',
      darkModeSwitchLabel: '主题',
    },
    vite: {
      plugins: [groupIconVitePlugin()],
      optimizeDeps: {
        include: ["mermaid"],
      },
    },
    sitemap: {
      // 末尾 / 至关重要！ 没有它，相对路径会解析到域名根目录而不是子目录
      // ❌：'https://libao-jun.github.io/ordinary-coder' 
      
      // 添加末尾 / 后，相对路径会解析到子目录
      // ✅：'https://libao-jun.github.io/ordinary-coder/'
      hostname: siteConfig.fullUrl,
    }
  }),
);
