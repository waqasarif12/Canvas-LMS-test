const canvasService = require('../services/canvasService');
const csvReader = require('../utils/csvReader');

exports.submitGrades = async (req, res) => {
  try {
    const { inputType, grades } = req.body;

    let gradeList = [];

    if (inputType === 'json') {
      gradeList = grades;
    } else if (inputType === 'csv') {
      gradeList = await csvReader.parseCSV(grades); // assuming file path
    } else {
      return res.status(400).json({ error: 'Unsupported input type' });
    }

    const results = await canvasService.submitBulkGrades(gradeList);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
