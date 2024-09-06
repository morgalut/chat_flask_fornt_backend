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
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PajamasScreen;
