import Theme from 'vitepress/theme'
import 'virtual:group-icons.css'
import '@vue-flow/core/dist/style.css'
import AtomicCssFlow from './components/AtomicCssFlow.vue'
import UnoCssFlow from './components/UnoCssFlow.vue'
import TailwindFlow from './components/TailwindFlow.vue'
import PostCssFlow from './components/PostCssFlow.vue'
import { EnhanceAppContext } from 'vitepress'

export default {
	...Theme,
	enhanceApp(ctx: EnhanceAppContext) {
		Theme.enhanceApp?.(ctx)
		ctx.app.component('AtomicCssFlow', AtomicCssFlow)
		ctx.app.component('UnoCssFlow', UnoCssFlow)
		ctx.app.component('TailwindFlow', TailwindFlow)
		ctx.app.component('PostCssFlow', PostCssFlow)
	}
}