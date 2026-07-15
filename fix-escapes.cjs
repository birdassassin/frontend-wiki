const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
const filesFixed = [];

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const beforeLength = content.length;
  
  content = content
    .replace(/&amp;amp;#039;/g, "'")
    .replace(/&amp;amp;quot;/g, '"')
    .replace(/&amp;amp;gt;/g, '>')
    .replace(/&amp;amp;lt;/g, '<')
    .replace(/&amp;amp;amp;/g, '&');
  
  const afterLength = content.length;
  
  if (beforeLength !== afterLength) {
    fs.writeFileSync(filePath, content, 'utf-8');
    filesFixed.push(filePath);
    console.log(`Fixed: ${filePath} (${beforeLength - afterLength} chars changed)`);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      fixFile(fullPath);
    }
  }
}

console.log('Fixing HTML escaped entities...\n');
walkDir(docsDir);

console.log(`\nTotal files fixed: ${filesFixed.length}`);
