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
  // Sample stock data
  // const initialStock = [
  //   { id: 1, name: 'META', symbol: 'META', dates: [{ date: '2023-09-07', price: '178.66' }, { date: '2023-08-12', price: '123.72' }], money: 302.38, percent: "-9.63%", quantity: "2", currency: "USA", broker: "XTB", exchange: "4.1", tax: "55", dividend: "100" },
  //   { id: 2, name: 'ADS', symbol: 'Adidas', dates: [{ date: '2023-09-07', price: '178.66' }, { date: '2023-08-12', price: '123.72' }], money: 178.66, percent: "-3.76%", quantity: "2", currency: "EUR", broker: "Degiro", exchange: "5.2", tax: "32", dividend: "12.5" },
  //   { id: 3, name: 'AAPL', symbol: 'Apple', dates: [{ date: '2023-09-07', price: '178.66' }, { date: '2023-08-12', price: '123.72' }], money: 192.58, percent: "-3.02%", quantity: "2", currency: "GBP", broker: "XTB", exchange: "6.9", tax: "5.4", dividend: "48.5" },
  //   { id: 4, name: 'AMZN', symbol: 'Amazon', dates: [{ date: '2023-09-07', price: '178.66' }, { date: '2023-08-12', price: '123.72' }], money: 128.21, percent: "-3.48%", quantity: "2", currency: "JPY", broker: "Trading 212", exchange: "4", tax: "9.1", dividend: "49.3" },
  // ];

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

  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedTrade, setSelectedTrade] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

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
  let selectedtrade;

  // Function to open the modal
  function openAddStock(tradeId) {
    // console.log('Before opening modal - showModal:', showAddStock);
    // setShowAddStock(true);
    // console.log('After opening modal - showModal:', showAddStock);
    selectedtrade = tradeId;

    setSelectedStock(null);
    setModalIsOpen(true);
  }

  let selectedTradeBool = false;
  function openStockInfo(tradeId) {
    // console.log('Before opening modal - showModal:', showInfoStock);
    // setShowInfoStock(true);
    // console.log('After opening modal - showModal:', showInfoStock);

    // console.log('tradId: ' + tradeId)
    setSelectedTrade(tradeId);
    selectedtrade = tradeId;
    selectedTradeBool = true;
    console.log('selectedTrade: ' + selectedtrade)
    // console.log('selectedTradeBool: ' + selectedTradeBool)
    // setClickedDateInfo(dateInfo);
    

    setModalIsOpen(true);
  }

  // // Function to close the modal
  // function closeStockInfo() {
  //   console.log('Before closing modal - showModal:', showInfoStock);
  //   setShowInfoStock(false);
  //   console.log('After closing modal - showModal:', showInfoStock);
  // }

  // // Function to open StockInfo modal when clicking on the "name" td
  // function openStockInfoOnClick(stockItem) {
  //   setSelectedStock(stockItem);
  //   openStockInfo(true);
  // }

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

      {/* Render the modal conditionally and pass the closeModal function */}
      {/* {showAddStock && <AddStock closeModal={closeAddStock} />} */}

      {/* Render the StockInfo component when selectedStock is not null */}
      {/* {selectedStock && (
        <callModal>
          <StockInfo
          closeModal={closeStockInfo}
          name={selectedStock.name}
          symbol={selectedStock.symbol}
          money={selectedStock.money}
          quantity={selectedStock.quantity}
          country={selectedStock.country}
          broker={selectedStock.broker}
          date="07/09/2023" // You can set the date as needed
        />
        </callModal>
        
      )} */}

      {/* {selectedStock ? (
        <ModalComponent modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} cssclassname={"modal-content-stock-info"}>
          <StockInfo
            name={selectedStock.name}
            symbol={selectedStock.symbol}
            money={selectedStock.money}
            quantity={selectedStock.quantity}
            country={selectedStock.country}
            broker={selectedStock.broker}
            exchange={selectedStock.exchange}
            tax={selectedStock.tax}
            dividend={selectedStock.dividend}

            date={clickedDateInfo.date}
            price={clickedDateInfo.price}
          />
        </ModalComponent>
      ) : (
        <ModalComponent modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
          <AddStock stock={initialStock} setStock={setStock} modalIsOpen={modalIsOpen} props={initialStock} cssclassname={"modal-content"} />
        </ModalComponent>
      )} */}

      {selectedTrade ? (
        <ModalComponentStockInfo modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} >
          <StockInfo trade={selectedtrade} />
        </ModalComponentStockInfo>
      ) : (
        <ModalComponent modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
          {/* <AddStock stock={initialStock} setStock={setStock} modalIsOpen={modalIsOpen} props={initialStock} isNew={true} /> */}
          <AddStock trade={selectedtrade} modalIsOpen={modalIsOpen} isNew={true} />
        </ModalComponent>
      )}

    </main>
  );
}

export default StockManagementBody;