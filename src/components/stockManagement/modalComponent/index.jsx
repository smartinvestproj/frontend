import React from 'react';
import Modal from 'react-modal';
import '../stockInfo/styles.css';

export default function ModalComponent({ modalIsOpen, setModalIsOpen, modalType, children }) {
	
	return (
		<Modal
		isOpen={modalIsOpen}
		ariaHideApp={false}
		onRequestClose={() => {
			setModalIsOpen(false)}
		}
			shouldCloseOnOverlayClick={true}
			className={modalType}>
				{children}
		</Modal>

	);
}
