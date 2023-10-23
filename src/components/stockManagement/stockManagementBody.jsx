import React, { useEffect, useRef, useState } from 'react';
import AddStock from './addStock';
import StockInfo from './stockInfo';
import TradeRow from './tradeRow';
import ModalComponent from './modalComponent';
import {getStocks} from '../../services/Stocks.js';
import {getTrades} from '../../services/Trades.js';
// import { useStockContext } from "../../context/stockContext";
import './stockManagementBody.css';
import '../stockManagement/addStock/styles.css';
import '../stockManagement/stockInfo/styles.css';
import '../stockManagement/editStock/styles.css';
import '../stockManagement/sellStock/styles.css';
import '../stockManagement/sellModal/styles.css';


export default function StockManagementBody() {

  const [stocks, setStocks] = useState([]);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const lastTr = useRef(null)

  const [modalType, setModalType] = useState(null);
  const modalType1 = "modal-content";
  const modalType2 = "modal-content-stock-info";

  const [shouldReloadPage, setShouldReloadPage] = useState(false);
  const [stockLength, setStockLength] = useState('');

  let stocklength;

  useEffect(() => {
    async function fetchData() {
      try {
        const stockResponse = await getStocks();
        const tradeResponse = await getTrades();

        const stockData = stockResponse.data;
        const tradeData = tradeResponse.data;

        setStockLength(stockData.length)

        const filteredTrades = tradeData.filter(trade => trade.state === 1);

        // Then, filter stocks that have no trades with state = 1
        const stocksWithNoState1Trades = stockData.filter(stock => {
          // Check if there are no trades in filteredTrades with the same stock ID
          return filteredTrades.some(trade => trade.stock.id === stock.id);
        });

        setStocks(stocksWithNoState1Trades);
        setTrades(filteredTrades);

        setLoading(false);

        if (shouldReloadPage) {
          window.location.reload();
          setShouldReloadPage(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [shouldReloadPage]);

  const [expandedRows, setExpandedRows] = useState([]);

  const [selectedTrade, setSelectedTrade] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chooseModal, setChooseModal] = useState(false);

  function handleRowClick(itemId) {

    if (itemId === stockLength + 1) {
      if (lastTr.current) {
        const hasClass = lastTr.current.classList.contains('last-td-border');
        if (!hasClass) {
          lastTr.current.classList.add('last-td-border');
        } else {
          lastTr.current.classList.remove('last-td-border');
        }
      }
    }
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

  function openAddStock() {
    setModalType(modalType1)
    setChooseModal('add');
    setSelectedTrade(null);
    setModalIsOpen(true);
  }

  function openStockInfo(tradeId) {
    setModalType(modalType2)
    setSelectedTrade(tradeId);
    setChooseModal('info');
    setModalIsOpen(true);
  }

  function calculateTotalPrice(stockId) {
    const stockTrades = trades.filter((trade) => trade.stock.id === stockId && trades.state !== 0);
    const totalPrice = stockTrades.reduce((sum, trade) => sum + parseFloat(trade.total), 0);
    return totalPrice.toFixed(2);
  }

  return (
    <>
      <div className='stock-management-container'>
        <p className='stock-management-title'>Stock Management</p>
        <hr className='title-hr' />
        {loading ? (
          <div className="loading-indicator">Loading Stocks...</div>
        ) : (
          <div className="stock-table-container">
            <table className="table-stock">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock, idx) => (
                  <React.Fragment key={stock.id}>
                    <tr className={`stock-row ${idx < stocks.length - 1 && 'last-td-border'}`} ref={lastTr} onClick={() => handleRowClick(stock.id)}>
                      <td className="name" >{stock.name}</td>
                      <td className="symbol">{stock.symbol}</td>
                      <td className="price">€{calculateTotalPrice(stock.id)}</td>
                    </tr>
                    {expandedRows.includes(stock.id) &&
                      <TradeRow
                        trades={trades}
                        stockId={stock.id}
                        openStockInfo={openStockInfo}
                      />
                    }
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="button-placement">
        <button className="stock-button" onClick={() => openAddStock()}>
          Add new Stock
          <span className="icon">
            <div className="plus">+</div>
          </span>
        </button>
      </div>

      <ModalComponent modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} modalType={modalType} >
        {chooseModal === 'info' ? (
          <StockInfo tradeId={selectedTrade} setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} setShouldReloadPage={setShouldReloadPage} />
        ) : chooseModal === 'add' && (
          <AddStock modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} setShouldReloadPage={setShouldReloadPage} />
        )}
      </ModalComponent>

    </>
  );
}