import React, { useState } from "react";
import "../components/reports/reports.css";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import PieCharts from "../components/reports/pieChart/PieCharts.jsx";
import Heading from "../components/heading/Heading.jsx";
import BubbleChart from "../components/reports/bubbleChart/BubbleChart.jsx";

function Portfolio() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Heading />
        <div className="reports-container">
          <div className="row-one-charts">
          <BubbleChart/>
          </div>
          <PieCharts />
        </div>
      </div>
    </div>
  );
}

export default Portfolio;