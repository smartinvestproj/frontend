import React, { useState } from "react";
import "../components/portfolio/portfolio.css";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import Body from "../components/dashboard/dashboardBody/DashboardGraph.jsx";
import Heading from "../components/heading/Heading.jsx";

function Portfolio() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Heading />
        <Body />
      </div>
    </div>
  );
}

export default Portfolio;