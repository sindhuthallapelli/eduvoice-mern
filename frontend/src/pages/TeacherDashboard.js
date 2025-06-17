import React from 'react';
export default function TeacherDashboard() {
  return (
    <div className="dashboard">
      <h2>Teacher Panel</h2>
      <div className="role-buttons">
        <a className="role-button" href="/teacher/post-question">Post Question</a>
        <a className="role-button" href="/teacher/view-reports">View Reports</a>
      </div>
    </div>
  );
}