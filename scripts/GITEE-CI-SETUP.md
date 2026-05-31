# Gitee CI/CD 自动更新配置

## 方案说明

由于 Gitee 目前不支持 GitHub Actions，我们提供以下替代方案：

---

## 方案一：使用 Gitee Go Pipeline（推荐）

### 1. 在 Gitee 仓库中启用 Gitee Go

1. 打开仓库 → 设置 → Gitee Go
2. 创建新的流水线
3. 使用以下配置：

```yaml
version: '1.0'
name: 前端知识库自动更新检查
stages:
  - stage:
      name: 检查更新
      steps:
        - step: build@nodejs
          name: 运行更新检查
          nodeVersion: 20
          commands:
            - node scripts/update-checker.js
            - git add -A
            - git commit -m "chore: auto update version check report" || exit 0
            - git push
```

### 2. 设置定时触发

1. 在流水线设置中，添加"定时触发"规则
2. 设置为每周一运行

---

## 方案二：使用 Gitee Webhook + 本地脚本

### 1. 创建 Webhook 接收脚本

```bash
# scripts/webhook-server.js
const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    console.log('收到更新请求，开始检查...');
    exec('node scripts/update-checker.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`执行错误: ${error}`);
        res.writeHead(500);
        res.end('Error');
        return;
      }
      console.log(stdout);
      res.writeHead(200);
      res.end('OK');
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Webhook 服务器运行在 http://localhost:3000');
});
```

### 2. 在 Gitee 仓库设置 Webhook

1. 打开仓库 → 管理 → WebHooks
2. 添加 Webhook：`http://localhost:3000/webhook`
3. 触发事件选择"Push"

### 3. 运行 Webhook 服务器

```bash
node scripts/webhook-server.js
```

---

## 方案三：使用 GitHub Actions（如果同时推送到 GitHub）

如果仓库同时推送到 GitHub，可以使用 `.github/workflows/update-check.yml`，配置已创建。

---

## 方案四：本地 crontab（最简单可靠）

```bash
# 编辑 crontab
crontab -e

# 添加（每周一上午 10 点运行）
0 10 * * 1 cd /Users/lyon/Documents/codes/solo-wiki && ./scripts/run-update-check.sh >> scripts/update-check.log 2>&1
```

---

## 推荐方案

对于 Gitee 仓库，**推荐使用方案四（本地 crontab）**，因为：
- 不依赖外部服务
- 配置简单
- 稳定可靠
- 支持桌面通知

如果需要云端自动化，可以考虑将仓库同时推送到 GitHub，使用 GitHub Actions。
