const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Student = require('./models/Student');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('🌱 Checking and inserting students...');

    const studentsToSeed = [
      {
        email: 'student1@example.com',
        password: '123456',
        class: '10',
        section: 'A'
      },
      {
        email: 'student2@example.com',
        password: 'abcdef',
        class: '10',
        section: 'B'
      },
      {
        email: 'student3@example.com',
        password: '1234567',
        class: '10',
        section: 'A'
      },
      {
        email: 'student4@example.com',
        password: '999999',
        class: '10',
        section: 'B'
      }
    ];

    for (const student of studentsToSeed) {
      const exists = await Student.findOne({ email: student.email });
      if (!exists) {
        await Student.create(student);
        console.log(`✅ Inserted: ${student.email}`);
      } else {
        console.log(`⚠️ Already exists: ${student.email}`);
      }
    }

    console.log('🌱 Seeding completed');
    process.exit();
  })
  .catch(err => console.error('❌ Seeding failed:', err));
