const express = require('express');
const router = express.Router();

const {
  loginStudent,
  getQuestionsForStudent,
  submitFeedback
} = require('../controllers/studentController');

const { protect } = require('../middleware/authMiddleware');

// Student login
router.post('/login', loginStudent);

// Get available questions (auth required)
router.get('/questions', protect, getQuestionsForStudent);

// Submit feedback (auth required)
router.post('/submit-feedback', protect, submitFeedback);

module.exports = router;
