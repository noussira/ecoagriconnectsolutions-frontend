import React, { useEffect, useState } from 'react';
import { productService } from '../services/api';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAll();
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-4">🔄 Chargement des produits...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">📦 Produits Disponibles ({products.length})</h2>
      
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.description}</p>
                
                <div className="mb-2">
                  <strong>{product.price} {product.currency}</strong> / {product.unit}
                </div>
                
                <div className="d-flex justify-content-between text-sm text-muted">
                  <span>📍 {product.location}</span>
                  <span>⭐ {product.rating} ({product.reviews_count})</span>
                </div>
                
                <div className="mt-2">
                  <small className="text-success">
                    {product.is_organic ? '🌱 Bio' : '⚪ Conventionnel'}
                  </small>
                </div>
              </div>
              
              <div className="card-footer bg-transparent">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-primary">
                    Stock: {product.available_quantity}/{product.quantity}
                  </span>
                  <button className="btn btn-sm btn-success">
                    Acheter
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;