import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api/login'; // Flask API
const BACKUP_API_URL = 'http://localhost:5001/auth/login'; // Node.js backup API

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    const login = async (url) => {
      try {
        const response = await axios.post(url, { username, password });
        await AsyncStorage.setItem('token', response.data.token);
        navigation.navigate('Profile');
      } catch (error) {
        throw error; // Rethrow error to be caught by higher-level handler
      }
    };

    try {
      await login(API_URL);
    } catch (error) {
      console.warn('Primary server failed, trying backup server...');
      try {
        await login(BACKUP_API_URL);
      } catch (backupError) {
        console.error('Error logging in on backup server:', backupError.response?.data?.message || backupError.message);
        setErrorMessage('Login failed. Please check your credentials and try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Login" onPress={handleSubmit} color="#007BFF" />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
    color: '#333333',
  },
  input: {
    height: 48,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 12,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;
