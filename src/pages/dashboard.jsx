import React, { useState } from 'react';
import '../styles/dashboard.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [theme, setTheme] = useState('light');

  const data = [
    { name: 'Jan', uv: 400, pv: 2400 },
    { name: 'Fev', uv: 300, pv: 1398 },
    { name: 'Mar', uv: 200, pv: 9800 },
    { name: 'Abr', uv: 278, pv: 3908 },
    { name: 'Mai', uv: 189, pv: 4800 },
    { name: 'Jun', uv: 239, pv: 3800 },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`dashboard ${theme}`}>
      <nav className="sidebar">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <button onClick={toggleTheme}>Light/Dark Mode</button>
      </nav>
      <main className="mainn">
        <h1>Dashboard</h1>
        <div className="chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke={theme === 'light' ? '#8884d8' : '#ccc'} />
              <Line type="monotone" dataKey="uv" stroke={theme === 'light' ? '#82ca9d' : '#ccc'} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;