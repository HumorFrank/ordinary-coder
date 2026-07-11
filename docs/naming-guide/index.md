# 命名指南

## 常见命名方式

| 命名方式    | 格式         | 示例                        | 适用场景         |
| ----------- | ------------ | --------------------------- | ---------------- |
| PascalCase | 大驼峰式     | `StudentInfo`, `UserInfo`   | 类名、构造函数   |
| camelCase   | 小驼峰式     | `studentInfo`, `userInfo`   | 变量、函数名     |
| kebab-case  | 短横线命名法 | `student-info`, `user-info` | CSS类名、文件名  |
| snake_case  | 蛇形命名法   | `student_info`, `user_info` | 常量、数据库字段 |
| uppercase   | 全大写       | `MAX_COUNT`, `API_URL`      | 常量定义         |

## 目录命名

### 项目目录名

> — **kebab-case（短横线）/ 全小写（lowercase）** 命名

- 例如：`learn-react`、`awesome-project`
- 例如：`ecommerce`、`spinman`、`pokrscan`

### 页面目录名

> — **kebab-case（短横线）/ 全小写（lowercase）** 命名

- 例如：`pages/home`、`pages/about`
- 例如：`views/home`、`views/about`
- 例如：`pages/nest-menu`、`views/nest-menu`

### 页面文件命名

> — **kebab-case（短横线）/ 全小写（lowercase）** 命名

- 例如：`pages/home/index`、`views/home/index`
- 例如：`pages/auth/menu-auth`、`pages/auth/btn-auth`
- 例如：`pages/super-table/form-table`、`views/super-table/form-table`

### 全局样式目录命名

> — **全小写（lowercase）** 命名

| 场景              | 命名规则                  | 示例                                  |
| ----------------- | ------------------------- | ------------------------------------- |
| **全局样式目录**  | 全小写（lowercase），复数 | `styles/`、`assets/styles/`           |
| **入口文件**      | 全小写（lowercase）       | `global.css`、`main.css`、`index.css` |
| **普通 CSS 文件** | 全小写（lowercase）       | `reset.css`、`normalize.css`          |

### 脚本目录命名

> — **kebab-case（短横线）/ 全小写（lowercase）** 命名

| 场景                 | 命名规则                           | 示例                            |
| -------------------- | ---------------------------------- | ------------------------------- |
| **脚本目录**         | 全小写，复数                       | `scripts/`                      |
| **Node.js 脚本文件** | `kebab-case / lowercase`，动词开头 | `deploy.js`、`seed-database.ts` |
| **Shell 脚本文件**   | `kebab-case / lowercase` + `.sh`   | `setup-env.sh`                  |
| **脚本文件**         | `kebab-case / lowercase`           | `scripts/logger.js`             |

### 静态资源目录命名

> — **kebab-case（短横线）/ 全小写（lowercase）** 命名

| 场景                   | 命名规则                         | 示例                          |
| ---------------------- | -------------------------------- | ----------------------------- |
| **资源目录（需构建）** | 全小写，复数                     | `assets/`                     |
| **静态目录（不构建）** | 全小写，单数                     | `public/`                     |
| **图片子目录**         | 全小写，复数                     | `images/`、`icons/`、`svg/`   |
| **图片文件**           | `kebab-case / lowercase`，语义化 | `hero-banner.png`、`logo.svg` |
| **字体文件**           | `kebab-case / lowercase`         | `open-sans.woff2`             |

### 工具函数目录命名

> — **全小写（lowercase）** 命名

| 目录名         | 命名规则     | 说明                                                   |
| -------------- | ------------ | ------------------------------------------------------ |
| `utils/`       | 全小写，复数 | **最通用**，存放零散、无副作用的纯函数。               |
| `helpers/`     | 全小写，复数 | 与 `utils` 含义接近，有时隐含"辅助/格式化"等轻量操作。 |
| `lib/`         | 全小写，单数 | 偏**库**的概念，适合更复杂、有状态的工具模块。         |
| `api/`         | 全小写，复数 | **专门存放与外部通信的函数**，如 API 请求封装。        |
| `composables/` | 全小写，复数 | **Vue 专用**，存放组合式函数（Composables）。          |
| `hooks/`       | 全小写，复数 | **React 专用**，存放自定义 Hook。                      |

### 工具函数内部文件命名

1️⃣ **kebab-case（推荐）** — 通用、无争议，URL 安全。

