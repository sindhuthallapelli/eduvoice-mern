const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const Teacher = require('../models/Teacher');
const Question = require('../models/Question');
const Feedback = require('../models/Feedback');

// 🟢 Login Teacher
const loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: teacher._id, email: teacher.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      teacher: {
        email: teacher.email,
        assignedClasses: teacher.assignedClasses
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Post Question
const postQuestion = async (req, res) => {
  const { questionText, className, section, deadline } = req.body;

  try {
    const newQuestion = new Question({
      teacher: req.user.id,
      questionText,
      class: className,
      section,
      deadline
    });

    await newQuestion.save();
    res.status(201).json({ message: "Question posted successfully", question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: "Failed to post question", error: error.message });
  }
};

// 🟢 Get Feedback Summary
const getFeedbackSummary = async (req, res) => {
  const { questionId } = req.params;

  try {
    const total = await Feedback.countDocuments({ question: questionId });

    if (total === 0) {
      return res.status(200).json({
        total: 0,
        summary: {
          Good: 0,
          Better: 0,
          Interactive: 0,
          "Lack of Interest": 0
        }
      });
    }

    const responses = await Feedback.aggregate([
      { $match: { question: new mongoose.Types.ObjectId(questionId) } },
      { $group: { _id: "$response", count: { $sum: 1 } } }
    ]);

    const summary = {
      Good: 0,
      Better: 0,
      Interactive: 0,
      "Lack of Interest": 0
    };

    responses.forEach(item => {
      summary[item._id] = ((item.count / total) * 100).toFixed(2);
    });

    res.status(200).json({
      total,
      summary
    });
  } catch (err) {
    console.error("🔴 Feedback summary error:", err);
    res.status(500).json({ message: "Failed to fetch feedback summary" });
  }
};
const getViewChats = async (req, res) => {
  const { questionId } = req.params;

  try {
    const commentsData = await Feedback.find({
      question: questionId,
      comment: { $ne: '' } // non-empty comments only
    }).select('comment -_id');

    const comments = commentsData.map(entry => entry.comment);

    res.status(200).json({ comments });
  } catch (err) {
    console.error("🔴 Error fetching chats:", err);
    res.status(500).json({ message: 'Failed to fetch chats' });
  }
};

const getMyQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ teacher: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      total: questions.length,
      questions
    });
  } catch (err) {
    console.error("🔴 Error fetching teacher questions:", err);
    res.status(500).json({ message: "Failed to fetch your questions" });
  }
};



module.exports = {
  loginTeacher,
  postQuestion,
  getFeedbackSummary,
  getViewChats,
  getMyQuestions
};
