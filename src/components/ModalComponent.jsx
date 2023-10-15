import React, { Children } from 'react';
import Modal from 'react-modal';
import '../styles/components-styles/stockInfo.css'

function ModalComponent({ modalIsOpen, setModalIsOpen, modalType, children }) {

	return (

		<Modal
			isOpen={modalIsOpen}
			ariaHideApp={false}
			onRequestClose={() => {
				setModalIsOpen(false)}
			}
			shouldCloseOnOverlayClick={true}
			className={modalType}>
			{/* <div className="modal" > */}
				{/* onClick={() => setModalIsOpen(false)} */}
				{/* <span className="close" >&times;</span> */}
				{children}
			{/* </div> */}
		</Modal>

	);
}

export default ModalComponent;