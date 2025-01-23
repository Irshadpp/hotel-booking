import { Platform } from 'react-native'; // For platform detection
import AsyncStorage from '@react-native-async-storage/async-storage'

// Check if the app is running on React Native or Web
const isWeb = Platform.OS === 'web';

// Storage for Web (localStorage)
const webStorage = {
  getItem: async (key: string): Promise<any | null> => {
    return localStorage.getItem(key);
  },
  setItem: async (key: string, value: any): Promise<void> => {
    localStorage.setItem(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    localStorage.removeItem(key);
  },
};

// Storage for React Native (AsyncStorage)
const nativeStorage = {
  getItem: async (key: string): Promise<string | null> => {
    return AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: any): Promise<void> => {
    return AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    return AsyncStorage.removeItem(key);
  },
};

// Use webStorage or nativeStorage based on the platform
export const storage = isWeb ? webStorage : nativeStorage;
