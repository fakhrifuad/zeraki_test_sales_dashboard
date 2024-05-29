import React from 'react';
import '../styles/Sidebar.css';
import { IoHome,IoSchool,IoMenu,IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

{/*import { IoHome,IoSchool,IoCashOutline,IoPerson,IoLogOut   } from "react-icons/io5";
import { IoIosPaper } from "react-icons/io"; */}

const Sidebar =() => {
        // Function to show the side navigation
    const showmenu_list = () => {
        const close_icon = document.querySelector('close_icon');
        const menu_list = document.querySelector('.menu_list');
        menu_list.style.display = 'flex';
        close_icon.style.display = 'flex';
    };

    // Function to hide the side navigation
    const hidemenu_list = () => {
        const menu_list = document.querySelector('.menu_list');
        const menu_item_span = document.querySelector('.menu_list .item span');
        menu_list.style.display = 'none';
        menu_item_span.style.display = 'none';
    };




    return(
      <div className='menu'>
        <button className='menu_icon' onClick={showmenu_list}><IoMenu/></button>
        <button className='close_icon' onClick={hidemenu_list}><IoClose/></button>

        <div className='logo'>
          <h2>Zeraki</h2><span>Sales</span>
        </div> 

        <ul className='menu_list'>
            <li className='item'>
                <Link to="/" className='text_link'><IoHome /><span>Dashboard</span></Link>
            </li>

            <li className='item'>
                <Link to="/schools" className='text_link'><IoSchool /><span>Schools</span></Link>
            </li>

            {/*<li className='item'>
                <Link to="/dashboard"><IoLogOut />Logout</Link>
            </li> */}

            
        </ul>

      </div>
    );
};

export default Sidebar;