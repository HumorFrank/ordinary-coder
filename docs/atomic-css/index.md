# CSS 原子化

## 什么是 CSS 原子化

> CSS 原子化（Atomic CSS）是一种 `CSS 架构方法`，其**核心思想**是将样式拆分为`最小的、单一职责`的`原子类（Atomic Classes）`。每个原子类只负责一个具体的样式属性

## 原子化 CSS 的优势

- **高度复用性** - 原子类可以在整个项目中复用
- **样式一致性** - 强制使用设计系统中的预定义值
- **包体积优化** - 避免样式重复，CSS 体积可控
- **开发效率** - 快速组合样式，无需命名困扰
- **维护性强** - 样式变更影响范围可预测

## 原子化 CSS 的挑战

- **学习成本** - 需要记忆大量原子类名
- **HTML 复杂度** - 类名可能会很长
- **设计约束** - 受限于预定义的设计系统
- **调试困难** - 样式分散在多个原子类中
- **大量重复原子类** - 由于是最小的和单一职责的原子类，所以会大量重复使用，建议提取为全局的 `shortcuts`

## 原子化 CSS 的演进历程

<AtomicCssFlow />

## 原子化库

- `Tailwind CSS`
- `Unocss`
- `AtomicCSS`
- `Tachyons`

# PostCSS CSS 转换工具的基石

## 什么是 PostCSS

> [PostCSS](https://postcss.docschina.org/) 是一个用 JS 转换 CSS 的`工具/平台`。它本身不是预处理器，而是一个允许使用插件来转换 CSS 的工具。

## 常用 PostCSS 插件

- **autoprefixer** - 自动添加浏览器前缀
- **postcss-preset-env** - 使用现代 CSS 语法
- **cssnano** - CSS 压缩优化
- **postcss-nested** - 支持嵌套语法
- **postcss-import** - 处理@import 语句

# UnoCSS 即时原子化 CSS 引擎

## UnoCSS 简介

> [UnoCSS](https://www.unocss.cn/) 是一个即时按需原子化 CSS 引擎，由 Vue.js 团队核心成员 Anthony Fu 开发。

## UnoCSS 的核心特性

- **即时性** - 按需生成 CSS，只包含使用的样式
- **零运行时** - 构建时生成，无运行时开销
- **高度可定制** - 支持自定义规则、预设和变体
- **TypeScript 支持** - 完整的类型定义

# TailwindCSS 实用优先的 CSS 框架

## TailwindCSS 简介

> [TailwindCSS](https://tailwindcss.com/) 是一个实用优先的 CSS 框架，提供了大量原子化的 CSS 类，让开发者可以快速构建现代化的用户界面。

## TailwindCSS 的优势

- **实用优先** - 提供低级别的实用类
- **响应式设计** - 内置响应式前缀
- **组件友好** - 易于提取组件
- **可定制性** - 高度可配置的设计系统

# ‌CSS-in-JS

## ‌什么是 CSS-in-JS
CSS-in-JS 是一种把 CSS 样式直接写在 JS 代码里的`技术方案`。让样式能跟着组件走，解决传统 CSS 全局冲突、难维护的问题 。‌‌‌
- ‌**核心概念‌‌**
> CSS-in-JS 不是某个具体库，而是一类解决方案的统称，把 CSS 样式集成到 JavaScript 文件中，利用 JS 的变量、条件判断、函数等能力来管理样式 。
- ‌**‌工作原理‌‌**
> 通过 JavaScript 动态生成 CSS 并注入页面，样式通常没有静态源文件，而是由 CSS 对象模型 API 在运行时构造 。
- ‌**‌适用场景‌**‌
> 主要配合 React、Vue、Angular 等组件化框架使用，尤其在 React 社区热度最高 

## CSS-in-JS 的优势
- ‌**样式不冲突‌**‌
> 自动为组件生成唯一的选择器名，样式只在该组件内生效，不用担心类名打架 。
- ‌**代码好维护‌**‌
> 样式和组件写在一起，删组件时样式也跟着删掉，不会留下无用代码 。
- ‌**样式能动态变‌**‌
> 可以直接用 JS 变量、组件状态（state）或属性（props）来控制样式，比如根据主题、屏幕尺寸实时改样式 。
- ‌**开箱即用‌**‌
> 多数库不需要单独配置 PostCSS、Less/Sass 等预处理工具 。‌‌‌

## CSS-in-JS 的挑战

- ‌‌**运行会变慢‌**‌
> 纯运行时方案（如 styled-components）会在浏览器里动态生成 CSS，首次渲染有开销，大型项目可能影响性能 。
- ‌‌**类名看不懂‌**‌
> 自动生成的选择器名像.css-15nl2r3这种，调试时很难对应回源码 。
- ‌‌**学习成本高‌**‌
> 要同时掌握组件框架、JavaScript 和 CSS，还要适应"样式写在 JS 里"的新思维方式 。
- ‌‌**没有统一标准‌‌**
> 不同库的语法差异大，从一个库切换到另一个库需要大量改写代码

# unocss/tailwindcss/postcss架构

### UnoCSS 核心架构

<UnoCssFlow />

### Tailwind CSS 核心架构

<TailwindFlow />

### PostCSS 核心架构

<PostCssFlow />

# 选择策略

- `PostCSS` 是 CSS 处理的瑞士军刀，适合需要高度定制的场景
- `UnoCSS` 是新一代的原子化 CSS 引擎，性能卓越且灵活性强
- `TailwindCSS` 是成熟稳定的原子化 CSS 框架，生态系统完善

## 功能特性对比

| 特性     | PostCSS    | UnoCSS          | TailwindCSS |
| -------- | ---------- | --------------- | ----------- |
| 类型     | CSS 处理器 | 原子化 CSS 引擎 | CSS 框架    |
| 学习曲线 | 中等       | 较低            | 较低        |
| 包大小   | 取决于插件 | 极小            | 中等        |
| 可定制性   | 极高       | 高              | 高          |
| 生态系统 | 丰富       | 新兴            | 成熟        |
| 构建速度 | 中等       | 极快            | 快          |
| IDE 支持 | 好         | 良好            | 优秀        |

## 最佳实践建议

- 小型项目：推荐 UnoCSS，快速轻量
- 中大型项目：推荐 TailwindCSS，生态成熟
- 定制需求高：推荐 PostCSS + 自定义插件
- 性能敏感：推荐 UnoCSS，构建最快
- 团队协作：推荐 TailwindCSS，学习成本低
