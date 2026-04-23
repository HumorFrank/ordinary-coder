# TypeScript

## 常见类型

### 种类

- 基本类型
  - string 
  - number 
  - boolean
- Arrays
- Functions
- Object
- 联合类型(`|`)
- 交叉类型(`&`)
- 字面量类型
- Enums 枚举
- 特殊类型
  - null
  - undefined
  - any
  - unknown
  - never

### Example

```ts [index.ts]
// 字面量类型
type Params = "left" | "right" | "center";
// Enums 枚举
enum DirectionNumber {
  Up,
  Down,
  Left,
  Right,
}
enum UserResponse {
  No = 0,
  Yes = 1,
}
enum DirectionString {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

## 特殊类型

- `any`：会绕过所有类型检查(即不会进行类型检查)。
- `unknown`：必须通过`类型断言/收窄`后才能使用，只能赋值给 `any` 和 `unknown`类型本身。
- `never`：表示 `永远不会发生` 的类型
- `undefined`：未初始化/表示未定义
- `null`：显式为空

## 联合类型 & 交叉类型

- 联合类型：`|`
- 交叉类型：`&`

## 非空断言与断言

### 介绍

- 非空断言：`!`，非空断言运算符是一个后缀运算符
  - ⚠️ 只有在`确定`值不能为 `null` 或 `undefined` 时才使用
- 类型断言：`as`

### Example

```ts [index.ts] [as.ts]
// 类型断言 //
const x = "hello" as number;

// 非空断言 //
let input: string | null = document.getElementById("input")?.value;
// 非空断言：明确告诉编译器input不为null
let inputValue: string = input!;
```

### 特性对比表

- `非空断言（!）`
  - 目的：强制跳过空检查
  - 安全性：低（依赖开发者判断）
  - 适用场景：确定非空时
- `可选链（?.）`
  - 目的：安全访问属性
  - 安全性：高（自动短路）
  - 适用场景：可能为空的深层访问
- `空值合并（??）`
  - 目的：提供默认值
  - 安全性：高（处理null/undefined）
  - 适用场景：需要默认值时

## readonly vs const

> 选择 `readonly`/ `const`（判断条件：将它做为`变量`使用还是`属性`使用？）

- 将其作为变量使用：选 `const`
- 将其作为属性使：选 `readonly`

## type & interface

### 基础

- `type`：类型别名
- `interface`：接口

### 异同

- 类型定义
  - `type`：可用于`基本/联合/元组/对象类型`等的类型定义。
  - `interface`：主要用于`对象类型`的类型定义。
- 继承/扩展
  - `type`：能使用`交叉类型（&）`实现类似扩展，但不能使用 `extends` 继承；
  - `interface`：能使用 `extends` 继承一个或多个接口。
- 重复定义
  - `type`：不能重复定义，重复定义会引发编译错误。
  - `interface`：可以重复定义，并且会自动合并（若类型相同）。
- 定义联合类型
  - `type`：能直接声明联合类型
  - `interface`：本身不能，但可通过类型别名实现接口的联合。
- 声明合并
  - `type`：不能参与`声明合并`
  - `interface`：可以进行`声明合并`

### 注意事项 ⚠️

- interface 接口合并
  - 接口的`非函数的成员应该是唯一`的。若它们不是唯一的，那么它们`必须是相同的类型`。
  - 若两个接口中`同时声明`了`同名的非函数成员`且它们的`类型不同`，则`编译器会报错`。
  - 每个同名函数声明都会被当成这个函数的一个重载。
  - 当接口A与后来的接口A合并时，后面的接口具有更高的优先级。
  - 接口合并后的顺序，接口重载出现在靠前位置（类似于->弹夹压子弹->先压的最底层，后压的在最上层）。

## 类型运算符(typeof&keyof)

```ts [index.ts] [typeof&keyof.ts]
/** typof：从值获取类型 */
const person = { name: "Alice", age: 30 };
type PersonType = typeof person;
// PersonType = { name: string; age: number }

/**  keyof 示例：从类型获取键 */
interface User {
  id: number;
  name: string;
  email: string;
}
type UserKeys = keyof User;
// UserKeys = "id" | "name" | "email"

// 类型安全的属性访问
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com" };
getProperty(user, "name"); // ✅ 正确
getProperty(user, "age"); // ❌ 错误：'age' 不在 keyof User 中

