// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  response: { type: String, enum: ['Good', 'Better', 'Interactive', 'Lack of Interest'], required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
