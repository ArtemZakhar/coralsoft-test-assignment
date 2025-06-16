import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.BASE_URL || 'http://localhost:3001/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
