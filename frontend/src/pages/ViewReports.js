import React from 'react';
export default function ViewReports() {
  return (
    <div className="dashboard">
      <h2>Previous Questions</h2>
      <div className="question-card">
        <p>How engaging was today’s class?</p>
        <button>View Feedback</button>
        <button>View Chats</button>
      </div>
      <div className="question-card">
        <p>Were you able to follow the topic?</p>
        <button>View Feedback</button>
        <button>View Chats</button>
      </div>
    </div>
  );
} 
