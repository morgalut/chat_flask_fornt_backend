import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import Home from './src/pages/Home';
import LoginComp from './src/screens/LoginScreen';
import ProfileComp from './src/screens/ProfileScreen';
import RegisterComp from './src/screens/RegisterScreen';
import Navbar from './src/screens/Navbar';

const Stack = createStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Clear token and update state
    setIsLoggedIn(false);
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Logged Out',
      text2: 'You have been successfully logged out',
    });
  };

  return (
    <>
      <NavigationContainer>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={props => <LoginComp {...props} setIsLoggedIn={setIsLoggedIn} />} />
          <Stack.Screen name="Register" component={RegisterComp} />
          <Stack.Screen name="Profile" component={ProfileComp} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

export default App;