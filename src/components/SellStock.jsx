import React, { useEffect, useState } from 'react';
import '../styles/components-styles/sellStock.css'
import getTrade from '../services/getTrade.jsx';
import ModalComponent from "./ModalComponent";
import axios from 'axios';
import SellModal from './SellModal';
import updateTrade from '../services/putTrade';

function SellStock({ tradeId, setModalIsOpen, setShouldReloadPage }) {

	const modalType3 = "modal-content-sell-modal";

	const [modal2IsOpen, setModal2IsOpen] = useState(false);
	const [chooseModal, setChooseModal] = useState(false);
	const [loading, setLoading] = useState(true);

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
					setLoading(false);
				}
			} catch (error) {
				console.error(error);
			}
		}
		fetchData();
	}, []);

	let total = ''
	total = parseFloat(formData.price) * parseFloat(formData.quantity);
	total = total.toFixed(2);

	if (isNaN(total)) {
		total = '';
	}

	async function handleSubmit(event) {
		event.preventDefault();

		// setDisable(true);
		try {
			await updateTrade(tradeId, {
				state: 0,
				tax: formData.tax,
			});

			setModal2IsOpen(true);
			setChooseModal(true);
			// setModalIsOpen(false);
		} catch (error) {
			console.error('Error:', error);
			alert('Error. Please try again.');
		}

		// setModalIsOpen(false)
	}

	// async function updateTrade(tradeId, data) {
	// 	try {
	// 		await axios.put(`http://127.0.0.1:8000/api/trades/${tradeId}`, data);
	// 	} catch (error) {
	// 		console.error('Error updating trade:', error);
	// 		alert('Error updating trade. Please try again.');
	// 	}
	// }

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	useEffect(() => {
		setFormData({
			tax: ''
		});
	}, []);

	return (

		<div>
			{loading ? ( // Show loading indicator while loading is true
				<div className="loading-indicator">Loading Stock...</div>
			) : (
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
							<button className='sell-button' onClick={() => handleSubmit}>Sell stock</button>
						</div>
					</div>
				</form>
			)}
			<ModalComponent modalIsOpen={modal2IsOpen} setModalIsOpen={setModalIsOpen} modalType={modalType3}>
				{chooseModal && (
					<SellModal setModalIsOpen={setModalIsOpen} isNew={false} tradeId={tradeId} setShouldReloadPage={setShouldReloadPage} />
				)}
			</ModalComponent>
		</div >
	);
}

export default SellStock;