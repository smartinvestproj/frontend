import React, { Children } from 'react';
import Modal from 'react-modal';
import '../styles/components-styles/stockInfo.css'

function ModalComponent({ modalIsOpen, setModalIsOpen, children }) {

	return (

		<Modal
			isOpen={modalIsOpen}
			ariaHideApp={false}
			onRequestClose={() => {
				setModalIsOpen(false)}
			}
			shouldCloseOnOverlayClick={true}
			className={"modal-content"}>
			{/* <div className="modal" > */}
				{/* onClick={() => setModalIsOpen(false)} */}
				{/* <span className="close" >&times;</span> */}
				{children}
			{/* </div> */}
		</Modal>

	);
}

export default ModalComponent;