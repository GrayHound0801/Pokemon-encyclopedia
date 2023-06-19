import { axiosInstance } from './core';

export const MainApi = {
  getApi() {
    console.log('mainApi보냄');
    return axiosInstance.get(`https://pokeapi.co/api/v2/pokemon`);
  },
};
