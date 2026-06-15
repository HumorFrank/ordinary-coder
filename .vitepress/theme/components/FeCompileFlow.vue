<script setup>
import { h, markRaw, defineComponent } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

// ── 颜色分组 ──────────────────────────────────────────────
const palette = {
  parse: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', shadow: 'rgba(102,126,234,.4)' },
  trans: { bg: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)', shadow: 'rgba(14,165,233,.4)' },
  source: { bg: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)', shadow: 'rgba(139,92,246,.4)' },
  gen: { bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', shadow: 'rgba(16,185,129,.4)' },
  bundle: { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', shadow: 'rgba(245,158,11,.4)' },
  ts: { bg: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', shadow: 'rgba(236,72,153,.4)' },
}

// ── 节点数据（data 中携带 group 用于着色） ─────────────────
const nodes = [
  { id: 'src', type: 'custom', label: '源代码', position: { x: 370, y: 0 }, data: { group: 'parse' } },
  { id: 'parse', type: 'custom', label: '解析 Parse', position: { x: 350, y: 130 }, data: { group: 'parse' } },
  // 左分支
  { id: 'transform', type: 'custom', label: '代码转换', position: { x: 120, y: 290 }, data: { group: 'trans' } },
  { id: 'codegen', type: 'custom', label: '代码生成', position: { x: 0, y: 440 }, data: { group: 'gen' } },
  { id: 'babel', type: 'custom', label: 'Babel 转换', position: { x: 260, y: 440 }, data: { group: 'ts' } },
  { id: 'bundle', type: 'custom', label: 'Bundle 生成', position: { x: -16, y: 590 }, data: { group: 'bundle' } },
  { id: 'tsc', type: 'custom', label: 'TypeScript 编译', position: { x: 234, y: 590 }, data: { group: 'ts' } },
  { id: 'code-split', type: 'custom', label: '代码分割 / 分包', position: { x: -30, y: 740 }, data: { group: 'bundle' } },
  { id: 'css', type: 'custom', label: 'CSS 预处理', position: { x: 256, y: 740 }, data: { group: 'ts' } },
  { id: 'resource', type: 'custom', label: '资源优化', position: { x: 0, y: 890 }, data: { group: 'bundle' } },
  // 右分支
  { id: 'src-lysis', type: 'custom', label: '源码解析', position: { x: 560, y: 290 }, data: { group: 'source' } },
  { id: 'dep-lysis', type: 'custom', label: '依赖分析', position: { x: 560, y: 440 }, data: { group: 'source' } },
  { id: 'mod-parse', type: 'custom', label: '模块解析', position: { x: 560, y: 590 }, data: { group: 'source' } },
]

// ── 边 ────────────────────────────────────────────────────
const edges = [
  { id: 'e0', source: 'src', target: 'parse', animated: true },
  { id: 'e1', source: 'parse', target: 'transform', animated: true },
  { id: 'e2', source: 'parse', target: 'src-lysis', animated: true, style: { stroke: '#a78bfa' } },
  { id: 'e3', source: 'transform', target: 'codegen', animated: true },
  { id: 'e4', source: 'transform', target: 'babel', animated: true },
  { id: 'e5', source: 'codegen', target: 'bundle', animated: true },
  { id: 'e6', source: 'bundle', target: 'code-split', animated: true },
  { id: 'e7', source: 'code-split', target: 'resource', animated: true },
  { id: 'e8', source: 'babel', target: 'tsc', animated: true },
  { id: 'e9', source: 'tsc', target: 'css', animated: true },
  { id: 'e10', source: 'src-lysis', target: 'dep-lysis', animated: true, style: { stroke: '#a78bfa' } },
  { id: 'e11', source: 'dep-lysis', target: 'mod-parse', animated: true, style: { stroke: '#a78bfa' } },
]

// ── 自定义节点（渲染函数） ──────────────────────────────────
const CustomNode = defineComponent({
  props: ['id', 'label', 'data', 'selected'],
  setup(props) {
    return () => {
      const g = palette[props.data?.group] || palette.parse
      return h('div', {
        class: 'cf-node' + (props.selected ? ' is-selected' : ''),
        style: {
          background: g.bg,
          padding: '12px 22px',
          borderRadius: '10px',
          fontSize: '20px',
          fontWeight: 600,
          color: '#fff',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          letterSpacing: '0.02em',
          cursor: 'pointer',
          border: '1px solid rgba(255,255,255,.25)',
          boxShadow: props.selected
            ? `0 0 0 3px ${g.shadow}, 0 8px 28px rgba(0,0,0,.28)`
            : '0 4px 14px rgba(0,0,0,.15)',
          transition: 'all .25s cubic-bezier(.4,0,.2,1)',
        },
      }, props.label)
    }
  },
})

// ── 点击事件 ──────────────────────────────────────────────
const { onNodeClick } = useVueFlow()
onNodeClick(({ node }) => {
  console.log('[FeCompileFlow] clicked:', node.label)
})
</script>

<template>
  <div class="cf-wrapper">
    <VueFlow :nodes="nodes" :edges="edges" :node-types="{ custom: markRaw(CustomNode) }" :default-edge-options="{
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#94a3b8', strokeWidth: 2 },
    }" :default-viewport="{ x: 40, y: 20, zoom: 0.95 }" :min-zoom="0.3" :max-zoom="2.5" :nodes-draggable="true"
      :nodes-connectable="false" :elements-selectable="true" :fit-view-on-init="true" class="cf-flow">
      <!-- 内置网格背景 -->
    </VueFlow>
  </div>
</template>

<style scoped>
.cf-wrapper {
  width: 100%;
  height: 580px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
}

html.dark .cf-wrapper {
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  border-color: #334155;
}

.cf-flow {
  width: 100%;
  height: 100%;
}

/* ── 节点动画 ─────────────────────────────────── */
:deep(.vue-flow__node) {
  transition: transform .25s cubic-bezier(.4, 0, .2, 1);
}

:deep(.vue-flow__node:hover) {
  transform: translateY(-2px);
}

:deep(.vue-flow__node:hover .cf-node) {
  box-shadow: 0 10px 30px rgba(0, 0, 0, .28) !important;
  transform: scale(1.04);
}

/* 选中态 */
:deep(.cf-node.is-selected) {
  transform: scale(1.04);
}

/* ── 边动画：流动虚线 ─────────────────────────── */
:deep(.vue-flow__edge-path) {
  stroke-dasharray: 6 4;
  animation: cf-flow-dash .6s linear infinite;
}

@keyframes cf-flow-dash {
  to {
    stroke-dashoffset: -10;
  }
}

/* ── 边的箭头 ────────────────────────────────── */
:deep(.vue-flow__arrowhead) {
  fill: #94a3b8;
}

/* ── 选中框 ──────────────────────────────────── */
:deep(.vue-flow__selection) {
  background: rgba(102, 126, 234, .08);
  border: 1px solid rgba(102, 126, 234, .4);
}
</style>
