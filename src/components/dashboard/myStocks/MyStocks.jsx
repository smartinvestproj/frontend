import React from 'react';
import './myStocks.css';

export default function MyStocks({props}){
    return(
        <>
            <div className="stock-item-container">
                <div className='stock-labels-container'>
                    {console.log("+paslrkoadk" + props.name)}
                    <p className='symbol-label'>{props.symbol}</p>
                    <p className='stock-first-name'>{props.name}</p>
                </div>
                <div className="stock-values-container">
                    <p className='stock-value'></p>
                    <p className="stock-percentage"></p>
                </div>
            </div>
            <i className="divide-stock fi fi-rr-tally-1"></i>
        </>    
    );
}
