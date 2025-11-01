


// import axios from "axios";
// import { useEffect, useState } from "react";
// import './OwnerWorkersList.css';

// function OwnerWorkersList() {
//   const [workers, setWorkers] = useState([]);
//   const [filters, setFilters] = useState({
//     district: "",
//     workType: "",
//   });

//   useEffect(() => {
//     fetchAllWorkers();
//   }, []);

//   const fetchAllWorkers = async () => {
//     try {
//       const res = await axios.get("http://localhost:8083/api/users");
//       setWorkers(res.data);
//     } catch (err) {
//       console.error("Error fetching workers:", err);
//     }
//   };

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const applyFilters = async () => {
//     try {
//       const res = await axios.get("http://localhost:8083/api/users/search", {
//         params: {
//           district: filters.district,
//           workType: filters.workType,
//         },
//       });
//       setWorkers(res.data);
//     } catch (err) {
//       console.error("Error applying filters:", err);
//     }
//   };

//   return (
//     <div className="owner-workers-container">
//       <div className="owner-workers-header">
//         <h2>Registered Workers</h2>
//       </div>

//       <div className="filters">
//         <input
//           type="text"
//           name="district"
//           value={filters.district}
//           onChange={handleFilterChange}
//           placeholder="District"
//         />
//         <input
//           type="text"
//           name="workType"
//           value={filters.workType}
//           onChange={handleFilterChange}
//           placeholder="Work Type"
//         />
//         <button className="apply-filter-btn" onClick={applyFilters}>
//           Apply Filters
//         </button>
//       </div>

//       <div className="workers-grid">
//         {workers.length === 0 ? (
//           <p className="no-workers">No workers found.</p>
//         ) : (
//           workers.map((w, i) => (
//             <div key={i} className="worker-card">
//               <div className="worker-name">{w.name}</div>
//               <div className="worker-details">
//                 <span>District: {w.district}</span>
//                 <span>Work Type: {w.workType}</span>
//                 <span>Experience: {w.experience} years</span>
//                 <span>Age: {w.age}</span>
//                 <span>Pincode: {w.pincode}</span>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default OwnerWorkersList;

import axios from "axios";
import { useEffect, useState } from "react";
import './OwnerWorkersList.css';

function OwnerWorkersList() {
  const [workers, setWorkers] = useState([]);
  const [filters, setFilters] = useState({
    district: "",
    workType: "",
    minAge: "",
    maxAge: "",
    minExperience: "",
    maxExperience: "",
  });

  useEffect(() => {
    fetchAllWorkers();
  }, []);

  const fetchAllWorkers = async () => {
    try {
      const res = await axios.get("http://localhost:8083/api/users");
      setWorkers(res.data);
    } catch (err) {
      console.error("Error fetching workers:", err);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = async () => {
    try {
      const res = await axios.get("http://localhost:8083/api/users/search", {
        params: {
          district: filters.district,
          workType: filters.workType,
          minAge: filters.minAge,
          maxAge: filters.maxAge,
          minExperience: filters.minExperience,
          maxExperience: filters.maxExperience,
        },
      });
      setWorkers(res.data);
    } catch (err) {
      console.error("Error applying filters:", err);
    }
  };

  return (
    <div className="owner-workers-container">
      <div className="owner-workers-header">
        <h2>Registered Workers</h2>
      </div>

      <div className="filters">
        <input
          type="text"
          name="district"
          value={filters.district}
          onChange={handleFilterChange}
          placeholder="District"
        />
        <input
          type="text"
          name="workType"
          value={filters.workType}
          onChange={handleFilterChange}
          placeholder="Work Type"
        />
        <input
          type="number"
          name="minAge"
          value={filters.minAge}
          onChange={handleFilterChange}
          placeholder="Min Age"
        />
        <input
          type="number"
          name="maxAge"
          value={filters.maxAge}
          onChange={handleFilterChange}
          placeholder="Max Age"
        />
        <input
          type="number"
          name="minExperience"
          value={filters.minExperience}
          onChange={handleFilterChange}
          placeholder="Min Experience"
        />
        <input
          type="number"
          name="maxExperience"
          value={filters.maxExperience}
          onChange={handleFilterChange}
          placeholder="Max Experience"
        />

        <button className="apply-filter-btn" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>

      <div className="workers-grid">
        {workers.length === 0 ? (
          <p className="no-workers">No workers found.</p>
        ) : (
          workers.map((w, i) => (
            <div key={i} className="worker-card">
              <div className="worker-name">{w.name}</div>
              <div className="worker-details">
                <span>District: {w.district}</span>
                <span>Work Type: {w.workType}</span>
                <span>Experience: {w.experience} years</span>
                <span>Age: {w.age}</span>
                <span>Pincode: {w.pincode}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OwnerWorkersList;
