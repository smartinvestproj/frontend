import React from 'react';
import './myStocks.css';

function MyStocks(){
    return(
        <>
            <div className="stock-item-container">
                <div className='stock-labels-container'>
                    <p className='symbol-label'>META</p>
                    <p className='stock-first-name'>META</p>
                </div>
                <div className="stock-values-container">
                    <p className='stock-value'>€312,94</p>
                    <p className="stock-percentage">-9,63%</p>
                </div>
            </div>
            <i className="divide-stock fi fi-rr-tally-1"></i>
        </>    
    );
}

export default MyStocks;