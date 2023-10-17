import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Heading from "./components/heading/Heading.jsx";
import { StockProvider } from "./context/stockContext.jsx";




function App() {

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

export default App;