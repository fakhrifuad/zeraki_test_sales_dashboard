import React from 'react';
import '../styles/Home.css'; 
import Footer from './Footer';
import Sidebar from './Sidebar';


const Home = () => {
  
    return (
      <div className='dashboard'>
        <Sidebar />
        <div className='dashboard_items'>
          <h1>DASHBOARD</h1>
        </div>

        <Footer />

      </div>
    );
  };
  
  export default Home;