const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');


router.get('/', (req, res) => {
    res.send('Welcome to the Canvas Grade Sync API');
});

// Submit grades (JSON or CSV)
router.post('/submit', gradeController.submitGrades);

module.exports = router;
