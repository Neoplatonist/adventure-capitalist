import axios from 'axios';

const defaultOptions = {
  baseURL: process.env.REACT_BACKEND_API || 'http://localhost:3001',
};

const axiosInstance = axios.create(defaultOptions);

export default axiosInstance;
