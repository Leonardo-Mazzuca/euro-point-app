import axios from 'axios'

const API_URL = process.env.EXPO_PUBLIC_EUROPOINT_API_URL;

if(!API_URL) throw new Error("API_URL is not defined");

const api = axios.create({
  baseURL: API_URL,
});


export default api;