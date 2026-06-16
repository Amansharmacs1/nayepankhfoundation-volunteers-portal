import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // Send cookies when cross-domain requests
});

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // You can handle global errors here, e.g. redirect to login on 401
    if (error.response && error.response.status === 401) {
      // Clear local storage or dispatch logout
    }
    return Promise.reject(error);
  }
);

export default api;
