import React, { useState } from 'react';
import './styles.css';
import { createOrUpdateStock } from '../../../services/Stocks.js';
import { createOrUpdateTrade } from '../../../services/Trades.js';
import { useStockContext } from "../../../context/stockContext";

export default function AddStock({ setModalIsOpen, setShouldReloadPage }) {
  const { stocks } = useStockContext();
  const [formData, setFormData] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const calculateTotal = () => {
    const { price, quantity } = formData;
    let total = (parseFloat(price) * parseFloat(quantity)).toFixed(2);
    return isNaN(total) ? '' : total;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    for (const field in initialValues) {
      if (formData[field] === '') {
        errors[field] = `Please enter a ${field}`;
      }
    }

    if (parseFloat(calculateTotal()) > 9999999) {
      errors.total = 'Please enter a valid price or quantity';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const symbol = formData.symbol.toUpperCase();
      const matchingStock = stocks.find((stockItem) => stockItem.symbol.toUpperCase() === symbol);

      const stockData = {
        symbol: symbol,
        name: formData.name,
        currency: formData.currency,
      };

      const stockResponse = matchingStock ? matchingStock : await createOrUpdateStock(stockData);

      const tradeData = {
        stock_id: stockResponse.id,
        state: true,
        date: formData.date,
        broker: formData.broker,
        quantity: parseFloat(formData.quantity) || 2,
        price: parseFloat(formData.price) || 2,
        total: calculateTotal() || 2,
        exchange_rate: parseFloat(formData.exchange_rate) || 2,
        tax: 0,
        dividends: 0,
        sell_price: 0,
      };

      const tradeResponse = await createOrUpdateTrade(tradeData);

      setFormData(initialValues);

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
          <form className="modal-form" onSubmit={handleSubmit}>
            <table className='add-stock-table'>
              <tbody>
                <tr>
                  <td><label htmlFor="symbol">Symbol</label></td>
                  <td>
                    <input
                      type='text'
                      name='symbol'
                      value={formData.symbol}
                      onChange={handleInputChange}
                    />
                    {formErrors.symbol && <label className='error-label'><br />{formErrors.symbol}</label>}
                  </td>
                  <td><label htmlFor="currency">Currency</label></td>
                  <td>
                    <select
                      name="currency"
                      value={formData.currency}
                      className="custom-select"
                      onChange={handleInputChange}
                    >
                      {['', 'EUR', 'USD', 'GBP', 'JPY'].map((currency, index) => (
                        <option key={index} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                    {formErrors.currency && <label className='error-label'><br />{formErrors.currency}</label>}
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="name">Name</label></td>
                  <td>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {formErrors.name && <label className='error-label'><br />{formErrors.name}</label>}
                  </td>
                  <td><label htmlFor="price">Price</label></td>
                  <td>
                    <input
                      type='number'
                      step=".01"
                      name='price'
                      value={formData.price}
                      className='input-number'
                      onChange={handleInputChange}
                    />
                    {formErrors.price && <label className='error-label'><br />{formErrors.price}</label>}
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="broker">Broker</label></td>
                  <td>
                    <input
                      type="text"
                      name='broker'
                      value={formData.broker}
                      onChange={handleInputChange}
                    />
                    {formErrors.broker && <label className='error-label'><br />{formErrors.broker}</label>}
                  </td>
                  <td><label htmlFor="exchange_rate">Exchange Rate</label></td>
                  <td>
                    <input
                      type='number'
                      step=".01"
                      name='exchange_rate'
                      value={formData.exchange_rate}
                      className='input-number'
                      onChange={handleInputChange}
                    />
                    {formErrors.exchange_rate && <label className='error-label'><br />{formErrors.exchange_rate}</label>}
                  </td>
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
                    {formErrors.date && <label className='error-label'><br />{formErrors.date}</label>}
                  </td>
                  <td><label htmlFor="quantity">Quantity</label></td>
                  <td>
                    <input
                      type='number'
                      step=".01"
                      name='quantity'
                      value={formData.quantity}
                      className='input-number'
                      onChange={handleInputChange}
                    />
                    {formErrors.quantity && <label className='error-label'><br />{formErrors.quantity}</label>}
                  </td>
                </tr>
                <tr className='teste-tr'>
                  <td></td>
                  <td></td>
                  <td><label htmlFor="total">Total</label></td>
                  <td><label name='total' className='label-total'>{calculateTotal()}</label></td>
                  {formErrors.total && <label className='error-label'>{formErrors.total}</label>}
                </tr>
              </tbody>
            </table>
            <div className="add-button-div">
              <button className='add-button' onClick={handleSubmit}>Add stock</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}