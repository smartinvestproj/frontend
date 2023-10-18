import React, { useState } from 'react';
import Modal from 'react-modal';
import './styles.css';
import CapitalModal from '../newCapitalModal/CapitalModal.jsx';
import ManageCapitalModal from '../manageCapitalModal';

export default function MainCapitalModal(props) {
    const customStyles = {
        content: {
            width: '20%',
            height: '300px',
            margin: 'auto',
            padding: '20px',
            border: '1px solid #333333',
            borderRadius: '6px',
            boxShadow: 'var(--shadow-box-color)',
            backgroundColor: '#333333',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
    };

    const { closeModal, openModal } = props;
    const [modalType, setModalType] = useState(null);
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);

    const openInvestmentModal = () => {
        setModalType('Investment');
        setIsSubModalOpen(true);
    };

    const openManageModal = () => {
        setModalType('Manage');
        setIsSubModalOpen(true);
    };

    return (
        <div>
            <Modal
                isOpen={openModal && !isSubModalOpen}
                onRequestClose={() => closeModal(false)}
                shouldCloseOnOverlayClick={true}
                style={customStyles}
                contentLabel="Capital Management Modal"
                appElement={document.getElementById('root')}
            >
                <form className='main-capital-modal-container'>
                    <h2>Capital Management</h2>
                    <div className="btn-capital-container">
                        <button className='capital-submit-button' onClick={openInvestmentModal}>New Investment</button>
                        <button className='capital-submit-button' onClick={openManageModal}>Manage</button>
                    </div>
                </form>
            </Modal>
            {modalType === 'Investment' && (
                <CapitalModal closeModal={() => setIsSubModalOpen(false)} openModal={true} modalType="Investment" />
            )}
            {modalType === 'Manage' && (
                <ManageCapitalModal closeModal={() => setIsSubModalOpen(false)} openModal={true} modalType="Manage" />
            )}
        </div>
    );
}
