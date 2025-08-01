// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => (
  <aside className="sidebar">
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/register">Register Worker</Link></li>
        <li><Link to="/search">Search Worker</Link></li>
        <li><Link to="/jobs">Nearby Jobs</Link></li>

      </ul>
    </nav>
  </aside>
);

export default Sidebar;
