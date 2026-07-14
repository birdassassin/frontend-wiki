# 前端安全

> 安全不是特性，是基础。从第一天就考虑安全，不是最后一天。

---

## 1. XSS (跨站脚本攻击)

### 1.1 攻击类型
```javascript
// 存储型 XSS - 恶意脚本存储在服务器
// 用户评论: &amp;amp;lt;script&amp;amp;gt;stealCookies()&amp;amp;lt;/script&amp;amp;gt;

// 反射型 XSS - 恶意脚本通过 URL 参数传递
// https://example.com/search?q=&amp;amp;lt;script&amp;amp;gt;steal()&amp;amp;lt;/script&amp;amp;gt;

// DOM 型 XSS - 恶意脚本通过 DOM 操作执行
document.getElementById(&amp;amp;#039;output&amp;amp;#039;).innerHTML = location.hash.slice(1);
```

### 1.2 防御
```jsx
// ✅ React 自动转义
&amp;amp;lt;div&amp;amp;gt;{userInput}&amp;amp;lt;/div&amp;amp;gt;

// ❌ 危险
&amp;amp;lt;div dangerouslySetInnerHTML=&amp;#123;&amp;#123; __html: userInput &amp;#125;&amp;#125; /&amp;amp;gt;

// ✅ 使用 DOMPurify
import DOMPurify from &amp;amp;#039;dompurify&amp;amp;#039;;
&amp;amp;lt;div dangerouslySetInnerHTML=&amp;#123;&amp;#123; __html: DOMPurify.sanitize(userInput) &amp;#125;&amp;#125; /&amp;amp;gt;

// ✅ Content Security Policy
// &amp;amp;lt;meta http-equiv=&amp;amp;quot;Content-Security-Policy&amp;amp;quot; content=&amp;amp;quot;default-src &amp;amp;#039;self&amp;amp;#039;&amp;amp;quot;&amp;amp;gt;
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
&amp;amp;lt;input type=&amp;amp;quot;hidden&amp;amp;quot; name=&amp;amp;quot;csrf_token&amp;amp;quot; value=&amp;amp;quot;random-token&amp;amp;quot;&amp;amp;gt;

// 2. SameSite Cookie
Set-Cookie: session=abc123; SameSite=Strict; Secure; HttpOnly

// 3. 验证 Origin/Referer
if (req.headers.origin !== &amp;amp;#039;https://example.com&amp;amp;#039;) {
  return res.status(403).send(&amp;amp;#039;Forbidden&amp;amp;#039;);
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
app.use((req, res, next) =&amp;amp;gt; {
  res.setHeader(&amp;amp;#039;X-Frame-Options&amp;amp;#039;, &amp;amp;#039;DENY&amp;amp;#039;);
  next();
});

// Content Security Policy
// frame-ancestors &amp;amp;#039;none&amp;amp;#039;

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
app.use((req, res, next) =&amp;amp;gt; {
  // 防止 MIME 类型嗅探
  res.setHeader(&amp;amp;#039;X-Content-Type-Options&amp;amp;#039;, &amp;amp;#039;nosniff&amp;amp;#039;);
  
  // 防止点击劫持
  res.setHeader(&amp;amp;#039;X-Frame-Options&amp;amp;#039;, &amp;amp;#039;DENY&amp;amp;#039;);
  
  // XSS 保护
  res.setHeader(&amp;amp;#039;X-XSS-Protection&amp;amp;#039;, &amp;amp;#039;1; mode=block&amp;amp;#039;);
  
  // HTTPS 强制
  res.setHeader(&amp;amp;#039;Strict-Transport-Security&amp;amp;#039;, &amp;amp;#039;max-age=31536000; includeSubDomains&amp;amp;#039;);
  
  // 引用策略
  res.setHeader(&amp;amp;#039;Referrer-Policy&amp;amp;#039;, &amp;amp;#039;strict-origin-when-cross-origin&amp;amp;#039;);
  
  // 权限策略
  res.setHeader(&amp;amp;#039;Permissions-Policy&amp;amp;#039;, &amp;amp;#039;camera=(), microphone=(), geolocation=()&amp;amp;#039;);
  
  next();
});
```

### 4.2 CSP (Content Security Policy)
```javascript
// 严格 CSP
const csp = [
  &amp;amp;quot;default-src &amp;amp;#039;self&amp;amp;#039;&amp;amp;quot;,
  &amp;amp;quot;script-src &amp;amp;#039;self&amp;amp;#039; https://trusted.cdn.com&amp;amp;quot;,
  &amp;amp;quot;style-src &amp;amp;#039;self&amp;amp;#039; &amp;amp;#039;unsafe-inline&amp;amp;#039;&amp;amp;quot;,
  &amp;amp;quot;img-src &amp;amp;#039;self&amp;amp;#039; data: https:&amp;amp;quot;,
  &amp;amp;quot;connect-src &amp;amp;#039;self&amp;amp;#039; https://api.example.com&amp;amp;quot;,
  &amp;amp;quot;frame-ancestors &amp;amp;#039;none&amp;amp;#039;&amp;amp;quot;,
  &amp;amp;quot;base-uri &amp;amp;#039;self&amp;amp;#039;&amp;amp;quot;,
  &amp;amp;quot;form-action &amp;amp;#039;self&amp;amp;#039;&amp;amp;quot;
].join(&amp;amp;#039;; &amp;amp;#039;);

res.setHeader(&amp;amp;#039;Content-Security-Policy&amp;amp;#039;, csp);
```

---

## 5. 数据安全

### 5.1 敏感数据处理
```javascript
// ❌ 不要在前端存储敏感数据
localStorage.setItem(&amp;amp;#039;token&amp;amp;#039;, secretToken);
localStorage.setItem(&amp;amp;#039;password&amp;amp;#039;, password);

// ✅ 使用 HttpOnly Cookie
res.cookie(&amp;amp;#039;session&amp;amp;#039;, token, {
  httpOnly: true,
  secure: true,
  sameSite: &amp;amp;#039;strict&amp;amp;#039;,
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
