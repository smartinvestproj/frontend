import React from "react";
import "../components/reports/reports.css";
import PieCharts from "../components/reports/pieChart/PieCharts.jsx";
import BubbleChart from "../components/reports/bubbleChart/BubbleChart.jsx";
import BarChart from "../components/reports/barChart/BarChart";

function Portfolio() {
  return (
    <>
    <div className="reports-container">
      <div className="row-one-charts">
        <BubbleChart />
      </div >
      <div className="row-two-charts">
        <BarChart />
        <PieCharts />
      </div>
    </div>
  </>
  );
}

export default Portfolio;