# JavaScript（页面行为动作）

> 网页的“魔法师”，让静态页面动起来。没有它，网页只能“躺平”；有了它，页面会“跳舞”。

## 设计模式

### 单例与多例

#### 单例模式

1️⃣ 定义

> 【单例模式】：确保`一个类只有一个实例`，并`提供一个全局访问点`，`无论`在程序中`何处调用`，`返回`的都`是同一个对象实例`。

2️⃣ 核心特点

- `唯一性`：全局只有一个实例
- `延迟实例化`：在需要时才创建
- `全局访问点`：提供统一访问方式

3️⃣ 实现方式

::: code-group

```js [对象字面量（最简单的单例）.js]
const AppConfig = {
  appName: 'MyApp',
  version: '1.0.0',
  appURL: 'https://api.example.com',

  getAppInfo(){
    return `${this.appName} v${this.version}`
  }

  setAppURL(url) {
    this.appURL = url
  }
}

// used
console.log(AppConfig.getAppInfo())
AppConfig.setAppURL('https://new-api.exmaple.com')
```

```js [闭包实现（更安全）.js]
const Singleton = (function () {
  let instance = null;

  class SingleClass {
    constructor(name) {
      this.name = name;
    }

    sayHello() {
      return console.log(`Hello, I'm ${this.name}`);
    }
  }

  return {
    getInstance(name) {
      if (!instance) {
        instance = new SingleClass(name);
      }
      return instance;
    },
  };
})();

// used
const s1 = Singleton.getInstance("First");
const s2 = Singleton.getInstance("Second");

console.log(s1 === s2); // true
console.log(s1.name); // 'First'
```

```js [ES6 Class 实现.js]
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    // 初始化代码：保存实例
    Singleton.instance = this;
  }
}
const a = new Singleton();
const b = new Singleton();
console.log(a === b); // true
```

:::

4️⃣ 应用场景

::: code-group

```js [全局状态管理（Vuex/Redux）.js]
class Store {
  constructor() {
    if (Store.instance) {
      return Store.instance;
    }

    this.state = {};
    this.reducers = {};
    Store.instance = this;
  }

  dispatch(action) {
    const reducer = this.reducers[action.type];
    if (reducer) {
      this.state = reducer(this.state, action.payload);
    }
  }
}

const store1 = new Store();
const store2 = new Store();
console.log(store1 === store2); // true - 全局唯一状态管理
```

```js [日志记录器.js]
class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }

    this.logs = [];
    Logger.instance = this;
  }

  info(message) {
    const log = { level: "INFO", message, timestamp: new Date() };
    this.logs.push(log);
    console.log(`[INFO] ${message}`);
  }

  error(message) {
    const log = { level: "ERROR", message, timestamp: new Date() };
    this.logs.push(log);
    console.error(`[ERROR] ${message}`);
  }

  getLogs() {
    return this.logs;
  }
}

// 在任何地方使用同一个logger
const logger1 = new Logger();
const logger2 = new Logger();
logger1.info("App started");
logger2.info("User logged in");
console.log(logger1.getLogs().length); // 2
```

:::

#### 多例模式

1️⃣ 定义

> 【多例模式】：是单例模式的扩展，允许`一个类有多个实例`，但`每个实例有唯一标识`，通过标识获取对应的实例，相当于“有名字的单例”。

2️⃣ 核心特点

- `有限实例`：实例数量受控
- `键值映射`：通过key获取对应实例
- 每个key对应唯一实例

3️⃣ 实现方式

::: code-group

```js [经典实现.js]
class Multiton {
  static instances = {};
  constructor(key) {
    if (Multiton.instances[key]) {
      return Multiton.instances[key];
    }
    this.key = key;
    Multiton.instances[key] = this;
  }
}
// used
const a = new Multiton("foo");
const b = new Multiton("bar");
const c = new Multiton("foo");
console.log(a === c); // true
console.log(a === b); // false
```

```js [Map 实现.js]
class Multiton {
  static instances = new Map();

