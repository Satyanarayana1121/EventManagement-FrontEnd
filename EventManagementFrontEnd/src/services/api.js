// src/services/api.js

import axios from 'axios';

// Replace localhost with your machine's IP address
const api = axios.create({
  baseURL: 'http://192.168.55.107:3000/api',  // Change to your actual IP address
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
