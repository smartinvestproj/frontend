import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import './sidebar.css'

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
      <Link to="/"><li><i className="fi fi-rr-apps"></i>Dashboard</li></Link>
      <li>
        <Link to="/portfolio" className='sidebar-li'><i className="fi fi-rr-wallet"></i>Portfolio</Link>
      </li>
      <li>
          <Link to="/stockManagement" className='sidebar-li'><i clasName="fi fi-rr-money-check-edit"></i>Stock management</Link>
      </li>
      <li>
          <Link to="/reports" className='sidebar-li'><i className="fi fi-rr-document"></i>Reports</Link>
      </li>
    </div>
      <div className='settings-sidebar hithere'>
        <li><a className='settings-sidebar-li' href="#"><i className="fi fi-rr-settings elastic-spin"></i>Settings</a></li>
      </div>
      </div>

  );
}

export default Sidebar;