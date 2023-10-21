import React, { useState } from 'react';
import Modal from 'react-modal';
import './capitalModal.css';
import { createOrUpdateCapital } from '../../../../services/Capitals';

export default function CapitalModal() {
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

  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [dateValue, setDateValue] = useState('');
  const [value, setValue] = useState('');

  function refreshPage() {
    return window.location.reload(false);
  }
  
  const closeModal = () => {
    setModalIsOpen(false);
  };


  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const formattedDate = formatDate(selectedDate);
    setDateValue(formattedDate);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const handleValueChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const handleRequestClose = () => {
    closeModal();
    refreshPage();
  };

  const handleSubmit = () => {
    const newPost = {
      value: value,
      date: dateValue,
    };

    createOrUpdateCapital(newPost);
    closeModal();
    const timer = setTimeout(() => {
      refreshPage();
    }, 1000);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleRequestClose}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
        contentLabel="Capital Modal"
      >
        <form className='capital-modal-container'>
          <h2>Insert New Capital</h2>
          <label>Value to invest</label>
          <input
            className='capital-input'
            placeholder='2000.00'
            type="number"
            value={value}
            onChange={handleValueChange}
          />
          <label>Date of the new value invested</label>
          <input
            className='capital-input'
            type="date"
            value={dateValue}
            onChange={handleDateChange}
          />
          <button className='capital-submit-button' onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}