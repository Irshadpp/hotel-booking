import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Slot } from 'expo-router';

export default function Layout() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2575fc" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Hotel Booking App</Text>
      </View>
      {/* Main content */}
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Light background for the whole app
  },
  header: {
    backgroundColor: '#2575fc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Shadow for header on Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20, // Add consistent padding for all screens
  },
});
