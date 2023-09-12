import React, { useState } from 'react';
import logo from '../assets/logo.png';
import '../styles/components-styles/sidebar.css'
import Heading from './Heading.jsx';

function Sidebar(){

    const [theme, setTheme] = useState('dark');
    theme === 'dark';
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      };

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(!open);
    };

    return(
        <div className={`dashboard ${theme}`}>
      <nav className={`sidebar`}>
        <div className='sidebar-img'>
          <img className='sidebar-img' src={logo} alt="logo" />
        </div>
        <div className='totalInvestment-box-container'>
          <div>
            <h3 className='totalInvestment-box-name'>Total Investment</h3>
          </div>
          <div className='totalInvestment-box-values'>
            <p>4564,55€</p>
            <p className='totalInvest-box-percentage'>+12,78%</p>
          </div>
        </div>
        <ul>
          <li className=''><i className="fi fi-rr-apps"></i>Dashboard</li>
          <li onClick={handleOpen} className='dropdown'><i className="fi fi-rr-wallet"></i>Portfolio
          {open ? (
        <ul className="menu">
          <li className="menu-item">
            <a href="#">Portfolio Overview</a>
          </li>
          <li className="menu-item">
            <a href="#">Stock management</a>
          </li>
          <li className="menu-item">
            <a href="#">Reports</a>
          </li>
        </ul>
      ) : null}
          </li>
          <li className=''><i className="fi fi-rr-document"></i>News</li>
          <li className=''><i className=""></i>Watchlist</li>
        </ul>
        <div className='settings-sidebar'>
          <ul className='settings-sidebar hithere'>
            <li><i className="fi fi-rr-settings elastic-spin"></i>Settings</li>
          </ul>
        </div>
        <button onClick={toggleTheme}>Light/Dark Mode</button>
      </nav>
      <Heading/>
    </div>
    );
}

export default Sidebar;