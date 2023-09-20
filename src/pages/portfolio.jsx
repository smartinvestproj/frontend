import React, { useState } from "react";
import "../styles/portfolio.css";
import Sidebar from "../components/Sidebar.jsx";
import Body from "../components/PortfolioBody.jsx";
import Heading from "../components/Heading.jsx";

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