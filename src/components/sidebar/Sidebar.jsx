import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import './sidebar.css'
import getCapitals from '../../services/getCapitals.jsx';
import CapitalModal from './CapitalModal/CapitalModal.jsx';


function Sidebar(){

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const value = getCapitals();

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }
  
return(
      <div className='sidebar'>
        <div className='sidebar-img'>
          <img className='sidebar-img' src={logo} alt="logo" />
        </div>
        <div onClick={openModal} className='totalInvestment-box-container'>
      <div>
        <h3 className='totalInvestment-box-name'>Total Own Capital</h3>
        
      </div>
      <div className='totalInvestment-box-values'>
        <p>{value}€</p>
      </div>
    </div>
    <div className='sidebar-ul'>
      <Link to="/"><li><i className="fi fi-rr-apps"></i>Dashboard</li></Link>
      <li>
        <Link to="/portfolio" className='sidebar-li'><i className="fi fi-rr-wallet"></i>Portfolio</Link>
      </li>
      <li>
          <Link to="/stockManagement" className='sidebar-li'><i className="fi fi-rr-money-check-edit"></i>Stock management</Link>
      </li>
      <li>
          <Link to="/reports" className='sidebar-li'><i className="fi fi-rr-document"></i>Reports</Link>
      </li>
    </div>
      <div className='settings-sidebar hithere'>
        <li>
          <Link to="/settings" className='settings-sidebar-li'><i className="fi fi-rr-settings"></i>Settings</Link></li>
      </div>
      {modalIsOpen && <CapitalModal closeModal={closeModal} openModal={openModal} />}
    </div>

  );
}

export default Sidebar;