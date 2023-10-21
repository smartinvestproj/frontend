import React from 'react';
import './loginComponent.css';
import LoginImage from '../../assets/LoginImage.png';

export default function LoginComponent() {
  return (
    <div className="login-container">
      <div className="login-sidebar">
        <img src={LoginImage} alt="Login" className="sidebar-image" />
      </div>
      <div className="login-page">
        <p className="not-member">Not a member? <a className="register" href="">Register now</a></p>
        <p className="login-header">Log In</p>
        <div className="input-container">
          <input type="text" placeholder="Username or email" className="username" />
          <input type="password" placeholder="Password" className="password" />
          <a href="#" className="forgot-password">Forgot your password?</a>
          <button className="login">Log in</button>
        </div>
      </div>
    </div>
  );
}
