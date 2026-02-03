
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWeather } from '../hooks/useWeather';

const Weather = () => {
  const { user } = useAuth();
  const { weather, loading, error } = useWeather();
  const [selectedDay, setSelectedDay] = useState(0);

  // Données simulées 
  const forecast = [
    { day: 'Aujourd\'hui', condition: '☀️', maxTemp: 32, minTemp: 22, rain: 0, wind: 12 },
    { day: 'Demain', condition: '⛅', maxTemp: 31, minTemp: 23, rain: 10, wind: 15 },
    { day: 'Après-demain', condition: '🌧️', maxTemp: 28, minTemp: 21, rain: 60, wind: 20 },
    { day: 'J+3', condition: '⛈️', maxTemp: 26, minTemp: 20, rain: 80, wind: 25 },
    { day: 'J+4', condition: '🌦️', maxTemp: 29, minTemp: 22, rain: 30, wind: 18 }
  ];

  const weatherAlerts = [
    { type: 'rain', message: 'Pluies intenses prévues dans 48h', severity: 'warning' },
    { type: 'wind', message: 'Vents forts attendus demain', severity: 'info' }
  ];

  const farmingTips = {
    sunny: "🌱 Bonne journée pour les semis d'oignon et l'irrigation",
    cloudy: "☁️ Conditions idéales pour le repiquage des tomates",
    rainy: "🌧️ Profitez pour planifier vos prochaines cultures",
    stormy: "⛈️ Protégez vos cultures sensibles"
  };

  const getFarmingTip = (condition) => {
    if (condition.includes('☀️')) return farmingTips.sunny;
    if (condition.includes('⛅') || condition.includes('☁️')) return farmingTips.cloudy;
    if (condition.includes('🌧️')) return farmingTips.rainy;
    if (condition.includes('⛈️')) return farmingTips.stormy;
    return "🌾 Surveillez vos cultures régulièrement";
  };

  return (
    <div className="container-fluid py-4">
      {/* En-tête */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="text-success">🌤️ Météo Agricole</h1>
          <p className="text-muted">Prévisions météo locale adaptées à vos besoins agricoles</p>
        </div>
      </div>

      {/* Météo actuelle */}
      <div className="row mb-4">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                📍 Météo actuelle - {weather ? `${weather.city}, ${weather.country}` : 'Chargement...'}
              </h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                  </div>
                  <p className="mt-2">Chargement des données météo...</p>
                </div>
              ) : error ? (
                <div className="alert alert-warning">
                  <p>Données météo temporairement indisponibles</p>
                </div>
              ) : weather ? (
                <div className="row align-items-center">
                  <div className="col-md-4 text-center">
                    <div style={{ fontSize: '4rem' }}>{weather.condition}</div>
                    <h2 className="display-4">{weather.temperature}°C</h2>
                    <p className="text-muted">{weather.description}</p>
                  </div>
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-6 mb-3">
                        <strong>🌡️ Ressenti</strong>
                        <p>{weather.feelsLike}°C</p>
                      </div>
                      <div className="col-6 mb-3">
                        <strong>💧 Humidité</strong>
                        <p>{weather.humidity}%</p>
                      </div>
                      <div className="col-6 mb-3">
                        <strong>💨 Vent</strong>
                        <p>{weather.windSpeed} km/h</p>
                      </div>
                      <div className="col-6 mb-3">
                        <strong>📍 Localisation</strong>
                        <p>{weather.city}, {weather.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Conseils agricoles */}
        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">🌾 Conseil du jour</h5>
            </div>
            <div className="card-body">
              {weather && (
                <>
                  <p className="mb-3">{getFarmingTip(weather.condition)}</p>
                  <div className="alert alert-info">
                    <small>
                      <strong>💡 Astuce :</strong> Adaptez vos activités aux conditions météo pour optimiser vos rendements.
                    </small>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Prévisions sur 5 jours */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">📅 Prévisions sur 5 jours</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                {forecast.map((day, index) => (
                  <div key={index} className="col">
                    <div 
                      className={`card cursor-pointer ${selectedDay === index ? 'border-primary' : ''}`}
                      onClick={() => setSelectedDay(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="card-body">
                        <h6>{day.day}</h6>
                        <div style={{ fontSize: '2rem' }}>{day.condition}</div>
                        <div className="mt-2">
                          <strong>{day.maxTemp}°</strong> / {day.minTemp}°
                        </div>
                        <small className="text-muted">
                          💧 {day.rain}% 🌬️ {day.wind}km/h
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Détails du jour sélectionné */}
              {forecast[selectedDay] && (
                <div className="row mt-4">
                  <div className="col-12">
                    <div className="alert alert-light">
                      <h6>Détails pour {forecast[selectedDay].day}</h6>
                      <div className="row">
                        <div className="col-md-3">
                          <strong>Condition:</strong> {forecast[selectedDay].condition}
                        </div>
                        <div className="col-md-3">
                          <strong>Température:</strong> {forecast[selectedDay].maxTemp}°C / {forecast[selectedDay].minTemp}°C
                        </div>
                        <div className="col-md-3">
                          <strong>Pluie:</strong> {forecast[selectedDay].rain}%
                        </div>
                        <div className="col-md-3">
                          <strong>Vent:</strong> {forecast[selectedDay].wind} km/h
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Alertes météo */}
      {weatherAlerts.length > 0 && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-warning">
              <div className="card-header bg-warning text-dark">
                <h5 className="mb-0">🚨 Alertes Météo</h5>
              </div>
              <div className="card-body">
                {weatherAlerts.map((alert, index) => (
                  <div key={index} className="alert alert-warning mb-2">
                    <strong>{alert.type === 'rain' ? '🌧️' : '💨'}</strong> {alert.message}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;