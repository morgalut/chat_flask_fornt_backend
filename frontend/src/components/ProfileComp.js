// ProfileComp.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000'; // Flask API
const BACKUP_API_URL = 'http://localhost:5001'; // Node.js backup API

const ProfileComp = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');
  const [chatgptMessage, setChatgptMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token not found');
        return;
      }

      try {
        // Fetch from Flask API
        const response = await axios.get(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserProfile(response.data);
        setChatgptMessage(response.data.chatgpt_message);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to fetch profile data from Flask API, trying backup server...');

        try {
          // Fetch from Node.js backup API
          const backupResponse = await axios.get(`${BACKUP_API_URL}/profile/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserProfile(backupResponse.data);
          setChatgptMessage(backupResponse.data.chatgpt_message);
        } catch (backupError) {
          console.error('Error fetching profile data from backup server:', backupError);
          setError('Failed to fetch profile data from both servers');
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