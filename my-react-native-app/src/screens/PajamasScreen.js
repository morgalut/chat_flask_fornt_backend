import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PajamasScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pajama Collection</Text>
      <Image 
        source={{ uri: 'https://example.com/pajamas-image.jpg' }} // Replace with actual image URL
        style={styles.image}
      />
      <Text style={styles.description}>
        Discover our comfy and stylish pajamas perfect for a cozy night in.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
  },
  header: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666666',
  },
});

export default PajamasScreen;
