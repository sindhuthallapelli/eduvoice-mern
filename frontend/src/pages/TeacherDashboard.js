// src/pages/TeacherDashboard.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cls, section } = location.state || {};

  const handlePostQuestion = () => {
    navigate('/teacher/post-question', { state: { cls, section } });
  };

  const handleViewReports = () => {
    navigate('/teacher/view-reports', { state: { cls, section } });
  };

  return (
    <div className="dashboard">
      <h2>Teacher Dashboard</h2>
      <p><strong>Class:</strong> {cls}</p>
      <p><strong>Section:</strong> {section}</p>

      <div className="role-buttons">
        <button onClick={handlePostQuestion}>Post Question</button>
        <button onClick={handleViewReports}>View Reports</button>
      </div>
    </div>
  );
}
