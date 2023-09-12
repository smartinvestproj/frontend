import React, { useState } from 'react';
import logo from '../assets/logo.png';
import '../styles/components-styles/sidebar.css'

function Sidebar(){

    const [theme, setTheme] = useState('dark');
    theme === 'dark';
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
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
          <li><i className="fi fi-rr-apps"></i>Dashboard</li>
          <li><i className="fi fi-rr-wallet"></i>Portfolio</li>
          <li><i className="fi fi-rr-document"></i>News</li>
          <li><i className="fi fi-rr-heart"></i>Watchlist</li>
        </ul>
        <div className='settings-sidebar'>
          <ul className='settings-sidebar'>
            <li><i className="fi fi-rr-settings"></i>Settings</li>
          </ul>
        </div>
        <button onClick={toggleTheme}>Light/Dark Mode</button>
      </nav>
    </div>
    );
}

export default Sidebar;