import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUserLocation } from '../hooks/useUserLocation';

const Cultures = () => {
  const { user } = useAuth();
  const { address, hasPreciseLocation } = useUserLocation();

  const [cultures, setCultures] = useState([
    {
      id: 1,
      name: "Riziculture Pluviale",
      type: "rice",
      surface: 5,
      location: "Bamako",
      coordinates: { lat: 12.6392, lng: -8.0029 },
      startDate: "2024-01-15",
      estimatedHarvest: "2024-05-20",
      status: "growing",
      progress: 65,
      yieldEstimation: 3000,
      soilType: "argileux",
      irrigation: "pluviale",
      variety: "NERICA",
      notes: "Besoin en eau suffisant, surveillance des parasites",
      tasks: [
        { id: 1, name: "Désherbage", completed: true, dueDate: "2024-03-01" },
        { id: 2, name: "Fertilisation", completed: true, dueDate: "2024-03-15" },
        { id: 3, name: "Traitement phytosanitaire", completed: false, dueDate: "2024-04-01" }
      ]
    },
    {
      id: 2,
      name: "Culture Maraîchère Mixte",
      type: "vegetables",
      surface: 2,
      location: "Sikasso",
      coordinates: { lat: 11.3167, lng: -5.6667 },
      startDate: "2024-02-01",
      estimatedHarvest: "2024-04-15",
      status: "flowering",
      progress: 80,
      yieldEstimation: 1500,
      soilType: "sableux",
      irrigation: "goutte-à-goutte",
      variety: "Tomates, Oignons, Piments",
      notes: "Tomates, oignons et piments en rotation",
      tasks: [
        { id: 1, name: "Plantation", completed: true, dueDate: "2024-02-01" },
        { id: 2, name: "Irrigation", completed: true, dueDate: "2024-02-15" },
        { id: 3, name: "Récolte échelonnée", completed: false, dueDate: "2024-04-01" }
      ]
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCulture, setSelectedCulture] = useState(null);
  const [view, setView] = useState('grid'); // 'grid' ou 'map'

  // ======== NOUVEAU ========
  const [isEditing, setIsEditing] = useState(false);
  const [editCulture, setEditCulture] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  // =========================

  const [newCulture, setNewCulture] = useState({
    name: '',
    type: 'cereals',
    surface: '',
    location: '',
    coordinates: null,
    startDate: new Date().toISOString().split('T')[0],
    soilType: 'argileux',
    irrigation: 'pluviale',
    variety: ''
  });

  const cultureTypes = [
    { value: 'cereals', label: '🌾 Céréales', icon: '🌾', yieldPerHa: 600 },
    { value: 'vegetables', label: '🥬 Légumes', icon: '🥬', yieldPerHa: 750 },
    { value: 'fruits', label: '🍎 Fruits', icon: '🍎', yieldPerHa: 500 },
    { value: 'tubers', label: '🥔 Tubercules', icon: '🥔', yieldPerHa: 800 },
    { value: 'legumes', label: '🫘 Légumineuses', icon: '🫘', yieldPerHa: 400 },
    { value: 'cashcrops', label: '💰 Cultures de rente', icon: '💰', yieldPerHa: 300 }
  ];

  const soilTypes = [
    { value: 'argileux', label: 'Argileux' },
    { value: 'sableux', label: 'Sableux' },
    { value: 'limoneux', label: 'Limoneux' },
    { value: 'humifere', label: 'Humifère' }
  ];

  const irrigationTypes = [
    { value: 'pluviale', label: '🌧️ Pluviale' },
    { value: 'goutte-a-goutte', label: '💧 Goutte-à-goutte' },
    { value: 'aspersion', label: '💦 Aspersion' },
    { value: 'gravitaire', label: '🌊 Gravitaire' }
  ];

  // Utiliser la localisation actuelle comme valeur par défaut
  useEffect(() => {
    if (hasPreciseLocation && address) {
      setNewCulture(prev => ({
        ...prev,
        location: address.city || address.region,
        coordinates: { lat: address.latitude, lng: address.longitude }
      }));
    }
  }, [hasPreciseLocation, address]);

  const handleAddCulture = (e) => {
    e.preventDefault();
    const cultureType = cultureTypes.find(type => type.value === newCulture.type);
    const culture = {
      id: cultures.length + 1,
      ...newCulture,
      surface: parseFloat(newCulture.surface),
      status: 'planting',
      progress: 10,
      yieldEstimation: newCulture.surface * (cultureType?.yieldPerHa || 500),
      estimatedHarvest: calculateHarvestDate(newCulture.startDate, newCulture.type),
      tasks: [
        { id: 1, name: "Préparation du sol", completed: false, dueDate: newCulture.startDate },
        { id: 2, name: "Semis/Plantation", completed: false, dueDate: addDays(newCulture.startDate, 7) }
      ],
      notes: `Nouvelle culture de ${cultureType?.label}`
    };

    setCultures([...cultures, culture]);
    setNewCulture({
      name: '',
      type: 'cereals',
      surface: '',
      location: hasPreciseLocation && address ? (address.city || address.region) : '',
      coordinates: hasPreciseLocation && address ? { lat: address.latitude, lng: address.longitude } : null,
      startDate: new Date().toISOString().split('T')[0],
      soilType: 'argileux',
      irrigation: 'pluviale',
      variety: ''
    });
    setShowAddForm(false);
  };

  const calculateHarvestDate = (startDate, cultureType) => {
    const start = new Date(startDate);
    let daysToHarvest = 90;

    switch(cultureType) {
      case 'cereals': daysToHarvest = 120; break;
      case 'vegetables': daysToHarvest = 60; break;
      case 'fruits': daysToHarvest = 180; break;
      case 'tubers': daysToHarvest = 100; break;
      case 'legumes': daysToHarvest = 80; break;
      default: daysToHarvest = 90;
    }

    const harvestDate = new Date(start);
    harvestDate.setDate(start.getDate() + daysToHarvest);
    return harvestDate.toISOString().split('T')[0];
  };

  const addDays = (dateString, days) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      planning: { label: 'Planification', color: 'secondary', icon: '📋' },
      planting: { label: 'Plantation', color: 'info', icon: '🪴' },
      growing: { label: 'Croissance', color: 'success', icon: '🌱' },
      flowering: { label: 'Floraison', color: 'warning', icon: '🌼' },
      harvesting: { label: 'Récolte', color: 'primary', icon: '🪣' },
      completed: { label: 'Terminé', color: 'dark', icon: '✅' }
    };
    return statusMap[status] || { label: 'Inconnu', color: 'dark', icon: '❓' };
  };

  const getDaysUntilHarvest = (harvestDate) => {
    const today = new Date();
    const harvest = new Date(harvestDate);
    const diffTime = harvest - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleTaskToggle = (cultureId, taskId) => {
    setCultures(cultures.map(culture => {
      if (culture.id === cultureId) {
        const updatedTasks = culture.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );

        const completedTasks = updatedTasks.filter(task => task.completed).length;
        const progress = Math.round((completedTasks / updatedTasks.length) * 100);

        return { ...culture, tasks: updatedTasks, progress };
      }
      return culture;
    }));
  };

  const handleDeleteCulture = (cultureId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette culture ?')) {
      setCultures(cultures.filter(culture => culture.id !== cultureId));
    }
  };

  const totalSurface = cultures.reduce((total, culture) => total + culture.surface, 0);
  const totalYield = cultures.reduce((total, culture) => total + culture.yieldEstimation, 0);
  const averageProgress = cultures.length > 0 
    ? Math.round(cultures.reduce((total, culture) => total + culture.progress, 0) / cultures.length)
    : 0;

  // ======== NOUVEAU ========
  const openEdit = (culture) => {
    setIsEditing(true);
    setEditCulture({ ...culture });
  };

  const saveEdit = () => {
    setCultures(cultures.map(c => c.id === editCulture.id ? editCulture : c));
    setIsEditing(false);
    setEditCulture(null);
  };

  const openDetails = (culture) => {
    setShowDetails(true);
    setSelectedCulture(culture);
  };

  const closeModal = () => {
    setShowDetails(false);
    setIsEditing(false);
    setSelectedCulture(null);
    setEditCulture(null);
  };
  // =========================

  return (
    <div className="container-fluid py-4">
      {/* En-tête */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="text-success">🌾 Mes Cultures</h1>
              <p className="text-muted">
                {hasPreciseLocation && address 
                  ? `Gérez vos cultures près de ${address.city || address.region}`
                  : 'Gérez et suivez l\'évolution de vos cultures'
                }
              </p>
            </div>
            <div className="d-flex gap-2">
              <div className="btn-group">
                <button 
                  className={`btn ${view === 'grid' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setView('grid')}
                >
                  📋 Grille
                </button>
                <button 
                  className={`btn ${view === 'map' ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setView('map')}
                >
                  🗺️ Carte
                </button>
              </div>
              <button 
                className="btn btn-success"
                onClick={() => setShowAddForm(true)}
              >
                + Nouvelle culture
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="row mb-4">
          <div className="col-lg-10 mx-auto">
            <div className="card shadow-sm">
              <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">🌱 Nouvelle Culture</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white"
                  onClick={() => setShowAddForm(false)}
                ></button>
              </div>
              <div className="card-body">
                <form onSubmit={handleAddCulture}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nom de la culture *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newCulture.name}
                        onChange={(e) => setNewCulture({...newCulture, name: e.target.value})}
                        placeholder="Ex: Riziculture saison sèche 2024"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Type de culture *</label>
                      <select
                        className="form-select"
                        value={newCulture.type}
                        onChange={(e) => setNewCulture({...newCulture, type: e.target.value})}
                        required
                      >
                        {cultureTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Surface (hectares) *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={newCulture.surface}
                        onChange={(e) => setNewCulture({...newCulture, surface: e.target.value})}
                        placeholder="0.0"
                        step="0.1"
                        min="0.1"
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Localisation *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newCulture.location}
                        onChange={(e) => setNewCulture({...newCulture, location: e.target.value})}
                        placeholder="Ex: Bamako, Sikasso..."
                        required
                      />
                      {hasPreciseLocation && (
                        <small className="text-muted">
                          📍 Localisation actuelle: {address?.city || address?.region}
                        </small>
                      )}
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Type de sol</label>
                      <select
                        className="form-select"
                        value={newCulture.soilType}
                        onChange={(e) => setNewCulture({...newCulture, soilType: e.target.value})}
                      >
                        {soilTypes.map(soil => (
                          <option key={soil.value} value={soil.value}>
                            {soil.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Irrigation</label>
                      <select
                        className="form-select"
                        value={newCulture.irrigation}
                        onChange={(e) => setNewCulture({...newCulture, irrigation: e.target.value})}
                      >
                        {irrigationTypes.map(irrigation => (
                          <option key={irrigation.value} value={irrigation.value}>
                            {irrigation.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date de plantation *</label>
                      <input
                        type="date"
                        className="form-control"
                        value={newCulture.startDate}
                        onChange={(e) => setNewCulture({...newCulture, startDate: e.target.value})}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Variété/Semence</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newCulture.variety}
                        onChange={(e) => setNewCulture({...newCulture, variety: e.target.value})}
                        placeholder="Ex: NERICA, Tomate Roma..."
                      />
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success">
                      💾 Créer la culture
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

      {/* Statistiques détaillées */}
      <div className="row mb-4">
        <div className="col-md-2">
          <div className="card border-0 bg-light h-100">
            <div className="card-body text-center">
              <h3 className="text-success">{cultures.length}</h3>
              <p className="mb-0 small">Cultures actives</p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card border-0 bg-light h-100">
            <div className="card-body text-center">
              <h3 className="text-warning">{totalSurface} ha</h3>
              <p className="mb-0 small">Surface totale</p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card border-0 bg-light h-100">
            <div className="card-body text-center">
              <h3 className="text-primary">{totalYield.toLocaleString()} kg</h3>
              <p className="mb-0 small">Rendement estimé</p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card border-0 bg-light h-100">
            <div className="card-body text-center">
              <h3 className="text-info">{averageProgress}%</h3>
              <p className="mb-0 small">Progression moyenne</p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card border-0 bg-light h-100">
            <div className="card-body text-center">
              <h3 className="text-danger">
                {cultures.filter(c => getDaysUntilHarvest(c.estimatedHarvest) <= 30).length}
              </h3>
              <p className="mb-0 small">Récoltes proches</p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card border-0 bg-light h-100">
            <div className="card-body text-center">
              <h3 className="text-secondary">
                {cultures.reduce((total, culture) => total + culture.tasks.filter(t => !t.completed).length, 0)}
              </h3>
              <p className="mb-0 small">Tâches en attente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vue Grille */}
      {view === 'grid' && (
        <div className="row">
          {cultures.map(culture => {
            const statusInfo = getStatusInfo(culture.status);
            const daysUntilHarvest = getDaysUntilHarvest(culture.estimatedHarvest);
            const pendingTasks = culture.tasks.filter(task => !task.completed).length;

            return (
              <div key={culture.id} className="col-lg-6 mb-4">
                <div className="card h-100 shadow-sm culture-card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{culture.name}</h5>
                    <div className="d-flex gap-2">
                      {daysUntilHarvest <= 30 && (
                        <span className="badge bg-warning" title="Récolte proche">
                          ⏰ {daysUntilHarvest}j
                        </span>
                      )}
                      <span className={`badge bg-${statusInfo.color}`}>
                        {statusInfo.icon} {statusInfo.label}
                      </span>
                    </div>
                  </div>

                  <div className="card-body">
                    {/* Informations principales */}
                    <div className="row mb-3">
                      <div className="col-6">
                        <small className="text-muted">Type</small>
                        <p className="mb-0">
                          {cultureTypes.find(t => t.value === culture.type)?.icon}
                          {cultureTypes.find(t => t.value === culture.type)?.label}
                        </p>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Surface</small>
                        <p className="mb-0 fw-bold">{culture.surface} ha</p>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-6">
                        <small className="text-muted">Localisation</small>
                        <p className="mb-0">📍 {culture.location}</p>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Rendement estimé</small>
                        <p className="mb-0 fw-bold text-warning">{culture.yieldEstimation.toLocaleString()} kg</p>
                      </div>
                    </div>

                    {/* Détails techniques */}
                    <div className="row mb-3">
                      <div className="col-6">
                        <small className="text-muted">Sol</small>
                        <p className="mb-0 small">{culture.soilType}</p>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Irrigation</small>
                        <p className="mb-0 small">
                          {irrigationTypes.find(i => i.value === culture.irrigation)?.label}
                        </p>
                      </div>
                    </div>

                    {/* Barre de progression */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <small>Progression</small>
                        <small>{culture.progress}%</small>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div
                          className={`progress-bar bg-${statusInfo.color}`}
                          style={{ width: `${culture.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Tâches */}
                    <div className="mb-3">
                      <small className="text-muted d-block mb-2">
                        📋 Tâches ({pendingTasks} en attente)
                      </small>
                      <div className="task-list">
                        {culture.tasks.slice(0, 3).map(task => (
                          <div key={task.id} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => handleTaskToggle(culture.id, task.id)}
                            />
                            <label className="form-check-label small">
                              {task.name} - {new Date(task.dueDate).toLocaleDateString()}
                            </label>
                          </div>
                        ))}
                        {culture.tasks.length > 3 && (
                          <small className="text-muted">
                            +{culture.tasks.length - 3} autres tâches...
                          </small>
                        )}
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="row text-center">
                      <div className="col-6">
                        <small className="text-muted">Plantation</small>
                        <p className="mb-0 small">{new Date(culture.startDate).toLocaleDateString()}</p>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Récolte estimée</small>
                        <p className="mb-0 small">{new Date(culture.estimatedHarvest).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => openEdit(culture)}
                      >
                        📝 Modifier
                      </button>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => openDetails(culture)}
                      >
                        📊 Détails
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm ms-auto"
                        onClick={() => handleDeleteCulture(culture.id)}
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Vue Carte */}
      {view === 'map' && (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header bg-light">
                <h5 className="mb-0">🗺️ Carte de vos cultures</h5>
              </div>
              <div className="card-body text-center py-5">
                <div style={{ fontSize: '4rem' }}>🗺️</div>
                <h4 className="text-success mt-3">Carte des Cultures</h4>
                <p className="text-muted">
                  {hasPreciseLocation
                    ? `Vos cultures localisées autour de ${address?.city || address?.region}`
                    : 'Activez la géolocalisation pour voir vos cultures sur la carte'
                  }
                </p>
                <p className="text-muted small">
                  {cultures.length} culture(s) répartie(s) sur {totalSurface} hectares
                </p>
                {!hasPreciseLocation && (
                  <button className="btn btn-outline-info mt-2">
                    📍 Activer la localisation
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message si aucune culture */}
      {cultures.length === 0 && (
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="text-muted">
              <h3>🌱 Aucune culture pour le moment</h3>
              <p>Commencez par planifier votre première culture !</p>
              <button
                className="btn btn-success"
                onClick={() => setShowAddForm(true)}
              >
                + Planifier ma première culture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======== MODAL DETAILS ======== */}
      {showDetails && selectedCulture && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">📊 Détails - {selectedCulture.name}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p><b>Type :</b> {selectedCulture.type}</p>
                <p><b>Surface :</b> {selectedCulture.surface} ha</p>
                <p><b>Localisation :</b> {selectedCulture.location}</p>
                <p><b>Sol :</b> {selectedCulture.soilType}</p>
                <p><b>Irrigation :</b> {selectedCulture.irrigation}</p>
                <p><b>Variété :</b> {selectedCulture.variety}</p>
                <p><b>Notes :</b> {selectedCulture.notes}</p>
                <hr />
                <p><b>Tâches :</b></p>
                <ul>
                  {selectedCulture.tasks.map(t => (
                    <li key={t.id}>
                      {t.name} - {t.completed ? "✓" : "✗"} - {new Date(t.dueDate).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>Fermer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======== MODAL EDIT ======== */}
      {isEditing && editCulture && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">📝 Modifier - {editCulture.name}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editCulture.name}
                      onChange={(e) => setEditCulture({ ...editCulture, name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Type</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editCulture.type}
                      onChange={(e) => setEditCulture({ ...editCulture, type: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Surface</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editCulture.surface}
                      onChange={(e) => setEditCulture({ ...editCulture, surface: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Localisation</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editCulture.location}
                      onChange={(e) => setEditCulture({ ...editCulture, location: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Date de plantation</label>
                    <input
                      type="date"
                      className="form-control"
                      value={editCulture.startDate}
                      onChange={(e) => setEditCulture({ ...editCulture, startDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Notes</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={editCulture.notes}
                    onChange={(e) => setEditCulture({ ...editCulture, notes: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                <button className="btn btn-success" onClick={saveEdit}>💾 Enregistrer</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Cultures;
