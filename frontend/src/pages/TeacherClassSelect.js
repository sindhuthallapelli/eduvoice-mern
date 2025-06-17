import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeacherClassSelect() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can store class/section in state or context if needed

    // Redirect to Teacher Dashboard
    navigate('/teacher/dashboard');
  };

  return (
    <div className="dashboard">
      <h2>Select Class and Section</h2>
      <form className="post-form" onSubmit={handleSubmit}>
        <select required>
          <option value="">Select Class</option>
          <option value="A">Class A</option>
          <option value="B">Class B</option>
        </select>
        <select required>
          <option value="">Select Section</option>
          <option value="1">Section 1</option>
          <option value="2">Section 2</option>
        </select>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
