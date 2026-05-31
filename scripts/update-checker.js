#!/usr/bin/env node

/**
 * 前端知识库自动更新检查脚本
 * 
 * 功能：
 * 1. 检查核心框架/工具的最新版本
 * 2. 对比知识库中记录的版本
 * 3. 生成更新报告
 * 4. 提示需要更新的内容
 * 
 * 使用方法：
 *   node scripts/update-checker.js
 *   npm run check-updates
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 需要监控的包列表
const PACKAGES_TO_WATCH = [
  // 核心框架
  { name: 'react', category: '框架', file: 'wiki/techniques/react-core.md' },
  { name: 'react-dom', category: '框架', file: 'wiki/techniques/react-core.md' },
  { name: 'vue', category: '框架', file: 'wiki/techniques/vue-core.md' },
  { name: 'svelte', category: '框架', file: 'wiki/techniques/vue-core.md' },
  
  // 全栈框架
  { name: 'next', category: '全栈框架', file: 'wiki/tools/fullstack-frameworks.md' },
  { name: 'nuxt', category: '全栈框架', file: 'wiki/tools/fullstack-frameworks.md' },
  { name: '@remix-run/node', category: '全栈框架', file: 'wiki/tools/fullstack-frameworks.md' },
  { name: 'astro', category: '全栈框架', file: 'wiki/tools/fullstack-frameworks.md' },
  
  // 构建工具
  { name: 'vite', category: '构建工具', file: 'wiki/tools/vite.md' },
  { name: 'webpack', category: '构建工具', file: 'wiki/tools/vite.md' },
  { name: 'esbuild', category: '构建工具', file: 'wiki/tools/vite.md' },
  { name: 'turbo', category: '构建工具', file: 'wiki/tools/vite.md' },
  
  // 包管理器
  { name: 'npm', category: '包管理器', file: 'wiki/tools/package-managers.md' },
  { name: 'pnpm', category: '包管理器', file: 'wiki/tools/package-managers.md' },
  { name: 'yarn', category: '包管理器', file: 'wiki/tools/package-managers.md' },
  { name: 'bun', category: '包管理器', file: 'wiki/tools/package-managers.md' },
  
  // 代码质量
  { name: 'eslint', category: '代码质量', file: 'wiki/tools/code-quality.md' },
  { name: 'prettier', category: '代码质量', file: 'wiki/tools/code-quality.md' },
  { name: '@biomejs/biome', category: '代码质量', file: 'wiki/tools/code-quality.md' },
  { name: 'typescript', category: '代码质量', file: 'wiki/concepts/typescript.md' },
  
  // 状态管理
  { name: 'zustand', category: '状态管理', file: 'wiki/tools/react-ecosystem.md' },
  { name: '@reduxjs/toolkit', category: '状态管理', file: 'wiki/tools/react-ecosystem.md' },
  { name: 'pinia', category: '状态管理', file: 'wiki/tools/vue-ecosystem.md' },
  
  // 数据获取
  { name: '@tanstack/react-query', category: '数据获取', file: 'wiki/tools/react-ecosystem.md' },
  { name: 'swr', category: '数据获取', file: 'wiki/tools/react-ecosystem.md' },
  { name: '@tanstack/vue-query', category: '数据获取', file: 'wiki/tools/vue-ecosystem.md' },
  
  // 路由
  { name: 'react-router', category: '路由', file: 'wiki/tools/react-ecosystem.md' },
  { name: 'vue-router', category: '路由', file: 'wiki/tools/vue-ecosystem.md' },
  
  // 测试
  { name: 'vitest', category: '测试', file: 'wiki/concepts/testing-strategies.md' },
  { name: 'jest', category: '测试', file: 'wiki/concepts/testing-strategies.md' },
  { name: 'playwright', category: '测试', file: 'wiki/concepts/testing-strategies.md' },
  { name: 'cypress', category: '测试', file: 'wiki/concepts/testing-strategies.md' },
  
  // UI 组件库
  { name: '@radix-ui/react-slot', category: 'UI 组件', file: 'wiki/tools/react-ecosystem.md' },
  { name: 'element-plus', category: 'UI 组件', file: 'wiki/tools/vue-ecosystem.md' },
  { name: 'naive-ui', category: 'UI 组件', file: 'wiki/tools/vue-ecosystem.md' },
];

// 从 npm 获取最新版本
function getLatestVersion(packageName) {
  return new Promise((resolve, reject) => {
    const url = `https://registry.npmjs.org/${packageName}/latest`;
    
    https.get(url, { headers: { 'User-Agent': 'Frontend-Wiki-Update-Checker/1.0' } }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            resolve(json.version);
          } catch (e) {
            reject(new Error(`解析 ${packageName} 版本信息失败`));
          }
        } else {
          reject(new Error(`获取 ${packageName} 版本信息失败: HTTP ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

// 从文件中提取当前记录的版本
function extractCurrentVersion(filePath, packageName) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // 尝试匹配版本号模式
    const patterns = [
      new RegExp(`${packageName}[^\\w]*([0-9]+\\.[0-9]+(?:\\.[0-9]+)?)`, 'i'),
      new RegExp(`([0-9]+\\.[0-9]+(?:\\.[0-9]+)?)[^\\w]*${packageName}`, 'i'),
    ];
    
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        return match[1];
      }
    }
    
    return null;
  } catch (e) {
    return null;
  }
}

// 比较版本号
function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
  
  return 0;
}

// 判断是否是大版本更新
function isMajorUpdate(current, latest) {
  const [currentMajor] = current.split('.').map(Number);
  const [latestMajor] = latest.split('.').map(Number);
  return latestMajor > currentMajor;
}

// 判断是否是次要版本更新
function isMinorUpdate(current, latest) {
  const [currentMajor, currentMinor] = current.split('.').map(Number);
  const [latestMajor, latestMinor] = latest.split('.').map(Number);
  return latestMajor === currentMajor && latestMinor > currentMinor;
}

// 主函数
async function main() {
  console.log('🔍 开始检查前端知识库更新...\n');
  console.log('=' .repeat(60));
  
  const results = [];
  let successCount = 0;
  let errorCount = 0;
  
  for (const pkg of PACKAGES_TO_WATCH) {
    process.stdout.write(`检查 ${pkg.name}... `);
    
    try {
      const latestVersion = await getLatestVersion(pkg.name);
      const currentVersion = extractCurrentVersion(pkg.file, pkg.name);
      
      if (currentVersion) {
        const comparison = compareVersions(currentVersion, latestVersion);
        
        if (comparison < 0) {
          const isMajor = isMajorUpdate(currentVersion, latestVersion);
          const isMinor = isMinorUpdate(currentVersion, latestVersion);
          
          results.push({
            ...pkg,
            currentVersion,
            latestVersion,
            needsUpdate: true,
            isMajor,
            isMinor,
          });
          
          console.log(`⚠️  需要更新 (${currentVersion} → ${latestVersion})`);
        } else {
          console.log(`✅ 已是最新 (${latestVersion})`);
        }
      } else {
        results.push({
          ...pkg,
          currentVersion: '未找到',
          latestVersion,
          needsUpdate: true,
          isMajor: false,
          isMinor: false,
        });
        
        console.log(`📝 未记录版本 (最新: ${latestVersion})`);
      }
      
      successCount++;
    } catch (e) {
      console.log(`❌ 失败: ${e.message}`);
      errorCount++;
    }
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('\n📊 检查完成！\n');
  console.log(`成功: ${successCount} | 失败: ${errorCount}`);
  
  // 生成更新报告
  const needsUpdate = results.filter(r => r.needsUpdate);
  
  if (needsUpdate.length > 0) {
    console.log('\n' + '=' .repeat(60));
    console.log('📋 需要更新的内容：\n');
    
    // 按类别分组
    const byCategory = {};
    for (const item of needsUpdate) {
      if (!byCategory[item.category]) {
        byCategory[item.category] = [];
      }
      byCategory[item.category].push(item);
    }
    
    for (const [category, items] of Object.entries(byCategory)) {
      console.log(`\n【${category}】`);
      for (const item of items) {
        const marker = item.isMajor ? '🔴 大版本' : item.isMinor ? '🟡 次要版本' : '🟢 补丁版本';
        console.log(`  ${marker} ${item.name}: ${item.currentVersion} → ${item.latestVersion}`);
        console.log(`    文件: ${item.file}`);
      }
    }
    
    // 生成更新建议
    console.log('\n' + '=' .repeat(60));
    console.log('💡 更新建议：\n');
    
    const majorUpdates = needsUpdate.filter(r => r.isMajor);
    if (majorUpdates.length > 0) {
      console.log('🔴 大版本更新（需要重点审查）：');
      for (const item of majorUpdates) {
        console.log(`  - ${item.name} ${item.latestVersion}`);
        console.log(`    建议：查阅官方迁移指南，更新相关概念和示例代码`);
      }
      console.log('');
    }
    
    const minorUpdates = needsUpdate.filter(r => r.isMinor);
    if (minorUpdates.length > 0) {
      console.log('🟡 次要版本更新（建议更新）：');
      for (const item of minorUpdates) {
        console.log(`  - ${item.name} ${item.latestVersion}`);
      }
      console.log('');
    }
    
    // 生成报告文件
    const reportPath = path.join(process.cwd(), 'scripts', 'update-report.md');
    const reportContent = generateReport(needsUpdate);
    fs.writeFileSync(reportPath, reportContent, 'utf8');
    console.log(`📄 详细报告已保存到: ${reportPath}`);
    
  } else {
    console.log('\n🎉 所有包都是最新版本！');
  }
  
  console.log('\n' + '=' .repeat(60));
}

// 生成 Markdown 报告
function generateReport(updates) {
  const now = new Date().toISOString().split('T')[0];
  
  let report = `# 前端知识库更新报告\n\n`;
  report += `生成时间: ${now}\n\n`;
  report += `## 概览\n\n`;
  report += `共发现 ${updates.length} 个包需要更新\n\n`;
  
  const majorUpdates = updates.filter(r => r.isMajor);
  const minorUpdates = updates.filter(r => r.isMinor);
  const patchUpdates = updates.filter(r => !r.isMajor && !r.isMinor);
  
  report += `- 🔴 大版本更新: ${majorUpdates.length} 个\n`;
  report += `- 🟡 次要版本: ${minorUpdates.length} 个\n`;
  report += `- 🟢 补丁版本: ${patchUpdates.length} 个\n\n`;
  
  report += `## 详细更新列表\n\n`;
  
  for (const item of updates) {
    const marker = item.isMajor ? '🔴' : item.isMinor ? '🟡' : '🟢';
    report += `### ${marker} ${item.name}\n\n`;
    report += `- 当前版本: ${item.currentVersion}\n`;
    report += `- 最新版本: ${item.latestVersion}\n`;
    report += `- 类别: ${item.category}\n`;
    report += `- 相关文件: \`${item.file}\`\n\n`;
    
    if (item.isMajor) {
      report += `**建议操作**:\n`;
      report += `1. 查阅 ${item.name} 官方迁移指南\n`;
      report += `2. 更新相关概念描述\n`;
      report += `3. 更新示例代码\n`;
      report += `4. 检查是否有破坏性变更\n\n`;
    }
  }
  
  report += `## 下一步\n\n`;
  report += `1. 优先处理大版本更新\n`;
  report += `2. 更新对应文件中的版本号\n`;
  report += `3. 审查并更新相关内容描述\n`;
  report += `4. 提交更新并推送到远程仓库\n`;
  
  return report;
}

// 运行
main().catch(console.error);