- 例如：`format-date.ts`、`validate-form.ts `

2️⃣ **按类别聚合（函数多时推荐）** — 将相关函数聚合在一个文件中，避免碎片化。

- 例如：`string.ts`、`array.ts`、`object.ts`、`date.ts`、`boolean.ts`

3️⃣ **camelCase** — 也可以，特别是导出单个函数且函数名就是文件名的场景。

- 例如：`formatDate.ts`、`validators.ts`

### 图片命名

— 图片命名建议命名格式 — **全小写（lowercase）** 命名

1️⃣ 图片命名格式

```sh
[业务前缀_]功能类别_模块名称[@倍数].扩展名
```

- **业务前缀（可选）**
  > 仅当项目包含`多业务线`图片，或需要`与其他业务共享资源`时使用。单业务项目可省略。
- **功能类别（必选）**
  > 标识图片在界面中的`用途或类型`，是整个命名的核心。
- **模块名称（可选）**
  > 标识图片所属的`页面或功能模块`，便于快速定位。单模块或通用图片可省略。
- **倍数（可选）**
  > 适配不同屏幕像素密度。普清（1x）可省略，仅提供高倍图时需标注。

::: warning 单词间连接

- `[]` 表示可选，`_` 为固定分隔符
- 所有字母`全小写`，单词间用 `-（短横线）` 连接

:::

2️⃣ 总结口诀

| 规则项       | 格式                         | 示例                            |
| ------------ | ---------------------------- | ------------------------------- |
| **全小写**   | 全小写                       | `icon` ✅，`Icon` ❌            |
| **分隔符**   | 类别与模块用 `_`，其余用 `-` | `icon_goods-cart` ✅            |
| **倍数格式** | `@2x`、`@3x`                 | `logo@2x.png`                   |
| **扩展名**   | 全小写                       | `.png`、`.svg`、`.webp`、`.jpg` |
| **顺序**     | 业务 → 类别 → 模块 → 倍数    | `jd_icon_goods-cart@2x.png`     |

## HTML

### 文件命名

> — **kebab-case（短横线）/ 全小写（lowercase）** 命名

## CSS

### 文件命名

> — **kebab-case（短横线）/ 全小写（lowercase）** 命名

### CSS 类名

> — **全小写（lowercase）** 命名

| 权威方法        | 规范                       | 示例                                     |
| --------------- | -------------------------- | ---------------------------------------- |
| **常规命名**    | `kebab-case (短横线)`      | `class="flex items-center text-red-500"` |
| **BEM 命名法**  | `Block__Element--Modifier` | `.search-form__button--disabled`         |
| **CSS Modules** | `camelCase (小驼峰)`       | `styles.errorMessage`                    |

## JavaScript

### 函数名

> — **camelCase（小驼峰命名法）** 命名

- 例如：`getProductsData`、`handleCartAdd`、`addToCart`、`removeItem`、`clear`

### 变量名

> — **camelCase（小驼峰命名法）** 命名

- 例如：`cart`、`product`、`user`、`item`、`list`
- 例如：`userInfo`、`userList`、`roleList`

### 常量名

> — **全大写，多个单词之间用下划线（`_`）隔开** 命名

- 例如：`CURRENCY_SYMBOLS`、`STAKE_GAME`、`SUPPORTED_LANGUAGES`、`DEFAULT_LOCALE`、`WEB_NAME`、`USER_TOKEN_KEY`

### class 类名

> — **PascalCase（大驼峰）** 命名

| 场景            | 命名规则           | 示例                                                |
| --------------- | ------------------ | --------------------------------------------------- |
| **类名**        | `PascalCase`       | `User`、`ShoppingCart`、`HttpRequest`、`JsonParser` |
| **类实例/对象** | `camelCase`        | `const user = new User()`                           |
| **类成员方法**  | `camelCase`        | `getUserInfo()`、`handleClick()`                    |
| **类静态常量**  | `UPPER_SNAKE_CASE` | `static MAX_COUNT = 100`                            |

## Vue

### 组件目录命名

| 场景                       | 命名规则                         | 示例                        |
| -------------------------- | -------------------------------- | --------------------------- |
| **单文件组件（无子文件）** | 不需要文件夹，直接放 `.vue` 文件 | `BaseButton.vue`            |
| **有子文件的组件**         | `PascalCase` 文件夹              | `UserProfile/`              |
| **基础组件分类目录**       | `PascalCase`                     | `Base/`、`UI/`、`Common/`   |
| **业务组件分类目录**       | `PascalCase`                     | `User/`、`Urder/`、`Goods/` |

