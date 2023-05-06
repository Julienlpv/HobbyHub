import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Modifiez cette URL pour pointer vers votre API
});

export default api;
