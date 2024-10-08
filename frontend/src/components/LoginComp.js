import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../style/LogIn.css'; // Correct path to LogIn.css
import '../style/Input.css'; // Correct path to Input.css
import '../style/Button.css'; // Correct path to Button.css


const API_URL = 'http://localhost:5000/api/login';
const BACKUP_API_URL = 'http://localhost:5001/auth/login';

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
        throw error; 
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
    <div className="login-container">
      <h1 className="login">Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          required
          className="input" // Apply the input CSS class
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required
          className="input" // Apply the input CSS class
        />
        <button type="submit" className="button">Login</button> {/* Apply the button CSS class */}
      </form>
      <p>Please log in.</p>
      {chatgptMessage && <p>{chatgptMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default LoginComp;