::: tip 目录遵循规则，项目内严格统一（即项目只能选其一，不能混用）

- 方案一（✅ 官方推荐）：**kebab-case（短横线）+ 全小写（lowercase）** 命名

  > 所有组件相关目录和文件全部使用 `kebab-case + 全小写`，包括基础组件和业务组件。

- 方案二（✅ 官方推荐）：**PascalCase（大驼峰）** 命名
  > 所有组件相关目录和文件全部使用 `PascalCase`，包括基础组件和业务组件。

📚 Example

::: code-group

```txt [PascalCase]
components/
├── Base/                    // 基础组件目录，PascalCase
│   ├── BaseButton.vue
│   ├── BaseInput.vue
│   └── BaseModal.vue
├── User/                    // 业务组件目录，PascalCase
│   └── UserAvatar.vue
├── Order/                   // 业务组件目录，PascalCase
│   ├── OrderCard.vue
│   └── OrderList.vue
└── UserProfile/             // 有子文件的组件，PascalCase
    ├── UserProfile.vue
    └── UserProfile.test.ts
```

```txt [kebab-case + 全小写]
components/
├── base/                      // 基础组件目录，kebab-case
│   ├── base-button.vue
│   ├── base-input.vue
│   └── base-modal.vue
├── user/                      // 业务组件目录，kebab-case
│   └── user-avatar.vue
├── order/                     // 业务组件目录，kebab-case
│   ├── order-card.vue
│   └── order-list.vue
└── user-profile/              // 有子文件的组件，kebab-case
    ├── user-profile.vue
    └── user-profile.test.ts
```

:::

### 基础组件命名

| 规则         | 说明                                           | 示例                                        |
| ------------ | ---------------------------------------------- | ------------------------------------------- |
| **前缀**     | `Base` / `App` / `V`（选其一，项目内统一）     | `BaseButton.vue`                            |
| **命名格式** | PascalCase（单文件组件强制）                   | `BaseButton.vue` ✅ <br>`baseButton.vue` ❌ |
| **存放位置** | `src/components/base/` 或 `src/components/ui/` | 与业务组件分开放置                          |
| **职责**     | 纯展示、无业务逻辑、无状态                     | 不包含 store、API 调用                      |

### 单文件组件的文件名

> — **PascalCase（大驼峰）/ kebab-case (横线连接)** 命名

- 例如：`MyComponent`、`my-component`

### 单例组件名

> — 只应该拥有单个活跃实例的组件应该以 `The` 前缀命名，以示其唯一性。

- 例如：`TheHeading`、`TheSidebar`

### 紧密耦合的组件名

> — 和父组件紧密耦合的子组件应该以`父组件名`作为`前缀命名`。

- 例如：`TodoList`、`TodoListItem`、`TodoListItemButton`
- 例如：`SearchSidebar`、`SearchSidebarNavigation`

### 组件名中的单词顺序

> — 组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。

- 例如：`SearchButtonClear`、`SearchButtonRun`、`SettingsCheckboxLaunchOnStartup`
- 例如：`SearchInputExcludeGlob`、`SettingsCheckboxTerms`、`SearchInputQuery`

### 自闭合组件

> — 当组件不需要传入内容应该是自闭合的——但在 DOM 模板里永远不要这样做。

- 例如：在单文件组件、字符串模板和 JSX 中 `<MyComponent/>`
- 例如：在 DOM 模板中 `<my-component></my-component>`

### 组件名大小写

- 在单文件组件和字符串模板中组件名应该总是 `PascalCase（大驼峰）`。
- JS/JSX 中的组件名应该始终是 `PascalCase（大驼峰）` 的
- 在 DOM 模板中总是 `kebab-case（短横线）` 的（因为 HTML 是大小写不敏感的）。

### 完整单词的组件名

> — 组件名应该倾向于完整单词而不是缩写。

- 例如：`SdSettings`、`UProfOpts` ❌
- 例如：`StudentDashboardSettings`、`UserProfileOptions` ✅

### Prop 名大小写