  constructor(key, name) {
    if (Multiton.instances.has(key)) {
      return Multiton.instances.get(key);
    }

    this.key = key;
    this.name = name;
    Multiton.instances.set(key, this);
  }

  static getInstance(key, name) {
    if (!Multiton.instances.has(key)) {
      new Multiton(key, name);
    }
    return Multiton.instances.get(key);
  }

  sayHello() {
    console.log(`Hello from ${this.name} (${this.key})`);
  }
}

// 使用
const db1 = Multiton.getInstance("mysql", "MySQL DB");
const db2 = Multiton.getInstance("mysql", "MySQL DB Again");
const db3 = Multiton.getInstance("redis", "Redis Cache");

console.log(db1 === db2); // true - 相同key返回相同实例
console.log(db1 === db3); // false - 不同key返回不同实例
db1.sayHello(); // Hello from MySQL DB (mysql)
db3.sayHello(); // Hello from Redis Cache (redis)
```

```js [工厂模式实现.js]
class DatabaseConnection {
  constructor(config) {
    this.config = config;
    this.connectedAt = new Date();
  }

  connect() {
    console.log(`Connected to ${this.config.type} at ${this.config.host}`);
  }
}

class ConnectionManager {
  static connections = new Map();

  static getConnection(type, config) {
    const key = `${type}:${config.host}`;

    if (!this.connections.has(key)) {
      const connection = new DatabaseConnection({ type, ...config });
      this.connections.set(key, connection);
      console.log(`Created new ${type} connection to ${config.host}`);
    }

    return this.connections.get(key);
  }

  static getAllConnections() {
    return Array.from(this.connections.values());
  }
}

// 使用
const mysql1 = ConnectionManager.getConnection("mysql", {
  host: "localhost",
  port: 3306,
});
const mysql2 = ConnectionManager.getConnection("mysql", {
  host: "localhost",
  port: 3306,
});
const mysql3 = ConnectionManager.getConnection("mysql", {
  host: "remote.com",
  port: 3306,
});
const redis = ConnectionManager.getConnection("redis", {
  host: "localhost",
  port: 6379,
});

console.log(mysql1 === mysql2); // true
console.log(mysql1 === mysql3); // false
console.log(ConnectionManager.getAllConnections().length); // 3
```

:::

4️⃣ 应用场景

::: code-group

```js [多环境配置管理.js]
class EnvironmentConfig {
  constructor(env) {
    this.env = env;
    this.config = this.loadConfig(env);
  }

  loadConfig(env) {
    const configs = {
      development: { apiUrl: "http://localhost:3000", debug: true },
      staging: { apiUrl: "https://staging.api.com", debug: true },
      production: { apiUrl: "https://api.com", debug: false },
    };
    return configs[env];
  }

  get(key) {
    return this.config[key];
  }
}

class ConfigManager {
  static instances = new Map();

  static getInstance(env) {
    if (!this.instances.has(env)) {
      this.instances.set(env, new EnvironmentConfig(env));
    }
    return this.instances.get(env);
  }
}

// 使用
const devConfig = ConfigManager.getInstance("development");
const prodConfig = ConfigManager.getInstance("production");
const anotherDev = ConfigManager.getInstance("development");

console.log(devConfig === anotherDev); // true
console.log(devConfig.get("apiUrl")); // http://localhost:3000
console.log(prodConfig.get("apiUrl")); // https://api.com
```

:::

#### 单例| vs 多例

| 对比维度   | 单例模式                     | 多例模式                                      |
| ---------- | ---------------------------- | --------------------------------------------- |
| 实例数量   | 全局唯一1个实例              | 有限个实例，通过key区分                       |
| 存储结构   | 单个变量/属性                | Map/对象存储多个实例                          |
| 适用场景   | 全局共享资源（配置/日志）    | 需要区分不同维度的资源（多环境配置/多数据源） |
| 内存占用   | 最少（1个实例）              | 较多（多个实例）                              |
| 线程安全   | 需要注意（JS单线程天然安全） | 同样安全                                      |
| 实现复杂度 | 简单                         | 稍复杂                                        |
| 扩展性     | 差，无法扩展                 | 好，可动态添加新类型                          |

#### 缓存系统案例

::: code-group

```js [单例缓存.js]
class SingletonCache {
  constructor() {
    if (SingletonCache.instance) {
      return SingletonCache.instance;
    }

    this.cache = new Map();
    SingletonCache.instance = this;
  }

