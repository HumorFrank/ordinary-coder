# TypeScript

## 常见类型

1️⃣ 种类

- 基本类型：string ｜ number ｜ boolean
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

2️⃣ Example

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

1️⃣ 介绍

- 非空断言：`!`，非空断言运算符是一个后缀运算符
  - ⚠️ 只有在`确定`值不能为 `null` 或 `undefined` 时才使用
- 类型断言：`as`

2️⃣ Example

```ts [index.ts] [as.ts]
// 类型断言 //
const x = "hello" as number;

// 非空断言 //
let input: string | null = document.getElementById("input")?.value;
// 非空断言：明确告诉编译器input不为null
let inputValue: string = input!;
```

3️⃣ 特性对比表

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

1️⃣ 基础

- `type`：类型别名
- `interface`：接口

2️⃣ 区别

- 类型定义
  - type：可用于`基本/联合/元组/对象类型`等的类型定义。
  - interface：主要用于`对象类型`的类型定义。
- 继承/扩展
  - type：能使用`交叉类型（&）`实现类似扩展，但不能使用 `extends` 继承；
  - interface：能使用 `extends` 继承一个或多个接口。
- 重复定义
  - type：不能重复定义，重复定义会引发编译错误。
  - interface：可以重复定义，并且会自动合并（若类型相同）。
- 定义联合类型
  - type：能直接声明联合类型
  - interface：本身不能，但可通过类型别名实现接口的联合。
- 声明合并
  - type：不能参与`声明合并`
  - interface：可以进行`声明合并`

⚠️ 注意事项

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

## 高频实用符号

> `?`：可选属性或者参数或者条件类型，用于标记 `属性或参数是可选的`（可能不存在）
>
> > - 条件类型：（条件 ? true-表达式 : false-表达式）
> >   > - `SomeType extends OtherType ? TrueType : FalseType;`（`T extends U ? X : Y`）
> >   > - 当 `extends` 左边的类型可以赋值给右边的类型时，你将获得` TrueType` 类型；
> >   > - 否则你将获得` FalseType` 类型。
> > - 可选参数：`testFunction(name:string,account?:number)`
> > - 属性：`const props = defineProps<{title?:string; icon?: string;}>()`

> `!`：非空断言运算符
>
> > 明确知晓 变量不会是 `null` 或者 `undefined`（info!.name：明确知晓info不为 `null`或者`undefined`）。

> `|`：联合类型
>
> > 表示一个值可以是 `多种类型之一`（`A | B `表示 `A` 或 `B`）。

> `&`：交叉类型
>
> > 表示一个值必须 `同时满足多个类型`（`A & B` 表示 `A` 和 `B` 的组合）。

> `??`：空值合并运算符
>
> > 如果左侧是 `null` 或 `undefined`，则返回右侧的默认值，否则返回左侧的值。

> `&&`: 逻辑与运算符
>
> > 当左侧为 `false` 时，直接返回左侧的值，否则返回右侧的值。

> `||`：逻辑或运算符
>
> > 当左侧为 `true` 时，直接返回左侧的值，否则返回右侧的值。

> `...`：展开运算符
>
> > 在 TS 中，还能用于 `合并类型`(对象类型不能直接使用展开运算符 `...` 来合并，你需要使用交叉类型 `&`来合并多个对象类型)。

> `as`：类型断言
>
> > `强制告诉 TS 某个值的类型`（类似于强制类型转换）。

> `keyof`：索引类型查询
>
> > 获取 `某个类型的所有键（属性名）的联合类型`。(keyof T)

> `typeof`：类型查询
>
> > 获取 `某个值的类型`（返回的是 `TS` 类型）。(typeof obj)

> `in`：映射类型的键遍历
>
> > 在 `映射类型（Mapped Types）` 中 `遍历键`。([K in Keys]: T)

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

## 可借鉴 Example

