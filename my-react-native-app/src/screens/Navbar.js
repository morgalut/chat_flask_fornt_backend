import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Icon name={menuOpen ? 'times' : 'bars'} size={30} color="#ffffff" />
      </TouchableOpacity>
      <Animated.View style={[styles.navbar, { height: menuOpen ? 200 : 0 }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.link}>Home</Text>
        </TouchableOpacity>
        {!isLoggedIn ? (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.link}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
              <Text style={styles.link}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.link}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007BFF',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#0056b3',
    borderRadius: 5,
  },
  navbar: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 10,
  },
  link: {
    fontSize: 18,
    color: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#0056b3',
    textAlign: 'center',
    width: '100%',
  },
});

export default Navbar;
