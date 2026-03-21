# JavaScript（网页行为动作）
> 网页的“魔法师”，让静态页面动起来。没有它，网页只能“躺平”；有了它，页面会“跳舞”。

## JS学习技巧

> Debugger/断点调试 + 在线js编辑器（https://playcode.io/javascript-compiler）

## 面向过程与对象编程

> JavaScript 是一门多范式语言，它既支持函数式编程（偏向面向过程），也支持基于原型（Prototype）和类（Class）的面向对象编程。

## 面向过程编程（POP）

### 概念

面向过程编程是一种以过程为中心的编程范式，它将程序看作是一系列的步骤或过程，每个过程完成特定的任务。程序的执行流程是按照这些过程的顺序依次进行的。
这种编程方式强调的是功能的实现，将大问题分解为一个个小的函数或过程，通过调用这些函数来完成整个程序的功能。

### 特点

- 模块化：将程序分解为多个独立的函数，每个函数负责一个特定的任务，提高了代码的可维护性和复用性。
- 顺序执行：程序按照函数调用的顺序依次执行，逻辑清晰，易于理解。
- 数据和操作分离：数据和操作数据的函数是分开的，函数通过参数来传递数据。

### Example

```js
// 定义加法函数
function add(a, b) {
  return a + b;
}

// 定义减法函数
function subtract(a, b) {
  return a - b;
}

// 定义乘法函数
function multiply(a, b) {
  return a * b;
}

// 定义除法函数
function divide(a, b) {
  if (b === 0) {
    console.log("除数不能为零");
    return;
  }
  return a / b;
}

// 使用函数进行计算
const num1 = 10;
const num2 = 5;
const sum = add(num1, num2);
const difference = subtract(num1, num2);
const product = multiply(num1, num2);
const quotient = divide(num1, num2);

console.log("和:", sum);
console.log("差:", difference);
console.log("积:", product);
console.log("商:", quotient);
```

## 面向对象编程（OOP）

### 概念

面向对象编程是一种以对象为中心的编程范式，它将数据和操作数据的方法封装在一起，形成一个对象。对象是类的实例，类是一种抽象的模板，定义了对象的属性和方法。
通过继承、封装和多态等特性，面向对象编程可以提高代码的可维护性、可扩展性和复用性。

### 特点

- 封装：将数据和操作数据的方法封装在一个对象中，对外提供公共的接口，隐藏内部的实现细节。
- 继承：允许一个类继承另一个类的属性和方法，从而实现代码的复用和扩展。
- 多态：同一个方法在不同的对象上可以有不同的实现，提高了代码的灵活性和可扩展性。

### Example

```js
// 定义计算器类
class Calculator {
  constructor() {
    // 可以在这里初始化一些属性
  }

  // 定义加法方法
  add(a, b) {
    return a + b;
  }

  // 定义减法方法
  subtract(a, b) {
    return a - b;
  }

  // 定义乘法方法
  multiply(a, b) {
    return a * b;
  }

  // 定义除法方法
  divide(a, b) {
    if (b === 0) {
      console.log("除数不能为零");
      return;
    }
    return a / b;
  }
}

// 创建计算器对象
const calculator = new Calculator();
const num1 = 10;
const num2 = 5;
const sum = calculator.add(num1, num2);
const difference = calculator.subtract(num1, num2);
const product = calculator.multiply(num1, num2);
const quotient = calculator.divide(num1, num2);

console.log("和:", sum);
console.log("差:", difference);
console.log("积:", product);
console.log("商:", quotient);
```

## 核心理念对比

| 特性       | 面向过程 (POP)                                 | 面向对象 (OOP)                                                       |
| ---------- | ---------------------------------------------- | -------------------------------------------------------------------- |
| 核心关注点 | `"怎么做" (How)`。关注解决问题的步骤和流程。   | `"谁来做" (Who)`。关注由于哪些实体（对象）组成，以及对象之间的交互。 |
| 代码组织   | 以`函数`为中心。数据和操作数据的函数是分离的。 | 以`对象`为中心。数据（属性）和操作数据的函数（方法）封装在一起。     |
| 思维方式   | 线性思维：第一步做什么，第二步做什么。         | 模块化思维：在这个系统里有哪些角色？每个角色有什么属性和能力？       |
| 适用场景   | 简单的脚本、算法逻辑、工具函数、小型应用。     | 复杂的业务系统、大型应用、需要高度复用和维护的项目。                 |

## 结合现代前端 (Vue 3) 的思考

