import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    workers: 0,
    districts: 0,
    workTypes: 0
  });

  useEffect(() => {
    axios.get('http://localhost:8083/api/users')
      .then((res) => {
        const users = res.data;

        const uniqueDistricts = new Set(users.map(user => user.district));
        const uniqueWorkTypes = new Set(users.map(user => user.workType));

        setStats({
          workers: users.length,
          districts: uniqueDistricts.size,
          workTypes: uniqueWorkTypes.size
        });
      })
      .catch(err => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <Card title="👷 Total Workers" value={stats.workers} />
      <Card title="🌍 Districts Covered" value={stats.districts} />
      <Card title="🛠️ Work Types" value={stats.workTypes} />
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="dashboard-card">
    <h2 className="card-title">{title}</h2>
    <p className="card-value">{value}</p>
  </div>
);

export default Dashboard;
