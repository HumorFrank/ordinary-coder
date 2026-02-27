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

### 去除元素标记

```js [removeTag.js]
// 去除字符串里元素标记
const removeTag = (fragment) =>
  new DOMParser().parseFromString(fragment, "text/html").body.textContent || "";
// test
removeTag(`<div>Hello World</div>`); // Hello World
```

### 筛选对象属性

```js [pick.js]
const pick = (obj, ...props) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => props.includes(k)));
// test
pick({ a: 1, b: 2, c: 3 }, "a", "b"); // {a:1,b:2}
```

### 解析URL中的参数

```js [parseURL.js]
const parseQuery = (url) => {
  const q = {};
  url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
  return q;
};
// test
console.log(parseQuery("http://example.com/?a=10&b=20")); // {a:10,b:20}
console.log(parseQuery("a=1&b=2")); // {a:1,b:2}
```

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

### String

#### padStart

> `padStart()` 方法用另一个字符串填充当前字符串(如果需要的话，会重复填充)，以便产生的字符串达到给定的长度。从当前字符串的`左侧`开始填充。

1️⃣ 语法

```js
str.padStart(targetLength [, padString])
```

- **参数**
  - `targetLength`: 当前字符串需要填充到的目标长度。
    - 如果这个数值小于当前字符串的长度，则返回当前字符串本身。
  - `padString` (可选): 填充字符串。
    - 如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。
    - 此参数的默认值为 " "（U+0020）。

- **返回值**
  - 在原字符串开头填充指定的填充字符串直到目标长度所形成的新字符串。

2️⃣ 示例

```js
// 1. 基础用法
const str = "5";
console.log(str.padStart(2, "0")); // "05"

// 2. 默认填充空格
const str2 = "Hello";
console.log(str2.padStart(10)); // "     Hello"

// 3. 目标长度小于原字符串长度（不做任何改变）
const str3 = "JavaScript";
console.log(str3.padStart(5, ".")); // "JavaScript"

// 4. 填充字符串过长（会被截断）
const str4 = "123";
console.log(str4.padStart(6, "abcdef")); // "abc123" (只用了 "abc")

// 5. 填充字符串不够长（会重复填充）
const str5 = "abc";
console.log(str5.padStart(10, "12")); // "1212121abc" (重复 "12")
```

3️⃣ 常见应用场景

- **日期/时间补零** (MM-DD, HH:mm:ss)

```js
const month = new Date().getMonth() + 1;
const formattedMonth = String(month).padStart(2, "0"); // "01", "02", ... "12"
```

- **数字编号补零** (001, 002...)

```js
const fileIndex = 1;
// "file_001.txt"
const fileName = `file_${String(fileIndex).padStart(3, "0")}.txt`;
```

- **脱敏显示/掩码** (\*\*\*\*5678)

```js
const phoneNumber = "13812345678";
const last4Digits = phoneNumber.slice(-4);
const maskedNumber = last4Digits.padStart(phoneNumber.length, "*");
console.log(maskedNumber); // "*******5678"
```
