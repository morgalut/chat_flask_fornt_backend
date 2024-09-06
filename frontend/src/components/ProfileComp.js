import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style/Button.css'; // Ensure this path is correct
import '../style/Profile.css'; // Ensure this path is correct

const API_URL = "http://localhost:5000";
const BACKUP_API_URL = "http://localhost:5001";

const ProfileComp = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState("");
  const [chatgptMessage, setChatgptMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserProfile(response.data);
        setChatgptMessage(response.data.chatgpt_message);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError(
          "Failed to fetch profile data from Flask API, trying backup server..."
        );

        try {
          const backupResponse = await axios.get(
            `${BACKUP_API_URL}/profile/profile`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.info("Backup server response:", backupResponse.data);
          setUserProfile(backupResponse.data);
          setChatgptMessage(backupResponse.data.chatgpt_message);
        } catch (backupError) {
          console.error(
            "Error fetching profile data from backup server:",
            backupError.response || backupError
          );
          setError("Failed to fetch profile data from both servers");
        }
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="profile-container">
      <h2>Profile Page</h2>
      {error && <p className="error">{error}</p>}
      {userProfile ? (
        <div>
          <p>
            <strong>Username:</strong> {userProfile.username}
          </p>
          <p>
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p>
            <strong>Status:</strong> {userProfile.status}
          </p>
          {chatgptMessage && (
            <p className="chatgpt-message">
              <strong>ChatGPT Message:</strong> {chatgptMessage}
            </p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleLogout} className="button">Logout</button>
    </div>
  );
};

export default ProfileComp;
