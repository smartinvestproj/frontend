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

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [currency, setCurrency] = useState('');
  const [price, setPrice] = useState('');
  const [broker, setBroker] = useState('');
  const [exchange_rate, setExchange_rate] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');

  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // const [total, setTotal] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (!tradeId) {
        return
      }
      try {
        const tradeResponse = await getTrade(tradeId);

        if (tradeResponse?.stock) {
          setName(tradeResponse.stock.name)
          setSymbol(tradeResponse.stock.symbol)
          setCurrency(tradeResponse.stock.currency)

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
    if (name === 'symbol') {
      setSymbol(value);
    } else if (name === 'name') {
      setName(value);
    } else if (name === 'currency') {
      setCurrency(value);
    } else if (name === 'price') {
      setPrice(value);
    } else if (name === 'broker') {
      setBroker(value);
    } else if (name === 'exchange_rate') {
      setExchange_rate(value);
    } else if (name === 'date') {
      setDate(value);
    } else if (name === 'quantity') {
      setQuantity(value);
    }
    setFormErrors({})
    // if (name === 'price' || name === 'quantity') {
    //   const price = parseFloat(formData.price) || 0;
    //   const quantity = parseFloat(formData.quantity) || 0;
    //   const newTotal = (price * quantity).toFixed(2);
    //   if (!isNaN(newTotal)) {
    //     setTotal(newTotal);
    //   } else {
    //     setTotal('');
    //   }
    // }
  };

  const brokerOptions = ['', 'XTB', 'Degiro', 'Trading 212'];
  const currencyOptions = ['', 'EUR', 'USD', 'GBP', 'JPY'];

  let total = ''
  total = parseFloat(price) * parseFloat(quantity);
  total = total.toFixed(2);

  if (isNaN(total)) {
    total = '';
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = {};
    if (symbol.length < 3) {
      errors.symbol = 'Please enter a symbol';
    }
    if (name.length < 4) {
      errors.name = 'Please enter a name';
    }
    if (!currency) {
      errors.currency = 'Please select an currency';
    }
    if (!price) {
      errors.price = 'Please enter a price';
    }
    if (!broker) {
      errors.broker = 'Please select a broker';
    }
    if (!exchange_rate) {
      errors.exchange_rate = 'Please enter a exchange_rate';
    }
    if (!date) {
      errors.date = 'Please select a date';
    }
    if (!quantity) {
      errors.quantity = 'Please enter a quantity';
    }
    if (total > 9999999) {
      errors.total = 'Please enter a valid price or quantity'
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormData({
      name,
      symbol,
      currency,
      price,
      broker,
      exchange_rate,
      date,
      quantity,
      total,
    });

    try {
      const matchingStock = stocks.find((stockItem) => stockItem.symbol.toUpperCase() === symbol.toUpperCase());

      if (!matchingStock) {
        const stockResponse = await postStock({
          symbol: symbol,
          name: name,
          currency: currency,
        });

        const tradeResponse = await postTrade({
          stock_id: stockResponse.id,
          state: true,
          date: date,
          broker: broker,
          quantity: parseFloat(quantity) || 2,
          price: parseFloat(price) || 2,
          total: total || 2,
          exchange_rate: parseFloat(exchange_rate) || 2,
          tax: 0,
          dividends: 0,
          sell_price: 0,
        });

      } else {
        const tradeResponse = await postTrade({
          stock_id: matchingStock.id,
          state: true,
          date: date,
          broker: broker,
          quantity: parseFloat(quantity) || 2,
          price: parseFloat(price) || 2,
          total: total || 2,
          exchange_rate: parseFloat(exchange_rate) || 2,
          tax: 0,
          dividends: 0,
          sell_price: 0,
        });
      }

      setFormData(initialValues);
      // setTotal('');

      if (setShouldReloadPage) {
        setShouldReloadPage(true);
      }

      setModalIsOpen(false);

    } catch (error) {
      console.error('Error:', error);
      alert('Error. Please try again.');
    }
  }

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
              </thead>
              <tbody>
                <tr>
                  <td><label htmlFor="symbol">Symbol</label>{formErrors.symbol && <label className='error-label'><br />{formErrors.symbol}</label>}</td>
                  <td><input type='text' name='symbol' value={symbol} onChange={handleInputChange}></input></td>
                  <td><label htmlFor="currency">Currency</label>{formErrors.currency && <label className='error-label'><br />{formErrors.currency}</label>}</td>
                  <td>
                    <select name="currency" value={currency} className="custom-select" onChange={handleInputChange}>
                      {currencyOptions.map((currency, index) => (
                        <option key={index} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="name">Name</label>{formErrors.name && <label className='error-label'><br />{formErrors.name}</label>}</td>
                  <td><input type='text' name='name' value={name} onChange={handleInputChange}></input></td>
                  <td><label htmlFor="price">Price</label>{formErrors.price && <label className='error-label'><br />{formErrors.price}</label>}</td>
                  <td><input type='number' step=".01" name='price' value={price} className='input-number' onChange={handleInputChange}></input></td>
                </tr>
                <tr>
                  <td><label htmlFor="broker">Broker</label>{formErrors.broker && <label className='error-label'><br />{formErrors.broker}</label>}</td>
                  <td>
                    <select name="broker" value={broker} className="custom-select" onChange={handleInputChange}>
                      {brokerOptions.map((broker, index) => (
                        <option key={index} value={broker}>
                          {broker}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td><label htmlFor="exchange_rate">Exchange Rate</label>{formErrors.exchange_rate && <label className='error-label'><br />{formErrors.exchange_rate}</label>}</td>
                  <td><input type='number' step=".01" name='exchange_rate' value={exchange_rate} className='input-number' onChange={handleInputChange}></input></td>
                </tr>
                <tr>
                  <td><label htmlFor="date">Date</label>{formErrors.date && <label className='error-label'><br />{formErrors.date}</label>}</td>
                  <td>
                    <input
                      type="date"
                      name="date"
                      value={date}
                      onChange={handleInputChange}
                      className='date-picker'
                    />
                  </td>
                  <td><label htmlFor="quantity">Quantity</label>{formErrors.quantity && <label className='error-label'><br />{formErrors.quantity}</label>}</td>
                  <td><input type='number' step=".01" name='quantity' value={quantity} className='input-number' onChange={handleInputChange}></input></td>
                </tr>
                <tr className='teste-tr'>
                  <td></td>
                  <td></td>
                  <td><label htmlFor="total">Total</label>{formErrors.total && <label className='error-label'><br />{formErrors.total}</label>}</td>
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