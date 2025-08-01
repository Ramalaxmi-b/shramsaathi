// src/pages/NearbyJobs.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NearbyJobs.css';

const NearbyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [district, setDistrict] = useState('');
  const [workType, setWorkType] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8083/api/jobs')
      .then((res) => {
        setJobs(res.data);
        setFilteredJobs(res.data);
      })
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  const handleSearch = () => {
    if (!district && !workType) {
      setFilteredJobs(jobs);
      return;
    }

    axios.get(`http://localhost:8083/api/jobs/search`, {
      params: { district, workType }
    })
      .then((res) => {
        setFilteredJobs(res.data);
      })
      .catch(err => console.error("Search failed:", err));
  };

  return (
    <div className="nearby-jobs-container">
      <h1 className="title">Nearby Job Listings</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Enter District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Enter Work Type"
          value={workType}
          onChange={(e) => setWorkType(e.target.value)}
          className="input"
        />
        <button onClick={handleSearch} className="search-button">
          🔍 Search Jobs
        </button>
      </div>

      <div className="job-list">
        {filteredJobs.length === 0 ? (
          <p className="no-results">No jobs found for selected criteria.</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h2 className="job-title">{job.title}</h2>
              <p className="job-description">{job.description}</p>
              <div className="job-details">
                <p><strong>District:</strong> {job.district}</p>
                <p><strong>Work Type:</strong> {job.workType}</p>
                <p><strong>Contact:</strong> {job.contactPerson} - {job.phone}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NearbyJobs;