/*** typeof 和 keyof 结合使用 ***/
// 1. 定义一个常量对象（作为事实来源）
const ThemeColors = {
  primary: "#1890ff",
  success: "#52c41a",
  warning: "#faad14",
  error: "#f5222d",
} as const; // 加上 as const 可以让属性变成只读字面量类型，推导更精确

// 2. 结合使用 typeof 和 keyof
// typeof ThemeColors -> 获取对象的类型结构 { readonly primary: "#1890ff"; ... }
// keyof ...         -> 获取该类型所有键的联合 "primary" | "success" | "warning" | "error"
type ThemeType = keyof typeof ThemeColors;

// 3. 使用类型
function getThemeColor(type: ThemeType) {
  return ThemeColors[type];
}

// ✅ 正确
getThemeColor("primary");

// ❌ 报错：Argument of type '"secondary"' is not assignable to parameter of type '"primary" | "success" | "warning" | "error"'.
getThemeColor("secondary");

/** 枚举反向映射 (Enum替代方案) */
const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

// 获取 "GET" | "POST" | "PUT" | "DELETE"
type HttpMethod = keyof typeof HttpMethods;

function request(url: string, method: HttpMethod) {
  // ...
}
```

## 常用实用工具类型整理

> TypeScript 文档->工具类型。

- `Omit<Type, Keys>`：从类型`Type`中排除属于`Keys`属性名的类型，组成新类型。
- `Pick<Type, Keys>`：从指定类型`Type`中，挑选出属于`Keys`属性名的类型，组成新类型。
- `Partial<Type>`：将`Type`的所有属性设置为可选类型（`?`）。
- `Required<Type>`：将`Type`的所有属性设置为必选。
- `Readonly<Type>`：将`Type`中的所有属性设置为只读。
- `Record<Keys, Type>`：快速创建一个属性名为`Keys`、属性值为`Type`类型的对象类型。
- `NonNullable<Type>`：从`Type`中排除`null`和`undefined`来构造一个类型。
- `Parameters<Type>`：从函数类型`Type`的参数中使用的类型构造元组类型。
- `ReturnType<Type>`：构造一个由函数`Type`的返回类型`组成的类型。
- `Extract<T, K>`：从联合类型`T`中，提取出可以赋值给`U`的类型，来构造一个类型。
- `Exclude<T, U>`：从联合类型`T`中，排除可以赋值给`U`的类型，保留剩余类型。
- `InstanceType<Type>`: 构造一个由`Type`中的构造函数的`实例类型`组成的类型。

## 高频符号

### 可选（?）
> `?`：可选属性或者参数或者条件类型，用于标记 `属性或参数是可选的`（可能不存在）

1️⃣ 条件类型：（条件 ? true-表达式 : false-表达式）

  > - `SomeType extends OtherType ? TrueType : FalseType;`（`T extends U ? X : Y`）
  > - 当 `extends` 左边的类型可以赋值给右边的类型时，你将获得` TrueType` 类型；
  > - 否则你将获得` FalseType` 类型。

2️⃣ 可选参数
> `testFunction(name:string,account?:number)`

3️⃣ 属性
> `const props = defineProps<{title?:string; icon?: string;}>()`

### 非空断言运算符（!）
1️⃣ `!`：非空断言运算符
> 明确知晓 变量不会是 `null` 或者 `undefined`（info!.name：明确知晓info不为 `null`或者`undefined`）。

### 联合类型（|）
> `|`：联合类型，表示一个值可以是 `多种类型之一`（`A | B `表示 `A` 或 `B`）。

### 交叉类型（&）
> `&`：交叉类型，表示一个值必须 `同时满足多个类型`（`A & B` 表示 `A` 和 `B` 的组合）。

### 空值合并运算符（??）
> `??`：空值合并运算符， 如果左侧是 `null` 或 `undefined`，则返回右侧的默认值，否则返回左侧的值。

### 逻辑与运算符（&&）
> `&&`: 逻辑与运算符，当左侧为 `false` 时，直接返回左侧的值，否则返回右侧的值。

### 逻辑或运算符（||）
> `||`：逻辑或运算符, 当左侧为 `true` 时，直接返回左侧的值，否则返回右侧的值。

### 展开运算符（...）
> `...`：展开运算符, 在 TS 中，还能用于 `合并类型`(对象类型不能直接使用展开运算符 `...` 来合并，你需要使用交叉类型 `&`来合并多个对象类型)。

### 类型断言（as）
> `as`：类型断言,`强制告诉 TS 某个值的类型`（类似于强制类型转换）。

