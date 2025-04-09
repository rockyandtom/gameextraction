#!/bin/bash

# 游戏iframe检查器启动脚本

echo "启动游戏iframe检查器..."
echo "正在启动服务器，请等待..."

# 安装依赖（如果需要）
if [ ! -d "node_modules" ]; then
  echo "首次运行，正在安装依赖..."
  npm install
fi

# 启动应用
node index.js

# 脚本结束后的提示
echo "服务已关闭" 