// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/register';
const BACKUP_API_URL = 'http://localhost:5001/auth/register';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [chatgptMessage, setChatgptMessage] = useState('');
  const [error, setError] = useState('');

  const { username, email, password } = formData;

  const onChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async () => {
    try {
      const res = await axios.post(API_URL, { username, email, password }, { headers: { 'Content-Type': 'application/json' } });
      setChatgptMessage(res.data.chatgpt_message);
      setError('');
    } catch (err) {
      console.error('Error with Flask API:', err.message);

      try {
        const backupRes = await axios.post(BACKUP_API_URL, { username, email, password }, { headers: { 'Content-Type': 'application/json' } });
        setChatgptMessage(backupRes.data.chatgpt_message);
        setError('');
      } catch (backupError) {
        console.error('Error with backup server:', backupError.message);
        setError('Failed to register. Please try again later.');
        setChatgptMessage('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => onChange('username', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={(text) => onChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => onChange('password', text)}
        secureTextEntry
      />
      <Button title="Register" onPress={onSubmit} />
      {chatgptMessage ? <Text style={styles.message}>{chatgptMessage}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8', // Softer background color
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Darker header text
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  message: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});


export default RegisterScreen;