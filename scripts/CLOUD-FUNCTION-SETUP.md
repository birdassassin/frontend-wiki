# Gitee Webhook + 云函数自动更新方案

## 方案说明

由于 GitHub 在内地无法访问，我们使用**云函数定时触发**方案，不依赖 Gitee Webhook。

---

## 推荐方案：腾讯云函数（免费）

### 1. 创建云函数

1. 登录 [腾讯云控制台](https://console.cloud.tencent.com/scf)
2. 函数服务 → 新建
3. 配置：
   - 运行环境：Node.js 16.13
   - 创建方式：空白函数
   - 函数名称：`frontend-wiki-update-checker`

### 2. 部署代码

将以下代码粘贴到云函数编辑器：

```javascript
const { execSync } = require('child_process');

exports.main_handler = async () => {
  try {
    console.log('开始运行版本检查...');
    
    // 克隆仓库
    execSync('git clone https://gitee.com/birdassassin/frontend-wiki.git /tmp/wiki', {
      encoding: 'utf8'
    });
    
    // 运行检查
    const output = execSync('node scripts/update-checker.js', {
      cwd: '/tmp/wiki',
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024
    });
    
    console.log('检查完成');
    console.log(output);
    
    // 如果有更新，提交代码
    execSync('cd /tmp/wiki && git add -A && git commit -m "chore: auto update" && git push', {
      encoding: 'utf8'
    });
    
    return {
      statusCode: 200,
      body: 'Update check completed'
    };
    
  } catch (error) {
    console.error('执行错误:', error);
    return {
      statusCode: 500,
      body: error.message
    };
  }
};
```

### 3. 设置定时触发

1. 函数管理 → 触发器管理 → 创建触发器
2. 触发方式：定时触发
3. Cron 表达式：`0 0 10 ? * MON`（每周一上午 10 点）

### 4. 配置环境变量（可选）

- `GITEE_USERNAME`: Gitee 用户名
- `GITEE_PASSWORD`: Gitee 密码（用于推送）

---

## 备选方案：阿里云函数

### 1. 创建函数

1. 登录 [阿里云函数计算](https://fcnext.console.aliyun.com)
2. 创建函数 → Node.js 16
3. 使用与上面相同的代码

### 2. 设置定时触发

1. 触发器 → 创建触发器
2. 类型：定时触发器
3. Cron 表达式：`0 10 * * 1`

---

## 备选方案：Vercel（如果可用）

### 1. 创建项目

```bash
npm i -g vercel
cd /Users/lyon/Documents/codes/solo-wiki
vercel
```

### 2. 添加 API 路由

创建 `api/update-check.js`：

```javascript
const { execSync } = require('child_process');

export default async function handler(req, res) {
  try {
    const output = execSync('node scripts/update-checker.js', {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024
    });
    
    res.status(200).json({ output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### 3. 使用 Vercel Cron

在 `vercel.json` 中添加：

```json
{
  "crons": [
    {
      "path": "/api/update-check",
      "schedule": "0 10 * * 1"
    }
  ]
}
```

---

## 方案对比

| 方案 | 费用 | 配置难度 | 稳定性 |
|------|------|----------|--------|
| 腾讯云函数 | 免费额度足够 | 中等 | 高 |
| 阿里云函数 | 免费额度足够 | 中等 | 高 |
| Vercel | 免费 | 简单 | 中（可能被墙） |
| 本地手动 | 免费 | 最简单 | 取决于你 |

---

## 我的建议

**最实际方案**：每月手动运行一次

```bash
cd /Users/lyon/Documents/codes/solo-wiki
npm run check-updates
```

前端框架不会频繁大版本更新，手动运行完全够用。云函数方案适合需要高度自动化的场景，但配置成本较高。
