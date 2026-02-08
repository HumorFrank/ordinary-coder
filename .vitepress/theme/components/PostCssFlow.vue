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
		id: 'webpack',
		position: { x: 60, y: 20 },
		data: { label: 'Webpack' },
		type: 'default',
		sourcePosition: Position.Bottom,
		targetPosition: Position.Top
	},
	{
		id: 'vite',
		position: { x: 320, y: 20 },
		data: { label: 'Vite' },
		type: 'default',
		sourcePosition: Position.Bottom,
		targetPosition: Position.Top
	},
	{
		id: 'loader',
		position: { x: 60, y: 100 },
		data: { label: 'PostCSS Loader' },
		type: 'default',
		sourcePosition: Position.Bottom,
		targetPosition: Position.Top
	},
	{
		id: 'postcss-plugin',
		position: { x: 320, y: 100 },
		data: { label: 'PostCSS Plugin' },
		type: 'default',
		sourcePosition: Position.Bottom,
		targetPosition: Position.Top
	},
	{
		id: 'core',
		position: { x: 190, y: 190 },
		data: { label: 'PostCSS Core' },
		type: 'default',
		sourcePosition: Position.Bottom,
		targetPosition: Position.Top
	},
	{
		id: 'plugin-system',
		position: { x: 190, y: 270 },
		data: { label: 'Plugin System' },
		type: 'default',
		sourcePosition: Position.Bottom,
		targetPosition: Position.Top
	},
	{
		id: 'ast-parser',
		position: { x: 40, y: 370 },
		data: { label: 'AST Parser' },
		type: 'default',
		sourcePosition: Position.Bottom,
		targetPosition: Position.Top
	},
	{
		id: 'ast-transformer',
		position: { x: 190, y: 370 },
		data: { label: 'AST Transformer' },
		type: 'default',
		sourcePosition: Position.Bottom,
		targetPosition: Position.Top
	},
	{
		id: 'css-generator',
		position: { x: 340, y: 370 },
		data: { label: 'CSS Generator' },
		type: 'default',
		sourcePosition: Position.Bottom,
		targetPosition: Position.Top
	}
]

const edges = [
	{ id: 'webpack-loader', source: 'webpack', target: 'loader', type: 'step', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
	{ id: 'vite-plugin', source: 'vite', target: 'postcss-plugin', type: 'step', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
	{ id: 'loader-core', source: 'loader', target: 'core', type: 'step', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
	{ id: 'plugin-core', source: 'postcss-plugin', target: 'core', type: 'step', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
	{ id: 'core-plugin-system', source: 'core', target: 'plugin-system', type: 'step', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
	{ id: 'plugin-parser', source: 'plugin-system', target: 'ast-parser', type: 'step', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
	{ id: 'plugin-transformer', source: 'plugin-system', target: 'ast-transformer', type: 'straight', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed },
	{ id: 'plugin-generator', source: 'plugin-system', target: 'css-generator', type: 'step', class: 'flow-edge', markerEnd: MarkerType.ArrowClosed }
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
	height: 480px;
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
