import axiosInstance from 'api/axiosInstance.ts';
import {endpoints} from 'api/endpoints.ts';

export const getSOSContacts = async () => {
  return await axiosInstance.get<IIdentifiedContact>(endpoints.SOSContacts);
};

export const postSOSContact = async (contact: IContact) => {
  return await axiosInstance.post(endpoints.SOSContacts, contact);
};

export const changeSOSContact = async (contact: IContact) => {
  return await axiosInstance.put(endpoints.SOSContacts, contact);
};

export const sendLocation = async (location: ILocation) => {
  return await axiosInstance.post(endpoints.SOSSendLocation, location);
};

export interface IContact {
  phone_number: string;
  name: string;
}

export interface IIdentifiedContact extends IContact {
  id: number;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}
