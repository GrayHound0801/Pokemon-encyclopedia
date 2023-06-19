import axios from 'axios';

export const axiosInstance = axios.create({
  baseUrl: process.env.REACT_APP_URL,
});
