const axios = require('axios');
const cheerio = require('cheerio');

/**
 * 检查游戏链接并提取信息
 * @param {string} url - 游戏网页URL
 * @returns {Object} - 包含游戏信息的对象
 */
async function checkGameLink(url) {
  try {
    // 验证URL格式
    if (!url || !(url.startsWith('http://') || url.startsWith('https://'))) {
      return { error: '请输入有效的URL (以http或https开头)' };
    }

    // 获取页面内容
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
      },
      timeout: 15000
    });

    // 使用cheerio解析HTML
    const $ = cheerio.load(response.data);
    
    // 查找iframe元素
    const iframes = $('iframe');
    
    if (iframes.length === 0) {
      return { 
        hasIframe: false, 
        message: '未在页面中找到iframe元素'
      };
    }
    
    // 提取所有iframe的src属性
    const iframeSources = [];
    iframes.each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        iframeSources.push(src);
      }
    });
    
    if (iframeSources.length === 0) {
      return { 
        hasIframe: false, 
        message: '页面中的iframe元素没有src属性'
      };
    }
    
    // 提取游戏标题
    let title = $('title').text().trim();
    if (!title) {
      title = $('h1').first().text().trim() || '未找到标题';
    }
    
    // 提取游戏简介
    let description = $('meta[name="description"]').attr('content') || '';
    if (!description) {
      // 尝试从页面中获取游戏描述，可能存在于特定的div或段落中
      description = $('div.game-description, div.description, p.description, .about, .game-about, #game-description').first().text().trim() || '未找到游戏简介';
    }
    
    // 尝试提取游戏控制说明 - 扩展选择器范围
    let controls = $('div.game-controls, div.controls, div.instructions, .controls, .instructions, .game-controls, #controls, #instructions, .control-info, .gameplay, .how-to-play').text().trim();
    if (!controls) {
      // 尝试从所有p标签中查找可能的控制说明
      $('p').each((index, element) => {
        const text = $(element).text().toLowerCase();
        if (text.includes('control') || text.includes('how to play') || text.includes('instruction') || text.includes('操作')) {
          controls = $(element).text().trim();
          return false; // 跳出循环
        }
      });
    }
    controls = controls || '未找到控制说明';
    
    // 尝试提取游戏玩法提示
    let tips = $('div.game-tips, div.tips, div.gameplay-tips, .tips, .gameplay-tips, .game-tips, #tips, #gameplay-tips, .tip-info, .game-help').text().trim();
    if (!tips) {
      // 尝试从所有p标签中查找可能的玩法提示
      $('p').each((index, element) => {
        const text = $(element).text().toLowerCase();
        if (text.includes('tip') || text.includes('hint') || text.includes('trick') || text.includes('提示')) {
          tips = $(element).text().trim();
          return false; // 跳出循环
        }
      });
    }
    tips = tips || '未找到游戏玩法提示';
    
    return {
      hasIframe: true,
      title,
      description,
      iframeSources,
      controls,
      tips
    };
    
  } catch (error) {
    console.error('检查游戏链接时出错:', error);
    return { 
      error: `获取页面内容失败: ${error.message || '未知错误'}` 
    };
  }
}

module.exports = {
  checkGameLink
};
