import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../src/serverCommunication/userData';


function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const groupID = formData.get('groupID');

    try {
      const isAuthenticated = await authenticateUser(username, password, groupID);
      if (isAuthenticated) {
        navigate('/start');
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setErrorMessage('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
          <label htmlFor="groupID">GroupID:</label>
          <input type="text" id="groupID" name="groupID" required />
        </div>
        <button type="submit" className="login-button">LogIn</button>
      </form>
    </div>
  );
}

export default Login;
