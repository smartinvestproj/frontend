import React, { useState } from "react";
import "../components/portfolio/portfolio.css";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import PortfolioTable from "../components/portfolio/portfolioTable"
import Heading from "../components/heading/Heading.jsx";

function Portfolio() {
  return (
    <>
      <PortfolioTable />
    </>
  );
}

export default Portfolio;