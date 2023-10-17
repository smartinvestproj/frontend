import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar.jsx";

import Heading from "./components/heading/Heading.jsx";


export default function App(){
    return (
        <div className="container">
            <Sidebar />
            <div className="content">
                <Heading />
                <Outlet />
            </div>
        </div>
    )
}
