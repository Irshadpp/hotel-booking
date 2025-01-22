import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Slot, useRouter } from 'expo-router';

export default function Layout() {
  const router = useRouter();

  const isAuthenticated = false;

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    } else {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
