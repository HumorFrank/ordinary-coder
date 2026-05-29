<template>
  <div class="full-stack-map">
    <div class="demo-header">
      <span class="title">全栈知识地图</span>
      <span class="subtitle">—— 点击卡片查看各方向学习路线</span>
    </div>

    <div class="full-stack-grid">
      <div v-for="field in fields" :key="field.name" class="full-stack-card">
        <div class="full-stack-name">{{ field.name }}</div>
        <div class="full-stack-desc">{{ field.desc }}</div>
        <div class="full-stack-techs">
          <span v-for="tech in field.techs" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
      </div>
    </div>

    <div class="info-box">
      <strong>学习路径：</strong>① 前端基础 + 一个主流框架 → 能写页面 ② 补工程化（构建/测试/规范）→ 能交付 ③ 后端语言 + 框架 + 数据库 → 能写接口 ④ 全栈框架串联前后端 → 独立做项目 ⑤ 跨端 + 部署 + 服务器 → 能上线 ⑥ AI 编程助手贯穿全程 → 提效。
    </div>
  </div>
</template>

<script setup>
const fields = [
  {
    name: '前端基础',
    desc: '用户界面、交互体验、浏览器端的一切',
    techs: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'ES6', 'Sass/Less', 'PostCSS', 'Tailwind CSS', 'Unocss', 'CSS-in-JS']
  },
  {
    name: '前端框架',
    desc: '构建用户界面的主流框架与库',
    techs: ['React', 'Vue', 'Angular', 'Svelte', 'Solid.js', 'Qwik', 'Preact', 'Ember.js']
  },
  {
    name: '前端工程化',
    desc: '构建、测试、规范、自动化——让代码从源码到上线',
    techs: ['npm/pnpm', 'Vite/Webpack', 'ESM/CommonJS', 'AMD/CMD/UMD', 'Vitest', 'CI/CD', 'ESLint/Prettier', 'Monorepo']
  },
  {
    name: '后端开发',
    desc: '服务端业务逻辑、API 设计与数据处理',
    techs: ['Node.js', 'Java', 'Go', 'Python', 'Rust', 'PHP']
  },
  {
    name: '后端开发框架',
    desc: '各语言最流行的后端框架（每语言两个）',
    techs: ['Node.js: Express / Fastify', 'Java: Spring Boot / Quarkus', 'Go: Gin / Fiber', 'Python: Django / FastAPI', 'Rust: Actix Web / Axum', 'PHP: Laravel / Symfony']
  },
  {
    name: '数据库与存储',
    desc: '数据的建模、持久化、缓存与文件存储',
    techs: ['Oracle', 'MySQL', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'SQLite', 'MariaDB', 'Cassandra']
  },
  {
    name: '跨端开发',
    desc: '一套技术栈，覆盖 Web、小程序、移动端、桌面端',
    techs: ['小程序/Uni-app', 'React Native', 'Flutter', 'Electron/Tauri', 'PWA', 'SwiftUI/Compose']
  },
  {
    name: '全栈框架',
    desc: '前后端一体，SSR/SSG/API 一把梭',
    techs: ['Next.js/React', 'Nuxt.js/Vue', 'Remix/React', 'SvelteKit/Svelte', 'Astro', 'Nest.js/Node.js']
  },
  {
    name: '部署与运维',
    desc: '让应用稳定、安全、高性能地跑在线上',
    techs: ['Docker', 'Nginx', 'Shell', 'Linux', 'Kubernetes', '云服务器', 'Sentry/监控']
  },
  {
    name: '服务器',
    desc: '国内主流云服务器提供商',
    techs: ['阿里云', '华为云', '腾讯云', '天翼云', '移动云', '百度智能云', '京东云', '金山云']
  },
  {
    name: 'AI 编程助手',
    desc: 'AI 编程助手与大模型应用开发',
    techs: ['Cursor', 'Claude Code', 'GitHub Copilot', 'QWen', 'DeepSeek', 'OpenAI', 'Prompt Engineering']
  },
  {
    name: '算法',
    desc: '数据结构与算法——程序员的底层内功',
    techs: ['数组/链表', '栈/队列/堆', '哈希表', '树/图', '排序/二分查找', '贪心', '递归/回溯', '动态规划', 'BFS/DFS', '双指针/滑动窗口']
  }
]
</script>

<style scoped>
.full-stack-map {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  padding: 1rem 1.2rem;
  margin: 1rem 0;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.full-stack-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.full-stack-card {
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

.full-stack-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}

.full-stack-desc {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.5rem;
}

.full-stack-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tech-tag {
  font-size: 0.68rem;
  padding: 0.15rem 0.4rem;
  background: var(--vp-c-bg-soft);
  border-radius: 3px;
  color: var(--vp-c-text-2);
}

.info-box {
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  border-left: 3px solid var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .full-stack-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>