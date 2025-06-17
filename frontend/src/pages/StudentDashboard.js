import React from 'react';
export default function StudentDashboard() {
  return (
    <div className="dashboard">
      <h2>Answer the Question</h2>
      <div className="question-card">
        <p>How was today’s session?</p>
        <div className="options">
          <button>Good</button>
          <button>Better</button>
          <button>Interactive</button>
          <button>Lack of Interest</button>
        </div>
        <textarea placeholder="Any suggestions? (optional)" className="suggestion-box"></textarea>
        <button className="submit-button">Submit Feedback</button>
      </div>
    </div>
  );
}