const express = require('express');
const SafeGuardCore = require('../core'); // 假设我们将 core.py 转换为可在 Node.js 中使用的模块

const router = express.Router();
const safeGuardCore = new SafeGuardCore();

// 监测文本
router.post('/analyze', async (req, res) => {
  try {
    const { text, location } = req.body;
    const analysisResult = safeGuardCore.analyze_text(text, location);
    const recommendations = safeGuardCore.generate_safety_recommendations(analysisResult);
    res.status(200).send({ analysisResult, recommendations });
  } catch (error) {
    res.status(400).send({ error: '分析失败' });
  }
});

module.exports = router; 