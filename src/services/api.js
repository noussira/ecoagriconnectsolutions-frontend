import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Configuration Axios de base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Services pour tes endpoints publics
export const testService = {
  testConnection: () => api.get('/test'),
  testCors: () => api.get('/cors-test'),
};

export const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
};

export const cultureService = {
  getAll: () => api.get('/cultures-public'),
};

export const stockService = {
  getAll: () => api.get('/stocks-public'),
};

// Service pour tester 
export const apiTester = {
  testAllEndpoints: async () => {
    try {
      console.log('🧪 Test de tous les endpoints API...');
      
      const results = await Promise.allSettled([
        testService.testCors(),
        productService.getAll(),
        cultureService.getAll(),
        stockService.getAll()
      ]);

      const formattedResults = {
        cors: results[0],
        products: results[1],
        cultures: results[2],
        stocks: results[3]
      };

      console.log('📊 Résultats des tests:', formattedResults);
      return formattedResults;

    } catch (error) {
      console.error('❌ Erreur lors des tests:', error);
      throw error;
    }
  }
};

export default api;