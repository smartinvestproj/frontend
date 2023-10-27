import React, { useEffect, useRef, useState } from 'react';
import { useStockContext } from '../../context/stockContext';
import AddStock from './addStock';
import StockInfo from './stockInfo';
import TradeRow from './tradeRow';
import ModalComponent from './modalComponent';
import './stockManagementBody.css';
import '../stockManagement/addStock/styles.css';
import '../stockManagement/stockInfo/styles.css';
import '../stockManagement/editStock/styles.css';
import '../stockManagement/sellStock/styles.css';
import '../stockManagement/sellModal/styles.css';

export default function StockManagementBody() {

  const { trades, stocks, filterTradesByState, tradeValuesByStockId }  = useStockContext();
  const [loading, setLoading]                     = useState(true);
  const [expandedRows, setExpandedRows]           = useState([]);
  const [selectedTrade, setSelectedTrade]         = useState(null);
  const [modalIsOpen, setModalIsOpen]             = useState(false);
  const [chooseModal, setChooseModal]             = useState(false);
  const [modalType, setModalType]                 = useState(null);
  const [shouldReloadPage, setShouldReloadPage]   = useState(false);
  const [stockLength, setStockLength]             = useState('');
  const modalType1                                = "modal-content";
  const modalType2                                = "modal-content-stock-info";
  const lastTr                                    = useRef(null)

  let stocklength;

  const stocksWithNoState1Trades = stocks.filter(stock => {
    return filterTradesByState().some(trade => trade.stock.id === stock.id);
  });

  useEffect(() => {
        setStockLength(stocks.length)
        setLoading(false);

        if (shouldReloadPage) {
          window.location.reload();
          setShouldReloadPage(false);
        }
  }, [shouldReloadPage]);

  function handleRowClick(itemId) {
    const isLastRow = itemId === stocks[stocks.length - 1].id;
  
    if (isLastRow) {
      if (lastTr.current) {
        const hasClass = lastTr.current.classList.contains('last-td-border');
        if (!hasClass) {
          lastTr.current.classList.add('last-td-border');
        } else {
          lastTr.current.classList.remove('last-td-border');
        }
      }
    }
  
    setExpandedRows((prevExpandedRows) => {
      if (prevExpandedRows.includes(itemId)) {
        return prevExpandedRows.filter((id) => id !== itemId);
      } else {
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
                {stocksWithNoState1Trades.map((stock, idx) => (
                  <React.Fragment key={stock.id}>
                    <tr className={`stock-row ${idx < stocks.length - 1 && 'last-td-border'}`} ref={lastTr} onClick={() => handleRowClick(stock.id)}>
                      <td className="name" >{stock.name}</td>
                      <td className="symbol">{stock.symbol}</td>
                      <td className="price">€{tradeValuesByStockId(stock.id).totalTotal}</td>
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