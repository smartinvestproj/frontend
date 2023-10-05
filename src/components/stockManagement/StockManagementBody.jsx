import React, { useState } from 'react';
import AddStock from './modals/AddStock.jsx';
import StockInfo from './stockInfo/StockInfo.jsx';
import ModalComponent from './modals/ModalComponent.jsx';
import './stockManagement.css';
import './modals/addStock.css';
import './stockInfo/stockInfo.css';

function StockManagement() {
  // Sample stock data
  const initialStock = [
    { id: 1, name: 'META', tinyName: 'META', dates: [{ date: '07/09/2023', price: '178.66' }, { date: '12/08/2023', price: '123.72' }], money: 302.38, percent: "-9.63%", quantity: "16790", country: "USA", broker: "XTB" },
    { id: 2, name: 'ADS', tinyName: 'Adidas', dates: [{ date: '07/09/2023', price: '178.66' }, { date: '12/08/2023', price: '123.72' }], money: 178.66, percent: "-3.76%", quantity: "16790", country: "USA", broker: "XTB" },
    { id: 3, name: 'AAPL', tinyName: 'Apple', dates: [{ date: '07/09/2023', price: '178.66' }, { date: '12/08/2023', price: '123.72' }], money: 192.58, percent: "-3.02%", quantity: "16790", country: "USA", broker: "XTB" },
    { id: 4, name: 'AMZN', tinyName: 'Amazon', dates: [{ date: '07/09/2023', price: '178.66' }, { date: '12/08/2023', price: '123.72' }], money: 128.21, percent: "-3.48%", quantity: "16790", country: "USA", broker: "XTB" },
  ];

  const [stock, setStock] = useState(initialStock);

  const [expandedRows, setExpandedRows] = useState([]);

  // const [showAddStock, setShowAddStock] = useState(false);

  // const [showInfoStock, setShowInfoStock] = useState(false);

  const [selectedStock, setSelectedStock] = useState(null);
  const [clickedDateInfo, setClickedDateInfo] = useState({ date: '', price: '' });

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

  // Function to open the modal
  function openAddStock() {
    // console.log('Before opening modal - showModal:', showAddStock);
    // setShowAddStock(true);
    // console.log('After opening modal - showModal:', showAddStock);

    setSelectedStock(null);
    setModalIsOpen(true);
  }

  function openStockInfo(stockItem, dateInfo) {
    // console.log('Before opening modal - showModal:', showInfoStock);
    // setShowInfoStock(true);
    // console.log('After opening modal - showModal:', showInfoStock);


    setSelectedStock(stockItem);
    setClickedDateInfo(dateInfo);
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

  return (
    <main className="main center">
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
              {stock.map((item) => (
                <React.Fragment key={item.id}>
                  <tr className="content-tr" onClick={() => handleRowClick(item.id)}>
                    {/* solução pode ser tirar o hr e o tr a mais. mas por questão de css não tirei */}
                    <hr />
                    <tr>
                      <td className="name" >{item.name}</td>
                      <td className="tiny-name">{item.tinyName}</td>
                      <td className="price">€{item.money}</td>
                      <td className="percent">{item.percent}</td>
                    </tr>
                  </tr>
                  {/* Render two additional rows if the item is expanded */}
                  {expandedRows.includes(item.id) && (
                    <React.Fragment>
                      <hr />
                      {item.dates.map((dateInfo) => (
                        <tr key={dateInfo.date}>
                          <tr>
                            <td className="date">
                              <span onClick={() => openStockInfo(item, dateInfo)}>{dateInfo.date}</span>
                            </td>
                            <td className="single-price">€{dateInfo.price}</td>
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

      {/* Render the modal conditionally and pass the closeModal function */}
      {/* {showAddStock && <AddStock closeModal={closeAddStock} />} */}

      {/* Render the StockInfo component when selectedStock is not null */}
      {/* {selectedStock && (
        <callModal>
          <StockInfo
          closeModal={closeStockInfo}
          name={selectedStock.name}
          tinyName={selectedStock.tinyName}
          money={selectedStock.money}
          quantity={selectedStock.quantity}
          country={selectedStock.country}
          broker={selectedStock.broker}
          date="07/09/2023" // You can set the date as needed
        />
        </callModal>
        
      )} */}

      <ModalComponent modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        {selectedStock ? (
          <StockInfo
            name={selectedStock.name}
            tinyName={selectedStock.tinyName}
            money={selectedStock.money}
            quantity={selectedStock.quantity}
            country={selectedStock.country}
            broker={selectedStock.broker}
            date={clickedDateInfo.date}
            price={clickedDateInfo.price} // Pass both date and price
          />

        ) : (
          <AddStock stock={initialStock} setStock={setStock} modalIsOpen={modalIsOpen}/>
        )}
      </ModalComponent>

    </main>

  );
}

export default StockManagement;