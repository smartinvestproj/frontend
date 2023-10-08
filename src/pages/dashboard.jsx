import React, {useEffect, useState} from 'react';
import '../components/dashboard/dashboard.css';
import Sidebar from '../components/sidebar/Sidebar.jsx';
import Heading from '../components/heading/Heading.jsx';
import DashboardBody from '../components/dashboard/dashboardBody/DashboardBody.jsx';


function Dashboard() {
  
  return (
    <div className='container'>
      <Sidebar/>
      <div className="content">
        <Heading/>
        <DashboardBody/>
      </div>
    </div>
  );
}

export default Dashboard;