import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileComp = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data); // Set user profile data
      } catch (error) {
        console.error('Error fetching profile data:', error);
        if (error.response) {
          setError(error.response.data.error); // Set error message from backend response
        } else {
          setError('Failed to fetch profile data'); // Set generic error message
        }
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <h2>Profile Page</h2>
      {error && <p>{error}</p>} {/* Display error message */}
      {userProfile && (
        <div>
          <p><strong>User ID:</strong> {userProfile.user_id}</p>
          <p><strong>Username:</strong> {userProfile.username}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          {userProfile.profilePictureUrl && (
            <div>
              <strong>Profile Pictures:</strong>
              {userProfile.profilePictureUrl.map((pictureUrl, index) => (
                <img key={index} src={pictureUrl} alt={`Profile ${index + 1}`} />
              ))}
            </div>
          )}
          <p><strong>Status:</strong> {userProfile.status}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileComp;