  set(key, value) {
    this.cache.set(key, value);
  }

  get(key) {
    return this.cache.get(key);
  }

  clear() {
    this.cache.clear();
  }
}

// 全局只有一个缓存池
const cache = new SingletonCache();
```

```js [多例缓存（区分用户）.js]
class UserCache {
  constructor(userId) {
    this.userId = userId;
    this.cache = new Map();
  }

  set(key, value) {
    this.cache.set(key, value);
  }

  get(key) {
    return this.cache.get(key);
  }
}

class CacheManager {
  static userCaches = new Map();

  static getUserCache(userId) {
    if (!this.userCaches.has(userId)) {
      this.userCaches.set(userId, new UserCache(userId));
    }
    return this.userCaches.get(userId);
  }
}

// 每个用户独立的缓存空间
const user1Cache = CacheManager.getUserCache(1);
const user2Cache = CacheManager.getUserCache(2);
user1Cache.set("theme", "dark");
user2Cache.set("theme", "light");
console.log(user1Cache.get("theme")); // dark
console.log(user2Cache.get("theme")); // light
```

:::

#### 总结

- `单例`适合`全局唯一`对象，`多例`适合`“每类唯一”`对象。
- 单例更简单，易于实现；多例更灵活，适合分组管理。

#### 注意事项

::: code-group

```js [单例的陷阱.js]
// ❌ 不要过度使用单例
class Utils {
  // 如果没有任何状态需要共享，不需要用单例
}

// ✅ 只有需要维护状态时才使用
class UserSession {
  constructor() {
    if (UserSession.instance) return UserSession.instance;
    this.user = null;
    UserSession.instance = this;
  }
}
```

```js [多例的key设计.js]
// ❌ 不好的key设计
const key = `${type}${host}${port}`; // 容易冲突

// ✅ 好的key设计
const key = `${type}:${host}:${port}`; // 明确分隔
```

```js [现代框架中的单例.js]
// Vue 3 Composition API 中的单例
import { reactive } from "vue";

const store = reactive({
  count: 0,
  increment() {
    this.count++;
  },
});

export default store; // 导入即单例
```

```js [ 测试时的注意事项.js]
// 单例会导致测试间状态污染
class Counter {
  constructor() {
    if (Counter.instance) return Counter.instance;
    this.count = 0;
    Counter.instance = this;
  }

  increment() {
    this.count++;
  }
}

// 测试时需要重置
beforeEach(() => {
  Counter.instance = null; // 重置单例
});
```

:::

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

## 对象基础

### 对象的创建方式

| 创建方式              | 适用场景               | 优点                    | 缺点                            |
| --------------------- | ---------------------- | ----------------------- | ------------------------------- |
| **对象字面量**        | 单个对象、配置项       | 简洁直观（`推荐`）      | 无法复用                        |
| **`new Object()`**    | 基本不用               | 无                      | 写法累赘，表现不一致            |
| **工厂函数**          | 批量生成相同结构对象   | 灵活，可封装私有变量    | 方法不能共享，`instanceof` 失效 |
| **构造函数 + `new`**  | 批量生成且需明确类型   | `instanceof` 可判断类型 | 方法不共享，忘记 `new` 会出错   |
| **原型模式**          | 需要实例共享方法       | 方法共享，节省内存      | 属性和方法分开定义，结构松散    |
| **ES6 `class`**       | 现代面向对象开发       | 语法集中，封装好        | 本质仍是原型，易造成误解        |
| **`Object.create()`** | 纯净对象或精准控制原型 | 可创建无原型的对象      | 定义属性麻烦，可读性差          |

::: code-group

```js [对象字面量]
const person = {
  name: "张三",
  age: 25,
  city: "北京",
  greet() {
    return `你好，我是${this.name}`;
  },
};
```

```js [new Object()]
const car = new Object();
car.brand = "丰田";
car.model = "凯美瑞";
car.year = 2020;
```

```js [工厂函数]
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`Hi, I'm ${this.name}`);
    },
  };
}

