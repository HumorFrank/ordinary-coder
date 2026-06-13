# Rust

## 介绍
**Rust 程序设计语言** — Rust 是一门具有高性能、可靠性和生产力的程序设计语言，适用于各种领域的应用开发。

## 🌲 Rust 生态全景

Rust 的生态可分为 `语言本身 + 周边库 + 工具链 + 应用生态` 四层架构，层层递进，构成完整闭环。

## 🧩 语言特性

> 语言特性：`安全 + 性能 + 并发`，三位一体

::: info 💡 Rust = C++ 的性能 + Python 的安全感 + Go 的并发体验
:::

## ⚙️ 工具链生态

| 工具               | 功能                        | 类比（前端/其他语言）       |
| ------------------ | --------------------------- | --------------------------- |
| `cargo`            | 包管理 + 构建 + 测试 + 文档 | npm + webpack + jest 三合一 |
| `rustup`           | 工具链管理器                | nvm / pyenv                 |
| `clippy`           | 代码检查                    | ESLint + Prettier           |
| `rustfmt`          | 代码格式化                  | Prettier                    |
| `cargo test/bench` | 单元测试 + 性能基准         | pytest + benchmark.js       |
| `rust-analyzer`    | 智能代码分析                | TypeScript Language Server  |

::: tip 所有工具统一由 `cargo` 调度，无需配置繁琐的 `package.json` + `.eslintrc` + `webpack.config.js`
:::

## 📚 主流框架与库生态

### 后端

| 框架        | 特点                           | 适用场景   |
| ----------- | ------------------------------ | ---------- |
| `Axum`      | 类型安全、中间件灵活、官方推荐 | 新项目首选 |
| `Actix-web` | 高性能、成熟稳定、文档丰富     | 高并发服务 |
| `Warp`      | 函数式组合、轻量灵活           | 快速原型   |

### 数据库 & ORM

| 库       | 特点                     | 类比             |
| -------- | ------------------------ | ---------------- |
| `SQLx`   | 编译时检查 SQL、支持异步 | TypeORM + Prisma |
| `SeaORM` | 动态查询、迁移工具完善   | Django ORM       |
| `Diesel` | 类型安全、编译时校验     | SQLAlchemy       |

### 异步运行时

| 库          | 说明                                |
| ----------- | ----------------------------------- |
| `tokio`     | Rust的"Node.js runtime"，生态最成熟 |
| `async-std` | 标准库风格，学习成本低              |

### 网络 & 协议

| 库        | 用途                   |
| --------- | ---------------------- |
| `reqwest` | 简洁的 HTTP 客户端     |
| `hyper`   | 底层 HTTP 实现，高性能 |
| `tonic`   | gRPC 框架，微服务首选  |

### 前端 & WASM

> `WebAssembly`（WASM）是一种为网络应用提供高性能的新技术，而 Rust 语言以其出色的性能和安全性，成为开发 WASM 应用的理想选择。

| 框架     | 特点                              |
| -------- | --------------------------------- |
| `Yew`    | React 风格，组件化，适合复杂应用  |
| `Leptos` | 响应式 + 细粒度更新，性能极致     |
| `Dioxus` | 跨平台（桌面+移动+Web），语法简洁 |

### 系统 & 嵌入式

| 库             | 用途                         |
| -------------- | ---------------------------- |
| `no_std`       | 无标准库模式，嵌入式开发必备 |
| `embedded-hal` | 硬件抽象层，驱动开发友好     |
| `nix`          | Unix 系统调用封装            |

### 数据 & AI

| 库        | 说明                                |
| --------- | ----------------------------------- |
| `polars`  | 高性能 DataFrame，Pandas 的 Rust 版 |
| `ndarray` | 多维数组，科学计算基础              |
| `tch-rs`  | PyTorch Rust 绑定                   |

### 区块链

| 框架                 | 生态                   |
| -------------------- | ---------------------- |
| `Substrate` Polkadot | 底层，模块化区块链框架 |
| `Solana SDK`         | 高性能链开发工具       |

## 学习路线

### 阶段1: 入门基础

📘 目标：掌握语法 + 理解所有权机制

✅ 学习重点

