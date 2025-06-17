import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeacherLogin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // You can add your actual authentication logic here

    // On successful login
    navigate('/teacher/class-select');
  };

  return (
    <div className="login-container">
      <h2>Teacher Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
