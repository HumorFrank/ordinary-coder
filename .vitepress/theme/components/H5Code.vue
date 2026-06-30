<template>
  <div class="flow-wrap">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :fit-view="false"
      :nodes-draggable="false"
      :nodes-connectable="false"
      :elements-selectable="false"
      :zoom-on-scroll="false"
      :pan-on-scroll="false"
      :pan-on-drag="false"
      @init="onInit"
    />
  </div>
</template>

<script setup lang="ts">
import { VueFlow, MarkerType, Position } from '@vue-flow/core'

// 精准排布节点坐标，左右对称、纵向等距，避免线条交叉
const nodes = [
  // 顶部主流程
  { id: 'start', position: { x: 420, y: 30 }, data: { label: '开始' }, type: 'default', sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: 'enter-page', position: { x: 420, y: 120 }, data: { label: '进入网页' }, type: 'default', sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: 'check-code', position: { x: 420, y: 210 }, data: { label: '是否有授权code?' }, type: 'default', sourcePosition: Position.Bottom, targetPosition: Position.Top },

  // 左侧分支：有code流程
  { id: 'submit-code', position: { x: 120, y: 360 }, data: { label: '提交code给后台' }, type: 'default', sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: 'get-token', position: { x: 120, y: 460 }, data: { label: '换取登录凭证' }, type: 'default', sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: 'end', position: { x: 120, y: 560 }, data: { label: '结束' }, type: 'default', targetPosition: Position.Top },

  // 右侧分支：无code微信授权流程
  { id: 'wx-auth', position: { x: 680, y: 360 }, data: { label: '跳转微信授权' }, type: 'default', sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: 'user-auth', position: { x: 680, y: 460 }, data: { label: '用户授权并返回' }, type: 'default', sourcePosition: Position.Right, targetPosition: Position.Top },
]

const edges = [
  // ========== 主干实线流程（主链路，添加流动动画class） ==========
  { id: 'e1', source: 'start', target: 'enter-page', type: 'straight', markerEnd: { type: MarkerType.ArrowClosed, color: '#333' }, class: 'animate-edge' },
  { id: 'e2', source: 'enter-page', target: 'check-code', type: 'straight', markerEnd: { type: MarkerType.ArrowClosed, color: '#333' }, class: 'animate-edge' },
  // 左侧分支：有授权code
  { id: 'e3', source: 'check-code', target: 'submit-code', type: 'step', markerEnd: { type: MarkerType.ArrowClosed, color: '#333' }, class: 'animate-edge' },
  { id: 'e4', source: 'submit-code', target: 'get-token', type: 'straight', markerEnd: { type: MarkerType.ArrowClosed, color: '#333' }, class: 'animate-edge' },
  { id: 'e5', source: 'get-token', target: 'end', type: 'straight', markerEnd: { type: MarkerType.ArrowClosed, color: '#333' }, class: 'animate-edge' },
  // 右侧分支：无授权code
  { id: 'e6', source: 'check-code', target: 'wx-auth', type: 'step', markerEnd: { type: MarkerType.ArrowClosed, color: '#333' }, class: 'animate-edge' },
  { id: 'e7', source: 'wx-auth', target: 'user-auth', type: 'straight', markerEnd: { type: MarkerType.ArrowClosed, color: '#333' }, class: 'animate-edge' },

  // ========== 回流虚线（蓝色虚线流动动画） ==========
  {
    id: 'e-back',
    source: 'user-auth',
    target: 'enter-page',
    type: 'step',
    class: 'dash-edge animate-edge', // 同时拥有虚线+流动动画
    markerEnd: { type: MarkerType.ArrowClosed, color: '#333' },
  }
]

const onInit = (instance: { fitView: (options?: { padding?: number; duration?: number }) => void }) => {
  requestAnimationFrame(() => {
    instance.fitView({ padding: 0.3, duration: 200 })
  })
}
</script>

<style scoped>
.flow-wrap {
  height: 680px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

/* 节点通用样式，匹配截图方框 */
.flow-wrap :deep(.vue-flow__node) {
  border: 1px solid #000;
  background: #fff;
  color: #000;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 18px;
  text-align: center;
}

/* 主线基础线条 */
.flow-wrap :deep(.animate-edge .vue-flow__edge-path) {
  stroke-dasharray: 6 6;
  animation: flow-dash 1.2s linear infinite;
  stroke-width: 2;
}
/* 黑色主线流动线 */
.flow-wrap :deep(.animate-edge:not(.dash-edge) .vue-flow__edge-path) {
  stroke: #087f5b;
}

/* 回流蓝色虚线流动线 */
.flow-wrap :deep(.dash-edge .vue-flow__edge-path) {
  stroke: #2b8a3e;
}
/* 虚线流动动画关键帧 */
@keyframes flow-dash {
  to {
    stroke-dashoffset: -12;
  }
}
</style>