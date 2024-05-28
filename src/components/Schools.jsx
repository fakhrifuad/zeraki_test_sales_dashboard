import React from 'react';
import '../styles/Schools.css'; 
import Footer from './Footer';
import Sidebar from './Sidebar';


const Schools = () => {
  
    return (
        <div className='schools'>
        <Sidebar />
        <div className="schools_container">
          <div className='schools_cards'>
            <div className="card">Schools</div>
            <div className="card">Schools</div>

          </div>
        </div>

      </div>
    );
  };
  
  export default Schools;