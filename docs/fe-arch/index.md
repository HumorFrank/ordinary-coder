# 前端项目架构设计

## 架构演进

| 级别       | 技术栈               | 用户规模    | 典型场景                 |
| ---------- | -------------------- | ----------- | ------------------------ |
| **入门级** | HTML/CSS/JS          | 个人/小团队 | 个人博客/宣传页/简单工具 |
| **进阶级** | Vue/React + 构建工具 | 中小型企业  | 管理系统/电商前台/SaaS   |
| **企业级** | 框架 + 微前端/SSR    | 大型应用    | 大型平台/复杂业务系统    |

::: warning 💡 如何选择？

- 个人项目 → 入门级
- 创业公司 MVP → 入门级或进阶级
- 企业管理系统 → 进阶级
- 大型互联网平台 → 企业级

:::

## HTML/CSS/JS项目(入门级)

### 推荐目录结构

```sh
simple-project/
├── index.html              # 首页
├── about.html              # 关于页面（如有）
├── css/
│   ├── reset.css           # 重置样式
│   ├── variables.css       # CSS 变量（颜色、字体等）
│   ├── components.css      # 组件样式（按钮、卡片等）
│   └── main.css            # 主样式文件
├── js/
│   ├── utils.js            # 工具函数
│   ├── api.js              # 简单的 API 调用
│   └── main.js             # 主逻辑
├── assets/
│   ├── images/             # 图片资源
│   └── fonts/              # 字体文件
└── README.md               # 项目说明
```

### 适用场景

- 个人博客、简历页面
- 产品宣传页（Landing Page）
- 简单的工具页面（计算器、转换器等）
- 原型验证、快速 Demo

## Vue/React项目(进阶级)

### Vue 项目推荐结构

```sh
vue-project/
├── public/                     # 静态资源
│   └── favicon.ico
├── src/
│   ├── assets/                 # 样式、图片、字体
│   │   ├── styles/
│   │   │   ├── variables.scss
│   │   │   ├── mixins.scss
│   │   │   └── global.scss
│   │   └── images/
│   ├── components/             # 通用组件
│   │   ├── common/             # 全局通用（Button、Modal 等）
│   │   │   ├── Button/
│   │   │   │   ├── index.vue
│   │   │   │   └── Button.scss
│   │   │   └── Modal/
│   │   └── business/           # 业务组件（UserCard 等）
│   ├── views/                  # 页面组件
│   │   ├── Home/
│   │   ├── User/
│   │   │   ├── List.vue
│   │   │   └── Detail.vue
│   │   └── Product/
│   ├── router/                 # 路由配置
│   │   └── index.js
│   ├── stores/                 # Pinia/Vuex 状态管理
│   │   ├── user.js
│   │   └── app.js
│   ├── services/               # API 服务
│   │   ├── request.js          # axios 封装
│   │   ├── user.js
│   │   └── product.js
│   ├── utils/                  # 工具函数
│   │   ├── format.js
│   │   ├── validate.js
│   │   └── storage.js
│   ├── composables/            # 组合式函数
│   │   ├── useAuth.js
│   │   └── useLoading.js
│   ├── constants/              # 常量定义
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── tests/                      # 测试文件
├── .env                        # 环境变量
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

### React 项目推荐结构

```sh
react-project/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/             # 通用组件
│   │   │   ├── Button/
│   │   │   │   ├── index.jsx
│   │   │   │   └── Button.module.css
│   │   │   └── Modal/
│   │   └── business/           # 业务组件
│   ├── pages/                  # 页面组件
│   │   ├── Home/
│   │   ├── User/
│   │   └── Product/
│   ├── hooks/                  # 自定义 Hooks
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   ├── services/               # API 服务
│   │   ├── api.js
│   │   └── userService.js
│   ├── store/                  # Redux/Zustand 状态管理
│   │   ├── slices/
│   │   └── index.js
│   ├── utils/
│   ├── constants/
│   ├── App.jsx
│   └── main.jsx
├── tests/
└── package.json
```

### 目录组织方式选择

1️⃣ 按类型组织（适合小型项目）

```sh
src/
├── components/     # 所有组件
├── views/          # 所有页面
├── stores/         # 所有状态
└── services/       # 所有服务
```

2️⃣ 按功能组织（适合中大型项目）

```sh
src/
├── features/
│   ├── auth/       # 认证功能的所有代码
│   ├── user/       # 用户功能的所有代码
│   └── product/    # 商品功能的所有代码
├── shared/         # 共享资源
└── App.vue
```

### 适用场景

- 企业管理系统（ERP、CRM、OA）
- 电商前台/后台
- SaaS 应用
- 需要复杂交互的 Web 应用

## 大型应用架构(企业级)

### 微前端架构

> 当项目规模大到一定程度，单个代码库难以维护时，可以考虑微前端架构。

```sh
大型电商平台/
├── 基座应用（主框架）
│   ├── 顶部导航
│   ├── 侧边菜单
│   ├── 用户中心入口
│   └── 子应用容器
├── 商品子应用（独立部署）
│   ├── 商品列表
│   ├── 商品详情
│   └── 商品管理
├── 订单子应用（独立部署）
│   ├── 购物车
│   ├── 订单列表
│   └── 支付流程
├── 用户子应用（独立部署）
│   ├── 个人中心
│   ├── 收货地址
│   └── 优惠券
└── 营销子应用（独立部署）
    ├── 活动页面
    ├── 优惠券发放
    └── 积分商城
