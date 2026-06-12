# Nginx

## Nginx 介绍

Nginx（发音为“engine-x”）是一款开源`反向代理服务器`，支持 `HTTP/HTTPS/SMTP/POP3/IMAP` 协议，同时还具备`负载均衡/HTTP 缓存/Web 服务器`（源服务器）的功能。Nginx 项目最初就非常注重高并发、高性能和低内存占用。它采用类似 BSD 的 2 条款许可证，可在 Linux/BSD 衍生版本/Mac OS X/Solaris/AIX/HP-UX/其他 \*nix 系统上运行。

## 初学者指南

### 默认配置文件目录

配置文件名为 `nginx.conf`

- 或 `/usr/local/nginx/conf`
- 或 `/etc/nginx`
- 或 `/usr/local/etc/nginx`

⚠ Nginx 安装后的配置文件目录

| 文件描述                   | 路径                     |
| -------------------------- | ------------------------ |
| 配置文件路径               | `/etc/nginx/nginx.conf ` |
| 命令存放路径               | `/etc/sysconfig/nginx`   |
| 默认访问的 `html` 页面存放路径 | `/usr/share/nginx/`      |
| pid文件存储路径            | `/var/run/nginx.pid`     |

### 配置文件的结构

nginx 由模块组成，这些模块由配置文件中指定的指令控制。
指令分为简单指令和块指令。

- 简单指令由`名称`和`参数`组成，参数之间用空格分隔，并以分号 (`;`) 结尾。
- 块指令的结构与简单指令相同，但它结尾不是分号，而是一组用大括号 (`{`和`}`) 括起来的附加指令。

### 配置生成器

- [Nginx配置生成器](https://www.bchrt.com/tools/nginx-config-generator/)
- [AnyTools Nginx配置生成器](https://www.anytools.work/zh-CN/system-tools/nginx-config-generator/)
- [Nginx 可视化配置生成器](https://geemodel.com/nginx-config-builder)
- [RayByte Nginx 配置生成器](https://raybyte.cn/tools/nginxconfig/)

### 语法

```sh
nginx -s options
```

options 参数

- `stop` — 快速关机（停止）
- `quit` — 优雅关机（退出）
- `reload` — 重新加载配置文件（重新加载）
- `reopen` — 重新打开日志文件（重新打开）

### 常用命令

```sh [获取所有运行中的 nginx 进程列表]
ps -ax | grep nginx
```

### 负载均衡

1️⃣ Nginx常用的负载均衡策略分为4种

- **轮询（默认）**
  > 即每台服务器轮流处理请求，适合在服务器性能一致情况下使用。
- **权重**
  > 该模式适合在服务器性能不一致情况下使用，通过设置不同的权重去处理不同数量的请求。
- **ip + hash**
  > 每次按访问的ip的hash值分配服务器，用户会固定的访问到一台服务器，可以解决session丢失问题。
- **最少连接**
  > 该模式会访问当前连接最少的服务器，往往连接最少的很可能是性能最差劲的服务器，所以分配过去可能会压力过大，不是很推荐使用。
