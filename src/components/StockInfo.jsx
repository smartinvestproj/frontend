import React, { useEffect, useState } from 'react';
import editing from '../assets/editing.png';
import arrow from '../assets/right-arrow.png';
import ModalComponent from './ModalComponent';
import AddStock from './AddStock';
import SellStock from './SellStock';
import EditStock from './EditStock';
import getTrade from '../services/getTrade';

function StockInfo({tradeId}) {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const[trades, setTrades] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if(!tradeId){
        return
      }
      try {
        const tradeResponse = await getTrade(tradeId);

        setTrades(tradeResponse);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const [chooseModal, setChooseModal] = useState(false);

  const handleBuyStock = () => {
    setModalIsOpen(true);
    setChooseModal('add');
  };

  const handleSellStock = () => {
    setModalIsOpen(true);
    setChooseModal('sell');
  };

  const handleEditStock = () => {
    setModalIsOpen(true);
    setChooseModal('edit');
  };

  if(!trades){
    return null;
  }

  return (
    
      <div>
        <table className='modal-table'>
          <thead>
            <tr>
              <th className='name-l'>{trades.stock.name}</th>
              <th className='date'>{trades.date}</th>
              <th className='name-s'>{trades.stock.symbol}</th>
            </tr>
          </thead>
          <hr />
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

        <td className='edit'><span onClick={handleEditStock}>Edit</span><img className="editIcon" onClick={handleEditStock} src={editing} alt="" /></td>

        <div className="buttons-container">
          <div className="buttons">
            <button onClick={handleSellStock}><span className='arrow-red-span'><img className='arrow-red' src={arrow} alt="" /></span>Sell Stock</button>
            <hr></hr>
            <button onClick={handleBuyStock}><span className='arrow-green-span'><img className='arrow-green' src={arrow} alt="" /></span>Buy Stock</button>
          </div>
        </div>

        <ModalComponent modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
          {chooseModal === 'add' ? (
            <AddStock setModalIsOpen={setModalIsOpen} isNew={false} tradeId={tradeId}/>
          ) : chooseModal === 'sell' ? (
            <SellStock tradeId={tradeId} setModalIsOpen={setModalIsOpen} />
          ) : (
            <EditStock tradeId={tradeId} setModalIsOpen={setModalIsOpen} />
          )}
        </ModalComponent>
      </div>
  );
}

export default StockInfo;