import React, { useState } from 'react';
import axios from 'axios';
import '../style/Input.css'; // Ensure this path is correct
import '../style/Button.css'; // Ensure this path is correct
import '../style/Register.css'; // Ensure this path is correct

const API_URL = 'http://localhost:5000/api/register';
const BACKUP_API_URL = 'http://localhost:5001/auth/register';

const RegisterComp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [chatgptMessage, setChatgptMessage] = useState('');
  const [error, setError] = useState('');

  const { username, email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(API_URL, { username, email, password }, { headers: { 'Content-Type': 'application/json' } });
      setChatgptMessage(res.data.chatgpt_message);
      setError('');
    } catch (err) {
      console.error('Error with Flask API:', err.message);

      try {
        const backupRes = await axios.post(BACKUP_API_URL, { username, email, password }, { headers: { 'Content-Type': 'application/json' } });
        setChatgptMessage(backupRes.data.chatgpt_message);
        setError('');
      } catch (backupError) {
        console.error('Error with backup server:', backupError.message);
        setError('Failed to register. Please try again later.');
        setChatgptMessage('');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
            required
            className="input" // Apply the input CSS class
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="input" // Apply the input CSS class
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
            className="input" // Apply the input CSS class
          />
        </div>
        <input type="submit" value="Register" className="button" /> {/* Apply the button CSS class */}
      </form>
      {chatgptMessage && <p className="success">{chatgptMessage}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RegisterComp;
