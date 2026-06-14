# pnpm 搭建 Monorepo 全流程

## 目录

- [环境准备](#环境准备)
- [创建 Monorepo 根项目](#创建-monorepo-根项目)
- [搭建公共工具库包 (packages/utils)](#搭建公共工具库包-packagesutils)
- [搭建公共 UI 库包 (packages/ui)](#搭建公共-ui-库包-packagesui)
- [搭建公共组件库包 (packages/components)](#搭建公共组件库包-packagescomponents)
- [搭建应用包 (apps/web)](#搭建应用包-appsweb)
- [安装所有依赖并启动项目](#安装所有依赖并启动项目)
- [配置 ESLint（可选）](#配置-eslint可选)
- [配置 Prettier（可选）](#配置-prettier可选)
- [配置 Git Hooks（可选）](#配置-git-hooks可选)
- [最终项目结构](#最终项目结构)
- [使用说明](#使用说明)
- [常见问题排查](#常见问题排查)

## 环境准备

> **推荐版本：** Node.js >= 18 LTS，pnpm >= 9。建议使用 [nvm](https://github.com/nvm-sh/nvm)、[fnm](https://github.com/Schniz/fnm) 或 [Volta](https://volta.sh/) 管理 Node 版本。

检查 Node.js 和 npm 版本：

```bash
node -v
npm -v
```

全局安装 pnpm：

```bash
npm install -g pnpm
```

验证安装：

```bash
pnpm -v
```

## 创建 Monorepo 根项目

### 2. 初始化根目录

::: code-group
```bash [创建项目文件夹并进入]
mkdir vue3-monorepo && cd vue3-monorepo
```

```bash [初始化 package.json]
pnpm init
```
:::

### 3. 创建 pnpm-workspace.yaml

::: code-group
```bash [创建 pnpm-workspace.yaml]
touch pnpm-workspace.yaml
```

```yaml [pnpm-workspace.yaml]
packages:
  # 所有 packages 目录下的子包
  - 'packages/*'
  # 或者直接指定应用目录
  - 'apps/*'
```
:::

> **说明：** `workspace:*` 是 pnpm 的工作空间协议，用于引用同一 monorepo 内的其他包。在发布时，`*` 会被自动替换为实际版本号。

### 4. 配置根 package.json

修改根目录下的 `package.json` 为：

```json
{
  "name": "vue3-monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel run dev",
    "build": "pnpm -r run build",
    "test": "pnpm -r run test",
    "lint": "pnpm -r run lint",
    "format": "prettier --write .",
    "clean": "pnpm -r exec rm -rf node_modules dist"
  },
  "engines": {
    "node": ">=18",
    "pnpm": ">=9"
  }
}
```

### 5. 创建基础目录结构

创建子包目录：

```bash
mkdir -p packages/utils
mkdir -p packages/ui
mkdir -p packages/components
mkdir -p apps/web
```

### 6. 创建 .npmrc 文件（可选但推荐）

::: code-group
```bash [根目录创建 .npmrc]
touch .npmrc
```

```ini [.npmrc]
# 提升所有依赖到根 node_modules，解决某些包的幽灵依赖问题
shamefully-hoist=true

# 不严格检查 peer 依赖（pnpm v8+ 默认为 true，以下为兼容配置）
strict-peer-dependencies=false

# 将 Vue 等需要提升的包显式声明
public-hoist-pattern[]=*vue*
public-hoist-pattern[]=*eslint*
public-hoist-pattern[]=*prettier*
```
:::

### 7. 配置根 tsconfig.json（推荐）

在根目录创建 `tsconfig.json`，用于统一管理所有子包的 TypeScript 配置引用：

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "references": [
    { "path": "./packages/utils" },
    { "path": "./packages/ui" },
    { "path": "./packages/components" },
    { "path": "./apps/web" }
  ],
  "files": []
}
```

> **说明：** `references` 字段配合各子包的 `composite: true`，可实现按需编译和增量构建，大幅提升大型 monorepo 的 TypeScript 编译速度。

## 搭建公共工具库包 (packages/utils)

> **定位：** 纯 TypeScript 工具函数库，不依赖任何 UI 框架，可被 `ui`、`components`、`web` 等任意包引用。

### 8. 初始化 utils 包

进入 `utils` 目录并初始化：

::: code-group
```bash [进入 utils 目录]
cd packages/utils
```

```bash [初始化包]
pnpm init
```
:::

修改 `package.json`，`name` 需用 `@scope/name` 格式：

```json
{
  "name": "@monorepo/utils",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  }
}
```

### 9. 在 utils 包中添加 TypeScript 和源码

安装 TypeScript：

```bash
pnpm add -D typescript
```

创建 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

创建 `src` 目录和入口文件：

```bash
mkdir src
```

文件路径：`packages/utils/src/index.ts`

```typescript
/**
 * 两数相加
 */
export function add(a: number, b: number): number {
  return a + b
}

/**
 * 生成问候语
 */
export function greet(name: string): string {
  return `Hello, ${name}!`
}

/**
 * 拼接 CSS 类名（过滤假值）
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
```

## 搭建公共 UI 库包 (packages/ui)

> **定位：** 基础 UI 组件（按钮、输入框、图标等原子级组件），依赖 `@monorepo/utils`，被 `@monorepo/components` 和 `apps/web` 引用。遵循原子设计（Atomic Design）理念，`ui` 是原子/分子层，`components` 是有机物/模板层。

### 10. 初始化 ui 包

::: code-group

```bash [进入 ui 目录]
cd ../packages/ui
```

```bash [初始化包]
pnpm init
```

```json [修改 package.json]
{
  "name": "@monorepo/ui",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "sideEffects": false,
  "scripts": {
    "dev": "vite build --watch",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "peerDependencies": {
    "vue": "^3.4.0"
  },
  "dependencies": {
    "@monorepo/utils": "workspace:*"
  }
}
```
:::

> **关键配置说明：**
> - `peerDependencies` 中的 `vue`：避免最终应用中安装多份 Vue 实例。
> - `sideEffects: false`：告知打包工具该包可安全 tree-shaking。
> - `dependencies` 中引用 `@monorepo/utils`：UI 组件内可直接使用工具函数。

### 11. 安装 ui 包依赖

安装 Vue3（作为 peerDependency）和开发依赖：

```bash
pnpm add vue
pnpm add -D @vitejs/plugin-vue typescript vite vue-tsc
```

### 12. 配置 ui 包的 TypeScript 和 Vite

::: code-group
```json [创建 tsconfig.json]
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "preserve",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "outDir": "dist",
    "rootDir": "src",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": ["node_modules", "dist"]
}
```

```json [创建 tsconfig.node.json]
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "composite": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

```typescript [创建 vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MonorepoUi',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
```
:::

> **说明：** 由于 Vite 始终以 ESM 加载 `vite.config.ts`，`__dirname` 不可直接使用，需通过 `fileURLToPath(import.meta.url)` 推导。

### 13. 创建 UI 组件源码

创建 `src` 目录和文件：

```bash
mkdir src
mkdir src/components
```

创建 Vue 类型声明文件 `src/env.d.ts`：

```typescript
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

创建基础按钮组件 `src/components/BaseButton.vue`：

```vue
<script setup lang="ts">
import { cn } from '@monorepo/utils'

interface Props {
  /** 按钮变体 */
  variant?: 'primary' | 'secondary' | 'danger'
  /** 按钮尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 是否禁用 */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false
})

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()
</script>

<template>
  <button
    :class="cn('base-btn', `base-btn--${props.variant}`, `base-btn--${props.size}`)"
    :disabled="props.disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;
}

.base-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 尺寸 */
.base-btn--small  { padding: 4px 12px; font-size: 12px; }
.base-btn--medium { padding: 8px 20px; font-size: 14px; }
.base-btn--large  { padding: 12px 28px; font-size: 16px; }

/* 变体 */
.base-btn--primary   { background: #1677ff; color: #fff; }
.base-btn--primary:hover:not(:disabled) { background: #4096ff; }

.base-btn--secondary { background: #f5f5f5; color: #333; border-color: #d9d9d9; }
.base-btn--secondary:hover:not(:disabled) { background: #e8e8e8; }

.base-btn--danger    { background: #ff4d4f; color: #fff; }
.base-btn--danger:hover:not(:disabled) { background: #ff7875; }
</style>
```

创建入口文件 `src/index.ts`：

```typescript
export { default as BaseButton } from './components/BaseButton.vue'
```

## 搭建公共组件库包 (packages/components)

> **定位：** 业务组件（由 `ui` 包的原子组件组装而成的高层组件），依赖 `@monorepo/ui` 和 `@monorepo/utils`，供 `apps/web` 使用。

### 14. 初始化 components 包

::: code-group

```bash [进入 components 目录]
cd ../packages/components
```

```bash [初始化包]
pnpm init
```

```json [修改 package.json]
{
  "name": "@monorepo/components",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "sideEffects": false,
  "scripts": {
    "dev": "vite build --watch",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "peerDependencies": {
    "vue": "^3.4.0"
  },
  "dependencies": {
    "@monorepo/utils": "workspace:*",
    "@monorepo/ui": "workspace:*"
  }
}
```
:::

> **关键配置说明：**
> - `peerDependencies` 中的 `vue`：避免最终应用中安装多份 Vue 实例。
> - `sideEffects: false`：告知打包工具该包可安全 tree-shaking。
> - `dependencies` 中同时引用 `@monorepo/utils` 和 `@monorepo/ui`：业务组件可组合原子 UI 组件和工具函数。

### 15. 安装 components 包依赖

安装 Vue3（作为 peerDependency）和开发依赖：

```bash
pnpm add vue
pnpm add -D @vitejs/plugin-vue typescript vite vue-tsc
```

### 16. 配置 components 包的 TypeScript 和 Vite

::: code-group
```json [创建 tsconfig.json]
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "preserve",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "outDir": "dist",
    "rootDir": "src",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": ["node_modules", "dist"]
}
```

```json [创建 tsconfig.node.json]
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "composite": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

```typescript [创建 vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MonorepoComponents',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
```
:::

### 17. 创建组件源码

创建 `src` 目录和文件：

```bash
mkdir src
mkdir src/components
```

创建 Vue 类型声明文件 `src/env.d.ts`：

```typescript
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

创建业务组件 `src/components/HelloWorld.vue`——组合 `@monorepo/ui` 的原子按钮和 `@monorepo/utils` 的工具函数：

```vue
<script setup lang="ts">
import { greet } from '@monorepo/utils'
import { BaseButton } from '@monorepo/ui'

interface Props {
  msg?: string
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'World'
})

const message = greet(props.msg)

function handleClick() {
  alert(`当前消息：${message}`)
}
</script>

<template>
  <div class="hello-world">
    <h1>{{ message }}</h1>
    <BaseButton variant="primary" size="large" @click="handleClick">
      点我问候
    </BaseButton>
  </div>
</template>

<style scoped>
.hello-world {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}
</style>
```

创建入口文件 `src/index.ts`：

```typescript
export { default as HelloWorld } from './components/HelloWorld.vue'
```

## 搭建应用包 (apps/web)

### 18. 初始化 web 应用

回到根目录并进入 `web` 目录：

```bash
cd ../../apps/web
```

### 19. 使用 Vite 创建 Vue3 + TS 项目

::: code-group
```bash [Vite 创建 Vue3 + TS 项目]
pnpm create vite . --template vue-ts
```

```bash [安装依赖]
pnpm install
```
:::

### 20. 修改 web 应用的 package.json

```json
{
  "name": "@monorepo/web",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "@monorepo/utils": "workspace:*",
    "@monorepo/ui": "workspace:*",
    "@monorepo/components": "workspace:*"
  }
}
```

### 21. 修改 App.vue 使用公共组件

修改 `src/App.vue` 为：

```vue
<script setup lang="ts">
import { HelloWorld } from '@monorepo/components'
import { BaseButton } from '@monorepo/ui'
</script>

<template>
  <div id="app">
    <HelloWorld msg="Vue3 Monorepo" />
    <HelloWorld msg="TypeScript" />
    <HelloWorld msg="pnpm Workspace" />

    <footer style="margin-top: 24px;">
      <BaseButton variant="secondary" size="small">
        重置
      </BaseButton>
      <BaseButton variant="primary" size="small" style="margin-left: 8px;">
        确认
      </BaseButton>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

## 安装所有依赖并启动项目

### 22. 回到根目录并安装所有依赖

```bash
cd ../..
```

安装所有子包的依赖：

```bash
pnpm install
```

### 23. 启动开发服务器

启动 web 应用：

```bash
pnpm --filter @monorepo/web dev
```

或者启动所有包的 `dev` 脚本：

```bash
pnpm dev
```

## 配置 ESLint（可选）

### 24. 根目录安装 ESLint 配置

安装 ESLint 相关依赖：

```bash
pnpm add -D -w eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue vue-eslint-parser
```

创建 `.eslintrc.cjs`：

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
}
```

### 25. 在 package.json 中添加 lint 脚本

根 `package.json` 中已有 `lint` 脚本，子包也需要添加。

在 `packages/utils/package.json` 中添加：

```json
"lint": "eslint src --ext .ts --fix"
```

在 `packages/ui/package.json` 中添加：

```json
"lint": "eslint src --ext .ts,.vue --fix"
```

在 `packages/components/package.json` 中添加：

```json
"lint": "eslint src --ext .ts,.vue --fix"
```

在 `apps/web/package.json` 中添加：

```json
"lint": "eslint src --ext .ts,.vue --fix"
```

## 配置 Prettier（可选）

### 26. 安装 Prettier

::: code-group
```bash [安装 Prettier]
pnpm add -D -w prettier
```

```json [创建 .prettierrc]
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "none",
  "arrowParens": "avoid"
}
```

```plaintext [创建 .prettierignore]
node_modules
dist
pnpm-lock.yaml
```
:::

### 27. 添加 format 脚本

在根 `package.json` 的 `scripts` 中添加：

```json
"format": "prettier --write ."
```

## 配置 Git Hooks（可选）

### 28. 安装 husky 和 lint-staged

初始化 Git 仓库：

```bash
git init
```

安装 husky 和 lint-staged：

```bash
pnpm add -D -w husky lint-staged
```

初始化 husky：

```bash
npx husky init
```

> **注意：** husky v9 使用 `npx husky init` 进行初始化。如果你使用的是 husky v8，命令为 `npx husky install`。

创建 pre-commit hook 脚本，编辑 `.husky/pre-commit` 文件，写入以下内容：

```sh
npx lint-staged
```

在根 `package.json` 中添加 `lint-staged` 配置：

```json
"lint-staged": {
  "*.{ts,vue}": ["eslint --fix", "prettier --write"],
  "*.{css,md,json}": ["prettier --write"]
}
```

创建 `.gitignore`：

```plaintext
node_modules
dist
.vite
*.local
```

## 最终项目结构

```plaintext
vue3-monorepo/
├── .husky/
│   └── pre-commit
├── apps/
│   └── web/
│       ├── src/
│       │   ├── App.vue
│       │   └── main.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── packages/
│   ├── utils/                     # 纯 TS 工具函数
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── ui/                        # 基础 UI 组件（原子/分子层）
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   └── BaseButton.vue
│   │   │   ├── env.d.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.node.json
│   │   └── vite.config.ts
│   └── components/                # 业务组件（有机体/模板层）
│       ├── src/
│       │   ├── components/
│       │   │   └── HelloWorld.vue
│       │   ├── env.d.ts
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       └── vite.config.ts
├── .eslintrc.cjs
├── .gitignore
├── .npmrc
├── .prettierrc
├── .prettierignore
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── tsconfig.json
```

### 模块依赖关系图

```plaintext
┌─────────────────────────────────────────┐
│              apps/web                    │
│     (应用层，消费所有公共包)              │
└──────┬──────────┬───────────┬───────────┘
       │          │           │
       ▼          ▼           ▼
┌──────────┐ ┌──────────┐ ┌──────────────┐
│ @monorepo│ │ @monorepo│ │ @monorepo    │
│ /utils   │ │ /ui      │ │ /components  │
│ (工具层)  │ │ (原子层)  │ │ (业务组件层)  │
└──────────┘ └────┬─────┘ └──────┬───────┘
                  │              │
                  │   依赖       │   依赖
                  ▼              ▼
            ┌──────────┐  ┌──────────┐
            │ @monorepo│  │ @monorepo│
            │ /utils   │  │ /ui      │
            └──────────┘  └──────────┘
```

## 使用说明

### 依赖管理

```bash
# 根目录安装所有依赖
pnpm install

# 为指定包添加依赖
pnpm --filter @monorepo/web add axios

# 为根项目添加开发依赖
pnpm add -D -w <package-name>

# 为 ui 包添加依赖
pnpm --filter @monorepo/ui add <package-name>

# 清理所有 node_modules 和构建产物
pnpm clean
```

### 开发

```bash
# 启动所有可运行项目的 dev 脚本
pnpm dev

# 单独启动 web 应用
pnpm --filter @monorepo/web dev

# 以监听模式构建 utils 包
pnpm --filter @monorepo/utils dev

# 以监听模式构建 ui 包
pnpm --filter @monorepo/ui dev

# 以监听模式构建 components 包
pnpm --filter @monorepo/components dev
```

### 构建与部署

```bash
# 构建所有项目
pnpm build

# 单独构建 ui 库
pnpm --filter @monorepo/ui build

# 单独构建 components 库
pnpm --filter @monorepo/components build

# 预览 web 应用构建结果
pnpm --filter @monorepo/web preview
```

### 代码质量

```bash
# 代码检查（所有子包）
pnpm lint

# 代码格式化
pnpm format

# 运行所有测试
pnpm test
```

## 常见问题排查

### 1. `workspace:*` 依赖找不到

**现象：** `pnpm install` 后报错 `ERR_PNPM_NO_MATCHING_VERSION`。

**解决：** 确认 `pnpm-workspace.yaml` 中已声明对应的目录，且被引用包的 `package.json` 中 `name` 与引用处一致。

### 2. 组件导入后页面白屏无报错

**现象：** web 应用中 `import { HelloWorld } from '@monorepo/components'` 后组件不渲染。

**解决：** 检查被引用包的 `peerDependencies` 中是否声明了 `vue`，且 web 应用的 `vue` 版本与 `peerDependencies` 要求的版本范围匹配。

### 3. `__dirname is not defined`

**现象：** Vite 启动时控制台报错 `ReferenceError: __dirname is not defined`。

**解决：** 在 `vite.config.ts` 中使用 `fileURLToPath(import.meta.url)` 推导 `__dirname`（参见上文步骤 12 / 16 示例）。Vite 始终以 ESM 加载配置文件，CommonJS 的 `__dirname` 不可用。

### 4. `vue-tsc` 类型检查报错

**现象：** `vue-tsc` 构建时报大量类型错误。

**解决：**

- 确认各包的 `tsconfig.json` 中 `include` 和 `exclude` 路径正确。
- 如果使用了 `@/*` 路径别名，确保 `tsconfig.json` 的 `paths` 和 `vite.config.ts` 的 `alias` 配置一致。
- 在 CI 环境中可设置 `"skipLibCheck": true` 跳过第三方库的类型检查。

### 5. 修改公共包源码后应用未热更新

**现象：** 修改 `@monorepo/ui` 或 `@monorepo/utils` 后 web 应用不自动刷新。

**解决：** pnpm workspace 下，Vite 的 HMR 默认只监听当前项目的文件。开发时可同时在对应包中启动 watch 模式：

```bash
pnpm --filter @monorepo/ui dev
pnpm --filter @monorepo/utils dev
```

或在 web 应用的 `vite.config.ts` 中配置 `server.watch`：

```typescript
server: {
  watch: {
    ignored: ['!**/packages/**']
  }
}
```

### 6. pnpm 版本过低导致安装失败

**现象：** 运行 `pnpm install` 时报语法错误或不支持的配置项。

**解决：** 升级 pnpm 到最新稳定版：

```bash
npm install -g pnpm@latest
```
