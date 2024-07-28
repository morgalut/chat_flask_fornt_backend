import React, { useState } from 'react';
import axios from 'axios';

const RegisterComp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profile_picture: null
  });
  const [chatgptMessage, setChatgptMessage] = useState(''); // New state for ChatGPT message

  const { username, email, password, profile_picture } = formData;

  const onChange = e => {
    if (e.target.name === 'profile_picture') {
      setFormData({ ...formData, profile_picture: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('profile_picture', profile_picture);
  
      const res = await axios.post('http://127.0.0.1:5000/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
      setChatgptMessage(res.data.chatgpt_message); // Set ChatGPT message
    } catch (err) {
      console.error(err.response.data);
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
        <div>
          <input
            type="file"
            accept="image/*"
            name="profile_picture"
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" value="Register" />
      </form>
      {chatgptMessage && <p>{chatgptMessage}</p>} {/* Display ChatGPT message */}
    </div>
  );
};

export default RegisterComp;
