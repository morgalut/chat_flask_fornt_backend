// frontend/src/pages/LoginPage.js
import React, { useState } from 'react';
import LoginComp from '../components/LoginComp';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <h1>Login Page</h1>
      {!isLoggedIn ? (
        <>
          <LoginComp handleLogin={handleLogin} setIsLoggedIn={setIsLoggedIn} />
          <p>Please log in.</p>
        </>
      ) : (
        <>
          <Navigate to="/profile" />
          <p>You are logged in!</p>
        </>
      )}
    </div>
  );
};

export default LoginPage;
