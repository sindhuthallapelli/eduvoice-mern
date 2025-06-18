const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: student._id, email: student.email, class: student.class, section: student.section },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      student: {
        email: student.email,
        class: student.class,
        section: student.section
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const Question = require('../models/Question');

const getQuestionsForStudent = async (req, res) => {
  try { 
    const { class: studentClass, section } = req.user;  // from JWT

    const questions = await Question.find({
      class: studentClass,
      section: section,
    }).sort({ createdAt: -1 });

    res.status(200).json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
};


// controllers/studentController.js
const Feedback = require('../models/Feedback');


const submitFeedback = async (req, res) => {
  const studentId = req.user._id;
  const { questionId, response, comment } = req.body;

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

    // Save feedback with optional comment
    await Feedback.create({
      student: studentId,
      question: questionId,
      response,
      comment: comment || ""  // default to empty string if not provided
    });

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  loginStudent,
  getQuestionsForStudent,
  submitFeedback
};