### 索引类型查询（keyof）
> `keyof`：索引类型查询，获取 `某个类型的所有键（属性名）的联合类型`。(keyof T)

### typeof
> `typeof`：类型查询，获取 `某个值的类型`（返回的是 `TS` 类型）。(typeof obj)

### 映射类型的键遍历（in）
> `in`：映射类型的键遍历，在 `映射类型（Mapped Types）` 中 `遍历键`。([K in Keys]: T)

## 条件类型（?）

### 基本语法与概念

1️⃣ 条件类型的基本形式如下

```ts [index.ts] [index.ts]
T extends U ? X : Y
```

> 含义：若类型`T`能够赋值给类型`U`（即`T`是`U`的`子类型`），则结果类型是`X`，否则为`Y`。

### 基础判断

```ts [index.ts] [index.ts]
// 若 T 类型是 string 类型的子类型 ? true : false
// 若 T 类型能够赋值给 string 类型 ? true : false
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
type C = IsString<"hello">; // true（'hello' 是 string 的子类型）
```

### 基于类型选择结果

> 假设我们需要一个函数，根据输入是 `string` 还是 `number` 来决定返回值的标签类型

```ts [index.ts] [index.ts]
interface IdLabel {
  id: number;
}
interface NameLabel {
  name: string;
}
// 定义条件类型
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
// 通过函数使用条件类型判断返回的标签类型
function labelType<T extends number | string>(IdOrName: T): NameOrId<T> {
  // 这里通常需要类型断言，因为 TS 在函数内部很难推断具体的运行时逻辑
  throw "unimplemented";
}
let a = labelType("typescript"); // 类型：NameLabel
let b = labelType(108.8); // 类型：IdLabel
```

### 分布式条件类型

> 规则：当待检查的类型（泛型参数）是`联合类型`时，条件类型会进行`分发`计算。

🛠 若`T`是`A|B`，那么 `T extends U ? X : Y` 会变成：`(A extends U ? X : Y) | (B extends U ? X : Y)`

1️⃣ 实现 Exclude (排除)，TS 内置的 `Exclude<T, U>` 就是利用了这个特性

```ts [index.ts] [index.ts]
// 定义：从 T 中排除可以赋值给 U 的类型
type MyExclude<T, U> = T extends U ? never : T;

// 过程解析：MyExclude<'a' | 'b' | 'c', 'a'>
// 1. 分发：
//    ('a' extends 'a' ? never : 'a') |
//    ('b' extends 'a' ? never : 'b') |
//    ('c' extends 'a' ? never : 'c')
// 2. 计算结果为：never | 'b' | 'c'
// 3. 结果 (never 在联合类型中会被忽略)：则结果为 'b' | 'c'

type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'
```

> 技巧：如何阻止分发？如果你不希望发生这种分发行为（即希望把联合类型看作一个整体），可以将类型包裹在元组 [] 中：

```ts [index.ts] [index.ts]
type NoDistribute<T> = [T] extends [string] ? "yes" : "no";

type A = NoDistribute<string | number>;
// 结果: "no"
// 解释: [string | number] 作为一个整体，并不能赋值给 [string]
```

### infer 关键字与类型推断

1️⃣ 定义

> `infer`是条件类型的`“杀手锏”`。它允许你在 `extends` 条件语句的`真分支`中声明一个变量，用来`捕获`（推断）类型的一部分

2️⃣ 语法

```ts [index.ts] [语法.ts]
T extends SomeType<infer R> ? R : Y
```

3️⃣ 获取数组元素的类型

> 我们需要一个类型，若是数组，就取出里面的元素类型；若不是数组，就返回它自己。

```ts [index.ts] [index.ts]
type Flatten<T> = T extends Array<infer Item> ? Item : T;

type StrArray = Flatten<string[]>; // string
type NumArray = Flatten<number>; // number
// 解析：“若 T 是某种数组，就把那个数组里面的元素类型命名为 Item，然后在结果里直接使用 Item”。
```

4️⃣ 实现 ReturnType (获取函数返回值)

```ts [index.ts] [ReturnType.ts]
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Func = () => { name: string; age: number };
type Result = MyReturnType<Func>; // { name: string; age: number }
```

### 递归与实战组合

1️⃣ DeepReadonly (深度只读),将对象的所有属性（包括嵌套对象的属性）都变为 readonly。

```ts [index.ts] [DeepReadonly.ts]
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepReadonly<T[K]> // 如果是对象但不是函数，递归调用
    : T[K];
};

interface Profile {
  name: string;
  settings: {
    theme: string;
  };
}

type ReadonlyProfile = DeepReadonly<Profile>;
// ReadonlyProfile.settings.theme 也是只读的
```

