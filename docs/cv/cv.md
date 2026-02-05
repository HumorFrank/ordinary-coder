# CV 工程师

> 一路复制粘贴成为高级工程师的秘籍

# JavaScript

## sleep&setTimeout

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
