import React, { useEffect, useState } from 'react';
import getTrade from '../services/getTrade.jsx';
import updateTrade from '../services/putTrade.js';

import '../styles/components-styles/addStock.css'
import '../styles/components-styles/editStock.css'

function EditStock({ tradeId, setModalIsOpen, setShouldReloadPage }) {

	const initialValues = {
		name: '',
		symbol: '',
		currency: '',
		broker: '',
		date: '',
		price: '',
		exchange_rate: '',
		quantity: '',
		dividends: ''
	}

	const [formData, setFormData] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});

	const [loading, setLoading] = useState(true);

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
					setLoading(false);
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

		const errors = {};
		if (!formData.price) {
			errors.price = 'Please enter a price';
		}
		if (!formData.broker) {
			errors.broker = 'Please select a broker';
		}
		if (!formData.exchange_rate) {
			errors.exchange_rate = 'Please enter a exchange_rate';
		}
		if (!formData.date) {
			errors.date = 'Please select a date';
		}
		if (!formData.quantity) {
			errors.quantity = 'Please enter a quantity';
		}
		if (!formData.dividends) {
			errors.dividends = 'Please enter a dividend'
		}
		if (total > 9999999) {
			errors.total = 'Please enter a valid price or quantity'
		}
		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			return;
		}
		try {
			await updateTrade(tradeId, {
				date: formData.date,
				broker: formData.broker,
				quantity: parseFloat(formData.quantity) || 2,
				price: parseFloat(formData.price) || 2,
				total: total || 2,
				exchange_rate: parseFloat(formData.exchange_rate) || 2,
				dividends: formData.dividends,
			});

			if (setShouldReloadPage) {
				setShouldReloadPage(true);
			}

			setModalIsOpen(false);
		} catch (error) {
			console.error('Error:', error);
			alert('Error. Please try again.');
		}

		setModalIsOpen(false);
	}

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
		setFormErrors({})
	};

	useEffect(() => {
		setFormData({
			name: '',
			symbol: '',
			currency: '',
			broker: '',
			date: '',
			tax: '',
			dividends: '',
		});
	}, []);

	if (loading) {
		return <div>Loading Trade...</div>;
	}

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
								<td><label htmlFor="symbol">Symbol</label>{formErrors.symbol && <label className='error-label'><br />{formErrors.symbol}</label>}</td>
								<td><input type='text' name='symbol' value={formData.symbol} onChange={handleInputChange} disabled></input></td>
								<td><label htmlFor="currency">Currency</label>{formErrors.currency && <label className='error-label'><br />{formErrors.currency}</label>}</td>
								<td>
									<select name="currency" value={formData.currency} className="custom-select" onChange={handleInputChange} disabled>
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
								<td><input type='text' name='name' value={formData.name} onChange={handleInputChange} disabled></input></td>
								<td><label htmlFor="price">Price</label>{formErrors.price && <label className='error-label'><br />{formErrors.price}</label>}</td>
								<td><input type='number' step=".01" name='price' value={formData.price} className='input-number' onChange={handleInputChange}></input></td>
							</tr>
							<tr>
								<td><label htmlFor="broker">Broker</label>{formErrors.broker && <label className='error-label'><br />{formErrors.broker}</label>}</td>
								<td>
									<select name="broker" value={formData.broker} className="custom-select" onChange={handleInputChange}>
										{brokerOptions.map((broker, index) => (
											<option key={index} value={broker}>
												{broker}
											</option>
										))}
									</select>
								</td>
								<td><label htmlFor="exchange_rate">Exchange Rate</label>{formErrors.exchange_rate && <label className='error-label'><br />{formErrors.exchange_rate}</label>}</td>
								<td><input type='number' step=".01" name='exchange_rate' value={formData.exchange_rate} className='input-number' onChange={handleInputChange}></input></td>
							</tr>
							<tr>
								<td><label htmlFor="date">Date</label>{formErrors.date && <label className='error-label'><br />{formErrors.date}</label>}</td>
								<td>
									<input
										type="date"
										name="date"
										value={formData.date}
										onChange={handleInputChange}
										className='date-picker'
									/>
								</td>
								<td><label htmlFor="quantity">Quantity</label>{formErrors.quantity && <label className='error-label'><br />{formErrors.quantity}</label>}</td>
								<td><input type='number' step=".01" name='quantity' value={formData.quantity} className='input-number' onChange={handleInputChange}></input></td>
							</tr>
							<tr>
								<td><label htmlFor="dividend">Dividend</label>{formErrors.dividends && <label className='error-label'><br />{formErrors.dividends}</label>}</td>
								<td><input type='number' step=".01" name='dividends' value={formData.dividends} className='input-number' onChange={handleInputChange}></input></td>
								<td><label htmlFor="total">Total</label>{formErrors.total && <label className='error-label'><br />{formErrors.total}</label>}</td>
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