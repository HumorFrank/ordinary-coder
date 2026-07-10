import Theme from "vitepress/theme";
import "virtual:group-icons.css";
import "@vue-flow/core/dist/style.css";
import "./custom-outline.css";
import "./mermaid-clarity.css";
import { EnhanceAppContext } from "vitepress";
import "./style.css";

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
// 虚拟机 vs 容器
import DockerVsVM from"./components/DockerVsVM.vue"
// Docker 生命周期
import DockerLifecycle from "./components/DockerLifecycle.vue"
// Kubernetes 架构
import K8sArchitecture from "./components/K8sArchitecture.vue";
// K8s 核心资源
import K8sWorkloads from "./components/K8sWorkloads.vue";
// HTTP vs HTTPS 数据传输对比
import HTTPVSHTTPS from "./components/HTTPVSHTTPS.vue"
// Linux 文件系统层级演示
import LinuxFileSystem from "./components/LinuxFileSystem.vue";
//  Linux 常用命令分类演示
import LinuxCommand from "./components/LinuxCommand.vue";
// Linux 权限系统演示
import LinuxPermissions from "./components/LinuxPermissions.vue";
// 前端编译流程
import FeCompileFlow from "./components/FeCompileFlow.vue";
// H5 授权
import H5Code from "./components/H5Code.vue";
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
    ctx.app.component("DockerVsVM",  DockerVsVM);
    ctx.app.component("DockerLifecycle", DockerLifecycle);
    ctx.app.component("K8sArchitecture", K8sArchitecture);
    ctx.app.component("K8sWorkloads", K8sWorkloads);
    ctx.app.component("HTTPVSHTTPS", HTTPVSHTTPS);
    ctx.app.component("LinuxFileSystem", LinuxFileSystem);
    ctx.app.component("LinuxCommand", LinuxCommand);
    ctx.app.component("LinuxPermissions", LinuxPermissions);
    ctx.app.component("FeCompileFlow", FeCompileFlow);
    ctx.app.component("H5Code", H5Code);
  },
};
