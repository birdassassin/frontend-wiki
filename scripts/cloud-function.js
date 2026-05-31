#!/usr/bin/env node

/**
 * Gitee Webhook 云函数入口
 * 
 * 用于接收 Gitee Webhook 触发，运行版本检查
 * 可部署到：腾讯云函数、阿里云函数、Vercel 等
 * 
 * Gitee Webhook 配置：
 * 1. 仓库 → 管理 → WebHooks → 添加 WebHook
 * 2. URL: 云函数地址
 * 3. 密码: 设置一个密钥用于验证
 * 4. 触发事件: Push
 */

const https = require('https');
const crypto = require('crypto');

// Webhook 密钥（需要与 Gitee 配置一致）
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-secret-key';

// 主处理函数
exports.main_handler = async (event, context) => {
  try {
    // 解析请求体
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    
    // 验证 Webhook 签名（如果配置了密钥）
    const signature = event.headers['x-gitee-token'] || event.headers['X-Gitee-Token'];
    if (WEBHOOK_SECRET && WEBHOOK_SECRET !== 'your-secret-key') {
      const expectedSignature = crypto
        .createHmac('sha256', WEBHOOK_SECRET)
        .update(JSON.stringify(body))
        .digest('hex');
      
      if (signature !== expectedSignature) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Invalid signature' })
        };
      }
    }
    
    console.log('收到 Gitee Webhook 触发');
    console.log('仓库:', body.repository?.full_name);
    console.log('提交者:', body.pusher?.name);
    
    // 运行版本检查
    const { execSync } = require('child_process');
    
    console.log('开始运行版本检查...');
    const output = execSync('node scripts/update-checker.js', {
      cwd: process.env.HOME || '/tmp',
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024
    });
    
    console.log('版本检查完成');
    console.log(output);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Update check completed',
        output: output.substring(0, 1000) // 只返回前 1000 字符
      })
    };
    
  } catch (error) {
    console.error('执行错误:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
