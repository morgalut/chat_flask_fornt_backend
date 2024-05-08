import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login page if token is missing
          return;
        }
        const response = await axios.get('http://127.0.0.1:5000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        if (error.response && error.response.status === 401) {
          // Handle 401 error (Unauthorized)
          setError('Unauthorized. Please log in again.');
          localStorage.removeItem('token'); // Clear token from localStorage
          navigate('/login'); // Redirect to login page
        } else {
          // For other errors, set a generic error message
          setError('Failed to fetch profile data');
        }
      }
    };

    fetchProfileData();
  }, [navigate]); // Include navigate in the dependency array

  return (
    <div>
      <h1>Profile Page</h1>
      {error && <p>{error}</p>} {/* Display error message */}
      {userData ? (
        <>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Status: {userData.status}</p>
          {userData.profilePictureUrl && (
            <img src={userData.profilePictureUrl} alt="Profile" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
          )}
          <br />
          <Link to="/chat">Go to Chat</Link>
          <br />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : 
      (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
