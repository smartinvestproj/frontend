import React, { useEffect, useState } from 'react';
import '../styles/components-styles/dashboardBody.css';
import MyStocks from './MyStocks';

function DashboardBody(){

    return(
        <>
        <div className="dashboardBody-container">
            <div className="dashboardBody-mystocks-container">
            <h3 className='my-stocks-label'>My Stocks</h3>
                <div className="my-stocks-item">
                    <MyStocks />
                    <MyStocks />
                    <MyStocks />
                    <MyStocks />
                    <MyStocks />
                    <MyStocks />
                    <MyStocks />
                    <MyStocks />
                    <MyStocks />
                    <MyStocks />
                    
                <i className='stocks-arrow fi fi-rr-angle-small-right'></i>
                </div>
            </div>
        </div>
        </>
    );
}

export default DashboardBody;