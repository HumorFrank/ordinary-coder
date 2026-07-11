# WebSocket

## 介绍

`WebSocket` 是基于 `TCP` 的一种新的`应用层网络协议`。它提供了一个`全双工`的通道，允许服务器和客户端之间`实时双向通信`。

`WebSocket` 对象提供了用于`创建和管理与服务器`的 `WebSocket` 连接，以及可以通过该连接`发送和接收数据`的 API。

## 与 HTTP 协议的区别

✅ 与 HTTP 协议相比，WebSocket 具有以下优点

- **更高的实时性能**
  > WebSocket 允许服务器和客户端之间实时双向通信，从而提高了实时通信场景中的性能。
- **更少的网络开销**
  > HTTP 请求和响应之间需要额外的数据传输，而 WebSocket 通过在同一个连接上双向通信，减少了网络开销。
- **更灵活的通信方式**
  > HTTP 请求和响应通常是一一对应的，而 WebSocket 允许服务器和客户端之间以多种方式进行通信，例如消息 Push、事件推送等。
- **更简洁的 API**
  > WebSocket 提供了简洁的 API，使得客户端开发人员可以更轻松地进行实时通信。

❌ 与 HTTP 协议相比，WebSocket 有以下缺点
- **不支持无连接**
  > WebSocket 是一种持久化的协议，这意味着连接不会在一次请求之后立即断开。
- **不兼容旧浏览器**
  > WebSocket 是 HTML5 中的一种标准协议，虽然现代浏览器都支持，但是一些旧的浏览器可能不支持 WebSocket。
- **复杂的心跳保活与断线重连**
  > 因为连接是**长连接**，任何网络波动（如 WiFi 切换/手机信号不稳定）都会导致连接突然断开。
  > 开发者必须在应用层自己实现**心跳机制**（Ping/Pong）来探测连接是否存活，
  > 并编写复杂的**断线重连逻辑**（通常配合指数退避算法，防止瞬间重连压垮服务器）。

## WebSocket 属性和方法
- **WebSocket 对象**：WebSocket 对象表示一个新的 WebSocket 连接。

- **WebSocket.onopen 事件处理程序**：当 WebSocket 连接打开时触发。

- **WebSocket.onmessage 事件处理程序**：当接收到来自 WebSocket 的消息时触发。

- **WebSocket.onclose 事件处理程序**：当 WebSocket 连接关闭时触发。

- **WebSocket.send 方法**：向 WebSocket 发送数据。

- **WebSocket.close 方法**：关闭 WebSocket 连接。

## 创建和连接 WebSocket
```js
// 1.创建 WebSocket 对象
let socket = new WebSocket('ws://example.com'); 
// 2.连接 WebSocket
socket.onopen = function() {
 console.log('WebSocket connected');
};
// 3.接收来自 WebSocket 的消息
socket.onmessage = function(event) {
 console.log('Received message:', event.data);
};
// 4.向 WebSocket 发送消息
socket.send('Hello, WebSocket!');
// 5.关闭 WebSocket
socket.close();
```

::: tip 

在 WebSocket 连接成功打开和关闭时，会分别触发 `WebSocket.onopen` 和 `WebSocket.onclose` 事件。
在接收到来自 WebSocket 的消息时，会触发 `WebSocket.onmessage` 事件。
当 WebSocket 发生错误时，会触发 `WebSocket.onerror` 事件。

:::

## webSocket应用场景
- **实时通信**
  > WebSocket 可以用于实时通信场景，例如聊天应用、游戏、股票交易、实时数据传输等。
- **监控数据传输（实时仪表盘、大屏看板）**
  > WebSocket 可以在监控系统中实现实时数据传输，例如通过 WebSocket，客户端可以实时接收和处理监控数据，而无需等待轮询数据。
- **自动化控制（远程控制设备）**
  > WebSocket 可以用于远程控制设备，例如智能灯、智能插座、智能开关等。
- **事件推送**
  > WebSocket 可以用于向客户端推送事件，例如服务器端的实时更新、通知等。
- **长连接**
  > WebSocket 是一种长连接协议，这意味着连接不会在一次请求之后立即断开。
  > 这使得 WebSocket 适用于需要保持连接的场景，例如聊天应用、游戏等。