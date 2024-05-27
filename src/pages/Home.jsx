import React from 'react';
import '../styles/Home.css'; 
import Footer from './Footer';


const Home = () => {
  
    return (
      <div>
        {/*

        <div className="header-container">
           Reuse the Header component with specific site title and links 
          <Header links={homePageLinks} />
        </div>
        */}
        <div>
          <h1>DASHBOARD</h1>
          <p>good morning</p>
        </div>

        <Footer />

      </div>
    );
  };
  
  export default Home;