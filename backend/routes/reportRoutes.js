const express = require('express');
const Incident = require('../models/Incident');

const router = express.Router();

// 获取报告
router.get('/reports', async (req, res) => {
  try {
    const incidents = await Incident.find();
    // 进行数据分析并生成报告
    const report = generateReport(incidents);
    res.status(200).send(report);
  } catch (error) {
    res.status(400).send({ error: '获取报告失败' });
  }
});

const generateReport = (incidents) => {
  // 生成报告的逻辑
  return { totalIncidents: incidents.length, incidents };
};

module.exports = router; 