const alice = createPerson("Alice", 30);
```

```js [构造函数]
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log(`Hi, I'm ${this.name}`);
  };
}

const bob = new Person("Bob", 25);
console.log(bob instanceof Person); // true
```

```js [class]
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }

  // 静态方法，属于类本身
  static species() {
    return "Homo sapiens";
  }
}

const diana = new Person("Diana", 22);
```

```js [原型模式]
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log(`Hi, I'm ${this.name}`);
};

const charlie = new Person("Charlie", 28);
```

```js [Object.create()]
const animal = Object.create(null); // 创建无原型对象
animal.type = "猫";
animal.color = "白色";
```

:::

### 属性访问与管理

::: code-group

```js [属性访问]
const user = {
  name: "王五",
  age: 28,
  email: "wangwu@example.com",
};

// 点语法
console.log(user.name); // 王五

// 方括号语法
console.log(user["age"]); // 28

// 动态属性名
const propertyName = "email";
console.log(user[propertyName]); // wangwu@example.com
```

```js [属性描述符]
const obj = {};

Object.defineProperty(obj, "readOnly", {
  value: 42,
  writable: false, // 不可写
  enumerable: true, // 可枚举
  configurable: false, // 不可配置
});

// 批量定义属性
Object.defineProperties(obj, {
  prop1: {
    value: "value1",
    writable: true,
  },
  prop2: {
    value: "value2",
    writable: false,
  },
});
```

```js [属性检测]
const user = { name: "赵六", age: 25 };

console.log("name" in user); // true
console.log(user.hasOwnProperty("age")); // true
console.log(Object.hasOwn(user, "city")); // false (ES2022)
```

:::

### 继承实现

- 1. 原型链继承
- 2. 组合继承（推荐）
- 3. ES6 Class继承（extends）

## 数组与集合

### 数组创建方式

::: code-group

```js [1.数组字面量（推荐）]
const fruits = ["苹果", "香蕉", "橙子"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "hello", true, null, undefined];
```

```js [2.new Array()]
const colors = new Array("红", "绿", "蓝");
const emptyArray = new Array(5); // 创建长度为5的空数组
```

```js [3.Array.from() 方法]
const arrayFromString = Array.from("JavaScript");
// ['J', 'a', 'v', 'a', 'S', 'c', 'r', 'i', 'p', 't']

const arrayFromSet = Array.from(new Set([1, 2, 2, 3])); // [1, 2, 3]

