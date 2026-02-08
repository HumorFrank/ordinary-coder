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
  {
    id: 'rules',
    position: { x: 20, y: 20 },
    data: { label: 'Rules/Presets' },
    type: 'default',
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top
  },

  {
    id: 'extractors',
    position: { x: 220, y: 20 },
    data: { label: 'Extractors/Parsers' },
    type: 'default',
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top
  },
  {
    id: 'variants',
    position: { x: 420, y: 20 },
    data: { label: 'Variants System' },
    type: 'default',
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top
  },
  {
    id: 'core',
    position: { x: 220, y: 140 },
    data: { label: 'Core Engine (Generation & Matching)' },
    type: 'default',
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top
  },
  {
    id: 'jit',
    position: { x: 220, y: 260 },
    data: { label: 'Generator (JIT Output)' },
    type: 'default',
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top
  }
]

const edges = [
  { id: 'rules-core', source: 'rules', target: 'core', type: 'step', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
  { id: 'extractors-core', source: 'extractors', target: 'core', type: 'straight', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
  { id: 'variants-core', source: 'variants', target: 'core', type: 'step', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
  { id: 'transformers-core', source: 'transformers', target: 'core', type: 'step', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
  { id: 'shortcuts-core', source: 'shortcuts', target: 'core', type: 'step', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
  { id: 'core-jit', source: 'core', target: 'jit', type: 'straight', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed }
]

const onInit = (instance: { fitView: (options?: { padding?: number; duration?: number }) => void }) => {
  requestAnimationFrame(() => {
    instance.fitView({ padding: 0.2, duration: 200 })
  })
}
</script>

<style scoped>
.flow-wrap {
  width: 100%;
  height: 430px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 140px;
  text-align: center;
}

.flow-wrap :deep(.vue-flow__edge-path) {
  stroke: #a38bff;
  stroke-width: 2;
  stroke-dasharray: 5 5;
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
