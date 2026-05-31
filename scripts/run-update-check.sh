#!/bin/bash

# 前端知识库自动更新检查 - 本地定时任务脚本
# 
# 使用方法：
# 1. 手动运行: ./scripts/run-update-check.sh
# 2. 添加到 crontab (每周运行一次):
#    crontab -e
#    添加: 0 10 * * 1 cd /Users/lyon/Documents/codes/solo-wiki && ./scripts/run-update-check.sh >> scripts/update-check.log 2>&1

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WIKI_DIR="$(dirname "$SCRIPT_DIR")"

echo "========================================="
echo "前端知识库更新检查"
echo "时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo "========================================="

cd "$WIKI_DIR"

# 运行更新检查
node scripts/update-checker.js

# 检查是否有大版本更新需要关注
if [ -f "scripts/update-report.md" ]; then
    MAJOR_COUNT=$(grep -c "🔴" scripts/update-report.md || echo "0")
    
    if [ "$MAJOR_COUNT" -gt 0 ]; then
        echo ""
        echo "⚠️  发现 $MAJOR_COUNT 个大版本更新，请及时处理！"
        
        # 如果有大版本更新，发送桌面通知 (macOS)
        if command -v osascript &> /dev/null; then
            osascript -e "display notification \"发现 $MAJOR_COUNT 个大版本更新需要处理\" with title \"前端知识库更新\""
        fi
    fi
fi

echo ""
echo "检查完成！"
echo "详细报告: scripts/update-report.md"