- 所有权 (Ownership) / 借用 (Borrow) / 生命周期 (Lifetime)
- 模式匹配 (match) / 枚举 (enum)
- Trait / 泛型 / 错误处理 (Result/Option)
- 模块系统 (mod / crate / use)

### 阶段2: 进阶与生态

📘 目标：理解异步、项目组织、测试

✅ 学习重点

- 异步编程：`async/await + tokio`
- 序列化：`serde + serde_json`
- HTTP 请求：`reqwest`
- 测试：`cargo test + mockall`
- 项目架构：`lib.rs vs main.rs`，模块化设计

### 阶段3: Web全栈/WASM

📘 目标：构建完整的 Web 服务或前端应用

1️⃣ 后端方向技术栈组合

- 框架：`Axum / Actix-web`
- 数据库：`SQLx + PostgreSQL / MySQL`
- 异步：`tokio`
- 部署：`Docker + GitHub Actions`

2️⃣ 前端方向（WASM）技术栈组合

- 框架：`Leptos / Yew / Dioxus`
- 状态管理：`use_signal (Leptos) / use_reducer (Yew)`
- 与 JS 交互：`wasm-bindgen`
- 打包：`trunk / wasm-pack`

### 阶段4: 系统与底层

📘 目标：操作系统、嵌入式、区块链、编译器

✅ 学习方向

- OS 开发：用 Rust 编写操作系统
- 驱动开发：`no_std` + `embedded-hal`
- 区块链：Substrate 框架 + 智能合约
- 编译器：`cranelift`/`rustc` 源码阅读

## 应用领域 & 就业前景

📚 Rust 主流应用场景

| 领域        | 典型应用                 | 代表公司                        |
| ----------- | ------------------------ | ------------------------------- |
| 系统软件    | 操作系统、编译器、浏览器 | Linux、Mozilla、Microsoft       |
| Web 后端    | 高并发 API、微服务       | Cloudflare、AWS、腾讯云         |
| 区块链      | 智能合约、节点、共识     | Polkadot、Solana、NEAR          |
| 嵌入式/IoT  | MCU、传感器、边缘计算    | 乐鑫、Nordic、Bosch             |
| 数据/AI     | 分析引擎、ETL、推理      | Polars、DuckDB、TensorFlow Rust |
| 前端/WASM   | Web 加速、插件、编辑器   | Figma、Adobe、Tauri 生态        |
| 安全/DevOps | CLI 工具、代理、监控     | ripgrep、bat、TiKV              |

💰 薪资参考（2025，国内）

| 级别     | 薪资范围/月 | 典型要求                   |
| -------- | ----------- | -------------------------- |
| 初级     | ¥12k–20k    | 熟悉语法 + 能写小工具      |
| 中级     | ¥20k–35k    | 掌握异步 + 有项目经验      |
| 高级     | ¥35k–60k+   | 精通系统编程/生态贡献      |
| 海外远程 | $4k–9k      | 英语 + 开源经历 + 全栈能力 |

> 💡 趋势：`前端 + Rust`、`Go + Rust`、`Python + Rust` 复合型人才最抢手

## 📚 学习资源

| 类型     | 名称                                                                    | 说明                   |
| -------- | ----------------------------------------------------------------------- | ---------------------- |
| 官方文档 | [The Rust Book Rust](https://doc.rust-lang.org/book/)                   | 圣经，必读             |
| 中文书籍 | 《Rust 权威指南》、《Rust 实战》                                        | 适合系统学习           |
| 视频教程 | "Let's Get Rusty"（YouTube）                                            | 英文入门，节奏友好     |
| 交互练习 | [Rustlings](https://github.com/rust-lang/rustlings)                     | 边学边练，反馈即时     |
| 中文社区 | [Rust China](https://rustcc.cn/)                                        | 提问 + 找工作 + 接外包 |
| 实战项目 | [Tauri Examples](https://github.com/tauri-apps/tauri/tree/dev/examples) | 官方示例，直接 clone   |

## 参考资料
- [2026 年，为什么我劝你学 Rust](https://segmentfault.com/a/1190000047735055#item-2-5)
- [](https://rust-lang.org/zh-CN/)