> Vue 3 Composition API (组合式 API) , 它在形式上看起来像`“面向过程”`（定义一堆 const 变量和 function），但实际上通过闭包和响应式系统，实现了比传统 OOP 更灵活的逻辑复用。
>
> - Options API (Vue 2): 典型的 OOP 结构。data 是属性，methods 是行为，this 指向实例。
> - Composition API (Vue 3)
>   > - 看起来像过程式：代码按功能块组织（hooks/composables）。
>   > - 核心是封装：一个`useGameLogic()` 函数内部封装了状态和方法，返回给组件使用。这本质上是`函数式编程`与`封装思想`的结合。

## 实战代码演练

### 面向过程 (POP) 写法

> 在面向过程中，我们会定义全局变量（数据）和独立的函数（行为）。

```js
/* --- 数据 --- */
let chickenName = "小黄";
let chickenX = 0;
let chickenY = 0;
let chickenHealth = 100;

/* --- 过程/函数 --- */
function moveChicken(x, y) {
  chickenX += x;
  chickenY += y;
  console.log(`${chickenName} 移动到了 (${chickenX}, ${chickenY})`);
}

function feedChicken(foodAmount) {
  chickenHealth += foodAmount;
  console.log(`${chickenName} 吃饱了，生命值: ${chickenHealth}`);
}

// 执行过程 (步骤清晰)
moveChicken(10, 5);
feedChicken(20);
```

⚠️ 特点

- 数据散落在外部。
- 如果我们要增加第二只小鸡（chicken2Name, chicken2X...），代码会变得非常混乱且难以管理。
- 函数需要依赖外部变量或者通过参数传递数据。

### 面向对象 (OOP) 写法

> 在面向对象中，我们将“小鸡”视为一个独立的个体，它自己包含坐标信息（数据）和移动能力（方法）。

```js
// 使用 ES6 Class 语法
class Chicken {
  // 构造函数：初始化数据
  constructor(name) {
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.health = 100;
  }

  // 方法：封装行为
  move(x, y) {
    this.x += x;
    this.y += y;
    console.log(`${this.name} 移动到了 (${this.x}, ${this.y})`);
  }

  feed(foodAmount) {
    this.health += foodAmount;
    console.log(`${this.name} 吃饱了，生命值: ${this.health}`);
  }
}

// 实例化对象
const chicken1 = new Chicken("小黄");
const chicken2 = new Chicken("小白");

// 对象自己执行行为
chicken1.move(10, 5);
chicken2.feed(10);
```

⚠️ 特点

- `封装`：数据 (x, y) 和操作数据的方法 (move) 被绑在一起。外部不需要知道 move 内部是如何修改坐标的，只需要调用即可。
- `复用性`：可以轻松创建无数只小鸡，互不干扰。

## 位运算符

- `a << b`：算术左移，将 a 的二进制串向左移动 b 位，右边移入 0.
- `a >> b`：算术右移，把 a 的二进制表示向右移动 b 位，丢弃被移出的所有位。
- `a >>> b`：逻辑右移，左侧补 0，把值当作无符号 32 位整数处理，结果总为非负数。
- `a ^ b`：异或，在 a,b 的位表示中，每一个对应的位，两个`不相同`则返回 1，`相同`则返回 0.
- `a | b`：或，在 a,b 的位表示中，每一个对应的位，只要有一个为 1 则返回 1，否则返回 0.
- `~ a`：按位非，反转被操作数的位，将所有的 32 位取反，而值的最高位 (最左边的一位) 为 1 则表示负数 (2-补码表示法)。

::: tip 直观记忆

- `“左移补 0”`：<< 低位补 0（乘法效果，可能改变符号）。
- `“算术右移保符号”`：>> 用符号位填充，负数仍负。
- `“逻辑右移补 0 且无符号”`：>>> 总是补 0，结果非负。

> ⚠ 操作数被转换为 32bit 整数，以位序列（0 和 1 组成）表示。若超过 32bits，则取低位 32bit

:::

## bind/call/apply

> `bind/call/apply`都是 `Function.prototype` 的方法，都用于显式设置函数执行时 `this` 指向，同时可传入参数。

## bind

- 用法: `const bound = fn.bind(thisArg, arg1, ...)`
- 行为: 不立即执行，返回一个新函数；调用该新函数时 `this` 被固定为 `thisArg`。
- 返回值: 新函数（bound function）。

## call

- 用法: `fn.call(thisArg, arg1, arg2, ...)`
- 行为: 立即调用 `fn`，`this` 指向` thisArg`，其余参数逐一传入。
- 返回值: `fn` 的返回值。
- 要点: 参数逐个列出，适合已知数量参数的直接调用。

## apply

- 用法: `fn.apply(thisArg, argsArray)`
- 行为: 立即调用 `fn`，`this`指向 `thisArg`，参数从数组/类数组展开。
- 返回值: `fn` 的返回值。
- 要点: 当参数已在数组或类数组中时很方便；等价于 `fn(...argsArray)`（ES6+）。

