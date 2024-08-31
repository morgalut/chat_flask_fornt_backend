import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileComp = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');
  const [chatgptMessage, setChatgptMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

 // In your ProfileComp.js
useEffect(() => {
  const fetchProfileData = async () => {
      try {
          const token = localStorage.getItem('token');
          console.log('Retrieved Token:', token);

          if (!token) {
              throw new Error('Token not found');
          }

          const response = await axios.get('http://localhost:5000/api/profile', {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });

          setUserProfile(response.data);
          setChatgptMessage(response.data.chatgpt_message);
      } catch (error) {
          console.error('Error fetching profile data:', error.response?.data || error.message);
          if (error.response) {
              setError(error.response.data.error || 'Failed to fetch profile data');
          } else {
              setError('Failed to fetch profile data from Flask API, trying backup server...');
              try {
                  const token = localStorage.getItem('token');
                  const backupResponse = await axios.get('http://localhost:5001/api/profile', {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  });
                  setUserProfile(backupResponse.data);
                  setChatgptMessage(backupResponse.data.chatgpt_message);
              } catch (backupError) {
                  console.error('Error fetching profile data from backup server:', backupError.response?.data || backupError.message);
                  setError('Failed to fetch profile data from both servers');
              }
          }
      }
  };

  fetchProfileData();
}, []);


  return (
    <div>
      <h2>Profile Page</h2>
      {error && <p>{error}</p>}
      {userProfile ? (
        <div>
          <p><strong>Username:</strong> {userProfile.username}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>Status:</strong> {userProfile.status}</p>
          {chatgptMessage && <p><strong>ChatGPT Message:</strong> {chatgptMessage}</p>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfileComp;
