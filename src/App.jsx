import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard.jsx";
import Portfolio from "./pages/portfolio.jsx";
import StockManagement from "./pages/StockManagement.jsx";
import StockTradeForm from "./components/testAPI_POST.jsx";
import StockTable from "./components/testAPI_GET.jsx";
import Login from "./pages/Login.jsx";

function App(){
  
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/portfolio" element={<Portfolio/>}/>
                <Route path="/stockManagement" element={<StockManagement/>}/>
                {/* <Route path="/stockManagement" element={<StockTradeForm/>}/> */}
                {/* <Route path="/stockManagement" element={<StockTable />}/> */}
            </Routes>
        </BrowserRouter>
        
    )
}

export default App;