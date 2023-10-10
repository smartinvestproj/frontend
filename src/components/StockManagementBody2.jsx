import React, { useEffect, useState } from 'react';
import AddStock from '../components/AddStock.jsx';
import StockInfo from '../components/StockInfo';
import ModalComponent from './ModalComponent';
import ModalComponentStockInfo from './ModalComponentStockInfo';
import getStocks from '../services/getStocks.jsx';
import getTrades from '../services/getTrades.jsx';
import '../styles/stockManagement.css';
import '../styles/components-styles/AddStock.css';
import '../styles/components-styles/StockInfo.css';

function StockManagementBody2() {
  // Sample stock data
  // const initialStock = [
  //   { id: 1, name: 'META', tinyName: 'META', dates: [{ date: '07/09/2023', price: '178.66' }, { date: '12/08/2023', price: '123.72' }], money: 302.38, percent: "-9.63%", quantity: "1,6790", country: "USA", broker: "XTB" },
  //   { id: 2, name: 'ADS', tinyName: 'Adidas', dates: [{ date: '07/09/2023', price: '178.66' }, { date: '12/08/2023', price: '123.72' }], money: 178.66, percent: "-3.76%", quantity: "1,6790", country: "USA", broker: "XTB" },
  //   { id: 3, name: 'AAPL', tinyName: 'Apple', dates: [{ date: '07/09/2023', price: '178.66' }, { date: '12/08/2023', price: '123.72' }], money: 192.58, percent: "-3.02%", quantity: "1,6790", country: "USA", broker: "XTB" },
  //   { id: 4, name: 'AMZN', tinyName: 'Amazon', dates: [{ date: '07/09/2023', price: '178.66' }, { date: '12/08/2023', price: '123.72' }], money: 128.21, percent: "-3.48%", quantity: "1,6790", country: "USA", broker: "XTB" },
  // ];

  // const extraInfo = [
  //   { id: 1, date: '07/09/2023', price: '178.66' },
  //   { id: 1, date: '12/08/2023', price: '123.72' },
  //   { id: 2, date: '07/09/2023', price: '178.66' },
  //   { id: 2, date: '12/08/2023', price: '123.72' },
  //   { id: 3, date: '07/09/2023', price: '178.66' },
  //   { id: 3, date: '12/08/2023', price: '123.72' },
  //   { id: 4, date: '07/09/2023', price: '178.66' },
  //   { id: 4, date: '12/08/2023', price: '123.72' },
  // ];

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

  // const [stock] = useState(initialStock);

  const [expandedRows, setExpandedRows] = useState([]);

  const [selectedStock, setSelectedStock] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleRowClick(stockId) {
    // Toggle the clicked row's ID in the expandedRows state
    setExpandedRows((prevExpandedRows) => {
      if (prevExpandedRows.includes(stockId)) {
        // Remove the item ID if it's already expanded
        return prevExpandedRows.filter((id) => id !== stockId);
      } else {
        // Add the item ID if it's not expanded
        return [...prevExpandedRows, stockId];
      }
    });
  }

  // Function to open the modal
  function openAddStock() {

    setSelectedStock(null)
    setModalIsOpen(true);
  }

  function openStockInfo(stockItem) {
    // console.log('Before opening modal - showModal:', showInfoStock);
    // setShowInfoStock(true);
    // console.log('After opening modal - showModal:', showInfoStock);

    setSelectedStock(stockItem);
    setModalIsOpen(true);
  }

  function calculateTotalPrice(stockId) {
    const stockTrades = trades.filter((trade) => trade.stock.id === stockId);
    const totalPrice = stockTrades.reduce((sum, trade) => sum + parseFloat(trade.price), 0);
    return totalPrice.toFixed(2); // Assuming you want to display it with 2 decimal places
  }

  return (
    <main className="main center" >
      <div>
        <h2 className="title">Stock Management</h2>
        <div className="center">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <React.Fragment key={stock.id}>
                  <tr className="content-tr" onClick={() => handleRowClick(stock.id)}>
                    <hr />
                    <tr>
                      <td className="name" >{stock.name}</td>
                      <td className="symbol">{stock.symbol}</td>
                      <td className="price">€{calculateTotalPrice(stock.id)}</td>
                      <td className="percent"></td>
                    </tr>
                  </tr>
                  {expandedRows.includes(stock.id) && (
                    <React.Fragment>
                      <hr />
                      {trades.filter((trade) => trade.stock.id === stock.id).map((trade) => (
                        <tr key={stock.id}>
                          <tr>
                            <td className="date">
                              <span >
                                {trade.date.split('-').reverse().join('/')}
                              </span>
                            </td>
                            <td className="single-price">€{trade.price}</td>
                          </tr>
                          <hr className="extra-hr" />
                        </tr>
                      ))}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))}
              <hr />
            </tbody>
          </table>
        </div>
      </div>
      <div className="button-placement">
        <button className="stock-button" onClick={openAddStock}>
          Add new Stock
          <span className="icon">
            <div className="plus">+</div>
          </span>
        </button>
      </div>
    </main>

  );
}

export default StockManagementBody2;