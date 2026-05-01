const express = require('express');
const router = express.Router();
const { submitQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.post('/submit', protect, submitQuiz);
router.get('/my-result', protect, require('../controllers/quizController').getMyLastResult);

module.exports = router;