import React from 'react';
import '../styles/Sidebar.css';

const Sidebar =() => {
    return(
      <div className='menu'>
        <div className='logo'>
          <h2>Zeraki Sales</h2>
        </div> 

        <div className='menu_list'>
            <a href='#' className='item'>
                Dashboard
            </a>

            <a href='#' className='item'>
                Schools
            </a>

            <a href='#' className='item'>
                Invoices
            </a>

            <a href='#' className='item'>
                Collections
            </a>

            <a href='#' className='item'>
                Account
            </a>

            <a href='#' className='item'>
                Logout
            </a>
        </div>
      </div>
    );
};

export default Sidebar;