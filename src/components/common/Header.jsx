import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWeather } from '../../hooks/useWeather';
import { useUserLocation } from '../../hooks/useUserLocation';
import logo from '../../assets/images/logo.png';

const Header = () => {
  const { user, logout, language, setLanguage } = useAuth();
  const navigate = useNavigate();
  const [logoError, setLogoError] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { weather, loading, error } = useWeather();
  const { address, hasPreciseLocation, permissionGranted, permissionDenied } = useUserLocation();

  const languageDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'bm', name: 'Bambara', flag: '🇲🇱' },
    { code: 'wo', name: 'Wolof', flag: '🇸🇳' }
  ];

  // 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Alertes agricoles 
  const [agriculturalAlerts, setAgriculturalAlerts] = useState([]);

  useEffect(() => {
    if (weather) {
      const alerts = [];

      if (weather.temperature > 35) {
        alerts.push({
          type: 'heat',
          message: '🌡️ Fortes chaleurs - Augmentez l\'irrigation',
          severity: 'warning'
        });
      }

      if (weather.humidity > 80) {
        alerts.push({
          type: 'humidity',
          message: '💧 Humidité élevée - Risque de maladies fongiques',
          severity: 'info'
        });
      }

      if (weather.windSpeed > 25) {
        alerts.push({
          type: 'wind',
          message: '💨 Vents forts - Protégez les cultures sensibles',
          severity: 'warning'
        });
      }

      if (weather.condition.includes('🌧️') || weather.condition.includes('⛈️')) {
        alerts.push({
          type: 'rain',
          message: '🌧️ Pluie - Bonne irrigation naturelle',
          severity: 'success'
        });
      }

      setAgriculturalAlerts(alerts);
    }
  }, [weather]);

  const handleQuickAction = (action) => {
    switch(action) {
      case 'weather': navigate('/weather'); break;
      case 'alerts':
        if (agriculturalAlerts.length > 0) {
          alert(`🌾 Alertes Agricoles:\n\n${agriculturalAlerts.map(alert => `• ${alert.message}`).join('\n')}`);
        } else {
          alert('✅ Aucune alerte agricole pour le moment');
        }
        break;
      default: break;
    }
  };

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  const handleUserAction = (action) => {
    switch(action) {
      case 'profile': navigate('/profile'); break;
      case 'settings': navigate('/settings'); break;
      case 'logout': logout(); break;
      default: break;
    }
    setShowUserDropdown(false);
  };

  return (
    <header className="bg-success text-white shadow-sm">
      <div className="container-fluid">
        <div className="row align-items-center py-2">

          {/* LOGO */}
          <div className="col-md-4">
            <button 
              onClick={() => navigate('/')}
              className="btn btn-link p-0 text-decoration-none"
              style={{ background: 'none', border: 'none', textAlign: 'left' }}
            >
              <div className="d-flex align-items-center">
                {!logoError ? (
                  <img 
                    src={logo}
                    alt="EcoAgriConnect Solutions"
                    style={{ height: '150px', width: 'auto', marginRight: '12px' }}
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="fs-4 me-2">🌱</span>
                )}

                <div>
                  <div className="d-flex align-items-baseline">
                    <span style={{ fontFamily: "'Open Sans'", color: '#000', fontWeight: 'bold', fontSize: '3rem' }}>Eco</span>
                    <span style={{ fontFamily: "'Open Sans'", color: '#fff', fontWeight: 'bold', fontSize: '2.5rem' }}>Agri</span>
                    <span style={{ fontFamily: "'Open Sans'", color: '#000', fontWeight: 'bold', fontSize: '2rem' }}>Connect</span>
                    <span style={{ fontFamily: "'Open Sans'", color: '#fff', fontWeight: 'bold', fontSize: '2rem', marginLeft: '4px' }}>Solutions</span>
                  </div>
                  <div style={{ fontFamily: "'Great Vibes'", color: '#fff', fontSize: '2rem', marginTop: '-2px' }}>
                    Solutions durables pour l'Afrique rurale
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* CENTRE - ALERTES AGRICOLES */}
          <div className="col-md-4 d-flex align-items-center justify-content-center" style={{ minHeight: '150px' }}>
            <div className="d-flex flex-column align-items-center w-100">
              
              {/* ALERTES AGRICOLES */}
              <div className="d-flex gap-2 flex-wrap justify-content-center">
                {agriculturalAlerts.length > 0 && (
                  <button
                    className="btn btn-warning btn-lg d-flex align-items-center fw-bold"
                    onClick={() => handleQuickAction('alerts')}
                    style={{ borderRadius: '25px', padding: '12px 24px' }}
                  >
                    ⚠️ {agriculturalAlerts.length} Alerte(s) Agricole(s)
                  </button>
                )}
              </div>

              
      
            </div>
          </div>

          {/* UTILISATEUR ET LANGUE */}
          <div className="col-md-4">
            <div className="d-flex flex-column align-items-end justify-content-center h-100" style={{ minHeight: '150px' }}>

              {/* MÉTÉO ACTUELLE */}
              <div className="mb-3 position-relative">
                {loading ? (
                  <div className="d-inline-flex align-items-center bg-white bg-opacity-25 px-3 py-2 rounded-pill">
                    <div className="spinner-border spinner-border-sm text-light me-2"></div>
                    <small>Météo...</small>
                  </div>
                ) : error ? (
                  <div className="d-inline-flex align-items-center bg-warning bg-opacity-50 px-3 py-2 rounded-pill">
                    <small>⚠️ Météo indisponible</small>
                  </div>
                ) : weather ? (
                  <div 
                    className="d-flex align-items-center bg-white bg-opacity-25 px-3 py-2 rounded-pill"
                    onClick={() => handleQuickAction('weather')}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="fw-bold me-2 fs-6">{weather.temperature}°C</span>
                    <span className="me-2" style={{ fontSize: '1.3rem' }}>{weather.condition}</span>
                    <div className="d-flex flex-column">
                      <small><strong>{weather.city}</strong></small>
                      <small>{weather.description}</small>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Détails météo */}
              {weather && !loading && (
                <div className="d-flex gap-2 mb-3 flex-wrap justify-content-end">
                  <small className="bg-white bg-opacity-25 px-2 py-1 rounded-pill">💧 {weather.humidity}%</small>
                  <small className="bg-white bg-opacity-25 px-2 py-1 rounded-pill">💨 {weather.windSpeed} km/h</small>
                  <small className="bg-white bg-opacity-25 px-2 py-1 rounded-pill">🌡️ {weather.feelsLike}°C</small>
                </div>
              )}

              {/* UTILISATEUR + LANGUE */}
              <div className="d-flex align-items-center justify-content-end gap-3 w-100">

                {/* UTILISATEUR */}
                {user && (
                  <div className="dropdown position-relative" ref={userDropdownRef}>
                    <button
                      className="btn btn-light btn-sm dropdown-toggle d-flex align-items-center fw-bold"
                      onClick={() => setShowUserDropdown(!showUserDropdown)}
                      style={{ borderRadius: '20px', padding: '6px 16px' }}
                    >
                      <span className="me-2">👤</span>
                      {user.name}
                    </button>

                    {showUserDropdown && (
                      <div className="dropdown-menu show position-absolute" style={{ right: 0, top: '100%', zIndex: 1000 }}>
                        <button className="dropdown-item d-flex align-items-center py-2" onClick={() => handleUserAction('profile')}>
                          <span className="me-2">👤</span> Mon profil
                        </button>
                        <button className="dropdown-item d-flex align-items-center py-2" onClick={() => handleUserAction('settings')}>
                          <span className="me-2">⚙️</span> Paramètres
                        </button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item d-flex align-items-center text-danger py-2" onClick={() => handleUserAction('logout')}>
                          <span className="me-2">🚪</span> Déconnexion
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* LANGUE */}
                <div className="dropdown position-relative" ref={languageDropdownRef}>
                  <button
                    className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center"
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    style={{ borderRadius: '20px', padding: '6px 16px' }}
                  >
                    <span className="me-2">{languages.find(lang => lang.code === language)?.flag}</span>
                    {language.toUpperCase()}
                  </button>

                  {showLanguageDropdown && (
                    <div className="dropdown-menu show position-absolute" style={{ right: 0, top: '100%', zIndex: 1000 }}>
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          className="dropdown-item d-flex align-items-center py-2"
                          onClick={() => handleLanguageSelect(lang.code)}
                        >
                          <span className="me-2">{lang.flag}</span>
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* BANDEAU ALERTES */}
        {agriculturalAlerts.length > 0 && (
          <div className="row">
            <div className="col-12">
              <div className="alert alert-warning alert-dismissible py-2 mb-0">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center flex-wrap">
                    <span className="me-2">⚠️</span>
                    <small>
                      <strong>Alertes agricoles:</strong>{' '}
                      {agriculturalAlerts.map((alert, index) => (
                        <span key={index} className="ms-2">
                          {alert.message}
                          {index < agriculturalAlerts.length - 1 && ' •'}
                        </span>
                      ))}
                    </small>
                  </div>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setAgriculturalAlerts([])}
                  ></button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;