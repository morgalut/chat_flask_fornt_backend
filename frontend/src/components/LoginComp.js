import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/login'; // Updated to include '/api/login'
const BACKUP_API_URL = 'http://localhost:5001/auth/login'; // Updated to include '/api/login'

const LoginComp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [chatgptMessage, setChatgptMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const login = async (url) => {
      try {
        const response = await axios.post(url, { username, password });
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true);
        setChatgptMessage(response.data.chatgpt_message);
      } catch (error) {
        throw error; // Rethrow error to be caught by higher-level handler
      }
    };
  
    try {
      await login(API_URL);
    } catch (error) {
      console.warn('Primary server failed, trying backup server...');
      try {
        await login(BACKUP_API_URL);
      } catch (backupError) {
        console.error('Error logging in on backup server:', backupError.response?.data?.message || backupError.message);
        setErrorMessage('Login failed. Please check your credentials and try again.');
      }
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          required
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Please log in.</p>
      {chatgptMessage && <p>{chatgptMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default LoginComp;