2️⃣ 取 Promise 内部类型 ( Awaited 原理),若一个类型被多层 Promise 包裹，我们想拿到最终的值

```ts [index.ts] [index.ts]
type MyAwaited<T> =
  T extends PromiseLike<infer U>
    ? MyAwaited<U> // 递归：如果还是 Promise，继续解包
    : T; // 终止：不是 Promise，返回类型

type Res = MyAwaited<Promise<Promise<number>>>; // number
```

### 总结

- `?`：`基本判断`，`IsString<T> = T extends string ? true : false`
- `Union`：`分布式`，`string | number`，传入条件类型会分别计算
- `[T]`：`阻止分发`，`[T] extends [U]`，视作整体比较
- `infer R`：`类型推断`，`Array<infer U>`，提取数组元素类型
- `extends never`：`过滤`，返回 `never`，表示在联合类型中删除该项
## 高级类型
### 常见高级类型
- 交叉类型（`T & U`）
- 联合类型（`T | U`）
- 类型别名
- 类型索引
- 类型约束
- 映射类型
- 条件类型（`T extends U ? X : Y`）

### Example
::: code-group
```ts [交叉类型.ts]
function extend<T extends object, U>(first: T, second: U): T & U {
  let result = {} as T & U
  for (let key in first) {
    result[key] = first[key] as any
  }
  for (let key in second) {
    if (!result.hasOwnProperty(key)) {
      result[key] = second[key] as any
    }
  }
  return result
}
```
```ts [联合类型.ts]
function formatCommandline(command: string[] | string) {
  let line = ''
  if (typeof command === 'string') {
    line = command.trim()
  } else {
    line = command.join(' ').trim()
  }
}
```
```ts [类型别名.ts]
type some = boolean | string

const b: some = true // ok
const c: some = 'hello' // ok
const d: some = 123 // 不能将类型“123”分配给类型“some”

type Container<T> = { value: T }

type Tree<T> = {
  value: T
  left: Tree<T>
  right: Tree<T>
}
```
```ts [类型索引.ts]
interface Button {
  type: string
  text: string
}

type ButtonKeys = keyof Button
// 等效于
type ButtonKeys = 'type' | 'text'
```
```ts [类型约束.ts]
type BaseType = string | number | boolean

// 这里表示 copy 的参数
// 只能是字符串、数字、布尔这几种基础类型
function copy<T extends BaseType>(arg: T): T {
  return arg
}

function getValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

const obj = { a: 1 }
const a = getValue(obj, 'a')
```
```ts [映射类型.ts]
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

interface Obj {
  a: string
  b: string
}

type ReadOnlyObj = Readonly<Obj>

interface ReadOnlyObj {
  readonly a: string
  readonly b: string
}
```
```ts [条件类型.ts]
T extends U ? X : Y
```
:::

## 从类型创建类型

> [从类型创建类型](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

### 泛型

#### 开始

```ts
// 如果没有泛型，我们就必须给恒等函数指定一个特定类型
function identity(arg: number): number {
  return arg;
}

function identity<Type>(arg: Type): Type {
  return arg;
}
// 等价
function identity<T>(arg: T): T {
  return arg
}

// 方式一：将所有参数（包括类型参数）传递给函数
let output = identity<string>("myString"); 

// 方式2：使用类型参数推断
let output = identity("myString"); 
```

#### 泛型类型

```ts
/** 范型接口 */
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;

/** 将泛型参数移至整个接口的参数 */
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

#### 泛型类

> 泛型类的结构与泛型接口类似。泛型类在类名后用尖括号 ( `<>` ) 列出泛型类型参数列表。

```ts
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

⚠️ 注意事项

- 类的类型包含两个方面：静态方面和实例方面。
- 泛型类仅在其实例方面是泛型的，而非静态方面，因此在使用类时，静态成员`不能使用类`的`类型参数`。
- 与接口一样，将类型参数放在类本身上，可以确保类的所有属性都使用相同的类型。

#### 范型约束

> 我们希望范型函数`能够处理所有类型的数据`，而`不是所有类型都适用`，并且该类型必须具有 某个 属性。只要类型具有此属性，我们就允许它使用，但必须至少具有此属性。为此，我们必须将此要求作为对 `Type` 约束条件。

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  // Now we know it has a .length property, so no more error
  console.log(arg.length); 
  return arg;
}

