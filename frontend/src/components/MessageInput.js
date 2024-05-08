import React, { useState } from 'react';
import axios from 'axios';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const handleMessageSend = async () => {
    try {
      await axios.post('http://localhost:5000/messages', {
        content: message,
      });
      setMessage(''); // Clear input after sending message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleMessageSend}>Send</button>
    </div>
  );
};

export default MessageInput;