// 带映射函数
const doubled = Array.from([1, 2, 3], (x) => x * 2); // [2, 4, 6]
```

```js [4.展开运算符]
const baseArray = [1, 2, 3];
const newArray = [...baseArray, 4, 5]; // [1, 2, 3, 4, 5]
```

:::

## 核心理念对比

| 特性       | 面向过程 (POP)                                 | 面向对象 (OOP)                                                       |
| ---------- | ---------------------------------------------- | -------------------------------------------------------------------- |
| 核心关注点 | `"怎么做" (How)`。关注解决问题的步骤和流程。   | `"谁来做" (Who)`。关注由于哪些实体（对象）组成，以及对象之间的交互。 |
| 代码组织   | 以`函数`为中心。数据和操作数据的函数是分离的。 | 以`对象`为中心。数据（属性）和操作数据的函数（方法）封装在一起。     |
| 思维方式   | 线性思维：第一步做什么，第二步做什么。         | 模块化思维：在这个系统里有哪些角色？每个角色有什么属性和能力？       |
| 适用场景   | 简单的脚本、算法逻辑、工具函数、小型应用。     | 复杂的业务系统、大型应用、需要高度复用和维护的项目。                 |

## 结合现代前端 (Vue 3) 的思考

Vue 3 Composition API (组合式 API) , 它在形式上看起来像`“面向过程”`（定义一堆 const 变量和 function），但实际上通过闭包和响应式系统，实现了比传统 OOP 更灵活的逻辑复用。

- Options API (Vue 2): 典型的 OOP 结构。data 是属性，methods 是行为，this 指向实例。
- Composition API (Vue 3)
  > - 看起来像过程式：代码按功能块组织（hooks/composables）。
  > - 核心是封装：一个`useGameLogic()` 函数内部封装了状态和方法，返回给组件使用。这本质上是`函数式编程`与`封装思想`的结合。

## 事件系统

### 事件概念

事件是发生在HTML元素上的动作，可以是用户操作（如点击、输入、滚动）或系统行为（如页面加载、网络请求完成）。

### 事件的基本组成

- 1. 事件源（Event Target）- 发生事件的元素
- 2. 事件类型（Event Type）- 事件的种类
- 3. 事件处理函数（Event Handler）- 响应事件的代码
- 4. 事件对象（Event Object）- 包含事件信息的对象

### 事件传播机制

1️⃣ 事件传播的三个阶段

> 捕获阶段、目标阶段、冒泡阶段

2️⃣ 事件传播顺序

- 1. 捕获阶段：从 window 到目标元素的父元素
- 2. 目标阶段：目标元素本身
- 3. 冒泡阶段：从目标元素的父元素到 window

3️⃣ 事件委托原理

```js
// 传统方式：为每个元素绑定事件
const listItems = document.querySelectorAll("li");
listItems.forEach((item) => {
  item.addEventListener("click", function () {
    console.log("列表项被点击:", this.textContent);
  });
});

// 事件委托：在父元素上监听
const list = document.querySelector("ul");
list.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    console.log("列表项被点击:", event.target.textContent);
    event.target.classList.toggle("selected");
  }
});