// 由于通用函数现在受到限制，它将不再适用于所有类型
loggingIdentity(3); 

// 相反，我们需要传入类型具备所有必需属性的值
loggingIdentity({ length: 10, value: 3 });
```

#### 在泛型约束中使用类型参数

> 可以声明一个受另一个类型参数约束的类型参数。

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m");
// Argument of type '"m"' is not assignable 
// to parameter of type '"a" | "b" | "c" | "d"'.
```

#### 在泛型中使用类类型

> 在 TypeScript 中使用泛型创建工厂时，必须通过构造函数来引用类类型

```ts
// 基类
class Animal {
  numLegs = 4;
}

// 不同的“管理员”类型
class BeeKeeper {
  hasMask = true;
}

class ZooKeeper {
  nametag = "Mikle";
}

// 子类会携带各自特有属性
class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

// 泛型工厂：传入“类构造函数”，返回对应实例
function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

const lion = createInstance(Lion);
lion.keeper.nametag; // 类型推导为 ZooKeeper

const bee = createInstance(Bee);
bee.keeper.hasMask; // 类型推导为 BeeKeeper
```

> 说明
>
> - 这里参数类型必须写成 `new () => A`，因为我们传入的不是实例本身，而是“类的构造函数”。
> - `A` 只描述实例类型；`new () => A` 才能描述“可被 new、并且返回 A 实例”的类类型。
> - 如果只写 `A`，函数体里的 `new c()` 在类型层面就不成立。

#### 范型参数默认值

1️⃣ 通用参数默认值遵循以下规则

- 如果类型参数有默认值，则该类型参数被视为可选参数。
- 必需类型参数不能跟在可选类型参数之后。
- 类型参数的默认类型必须满足类型参数的约束（如果存在）。
- 指定类型参数时，只需为必需的类型参数指定类型参数即可。未指定的类型参数将解析为其默认类型。
- 如果指定了默认类型，但推理无法选择候选类型，则推断出默认类型。
- 与现有类或接口声明合并的类或接口声明可能会为现有类型参数引入默认值。
- 与现有类或接口声明合并的类或接口声明可以引入新的类型参数，只要它指定了默认值即可。

2️⃣ Example

```ts
declare function create(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function create<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function create<T extends HTMLElement, U extends HTMLElement>(
  element: T,
  children: U[],
): Container<T, U[]>;

// 使用通用参数默认值，我们可以将其简化为
declare function create<
  T extends HTMLElement = HTMLDivElement,
  U extends HTMLElement[] = T[],
>(element?: T, children?: U): Container<T, U>;

// const div: Container<HTMLDivElement, HTMLDivElement[]>
const div = create(); 
// const p: Container<HTMLParagraphElement, HTMLParagraphElement[]>
const p = create(new HTMLParagraphElement()); 

// 1) 什么都不传：用默认
const c1 = create();
// T = HTMLDivElement
// U = HTMLDivElement[]

// 2) 传 span 元素：T 被推成 HTMLSpanElement，U 默认变成 HTMLSpanElement[]
const span = document.createElement("span");
const c2 = create(span);

// 3) 显式传 children：U 会按传入数组推导
const div = document.createElement("div");
const children = [document.createElement("p"), document.createElement("a")];
const c3 = create(div, children);
// T = HTMLDivElement
// U = (HTMLParagraphElement | HTMLAnchorElement)[]
```

3️⃣ 逐段拆解(使用通用参数默认值)

- 1.`declare function ...`
  - `declare` 表示“只声明类型，不提供实现”。
  - 常见于 `.d.ts` 类型定义文件，告诉 TS：这个函数存在，按这个签名用就行。
- 2.泛型参数 `T`
  - `T extends HTMLElement`: 约束 `T` 必须是 `HTMLElement` 或其子类型（如 `HTMLDivElement`、`HTMLSpanElement`）。
  - `= HTMLDivElement`
    - 默认类型是 `HTMLDivElement`。
    - 如果调用时推不出 `T`，就用 `HTMLDivElement`。
- 3.泛型参数 `U`
  - `U extends HTMLElement[]`: `U` 必须是 `HTMLElement 数组类型`。
  - `= T[]`
    - 默认是 `T` 的数组。
    - 如果 `T` 是 `HTMLSpanElement`，默认 `U` 就是 `HTMLSpanElement[]`。
- 4.参数列表
  - `element?: T`，可选参数，类型是 `T`
  - `children?: U`，可选参数，类型是 `U`
