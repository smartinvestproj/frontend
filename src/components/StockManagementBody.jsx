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

function StockManagementBody() {
  // const [stock, setStock] = useState(initialStock);

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

  const [expandedRows, setExpandedRows] = useState([]);

  // const [showAddStock, setShowAddStock] = useState(false);

  // const [showInfoStock, setShowInfoStock] = useState(false);

  // const [selectedStock, setSelectedStock] = useState(null);
  const [selectedTrade, setSelectedTrade] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chooseModal, setChooseModal] = useState(false); 

  function handleRowClick(itemId) {
    // Toggle the clicked row's ID in the expandedRows state
    setExpandedRows((prevExpandedRows) => {
      if (prevExpandedRows.includes(itemId)) {
        // Remove the item ID if it's already expanded
        return prevExpandedRows.filter((id) => id !== itemId);
      } else {
        // Add the item ID if it's not expanded
        return [...prevExpandedRows, itemId];
      }
    });
  }

  // Function to open the modal
  function openAddStock() {
    setChooseModal('add');
    setSelectedTrade(null);
    setModalIsOpen(true);
  }

  function openStockInfo(tradeId) {
    // console.log('tradId: ' + tradeId)
    setSelectedTrade(tradeId);
    setChooseModal('info');
    setModalIsOpen(true);
  }

  function calculateTotalPrice(stockId) {
    const stockTrades = trades.filter((trade) => trade.stock.id === stockId);
    const totalPrice = stockTrades.reduce((sum, trade) => sum + parseFloat(trade.price), 0);
    return totalPrice.toFixed(2); 
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
                              <span onClick={() => openStockInfo(trade.id)}>
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
        <button className="stock-button" onClick={() => openAddStock(2)}>
          Add new Stock
          <span className="icon">
            <div className="plus">+</div>
          </span>
        </button>
      </div>

      {chooseModal === 'info' ? (
        <ModalComponentStockInfo modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} >
          <StockInfo tradeId={selectedTrade} setModalIsOpen={setModalIsOpen}/>
        </ModalComponentStockInfo>
      ) : chooseModal === 'add' && (
        <ModalComponent modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
          <AddStock modalIsOpen={modalIsOpen} isNew={true} setModalIsOpen={setModalIsOpen}/>
        </ModalComponent>
      )}

    </main>
  );
}

export default StockManagementBody;