import React, { useEffect, useState } from 'react';
import editing from '../assets/editing.png';
import arrow from '../assets/right-arrow.png';
import ModalComponent from './ModalComponent';
import AddStock from './AddStock';
import SellStock from './SellStock';
import EditStock from './EditStock';
import getTrade from '../services/getTrade';

function StockInfo(trade) {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const[trades, setTrades] = useState(null);

  // const {
  //   name,
  //   symbol,
  //   date,
  //   money,
  //   quantity,
  //   broker,
  //   price,
  //   exchange,
  //   tax,
  //   dividend
  // } = props;

  useEffect(() => {
    async function fetchData() {
      try {
        const tradeResponse = await getTrade(trade);

        const tradeData = tradeResponse.data;

        setTrades(tradeData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  console.log(trade);

  // console.log(stock);
  // Initialize quantity as a state variable
  // const [quantity, setQuantity] = useState(parseInt(initialQuantity, 10) || 0);

  // let total = parseFloat(Trade.price) * parseFloat(Trade.quantity);
  // total = total.toFixed(2);

  const [chooseModal, setChooseModal] = useState(false); // Initialize chooseModal as a state variable

  // const handleBuyStock = () => {
  //   // Increase the quantity by 1 when "Buy Stock" is clicked
  //   setQuantity(prevQuantity => prevQuantity + 1);
  // };
  const handleBuyStock = () => {
    // console.log(stock);
    // Open the modal for buying stock and set chooseModal to 'add'
    setModalIsOpen(true);
    setChooseModal('add');
  };

  // const handleSellStock = () => {
  //   // Decrease the quantity by 1 when "Sell Stock" is clicked
  //   if (quantity > 0) {
  //     setQuantity(prevQuantity => prevQuantity - 1);
  //   }
  // };
  const handleSellStock = () => {
    // Open the modal for selling stock and set chooseModal to 'sell'
    setModalIsOpen(true);
    setChooseModal('sell');
  };

  const handleEditStock = () => {
    // Open the modal for editing stock and set chooseModal to 'edit'
    setModalIsOpen(true);
    setChooseModal('edit');
  };

  return (
    
    // <div className="modal-content-stock-info" >
      <div>
        {/* <table className='modal-table'>
          <thead>
            <tr>
              <th className='name-l'>{Trade.name}</th>
              <th className='date'>{Trade.date}</th>
              <th className='name-s'>{Trade.symbol}</th>
            </tr>
          </thead>
          <hr />
          <tbody>
            <tr>
              <td>EUR</td>
              <td></td>
              <td><b>€{Trade.price}</b></td>
            </tr>
            <tr>
              <td>Exchnage Rate</td>
              <td></td>
              <td><b>{Trade.exchange}</b></td>
            </tr>
            <tr>
              <td>Quantity </td>
              <td></td>
              <td><b>{Trade.quantity}</b></td>
            </tr>
            <tr>
              <td>Total </td>
              <td></td>
              <td><b>{total}</b></td>
            </tr>
            <tr>
              <td>Broker </td>
              <td></td>
              <td>{Trade.broker}</td>
            </tr>
          </tbody>
        </table> */}

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
            <AddStock modalIsOpen={modalIsOpen} isNew={false} />
          ) : chooseModal === 'sell' ? (
            <SellStock modalIsOpen={modalIsOpen} />
          ) : (
            <EditStock modalIsOpen={modalIsOpen} />
          )}
        </ModalComponent>
      </div>
    // </div>
  );
}

export default StockInfo;