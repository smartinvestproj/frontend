import React, { useEffect, useState } from 'react';
import { getTradeById, createOrUpdateTrade } from '../../../services/Trades.js';
import './styles.css';

export default function EditStock({ tradeId, setModalIsOpen, setShouldReloadPage }) {

	const [trade, setTrade] = useState({
		name: '',
		symbol: '',
		currency: '',
		price: '',
		broker: '',
		exchange_rate: '',
		date: '',
		quantity: '',
		dividends: '',
		total: '',
	});
	const [formErrors, setFormErrors] = useState({});
	const [loading, setLoading] = useState(true);
	const currencyOptions = ['', 'EUR', 'USD', 'GBP', 'JPY'];

	useEffect(() => {
		async function fetchData() {
			try {
				const tradeResponse = await getTradeById(tradeId);
				if (tradeResponse.data?.stock) {
					setTrade({
						name: tradeResponse.data.stock.name || '',
						symbol: tradeResponse.data.stock.symbol || '',
						currency: tradeResponse.data.stock.currency || '',
						...tradeResponse.data,
					});
					setLoading(false);
				}
			} catch (error) {
				console.error(error);
			}
		}
		fetchData();
	}, []);

	let total = ''
	total = (parseFloat(trade.price) * parseFloat(trade.quantity)).toFixed(2);

	if (isNaN(total)) {
		total = '';
	}

	async function handleSubmit(event) {
		event.preventDefault();

		const errors = {};
		if (!trade.price) {
			errors.price = 'Please enter a price';
		}
		if (!trade.broker) {
			errors.broker = 'Please select a broker';
		}
		if (!trade.exchange_rate) {
			errors.exchange_rate = 'Please enter a exchange_rate';
		}
		if (!trade.date) {
			errors.date = 'Please select a date';
		}
		if (!trade.quantity) {
			errors.quantity = 'Please enter a quantity';
		}
		if (!trade.dividends) {
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
			createOrUpdateTrade(trade);
			if (setShouldReloadPage) {
				const timer = setTimeout(() => {
					setShouldReloadPage(true);
				}, 900);
			}

			setModalIsOpen(false);
		} catch (error) {
			console.error('Error:', error);
			alert('Error. Please try again.');
		}
		setModalIsOpen(false);
	}

	function handleInputChange(event) {
		const { name, value } = event.target;
		setTrade({
			...trade,
			[name]: value,
		});
		setFormErrors({})
	};

	function handleTotalChange(event) {
		const { name, value } = event.target;
		setTrade({
			...trade,
			total: value,
		});
		setFormErrors({});
	}

	useEffect(() => {
		if (!isNaN(trade.price) && !isNaN(trade.quantity)) {
			const total = (parseFloat(trade.price) * parseFloat(trade.quantity)).toFixed(2);
			setTrade({
				...trade,
				total: total,
			});
		}
	}, [trade.price, trade.quantity]);

	return loading ?
	<div>Loading Trade...</div>
	: (
		<div>
			<div className="edit-stock-header">
				<h2>Edit Stock</h2>
				<div className="edit-stock-plus">+</div>
			</div>
			<hr className='edit-stock-hr' />
			<div>
				<form className="modal-form">
					<table className='table-edit-stock'>
						<tbody>
							<tr>
								<td><label htmlFor="symbol">Symbol</label></td>
								<td><input type='text' name='symbol' value={trade.symbol} onChange={handleInputChange} disabled></input>{formErrors.symbol && <label className='error-label'><br />{formErrors.symbol}</label>}</td>
								<td><label htmlFor="currency">Currency</label></td>
								<td>
									<select name="currency" value={trade.currency} className="custom-select" onChange={handleInputChange} disabled>
										{currencyOptions.map((currency, index) => (
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
								<td><input type='text' name='name' value={trade.name} onChange={handleInputChange} disabled>{formErrors.name && <label className='error-label'><br />{formErrors.name}</label>}</input></td>
								<td><label htmlFor="price">Price</label></td>
								<td><input type='number' step=".01" name='price' value={trade.price} className='input-number' onChange={handleInputChange}></input>{formErrors.price && <label className='error-label'><br />{formErrors.price}</label>}</td>
							</tr>
							<tr>
								<td><label htmlFor="broker">Broker</label></td>
								<td>
									<input type="text" value={trade.broker} name='broker' onChange={handleInputChange} />
									{formErrors.broker && <label className='error-label'><br />{formErrors.broker}</label>}
								</td>
								<td><label htmlFor="exchange_rate">Exchange Rate</label></td>
								<td><input type='number' step=".01" name='exchange_rate' value={trade.exchange_rate} className='input-number' onChange={handleInputChange}></input>{formErrors.exchange_rate && <label className='error-label'><br />{formErrors.exchange_rate}</label>}</td>
							</tr>
							<tr>
								<td><label htmlFor="date">Date</label></td>
								<td>
									<input type="date" name="date" value={trade.date} onChange={handleInputChange} className='date-picker' />
									{formErrors.date && <label className='error-label'><br />{formErrors.date}</label>}
								</td>
								<td><label htmlFor="quantity">Quantity</label></td>
								<td><input type='number' step=".01" name='quantity' value={trade.quantity} className='input-number' onChange={handleInputChange}></input>{formErrors.quantity && <label className='error-label'><br />{formErrors.quantity}</label>}</td>
							</tr>
							<tr>
								<td><label htmlFor="dividend">Dividend</label></td>
								<td><input type='number' step=".01" name='dividends' value={trade.dividends} className='input-number' onChange={handleInputChange}></input>{formErrors.dividends && <label className='error-label'><br />{formErrors.dividends}</label>}</td>
								<td><label htmlFor="total">Total</label></td>
								<td>
									<label name='total' onChange={handleTotalChange} value={total} className='label-total'>{total}</label>
									<input type='hidden' step=".01" name='total' value={trade.total} className='input-number' onChange={handleTotalChange} disabled></input>
									{formErrors.total && <label className='error-label'><br />{formErrors.total}</label>}
								</td>
							</tr>
						</tbody>
					</table>
					<div className="edit-button-div">
						<button className='edit-button' onClick={handleSubmit}>Edit stock</button>
					</div>
				</form>
			</div>
		</div >
		);
}