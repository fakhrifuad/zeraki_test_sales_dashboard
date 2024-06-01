import React from 'react';
import '../styles/Sidebar.css';
import { IoHome, IoSchool, IoMenu, IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    
    // Function to show the side navigation
  const showmenu = () => {

    const menu_list = document.querySelector('menu_list');
    const menu_icon = document.querySelector('menu_icon');
    const close_icon = document.querySelector('.close_icon');
    menu_list.style.display = 'flex';
    menu_icon.style.display = 'none';
    close_icon.style.display = 'flex';


  };

  // Function to hide the side navigation
  const hidemenu = () => {
    const menu = document.querySelector('menu');
    const menu_icon = document.querySelector('.menu_icon');
    const close_icon = document.querySelector('.close_icon');
    menu.style.display = 'none';
    menu_icon.style.display = 'flex';
    close_icon.style.display = 'none';


  };

    return (
        <div >
            
            <div className='menu'>
                <div className='logo'>
                    <h2>Zeraki</h2><span>Sales</span>
                </div>
                <button className='menu_icon' onClick={showmenu}><IoMenu /></button>
                <button className='close_icon' onClick={hidemenu}><IoClose /></button>
                <ul className='menu_list'>
                    <li className='item'>
                        <Link to="/" className='text_link'><IoHome /><span>Dashboard</span></Link>
                    </li>
                    <li className='item'>
                        <Link to="/schools" className='text_link'><IoSchool /><span>Schools</span></Link>
                    </li>
                </ul>
            </div>



            
        </div>
    );
};

export default Sidebar;