## 对比

| 函数    | 执行时机   | 参数传递                     | 常见用途                              |
| ------- | ---------- | ---------------------------- | ------------------------------------- |
| `bind`  | 返回新函数 | 可预设部分参数，调用时可追加 | 事件处理器、回调中保持 `this`、偏函数 |
| `call`  | 立即执行   | 逐个列出                     | 调用函数并显式设置 `this`             |
| `apply` | 立即执行   | 数组/类数组                  | 当参数已经是数组时                    |

## 常见误区与注意点

- `bind 不会改变函数内部作用域链` — 仅固定调用时的 `this`。
- `bind 产生新函数`，重复 bind 会浪费内存并影响比较（引用不同）。
- `apply 参数必须可迭代/类数组`，传 `null/undefined` 时相当于空数组。
- `构造调用与 bind`: 用 `new` 调用 `bound` 函数时，`thisArg` 被忽略，实例为新创建对象。
- 对于箭头函数，`call/apply/bind` 无效。

## 函数选择

- 需要立即执行且参数逐个列出：`call`。
- 需要立即执行且参数为数组：`apply`。
- 需要返回固定 `this` 的可重用函数或做偏函数：`bind`。
- 参数形式
  - `call(thisArg, a, b, ...)`，立即执行。
  - `apply(thisArg, [a,b,...])`，立即执行。
  - `bind(thisArg, preArgs...)`，返回新函数（延迟执行）。

## 示例

::: code-group

```js [bind.js]
// 1.方法借用,将类数组转为数组
function listArgs() {
  return Array.prototype.slice.call(arguments);
}
listArgs(1, 2, 3); // [1,2,3]
// 现代写法：Array.from(arguments) 或 [...arguments]

// 2.bind 创建偏函数与保持 this
function multiply(a, b) {
  return a * b;
}
const double = multiply.bind(null, 2);
double(5); // 10

const obj = {
  x: 42,
  getX() {
    return this.x;
  },
};
const getX = obj.getX;
getX(); // undefined (或 window.x) ——失去 this
const boundGetX = getX.bind(obj);
boundGetX(); // 42

// 3.bind 与 new 的交互:
function Person(name) {
  this.name = name;
}
const BoundPerson = Person.bind({ fake: true }, "Alice");
const p = new BoundPerson();
p.name; // "Alice" — 实例化成功，this 被新对象替代，预设参数仍然生效
```

```js [call.js]
function greet(greeting) {
  return greeting + ", " + this.name;
}
const person = { name: "张三" };
greet.call(person, "你好"); // "你好, 张三"
```

```js [apply.js]
function sum(a, b, c) {
  return a + b + c;
}
const arr = [1, 2, 3];
sum.apply(null, arr); // 6
// 等价于: sum(...arr)
```

:::

## 模块化规范

## 分类

- `CJS(CommonJS)`：Node.js采用的规范，主要用于`服务端`。
- `AMD`：专门为`浏览器端`设计的`异步加载规范`，代表库是`RequireJS`。
- `CMD`：为浏览器端设计，代表库是 `Sea.js`（阿里玉伯提出），主要在国内流行。
- `UMD`：通用模块定义，为了解决跨平台（浏览器和 Node.js）兼容问题。
- `ESM`(ES Modules)：ES2015 (ES6) 推出的官方标准，旨在统一前后端

## CommonJS

1️⃣ 特点

- 同步加载
- 运行时加载
- 缓存
- 值拷贝

2️⃣ 语法

- 导出：`module.exports = {}` 或 `exports.xxx = xxx`
- 导入：`const xxx = require('xxx')`

## AMD

1️⃣ 特点

- 异步加载
- 依赖前置（定义模块前必须声明其依赖，加载完成依赖后才执行回调）。

2️⃣ 语法

- 导出：`difine(id?,dependencies?,factory)`
- 导入：`requires([dependencies],callback)`

## CMD

1️⃣ 特点

- 依赖就近：用到某个模块时再去 `require`，延迟执行。
- 同步书写：写法像 CommonJS，但底层是异步加载。

2️⃣ 语法

- `define(function(require, exports, module) { ... })`
- AMD vs CMD：AMD 推崇依赖前置（提前执行），CMD 推崇依赖就近（延迟执行）。

## UMD

1️⃣ 原理

> 一个能够在一个文件中同时支持 AMD/CommonJS/全局变量（Global）的模式。

2️⃣ 实现逻辑

- 判断是否支持AMD（`typeof define === 'function'`），是则用 `define`。
- 判断是否支持CommonJS（`typeof module === 'object'`），是则用
  `module.exports`
- AMD和CommonJS 都不支持，挂载到全局对象上（`window/global`）

## ESM

1️⃣ 特点

