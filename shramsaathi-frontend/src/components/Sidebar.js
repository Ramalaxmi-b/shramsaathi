// src/components/Sidebar.js
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
        <Link to="/ownerworkerslist">Owner View</Link>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
