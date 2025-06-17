import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="Welcome-container">
      <h1 className="Welcome-heading">Welcome to EduVoice</h1>
      <div className="role-buttons">
        <Link className="role-button" to="/teacher/login">Teacher</Link>
        <Link className="role-button" to="/student/login">Student</Link>
        <Link className="role-button" to="/hod/login">HOD</Link>
      </div>
    </div>
  );
}
