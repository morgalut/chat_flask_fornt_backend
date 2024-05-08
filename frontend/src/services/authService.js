// frontend/src/services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your backend API base URL

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    throw new Error('Invalid username or password');
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

export { login, logout };
