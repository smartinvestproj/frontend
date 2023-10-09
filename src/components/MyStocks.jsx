import React, { useState, useEffect } from "react";
import '../styles/components-styles/myStocks.css';
import getStocks from "../services/getStocks";
import getTrades from "../services/getTrades";

function MyStocks(){
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
            {originalStocks.map((stock, index) => (
                <div key={index} className="stock-item-container">
                    <div className='stock-labels-container'>
                        <p className='symbol-label'>{stock.symbol}</p>
                        <p className='stock-first-name'>{stock.name}</p>
                    </div>
                    <div className="stock-values-container">
                      {calculateTradeValues(stock.id) && (
                        <p className='stock-value'>
                          {calculateTradeValues(stock.id).totalTotal + "€"}
                        </p>
                      )}
                        <p className="stock-percentage">{stock.percentage}%</p>
                    </div>
                </div>
            ))}
            <i className="divide-stock fi fi-rr-tally-1"></i>
        </>    
    );
}

export default MyStocks;