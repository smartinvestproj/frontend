import React, { useState } from 'react';
// import './RegisterPage.css'; // Import your CSS for styling
import axios from 'axios';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      console.log('User registered:', response.data);
      // Handle successful registration, e.g., show a success message or redirect.
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error, e.g., display error messages.
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="register-container">
      <div className="register-page">
        <p className="register-header">Register</p>
        <div className="input-container">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button onClick={handleRegister} className="register-button">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;