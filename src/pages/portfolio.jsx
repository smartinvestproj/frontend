import React, { useState } from "react";
import "../styles/portfolio.css";
import Sidebar from "../components/Sidebar.jsx";
import PortfolioPage from "../components/PortfolioPage";
import Heading from "../components/Heading";

function Portfolio() {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Heading />
        <PortfolioPage />
      </div>
    </div>
  );
}

export default Portfolio;