// 动态添加的元素也会自动绑定事件
const newItem = document.createElement("li");
newItem.textContent = "新项目";
list.appendChild(newItem);
```

::: tip 事件委托的优势

- 性能优化 - 减少事件监听器数量
- 动态元素 - 自动处理新添加的元素
- 内存管理 - 避免内存泄漏
- 代码简化 - 统一的事件处理逻辑

:::

### 事件性能优化
- 1. 合理使用防抖和节流
  - 防抖：延迟执行，重复调用会重置计时器
  - 节流：限制执行频率
- 2. 合理使用事件委托
- 3. 内存泄漏防范（及时移除事件监听器）

## 异步编程模式
### 概述

异步编程是 JS 中处理非阻塞操作的核心概念，它允许程序在等待某些操作完成时继续执行其他任务。
::: tip  什么是异步编程？
异步编程是一种编程模式，允许程序在等待某些操作（如网络请求、文件读取、定时器）完成的同时继续执行其他代码。
:::

### 异步编程方案
- 1. 回调函数（Callback）
- 2. Promise
- 3. async/await

::: tip 常见问题

- 回调地狱：使用 `Promise` 或 `async/await` 解决
- 错误处理：`try-catch`、`Promise.catch`、错误边界
- 并发控制：`Promise.all`、`Promise.race`、自定义并发限制
- 性能优化：并行执行、超时处理、重试机制

:::

### 异步编程的作用
- 用户体验：避免界面冻结/白屏/卡死
- 性能优化：充分利用系统资源
- 并发处理：同时处理多个任务
- 响应性：保持程序响应能力

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

## JS 闭包

> 定义：当一个函数访问在其外部定义的变量时，就形成了闭包。

::: code-group

```js [简单案例]
const items = [
  { id: 1, title: "First" },
  { id: 2, title: "Second" },
  { id: 3, title: "Final" },
];
const matcher = /^F/;
const filteringFn = (x) => matcher.test(x.title);
// 仔细观察 filteringFn，会发现它使用了一个在外部定义的变量 matcher，这是一个闭包。
items.filter(filteringFn);
// [{ id: 1, title: 'First' }, { id: 3, title: 'Final' }]
```

```js [复杂案例]
const initCounter = (start = 0) => {
  let value = start;
  return {
    get: () => value,
    increment: () => ++value,
    decrement: () => --value,
    reset: () => (value = start),
  };
};
const counter = initCounter(5);
counter.get(); // 5
counter.increment(); // 6
counter.increment(); // 7
counter.decrement(); // 6
counter.reset(); // 5
```

:::

## this 指向

this 指向判断规则，按以下顺序依次判断，命中即停

| 步骤 | 判断条件                    | this 指向                                         |
| :--: | --------------------------- | ------------------------------------------------- |
| 1    | 是箭头函数                | 指向定义时外层作用域的 `this`，不可修改               |
| 2    | 是 `new` 调用             | 指向新创建的实例对象                                  |
| 3    | 是 `call`/`apply`/`bind`  | 指向指定的第一个参数（`null/undefined` 则退化为默认） |
| 4    | 是对象方法调用 `obj.fn()` | 指向最近的调用者对象                                  |
| 5    | 以上都不是？                | 默认绑定：严格模式 `undefined`，非严格模式 `window`   |

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

### 分类

- `CJS(CommonJS)`：Node.js采用的规范，主要用于`服务端`。
- `AMD`：专门为`浏览器端`设计的`异步加载规范`，代表库是`RequireJS`。
- `CMD`：为浏览器端设计，代表库是 `Sea.js`（阿里玉伯提出），主要在国内流行。
- `UMD`：通用模块定义，为了解决跨平台（浏览器和 Node.js）兼容问题。
- `ESM`(ES Modules)：ES2015 (ES6) 推出的官方标准，旨在统一前后端

### CommonJS

1️⃣ 特点

- 同步加载
- 运行时加载
- 缓存
- 值拷贝

2️⃣ 语法

- 导出：`module.exports = {}` 或 `exports.xxx = xxx`
- 导入：`const xxx = require('xxx')`

### AMD

1️⃣ 特点

- 异步加载
- 依赖前置（定义模块前必须声明其依赖，加载完成依赖后才执行回调）。

2️⃣ 语法

- 导出：`difine(id?,dependencies?,factory)`
- 导入：`requires([dependencies],callback)`

### CMD

1️⃣ 特点

- 依赖就近：用到某个模块时再去 `require`，延迟执行。
- 同步书写：写法像 CommonJS，但底层是异步加载。

2️⃣ 语法

- `define(function(require, exports, module) { ... })`
- AMD vs CMD：AMD 推崇依赖前置（提前执行），CMD 推崇依赖就近（延迟执行）。

### UMD

1️⃣ 原理

> 一个能够在一个文件中同时支持 AMD/CommonJS/全局变量（Global）的模式。

2️⃣ 实现逻辑

- 判断是否支持AMD（`typeof define === 'function'`），是则用 `define`。
- 判断是否支持CommonJS（`typeof module === 'object'`），是则用
  `module.exports`
- AMD和CommonJS 都不支持，挂载到全局对象上（`window/global`）

### ESM

1️⃣ 特点

- 静态分析：在编译时就确定模块依赖关系（`import` 必须在顶层）。
- 异步/同步：浏览器端异步加载，且支持 `import()` 动态导入。
- 引用传递：import 的变量是只读引用，模块内部值变化，外部引用的值也会跟着变（与 CommonJS 的值拷贝不同）。

2️⃣ 语法

- 导出：`export const x= 1`/`export default {}`
- 导入：`import {x} from '@/utils'`/`import x from '@/utils'`

### 对比总结

| 分类     | 加载方式       | 运行/编译时 | 核心语法                               | 备注                                |
| :------- | :------------- | :---------- | :------------------------------------- | :---------------------------------- |
| CommonJS | 同步           | 运行时      | require/module.exports                 | Nodejs服务端，输出值的拷贝          |
| AMD      | 异步           | 运行时      | define/require                         | 浏览器，依赖前置、通过回调使用      |
| CMD      | 同步           | 运行时      | define/require                         | 浏览器，依赖就近，已过时            |
| UMD      | 异步           | 运行时      | define/require，require/module.exports | 通用库开发，兼容CommonJS/AMD/Global |
| ESM      | 编译时静态分析 | 编译时      | import/export                          | 现代前端/服务端，官方标准           |

## 防抖与节流

- 防抖（Debounce）
  > 延迟执行，`仅最后一次操作停止后生效`（频繁操作，会重新计时，仅最后一次点击后，达到间隔时间才生效）
- 节流（Throttle）
  > `降低频率`（频繁操作，节流时间不变，满足设定的节流时间就执行）
- 权威视觉指南（Debounce vs Throttle）
  > [Debounce vs Throttle](https://kettanaito.com/blog/debounce-vs-throttle): 防抖与节流两者混淆终极图解指南。
- 应用场景
  > - 1️⃣ 窗口`调整大小`后界面更新是否一致; 2️⃣ 服务器或客户端的高性能操作
  > - 1️⃣ 异步搜索建议 ; 2️⃣ 服务器上的更新批处理

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

## 多重继承

> JS 不支持传统意义上的多重继承，但它提供了`重用`和`组合`功能的方法。

- `类（Classes）`
  > JS 类只允许单一继承，意味着一个类只能扩展一个父类。
- `原型（Prototypes）`
  > 对象可以一次继承一个原型，不能继承多个。
- `混合（Mixins）`
  > 为了实现类似多重继承的行为，JS 使用`混合`— 将属性和方法复制到类或对象中的函数或对象。

## 变量作用域

- `全局作用域（Global Scope）`
  > 最外层级别（在任何地方都可访问）。
- `局部作用域（Local Scope）`
  > 由于词法作用域，内部函数可以访问其父函数中的变量。
- `函数作用域（Function Scope）`
  > 变量被限制在声明它们的函数内部。
- `块级作用域（Block Scope）`
  > 使用 let 或 const 声明的变量被限制在最近的代码块（循环、条件语句等）内部。

## isNaN 和 Number.isNaN

- `Number.isNaN(x)`
  > `Number.isNaN(x)` → 仅当 `x` 为 `NaN` 值时返回 `true`，不进行类型转换。
- `isNaN(x)`
  > `isNaN(x)` → 将 `x` 转换为`数值`，然后`检查该结果`是否为 `NaN`。
- `Example`

```js [example.js]
// 在 JavaScript 中，值 NaN 被视为一种数字。
Number.isNaN(NaN); // true
isNaN(NaN); // true

