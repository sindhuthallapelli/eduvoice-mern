const express = require('express');
const router = express.Router();
const { loginTeacher, postQuestion,getFeedbackSummary,getViewChats,getMyQuestions} = require('../controllers/teacherController');
const { protect } = require('../middleware/authMiddleware');

router.get('/my-questions', protect, getMyQuestions);


router.get('/view-chats/:questionId', protect, getViewChats);



router.get('/feedback-summary/:questionId', protect, getFeedbackSummary);


// Login route
router.post('/login', loginTeacher);

// Post question route (protected)
router.post('/post-question', protect, postQuestion);

module.exports = router;
