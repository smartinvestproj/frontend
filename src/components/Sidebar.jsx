import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import logo from '../assets/logo.png';
import '../styles/components-styles/sidebar.css'

function Sidebar(){

  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  
  

return(
      <div className='sidebar'>
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
    <div className='sidebar-ul'>
    <Link to="/" className='sidebar-li'><li><i className="fi fi-rr-apps"></i>Dashboard</li></Link>
      <li onClick={toggleCollapse}><i className="fi fi-rr-wallet"></i>Portfolio
        <div className={`collapse-arrow ${isCollapsed ? 'collapsed' : ''}`}>
          <i className={`${isCollapsed ? 'fi fi-rr-angle-small-right' : 'fi fi-rr-angle-small-down'}`}></i>
        </div></li>
      {isCollapsed ? null : (
          <div className='collapse-portfolio'>
            <li>
              <Link to="portfolio">Portfolio</Link>
            </li>
            <li><a href="#">Stock management</a></li>
            <li><a href="#">Reports</a></li>
          </div>
        )}
    <li><i className="fi fi-rr-document"></i>News</li>
    <li><i className="fi fi-rr-heart"></i>Watchlist</li>
    </div>
      <div className='settings-sidebar hithere'>
        <li><a className='settings-sidebar-li' href="#"><i className="fi fi-rr-settings elastic-spin"></i>Settings</a></li>
      </div>
      </div>

  );
}

export default Sidebar;