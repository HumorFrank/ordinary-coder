<template>
  <div class="vue-eco">
    <div class="demo-header">
      <span class="title">Vue 生态系统全景图</span>
      <span class="subtitle">2025 — 稳中有进，工具链 Rust 化加速</span>
    </div>

    <!-- 统计条 -->
    <div class="stats-bar">
      <div class="stat-item">
        <span class="stat-val">640 万</span>
        <span class="stat-label">npm 周下载量</span>
      </div>
      <div class="stat-item">
        <span class="stat-val">93%</span>
        <span class="stat-label">开发者满意度</span>
      </div>
      <div class="stat-item">
        <span class="stat-val">82%</span>
        <span class="stat-label">TypeScript 使用率</span>
      </div>
      <div class="stat-item">
        <span class="stat-val">68%</span>
        <span class="stat-label">Nuxt 使用率</span>
      </div>
      <div class="stat-item">
        <span class="stat-val">200+</span>
        <span class="stat-label">VueUse 工具函数</span>
      </div>
    </div>

    <!-- 分类导航 -->
    <div class="category-tabs">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="cat-tab"
        :class="{ active: activeCat === cat.id }"
        @click="activeCat = cat.id"
      >
        <span class="cat-icon">{{ cat.icon }}</span>
        <span class="cat-name">{{ cat.name }}</span>
      </button>
    </div>

    <!-- 内容区 -->
    <div class="eco-content">
      <!-- 左侧：项目列表 -->
      <div class="projects-panel">
        <div class="panel-header">
          <span class="panel-icon">{{ activeCategory.icon }}</span>
          <span class="panel-title">{{ activeCategory.name }}</span>
          <span class="panel-desc">{{ activeCategory.desc }}</span>
        </div>

        <div class="project-list">
          <div v-for="item in activeCategory.items" :key="item.name" class="project-card">
            <div class="project-top">
              <span class="project-name">{{ item.name }}</span>
              <span v-if="item.stars" class="project-stars">
                <span class="star-icon">⭐</span>
                {{ item.stars }}
              </span>
            </div>
            <div class="project-desc">{{ item.desc }}</div>
            <div v-if="item.tags" class="project-tags">
              <span v-for="tag in item.tags" :key="tag" class="proj-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：详情与推荐 -->
      <div class="detail-panel">
        <!-- 选型指南 -->
        <div class="guide-box">
          <div class="guide-title">🎯 一句话选型指南</div>
          <div class="guide-list">
            <div v-for="g in activeCategory.guides" :key="g.scene" class="guide-item">
              <span class="guide-scene">{{ g.scene }}</span>
              <span class="guide-arrow">→</span>
              <span class="guide-pick">{{ g.pick }}</span>
            </div>
          </div>
        </div>

        <!-- 推荐技术栈 -->
        <div class="stack-box">
          <div class="stack-title">📦 推荐技术栈组合</div>
          <div class="stack-list">
            <div v-for="s in stacks" :key="s.scene" class="stack-item">
              <div class="stack-scene">{{ s.scene }}</div>
              <div class="stack-tools">
                <span v-for="t in s.tools" :key="t" class="stack-tool">{{ t }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 关键词 -->
        <div class="keywords-box">
          <span class="kw-label">2025 关键词：</span>
          <span class="kw-tag stable">稳定</span>
          <span class="kw-tag speed">极速</span>
          <span class="kw-tag smart">智能</span>
          <span class="kw-tag merge">融合</span>
          <span class="kw-tag lite">轻量</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCat = ref('core')

const categories = [
  {
    id: 'core',
    name: '核心框架',
    icon: '⚡',
    desc: 'Vue 生态的基石——响应式、组件化、全栈能力',
    items: [
      { name: 'Vue 3.6', stars: '47.7k', desc: '响应式系统重做，采用 alien signals 技术，内存更低、更新更快', tags: ['核心', '响应式'] },
      { name: 'Nuxt 4', stars: '56k', desc: '引入 app/ 目录结构、更智能的数据获取、TypeScript 深度集成，定位为 Vue 全栈框架基石', tags: ['SSR', '全栈', 'SEO'] },
      { name: 'Vapor Mode', stars: 'WIP', desc: '零虚拟 DOM 编译模式，预计 2026 年发布，将极大提升运行时性能', tags: ['编译优化', '无VDOM'] },
    ],
    guides: [
      { scene: 'SPA 单页应用', pick: 'Vue 3 + Vite + Pinia' },
      { scene: 'SSR / SEO 项目', pick: 'Nuxt 4' },
      { scene: '追求极致性能', pick: '等待 Vapor Mode' },
    ]
  },
  {
    id: 'state',
    name: '状态管理与路由',
    icon: '🧭',
    desc: '数据流转的命脉——从路由到全局状态的一站式方案',
    items: [
      { name: 'Pinia 3', stars: '14k', desc: '使用率达 80%，彻底取代 Vuex。放弃 Vue 2 支持，全面拥抱 TypeScript', tags: ['状态管理', 'TS原生'] },
      { name: 'Vue Router 4', stars: '19.4k', desc: '原生 View Transition API 支持、稳定的 Data Loading API、类型安全路由', tags: ['路由', '类型安全'] },
      { name: 'VueUse', stars: '20k', desc: '200+ Composition API 工具函数，被称为 Vue 开发者的"必装库"', tags: ['组合式API', '工具集'] },
    ],
    guides: [
      { scene: 'Vue 3 项目', pick: 'Pinia + Vue Router 4' },
      { scene: 'Nuxt 项目', pick: 'Nuxt 内置状态 + ofetch' },
      { scene: '工具函数', pick: 'VueUse（必装）' },
    ]
  },
  {
    id: 'ui',
    name: 'UI 组件库',
    icon: '🎨',
    desc: '从 Material Design 到 Tailwind，覆盖所有场景的组件方案',
    items: [
      { name: 'Element Plus', stars: '26.4k', desc: 'Vue 3 生态最成熟的中文组件库，55+ 组件，40+ 语言包，后台首选', tags: ['后台', '中文', '成熟'] },
      { name: 'Naive UI', stars: '17.6k', desc: 'TypeScript 极致友好，UI 风格清新，中文文档完善，数据密集型场景', tags: ['TS友好', '仪表盘'] },
      { name: 'shadcn-vue', stars: '8k', desc: 'shadcn/ui 的 Vue 移植版——复制粘贴即拥有源码，零依赖、完全可控', tags: ['复制即用', 'Tailwind'] },
      { name: 'PrimeVue', stars: '13.2k', desc: 'Styled / Unstyled 双模式，80+ 组件，可视化主题工厂，ERP/BPM 首选', tags: ['双模式', '主题工厂'] },
      { name: 'Reka UI', stars: '5.4k', desc: 'Vue 官方支持的 Headless 组件内核——零样式、100% 可定制，shadcn-vue 的底层基础', tags: ['Headless', '官方支持'] },
      { name: 'Vuetify 3', stars: '40.7k', desc: 'Material You 动态主题，无障碍满分，周下载 636k', tags: ['Material', '无障碍'] },
      { name: 'Quasar', stars: '26.8k', desc: '一套代码编译 SPA / PWA / SSR / 移动端 / Electron / Capacitor', tags: ['跨端', '全平台'] },
      { name: 'Ant Design Vue', stars: '21.1k', desc: '完整 Ant Design 设计体系，ProComponents 加持，阿里系产品首选', tags: ['企业级', '国际化'] },
      { name: 'TDesign', stars: '腾讯', desc: '腾讯出品，跨端跨技术栈，Figma 设计资源完善，维护极活跃', tags: ['跨端', '设计资源'] },
    ],
    guides: [
      { scene: '从零自建设计系统', pick: 'Reka UI / Ark UI' },
      { scene: '组件复制即用、最小依赖', pick: 'shadcn-vue' },
      { scene: '中文生态 / 国内企业后台', pick: 'Element Plus / Naive UI' },
      { scene: '阿里系 / 国际化 SaaS', pick: 'Ant Design Vue' },
      { scene: '跨端交付 (Web + 移动 + 桌面)', pick: 'Quasar' },
      { scene: 'Material Design 严格遵循', pick: 'Vuetify 3' },
      { scene: '数据密集型 ERP/BPM', pick: 'PrimeVue' },
    ]
  },
  {
    id: 'build',
    name: '构建与工程化',
    icon: '🔧',
    desc: '从开发到测试到部署，Rust 驱动的工具链革命',
    items: [
      { name: 'Vite 7', stars: '72k', desc: '底层打包引擎替换为 Rolldown（Rust），Environment API 统一 client/server/edge', tags: ['ESM', '毫秒级HMR'] },
      { name: 'Rolldown', stars: '10k', desc: 'Rust 编写的 JS/TS 打包器，兼容 Rollup API，未来 Vite 底层引擎', tags: ['Rust', '打包'] },
      { name: 'VitePlus', stars: '新', desc: 'Evan You / VoidZero 推出的一体化工具链，统一 dev/build/test/lint/fmt/lib/run/ui', tags: ['一体化', 'Rust工具链'] },
      { name: 'Vitest', stars: '14k', desc: '与 Vite 深度整合的单元测试框架，API 兼容 Jest 但快 10 倍', tags: ['测试', 'Vite整合'] },
      { name: 'Playwright', stars: '65k+', desc: '微软出品，多浏览器 E2E 测试，已成为前端 E2E 事实标准', tags: ['E2E', '多浏览器'] },
      { name: 'Biome', stars: '17k', desc: 'Rust 实现的格式化+代码检查一体化工具，速度比 ESLint+Prettier 快 10-100 倍', tags: ['Rust', 'Lint+Format'] },
      { name: 'TypeScript', stars: '102k', desc: 'Vue 社区使用率达 82%，Vue 3 从零开始就为 TS 深度优化', tags: ['类型安全', '必备'] },
    ],
    guides: [
      { scene: '构建工具', pick: 'Vite 7' },
      { scene: '单元测试', pick: 'Vitest' },
      { scene: 'E2E 测试', pick: 'Playwright' },
      { scene: '代码检查', pick: 'Biome (Rust 原生速度)' },
    ]
  },
  {
    id: 'css',
    name: '样式方案与工具',
    icon: '✨',
    desc: '原子化 CSS 成为主流，Rust 编译器让样式飞起来',
    items: [
      { name: 'UnoCSS', stars: '17k', desc: '原子化 CSS 引擎，按需生成样式，Vite 生态事实标准的 CSS 方案之一', tags: ['原子化', '按需'] },
      { name: 'Tailwind CSS 4', stars: '87k', desc: 'Rust 重写编译引擎，构建速度提升 10 倍，CSS-first 配置方式', tags: ['原子化', 'Rust编译'] },
      { name: 'Daisy UI', stars: '36k', desc: '基于 Tailwind 的语义化组件库，快速原型和营销页面首选', tags: ['语义化', 'Tailwind插件'] },
      { name: 'PostCSS', stars: '28.8k', desc: 'CSS 后处理器，Autoprefixer、嵌套、CSS Modules 等插件的基础设施', tags: ['后处理', '基础设施'] },
    ],
    guides: [
      { scene: '追求极致性能', pick: 'UnoCSS (按需生成零开销)' },
      { scene: '社区生态最丰富', pick: 'Tailwind CSS 4' },
      { scene: '快速原型', pick: 'Daisy UI + Tailwind' },
    ]
  },
  {
    id: 'mobile',
    name: '移动端与跨端',
    icon: '📱',
    desc: '从 H5 到小程序到 App，Vue 生态的跨端全覆盖方案',
    items: [
      { name: 'Vant 4', stars: '24k', desc: '有赞出品，60+ 轻量组件（gzip < 100KB），电商 H5 首选', tags: ['轻量', '电商H5'] },
      { name: 'NutUI', stars: '6k+', desc: '京东出品，电商专用组件（商品列表、优惠券），同时适配 H5 / 小程序 / App 内嵌', tags: ['电商', '多端'] },
      { name: 'Varlet', stars: '4k', desc: 'Material Design 风格移动端组件库，同时支持 PC 端，暗黑模式内置', tags: ['Material', '双端'] },
      { name: 'uni-app', stars: '41k', desc: '跨端开发框架，一套代码编译到 iOS、Android、H5、各类小程序', tags: ['跨端', '小程序'] },
    ],
    guides: [
      { scene: '电商 H5', pick: 'Vant 4' },
      { scene: '多端小程序', pick: 'uni-app / NutUI' },
      { scene: 'Material Design 移动端', pick: 'Varlet' },
    ]
  },
]

const stacks = [
  {
    scene: '🎓 入门学习',
    tools: ['Vue 3', 'Vite', 'Vue Router', 'Pinia']
  },
  {
    scene: '🏢 后台管理系统',
    tools: ['Vue 3', 'Vite', 'TypeScript', 'Pinia', 'Element Plus', 'VueUse']
  },
  {
    scene: '📱 移动端',
    tools: ['Vue 3', 'Vite', 'TypeScript', 'Pinia', 'Vant 4']
  },
  {
    scene: '🌐 SEO / 内容站点',
    tools: ['Nuxt 4', 'Pinia', 'Nuxt UI']
  },
  {
    scene: '🏭 大型企业 Monorepo',
    tools: ['Vue 3', 'Vite', 'TypeScript', 'Pinia', 'Naive UI', 'Vitest', 'Playwright']
  },
]

const activeCategory = computed(() => categories.find(c => c.id === activeCat.value))
</script>

<style scoped>
.vue-eco {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  padding: 1.2rem;
  margin: 1rem 0;
}

.demo-header {
  margin-bottom: 0.8rem;
}

.title {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.subtitle {
  display: block;
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  margin-top: 0.15rem;
}

/* ===== 统计条 ===== */
.stats-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  padding: 0.6rem 0.8rem;
  background: var(--vp-c-bg);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: fit-content;
}

.stat-val {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.stat-label {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  margin-top: 0.1rem;
  white-space: nowrap;
}

/* ===== 分类 Tab ===== */
.category-tabs {
  display: flex;
  gap: 0.3rem;
  margin-bottom: 0.8rem;
  flex-wrap: wrap;
}

.cat-tab {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.7rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.cat-tab:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.cat-tab.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.cat-icon {
  font-size: 0.85rem;
}

/* ===== 主内容区 ===== */
.eco-content {
  display: flex;
  gap: 1rem;
}

/* ===== 左侧项目列表 ===== */
.projects-panel {
  flex: 1;
  min-width: 0;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;
}

.panel-icon {
  font-size: 1.1rem;
}

.panel-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.panel-desc {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
  width: 100%;
  margin-top: 0.15rem;
  line-height: 1.4;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.project-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.55rem 0.65rem;
  transition: border-color 0.2s;
}

.project-card:hover {
  border-color: var(--vp-c-brand-1);
}

.project-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}

.project-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.project-stars {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.star-icon {
  font-size: 0.6rem;
}

.project-desc {
  font-size: 0.66rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  margin-bottom: 0.25rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}

.proj-tag {
  font-size: 0.58rem;
  padding: 0.1rem 0.3rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-brand-1);
}

/* ===== 右侧详情 ===== */
.detail-panel {
  flex: 0 0 260px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.guide-box,
.stack-box {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0.55rem 0.65rem;
}

.guide-title,
.stack-title {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.4rem;
}

.guide-list {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.guide-item {
  font-size: 0.62rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  line-height: 1.4;
}

.guide-scene {
  color: var(--vp-c-text-3);
  min-width: fit-content;
}

.guide-arrow {
  color: var(--vp-c-brand-1);
}

.guide-pick {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.stack-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.stack-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.stack-scene {
  font-size: 0.62rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.stack-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}

.stack-tool {
  font-size: 0.58rem;
  padding: 0.1rem 0.3rem;
  background: var(--vp-c-brand-soft);
  border-radius: 3px;
  color: var(--vp-c-brand-1);
}

/* 关键词 */
.keywords-box {
  padding: 0.55rem 0.65rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.kw-label {
  font-size: 0.62rem;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

.kw-tag {
  font-size: 0.6rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-weight: 600;
}

.kw-tag.stable {
  background: #dbeafe;
  color: #1d4ed8;
}
.kw-tag.speed {
  background: #fef3c7;
  color: #b45309;
}
.kw-tag.smart {
  background: #e0e7ff;
  color: #4338ca;
}
.kw-tag.merge {
  background: #fce7f3;
  color: #be185d;
}
.kw-tag.lite {
  background: #d1fae5;
  color: #047857;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .eco-content {
    flex-direction: column;
  }

  .detail-panel {
    flex: none;
    width: 100%;
  }

  .category-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  .stats-bar {
    flex-wrap: wrap;
  }
}
</style>
