import React from 'react';
import '../styles/Dashboard.css'; 
import Footer from './Footer';
import Sidebar from './Sidebar';


const Dashboard = () => {
  
    return (
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard_container">
          <div className='dashboard_cards'>
            <div className="card">Total Revenue</div>
            <div className="card">Collections</div>
            <div className="card">Sign-ups</div>
            <div className="card">Bounced Cheques</div>

          </div>
        </div>

      </div>
    );
  };
  
  export default Dashboard;