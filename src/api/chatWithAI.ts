import axiosInstance from 'api/axiosInstance.ts';
import {endpoints} from 'api/endpoints.ts';

export const requestToAI = async (message: string) => {
  const data = await axiosInstance.post<{response: string}>(
    endpoints.chatWithAI,
    {
      message,
    },
  );
  return data.data;
};