Number.isNaN("foo"); // false  (string, not NaN)
isNaN("foo"); // true   (coerces "foo" → NaN)

Number.isNaN(undefined); // false
isNaN(undefined); // true   (undefined → NaN)

Number.isNaN(""); // false
isNaN(""); // false  ("" → 0)

Number.isNaN(0 / 0); // true   (is NaN)
isNaN(0 / 0); // true
```

## x++ 和 ++x

> 两者`都会递增`，但返回的值不同。

- `x++`
  > `后增` → `返回旧值`，然后`递增`。
- `++x`
  > `预增` → `先递增`，然后`返回新值`。
- `Example`

```js [example.js]
let x = 0;
console.log(x++); // 先返回当前值，后递增。
console.log(++x); // 先递增，后返回新值。

// 0
// 2
```

## null 和 undefined

- `null`
  > `空值`表示没有值或没有对象，这被称为`空值/对象`。
- `undefined`
  > 当变量声明但`未赋值`时发生，未定义不是关键词。

## NaN ≠ NaN

> `NaN`（非数）是唯一一个与任何比较算符比较时`不等于自身`的 JS 值。

```js
const x = Math.sqrt(-1); // NaN
const y = 0 / 0; // NaN

x === y; // false
x === NaN; // false

Number.isNaN(x); // true
Number.isNaN(y); // true

isNaN(x); // true
isNaN("hello"); // true
```

## 清空数组的方法

### 直接赋值为空数组

> 它最直观的方法，但它并`没有真正清空原数组`，而是创建了一个新的空数组，并将新数组的`引用`赋值给变量。

```js
// 1.将新数组的 引用 赋值给变量
let arr1 = [1, 2, 3];
arr1 = []; // arr1 现在是 []