```

::: warning 微前端的优势

- **团队自治** — 每个子应用独立开发、部署
- **技术栈无关** — 不同团队可以用不同框架
- **渐进式升级** — 可以逐步重构老系统

:::

### 企业级目录结构

```sh
enterprise-project/
├── apps/                       # 微前端子应用
│   ├── main/                   # 基座应用
│   ├── product/
│   ├── order/
│   └── user/
├── packages/                   # 共享包（Monorepo）
│   ├── ui-components/          # 通用组件库
│   ├── utils/                  # 工具函数
│   ├── constants/              # 常量定义
│   └── types/                  # TypeScript 类型
├── shared/                     # 共享配置
│   ├── eslint-config/
│   ├── ts-config/
│   └── vite-config/
├── docs/                       # 项目文档
├── scripts/                    # 构建脚本
└── package.json
```

### 性能优化架构

```sh
性能优化策略/
├── 构建时优化
│   ├── 代码分割（Code Splitting）
│   ├── 路由懒加载
│   ├── Tree Shaking
│   └── 资源压缩
├── 运行时优化
│   ├── 虚拟滚动（长列表）
│   ├── 图片懒加载
│   ├── 组件按需渲染
│   └── 缓存策略
└── 网络优化
    ├── CDN 加速
    ├── HTTP 缓存
    ├── 资源预加载
    └── Service Worker
```

### SSR/SSG 架构

| 方案 | 适用场景             | 代表框架         |
| ---- | -------------------- | ---------------- |
| SSR  | 需要 SEO、首屏渲染快 | Next.js、Nuxt.js |
| SSG  | 内容静态、更新不频繁 | Astro、VitePress |
| 混合 | 部分静态、部分动态   | Next.js (ISR)    |

### 适用场景

- 大型互联网平台（电商、社交、内容平台）
- 复杂的企业级应用
- 需要支持多团队协作的项目
- 对性能和可维护性要求极高的项目

## 架构选择(用户量级别)

### 个人/小团队(日活 1k-)
- 特点：快速迭代、资源有限、需求变化快
- 推荐架构
  - 技术栈：Vue 3 + Vite 或 React + Vite
  - 状态管理：Pinia 或 Zustand（轻量级）
  - UI 库：Element Plus / Ant Design
  - 部署：Vercel / Netlify / 云服务器
- 目录结构：简单按类型组织即可

### 中型企业(日活 100k-)
- 特点：业务复杂、团队协作、需要稳定性
- 推荐架构
  - 技术栈：Vue 3 + TypeScript 或 React + TypeScript
  - 状态管理：Pinia + 组合式函数 或 Redux Toolkit
  - UI 库：自建组件库 + 业务组件库
  - 测试：单元测试 + E2E 测试
  - 部署：CI/CD 流水线 + Docker
- 目录结构：按功能组织，建立规范

### 大型平台(日活 100k+)
- 特点：高并发、多团队协作、长期维护
- 推荐架构
  - 技术栈：React/Vue + TypeScript（严格模式）
  - 架构：微前端 + Monorepo
  - 状态管理：细粒度状态管理 + 服务端状态缓存
  - 性能：SSR/SSG + CDN + 边缘计算
  - 监控：前端监控 + 错误追踪 + 性能分析
- 目录结构：Monorepo + 微前端

## 参考资料

- [easy-vibe](https://datawhalechina.github.io/easy-vibe/zh-cn/)
- [Vue 风格指南](https://vuejs.org/style-guide/)
- [React 项目结构建议](https://react.dev/learn/thinking-in-react)
- [Bulletproof React - 架构指南](https://github.com/alan2207/bulletproof-react)
- [Feature Sliced Design](https://feature-sliced.design/)
- [微前端架构](https://micro-frontends.org/)

