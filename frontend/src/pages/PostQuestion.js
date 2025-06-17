import React from 'react';
export default function PostQuestion() {
  return (
    <div className="dashboard">
      <h2>Post Question</h2>
      <form className="post-form">
        <textarea placeholder="Enter your question here..."></textarea>
        <input type="datetime-local" />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}