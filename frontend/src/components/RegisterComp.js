import React, { useState } from 'react';
import axios from 'axios';

const RegisterComp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [chatgptMessage, setChatgptMessage] = useState('');

  const { username, email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    try {
      const res = await axios.post('http://localhost:5000/api/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setChatgptMessage(res.data.chatgpt_message);
    } catch (err) {
      console.error('Error with Flask API, trying backup server:', err);
      try {
        const backupRes = await axios.post('http://localhost:5001/api/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setChatgptMessage(backupRes.data.chatgpt_message);
      } catch (backupError) {
        console.error('Error with backup server:', backupError);
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={e => onSubmit(e)} encType="multipart/form-data">
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <input type="submit" value="Register" />
      </form>
      {chatgptMessage && <p>{chatgptMessage}</p>}
    </div>
  );
};

export default RegisterComp;
