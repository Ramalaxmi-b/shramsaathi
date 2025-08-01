// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RegisterWorker from './pages/RegisterWorker';
import SearchWorker from './pages/SearchWorker';
import Layout from './components/Layout';
import NearbyJobs from './pages/NearbyJobs';

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<RegisterWorker />} />
        <Route path="/search" element={<SearchWorker />} />
        <Route path="/jobs" element={<NearbyJobs />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
