
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Stocks = () => {
  const { user } = useAuth();
  const [stocks, setStocks] = useState([
    {
      id: 1,
      productName: "Riz Local de Qualité",
      category: "cereals",
      quantity: 350,
      unit: "kg",
      pricePerUnit: 450,
      storageLocation: "Entrepôt principal",
      entryDate: "2024-03-15",
      expiryDate: "2025-03-15",
      quality: "excellent",
      minStock: 50,
      maxStock: 500
    },
    {
      id: 2,
      productName: "Tomates Fraîches",
      category: "vegetables",
      quantity: 150,
      unit: "kg",
      pricePerUnit: 300,
      storageLocation: "Chambre froide",
      entryDate: "2024-03-18",
      expiryDate: "2024-04-18",
      quality: "good",
      minStock: 20,
      maxStock: 200
    },
    {
      id: 3,
      productName: "Mangues Kent",
      category: "fruits",
      quantity: 800,
      unit: "kg",
      pricePerUnit: 600,
      storageLocation: "Hangar ventilé",
      entryDate: "2024-03-10",
      expiryDate: "2024-04-10",
      quality: "excellent",
      minStock: 100,
      maxStock: 1000
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newStock, setNewStock] = useState({
    productName: '',
    category: 'cereals',
    quantity: '',
    unit: 'kg',
    pricePerUnit: '',
    storageLocation: '',
    expiryDate: '',
    minStock: '',
    maxStock: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingStockId, setEditingStockId] = useState(null);


  const [showDetails, setShowDetails] = useState(false);
  const [detailsStock, setDetailsStock] = useState(null);

  const categories = [
    { value: 'cereals', label: '🌾 Céréales', icon: '🌾' },
    { value: 'vegetables', label: '🥬 Légumes', icon: '🥬' },
    { value: 'fruits', label: '🍎 Fruits', icon: '🍎' },
    { value: 'tubers', label: '🥔 Tubercules', icon: '🥔' },
    { value: 'legumes', label: '🫘 Légumineuses', icon: '🫘' },
    { value: 'seeds', label: '🌱 Semences', icon: '🌱' },
    { value: 'tools', label: '🛠️ Outils', icon: '🛠️' }
  ];

  const units = [
    { value: 'kg', label: 'Kilogramme (kg)' },
    { value: 'g', label: 'Gramme (g)' },
    { value: 'tonne', label: 'Tonne' },
    { value: 'sack', label: 'Sac' },
    { value: 'bag', label: 'Sachet' },
    { value: 'unit', label: 'Unité' },
    { value: 'liter', label: 'Litre' }
  ];

  const handleAddStock = (e) => {
    e.preventDefault();

    
    if (isEditing) {
      setStocks(
        stocks.map(s =>
          s.id === editingStockId ? { ...s, ...newStock } : s
        )
      );

      setIsEditing(false);
      setEditingStockId(null);
      setShowAddForm(false);
      setNewStock({
        productName: '', category: 'cereals', quantity: '', unit: 'kg',
        pricePerUnit: '', storageLocation: '', expiryDate: '', minStock: '', maxStock: ''
      });
      return;
    }

    const stock = {
      id: stocks.length + 1,
      ...newStock,
      quantity: parseFloat(newStock.quantity),
      pricePerUnit: parseFloat(newStock.pricePerUnit),
      minStock: parseFloat(newStock.minStock),
      maxStock: parseFloat(newStock.maxStock),
      entryDate: new Date().toISOString().split('T')[0],
      quality: 'good'
    };
    
    setStocks([...stocks, stock]);
    setNewStock({
      productName: '', category: 'cereals', quantity: '', unit: 'kg',
      pricePerUnit: '', storageLocation: '', expiryDate: '', minStock: '', maxStock: ''
    });
    setShowAddForm(false);
  };

  const getStockStatus = (stock) => {
    const percentage = (stock.quantity / stock.maxStock) * 100;
    if (stock.quantity <= stock.minStock) return { status: 'low', color: 'danger', label: 'Stock bas', icon: '⚠️' };
    if (percentage >= 90) return { status: 'high', color: 'info', label: 'Stock élevé', icon: '📈' };
    if (new Date(stock.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) 
      return { status: 'expiring', color: 'warning', label: 'Péremption proche', icon: '⏰' };
    return { status: 'normal', color: 'success', label: 'Stock normal', icon: '✅' };
  };

  const getTotalValue = () => {
    return stocks.reduce((total, stock) => total + (stock.quantity * stock.pricePerUnit), 0);
  };

  const getLowStockItems = () => {
    return stocks.filter(stock => stock.quantity <= stock.minStock);
  };

  const getExpiringItems = () => {
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    return stocks.filter(stock => new Date(stock.expiryDate) < nextWeek);
  };

  const handleDeleteStock = (id) => {
    setStocks(stocks.filter(stock => stock.id !== id));
  };

 
  const handleEditStock = (stock) => {
    setNewStock({
      productName: stock.productName,
      category: stock.category,
      quantity: stock.quantity,
      unit: stock.unit,
      pricePerUnit: stock.pricePerUnit,
      storageLocation: stock.storageLocation,
      expiryDate: stock.expiryDate,
      minStock: stock.minStock,
      maxStock: stock.maxStock
    });

    setEditingStockId(stock.id);
    setIsEditing(true);
    setShowAddForm(true);
  };

 
  const handleShowDetails = (stock) => {
    setDetailsStock(stock);
    setShowDetails(true);
  };

  return (
    <div className="container-fluid py-4">
      {/* En-tête */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="text-success">📦 Gestion des Stocks</h1>
              <p className="text-muted">Surveillez et gézez votre inventaire agricole</p>
            </div>
            <button 
              className="btn btn-success"
              onClick={() => setShowAddForm(true)}
            >
              + Ajouter au stock
            </button>
          </div>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="row mb-4">
          <div className="col-lg-10 mx-auto">
            <div className="card shadow-sm">
              <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{isEditing ? "Modifier le stock" : "Nouveau Stock"}</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white"
                  onClick={() => setShowAddForm(false)}
                ></button>
              </div>
              <div className="card-body">
                <form onSubmit={handleAddStock}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nom du produit</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newStock.productName}
                        onChange={(e) => setNewStock({...newStock, productName: e.target.value})}
                        placeholder="Ex: Riz local premium"
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Catégorie</label>
                      <select
                        className="form-select"
                        value={newStock.category}
                        onChange={(e) => setNewStock({...newStock, category: e.target.value})}
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Unité</label>
                      <select
                        className="form-select"
                        value={newStock.unit}
                        onChange={(e) => setNewStock({...newStock, unit: e.target.value})}
                      >
                        {units.map(unit => (
                          <option key={unit.value} value={unit.value}>
                            {unit.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Quantité</label>
                      <input
                        type="number"
                        className="form-control"
                        value={newStock.quantity}
                        onChange={(e) => setNewStock({...newStock, quantity: e.target.value})}
                        placeholder="0.0"
                        step="0.1"
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Prix unitaire (FCFA)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={newStock.pricePerUnit}
                        onChange={(e) => setNewStock({...newStock, pricePerUnit: e.target.value})}
                        placeholder="0"
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Stock minimum</label>
                      <input
                        type="number"
                        className="form-control"
                        value={newStock.minStock}
                        onChange={(e) => setNewStock({...newStock, minStock: e.target.value})}
                        placeholder="0"
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Stock maximum</label>
                      <input
                        type="number"
                        className="form-control"
                        value={newStock.maxStock}
                        onChange={(e) => setNewStock({...newStock, maxStock: e.target.value})}
                        placeholder="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Lieu de stockage</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newStock.storageLocation}
                        onChange={(e) => setNewStock({...newStock, storageLocation: e.target.value})}
                        placeholder="Ex: Entrepôt principal"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date de péremption</label>
                      <input
                        type="date"
                        className="form-control"
                        value={newStock.expiryDate}
                        onChange={(e) => setNewStock({...newStock, expiryDate: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success">
                      💾 {isEditing ? "Enregistrer" : "Ajouter au stock"}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={() => setShowAddForm(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alertes et statistiques */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 bg-light">
            <div className="card-body text-center">
              <h3 className="text-success">{stocks.length}</h3>
              <p className="mb-0">Produits en stock</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-light">
            <div className="card-body text-center">
              <h3 className="text-warning">{getTotalValue().toLocaleString()} FCFA</h3>
              <p className="mb-0">Valeur totale</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-light">
            <div className="card-body text-center">
              <h3 className="text-danger">{getLowStockItems().length}</h3>
              <p className="mb-0">Stocks bas</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-light">
            <div className="card-body text-center">
              <h3 className="text-warning">{getExpiringItems().length}</h3>
              <p className="mb-0">Péremption proche</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alertes importantes */}
      {(getLowStockItems().length > 0 || getExpiringItems().length > 0) && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="alert alert-warning">
              <h5>🚨 Alertes importantes</h5>
              {getLowStockItems().length > 0 && (
                <p className="mb-1">
                  ⚠️ <strong>{getLowStockItems().length} produit(s)</strong> en stock bas - 
                  {getLowStockItems().map(item => ` ${item.productName}`).join(', ')}
                </p>
              )}
              {getExpiringItems().length > 0 && (
                <p className="mb-0">
                  ⏰ <strong>{getExpiringItems().length} produit(s)</strong> proche(s) de la péremption
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Liste des stocks */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">📋 Inventaire des stocks</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Produit</th>
                      <th>Catégorie</th>
                      <th>Quantité</th>
                      <th>Prix unitaire</th>
                      <th>Valeur</th>
                      <th>Lieu</th>
                      <th>Péremption</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map(stock => {
                      const stockStatus = getStockStatus(stock);
                      const totalValue = stock.quantity * stock.pricePerUnit;
                      
                      return (
                        <tr key={stock.id}>
                          <td>
                            <strong>{stock.productName}</strong>
                          </td>
                          <td>
                            <span className="badge bg-light text-dark">
                              {categories.find(cat => cat.value === stock.category)?.icon}
                              {categories.find(cat => cat.value === stock.category)?.label}
                            </span>
                          </td>
                          <td>
                            <div>
                              <strong>{stock.quantity} {stock.unit}</strong>
                              <div className="progress mt-1" style={{ height: '5px' }}>
                                <div 
                                  className={`progress-bar bg-${stockStatus.color}`}
                                  style={{ 
                                    width: `${(stock.quantity / stock.maxStock) * 100}%` 
                                  }}
                                ></div>
                              </div>
                              <small className="text-muted">
                                Min: {stock.minStock} | Max: {stock.maxStock}
                              </small>
                            </div>
                          </td>
                          <td>
                            <span className="text-warning fw-bold">
                              {stock.pricePerUnit.toLocaleString()} FCFA
                            </span>
                          </td>
                          <td>
                            <span className="fw-bold">
                              {totalValue.toLocaleString()} FCFA
                            </span>
                          </td>
                          <td>
                            <small>📍 {stock.storageLocation}</small>
                          </td>
                          <td>
                            <small>
                              {new Date(stock.expiryDate).toLocaleDateString()}
                              {new Date(stock.expiryDate) < new Date() && (
                                <span className="badge bg-danger ms-1">Expiré</span>
                              )}
                            </small>
                          </td>
                          <td>
                            <span className={`badge bg-${stockStatus.color}`}>
                              {stockStatus.icon} {stockStatus.label}
                            </span>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-primary"
                                onClick={() => handleEditStock(stock)}
                              >
                                ✏️
                              </button>

                              {/* ✅ AJOUT : bouton Voir */}
                              <button
                                className="btn btn-outline-info"
                                onClick={() => handleShowDetails(stock)}
                              >
                                👁️
                              </button>

                              <button 
                                className="btn btn-outline-danger"
                                onClick={() => handleDeleteStock(stock.id)}
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message si aucun stock */}
      {stocks.length === 0 && (
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="text-muted">
              <h3>📦 Aucun stock enregistré</h3>
              <p>Commencez par ajouter vos premiers produits en stock !</p>
              <button 
                className="btn btn-success"
                onClick={() => setShowAddForm(true)}
              >
                + Ajouter mon premier stock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ AJOUT : modal détails */}
      {showDetails && detailsStock && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Détails du stock</h2>

            <p><strong>Produit :</strong> {detailsStock.productName}</p>
            <p><strong>Catégorie :</strong> {detailsStock.category}</p>
            <p><strong>Quantité :</strong> {detailsStock.quantity} {detailsStock.unit}</p>
            <p><strong>Prix unitaire :</strong> {detailsStock.pricePerUnit} FCFA</p>
            <p><strong>Valeur totale :</strong> {(detailsStock.quantity * detailsStock.pricePerUnit).toLocaleString()} FCFA</p>
            <p><strong>Lieu :</strong> {detailsStock.storageLocation}</p>
            <p><strong>Date d’entrée :</strong> {detailsStock.entryDate}</p>
            <p><strong>Date de péremption :</strong> {detailsStock.expiryDate}</p>
            <p><strong>Qualité :</strong> {detailsStock.quality}</p>
            <p><strong>Stock min :</strong> {detailsStock.minStock}</p>
            <p><strong>Stock max :</strong> {detailsStock.maxStock}</p>

            <button className="btn btn-secondary" onClick={() => setShowDetails(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stocks;
