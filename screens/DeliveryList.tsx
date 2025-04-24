import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DeliveryListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Delivery List Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  text: {
    fontSize: 18,
    color: '#4B5563',
  },
});

export default DeliveryListScreen; 