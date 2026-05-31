# 腾讯云函数自动更新方案（2025 新版）

## 方案说明

使用腾讯云函数的**定时触发器**（不依赖 API 网关），每周一自动运行版本检查。

---

## 步骤

### 1. 创建云函数

1. 登录 [腾讯云函数控制台](https://console.cloud.tencent.com/scf/list)
2. 点击**新建**
3. 配置：
   - 函数名称：`frontend-wiki-update`
   - 运行环境：Node.js 16.13
   - 创建方式：空白函数
   - 地域：就近选择（如上海）

### 2. 粘贴代码

在函数代码编辑器中粘贴以下内容：

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

### 3. 配置环境变量

在函数配置 → 环境变量中添加：

| 变量名 | 值 |
|--------|-----|
| `GITEE_USERNAME` | 你的 Gitee 用户名 |
| `GITEE_PASSWORD` | 你的 Gitee 密码（或访问令牌） |

### 4. 设置定时触发器

1. 函数管理 → **触发器管理** → 创建触发器
2. 触发方式：**定时触发**
3. Cron 表达式：`0 0 10 ? * MON`（每周一上午 10 点）
4. 点击完成

### 5. 测试

点击**测试**按钮，查看运行日志。

---

## 免费额度

腾讯云函数每月免费：
- 调用次数：100 万次
- 资源使用：40 万 GBs
- 外网出流量：1GB

每周运行一次完全在免费额度内。

---

## 备选方案

如果不想用云函数，可以：

1. **手动运行**（推荐）：
   ```bash
   cd /Users/lyon/Documents/codes/solo-wiki
   npm run check-updates
   ```

2. **macOS 开机自动运行**：
   创建 `~/Library/LaunchAgents/com.frontend-wiki.update.plist`：
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
       <key>Label</key>
       <string>com.frontend-wiki.update</string>
       <key>ProgramArguments</key>
       <array>
           <string>/usr/local/bin/node</string>
           <string>/Users/lyon/Documents/codes/solo-wiki/scripts/update-checker.js</string>
       </array>
       <key>RunAtLoad</key>
       <true/>
   </dict>
   </plist>
   ```
