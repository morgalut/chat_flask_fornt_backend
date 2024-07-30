import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const LoginComp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
    const [chatgptMessage, setChatgptMessage] = useState(''); // New state for ChatGPT message

// In your LoginComp.js
const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/login', {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true);
        setChatgptMessage(response.data.chatgpt_message); // Set ChatGPT message
    } catch (error) {
        console.error('Error logging in:', error);
        if (error.code === 'ERR_NETWORK') {
            // Fallback to backup server
            try {
                const response = await axios.post('http://localhost:5001/api/login', {
                    username: username,
                    password: password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Login successful on backup server:', response.data);
                localStorage.setItem('token', response.data.token);
                setIsLoggedIn(true);
                setChatgptMessage(response.data.chatgpt_message); // Set ChatGPT message
            } catch (backupError) {
                console.error('Error logging in on backup server:', backupError);
            }
        }
    }
};


    if (isLoggedIn) {
        return <Navigate to="/profile" />;
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username" 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                />
                <button type="submit">Login</button>
            </form>
            <p>Please log in.</p>
            {chatgptMessage && <p>{chatgptMessage}</p>} {/* Display ChatGPT message */}
        </div>
    );
};

export default LoginComp;
