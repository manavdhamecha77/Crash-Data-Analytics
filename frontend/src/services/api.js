import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getSummary = () => api.get('/summary');
export const getSeverity = () => api.get('/severity');
export const getHourlyTrend = () => api.get('/hourly');
export const getDistricts = () => api.get('/districts');
export const getPoints = () => api.get('/points');
export const getBlackspots = () => api.get('/blackspots');
export const getRoadClass = () => api.get('/road-classification');
export const getCollisionTypes = () => api.get('/collision-types');
export const getWeather = () => api.get('/weather');

export default api;
