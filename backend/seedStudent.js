const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Student = require('./models/Student');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Student.create([
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
      }
    ]);

    console.log('✅ 2 Students seeded successfully');
    process.exit();
  })
  .catch(err => console.error(err));