// 2.若有其他变量引用了原数组，原数组不会被清空。
let a = [1, 2, 3];
let b = a;
a = [];
console.log(a); // []
console.log(b); // [1, 2, 3]  // 仍然存在
```

::: danger ⚠️

- **陷阱**：若有其他变量引用了原数组，原数组不会被清空。
- **性能**：很快，旧数组会等待垃圾回收。
- **适用**：当你确定没有其他引用，且不关心旧数据时。
  :::

### 设置 length 为 0

> 最推荐的原生清空方式，简洁且高效。

```js
// 不产生新数组，引用地址未改变，直接修改原数组数据
let arr2 = [1, 2, 3];
arr2.length = 0; // arr2 现在是 []

// ✅ 优点：会直接截断原数组，即使有其他变量引用也会被清空。
let a = [1, 2, 3];
let b = a;
a.length = 0;
console.log(a); // []
console.log(b); // []  // 也变空了
```

::: tip ✅

- **优点**：会直接截断原数组，即使有其他变量引用也会被清空。
- **性能**：非常好，直接修改内部属性。
- **适用**：大多数情况，尤其是需要清空共享引用的数组时。

:::

### 使用 splice 方法

> 剪切全部元素来清空，返回值是被删除的元素数组。

```js
let arr3 = [1, 2, 3];
arr3.splice(0, arr3.length); // 返回 [1, 2, 3]
// arr3 现在是 []
```

::: tip 优缺点

- ✅ 优点：同样会清空所有引用，并返回被删除的内容。
- ⚠️ 缺点：相比设置 length = 0，性能略慢，因为它需要遍历并删除元素，并生成一个包含所有删除元素的数组。
- 适用：当你需要获取被清空的元素时使用。

:::

### 使用 pop 循环

> 手动遍历并逐个删除元素，效率最低，通常不推荐。

```js
let arr4 = [1, 2, 3];
while (arr4.length) {
  arr4.pop();
}
// arr4 现在是 []
```

::: tip 通常不推荐

- 缺点：非常慢，长数组尤其明显。
- 适用：基本不推荐，除非你有特殊需求（如每次弹出时执行一些操作）。

:::

### 核心异同总结

| 方法             | 清除所有引用 | 性能            | 关键副作用/特点                                    |
| ---------------- | ------------ | --------------- | -------------------------------------------------- |
| `arr = []`       | 否           | 快 — 创建新对象 | 旧数组若被其他变量引用则依然存活，可能引起内存问题 |
| `arr.length = 0` | 是           | 最快            | 最简洁推荐，直接截断，无返回值                     |
| `arr.splice(0)`  | 是           | 较慢            | 返回被删除的元素数组，有额外遍历开销               |
| `while`/`for`    | 是           | 最慢            | 无必要不推荐，仅在弹出项需特殊处理时用             |

## 函数

### 纯函数

1️⃣ 纯函数是指满足以下两个条件的函数

- 对于`相同的输入`，它总是返回`相同的输出`。
- 在`函数作用范围之外`，不会产生`任何副作用`。

2️⃣ Example

```js
// Pure 纯函数
const add = (x, y) => x + y;
const concat = (arr, value) => [...arr, value];
const order = (arr) => [...arr].sort((a, b) => a - b);

// Impure 非纯函数
const addRandom = (x) => x + Math.random();
const pushConcat = (arr, value) => {
  arr.push(value);
  return arr;
};
const reorder = (arr) => arr.sort((a, b) => a - b);
```

### 递归函数

1️⃣ 递归

> 递归是一种`编程技巧`，核心思想是`将大问题分解为规模更小、结构相同的子问题`。

2️⃣ 递归函数

> 递归函数是指在函数体内部调用自身的函数

3️⃣ 一个正确的递归函数必须包含两个要素

> - **基线条件**：终止递归的条件，直接返回结果，防止无限递归导致栈溢出。
> - **递归条件**：将问题分解为更小的子问题并调用自身。

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
