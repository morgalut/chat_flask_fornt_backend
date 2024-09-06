import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://localhost:5000"; // Flask API
const BACKUP_API_URL = "http://localhost:5001"; // Node.js backup API

const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState("");
  const [chatgptMessage, setChatgptMessage] = useState("");
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setError("Token not found");
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
        console.error("Error fetching profile data:", error);
        setError("Failed to fetch profile data from Flask API, trying backup server...");

        // Fetch from Node.js backup API
        try {
          const backupResponse = await axios.get(`${BACKUP_API_URL}/profile/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserProfile(backupResponse.data);
          setChatgptMessage(backupResponse.data.chatgpt_message);
        } catch (backupError) {
          console.error("Error fetching profile data from backup server:", backupError.response || backupError);
          setError("Failed to fetch profile data from both servers");
        }
      }
    };

    fetchProfileData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Page</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {userProfile ? (
        <View>
          <Text style={styles.info}><Text style={styles.label}>Username:</Text> {userProfile.username}</Text>
          <Text style={styles.info}><Text style={styles.label}>Email:</Text> {userProfile.email}</Text>
          <Text style={styles.info}><Text style={styles.label}>Status:</Text> {userProfile.status}</Text>
          {chatgptMessage ? (
            <Text style={styles.info}><Text style={styles.label}>ChatGPT Message:</Text> {chatgptMessage}</Text>
          ) : null}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default ProfileScreen;
