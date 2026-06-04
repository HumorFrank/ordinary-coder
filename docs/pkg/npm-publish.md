# npm 发包方式总结

## A方式: Granular Token（绕过2FA，推荐）

### 1. 创建令牌

访问 [npm Token 页面](https://www.npmjs.com/settings/<user>/tokens)，点击 **Generate New Token** → **Granular Access Token**。

### 2. 配置令牌

- 在权限设置中为你的包开启 **Read and write**。
- **关键**：在 Two-factor authentication 部分勾选 **Bypass two-factor authentication for automation**。

### 3. 配置认证

1️⃣ 全局设置：直接配置到 npm 全局设置（推荐，一劳永逸）

```bash
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
```

2️⃣ 项目本地方式：仅对当前项目生效，可在项目根目录创建 `.npmrc`，写入

```bash
//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE
```

## B方式: Classic Token（需手动 OTP）

### 1. 创建令牌

[npm Token 页面](https://www.npmjs.com/settings/<user>/tokens) → **Generate New Token** → **Classic Token**，选择 **Read and write**。

### 2. 发布时提供 OTP

```bash
npm publish --otp=123456
# 或直接 npm publish，终端会提示输入 OTP
```

## C方式：npm login

### 1. 登录

```bash
npm login
```

按提示输入用户名、密码（或 Access Token）、邮箱。

### 2. 发布

若账号开启了 2FA，系统会提示输入 6 位动态验证码：

```bash
npm publish
# 或带 OTP 一步到位
npm publish --otp=123456
```

## D方式：CI/CD自动化

适用于 GitHub Actions、GitLab CI 等场景，本质是方式一的 Token 在 CI 环境中的运用。

### GitHub Actions 示例

1. 在仓库 Settings → Secrets 中添加 `NPM_TOKEN`
2. Workflow 中使用：

```yaml
- name: Publish to npm
  run: |
    echo "//registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}" > .npmrc
    npm publish
```

## 对比总结

| 方式                      | 需 OTP    | 支持自动化 | 适用场景          |
| ------------------------- | --------- | ---------- | ----------------- |
| Granular Token（绕过2FA） | ❌        | ✅         | CI/CD、自动化脚本 |
| Classic Token             | ✅        | ❌         | 临时手动发布      |
| npm login 交互式          | ✅        | ❌         | 本地手动发布      |
| CI/CD 专用 Token          | ❌ 不需要 | ✅ 支持    | 生产环境 CI/CD    |

> ⚠️ 免 2FA 的 Token 权限较高，请妥善保管，**切勿**提交到公开仓库。
