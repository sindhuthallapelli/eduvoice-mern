import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentLogin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // You can add actual login logic here

    // On successful login, navigate to Student Dashboard
    navigate('/student/dashboard');
  };

  return (
    <div className="dashboard">
      <h2>Student Login</h2>
      <form className="post-form" onSubmit={handleLogin}>
        <input type="text" placeholder="Student ID" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
