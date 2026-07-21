const fs = require('fs');
const path = require('path');

const CHANGELOG_PATH = path.join(__dirname, '../CHANGELOG.md');

function getVersion() {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
  return pkg.version || '1.0.0';
}

function formatDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function updateChangelog(options) {
  const {
    version = getVersion(),
    title = '版本更新',
    features = [],
    fixes = [],
    docs = [],
    other = []
  } = options;

  const date = formatDate();
  
  let newEntry = `## ${date} - ${version} ${title}\n\n`;
  
  if (features.length > 0) {
    newEntry += '### 新增内容\n\n';
    features.forEach(feature => {
      newEntry += `- ✨ ${feature}\n`;
    });
    newEntry += '\n';
  }
  
  if (fixes.length > 0) {
    newEntry += '### 修复问题\n\n';
    fixes.forEach(fix => {
      newEntry += `- 🐛 ${fix}\n`;
    });
    newEntry += '\n';
  }
  
  if (docs.length > 0) {
    newEntry += '### 文档更新\n\n';
    docs.forEach(doc => {
      newEntry += `- 📚 ${doc}\n`;
    });
    newEntry += '\n';
  }
  
  if (other.length > 0) {
    newEntry += '### 其他\n\n';
    other.forEach(item => {
      newEntry += `- 📋 ${item}\n`;
    });
    newEntry += '\n';
  }
  
  newEntry += '---\n\n';

  const existingContent = fs.readFileSync(CHANGELOG_PATH, 'utf-8');
  const updatedContent = newEntry + existingContent;
  
  fs.writeFileSync(CHANGELOG_PATH, updatedContent, 'utf-8');
  
  console.log(`✅ CHANGELOG 更新成功！`);
  console.log(`📝 新增版本: ${version}`);
  console.log(`📅 日期: ${date}`);
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {};
  
  args.forEach(arg => {
    const [key, value] = arg.split('=');
    if (key === '--version') options.version = value;
    if (key === '--title') options.title = value;
    if (key === '--feature') {
      if (!options.features) options.features = [];
      options.features.push(value);
    }
    if (key === '--fix') {
      if (!options.fixes) options.fixes = [];
      options.fixes.push(value);
    }
    if (key === '--doc') {
      if (!options.docs) options.docs = [];
      options.docs.push(value);
    }
    if (key === '--other') {
      if (!options.other) options.other = [];
      options.other.push(value);
    }
  });
  
  updateChangelog(options);
}

module.exports = {
  updateChangelog,
  formatDate,
  getVersion
};
