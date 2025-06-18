const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  assignedClasses: [
    {
      class: String,
      section: String
    }
  ]
});

module.exports = mongoose.model('Teacher', teacherSchema);
