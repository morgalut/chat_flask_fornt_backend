import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageInput = () => {
  const [messageText, setMessageText] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch list of connected users from the server
  const fetchConnectedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/connected-users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching connected users:', error);
    }
  };

  useEffect(() => {
    fetchConnectedUsers();
  }, []);

  // Function to handle sending a message
  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:5000/messages', {
        text: messageText,
        recipient_id: recipientId  // Include recipient ID in the request
      });
      setMessageText('');  // Clear message input after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <select value={recipientId} onChange={(e) => setRecipientId(e.target.value)}>
        <option value="">Select recipient</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.username}</option>
        ))}
      </select>
      <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
