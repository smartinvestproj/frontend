import React, { Children } from 'react';
import Modal from 'react-modal';
import '../styles/components-styles/stockInfo.css'

function ModalComponent({ modalIsOpen, setModalIsOpen, children }) {

    return (

        <Modal
            style={{
                overlay: {
                    position: 'fixed',
                    backgroundColor: 'rgba(255, 255, 255, 0)'
                }, content: {
                    border: '0px',
                    overflow: 'auto',
                    outline: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0)'
                }
            }}
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}>
            <div className="modal" >
                <div className="modal-content" >
                    {/* onClick={() => setModalIsOpen(false)} */}
                    {/* <span className="close" >&times;</span> */}
                    {children}
                </div>
            </div>
        </Modal>

    );
}

export default ModalComponent;