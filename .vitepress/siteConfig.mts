// 你的 GitHub Pages 部署在 /ordinary-coder/ 子路径下
// 智能配置 base 路径：若在 CI 环境下（如 GitHub Actions）则使用子路径，否则使用根路径
const base = process.env.CI
 ? "/ordinary-coder/" 
 : "/";
// 智能配置 host 路径：若在 CI 环境下（如 GitHub Actions）则使用生产环境，否则使用开发环境
const host = process.env.CI
  ? "https://libao-jun.github.io"
  : "http://localhost:5173";
export default {
  title: "Coder Notes",
  description: "程序员随笔，试图记录今天学废、明天就会忘掉的技能与知识，给未来的自己多留一条路。",
  base,
  host,
  fullUrl: `${host}${base}`,
  ogImg: `${host}${base}logo.png`,
};
