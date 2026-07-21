const fs = require('fs');
const path = require('path');
const https = require('https');

const PACKAGES_TO_CHECK = [
  { name: 'react', npm: 'react', docPath: 'docs/wiki/techniques/react-core.md' },
  { name: 'vue', npm: 'vue', docPath: 'docs/wiki/techniques/vue-core.md' },
  { name: 'vite', npm: 'vite', docPath: 'docs/wiki/tools/vite.md' },
  { name: 'webpack', npm: 'webpack', docPath: 'docs/wiki/tools/webpack.md' },
  { name: 'typescript', npm: 'typescript', docPath: 'docs/wiki/concepts/typescript.md' },
  { name: 'next', npm: 'next', docPath: 'docs/wiki/tools/fullstack-frameworks.md' },
  { name: 'nuxt', npm: 'nuxt', docPath: 'docs/wiki/tools/fullstack-frameworks.md' },
  { name: 'tailwindcss', npm: 'tailwindcss', docPath: 'docs/wiki/concepts/css-fundamentals.md' }
];

function fetchNpmVersion(packageName) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'registry.npmjs.org',
      path: `/${packageName}/latest`,
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.version);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

function extractVersionFromDoc(docPath) {
  try {
    const content = fs.readFileSync(docPath, 'utf-8');
    
    const versionPatterns = [
      /版本\s*[：:]\s*(\d+\.\d+(\.\d+)?)/i,
      /当前版本\s*[：:]\s*(\d+\.\d+(\.\d+)?)/i,
      /(\d+\.\d+\.\d+)/
    ];

    for (const pattern of versionPatterns) {
      const match = content.match(pattern);
      if (match) {
        return match[1];
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

function compareVersions(docVersion, npmVersion) {
  if (!docVersion) return { status: 'unknown', message: '文档中未找到版本信息' };
  
  const docParts = docVersion.split('.').map(Number);
  const npmParts = npmVersion.split('.').map(Number);
  
  for (let i = 0; i < Math.max(docParts.length, npmParts.length); i++) {
    const docPart = docParts[i] || 0;
    const npmPart = npmParts[i] || 0;
    
    if (npmPart > docPart) {
      return { status: 'outdated', message: `文档版本 ${docVersion} 落后于最新版本 ${npmVersion}` };
    } else if (npmPart < docPart) {
      return { status: 'ahead', message: `文档版本 ${docVersion} 高于最新版本 ${npmVersion}` };
    }
  }
  
  return { status: 'up-to-date', message: `文档版本 ${docVersion} 与最新版本 ${npmVersion} 一致` };
}

async function run() {
  console.log('🚀 开始检查前端框架版本...\n');
  
  const results = [];
  
  for (const pkg of PACKAGES_TO_CHECK) {
    console.log(`🔍 检查 ${pkg.name}...`);
    
    try {
      const npmVersion = await fetchNpmVersion(pkg.npm);
      const docVersion = extractVersionFromDoc(pkg.docPath);
      const comparison = compareVersions(docVersion, npmVersion);
      
      results.push({
        package: pkg.name,
        npmVersion,
        docVersion: docVersion || '未找到',
        status: comparison.status,
        message: comparison.message
      });
      
      let statusIcon = '';
      let statusColor = '';
      
      switch (comparison.status) {
        case 'up-to-date':
          statusIcon = '✅';
          statusColor = '\x1b[32m';
          break;
        case 'outdated':
          statusIcon = '⚠️';
          statusColor = '\x1b[33m';
          break;
        case 'ahead':
          statusIcon = '❓';
          statusColor = '\x1b[34m';
          break;
        default:
          statusIcon = '❔';
          statusColor = '\x1b[37m';
      }
      
      console.log(`${statusIcon} ${statusColor}${pkg.name}: ${comparison.message}\x1b[0m`);
    } catch (error) {
      console.log(`❌ ${pkg.name}: 检查失败 - ${error.message}`);
      results.push({
        package: pkg.name,
        npmVersion: '获取失败',
        docVersion: '未知',
        status: 'error',
        message: `检查失败: ${error.message}`
      });
    }
  }
  
  console.log('\n📊 检查完成！');
  
  const outdatedCount = results.filter(r => r.status === 'outdated').length;
  const upToDateCount = results.filter(r => r.status === 'up-to-date').length;
  
  console.log(`\n✅ 版本最新: ${upToDateCount}`);
  console.log(`⚠️ 版本落后: ${outdatedCount}`);
  
  if (outdatedCount > 0) {
    console.log('\n📝 需要更新的文档：');
    results.filter(r => r.status === 'outdated').forEach(r => {
      console.log(`  - ${r.package}: 当前 ${r.docVersion} → 最新 ${r.npmVersion}`);
    });
  }
  
  return results;
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = {
  run,
  fetchNpmVersion,
  extractVersionFromDoc,
  compareVersions
};
