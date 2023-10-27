import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar.jsx";
import Heading from "./components/heading/heading.jsx";
import { StockProvider } from "./context/stockContext.jsx";
import "./index.css";

export default function App() {

    return (
        <StockProvider>
            <div className="container">
                <Sidebar />
                <div className="content">
                    <Heading />
                    <Outlet />
                </div>
            </div>
        </StockProvider>
    )
}
