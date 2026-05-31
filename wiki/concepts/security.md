# 前端安全

> 安全不是特性，是基础。从第一天就考虑安全，不是最后一天。

---

## 1. XSS (跨站脚本攻击)

### 1.1 攻击类型
```javascript
// 存储型 XSS - 恶意脚本存储在服务器
// 用户评论: <script>stealCookies()</script>

// 反射型 XSS - 恶意脚本通过 URL 参数传递
// https://example.com/search?q=<script>steal()</script>

// DOM 型 XSS - 恶意脚本通过 DOM 操作执行
document.getElementById('output').innerHTML = location.hash.slice(1);
```

### 1.2 防御
```jsx
// ✅ React 自动转义
<div>{userInput}</div>

// ❌ 危险
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ 使用 DOMPurify
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />

// ✅ Content Security Policy
// <meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```

---

## 2. CSRF (跨站请求伪造)

### 2.1 攻击原理
```
用户登录 A 网站 → 访问恶意网站 B → B 向 A 发送请求 → A 执行请求
```

### 2.2 防御
```javascript
// 1. CSRF Token
<input type="hidden" name="csrf_token" value="random-token">

// 2. SameSite Cookie
Set-Cookie: session=abc123; SameSite=Strict; Secure; HttpOnly

// 3. 验证 Origin/Referer
if (req.headers.origin !== 'https://example.com') {
  return res.status(403).send('Forbidden');
}
```

---

## 3. 点击劫持

### 3.1 攻击原理
```
恶意网站将目标网站嵌入 iframe → 用户点击看似无害的按钮 → 实际点击目标网站
```

### 3.2 防御
```javascript
// X-Frame-Options
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// Content Security Policy
// frame-ancestors 'none'

// 前端检测
if (window.top !== window.self) {
  window.top.location = window.self.location;
}
```

---

## 4. 安全头部

### 4.1 必需头部
```javascript
// Express 中间件
app.use((req, res, next) => {
  // 防止 MIME 类型嗅探
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // 防止点击劫持
  res.setHeader('X-Frame-Options', 'DENY');
  
  // XSS 保护
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // HTTPS 强制
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // 引用策略
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // 权限策略
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  next();
});
```

### 4.2 CSP (Content Security Policy)
```javascript
// 严格 CSP
const csp = [
  "default-src 'self'",
  "script-src 'self' https://trusted.cdn.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "connect-src 'self' https://api.example.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join('; ');

res.setHeader('Content-Security-Policy', csp);
```

---

## 5. 数据安全

### 5.1 敏感数据处理
```javascript
// ❌ 不要在前端存储敏感数据
localStorage.setItem('token', secretToken);
localStorage.setItem('password', password);

// ✅ 使用 HttpOnly Cookie
res.cookie('session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000
});

// ✅ 不在 URL 中传递敏感数据
// ❌ /api/user?token=secret
// ✅ Authorization: Bearer secret
```

### 5.2 输入验证
```javascript
// 前端验证 (用户体验)
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 后端验证 (安全) - 必须
// 永远不要信任前端验证
```

---

## 6. 依赖安全

### 6.1 审计依赖
```bash
# npm
npm audit
npm audit fix

# pnpm
pnpm audit

# 自动化检查
npm install -g npm-check-updates
ncu -u
```

### 6.2 SCA 工具
| 工具 | 用途 |
|---|---|
| Snyk | 依赖漏洞扫描 |
| Dependabot | 自动更新依赖 |
| Renovate | 依赖更新 PR |
| Socket | 供应链安全 |

---

## 7. 安全最佳实践

### 7.1 DO
- 使用 HTTPS
- 验证所有输入
- 转义所有输出
- 使用安全头部
- 定期更新依赖
- 使用 HttpOnly Cookie
- 实施 CSP

### 7.2 DON'T
- 不要信任前端验证
- 不要在 URL 中传递敏感数据
- 不要使用 eval()
- 不要使用 innerHTML (除非清理过)
- 不要暴露错误详情给用户
- 不要硬编码密钥

---

## 8. 相关概念

- [前端工程化](frontend-engineering.md)
- [代码质量](../tools/code-quality.md)
- [测试策略](testing-strategies.md)
