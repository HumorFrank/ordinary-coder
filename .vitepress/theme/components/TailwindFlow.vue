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

const nodes = [
  { id: 'a', position: { x: 238, y: 0 }, data: { label: 'Tailwind CSS' }, type: 'default', sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: 'b', position: { x: 220, y: 90 }, data: { label: 'Tailwind CSS Plugin' }, type: 'default', sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: 'c', position: { x: 20, y: 190 }, data: { label: 'Config System' }, type: 'default', sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: 'd', position: { x: 232, y: 190 }, data: { label: 'Utility Generator' }, type: 'default', sourcePosition: Position.Bottom, targetPosition: Position.Top },
  { id: 'e', position: { x: 480, y: 190 }, data: { label: 'Variant System' }, type: 'default', sourcePosition: Position.Bottom, targetPosition: Position.Top },
]

const edges = [
  { id: 'ab', source: 'a', target: 'b', type: 'straight', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
  { id: 'bc', source: 'b', target: 'c', type: 'step', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
  { id: 'bd', source: 'b', target: 'd', type: 'step', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
  { id: 'be', source: 'b', target: 'e', type: 'step', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
]

// VueFlow组件在初始化时会触发init事件，我们可以在事件处理函数中调用fitView方法来调整视图以适应所有节点和边。这里使用了requestAnimationFrame来确保在VueFlow组件完全渲染后再调用fitView，以获得更好的用户体验。
const onInit = (instance: { fitView: (options?: { padding?: number; duration?: number }) => void }) => {
  requestAnimationFrame(() => {
    instance.fitView({ padding: 0.2, duration: 200 })
  })
}
</script>

<style scoped>
.flow-wrap {
  height: 300px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.flow-wrap :deep(.vue-flow__node) {
  border: 1px solid #c9b9ff;
  background: #f7f3ff;
  color: #3a2f7b;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 14px;
  min-width: 120px;
  text-align: center;
}

.flow-wrap :deep(.vue-flow__edge-path) {
  stroke: #a38bff;
  stroke-width: 2;
}

.flow-wrap :deep(.flow-edge .vue-flow__edge-path) {
  stroke-dasharray: 6 6;
  animation: flow-dash 1.5s linear infinite;
}

.flow-wrap :deep(.vue-flow__arrowhead) {
  fill: #a38bff;
}

@keyframes flow-dash {
  to {
    stroke-dashoffset: -12;
  }
}
</style>