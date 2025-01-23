import { User } from '@/constants/interfaces';
import apiClient from './apiClient';
import { storage } from './storage'; // Import the platform-agnostic storage

export const getAccessToken = async (): Promise<string | null> => {
  const token = await storage.getItem('accessToken');
  return token;
};

export const setAccessToken = async (token: string): Promise<void> => {
  await storage.setItem('accessToken', token);
};

export const setUser = async (user: User): Promise<void> => {
  await storage.setItem('user', user);
};

export const getUser = async (): Promise<User | null> => {
  const user = await storage.getItem('user');
  return user;
};

export const removeItem = async (key: string): Promise<void> =>{
  await storage.removeItem(key);
}

export const refreshAccessToken = async (): Promise<void> => {
  try {
    const response = await apiClient.post('/user/new-token');
    const newToken = response.data.accessToken;
    await setAccessToken(newToken);
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};
