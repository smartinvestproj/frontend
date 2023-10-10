import React, { useState } from 'react';
import axios from 'axios';

const StockTradeForm = () => {
  const [formData, setFormData] = useState({
    stockSymbol: '',
    stockName: '',
    stockCurrency: '',
    tradeState: true,
    tradeDate: '',
    tradeBroker: '',
    tradeQuantity: 0,
    tradePrice: 0,
    tradeTotal: 0,
    tradeExchangeRate: 0,
    tradeTax: 0,
    tradeDividends: 0,
  });

  const [createdStockId, setCreatedStockId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const createStock = async () => {
    try {
      // Send a POST request to create a new stock
      const response = await axios.post('http://127.0.0.1:8000/api/stocks', {
        symbol: formData.stockSymbol,
        name: formData.stockName,
        currency: formData.stockCurrency,
      });

      return response.data;
      // Get the ID of the created stock from the response
      // setCreatedStockId(response.data.id);
    } catch (error) {
      console.error('Error creating stock:', error);
      alert('Error creating stock. Please try again.');
    }
  };

  const createTrade = async () => {
    try {
      console.log("working on it");
      // Use the createdStockId to associate the trade with the stock
      await axios.post(`http://127.0.0.1:8000/api/trades`, {
        stock_id: createdStockId, // Pass the stock_id in the request body
        state: formData.tradeState,
        date: formData.tradeDate,
        broker: formData.tradeBroker,
        quantity: parseFloat(formData.tradeQuantity),
        price: parseFloat(formData.tradePrice),
        total: parseFloat(formData.tradeTotal),
        exchange_rate: parseFloat(formData.tradeExchangeRate),
        tax: parseFloat(formData.tradeTax),
        dividends: parseFloat(formData.tradeDividends),
      });
      console.log("done!");
      // Reset the form after successful submission
      setFormData({
        stockSymbol: '',
        stockName: '',
        stockCurrency: '',
        tradeState: true,
        tradeDate: '',
        tradeBroker: '',
        tradeQuantity: 0,
        tradePrice: 0,
        tradeTotal: 0,
        tradeExchangeRate: 0,
        tradeTax: 0,
        tradeDividends: 0,
      });
  
      // Clear the createdStockId to prepare for the next stock creation
      setCreatedStockId(null);
  
      alert('Stock and Trade created successfully');
    } catch (error) {
      console.error('Error creating trade:', error);
      alert('Error creating trade. Please try again.');
    }
  };

  const handleStockAndTradeCreation = async (e) => {
    e.preventDefault();

    // Create the stock first
    await createStock();

    // Then create the trade associated with the created stock

    await createTrade();

  };

  return (
    <div>
      <h1>Create Stock and Trade</h1>
      <form onSubmit={handleStockAndTradeCreation}>
        {/* Stock Fields */}
        <div>
          <label>Stock Symbol:</label>
          <input
            type="text"
            name="stockSymbol"
            value={formData.stockSymbol}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Stock Name:</label>
          <input
            type="text"
            name="stockName"
            value={formData.stockName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Stock Currency:</label>
          <input
            type="text"
            name="stockCurrency"
            value={formData.stockCurrency}
            onChange={handleChange}
          />
        </div>

        {/* Trade Fields */}
        <div>
          <label>Trade State:</label>
          <input
            type="checkbox"
            name="tradeState"
            checked={formData.tradeState}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Trade Date:</label>
          <input
            type="date"
            name="tradeDate"
            value={formData.tradeDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Trade Broker:</label>
          <input
            type="text"
            name="tradeBroker"
            value={formData.tradeBroker}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Trade Quantity:</label>
          <input
            type="number"
            name="tradeQuantity"
            value={formData.tradeQuantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Trade Price:</label>
          <input
            type="number"
            name="tradePrice"
            value={formData.tradePrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Trade Total:</label>
          <input
            type="number"
            name="tradeTotal"
            value={formData.tradeTotal}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Trade Exchange Rate:</label>
          <input
            type="number"
            name="tradeExchangeRate"
            value={formData.tradeExchangeRate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Trade Tax:</label>
          <input
            type="number"
            name="tradeTax"
            value={formData.tradeTax}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Trade Dividends:</label>
          <input
            type="number"
            name="tradeDividends"
            value={formData.tradeDividends}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Stock and Trade</button>
      </form>
    </div>
  );
};

export default StockTradeForm;