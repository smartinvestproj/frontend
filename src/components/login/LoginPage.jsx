import React, { useState } from 'react';
import './LoginPage.css';
import LoginImage from '../../assets/LoginImage.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import { useStateContext } from "../contexts/ContextProvider";

function LoginPage() {
  // const history = useHistory();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  // const { setCurrentUser, setUserToken } = useStateContext();
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      sessionStorage.removeItem('token')
      console.log(sessionStorage.token)

      const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
      const token = response.data.api_token;

      console.log(response.data.api_token);
      sessionStorage.setItem('token', token);
      console.log(sessionStorage.token)

      navigate("/")

    } catch (error) {
      if (error.response.status === 401) {
        // Handle authentication error, show an error message, or clear the form.
        console.error('Authentication failed: Invalid credentials');
        console.error(error);
      } else {
        console.error('Login failed:', error);
      }
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <div className="login-sidebar">
        <img src={LoginImage} alt="Login" className="sidebar-image" />
      </div>
      <div className="login-page">
        <form action="" onSubmit={handleLogin}>
          <p className="not-member">
            Not a member? <a className="register" href="#">
              Register now
            </a>
          </p>
          <p className="login-header">Log In</p>
          <div className="input-container">
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="username"
              value={credentials.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
            <a href="#" className="forgot-password">
              Forgot your password?
            </a>
            <button onClick={handleLogin} className="login" type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;