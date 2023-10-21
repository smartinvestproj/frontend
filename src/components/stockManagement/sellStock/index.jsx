import { useEffect, useState } from 'react';
import ModalComponent from "../modalComponent";
import SellModal from '../sellModal';
import {createOrUpdateTrade, getTradeById} from '../../../services/Trades.js';


export default function SellStock({ tradeId, setModalIsOpen, setShouldReloadPage }) {

	const modalType3 = "modal-content-sell-modal";

	const [modal2IsOpen, setModal2IsOpen] = useState(false);
	const [chooseModal, setChooseModal] = useState(false);
	const [loading, setLoading] = useState(true);

	const initialValues = {
		name: '',
		symbol: '',
		currency: '',
		broker: '',
		state: '',
		date: '',
		price: '',
		exchange_rate: '',
		quantity: '',
		tax: '',
		sell_price: '',
	}

	const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

	useEffect(() => {
		async function fetchData() {
			if (!tradeId) {
				return
			}
			try {
				const tradeResponse = await getTradeById(tradeId);
				if (tradeResponse.data?.stock) {
					setFormData({
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
	total = parseFloat(formData.price) * parseFloat(formData.quantity);
	total = total.toFixed(2);

	if (isNaN(total)) {
		total = '';
	}

	async function handleSubmit(event) {
		event.preventDefault();

		const errors = {};
		if (formData.sell_price <= 0) {
      errors.sell_price = 'Please enter a valid Sell Price';
    }
		if (formData.tax <= 0) {
      errors.tax = 'Please enter a valid tax';
    }
		if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
		
		try {
			formData.state = 0;
			await createOrUpdateTrade(formData);

			setModal2IsOpen(true);
			setChooseModal(true);
		} catch (error) {
			console.error('Error:', error);
			alert('Error. Please try again.');
		}
	}

	function handleInputChange(event) {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
		setFormErrors({})
	}

	useEffect(() => {
		setFormData({
			tax: '',
			sell_price: '',
			state: '',
		});
	}, []);

	return (

		<div>
			{loading ? (
				<div className="loading-indicator">Loading Stock...</div>
			) : (
				<form className="modal-form" action="" onSubmit={handleSubmit}>
					<div>
						<table className='table-sell-stock'>
							<thead>
								<tr>
									<th className='sell-stock'>Sell stock</th>
									<th className='name'>{formData.name}</th>
									<th className='date'>{formData.date}</th>
									<th className='symbol'>{formData.symbol}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>EUR</td>
									<td><b>€{formData.price}</b></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>Exchange Rate</td>
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
									<td className='tax'><label htmlFor="sell_price">Sell Price</label> &emsp;</td>
									<td><input type='number' name='sell_price' step=".01" className='input-number' onChange={handleInputChange}></input>{formErrors.sell_price && <label className='error-label'><br />{formErrors.sell_price}</label>}</td>
								</tr>
								<tr>
									<td>Broker </td>
									<td>{formData.broker}</td>
									<td className='tax'><label htmlFor="tax">Tax</label> &emsp;</td>
									<td><input type='number' name='tax' step=".01" className='input-number' onChange={handleInputChange}></input>{formErrors.tax && <label className='error-label'><br />{formErrors.tax}</label>}</td>
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