import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure your arcade CSS is in this file

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ subject: '', topic: '', study_date: '' });
  const API_URL = 'https://musical-disco-69qggg764prwh5r56-3000.app.github.dev/tasks';

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data || []);
    } catch (err) { console.error("Fetch error:", err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, is_completed: false }),
    });
    setFormData({ subject: '', topic: '', study_date: '' });
    fetchTasks();
  };

  const handleDone = async (task) => {
    await fetch(`${API_URL}/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_completed: true }),
    });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  const activeTasks = tasks.filter(t => !t.is_completed);
  const completedTasks = tasks.filter(t => t.is_completed);

  return (
    /* Added 'container' class */
    <div className="container" style={{ padding: '40px', minHeight: '100vh' }}>
      <div className="App">
        <h1>🕹️ Study n GO Arcade</h1>
        
        {/* Added 'input-section' class */}
        <div className="input-section">
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <input placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} required style={inputStyle} />
            <input placeholder="Topic" value={formData.topic} onChange={(e) => setFormData({...formData, topic: e.target.value})} required style={inputStyle} />
            <input type="date" value={formData.study_date} onChange={(e) => setFormData({...formData, study_date: e.target.value})} required style={inputStyle} />
            {/* Added 'add-btn' class */}
            <button type="submit" className="add-btn" style={btnStyle}>Insert Coin</button>
          </form>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left' }}>
          {/* Active Section */}
          <section>
            <h2>📅 Active Levels</h2>
            {activeTasks.map(task => (
              /* Added 'list-item' class */
              <div key={task.id} className="list-item" style={cardStyle}>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.1rem', color: '#ffcc00' }}>{task.subject}</strong>
                  <span style={{ color: '#fff' }}>{task.topic}</span>
                  <div style={{ fontSize: '0.8rem', marginTop: '5px', color: '#61dafb' }}>{task.study_date}</div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {/* Added 'done-btn' and 'cancel-btn' classes */}
                  <button onClick={() => handleDone(task)} className="done-btn" style={actionBtn}>Done</button>
                  <button onClick={() => handleDelete(task.id)} className="cancel-btn" style={actionBtn}>Exit</button>
                </div>
              </div>
            ))}
          </section>

          {/* History Section */}
          <section>
            <h2>🏆 High Scores</h2>
            {completedTasks.map(task => (
              /* Added 'list-item' class */
              <div key={task.id} className="list-item" style={{ ...cardStyle, opacity: 0.7, borderLeft: '5px solid #34a853' }}>
                <span style={{ textDecoration: 'line-through' }}>{task.subject}: {task.topic}</span>
                <span style={{ fontSize: '0.8rem' }}>✔️ CLEARED</span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #444', flex: '1', minWidth: '150px' };
const btnStyle = { padding: '12px 24px', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const cardStyle = { padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' };
const actionBtn = { 
  border: 'none', 
  color: 'white', 
  padding: '8px 14px', 
  borderRadius: '6px', 
  cursor: 'pointer',  
  fontSize: '0.85rem',
  fontWeight: 'bold',
  pointerEvents: 'auto', 
  zIndex: 10            
};

export default App;