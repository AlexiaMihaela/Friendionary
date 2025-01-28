import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { fetchUsers, registerUser } from '../src/serverCommunication/userData';

function Register() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        setErrorMessage('Failed to load users. Please try again later.');
      }
    };

    loadUsers();
  }, []);

  const handleSubmit = async (event) => {
  
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const groupId = formData.get('groupID');

    const existingUser = users.find((user) => user._username === username);
   
    if (existingUser) {
      setErrorMessage('Username is already taken. Please choose a different one.');
      return;
    }

    const newUser = { username, password, groupId };

    try {
      await registerUser(newUser);
      alert('Registration successful! Redirecting to start page...');
      navigate('/start');
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Registration failed. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="register-form">
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
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Register;
