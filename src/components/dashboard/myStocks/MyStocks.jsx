import React from 'react';
import './myStocks.css';

export default function MyStocks({symbol, name, total}){

    return(
        <>
            <div className="stock-item-container">
                <div className='stock-labels-container'>
                    <p className='symbol-label'>{symbol}</p>
                    <p className='stock-first-name'>{name}</p>
                </div>
                <div className="stock-values-container">
                    <p className='stock-value'>
                        {total}
                    </p>
                </div>
            </div>
        <i className="divide-stock fi fi-rr-tally-1"></i>
        </>    
    );
}