import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useUserLocation } from '../hooks/useUserLocation'

const Marketplace = () => {
  const { language, user } = useAuth()
  const { address, hasPreciseLocation } = useUserLocation()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('distance')
  const [showFilters, setShowFilters] = useState(false)
  const [maxDistance, setMaxDistance] = useState(50)

  // Données simulées 
  const products = [
    {
      id: 1,
      name: 'Riz Local de Qualité',
      category: 'cereals',
      price: 450,
      currency: 'FCFA',
      unit: 'kg',
      quantity: 500,
      availableQuantity: 350,
      seller: 'Ferme Diallo',
      sellerId: 101,
      location: 'Bamako',
      coordinates: { lat: 12.6392, lng: -8.0029 },
      image: '🌾',
      rating: 4.5,
      reviews: 23,
      harvestDate: '2024-03-01',
      isOrganic: true,
      deliveryOptions: ['pickup', 'delivery'],
      description: 'Riz local de haute qualité, cultivé de manière traditionnelle'
    },
    {
      id: 2,
      name: 'Tomates Fraîches Bio',
      category: 'vegetables',
      price: 300,
      currency: 'FCFA',
      unit: 'kg',
      quantity: 200,
      availableQuantity: 150,
      seller: 'Maraîcher Keita',
      sellerId: 102,
      location: 'Sikasso',
      coordinates: { lat: 11.3167, lng: -5.6667 },
      image: '🍅',
      rating: 4.2,
      reviews: 15,
      harvestDate: '2024-03-20',
      isOrganic: true,
      deliveryOptions: ['pickup'],
      description: 'Tomates rouges et juteuses, récoltées quotidiennement'
    },
    {
      id: 3,
      name: 'Mangues Kent Premium',
      category: 'fruits',
      price: 600,
      currency: 'FCFA',
      unit: 'kg',
      quantity: 1000,
      availableQuantity: 800,
      seller: 'Verger de Siby',
      sellerId: 103,
      location: 'Siby',
      coordinates: { lat: 12.3833, lng: -8.3333 },
      image: '🥭',
      rating: 4.8,
      reviews: 45,
      harvestDate: '2024-03-10',
      isOrganic: false,
      deliveryOptions: ['pickup', 'delivery'],
      description: 'Mangues sucrées de la variété Kent, parfaites pour l\'export'
    },
    {
      id: 4,
      name: 'Semences de Maïs Certifiées',
      category: 'seeds',
      price: 1200,
      currency: 'FCFA',
      unit: 'sac',
      quantity: 50,
      availableQuantity: 30,
      seller: 'AgroSeed Mali',
      sellerId: 104,
      location: 'Kati',
      coordinates: { lat: 12.7500, lng: -8.0833 },
      image: '🫘',
      rating: 4.6,
      reviews: 32,
      harvestDate: '2024-02-28',
      isOrganic: false,
      deliveryOptions: ['delivery'],
      description: 'Semences certifiées de maïs, haut rendement'
    },
    {
      id: 5,
      name: 'Oignons Locaux Secs',
      category: 'vegetables',
      price: 400,
      currency: 'FCFA',
      unit: 'kg',
      quantity: 800,
      availableQuantity: 600,
      seller: 'Maraîcher Ségou',
      sellerId: 105,
      location: 'Ségou',
      coordinates: { lat: 13.4400, lng: -6.2600 },
      image: '🧅',
      rating: 4.3,
      reviews: 28,
      harvestDate: '2024-02-15',
      isOrganic: true,
      deliveryOptions: ['pickup', 'delivery'],
      description: 'Oignons secs de conservation, qualité supérieure'
    }
  ]

  const categories = [
    { id: 'all', name: 'Tous les produits', icon: '🛒' },
    { id: 'cereals', name: 'Céréales', icon: '🌾' },
    { id: 'vegetables', name: 'Légumes', icon: '🥬' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'seeds', name: 'Semences', icon: '🫘' },
    { id: 'tubers', name: 'Tubercules', icon: '🥔' },
    { id: 'tools', name: 'Outils', icon: '🛠️' }
  ]

  // Calcul de distance 
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Filtrer et trier les produits
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Filtre par distance si géolocalisation disponible
      let matchesDistance = true
      if (hasPreciseLocation && address?.latitude) {
        const distance = calculateDistance(
          address.latitude,
          address.longitude,
          product.coordinates.lat,
          product.coordinates.lng
        )
        product.distance = Math.round(distance)
        matchesDistance = distance <= maxDistance
      }

      return matchesCategory && matchesSearch && matchesDistance
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'distance':
          return (a.distance || 0) - (b.distance || 0)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'recent':
          return new Date(b.harvestDate) - new Date(a.harvestDate)
        default:
          return 0
      }
    })

  const handleContactSeller = (product) => {
    alert(`Contactez ${product.seller} au +223 XX XX XX XX\nProduit: ${product.name}`)
  }

  const handleQuickPurchase = (product) => {
    if (!user) {
      alert('Veuillez vous connecter pour acheter')
      return
    }
    alert(`Achat rapide: ${product.name}\nPrix: ${product.price} ${product.currency}/${product.unit}`)
  }

  return (
    <div className="container-fluid py-4">
      {/* En-tête avec localisation */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="text-success">🛒 Marché Agricole</h1>
          <p className="text-muted">
            {hasPreciseLocation && address ? (
              `Produits disponibles près de ${address.city || address.region}`
            ) : (
              'Découvrez les meilleurs produits agricoles de la région'
            )}
          </p>
          {hasPreciseLocation && (
            <div className="alert alert-info d-inline-flex align-items-center">
              <span className="me-2">📍</span>
              <small>Localisation activée - Affichage des produits à proximité</small>
            </div>
          )}
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher un produit, un vendeur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="input-group-text">🔍</span>
            <button 
              className="btn btn-outline-success"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? '▲' : '▼'} Filtres
            </button>
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <div className="card mb-3">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Trier par</label>
                    <select 
                      className="form-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="distance">📍 Plus proche</option>
                      <option value="price-low">💰 Prix croissant</option>
                      <option value="price-high">💰 Prix décroissant</option>
                      <option value="rating">⭐ Meilleures notes</option>
                      <option value="recent">🆕 Plus récent</option>
                    </select>
                  </div>
                  
                  {hasPreciseLocation && (
                    <div className="col-md-4">
                      <label className="form-label">Rayon de recherche</label>
                      <select 
                        className="form-select"
                        value={maxDistance}
                        onChange={(e) => setMaxDistance(Number(e.target.value))}
                      >
                        <option value={25}>25 km</option>
                        <option value={50}>50 km</option>
                        <option value={100}>100 km</option>
                        <option value={200}>200 km</option>
                        <option value={0}>Toute distance</option>
                      </select>
                    </div>
                  )}

                  <div className="col-md-4">
                    <label className="form-label">Livraison</label>
                    <select className="form-select">
                      <option>Tous les modes</option>
                      <option>Retrait sur place</option>
                      <option>Livraison disponible</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Catégories */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {categories.map(category => (
              <button
                key={category.id}
                className={`btn ${
                  selectedCategory === category.id ? 'btn-success' : 'btn-outline-success'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted">
              {filteredProducts.length} produit(s) trouvé(s)
              {hasPreciseLocation && ` dans un rayon de ${maxDistance}km`}
            </span>
            {!hasPreciseLocation && (
              <button className="btn btn-outline-info btn-sm">
                📍 Activer la localisation pour voir les produits proches
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Produits */}
      <div className="row g-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="col-xl-3 col-lg-4 col-md-6">
            <div className="card h-100 shadow-sm product-card">
              {product.isOrganic && (
                <div className="position-absolute top-0 end-0 m-2">
                  <span className="badge bg-success">🌱 Bio</span>
                </div>
              )}
              
              <div className="card-body">
                <div className="text-center mb-3">
                  <div style={{fontSize: '3rem'}}>{product.image}</div>
                </div>
                
                <h5 className="card-title text-success">{product.name}</h5>
                <p className="card-text text-muted small">{product.description}</p>
                
                <div className="product-details">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-warning fw-bold fs-5">
                      {product.price.toLocaleString()} {product.currency}/{product.unit}
                    </span>
                    {product.distance && (
                      <span className="badge bg-light text-dark">
                        📍 {product.distance}km
                      </span>
                    )}
                  </div>

                  <div className="row small text-muted mb-2">
                    <div className="col-6">
                      <strong>Stock:</strong> {product.availableQuantity} {product.unit}
                    </div>
                    <div className="col-6">
                      <strong>Vendeur:</strong> {product.seller}
                    </div>
                  </div>

                  <div className="row small text-muted mb-2">
                    <div className="col-6">
                      <strong>📍</strong> {product.location}
                    </div>
                    <div className="col-6">
                      <strong>📅</strong> {new Date(product.harvestDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        {'⭐'.repeat(Math.floor(product.rating))}
                        <small className="text-muted"> ({product.rating})</small>
                      </div>
                      <small className="text-muted">👁️ {product.reviews} avis</small>
                    </div>
                  </div>

                  <div className="mb-2">
                    {product.deliveryOptions.map(option => (
                      <span key={option} className="badge bg-light text-dark me-1">
                        {option === 'delivery' ? '🚚 Livraison' : '🏪 Retrait'}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="d-grid gap-2 mt-3">
                  <button 
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleContactSeller(product)}
                  >
                    📞 Contacter le vendeur
                  </button>
                  <button 
                    className="btn btn-warning btn-sm"
                    onClick={() => handleQuickPurchase(product)}
                  >
                    🛒 Acheter maintenant
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Aucun résultat */}
      {filteredProducts.length === 0 && (
        <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="alert alert-info">
              <h5>😔 Aucun produit trouvé</h5>
              <p className="mb-3">
                {hasPreciseLocation 
                  ? `Aucun produit ne correspond à vos critères dans un rayon de ${maxDistance}km`
                  : 'Aucun produit ne correspond à vos critères de recherche'
                }
              </p>
              <div className="d-flex gap-2 justify-content-center">
                <button 
                  className="btn btn-success"
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                    setMaxDistance(100)
                  }}
                >
                  Réinitialiser les filtres
                </button>
                {!hasPreciseLocation && (
                  <button className="btn btn-outline-info">
                    📍 Activer la localisation
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Marketplace