// import logo from './logo.svg';
import './App.css';
// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import TeacherLogin from './pages/TeacherLogin';
import TeacherClassSelect from './pages/TeacherClassSelect';
import TeacherDashboard from './pages/TeacherDashboard';
import PostQuestion from './pages/PostQuestion';
import ViewReports from './pages/ViewReports';
import ViewFeedback from './pages/ViewFeedback';
import ViewChats from './pages/ViewChats';


import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './pages/StudentDashboard';

import HODLogin from './pages/HODLogin';
import HODDashboard from './pages/HODDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        
        {/* Teacher routes */}
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/class-select" element={<TeacherClassSelect />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/post-question" element={<PostQuestion />} />
        <Route path="/teacher/view-reports" element={<ViewReports />} />
        <Route path="/teacher/feedback-summary/:questionId" element={<ViewFeedback />} />
        <Route path="/teacher/view-chats/:questionId" element={<ViewChats />} />

        {/* Student routes */}
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* HOD routes */}
        <Route path="/hod/login" element={<HODLogin />} />
        <Route path="/hod/dashboard" element={<HODDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

