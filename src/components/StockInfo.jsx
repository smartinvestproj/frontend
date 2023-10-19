import React, { useEffect, useRef, useState } from 'react';
import editing from '../assets/editing.png';
import arrow from '../assets/right-arrow.png';
import ModalComponent from './ModalComponent';
import AddStock from './AddStock';
import SellStock from './SellStock';
import EditStock from './EditStock';
import getTrade from '../services/getTrade';

function StockInfo({ tradeId, setShouldReloadPage }) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalType1 = "modal-content";

  const sellButton = useRef(null);
  const buyButton = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const [trades, setTrades] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!tradeId) {
        return
      }
      try {
        const tradeResponse = await getTrade(tradeId);

        setTrades(tradeResponse);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const [chooseModal, setChooseModal] = useState(false);

  function handleBuyStock() {
    setModalIsOpen(true);
    setChooseModal('add');
  }

  function handleSellStock() {
    setModalIsOpen(true);
    setChooseModal('sell');
  }

  function handleEditStock() {
    setModalIsOpen(true);
    setChooseModal('edit');
  }

  if (isLoading) {
    return <div>Loading Trade...</div>;
  }

  if (!trades) {
    return null;
  }

  return (

    <div>
      <table className='table-info'>
        <thead>
          <tr>
            <th className='name'>{trades.stock.name}</th>
            <th className='date'>{trades.date}</th>
            <th className='symbol'>{trades.stock.symbol}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EUR</td>
            <td></td>
            <td><b>€{trades.price}</b></td>
          </tr>
          <tr>
            <td>Exchnage Rate</td>
            <td></td>
            <td><b>{trades.exchange_rate}</b></td>
          </tr>
          <tr>
            <td>Quantity </td>
            <td></td>
            <td><b>{trades.quantity}</b></td>
          </tr>
          <tr>
            <td>Total </td>
            <td></td>
            <td><b>{trades.total}</b></td>
          </tr>
          <tr>
            <td>Broker </td>
            <td></td>
            <td>{trades.broker}</td>
          </tr>
        </tbody>
      </table>

      <div className='edit'>
        <span onClick={handleEditStock}>Edit</span><img className="editIcon" onClick={handleEditStock} src={editing} alt="" />
      </div>

      <div className="buttons-container">
        <div className="buttons">
          <button onClick={handleSellStock} ref={sellButton}><span className='arrow-red-span'><img className='arrow-red' src={arrow} alt="" /></span>Sell Stock</button>
          <hr></hr>
          <button onClick={handleBuyStock} ref={buyButton}><span className='arrow-green-span'><img className='arrow-green' src={arrow} alt="" /></span>Buy Stock</button>
        </div>
      </div>

      <ModalComponent modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} modalType={modalType1}>
        {chooseModal === 'add' ? (
          <AddStock setModalIsOpen={setModalIsOpen} isNew={false} tradeId={tradeId} setShouldReloadPage={setShouldReloadPage} />
        ) : chooseModal === 'sell' ? (
          <SellStock tradeId={tradeId} setModalIsOpen={setModalIsOpen} setShouldReloadPage={setShouldReloadPage} />
        ) : (
          <EditStock tradeId={tradeId} setModalIsOpen={setModalIsOpen} setShouldReloadPage={setShouldReloadPage} />
        )}
      </ModalComponent>
    </div>
  );
}

export default StockInfo;