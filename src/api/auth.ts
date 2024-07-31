import axiosInstance from 'api/axiosInstance.ts';
import {endpoints} from 'api/endpoints.ts';
import {tokens} from 'utils/tokens.ts';

export const sendCode = async (phone_number: string) => {
  return await axiosInstance.post<tokens>(endpoints.sendCode, {
    phone_number,
  });
};

export const verifyCode = async (phone_number: string, code: string) => {
  return await axiosInstance.post(endpoints.verifyCode, {
    phone_number,
    code,
  });
};

export const refreshToken = async (refresh: string) => {
  return await axiosInstance.post(endpoints.refreshToken, {
    refresh,
  });
};

export const changeUserInfo = async (name: string, surname: string) => {
  return await axiosInstance.patch(endpoints.user, {
    first_name: name,
    last_name: surname,
    email: '',
  });
};

export const logout = async () => {
  return await axiosInstance.post(endpoints.logout);
};
