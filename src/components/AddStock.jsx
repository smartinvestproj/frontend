import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getStocks from '../services/getStocks.jsx';
import getStock from '../services/getStock.jsx';
import getTrades from '../services/getTrades.jsx';
import getTrade from '../services/getTrade.jsx';

import '../styles/components-styles/addStock.css'
import '../styles/components-styles/stockInfo.css'

// stock, setStock, props,
function AddStock({ isNew, tradeId }) {
  console.log(tradeId);

  const initialValues = {
    name: '',
    symbol: '',
    currency: '',
    broker: '',
    date: '',
    price: '',
    exchange_rate: '',
    quantity: '',
  }

  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    async function fetchData() {
      if (!tradeId) {
        return
      }
      try {
        const tradeResponse = await getTrade(tradeId);
        if (tradeResponse?.stock) {
          setFormData({
            name: tradeResponse.stock.name || '',
            symbol: tradeResponse.stock.symbol || '',
            currency: tradeResponse.stock.currency || '',
            ...tradeResponse,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const brokerOptions = ['', 'XTB', 'Degiro', 'Trading 212'];
  const currencyOptions = ['', 'EUR', 'USD', 'GBP', 'JPY'];

  // const [modalIsOpen, setModalIsOpen] = useState(false);

  let total = ''
  total = parseFloat(formData.price) * parseFloat(formData.quantity);
  total = total.toFixed(2);

  if (isNaN(total)) {
    total = '';
  }

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   if (isNew) {
  //     // Check if formData is empty (null or all fields are empty)
  //     if (Object.values(formData).every(value => value === '' || value === null)) {
  //       console.log('Form data is empty. Not doing anything.');
  //       return;
  //     }

  //     // Find the last ID in the stock array
  //     const lastStock = stock[stock.length - 1];
  //     const lastId = lastStock ? lastStock.id : 0;

  //     // Calculate the new ID (lastId + 1)
  //     const newId = lastId + 1;

  //     // Create the new stock object in the desired format
  //     const newStock = {
  //       id: newId,
  //       name: formData.name,
  //       symbol: formData.symbol, // Assuming symbol corresponds to symbol
  //       dates: [{ date: formData.date, price: parseFloat(formData.price) || 100, }], // Assuming date and money correspond to dates
  //       money: parseFloat(total) || 100,
  //       percent: formData.percent || '',
  //       quantity: formData.quantity || '',
  //       currency: formData.currency || '',
  //       broker: formData.broker || '',
  //       exchange_rate: formData.exchange_rate || '',
  //       tax: 0,
  //       dividend: formData.dividend || ''
  //     };

  //     // Update the stock array using the setStock function
  //     setStock(prevStock => [...prevStock, newStock]);

  //     console.log('Stock:', stock);
  //     console.log('New Stock Data:', newStock);

  //     // Reset the formData fields to empty strings
  //     setFormData({
  //       symbol: '',
  //       name: '',
  //       currency: '',
  //       broker: '',
  //       price: '',
  //       date: '',
  //       quantity: '',
  //       total: ''
  //     });

  //     setModalIsOpen(false);
  //   } else {
  //     if (Object.values(formData).every(value => value === '' || value === null)) {
  //       console.log('Form data is empty. Not doing anything.');
  //       return;
  //     }

  //     console.log(stock);
  //     // Check if the stock with the specified id exists in props.stock array
  //     const stockToUpdate = stock.find(stockItem => stockItem.id === id);

  //     console.log(stockToUpdate);

  //     if (stockToUpdate) {
  //       // Find the index of the stock item to update in the stock array
  //       const indexToUpdate = stock.findIndex(stockItem => stockItem.id === id);

  //       // Update the quantity of the existing stock directly in the stock array
  //       stock[indexToUpdate].quantity = parseFloat(formData.quantity) || 0;

  //       // Update the stock array using the setStock function
  //       setStock([...stock]);

  //       // Reset the formData fields to empty strings
  //       setFormData({
  //         symbol: '',
  //         name: '',
  //         currency: '',
  //         broker: '',
  //         price: '',
  //         date: '',
  //         quantity: '',
  //         total: '',
  //       });

  //       setModalIsOpen(false);
  //     } else {
  //       console.log(`Stock with ID ${id} not found in props.stock.`);
  //     }
  //   }
  // }

  // const [createdStockId, setCreatedStockId] = useState(null);

  // let stock_id_test; 

  async function handleSubmit(event) {
    event.preventDefault();
    if (isNew) {
      try {
        const stockResponse = await createStock();

        const tradeResponse = await createTrade(stockResponse);

        setFormData({
          symbol: '',
          name: '',
          currency: '',
          date: '',
          broker: '',
          quantity: 0,
          price: 0,
          total: 0,
          exchange_rate: 0,
        });

      } catch (error) {
        console.error('Error:', error);
        alert('Error. Please try again.');
      }
    }
    else {
      try {
        await updateTrade(tradeId, {
          date: formData.date,
          broker: formData.broker,
          quantity: parseFloat(formData.quantity) || 2,
          price: parseFloat(formData.price) || 2,
          total: total || 2,
          exchange_rate: parseFloat(formData.exchange_rate) || 2,
          tax: 0,
          dividends: 0,
        });

        setFormData({
          symbol: '',
          name: '',
          currency: '',
          date: '',
          broker: '',
          quantity: 0,
          price: 0,
          total: 0,
          exchange_rate: 0,
        });
      } catch (error) {
        console.error('Error:', error);
        alert('Error. Please try again.');
      }
    }
  }

  const createStock = async () => {
    try {
      // Send a POST request to create a new stock
      const response = await axios.post('http://127.0.0.1:8000/api/stocks', {
        symbol: formData.symbol,
        name: formData.name,
        currency: formData.currency,
      });

      return response.data;

    } catch (error) {
      console.error('Error creating stock:', error);
      alert('Error creating stock. Please try again.');
    }
  };

  const createTrade = async (stockResponse) => {
    try {
      console.log("working on it");
      // Use the createdStockId to associate the trade with the stock
      await axios.post('http://127.0.0.1:8000/api/trades', {
        stock_id: stockResponse.id,
        state: true,
        date: formData.date,
        broker: formData.broker,
        quantity: parseFloat(formData.quantity) || 2,
        price: parseFloat(formData.price) || 2,
        total: total || 2,
        exchange_rate: parseFloat(formData.exchange_rate) || 2,
        tax: 0,
        dividends: 0,
      });

      console.log("done!");

    } catch (error) {
      console.error('Error creating trade:', error);
      alert('Error creating trade. Please try again.');
    }
  };

  async function updateTrade(tradeId, data) {
    try {
      // Send a PUT or PATCH request to update the trade with the specified ID
      await axios.put(`http://127.0.0.1:8000/api/trades/${tradeId}`, data);
    } catch (error) {
      console.error('Error updating trade:', error);
      alert('Error updating trade. Please try again.');
    }
  }



  useEffect(() => {
    setFormData({
      name: '',
      symbol: '',
      currency: '',
      broker: '',
      date: '',
    });
  }, []);

  return (

    <div>
      <div className="add-stock-header">
        <h2>Add Stock</h2>
        <div className="add-stock-plus">+</div>
      </div>
      <hr className='add-stock-hr' />
      <div>
        <form className="modal-form" action="" onSubmit={handleSubmit}>
          <table className='add-stock-table'>
            <thead>
              {/* <th></th>
              <th></th> */}
            </thead>
            <tbody>
              <tr>
                <td><label htmlFor="symbol">Symbol</label></td>
                <td><input type='text' name='symbol' value={formData.symbol} onChange={handleInputChange}></input></td>
                <td><label htmlFor="currency">Currency</label></td>
                <td>
                  <select name="currency" value={formData.currency} className="custom-select" onChange={handleInputChange}>
                    {currencyOptions.map((currency, index) => (
                      <option key={index} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="name">Name</label></td>
                <td><input type='text' name='name' value={formData.name} onChange={handleInputChange}></input></td>
                <td>Price</td>
                <td><input type='number' name='price' value={formData.price} className='input-number' onChange={handleInputChange}></input></td>
              </tr>
              <tr>
                <td><label htmlFor="broker">Broker</label></td>
                <td>
                  <select name="broker" value={formData.broker} className="custom-select" onChange={handleInputChange}>
                    {brokerOptions.map((broker, index) => (
                      <option key={index} value={broker}>
                        {broker}
                      </option>
                    ))}
                  </select>
                </td>
                <td><label htmlFor="exchange_rate">exchange_rate Rate</label></td>
                <td><input type='number' name='exchange_rate' value={formData.exchange_rate} className='input-number' onChange={handleInputChange}></input></td>
              </tr>
              <tr>
                <td><label htmlFor="date">Date</label></td>
                <td>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className='date-picker'
                  />
                </td>
                <td><label htmlFor="quantity">Quantity</label></td>
                <td><input type='number' name='quantity' value={formData.quantity} className='input-number' onChange={handleInputChange}></input></td>
              </tr>
              <tr className='teste-tr'>
                <td></td>
                <td></td>
                <td><label htmlFor="total">Total</label></td>
                <td><label name='total' className='label-total'>{total}</label></td>
              </tr>
            </tbody>
          </table>
        </form>
        <div className="add-button-div">
          <button className='add-button' onClick={handleSubmit}>Add stock</button>
        </div>
      </div>
    </div >
  );
}

export default AddStock;