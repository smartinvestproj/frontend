import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import Sidebar from '../components/Sidebar.jsx';
import Heading from '../components/Heading.jsx';
import DashboardBody from '../components/DashboardBody.jsx';


function Dashboard() {

  return (
    <>
    <div className='container'>
      <Sidebar />
      <div className="content">
        <Heading/>
        <DashboardBody/>
      </div>
    </div>
    </>
  );
}

export default Dashboard;