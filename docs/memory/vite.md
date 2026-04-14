# Vite
## import.meta.glob 
❌ Danger
- `import.meta.glob` 不支持动态路径
- Vite 的 `import.meta.glob 必须在编译时确定路径` ，不支持在运行时根据变量动态拼接路径。
- 根本原因：`import.meta.glob` 的路径必须是`静态的字符串字面量`。

```ts
❌ 当前写法的问题
// 这样写会报错或无法正常工作
// 虽然语法合法，但因为 props?.type 是运行时才能确定的值，而 import.meta.glob 需要编译时确定路径，所以实际运行时会失败。
const publisherSvgModules = props?.type === 'normal' 
  ? import.meta.glob('/src/assets/svg/a/*.svg') 
  : import.meta.glob('/src/assets/svg/b/*.svg');

✅ 解决方案

// 方案1：分别定义（推荐）

// 在编译时分别定义两个 glob
const bonusModules = import.meta.glob('/src/assets/svg/a/*.svg');
const otherModules = import.meta.glob('/src/assets/svg/b/*.svg');

// 运行时选择使用哪个
const publisherSvgModules = props?.type === 'bonus' ? bonusModules : otherModules;

// 方案2：使用动态 import

// 不使用 glob，改用动态 import
const loadSvg = async (type) => {
  const modules = import.meta.glob('/src/assets/svg/**/*.svg');
  // 然后在运行时过滤
  const filtered = Object.entries(modules).filter(([path]) => 
    type === 'bonus' ? path.includes('/a/') : path.includes('/b/')
  );
  return Object.fromEntries(filtered);
};

// 方案3：提前导入所有（简单场景）
// 直接导入所有 SVG，运行时判断
const allModules = import.meta.glob('/src/assets/svg/**/*.svg');

const publisherSvgModules = Object.entries(allModules).reduce((acc, [path, module]) => {
  if (props?.type === 'bonus' && path.includes('/a/')) {
    acc[path] = module;
  } else if (props?.type !== 'bonus' && path.includes('/b/')) {
    acc[path] = module;
  }
  return acc;
}, {});
```