import AsyncStorage from '@react-native-async-storage/async-storage';

export const setTokens = async (access: string, refresh: string) => {
  await AsyncStorage.setItem('accessToken', access);
  await AsyncStorage.setItem('refreshToken', refresh);
};

export const deleteTokens = async () => {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
};

export const changeToken = async (type: string, token: string) => {
  await AsyncStorage.setItem(type, token);
};

export const getTokens = async (): Promise<tokens> => {
  const access = await AsyncStorage.getItem('accessToken');
  const refresh = await AsyncStorage.getItem('refreshToken');
  return access && refresh ? {access, refresh} : null;
};

export const getStoragePhoneNumber = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('phoneNumber');
};

export const setStoragePhoneNumber = async (phoneNumber: string) => {
  await AsyncStorage.setItem('phoneNumber', phoneNumber);
};

export const deleteStoragePhoneNumber = async () => {
  await AsyncStorage.removeItem('phoneNumber');
};

export type tokens = {
  access: string;
  refresh: string;
} | null;
