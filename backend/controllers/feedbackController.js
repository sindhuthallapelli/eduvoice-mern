// controllers/studentController.js
const Feedback = require('../models/Feedback');
const Question = require('../models/Question');

const submitFeedback = async (req, res) => {
  const studentId = req.user._id;
  const { questionId, response } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    // Deadline check
    if (new Date() > new Date(question.deadline)) {
      return res.status(400).json({ message: 'Deadline has passed' });
    }

    // Check if already submitted
    const alreadySubmitted = await Feedback.findOne({ student: studentId, question: questionId });
    if (alreadySubmitted) {
      return res.status(400).json({ message: 'Feedback already submitted for this question' });
    }

    // Save feedback
    await Feedback.create({ student: studentId, question: questionId, response });
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitFeedback };
