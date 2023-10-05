import React, { useRef } from 'react';
import './dashboardBody.css';
import MyStocks from '../myStocks/MyStocks.jsx';
import DashboardGraph from '../../dashboard/dashboardBody/DashboardGraph.jsx'

function DashboardBody(){
    const scrl = useRef(null);

    const slide = (shift) => {
        scrl.current.scrollLeft += shift;
    };

    
    return(
        <>
        <div className="dashboardBody-container">
            <div className="dashboardBody-mystocks-container">
            <h3 className='my-stocks-label'>My Stocks</h3>
            <i onClick={() => slide(-150)} className='stocks-arrow-left fi fi-rr-angle-small-left'></i>
                <div ref={scrl} className="my-stocks-item">
                    <MyStocks/>
                    <MyStocks/>
                    <MyStocks/>
                    <MyStocks/>
                    <MyStocks/>
                    <MyStocks/>
                    <MyStocks/>
                    <MyStocks/>
                    <MyStocks/>
                    <MyStocks/>
                    
                </div>
            </div>
                    <i onClick={() => slide(+150)} className='stocks-arrow fi fi-rr-angle-small-right'></i>
            <DashboardGraph />
        </div>
        </>
    );
}

export default DashboardBody;