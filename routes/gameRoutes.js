const express = require('express');
const router = express.Router();
const gameService = require('../services/gameService');

// 首页路由
router.get('/', (req, res) => {
  res.render('index', { result: null });
});

// 处理检查游戏链接的POST请求
router.post('/check', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.render('index', { 
        result: { error: '请输入URL' } 
      });
    }
    
    const result = await gameService.checkGameLink(url);
    
    // 如果有iframe，准备Markdown格式的输出
    if (result.hasIframe && !result.error) {
      const markdownOutput = generateMarkdown(result);
      result.markdown = markdownOutput;
    }
    
    res.render('index', { result, url });
    
  } catch (error) {
    console.error('路由处理错误:', error);
    res.render('index', { 
      result: { error: '处理请求时发生错误: ' + error.message },
      url: req.body.url
    });
  }
});

/**
 * 生成Markdown格式的游戏信息
 * @param {Object} gameInfo - 游戏信息对象
 * @returns {string} - Markdown格式的字符串
 */
function generateMarkdown(gameInfo) {
  const { title, description, iframeSources, controls, tips } = gameInfo;
  
  let markdown = '';
  
  // 添加标题
  markdown += `# ${title}\n\n`;
  
  // 添加游戏简介
  markdown += `## 游戏简介\n${description}\n\n`;
  
  // 添加iframe地址
  markdown += `## iframe地址\n`;
  iframeSources.forEach((src, index) => {
    markdown += `\`\`\`\n${src}\n\`\`\`\n`;
  });
  markdown += '\n';
  
  // 添加游戏控制说明 - 无论是否找到都添加
  markdown += `## 游戏控制说明\n${controls}\n\n`;
  
  // 添加游戏玩法提示 - 无论是否找到都添加
  markdown += `## 游戏玩法提示\n${tips}\n\n`;
  
  return markdown;
}

module.exports = router;
