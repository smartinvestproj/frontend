import React, { useRef, useEffect, useState } from 'react';
import './dashboardBody.css';
import MyStocks from '../myStocks/MyStocks.jsx';
import DashboardGraph from '../../dashboard/dashboardBody/DashboardGraph.jsx';
import getStocks from '../../../services/getStocks';
import {getTrades} from '../../../services/Trades.js';

export default function DashboardBody() {
  const scrl = useRef(null);

    const slide = (shift) => {
        scrl.current.scrollLeft += shift;
    };
    const [originalStocks, setOriginalStocks] = useState([]);
    const [originalTrades, setOriginalTrades] = useState([]);

    useEffect(() => {
        async function fetchStocks() {
          try {
            const stocksResponse = await getStocks();
            const stocksData = stocksResponse.data;
            setOriginalStocks(stocksData);
          } catch (error) {
            console.error(error);
          }
        }
        fetchStocks();
    }, []);
    
    useEffect(() => {
        async function fetchTrades() {
          try {
            const tradesResponse = await getTrades();
            const tradesData = tradesResponse.data;
            setOriginalTrades(tradesData);
          } catch (error) {
            console.error(error);
          }
        }
        fetchTrades();
    }, []);

    const calculateTradeValues = (stockId) => {
      const trades = originalTrades.filter(trade => trade.stock.id === stockId);
      let totalValue = 0;
      let totalTotal = 0;
  
      trades.map(trade => {
        totalValue += parseFloat(trade.value);
        totalTotal += parseFloat(trade.total);
      });
  
      return {
        totalValue,
        totalTotal
      };
    };

    
    return(
        <>
        <div className="dashboardBody-container">
            <div className="dashboardBody-mystocks-container">
            <h3 className='my-stocks-label'>My Stocks</h3>
            <i onClick={() => slide(-150)} className='stocks-arrow-left fi fi-rr-angle-small-left'></i>
                <div ref={scrl} className="my-stocks-item">
                {originalStocks.map((stock, index) => (
                    <MyStocks key={index} 
                      symbol={stock.symbol}
                      name={stock.name}
                      total={calculateTradeValues(stock.id).totalTotal + "€"}
                      percentage={stock.percentage}
                    />
            ))}
                </div>
            </div>
                    <i onClick={() => slide(+150)} className='stocks-arrow fi fi-rr-angle-small-right'></i>
                    <DashboardGraph tradesData={originalTrades} stocksData={originalStocks}/>
        </div>
        </>
    );
}
