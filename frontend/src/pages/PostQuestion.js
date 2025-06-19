import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PostQuestion() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cls, section } = location.state || {};

  const [question, setQuestion] = useState('');
  const [deadline, setDeadline] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('teacherToken');

    try {
      const res = await axios.post(
        '/api/teacher/post-question',
        {
          questionText: question,
          
          section,
          deadline
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(res.data.message || 'Question posted!');
      setError('');
      setQuestion('');
      setDeadline('');

      // Optionally navigate back or show alert
      setTimeout(() => navigate('/teacher/dashboard', { state: { cls, section } }), 1000);

    } catch (err) {
      console.error('Post error:', err);
      setMessage('');
      setError(err.response?.data?.message || 'Failed to post question');
    }
  };

  return (
    <div className="dashboard">
      <h2>Post a Question</h2>
      <p><strong>Class:</strong> {cls} | <strong>Section:</strong> {section}</p>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <form className="post-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
