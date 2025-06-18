import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ViewReports() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cls, section } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('teacherToken');

    axios.get('/api/teacher/my-questions', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      // Filter questions by selected class and section
      const filtered = res.data.questions.filter(q => q.class === cls && q.section === section);
      setQuestions(filtered);
    })
    .catch(err => {
      console.error('Failed to fetch questions:', err);
      setError('Could not load questions.');
    });
  }, [cls, section]);

  const handleFeedback = (questionId) => {
    console.log("Navigating to feedback for:", questionId);
    navigate(`/teacher/feedback-summary/${questionId}`);
  };

  const handleChats = (questionId) => {
    navigate(`/teacher/view-chats/${questionId}`);
  };

  return (
    <div className="dashboard">
      <h2>Reports</h2>
      <p><strong>Class:</strong> {cls} | <strong>Section:</strong> {section}</p>
      {error && <p className="error">{error}</p>}

      {questions.map((q) => (
        <div className="question-card" key={q._id}>
          <p>{q.questionText}</p>
          <button onClick={() => handleFeedback(q._id)}>View Feedback</button>
          <button onClick={() => handleChats(q._id)}>View Chats</button>
        </div>
      ))}

      {questions.length === 0 && !error && (
        <p>No questions found for this class and section.</p>
      )}
    </div>
  );
}
