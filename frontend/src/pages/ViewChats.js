// src/pages/ViewChats.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewChats() {
  const { questionId } = useParams();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('teacherToken');
    axios.get(`/api/teacher/view-chats/${questionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setComments(res.data.comments))
    .catch(err => {
      console.error('Error fetching chats:', err);
      setError('Failed to load chat messages.');
    });
  }, [questionId]);

  return (
    <div className="dashboard">
      <h2>Anonymous Student Chats</h2>
      {error && <p className="error">{error}</p>}

      {comments.length > 0 ? (
        <ul className="chat-list">
          {comments.map((chat, idx) => (
            <li key={idx}>{chat}</li>
          ))}
        </ul>
      ) : (
        <p>No student comments submitted for this question.</p>
      )}
    </div>
  );
}