- 静态分析：在编译时就确定模块依赖关系（`import` 必须在顶层）。
- 异步/同步：浏览器端异步加载，且支持 `import()` 动态导入。
- 引用传递：import 的变量是只读引用，模块内部值变化，外部引用的值也会跟着变（与 CommonJS 的值拷贝不同）。

2️⃣ 语法

- 导出：`export const x= 1`/`export default {}`
- 导入：`import {x} from '@/utils'`/`import x from '@/utils'`

## 对比总结

| 分类     | 加载方式       | 运行/编译时 | 核心语法                               | 备注                                |
| :------- | :------------- | :---------- | :------------------------------------- | :---------------------------------- |
| CommonJS | 同步           | 运行时      | require/module.exports                 | Nodejs服务端，输出值的拷贝          |
| AMD      | 异步           | 运行时      | define/require                         | 浏览器，依赖前置、通过回调使用      |
| CMD      | 同步           | 运行时      | define/require                         | 浏览器，依赖就近，已过时            |
| UMD      | 异步           | 运行时      | define/require，require/module.exports | 通用库开发，兼容CommonJS/AMD/Global |
| ESM      | 编译时静态分析 | 编译时      | import/export                          | 现代前端/服务端，官方标准           |

## 防抖与节流

- 防抖（Debounce）：延迟执行，`仅最后一次操作停止后生效`（频繁操作，会重新计时，仅最后一次点击后，达到间隔时间才生效）
- 节流（Throttle）：`降低频率`（频繁操作，节流时间不变，满足设定的节流时间就执行）

## 延时函数

- `setTimeout`：是非阻塞的，设定定时器后，代码会继续往下执行，3 秒后才执行回调函数。
- `sleep 函数`：结合 `async/await` 使用时是阻塞的，`await` 会暂停当前异步函数的执行，等 `Promise` 完成后才继续执行后续代码。
- Example

  ```js
    // sleep 暂停阻塞执行函数
    async function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function getList(){
      // 阻塞的
      await sleep(200)
      const {data,code} = getGameList()

      // 非阻塞的
      setTimeout(()=>{
        const {data,code} = getGameList()
      },200)
    }
  ```

## 正确判断相等性

1️⃣ `==`、`===`、`Object.is()`

> 1.1 `==`：先类型转换，然后在比较 —— 宽松相等
>
> > 会按照`IEEE 754`标准对`NaN`、`-0`、`+0` 进行特殊处理(`NaN != NaN`，`-0 == +0`)

> 1.2 `===`：不进行类型转换，值和类型都相等 —— 严格相等
>
> > 会按照`IEEE 754`标准对`NaN`、`-0`、` +0` 进行特殊处理(`NaN != NaN`，`-0 === +0`)

> 1.3 `Object.is()`：既不进行类型转换，也不对 `NaN`、`-0`、`+0`进行特殊处理

2️⃣ JavaScript 提供三种不同的值比较运算
| x | y | == | === | Object.is |
|-------------------|-------------------|--------|--------|-----------|
| undefined | undefined | `true` | `true` | `true` |
| null | null | `true` | `true` | `true` |
| true | true | `true` | `true` | `true` |
| false | false | `true` | `true` | `true` |
| "str" | "str" | `true` | `true` | `true` |
| 0 | 0 | `true` | `true` | `true` |
| +0 | -0 | `true` | `true` | false |
| 0 | false | `true` | false | false |
| "" | false | `true` | false | false |
| "" | 0 | `true` | false | false |
| "0" | 0 | `true` | false | false |
| "10" | 10 | `true` | false | false |
| "[1,2]" | "1,2" | `true` | false | false |
| new String("str") | "str" | `true` | false | false |
| null | undefined | `true` | false | false |
| null | false | false | false | false |
| undefined | false | false | false | false |
| {foo:"bar} | {foo:"bar"} | false | false | false |
| new String("str") | new String("str") | false | false | false |
| 0 | null | false | false | false |
| 0 | NaN | false | false | false |
| "str" | NaN | false | false | false |
| NaN | NaN | false | false | `true` |

⚠️ 注意事项

- `Object.is(value1,value2)`，以下其中一项成立，则两个值相同，返回 `true`
  - 都是 `undefined`
  - 都是 `null`
  - 都是 `true`
  - 都是 `false`
  - 都是长度相同、字符相同、顺序相同的字符串
  - 都是相同的对象（意味着两个值都引用了内存中的同一对象）
  - 都是 `BigInt` 且具有相同的数值
  - 都是 `symbol` 且引用相同的 `symbol` 值
  - 都是数字且
    - 都是 `+0`
    - 都是 `-0`
    - 都是 `NaN`
    - 都有相同的值，非零且都不是 `NaN`
