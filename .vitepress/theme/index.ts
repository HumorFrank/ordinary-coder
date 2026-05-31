import Theme from "vitepress/theme";
import "virtual:group-icons.css";
import "@vue-flow/core/dist/style.css";
import "./custom-outline.css";
import "./mermaid-clarity.css";
import { EnhanceAppContext } from "vitepress";

import { setupMermaidWheelZoom } from "./mermaid-wheel-zoom";
import AtomicCssFlow from "./components/AtomicCssFlow.vue";
import UnoCssFlow from "./components/UnoCssFlow.vue";
import TailwindFlow from "./components/TailwindFlow.vue";
import PostCssFlow from "./components/PostCssFlow.vue";
import FrameEvo from "./components/FrameEvo.vue";
import TriSet from "./components/TriSet.vue";
import FullStack from "./components/FullStack.vue";
import LSelect from "./components/LSelect.vue";
import FStEng from "./components/FStEng.vue";
import AIEng from "./components/AIEng.vue";
import EngB2M from "./components/EngB2M.vue";
import LStrat from "./components/LStrat.vue";
// Vue 生态
import VueEco from "./components/VueEco.vue";

export default {
  ...Theme,
  enhanceApp(ctx: EnhanceAppContext) {
    Theme.enhanceApp?.(ctx);
    setupMermaidWheelZoom();
    ctx.app.component("AtomicCssFlow", AtomicCssFlow);
    ctx.app.component("UnoCssFlow", UnoCssFlow);
    ctx.app.component("TailwindFlow", TailwindFlow);
    ctx.app.component("PostCssFlow", PostCssFlow);
    ctx.app.component("FrameEvo", FrameEvo);
    ctx.app.component("TriSet", TriSet);
    ctx.app.component("FullStack", FullStack);
    ctx.app.component("LSelect", LSelect);
    ctx.app.component("FStEng", FStEng);
    ctx.app.component("AIEng", AIEng);
    ctx.app.component("EngB2M", EngB2M);
    ctx.app.component("LStrat", LStrat);
    ctx.app.component("VueEco", VueEco);
  },
};
