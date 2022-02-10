import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.appdepara.com.br/',
});

export default api;
