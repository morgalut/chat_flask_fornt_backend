import React from "react";
import { Link } from "react-router-dom";
import './navbar.css'; // Adjust path as necessary

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li onClick={handleLogout}>Logout</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
