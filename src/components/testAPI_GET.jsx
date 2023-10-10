import React, { useEffect, useState } from 'react';
import getStocks from '../services/getStocks.jsx';
import getTrades from '../services/getTrades.jsx';

function StockTable() {
  const [stocks, setStocks] = useState([]);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const stockResponse = await getStocks();
        const tradeResponse = await getTrades();

        const stockData = stockResponse.data;
        const tradeData = tradeResponse.data;

        setStocks(stockData);
        setTrades(tradeData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const [expandedStockRows, setExpandedStockRows] = useState([]);

  const toggleStockVisibility = (stockId) => {
    console.log(stockId);
    setExpandedStockRows((prevExpandedRows) => {
      if (prevExpandedRows.includes(stockId)) {
        // Remove the item ID if it's already expanded
        return prevExpandedRows.filter((id) => id !== stockId);
      } else {
        // Add the item ID if it's not expanded
        return [...prevExpandedRows, stockId];
      }
    });
  };

  return (
    <div>
      <h1>Stocks and Trades</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Currency</th>
            <th>Trade State</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <React.Fragment key={stock.id}>
              <tr>
                <td>{stock.id}</td>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>{stock.currency}</td>
                <td>
                  <button onClick={() => toggleStockVisibility(stock.id)}>
                    {expandedStockRows.includes(stock.id) ? 'Hide Trades' : 'Show Trades'}
                  </button>
                </td>
              </tr>
              {expandedStockRows.includes(stock.id) && (
                <React.Fragment>
                  {trades.filter((trade) => trade.stock.id === stock.id).map((trade) => (
                    <tr key={stock.id}>
                        <td>{trade.date}</td>
                        <td>{trade.price}</td>
                        <td>{trade.stock.id}</td>
                        <td>{trade.id}</td>
                    </tr>
                  ))}
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;