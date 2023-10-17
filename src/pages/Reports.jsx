import React from "react";
import "../components/reports/reports.css";
import PieCharts from "../components/reports/pieChart/PieCharts.jsx";
import BubbleChart from "../components/reports/bubbleChart/BubbleChart.jsx";

function Portfolio() {
  return (
    <>
    <div className="reports-container">
      <div className="row-one-charts">
        <BubbleChart />
      </div>
      <PieCharts />
    </div>
  </>
  );
}

export default Portfolio;