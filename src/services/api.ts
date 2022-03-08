import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://api.appdepara.com.br/',
  baseURL: 'http://localhost:3004/',
});

export default api;
