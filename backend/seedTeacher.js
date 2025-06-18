const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Teacher = require('./models/Teacher');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected for seeding"))
.catch(err => console.error("MongoDB connection error:", err));

// Sample teacher data
const teachers = [
  {
    email: 'teacher1@example.com',
    password: 'password123',
    assignedClasses: [
      { class: '10', section: 'A' },
      { class: '9', section: 'B' }
    ]
  },
  {
    email: 'teacher2@example.com',
    password: 'password456',
    assignedClasses: [
      { class: '11', section: 'C' }
    ]
  }
];

async function seedTeachers() {
  try {
    // Clear existing teachers (optional)
    await Teacher.deleteMany();

    // Hash passwords and insert teachers
    for (let t of teachers) {
      const hashedPassword = await bcrypt.hash(t.password, 10);
      const teacher = new Teacher({
        email: t.email,
        password: hashedPassword,
        assignedClasses: t.assignedClasses
      });
      await teacher.save();
    }

    console.log("Teachers seeded successfully.");
    process.exit(); // Exit script
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedTeachers();
