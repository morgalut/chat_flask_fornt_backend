import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MessageInput from '../components/MessageInput';
import axios from 'axios';

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  // Function to fetch messages from the server
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    // Fetch messages when the component mounts
    fetchMessages();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Chat Page</h1>
      {/* Render messages */}
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <span className="message-sender">{message.sender.username}:</span>
            <span className="message-content">{message.content}</span>
          </div>
        ))}
      </div>
      <MessageInput />
      <Link to="/profile">Go to profile</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ChatPage;
