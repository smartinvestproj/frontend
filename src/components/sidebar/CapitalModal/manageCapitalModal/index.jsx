import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { getCapital } from "../../../../services/Capitals.js";

export default function ManageCapitalModal() {
  const customStyles = {
    content: {
        width: '50%',
        height: '600px',
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
  const [capitals, setCapitals] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  function refreshPage() {
    return window.location.reload(false);
  }

  useEffect(() => {
    const fetchCapitals = async () => {
      const capitalsData = await getCapital();
      setCapitals(capitalsData);
    };

    fetchCapitals();
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const handleRequestClose = () => {
    closeModal();
    refreshPage();
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleRequestClose}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
        contentLabel="Manage Capital Modal"
      >
        <h1>Manage Capital Modal</h1>
        <ol>
          {capitals.map((capital, index) => (
            <li key={index}>
              Date of deposit: {capital.date} | Value: {capital.value}€
              <button>Editar</button>
            </li>
          ))}
        </ol>
      </Modal>
    </>
  );
}
