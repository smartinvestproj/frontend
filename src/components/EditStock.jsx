import React, { useEffect, useState } from 'react';
import '../styles/components-styles/addStock.css'
import '../styles/components-styles/editStock.css'

function EditStock({ stock, setStock, props }) {
	const {
		name,
		symbol,
		date,
		money,
		quantity: initialQuantity,
		broker,
		price,
		exchange,
		tax,
		dividend,
		currency
	} = props;

	const [formData, setFormData] = useState({
		name: name || '',
		symbol: symbol || '',
		currency: currency || '',
		broker: broker || '',
		date: date || '',
	});

	const brokerOptions = ['', 'XTB', 'Degiro', 'Trading 212'];
	const currencyOptions = ['', 'EUR', 'USD', 'GBP', 'JPY'];

	const [modalIsOpen, setModalIsOpen] = useState(false);

	let total = ''
	total = parseFloat(formData.price) * parseFloat(formData.quantity);
	total = total.toFixed(2);

	if (isNaN(total)) {
		total = '';
	}

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
			symbol: formData.symbol, // Assuming symbol corresponds to symbol
			dates: [{ date: formData.date, price: parseFloat(formData.price) || 100, }], // Assuming date and money correspond to dates
			money: parseFloat(total) || 100,
			percent: formData.percent || '',
			quantity: formData.quantity || '',
			currency: formData.currency || '',
			broker: formData.broker || '',
			exchange: formData.exchange || '',
			tax: formData.tax || '',
			dividend: formData.dividend || ''
		};

		// Update the stock array using the setStock function
		setStock(prevStock => [...prevStock, newStock]);

		console.log('Stock:', stock);
		console.log('New Stock Data:', newStock);

		// Reset the formData fields to empty strings
		setFormData({
			symbol: '',
			name: '',
			currency: '',
			broker: '',
			price: '',
			date: '',
			quantity: '',
			total: ''
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

	useEffect(() => {
		// Update formData based on props when props change
		setFormData({
			name: name || '',
			symbol: symbol || '',
			currency: currency || '',
			broker: broker || '',
			date: date || '',
		});
	}, [props]);

	return (

		// <div className="modal-content" >
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
										{/* Dropdown menu for currency */}
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
										{/* Dropdown menu for broker */}
										<select name="broker" value={formData.broker} className="custom-select" onChange={handleInputChange}>
											{brokerOptions.map((broker, index) => (
												<option key={index} value={broker}>
													{broker}
												</option>
											))}
										</select>
									</td>
									<td><label htmlFor="exchange">Exchange Rate</label></td>
									<td><input type='number' name='exchange' value={formData.exchange} className='input-number' onChange={handleInputChange}></input></td>
								</tr>
								<tr>
									<td><label htmlFor="date">Date</label></td>
									<td>
										<input
											type="date"
											name="date"
											value={formData.date}  // Use value instead of defaultValue
											onChange={handleInputChange}
											className='date-picker'
										/>
									</td>
									<td><label htmlFor="quantity">Quantity</label></td>
									<td><input type='number' name='quantity' value={formData.quantity} className='input-number' onChange={handleInputChange}></input></td>
								</tr>
								<tr>
									<td><label htmlFor="dividend">Dividend</label></td>
									<td><input type='number' name='dividend' value={formData.dividend} className='input-number' onChange={handleInputChange}></input></td>
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
		// </div >
	);
}

export default EditStock;