import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentDashboard() {
  const [question, setQuestion] = useState(null);
  const [response, setResponse] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    if (!token) return;

    axios.get('/api/student/questions', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data.questions && res.data.questions.length > 0) {
        setQuestion(res.data.questions[0]); // pick latest
      }
    })
    .catch(err => {
      console.error('Failed to fetch question', err);
      setError('No question found or login expired.');
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!response || !question?._id) {
      setError('Please select an option.');
      return;
    }

    try {
      const token = localStorage.getItem('studentToken');

      const res = await axios.post('/api/student/submit-feedback', {
        questionId: question._id,
        response,
        comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSubmitted(true);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting feedback');
    }
  };

  return (
    <div className="dashboard">
      <h2>Answer the Question</h2>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      {question && !submitted && (
        <form onSubmit={handleSubmit} className="question-card">
          <p>{question.questionText}</p>
          <div className="options">
            {['Good', 'Better', 'Interactive', 'Lack of Interest'].map(option => (
              <button
                key={option}
                type="button"
                className={response === option ? 'selected' : ''}
                onClick={() => setResponse(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <textarea
            placeholder="Any suggestions? (optional)"
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="suggestion-box"
          />
          <button className="submit-button" type="submit">Submit Feedback</button>
        </form>
      )}

      {submitted && <p>You have already submitted feedback for this question.</p>}
    </div>
  );
}
