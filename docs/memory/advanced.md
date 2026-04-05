# 高级进阶

## 软件架构设计模式

> [MVC，MVP 和 MVVM 的图示 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

### 发展进程

```mermaid
---
config:
  theme: 'base'
  themeVariables:
    primaryColor: '#420b2f'
    primaryTextColor: '#226b68'
    primaryBorderColor: '#7C0000'
    secondaryColor: '#006100'
    tertiaryColor: '#F0F0F0'
    fontSize: '26px'
    fontFamily: 'Arial'
---
timeline
    title MVC → MVP → MVVM 完整演进

    1970s : MVC 诞生
          : 分离数据与界面
          : ❌ View 与 Model 耦合，测试困难

    1990s : MVP 出现
          : View 完全被动
          : 便于单元测试
          : ❌ Presenter 需手动更新 View，代码冗余

    2005 : MVVM 诞生
          : Microsoft WPF
          : 数据绑定核心
          : John Gossman

    2010s : MVVM 流行
          : 前端框架时代
          : 响应式编程
          : ✅ 数据绑定自动化
          : Vue / Angular / React
```

### MVC

1️⃣ 架构图详细版（带步骤编号）
```mermaid
flowchart LR
    subgraph MVC [MVC 架构交互—>所有通信都是单向的]
        direction LR
        V[View<br/>视图层]
        C[Controller<br/>控制层]
        M[Model<br/>模型层]
        
        V -- "① 用户操作触发<br/>View传送指令到Controller" --> C
        C -- "② Controller处理业务逻辑<br/>要求Model改变状态" --> M
        M -- "③ Model状态变更<br/>将新数据发送到View" --> V
    end

    style V fill:#BB2528,stroke:#7C0000,color:#fff
    style C fill:#006100,stroke:#004000,color:#fff
    style M fill:#F8B229,stroke:#B87D00,color:#000
```
2️⃣ 架构图（带用户角色的完整流程图）

```mermaid
flowchart TB
    subgraph MVC [MVC 架构—>所有通信都是单向的]
        V[View<br/>用户界面]
        C[Controller<br/>控制器]
        M[Model<br/>数据/业务逻辑]
        
        User((用户)) -->|① 点击/输入| V
        V -->|② 触发事件| C
        C -->|③ 更新数据| M
        M -->|④ 状态变更通知| V
    end
    
    style V fill:#BB2528,stroke:#7C0000,color:#fff
    style C fill:#006100,stroke:#004000,color:#fff
    style M fill:#F8B229,stroke:#B87D00,color:#000
```

3️⃣ 带时序的完整 MVC 交互图
```mermaid
sequenceDiagram
    participant V as View<br/>视图
    participant C as Controller<br/>控制器
    participant M as Model<br/>模型

    V->>C: ① View传送指令到Controller
    activate C
    C->>M: ② Controller完成业务逻辑后<br/>要求Model改变状态
    activate M
    M-->>V: ③ Model将新的数据发送到View<br/>用户得到反馈
    deactivate M
    deactivate C

    Note over V,M: MVC 完整交互流程
```

4️⃣ 核心组成
- MVC（Model-View-Controller）
  > - `Model`：数据、业务逻辑、状态管理
  > - `View`：UI 展示，接收用户输入
  > - `Controller`：接收用户请求，调用 Model，更新 View

### MVP

1️⃣ 架构图详细版（带步骤编号）

```mermaid
flowchart TB
    subgraph MVP [MVP 架构-> 所有通信都是双向的]
        V2[View被动视图<br/>只负责展示]
        P[Presenter主持者<br/>协调Model与View]
        M2[Model<br/>数据/业务逻辑]
        
        User2((用户)) -->|① 点击/输入| V2
        V2 -->|② 委托事件| P
        P -->|③ 获取/更新数据| M2
        M2 -->|④ 返回数据| P
        P -->|⑤ 更新UI| V2
    end
    
    style V2 fill:#BB2528,stroke:#7C0000,color:#fff
    style P fill:#006100,stroke:#004000,color:#fff
    style M2 fill:#F8B229,stroke:#B87D00,color:#000
```

2️⃣ 架构图（带用户角色的完整流程图）

```mermaid
flowchart LR
    User((用户))
    
    subgraph MVP [MVP 架构-> 所有通信都是双向的]
        direction LR
        V[View<br/>视图<br/>被动视图]
        P[Presenter<br/>主持者<br/>业务逻辑层]
        M[Model<br/>模型<br/>数据层]
        
        V <-->|双向通信<br/>View ↔ Presenter| P
        P <-->|双向通信<br/>Presenter ↔ Model| M
    end

    User -->|① 用户操作| V
    V -->|② 转发事件| P
    P -->|③ 获取/更新数据| M
    M -->|④ 返回数据| P
    P -->|⑤ 更新UI| V
    V -->|⑥ 显示反馈| User

    style V fill:#BB2528,stroke:#7C0000,color:#fff
    style P fill:#006100,stroke:#004000,color:#fff
    style M fill:#F8B229,stroke:#B87D00,color:#000
    style User fill:#95A5A6,stroke:#7F8C8D,color:#fff
```

3️⃣ 时序图版本（更清晰展示双向通信）
```mermaid
sequenceDiagram
    participant User as 用户
    participant V as View<br/>被动视图
    participant P as Presenter<br/>主持者
    participant M as Model<br/>模型

    User->>V: ① 用户操作
    activate V
    V->>P: ② 转发事件
    activate P
    P->>M: ③ 获取/更新数据
    activate M
    M-->>P: ④ 返回数据
    deactivate M
    P-->>V: ⑤ 更新UI
    deactivate P
    V-->>User: ⑥ 显示反馈
    deactivate V

    Note over V,P: 双向通信
    Note over P,M: 双向通信
    Note over V,M: View与Model不发生联系
```

4️⃣ 核心组成
- MVP（Model-View-Presenter）
  > - `Model`：数据、业务逻辑
  > - `View`：UI 展示，`被动`接收 Presenter 指令，不主动处理逻辑
  > - `Presenter`：中间协调者，从 View 接收用户动作，调用 Model，更新 View

### MVVM
1️⃣ 架构图详细版（带步骤编号）

```mermaid
flowchart TB
    subgraph MVVM [MVVM 架构]
        V3[View视图<br/>声明式UI]
        VM[ViewModel视图模型<br/>暴露数据/命令]
        M3[Model<br/>数据/业务逻辑]
        
        V3 <-->|② 双向数据绑定| VM
        VM -->|③ 调用| M3
        M3 -->|④ 返回数据| VM
    end
    
    style V3 fill:#BB2528,stroke:#7C0000,color:#fff
    style VM fill:#006100,stroke:#004000,color:#fff
    style M3 fill:#F8B229,stroke:#B87D00,color:#000
```

2️⃣ 架构图（带用户角色的完整流程图）
```mermaid
flowchart LR
    User((用户))
    
    subgraph MVVM [MVVM 架构]
        direction LR
        V[View<br/>视图<br/>声明式UI]
        VM[ViewModel<br/>视图模型<br/>暴露数据/命令]
        M[Model<br/>模型<br/>数据层]
        
        V <-->|双向绑定 data-binding<br/>自动同步| VM
        VM <-->|双向通信<br/>获取/更新数据| M
    end

    User -->|① 用户交互<br/>点击/输入| V
    V -->|② 自动触发<br/>数据绑定| VM
    VM -->|③ 调用业务逻辑| M
    M -->|④ 返回数据| VM
    VM -->|⑤ 自动更新<br/>数据绑定| V
    V -->|⑥ 显示反馈| User

    style V fill:#BB2528,stroke:#7C0000,color:#fff
    style VM fill:#006100,stroke:#004000,color:#fff
    style M fill:#F8B229,stroke:#B87D00,color:#000
    style User fill:#95A5A6,stroke:#7F8C8D,color:#fff
```

3️⃣ 时序图版本（更清晰展示双向通信）
```mermaid
sequenceDiagram
    participant User as 用户
    participant V as View<br/>视图
    participant VM as ViewModel<br/>视图模型
    participant M as Model<br/>模型

    User->>V: ① 用户交互（点击/输入）
    activate V
    V->>VM: ② 双向绑定自动同步
    activate VM
    VM->>M: ③ 调用业务逻辑/获取数据
    activate M
    M-->>VM: ④ 返回数据
    deactivate M
    VM-->>V: ⑤ 双向绑定自动更新UI
    deactivate VM
    V-->>User: ⑥ 显示反馈
    deactivate V

    Note over V,VM: 双向绑定 data-binding
    Note over VM,M: 双向通信
    Note right of VM: View的变动自动反映在ViewModel<br/>ViewModel的变动自动反映在View
```

4️⃣ 核心组成
- MVVM（Model-View-ViewModel）
  > - `Model`：数据、业务逻辑
  > - `View`：UI 展示，`声明式`绑定 ViewModel 的属性
  > - `ViewModel`：暴露数据和命令，负责协调 Model 和 View，通过`数据绑定`自动同步 View

### 对比总结

1️⃣ 总结对比表

| 模式 | 职责划分                                 | 测试性 | 复杂度 | 典型场景          |
| ---- | ---------------------------------------- | ------ | ------ | ----------------- |
| MVC  | View 接收输入，Controller 响应           | 中     | 中     | 传统 Web 框架     |
| MVP  | View 完全被动，Presenter 全权负责        | 高     | 较高   | Android、桌面应用 |
| MVVM | 数据绑定自动同步，ViewModel 无 View 引用 | 高     | 中高   | 现代前端框架、WPF |

2️⃣ 核心区别总结图
```mermaid
flowchart TD
    subgraph 核心区别
        direction LR
        
        subgraph MVC核心
            direction TB
            A1[View 可直读 Model]
            A2[Controller 较薄]
            A3[双向依赖存在]
        end
        
        subgraph MVP核心
            direction TB
            B1[View 完全被动]
            B2[Presenter 厚重]
            B3[View 与 Model 隔离]
        end
        
        subgraph MVVM核心
            direction TB
            C1[数据绑定自动同步]
            C2[ViewModel 无 View 引用]
            C3[声明式 UI]
        end
    end
    
    style MVC核心 fill:#BB2528,stroke:#7C0000,color:#fff
    style MVP核心 fill:#006100,stroke:#004000,color:#fff
    style MVVM核心 fill:#F8B229,stroke:#B87D00,color:#000
```