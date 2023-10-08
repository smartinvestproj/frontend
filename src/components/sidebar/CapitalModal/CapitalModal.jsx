import React, { useState } from 'react';
import Modal from 'react-modal';
import './capitalModal.css';
import postCapital from '../../../services/postCapital';

export default function CapitalModal(props) {
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
  const [dateValue, setDateValue] = useState('');
  const [value, setValue] = useState('');

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

  const handleSubmit = () => {
    const newPost = {
      value: value,
      date: dateValue,
    };

    console.log('Data formatada:', dateValue);
    postCapital(newPost);
    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
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
