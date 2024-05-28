import React from 'react';
import '../styles/Sidebar.css';
import { IoHome,IoSchool,IoMenu,IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

{/*import { IoHome,IoSchool,IoCashOutline,IoPerson,IoLogOut   } from "react-icons/io5";
import { IoIosPaper } from "react-icons/io"; */}

const Sidebar =() => {
        // Function to show the side navigation
    const showmenu_list = () => {
        const menu_list = document.querySelector('.menu_list');
        menu_list.style.display = 'flex';
    };

    // Function to hide the side navigation
    const hidenav_side = () => {
        const nav_side = document.querySelector('.menu_list');
        nav_side.style.display = 'none';
    };




    return(
      <div className='menu'>
        <button className='menu_icon' onClick={showmenu_list}><IoMenu/></button>
        <div className='logo'>
          <h2>Zeraki Sales</h2>
        </div> 

        <ul className='menu_list'>
            <li className='item'>
                <Link to="/"><IoHome /><span>Dashboard</span></Link>
            </li>

            <li className='item'>
                <Link to="/schools"><IoSchool /><span>Schools</span></Link>
            </li>

            {/*<li className='item'>
                <Link to="/dashboard"><IoLogOut />Logout</Link>
            </li> */}

            
        </ul>

      </div>
    );
};

export default Sidebar;