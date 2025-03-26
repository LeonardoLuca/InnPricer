import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ecs-innpricer-back-load-balancer-1190307592.us-east-1.elb.amazonaws.com/api/',
});


// Clear tokens when accessing registration page
export const clearTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
};

// Add request interceptor
api.interceptors.request.use((config) => {
  // Don't add token for registration and login endpoints
  if (config.url?.includes('/accounts/') || config.url?.includes('/token/')) {
    return config;
  }

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Try to refresh the token
        const response = await axios.post('http://ecs-innpricer-back-load-balancer-1190307592.us-east-1.elb.amazonaws.com/api/token/refresh/', {
          refresh: refreshToken,
        });

        const newToken = response.data.access;
        localStorage.setItem('token', newToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/token/', { 'username': username, 'password': password });
  console.log(response);
  return response.data;
};

export const register = async (userData: any) => {
  const response = await api.post('/accounts/', userData);
  return response.data;
};

export const getLocations = async () => {
  const response = await api.get('/hotels/locations/');
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/accounts/me/');
  return response.data;
};

export default api;
