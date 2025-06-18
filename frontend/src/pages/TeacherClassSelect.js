// src/pages/TeacherClassSelect.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TeacherClassSelect() {
  const [classes, setClasses] = useState([]);
  const [cls, setCls]         = useState('');
  const [section, setSection] = useState('');
  const [error, setError]     = useState('');
  const navigate              = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem('teacherToken');
  console.log('token:', token); // 🔍 Check this in browser console

  axios.get('/api/teacher/classes', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    console.log('Classes fetched:', res.data.assignedClasses); // ✅ Add this too
    setClasses(res.data.assignedClasses);
  })
  .catch(err => {
    console.error('Error fetching classes:', err.response?.data || err.message);
    setError('Failed to load classes');
  });
}, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cls || !section) {
      setError('Please select both class and section');
      return;
    }
    navigate('/teacher/dashboard', { state: { cls, section } });
  };

  const uniqueClasses = [...new Set(classes.map(c => c.class))];

  return (
    <div className="dashboard">
      <h2>Select Class and Section</h2>
      {error && <p className="error">{error}</p>}
      <form className="post-form" onSubmit={handleSubmit}>
        {/* Class Dropdown */}
        <select value={cls} onChange={e => setCls(e.target.value)}>
          <option value="">Select Class</option>
          {uniqueClasses.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>

        {/* Section Dropdown */}
        <select value={section} onChange={e => setSection(e.target.value)}>
          <option value="">Select Section</option>
          {classes
            .filter(c => c.class === cls)
            .map((c, i) => (
              <option key={`${c.class}-${c.section}-${i}`} value={c.section}>
                {c.section}
              </option>
            ))}
        </select>

        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
