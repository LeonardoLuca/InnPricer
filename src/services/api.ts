import axios from 'axios';



// const api = axios.create({
//   baseURL: 'http://ecs-innpricer-back-load-balancer-1190307592.us-east-1.elb.amazonaws.com/api/',
// });

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
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

// export const getLocations = async () => {
//   const response = await api.get('/hotels/locations/');
//   return response.data;
// };

export const getLocations = async () => {
  try {
    console.log("Iniciando requisição para /hotels/locations/");
    const response = await api.get('/hotels/locations/');
    console.log("Status da resposta:", response.status);
    console.log("Cabeçalhos da resposta:", response.headers);
    console.log("Dados da resposta (getLocations):", response.data);

    // Verificar se os dados são um array
    if (!Array.isArray(response.data)) {
      console.error("Erro: A resposta não é um array:", response.data);
      throw new Error("A resposta da API não é uma lista de localizações");
    }

    // Verificar se o array está vazio
    if (response.data.length === 0) {
      console.warn("Aviso: A lista de localizações está vazia");
    }

    // Log de sucesso
    console.log("Localizações recebidas:", response.data);
    return response.data;
  } catch (error) {
    // Tratar erro como unknown e fazer verificações
    let errorMessage = "Erro desconhecido";
    let errorResponse = null;
    let errorRequest = null;

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    // Verificar se é um erro do Axios
    if (typeof error === "object" && error !== null) {
      if ("response" in error) {
        errorResponse = {
          status: (error as any).response.status,
          data: (error as any).response.data,
          headers: (error as any).response.headers,
        };
      }
      if ("request" in error) {
        errorRequest = (error as any).request;
      }
    }

    console.error("Erro em getLocations:", {
      message: errorMessage,
      response: errorResponse,
      request: errorRequest,
    });

    throw new Error(`Falha ao buscar localizações: ${errorMessage}`);
  }
};

// export const getLocations = async () => {
//   try {
//     // Simular resposta
//     const mockData = [
//       { id: 1, address: "Rua Exemplo, 123" },
//       { id: 2, address: "Avenida Teste, 456" },
//     ];
//     console.log("API Response (mock getLocations):", mockData);
//     return mockData;
//   } catch (error) {
//     console.error("Erro em getLocations:", error);
//     throw error;
//   }
// };

export const getUserProfile = async () => {
  const response = await api.get('/accounts/me/');
  return response.data;
};

export default api;
