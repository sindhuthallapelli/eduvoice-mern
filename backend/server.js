// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Routes
const teacherRoutes = require('./routes/teacherRoutes');
app.use('/api/teacher', teacherRoutes);  // All teacher-related APIs

const studentRoutes = require('./routes/studentRoutes');
app.use('/api/student', studentRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('EduVoice API is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
