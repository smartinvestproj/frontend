import React, { useState } from 'react';
import './addStock.css'

function AddStock({ stock, setStock }) {

  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    currency: '',
    country: '',
    broker: '',
    date: '',
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
  
    // Check if formData is empty (null or all fields are empty)
    if (Object.values(formData).every(value => value === '' || value === null)) {
      console.log('Form data is empty. Not doing anything.');
      return;
    }
  
    // Find the last ID in the stock array
    const lastStock = stock[stock.length - 1];
    const lastId = lastStock ? lastStock.id : 0;
  
    // Calculate the new ID (lastId + 1)
    const newId = lastId + 1;
  
    // Create the new stock object in the desired format
    const newStock = {
      id: newId,
      name: formData.name,
      tinyName: formData.symbol, // Assuming symbol corresponds to tinyName
      dates: [{ date: formData.date, price: parseFloat(formData.money) || 100, }], // Assuming date and money correspond to dates
      money: parseFloat(formData.money) || 100,
      percent: formData.percent || '',
      quantity: formData.quantity || '',
      country: formData.country || '',
      broker: formData.broker || '',
    };
  
    // Update the stock array using the setStock function
    setStock(prevStock => [...prevStock, newStock]);
  
    console.log('Stock :', stock);
    console.log('New Stock Data:', newStock);
  
    // Reset the formData fields
    setFormData({
      name: '',
      symbol: '',
      currency: '',
      country: '',
      broker: '',
      date: '',
    });
  
    setModalIsOpen(false);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="add-stock-header">
        <h2>Add Stock</h2>
        <div className="add-stock-plus">+</div>
      </div>
      <hr className='add-stock-hr'/>
      <div>
        <form className="modal-form" action="" onSubmit={handleSubmit}>
          <table className='stock-table'>
            <thead>
              <th></th>
              <th></th>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td><input type='text' name='name' onChange={handleInputChange}></input></td>
              </tr>
              <tr>
                <td>Symbol</td>
                <td><input type='text' name='symbol' onChange={handleInputChange}></input></td>
              </tr>
              <tr>
                <td>Currency</td>
                <td><input type='text' name='currency' onChange={handleInputChange}></input></td>
              </tr>
              <tr>
                <td>Country</td>
                <td><input type='text' name='country' onChange={handleInputChange}></input></td>
              </tr>
              <tr>
                <td>Broker</td>
                <td><input type='text' name='broker' onChange={handleInputChange}></input></td>
              </tr>
              <tr>
                <td>Date</td>
                <td><input type='text' name='date' onChange={handleInputChange}></input></td>
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