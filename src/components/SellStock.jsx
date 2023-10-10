import React, { useEffect, useState } from 'react';
import '../styles/components-styles/sellStock.css'

function SellStock({ stock, setStock, props }) {
	const {
		name,
		symbol,
		date,
		money,
		broker,
		price,
		exchange,
		quantity,
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
	total = parseFloat(price) * parseFloat(quantity);
	total = total.toFixed(2);

	if (isNaN(total)) {
		total = '';
	}

  function handleSubmit(event) {
		event.preventDefault();
		//ao vender por o state a false
		
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
			tax: tax || ''
		});
	}, [props]);

	return (

		// <div className="modal-content" >
			<div>
				<form className="modal-form" action="" onSubmit={handleSubmit}>
					<div>
						<table className='modal-table-sell-stock sell-stock-table'>
							<thead>
								<tr>
									<th><span className='sell-stock'>Sell stock</span></th>
									<th className='name-l'>{name}</th>
									<th className='date'>{date}</th>
									<th className='name-s'>{symbol}</th>
								</tr>
							</thead>
							<hr />
							<tbody>
								<tr>
									<td>EUR</td>
									<td><b>€{price}</b></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>Exchnage Rate</td>
									<td><b>{exchange}</b></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>Quantity </td>
									<td><b>{quantity}</b></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>Total </td>
									<td><b>{total}</b></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>Broker </td>
									<td>{broker}</td>
									<td className='tax'><label htmlFor="tax">Tax</label> &emsp;</td>
									<td><input type='number' name='tax' value={formData.tax} className='input-number' onChange={handleInputChange}></input></td>
								</tr>
							</tbody>
						</table>
						<div className="sell-button-div">
							<button className='sell-button' onClick={handleSubmit}>Sell stock</button>
						</div>
					</div>
				</form>
			</div >
		// </div >
	);
}

export default SellStock;