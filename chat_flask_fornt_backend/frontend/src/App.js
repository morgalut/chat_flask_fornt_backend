// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import LoginComp from './components/LoginComp';
import ProfileComp from './components/ProfileComp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginComp setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfileComp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
