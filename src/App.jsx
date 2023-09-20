import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard.jsx";
import Portfolio from "./pages/portfolio.jsx";

function App(){
  
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="portfolio" element={<Portfolio/>}/>
            </Routes>
        </BrowserRouter>
        
    )
}

export default App;