- 5.返回值 `Container<T, U>`
  - 返回类型和输入的泛型绑定。
  - 你传什么 `T/U`，返回值里就保留对应的精确类型信息。

#### 协变和逆变

#### 总结

- 在类型系统中，属性更多的类型是子类型；
  - ⚠️ 在联合类型（`|`）中，类型更少是子类型（如：`'a' | 'b' | 'c'` 是 `'a' | 'b'` 的父类型）。
- 在集合论中，属性更少的集合是子集。

### 类型键运算符(keyof)

> `类型键运算符` - 使用 `keyof` 运算符创建新类型

### 类型运算符(typeof)

> `typeof 类型运算符` - 使用 `typeof` 运算符创建新类型

### 索引访问类型

> `索引访问类型` - 使用 `Type['a']` 语法访问类型的子集

### 条件类型

> `条件类型` ——在类型系统中充当 if 语句的类型

### 映射类型

> `映射类型` - 通过映射现有类型中的每个属性来创建类型

### 模板字面量类型

> `模板字面量类型` - 通过模板字面量字符串更改属性的映射类型

## 函数
### 函数重载
- `定义`
> 允许创建数项名称相同但输入输出类型或个数不同的子程序

- 关于 `TS` 函数重载
> 必须要把精确的定义放在前面，最后函数实现时，需要使用`|`操作符或者`?`操作符，把所有可能的输入类型全部包含进去，用于具体实现

- Example

```ts [Example.ts]
// 上边是声明
function add(arg1: string, arg2: string): string
function add(arg1: number, arg2: number): number
// 因为我们在下边有具体函数的实现，所以这里并不需要添加 declare 关键字
// 下边是实现
function add(arg1: string | number, arg2: string | number) {
  // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 arg1 + arg2
  if (typeof arg1 === 'string' && typeof arg2 === 'string') {
    return arg1 + arg2
  } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return arg1 + arg2
  }
}
```

## Enums 枚举

### 规范

- 枚举名称：大驼峰命名（PascalCase）
- 枚举内容
  - `Key`：大驼峰/全大写（多个单词下划线分隔），`Down/DOWN`
  - `Value`：数字/字符串，`1/'1'`、`'up'/'UP'`
  - `格式`: `key = value`
- ⚠️ 全项目一致：大驼峰命名（PascalCase）/ 全大写，全项目统一一种即可。
### 枚举分类
::: code-group
```ts [数字枚举.ts]
// 默认从 0 开始依次递增（和数组下标一样）
enum Direction {
  Up, // 值默认为 0
  Down, // 值默认为 1
  Left, // 值默认为 2
  Right, // 值默认为 3
}

console.log(Direction.Up === 0) // true
console.log(Direction.Down === 1) // true
console.log(Direction.Left === 2) // true
console.log(Direction.Right === 3) // true
```
```ts [字符串枚举.ts]
// 枚举类型的值其实也可以是字符串类型：
enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
}

console.log(Direction['Right'], Direction.Up) // Right Up
```
```ts [异构枚举.ts]
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'YES',
}
```
:::

### 注意事项

- 1️⃣ 数值枚举
  - 连续数值
    - 若使用默认，同时不给自定义数值，则开始数值默认是从 0 开始。（类似数组索引）
    - 若需要自定义数值，则给定第一个开始数值，所有成员从此点自动递增 1。
  - 非连续数值：给每个 Key 的 Value 都指定数值就好
- 2️⃣ 字符串枚举: Value可以为`全小写/全大写`字符串
- 3️⃣ 异构枚举: 枚举可以与字符串和数字成员混合使用(不推荐)
  - 枚举内容：一些是 `Key = Value（数值）`；一些是 `Key = Value（字符串）`；
- 4️⃣ 常量枚举（const 枚举）：枚举通过 const 修饰符来定义
  - const 枚举只能使用常量枚举表达式，并且与普通枚举不同，其在编译期间会被完全移除。
  - const 枚举不能有计算成员。
- 5️⃣ 对象与枚举：当一个带有 `as const` 对象就足够时，你可能不需要枚举

```ts
/**
 * 常量枚举
 */
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}

/**
 * 常量对象写法(TS 类型上的常量对象)
 */
//  const 只保证变量绑定不被重新赋值，不能 ODirection = {}。
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;
// as const，在 TypeScript 类型层面把属性变成只读字面量类型
// 1.Up 的类型是 0，不是 number
// 2.整个对象属性是 readonly
```
