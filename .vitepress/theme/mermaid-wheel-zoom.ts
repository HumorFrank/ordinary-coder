import { inBrowser } from 'vitepress'

const MIN_SCALE = 0.5
const MAX_SCALE = 3
const STEP = 0.1
const MIN_VIEWPORT_HEIGHT = 360
const MAX_VIEWPORT_HEIGHT = 620

const clamp = (value: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value))

type ZoomState = {
  scale: number
  defaultScale: number
  baseWidth: number
  baseHeight: number
  stage: HTMLElement
  viewport: HTMLElement
  hasInteracted: boolean
}

const stateMap = new WeakMap<HTMLElement, ZoomState>()

const getSvgDimensions = (svg: SVGSVGElement) => {
  const rect = svg.getBoundingClientRect()
  const viewBox = svg.viewBox?.baseVal
  const width = rect.width || viewBox?.width || 800
  const height = rect.height || viewBox?.height || 480
  return { width, height }
}

const ensureHostReady = (block: HTMLElement) => {
  const ready = block.dataset.mermaidWheelZoomReady === '1'
  const viewport = block.querySelector<HTMLElement>('.mermaid-zoom-viewport')
  const stage = block.querySelector<HTMLElement>('.mermaid-zoom-stage')
  if (!ready) return false
  return Boolean(viewport && stage)
}

function setupOne(block: HTMLElement) {
  if (ensureHostReady(block)) return

  const svg = block.querySelector<SVGSVGElement>('svg')
  if (!svg) return

  const oldViewport = block.querySelector('.mermaid-zoom-viewport')
  if (oldViewport) oldViewport.remove()
  const oldHint = block.querySelector('.mermaid-zoom-hint')
  if (oldHint) oldHint.remove()

  block.classList.add('mermaid-wheel-zoom-host')

  const viewport = document.createElement('div')
  viewport.className = 'mermaid-zoom-viewport'

  const stage = document.createElement('div')
  stage.className = 'mermaid-zoom-stage'

  const hint = document.createElement('div')
  hint.className = 'mermaid-zoom-hint'
  hint.textContent = '滚轮缩放 · 双击重置 · 放大后可拖动'

  block.appendChild(viewport)
  viewport.appendChild(stage)
  stage.appendChild(svg)
  block.appendChild(hint)

  const { width: baseWidth, height: baseHeight } = getSvgDimensions(svg)
  const viewportHeight = Math.min(MAX_VIEWPORT_HEIGHT, Math.max(MIN_VIEWPORT_HEIGHT, Math.ceil(baseHeight) + 24))
  viewport.style.height = `${viewportHeight}px`

  const fitScaleX = viewport.clientWidth > 0 ? viewport.clientWidth / baseWidth : 1
  const fitScaleY = viewport.clientHeight > 0 ? viewport.clientHeight / baseHeight : 1
  const defaultScale = clamp(Math.min(1, fitScaleX, fitScaleY))

  const state: ZoomState = {
    scale: defaultScale,
    defaultScale,
    baseWidth,
    baseHeight,
    stage,
    viewport,
    hasInteracted: false,
  }

  const apply = () => {
    state.stage.style.width = `${state.baseWidth}px`
    state.stage.style.height = `${state.baseHeight}px`

    // 默认按“适配但不放大”的倍率展示，避免首屏过大难看全图
    if (!state.hasInteracted) {
      state.scale = state.defaultScale
    }

    if (state.hasInteracted) {
      state.stage.style.transform = `scale(${state.scale})`
      return
    }

    if (state.scale === 1) {
      // 默认 1 倍时保持 Mermaid 原始渲染
      state.stage.style.removeProperty('transform')
      return
    }

    // 默认仅允许缩小适配，不放大
    state.stage.style.transform = `scale(${state.scale})`

    const canDrag = state.scale > state.defaultScale + 0.001
    viewport.dataset.canDrag = canDrag ? '1' : '0'
  }

  const onWheel = (event: WheelEvent) => {
    event.preventDefault()
    event.stopPropagation()
    state.hasInteracted = true
    const delta = event.deltaY < 0 ? STEP : -STEP
    state.scale = clamp(state.scale + delta)
    apply()
  }

  const onDoubleClick = () => {
    state.hasInteracted = false
    state.scale = state.defaultScale
    apply()
  }

  let isDragging = false
  let startClientX = 0
  let startClientY = 0
  let startScrollLeft = 0
  let startScrollTop = 0

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return
    if (state.scale <= state.defaultScale + 0.001) return

    isDragging = true
    startClientX = event.clientX
    startClientY = event.clientY
    startScrollLeft = viewport.scrollLeft
    startScrollTop = viewport.scrollTop

    viewport.classList.add('is-dragging')
    viewport.setPointerCapture(event.pointerId)
    event.preventDefault()
  }

  const onPointerMove = (event: PointerEvent) => {
    if (!isDragging) return

    const deltaX = event.clientX - startClientX
    const deltaY = event.clientY - startClientY

    viewport.scrollLeft = startScrollLeft - deltaX
    viewport.scrollTop = startScrollTop - deltaY
  }

  const onPointerUp = (event: PointerEvent) => {
    if (!isDragging) return

    isDragging = false
    viewport.classList.remove('is-dragging')
    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId)
    }
  }

  viewport.addEventListener('wheel', onWheel, { passive: false })
  viewport.addEventListener('dblclick', onDoubleClick)
  viewport.addEventListener('pointerdown', onPointerDown)
  viewport.addEventListener('pointermove', onPointerMove)
  viewport.addEventListener('pointerup', onPointerUp)
  viewport.addEventListener('pointercancel', onPointerUp)
  block.dataset.mermaidWheelZoomReady = '1'
  stateMap.set(block, state)
  apply()
}

function scanMermaid() {
  const blocks = document.querySelectorAll<HTMLElement>('.vp-doc .mermaid')
  blocks.forEach((block) => setupOne(block))
}

export function setupMermaidWheelZoom() {
  if (!inBrowser) return

  const run = () => {
    scanMermaid()

    const observer = new MutationObserver(() => {
      scanMermaid()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true })
    return
  }

  run()
}
