import React, { useState } from "react";
import "../components/reports/reports.css";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import PieCharts from "../components/reports/PieCharts.jsx";
import Heading from "../components/heading/Heading.jsx";

function Portfolio() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Heading />
        <PieCharts />
      </div>
    </div>
  );
}

export default Portfolio;