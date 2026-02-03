import { productService, cultureService, stockService, testService } from '../services/api';


const ApiTester = ({ hidden = true }) => {
 
  return null;
};

const testAllEndpoints = async () => {
  console.log('🧪 Test des endpoints API en cours...');

  try {
    const [cors, products, cultures, stocks] = await Promise.all([
      testService.testCors(),
      productService.getAll(),
      cultureService.getAll(),
      stockService.getAll()
    ]);

    const results = {
      cors: cors.data,
      products: products.data,
      cultures: cultures.data,
      stocks: stocks.data
    };

    console.log('✅ API OK — Résultats :', results);
    return results;

  } catch (error) {
    console.error('❌ ERREUR API :', error.response || error);
    throw error;
  }
};


window.testApi = testAllEndpoints;

export default ApiTester;
