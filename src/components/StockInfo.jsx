import React, { useState } from 'react';

function StockInfo(props) {
  const {
    name,
    tinyName,
    date,
    money,
    quantity: initialQuantity,
    country,
    broker,
    price,
  } = props;

  // Initialize quantity as a state variable
  const [quantity, setQuantity] = useState(parseInt(initialQuantity, 10) || 0);
  
  const handleBuyStock = () => {
    // Increase the quantity by 1 when "Buy Stock" is clicked
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleSellStock = () => {
    // Decrease the quantity by 1 when "Sell Stock" is clicked
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (

    <div>
      <table className='modal-table'>
        <thead>
          <tr>
            <th className='name-l'>{name}</th>
            <th className='date'>{date}</th>
            <th className='name-s'>{tinyName}</th>
          </tr>
        </thead>
        <hr />
        <tbody>
          <tr>
            <td>EUR</td>
            <td></td>
            <td><b>€{price}</b></td>
          </tr>
          <tr>
            <td>Quantity </td>
            <td></td>
            <td><b>{quantity}</b></td>
          </tr>
          <tr>
            <td>Country </td>
            <td></td>
            <td>{country}</td>
          </tr>
          <tr>
            <td>Broker </td>
            <td></td>
            <td>{broker}</td>
          </tr>
        </tbody>
      </table>

      <td className='edit'>Edit <span className='arrow-down red editIcon'>icon</span></td>

      <div className="buttons-container">
        <div className="buttons">
          <button onClick={handleSellStock}><span></span>Sell Stock</button>
          <hr></hr>
          <button onClick={handleBuyStock}><span></span>Buy Stock</button>
        </div>
      </div>

    </div>
  );
}

export default StockInfo;