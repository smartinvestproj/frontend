import React, { useEffect, useState } from 'react';
import getTrade from '../services/getTrade.jsx';
import '../styles/components-styles/addStock.css'
import '../styles/components-styles/editStock.css'
import axios from 'axios';

function EditStock({ tradeId, setModalIsOpen }) {

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
			setModalIsOpen(false);
		} catch (error) {
			console.error('Error:', error);
			alert('Error. Please try again.');
		}

		setModalIsOpen(false);
	}

	async function updateTrade(tradeId, data) {
    try {
      await axios.put(`http://127.0.0.1:8000/api/trades/${tradeId}`, data);
    } catch (error) {
      console.error('Error updating trade:', error);
      alert('Error updating trade. Please try again.');
    }
  }

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	useEffect(() => {
		setFormData({
			name: '',
			symbol: '',
			currency: '',
			broker: '',
			date: '',
			tax: ''
		});
	}, []);

	return (

			<div>
				<div className="edit-stock-header">
					<h2>Edit Stock</h2>
					<div className="edit-stock-plus">+</div>
				</div>
				<hr className='edit-stock-hr' />
				<div>
					<form className="modal-form" action="" onSubmit={handleSubmit}>
						<table className='edit-stock-table'>
							<thead>
								<th></th>
								<th></th>
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
									<td><label htmlFor="exchange">Exchange Rate</label></td>
									<td><input type='number' name='exchange' value={formData.exchange_rate} className='input-number' onChange={handleInputChange}></input></td>
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
								<tr>
									<td><label htmlFor="dividend">Dividend</label></td>
									<td><input type='number' name='dividend' value={formData.dividends} className='input-number' onChange={handleInputChange}></input></td>
									<td><label htmlFor="total">Total</label></td>
									<td><label name='total' className='label-total'>{total}</label></td>
								</tr>
							</tbody>
						</table>
					</form>
					<div className="edit-button-div">
						<button className='edit-button' onClick={handleSubmit}>Edit stock</button>
					</div>
				</div>
			</div >
	);
}

export default EditStock;