- 在 `声明 prop` 的时候，其命名应该始终使用 `camelCase（小驼峰）`。
- 在 `模板和 JSX` 中应该始终使用 `kebab-case（短横线）`。

## React

- **扩展名**: 用 `.jsx/.tsx` 作为组件扩展名。
- **文件名**: 用 `PascalCase（大驼峰）`作为文件名，如：`ReservationCard.tsx`。
- **参数命名**: React 组件用`PascalCase（大驼峰）`，组件的实例用小驼峰。
- **组件命名**：React 组件必须使用 `PascalCase（大驼峰）`命名 即以大写字母开头。
- **CSS 类名**：使用 `className` 来指定一个 CSS 的 class。

### 组件文件

| 场景                       | 命名规则                           | 示例                                | 官方依据       |
| -------------------------- | ---------------------------------- | ----------------------------------- | -------------- |
| **组件文件**               | `PascalCase`（强制）               | `UserProfile.tsx`、`BaseButton.tsx` | React 官方强制 |
| **单文件组件（无子文件）** | 直接放 `.tsx` 文件                 | `BaseButton.tsx`                    | 社区约定       |
| **有子文件的组件**         | `PascalCase` 文件夹 + 同名组件文件 | `UserProfile/UserProfile.tsx`       | 社区约定       |

### Hook 文件

| 场景            | 命名规则             | 示例                               | 官方依据       |
| --------------- | -------------------- | ---------------------------------- | -------------- |
| **自定义 Hook** | `use` + `PascalCase` | `useAuth.ts`、`useLocalStorage.ts` | React 官方强制 |

### 样式文件

| 场景              | 命名规则                     | 示例                        |
| ----------------- | ---------------------------- | --------------------------- |
| **全局样式入口**  | `kebab-case`                 | `global.css`、`globals.css` |
| **CSS Modules**   | `PascalCase` + `.module.css` | `UserProfile.module.css`    |
| **Tailwind 入口** | 固定文件名                   | `globals.css`               |

### 类型声明文件

| 场景             | 命名规则                    | 示例                                     |
| ---------------- | --------------------------- | ---------------------------------------- |
| **通用类型**     | `kebab-case` 或 `camelCase` | `types/user.ts`、`types/api-response.ts` |
| **组件专属类型** | `PascalCase` + `.types.ts`  | `UserProfile.types.ts`                   |

### 测试文件

| 场景         | 命名规则                                | 示例                   | 官方依据                  |
| ------------ | --------------------------------------- | ---------------------- | ------------------------- |
| **单元测试** | 与组件同名 + `.test.tsx` 或 `.spec.tsx` | `UserProfile.test.tsx` | Jest / Vitest 约定        |
| **E2E 测试** | `kebab-case`（匹配路由）                | `user-profile.cy.ts`   | Cypress / Playwright 约定 |

### React 专属

| 场景                 | 命名规则                          | 示例                             | 官方依据                 |
| -------------------- | --------------------------------- | -------------------------------- | ------------------------ |
| **组件名**           | `PascalCase`（强制）              | `UserProfile`、`BaseButton`      | React 官方：JSX 强制要求 |
| **自定义 Hook**      | `use` + `PascalCase`              | `useAuth()`、`useLocalStorage()` | React 官方强制           |
| **Props 类型**       | 组件名 + `Props`                  | `UserProfileProps`               | 社区约定                 |
| **高阶组件 (HOC)**   | `with` + 功能描述（PascalCase）   | `withAuth`、`withTheme`          | 社区约定                 |
| **Context**          | 功能名 + `Context`（PascalCase）  | `AuthContext`、`ThemeContext`    | 社区约定                 |
| **Context Provider** | 功能名 + `Provider`（PascalCase） | `AuthProvider`、`ThemeProvider`  | 社区约定                 |
| **Ref 回调**         | 元素名 + `Ref`（camelCase）       | `inputRef`、`buttonRef`          | 社区约定                 |

### 路由路径

| 场景         | 命名规则                   | 示例                             |
| ------------ | -------------------------- | -------------------------------- |
| **URL 路径** | `kebab-case`               | `/user-profile`、`/order-detail` |
| **动态路由** | `[paramName]`（camelCase） | `[userId]`、`[productSlug]`      |

## 鸣谢

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React 风格指南](https://jdf2e.github.io/jdc_fe_guide/docs/react/code/)
- [Vue 风格指南](https://v2.cn.vuejs.org/v2/style-guide/)
