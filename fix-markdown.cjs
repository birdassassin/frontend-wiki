const fs = require('fs');
const path = require('path');

function escapeHtmlAndVue(content) {
  return content.replace(/```([\s\S]*?)```/g, (match, code) => {
    const escaped = code.replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#039;')
                        .replace(/\{\{/g, '&#123;&#123;')
                        .replace(/\}\}/g, '&#125;&#125;');
    return '```' + escaped + '```';
  }).replace(/\{\{/g, '&#123;&#123;')
    .replace(/\}\}/g, '&#125;&#125;');
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  content = content.replace(/\[(\d+)\]:\s*\/img\/([^\s]+)/g, '[$1]: https://gitee.com/birdassassin/frontend-wiki/raw/master/img/$2');
  content = content.replace(/!\[([^\]]*)\]\(\/img\/([^)]+)\)/g, '![$1](https://gitee.com/birdassassin/frontend-wiki/raw/master/img/$2)');
  content = escapeHtmlAndVue(content);
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed:', filePath);
  }
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.md')) {
      fixFile(fullPath);
    }
  });
}

processDir(path.join(__dirname, 'docs'));
console.log('Done');
