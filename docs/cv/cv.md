# CV 工程师

> 一路复制粘贴成为高级工程师的秘籍

## CSS

### 溢出显示省略号

必须同时满足以下，`三个核心条件`（缺一不可）

- `强制不换行`：让文本在同一行显示。
- `隐藏溢出内容`：超出容器宽度的部分不可见。
- `显示省略号`：用 `...` 代替被修剪的文本。

```css [css]
.font-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

::: info 补充条件
`宽度限制`
- 元素必须有宽度（`width/max-width`）
- 或者在 `Flex/Grid` 布局中受父级约束，否则容器会被文本撑开，上述属性就失效了。

:::

### 多行省略号

```css [css]
.font-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制行数 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

## JavaScript

### 位运算符

```js [index.js]
// 位移
console.log(1 << 0); // 1
console.log(1 << 1); // 2
console.log(1 << 2); // 4
console.log(1 << 3); // 8
console.log(1 << 4); // 16

console.log(2 << 1); // 4

// 异或
let toggle = 0;
console.log((toggle ^= 1)); // 0 ^= 1 -> 1
console.log((toggle ^= 1)); // 1 ^= 1 -> 0
console.log((toggle ^= 1)); // 0 ^= 1 -> 1
```

### 评分函数

```js [index.js]
const rate = (r) => "⭐⭐⭐⭐⭐☆☆☆☆☆".slice(5 - r, 10 - r);
console.log(rate(0)); // "☆☆☆☆☆"
console.log(rate(1)); // "⭐☆☆☆☆"
console.log(rate(2)); // "⭐⭐☆☆☆"
console.log(rate(3)); // "⭐⭐⭐☆☆"
console.log(rate(4)); // "⭐⭐⭐⭐☆"
console.log(rate(5)); // "⭐⭐⭐⭐⭐"
```

### 倒序遍历

```js [index.js]
// 倒序遍历
for (let i = arr.length - 1; i >= 0; i--) {}
// 简写
for (let i = arr.length; i--; ) {}
```

### sleep&setTimeout

1️⃣ 代码
::: code-group

```ts [sleep.ts]
async function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
```

```ts [setTimeout.ts]
function timeOut(ms: number, callback: Function) {
  setTimeout(() => {
    callback();
  }, ms);
}
```

:::

2️⃣ 区别

::: code-group

```ts [sleep.ts]
export async function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('Before sleep');
  await sleep(3000);
  console.log('After sleep');
}

main();

// 输出

Before sleep
// 等待 3 秒
After sleep
```

```ts [setTimeout.ts]
function removeTips() {
  console.log('Tips removed');
}
console.log('Before setTimeout');
setTimeout(() => {
  removeTips();
}, 3000);
console.log('After setTimeout');

// 输出
Before setTimeout
After setTimeout
Tips removed
```

:::
3️⃣ 总结

| 函数       | 特征   | 应用场景                             | 备注                     |
| ---------- | ------ | ------------------------------------ | ------------------------ |
| setTimeout | 非阻塞 | 设定间隔，代码会继续往下执行         | 不阻塞，间隔结束执行回调 |
| sleep      | 阻塞   | 结合 `async/await`使用，等待时间结束 | 暂停等待间隔时间结束     |
