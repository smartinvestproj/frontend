import React, { useState, useEffect } from 'react';
import { getCapitalById, createOrUpdateCapital, deleteCapital } from '../../../../services/Capitals';
import Modal from 'react-modal';

export default function EditCapitalModal({ capital }) {
    console.log(capital.id)
    const  capitalId  = capital;
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [capitalData, setCapital] = useState({ date: '', value: '' });

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
    
      function refreshPage() {
        return window.location.reload(false);
      }
      
      const closeModal = () => {
        setModalIsOpen(false);
      };
    
      const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        const formattedDate = formatDate(selectedDate);
        setCapital({...capitalData, date: formattedDate});
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
        setCapital({...capitalData, value: newValue});
      };
    
      const handleRequestClose = () => {
        closeModal();
        refreshPage();
      };
    
      const handleSubmit = () => {
        createOrUpdateCapital(capitalData);
        closeModal();
        const timer = setTimeout(() => {
          refreshPage();
        }, 1000);
      };


    useEffect(() => {
        async function fetchCapital() {
            try {
                const capitalData = await getCapitalById(capitalId);
                setCapital(capitalData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCapital();
    }, []);

    return (
        <>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleRequestClose}
                    shouldCloseOnOverlayClick={true}
                    style={customStyles}
                    contentLabel="Show Capital"
                >
                    <form className='capital-modal-container'>
                        <h2>Capital</h2>
                        <label>Invested Value</label>
                        <input
                            className='capital-input'
                            type="number"
                            value={capitalData.value}
                            onChange={handleValueChange}
                        />
                        <label>Date of the value invested</label>
                        <input
                            className='capital-input'
                            type="date"
                            value={capitalData.date}
                            onChange={handleDateChange}
                        />
                        <button className='capital-submit-button' onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                </Modal>
                
            </div>
        </>
    )
}