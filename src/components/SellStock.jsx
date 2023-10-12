import React, { useEffect, useState } from 'react';
import '../styles/components-styles/sellStock.css'
import getTrade from '../services/getTrade.jsx';

function SellStock({ tradeId }) {

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

	const [modalIsOpen, setModalIsOpen] = useState(false);

	let total = ''
	total = parseFloat(formData.price) * parseFloat(formData.quantity);
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
			<form className="modal-form" action="" onSubmit={handleSubmit}>
				<div>
					<table className='modal-table-sell-stock sell-stock-table'>
						<thead>
							<tr>
								<th><span className='sell-stock'>Sell stock</span></th>
								<th className='name-l'>{formData.name}</th>
								<th className='date'>{formData.date}</th>
								<th className='name-s'>{formData.symbol}</th>
							</tr>
						</thead>
						<hr />
						<tbody>
							<tr>
								<td>EUR</td>
								<td><b>€{formData.price}</b></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Exchnage Rate</td>
								<td><b>{formData.exchange_rate}</b></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Quantity </td>
								<td><b>{formData.quantity}</b></td>
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
								<td>{formData.broker}</td>
								<td className='tax'><label htmlFor="tax">Tax</label> &emsp;</td>
								<td><input type='number' name='tax' className='input-number' onChange={handleInputChange}></input></td>
							</tr>
						</tbody>
					</table>
					<div className="sell-button-div">
						<button className='sell-button' onClick={handleSubmit}>Sell stock</button>
					</div>
				</div>
			</form>
		</div >
	);
}

export default SellStock;