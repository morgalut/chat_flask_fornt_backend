// src/components/CustomInput.js

import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';

// Get screen dimensions
const { width } = Dimensions.get('window');

const CustomInput = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: width * 0.8, // 80% of the screen width
    padding: 12, // Slightly increased padding for better spacing
    marginVertical: 8, // Increased margin for better spacing between elements
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16, // Increased font size for better readability
  },
});

export default CustomInput;
