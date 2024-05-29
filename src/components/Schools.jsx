// src/components/Schools.jsx

import React, { useEffect, useState } from 'react';
import { fetchSchools } from '../services/dataService';
import Footer from './Footer';
import Sidebar from './Sidebar';
import '../styles/Schools.css';

const Schools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const getSchools = async () => {
      const schoolsData = await fetchSchools();
      setSchools(schoolsData);
    };

    getSchools();
  }, []);

  return (
    <div className="schools-container">
      <Sidebar />
      <div className="schools-content">
        <h1>Schools</h1>
        <table className="schools-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>County</th>
              <th>Contact</th>
              <th>Products</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.map(school => (
              <tr key={school.id}>
                <td>{school.name}</td>
                <td>{school.type}</td>
                <td>{school.county}</td>
                <td>{school.contactInfo}</td>
                <td>{school.products.join(', ')}</td>
                <td>${school.balance}</td>
                <td><a href={`/schools/${school.id}`}>View Details</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Schools;
