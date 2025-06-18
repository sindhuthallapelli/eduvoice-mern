// src/pages/ViewFeedback.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewFeedback() {
  const { questionId } = useParams();
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('teacherToken');
    axios.get(`/api/teacher/feedback-summary/${questionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setSummary(res.data))
    .catch(err => {
      console.error('Error loading feedback summary:', err);
      setError('Failed to load feedback summary');
    });
  }, [questionId]);

  return (
    <div className="dashboard">
      <h2>Feedback Summary</h2>
      {error && <p className="error">{error}</p>}

      {summary && (
        <div>
          <p><strong>Total Responses:</strong> {summary.total}</p>
          <ul>
            {Object.entries(summary.summary).map(([option, percent]) => (
              <li key={option}><strong>{option}:</strong> {percent}%</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
