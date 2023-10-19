import React, { useEffect, useState } from 'react';
import getTrade from '../services/getTrade';
import updateTrade from '../services/putTrade';


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
				quantity: parseFloat(formData.quantity) || 0,
				price: parseFloat(formData.price) || 0,
				total: total || 0,
				exchange_rate: parseFloat(formData.exchange_rate) || 0,
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

	function handleInputChange(event) {
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
					<table className='table-edit-stock'>
						<thead>

						</thead>
						<tbody>
							<tr>
								<td><label htmlFor="symbol">Symbol</label></td>
								<td><input type='text' name='symbol' value={formData.symbol} onChange={handleInputChange} disabled></input>{formErrors.symbol && <label className='error-label'><br />{formErrors.symbol}</label>}</td>
								<td><label htmlFor="currency">Currency</label></td>
								<td>
									<select name="currency" value={formData.currency} className="custom-select" onChange={handleInputChange} disabled>
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
								<td><input type='text' name='name' value={formData.name} onChange={handleInputChange} disabled>{formErrors.name && <label className='error-label'><br />{formErrors.name}</label>}</input></td>
								<td><label htmlFor="price">Price</label></td>
								<td><input type='number' step=".01" name='price' value={formData.price} className='input-number' onChange={handleInputChange}></input>{formErrors.price && <label className='error-label'><br />{formErrors.price}</label>}</td>
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
									{formErrors.broker && <label className='error-label'><br />{formErrors.broker}</label>}
								</td>
								<td><label htmlFor="exchange_rate">Exchange Rate</label></td>
								<td><input type='number' step=".01" name='exchange_rate' value={formData.exchange_rate} className='input-number' onChange={handleInputChange}></input>{formErrors.exchange_rate && <label className='error-label'><br />{formErrors.exchange_rate}</label>}</td>
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
								<td><input type='number' step=".01" name='quantity' value={formData.quantity} className='input-number' onChange={handleInputChange}></input>{formErrors.quantity && <label className='error-label'><br />{formErrors.quantity}</label>}</td>
							</tr>
							<tr>
								<td><label htmlFor="dividend">Dividend</label></td>
								<td><input type='number' step=".01" name='dividends' value={formData.dividends} className='input-number' onChange={handleInputChange}></input>{formErrors.dividends && <label className='error-label'><br />{formErrors.dividends}</label>}</td>
								<td><label htmlFor="total">Total</label></td>
								<td><label name='total' className='label-total'>{total}</label>{formErrors.total && <label className='error-label'><br />{formErrors.total}</label>}</td>
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