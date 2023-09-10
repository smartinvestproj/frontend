import React, { useState } from 'react';
import logo from '../assets/logo.png';
import Heading from './Heading.jsx';

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
        <div className='totalInvestment-box-container pulse'>
          <div>
            <h3 className='totalInvestment-box-name'>Total Investment</h3>
          </div>
          <div className='totalInvestment-box-values'>
            <p>4564,55€</p>
            <p className='totalInvest-box-percentage'>+12,78%</p>
          </div>
        </div>
        <ul>
          <li className='pulse'><i className="fi fi-rr-apps"></i>Dashboard</li>
          <li className='pulse'><i className="fi fi-rr-wallet"></i>Portfolio</li>
          <li className='pulse'><i className="fi fi-rr-document"></i>News</li>
        </ul>
        <div className='settings-sidebar'>
          <ul className='settings-sidebar hithere'>
            <li><i className="fi fi-rr-settings elastic-spin"></i>Settings</li>
          </ul>
        </div>
        <button onClick={toggleTheme}>Light/Dark Mode</button>
      </nav>
      <main className='main'>
        <Heading/>
      </main>
    </div>
    );
}

export default Sidebar;