# 游戏iframe检查器

这是一个用于检查在线游戏链接是否包含iframe地址的Web应用程序。如果找到iframe地址，它将自动提取游戏标题、简介、iframe地址和游戏控制说明，并以Markdown格式输出。

## 功能特点

- 输入游戏链接进行检查
- 自动检测页面中的iframe元素
- 提取游戏标题、简介、游戏控制说明和玩法提示
- 以Markdown格式输出结果，方便复制使用
- 提供iframe预览功能

## 技术栈

- Node.js
- Express.js - Web框架
- Axios - HTTP客户端
- Cheerio - HTML解析
- EJS - 模板引擎

## 安装和使用

### 前提条件

- Node.js (v14.0.0 或更高版本)
- npm 或 yarn

### 安装

1. 克隆或下载此仓库
2. 进入项目目录
3. 安装依赖

```bash
npm install
```

### 运行

```bash
npm start
```

应用将在 http://localhost:3000 上运行

## 使用方法

1. 在浏览器中访问 http://localhost:3000
2. 在输入框中输入游戏链接（以http或https开头）
3. 点击"检查"按钮
4. 等待检查结果
   - 如果没有找到iframe地址，将显示"无iframe地址"
   - 如果找到iframe地址，将显示游戏信息的Markdown格式文本和iframe预览
5. 如需使用生成的Markdown内容，点击"复制Markdown"按钮

## 注意事项

- 某些网站可能有反爬虫措施，可能会阻止应用程序访问
- 由于网站结构差异，提取的游戏简介和控制说明的准确性可能会有所不同
- 如果网站使用JavaScript动态加载iframe内容，可能无法检测到iframe地址

## 许可证

ISC 