// ProfileComp.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileComp = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');
  const [chatgptMessage, setChatgptMessage] = useState(''); // State for ChatGPT message
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
        setChatgptMessage(response.data.chatgpt_message); // Set ChatGPT message
      } catch (error) {
        console.error('Error fetching profile data:', error.response?.data || error.message);
        if (error.response) {
          setError(error.response.data.error || 'Failed to fetch profile data');
        } else {
          setError('Failed to fetch profile data');
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
          <div style={{ textAlign: 'center' }}>
            {userProfile.profilePictureUrl && (
              <img 
                src={`http://localhost:5000${userProfile.profilePictureUrl}`} 
                alt="Profile" 
                style={{ borderRadius: '50%', width: '150px', height: '150px' }}
              />
            )}
          </div>
          <p><strong>Username:</strong> {userProfile.username}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          <p><strong>Status:</strong> {userProfile.status}</p>
          {chatgptMessage && <p>{chatgptMessage}</p>} {/* Display ChatGPT message */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfileComp;
