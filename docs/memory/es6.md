# ES6
> JavaScript 的“健身教练”，让老 JS 变得更强壮、更优雅，语法糖多到让你甜到掉牙。

## 指南
- [ES5](https://yanhaijing.com/es5/#about)
- [ES6](https://262.ecma-international.org/6.0/)
- [ECMAScript 6入门](https://es6.ruanyifeng.com/)

## 运算符的扩展

- `**`：指数运算符，ES2016 新增的一个运算符。
  - `2 ** 2 // 4`
  - `a **= 2 // 等同于 a = a * a;`
- `?.`：链判断运算符，ES2020 新增的一个运算符，左侧的对象是否为`null/undefined`，若是则不再往下运算，而是返回`undefined`。
  - `obj?.prop`：对象属性是否存在
  - `obj?.[expr]`：同上
  - `func?.(...args)`：函数或对象方法是否存在
- `??`：Null 判断运算符，ES2020 新增的一个运算符，只有运算符左侧的值为`null/undefined`时，才会返回右侧的值。
  - `const name = res.nickName ?? 'frank';` 默认值只有在左侧属性值为`null/undefined`时，才会生效

## Set & Map 数据结构

::: details Set & WeakSet

1️⃣ `Set`：ES6 新增的数据结构，类似于数组，但成员值唯一、无重复。

> 常用方法
>
> > - `add(value)`：添加元素
> > - `delete(value)`：删除元素
> > - `has(value)`：判断元素是否存在
> > - `clear()`：清空所有元素
> > - `size`：元素个数

> 遍历：支持 forEach、for...of、keys、values、entries

> 特点
>
> > 只存储值，没有键，值唯一。

2️⃣ `WeakSet`：结构与 Set 类似，但`只能存储对象`（不能存储原始值），且对象为弱引用。

> 常用方法
>
> > - `add(value)`
> > - `delete(value)`
> > - `has(value)`

⚠️ 注意事项

> - `Set`本身是一个`构造函数`，用来`生成` Set 数据结构。

:::

::: details Map & WeakMap

1️⃣ `Map`：ES6 新增的数据结构，键值对集合，键和值都可以是任意类型。。

> 常用方法
>
> > - `set(key, value)`：设置键值对
> > - `get(key)`：获取键值
> > - `has(key)`：判断键是否存在
> > - `delete(key)`：删除键值对
> > - `clear()`：清空所有
> > - `size`键值对数量

> 遍历：支持 forEach、for...of、keys、values、entries

> 特点
>
> > 键可以是对象，顺序按插入顺序。

2️⃣ `WeakMap`：键值对集合，`键必须是对象`，值可以是任意类型，键为弱引用。

> 常用方法
>
> > - `set(key, value)`：设置键值对
> > - `get(key)`：获取键值
> > - `has(key)`：判断键是否存在
> > - `delete(key)`：删除键值对

> 特点
>
> > - 不能遍历（无 size、无 forEach）。
> > - 键对象被垃圾回收后自动移除。
> > - 适合存储与对象相关的私有数据。

:::

::: details 区别与联系总结表

| 特性         | Set        | WeakSet      | Map             | WeakMap            |
| ------------ | ---------- | ------------ | --------------- | ------------------ |
| 成员         | 只存值     | 只存对象     | Record<any,any> | Record<object,any> |
| 唯一         | 是         | 是           | 键唯一          | 键唯一             |
| 可遍历       | 是         | 否           | 是              | 否                 |
| 弱引用       | 否         | 是           | 否              | 是                 |
| 垃圾回收影响 | 否         | 是           | 否              | 是                 |
| 应用场景     | 唯一值集合 | 临时对象集合 | 映射关系        | 关联私有数据       |

:::

## Symbol 函数

> 作用：主要用于定义对象的唯一属性名，`避免属性名冲突`。

1️⃣ 使用规则

- `Symbol` 一种新的原始数据类型，通过 `Symbol()` 函数创建。
- `Symbol` 不能与其他类型直接运算（如 +），只能显式转换为字符串或布尔值。
- 作为对象属性时，不会被常规遍历方法枚举出来，可用 `Object.getOwnPropertySymbols()`。
- 作为属性名时，不能用点语法访问，必须用方括号 `[]` 访问，如`obj[sym] = value;`
- 全局注册的 `Symbol（Symbol.for/ Symbol.keyFor）`可跨文件共享。

2️⃣ 经典用法
::: code-group

```js [唯一性.js]
// 唯一性：每个 Symbol 都是唯一的，即使描述相同。
const a = Symbol("desc");
const b = Symbol("desc");
console.log(a === b); // false
```

```js [作为对象属性.js]
// 作为对象属性：防止属性名冲突，常用于对象“私有”属性。
const key = Symbol("id");
const obj = {
  [key]: 123,
  name: "Tom",
};
console.log(obj[key]); // 123
```

```js [定义常量枚举值.js]
// 用 Symbol 定义状态常量，含义明确
const STATUS = {
  RED: Symbol("red"),
  GREEN: Symbol("green"),
};

function getColor(color) {
  switch (color) {
    case STATUS.RED:
      return "红色";
    case STATUS.GREEN:
      return "绿色";
  }
}
getColor(STATUS.RED);
```

```js [内置 Symbol 用法.js]
// 内置 Symbol 用法（如自定义迭代器）
const obj = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        return i < 3 ? { value: i++, done: false } : { done: true };
      },
    };
  },
};
for (const v of obj) console.log(v); // 0 1 2
```

:::

3️⃣ 使用场景

⚠️ 注意事项

> Symbol 是原始数据类型，不是对象，所以`不能`用 `new Symbol()` 创建，否则会报错
