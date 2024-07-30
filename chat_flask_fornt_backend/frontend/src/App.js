// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import LoginComp from './components/LoginComp';
import ProfileComp from './components/ProfileComp';
import RegisterComp from './components/RegisterComp';

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
          <Route path="/register" element={<RegisterComp />} />
          <Route path="/profile" element={<ProfileComp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
