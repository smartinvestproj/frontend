import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { getCapital, createOrUpdateCapital, deleteCapital } from "../../../../services/Capitals.js";
import './styles.css'
import EditCapitalModal from "../editCapital/index.jsx";

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
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editingCapital, setEditingCapital] = useState(null);

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

  const handleEditCapital = (capital) => {
    console.log("Edit Capital");
    createOrUpdateCapital(capital);
    closeModal();
  };

  const removeCapital = (capitalId) => {
    const newCapitals = capitals.filter((capital) => capital.id !== capitalId);
    setCapitals(newCapitals);
  };

  const handleDelete = (capitalId) => {
    removeCapital(capitalId);
    deleteCapital(capitalId);
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
        <ol className="capitals-list">
          {capitals.map((capital, index) => (
            <li className="capital-row" key={index}>
              <label className="date-of-investment">Date of Investment</label><input type="date" value={capital.date} disabled />
              <label className="value-capital">Value</label><input type="number" value={capital.value} disabled />
              <button className='capital-submit-button manage-btn' onClick={() => {
                setEditingCapital(capital.id);
                setEditModalIsOpen(true);
              }}>Manage</button>
              <button className='capital-submit-button delete-btn' onClick={() => handleDelete(capital.id)}>
                Delete
              </button>
            </li>
          ))}
        </ol>
      </Modal>
      {editModalIsOpen && <EditCapitalModal capital={editingCapital} />}
    </>
  );
}