```ts [qr-code-styling/types.ts]
import { DOMWindow, JSDOM } from "jsdom";
import nodeCanvas from "canvas";
export interface UnknownObject {
  [key: string]: any;
}
export type DotType =
  | "dots"
  | "rounded"
  | "classy"
  | "classy-rounded"
  | "square"
  | "extra-rounded";
export type CornerDotType = "dot" | "square" | DotType;
export type CornerSquareType = "dot" | "square" | "extra-rounded" | DotType;
export type FileExtension = "svg" | "png" | "jpeg" | "webp";
export type GradientType = "radial" | "linear";
export type DrawType = "canvas" | "svg";
export type ShapeType = "square" | "circle";
export type Window = DOMWindow;
export type Gradient = {
  type: GradientType;
  rotation?: number;
  colorStops: {
    offset: number;
    color: string;
  }[];
};
export interface DotTypes {
  [key: string]: DotType;
}
export interface GradientTypes {
  [key: string]: GradientType;
}
export interface CornerDotTypes {
  [key: string]: CornerDotType;
}
export interface CornerSquareTypes {
  [key: string]: CornerSquareType;
}
export interface DrawTypes {
  [key: string]: DrawType;
}
export interface ShapeTypes {
  [key: string]: ShapeType;
}
export type TypeNumber =
  | 0  | 1  | 2  | 3  | 4  | 5  | 6  | 7  | 8  | 9  | 10  | 11  | 12    | 13 
  | 14  | 15  | 16  | 17  | 18  | 19  | 20  | 21  | 22  | 23  | 24  
  | 25  | 26  | 27  | 28  | 29  | 30  | 31  | 32  | 33  | 34  | 35  
  | 36  | 37  | 38  | 39  | 40;
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
export type Mode = "Numeric" | "Alphanumeric" | "Byte" | "Kanji";
export interface QRCode {
  addData(data: string, mode?: Mode): void;
  make(): void;
  getModuleCount(): number;
  isDark(row: number, col: number): boolean;
  createImgTag(cellSize?: number, margin?: number): string;
  createSvgTag(cellSize?: number, margin?: number): string;
  createSvgTag(opts?: {
    cellSize?: number;
    margin?: number;
    scalable?: boolean;
  }): string;
  createDataURL(cellSize?: number, margin?: number): string;
  createTableTag(cellSize?: number, margin?: number): string;
  createASCII(cellSize?: number, margin?: number): string;
  renderTo2dContext(context: CanvasRenderingContext2D, cellSize?: number): void;
}
export type Options = {
  type?: DrawType;
  shape?: ShapeType;
  width?: number;
  height?: number;
  margin?: number;
  data?: string;
  image?: string;
  nodeCanvas?: typeof nodeCanvas;
  jsdom?: typeof JSDOM;
  qrOptions?: {
    typeNumber?: TypeNumber;
    mode?: Mode;
    errorCorrectionLevel?: ErrorCorrectionLevel;
  };
  imageOptions?: {
    saveAsBlob?: boolean;
    hideBackgroundDots?: boolean;
    imageSize?: number;
    crossOrigin?: string;
    margin?: number;
  };
  dotsOptions?: {
    type?: DotType;
    color?: string;
    gradient?: Gradient;
    roundSize?: boolean;
  };
  cornersSquareOptions?: {
    type?: CornerSquareType;
    color?: string;
    gradient?: Gradient;
  };
  cornersDotOptions?: {
    type?: CornerDotType;
    color?: string;
    gradient?: Gradient;
  };
  backgroundOptions?: {
    round?: number;
    color?: string;
    gradient?: Gradient;
  };
};
export type FilterFunction = (row: number, col: number) => boolean;
export type DownloadOptions = {
  name?: string;
  extension?: FileExtension;
};
export type DrawArgs = {
  x: number;
  y: number;
  size: number;
  rotation?: number;
  getNeighbor?: GetNeighbor;
};
export type BasicFigureDrawArgs = {
  x: number;
  y: number;
  size: number;
  rotation?: number;
};
export type RotateFigureArgs = {
  x: number;
  y: number;
  size: number;
  rotation?: number;
  draw: () => void;
};
export type GetNeighbor = (x: number, y: number) => boolean;
export type ExtensionFunction = (svg: SVGElement, options: Options) => void;
```
