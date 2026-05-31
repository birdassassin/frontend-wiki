#!/bin/bash

# 同步 wiki 内容到 docs 目录用于 GitHub Pages 部署

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "同步 wiki 内容到 docs/wiki/..."

# 创建目标目录
mkdir -p "$PROJECT_DIR/docs/wiki"

# 同步 wiki 内容（排除 legacy 中的大文件）
rsync -av --delete \
  --exclude='*.DS_Store' \
  "$PROJECT_DIR/wiki/" \
  "$PROJECT_DIR/docs/wiki/"

# 复制根目录文件
cp "$PROJECT_DIR/README.md" "$PROJECT_DIR/docs/README.md"
cp "$PROJECT_DIR/CHANGELOG.md" "$PROJECT_DIR/docs/CHANGELOG.md"

echo "同步完成！"
echo "docs/ 目录结构："
ls -la "$PROJECT_DIR/docs/"
