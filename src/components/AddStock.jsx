import React, { useEffect, useState } from 'react';
import getStocks from '../services/getStocks.jsx';
import getTrade from '../services/getTrade.jsx';
import postStock from '../services/postStock.js';
import postTrade from '../services/postTrade.js';

import '../styles/components-styles/addStock.css'
import '../styles/components-styles/stockInfo.css'

function AddStock({ isNew, tradeId, setModalIsOpen, setShouldReloadPage }) {
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
  const [loading, setLoading] = useState(false);

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
          });
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const stockResponse = await getStocks();
        const stockData = stockResponse.data;

        setStocks(stockData);
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

  let total = ''
  total = parseFloat(formData.price) * parseFloat(formData.quantity);
  total = total.toFixed(2);

  if (isNaN(total)) {
    total = '';
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (total > 9999999) {
      alert("too many numbers");
      setFormData({
        symbol: formData.symbol,
        name: formData.name,
        currency: formData.currency,
        date: formData.date,
        broker: formData.broker,
        quantity: formData.quantity,
        price: formData.price,
        total: total,
        exchange_rate: formData.exchange_rate,
      });
      return
    }

    try {
      const matchingStock = stocks.find((stockItem) => stockItem.symbol.toUpperCase() === formData.symbol.toUpperCase());

      if (!matchingStock) {
        const stockResponse = await postStock({
          symbol: formData.symbol,
          name: formData.name,
          currency: formData.currency,
        });

        const tradeResponse = await postTrade({
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
          sell_price: 0,
        });

      } else {
        const tradeResponse = await postTrade({
          stock_id: matchingStock.id,
          state: true,
          date: formData.date,
          broker: formData.broker,
          quantity: parseFloat(formData.quantity) || 2,
          price: parseFloat(formData.price) || 2,
          total: total || 2,
          exchange_rate: parseFloat(formData.exchange_rate) || 2,
          tax: 0,
          dividends: 0,
          sell_price: 0,
        });
      }

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

      if (setShouldReloadPage) {
        setShouldReloadPage(true);
      }

      setModalIsOpen(false);

    } catch (error) {
      console.error('Error:', error);
      alert('Error. Please try again.');
    }
  }

  // const createStock = async () => {
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/api/stocks', {
  //       symbol: formData.symbol,
  //       name: formData.name,
  //       currency: formData.currency,
  //     });

  //     return response.data;

  //   } catch (error) {
  //     console.error('Error creating stock:', error);
  //     alert('Error creating stock. Please try again.');
  //   }
  // };

  // const createTrade = async (stockResponse) => {
  //   try {
  //     console.log("working on it");
  //     await axios.post('http://127.0.0.1:8000/api/trades', {
  //       stock_id: stockResponse.id,
  //       state: true,
  //       date: formData.date,
  //       broker: formData.broker,
  //       quantity: parseFloat(formData.quantity) || 2,
  //       price: parseFloat(formData.price) || 2,
  //       total: total || 2,
  //       exchange_rate: parseFloat(formData.exchange_rate) || 2,
  //       tax: 0,
  //       dividends: 0,
  //       sell_price: 0,
  //     });

  //     console.log("done!");

  //   } catch (error) {
  //     console.error('Error creating trade:', error);
  //     alert('Error creating trade. Please try again.');
  //   }
  // };

  return (

    <div>
      <div className="add-stock-header">
        <h2>Add Stock</h2>
        <div className="add-stock-plus">+</div>
      </div>
      <hr className='add-stock-hr' />
      <div>
        {loading ? (
          <p>Loading Stock...</p>
        ) : (
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
                  <td><label htmlFor="exchange_rate">Exchange Rate</label></td>
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
        )}
        <div className="add-button-div">
          <button className='add-button' onClick={handleSubmit}>Add stock</button>
        </div>
      </div>
    </div >
  );
}

export default AddStock;