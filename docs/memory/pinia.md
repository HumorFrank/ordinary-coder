# Pinia

> Vue 的“仓库管理员”，专门帮你把数据分门别类收好，丢三落四？不存在的，状态管理一把梭！

## 基础

- `defineStore()` 定义 `Store`
- `defineStore()` 的返回值的命名——名称
  > - 最好含有 `store` 的名字，且以 `use` 开头，以 `Store` 结尾。
  > - 如：`useUserStore`，`useCartStore`，`useProductStore`
- `defineStore(storeId,[Setup Store | Option Store])` 参数
  > - `storeId`：第一个参数是应用中 Store 的唯一 ID。
  > - `[Setup | Option`：第二个参数可接受两类值（Setup 函数或 Option 对象）。

## Setup Store

> 必须在 `setup store` 中返回 `state` 的所有属性

- `ref()` -> state 属性
- `computed()` -> getters
- `function()` -> actions

```ts [index.ts]
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const name = ref("Eduardo");
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, name, doubleCount, increment };
});
```

## Option Store

- `state` -> store 的数据 (data)
- `getters` -> store 的计算属性 (computed)
- `actions` -> store 的方法 (methods)

```ts [index.ts]
export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0, name: "Eduardo" }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

## 组件使用 Store

```ts [index.ts]
import { useCounterStore } from "@/stores/counter";
// 在组件内部的任何地方均可以访问变量 `store` ✨
const store = useCounterStore();
```

## 持久化

> 持久化插件：`pinia-plugin-persistedstate`

1️⃣ 自动恢复流程

- 初始化 Store 时：`pinia-plugin-persist` 会在 Pinia Store 初始化时，自动从配置的存储引擎（默认 localStorage）中读取数据，并将数据同步到 Store 的响应式变量中。
- 响应式变量更新：持久化的数据会直接赋值给 Store 中定义的 `ref` 或 `reactive` 变量，保持响应性。

2️⃣ 总结

- 无需手动操作：插件会自动处理持久化数据的 `读取` 和 `赋值`。
- 直接使用 Store 状态：在组件中直接访问 `Store` 的响应式变量即可获取持久化后的值。
