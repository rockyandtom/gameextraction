const express = require('express');
const path = require('path');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 解决Vercel中的__dirname问题
const rootDir = process.cwd();

// 设置中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

// 设置视图引擎
app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

// 使用路由
app.use('/', gameRoutes);

// 本地开发环境
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
  });
}

// 导出app供Vercel使用
module.exports = app;
