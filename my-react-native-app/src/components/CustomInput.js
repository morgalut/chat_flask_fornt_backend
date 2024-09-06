// src/components/CustomInput.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

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
      width: '80%',
      height: 50,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      fontSize: 16,
      marginVertical: 8,
    },
  });
  

export default CustomInput;
