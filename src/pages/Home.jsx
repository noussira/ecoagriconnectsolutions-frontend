import React from 'react'
import { Link } from "react-router-dom"
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user, language } = useAuth()

  const translations = {
    fr: {
      welcome: 'Bienvenue sur EcoAgriConnect Solutions ',
      subtitle: 'Votre partenaire pour une agriculture durable et connectée',
      stats: 'Statistiques',
      weather: 'Météo',
      alerts: 'Alertes'
    },
    en: {
      welcome: 'Welcome to EcoAgriConnect Solutions ',
      subtitle: 'Your partner for sustainable and connected farming',
      stats: 'Statistics',
      weather: 'Weather',
      alerts: 'Alerts'
    }
  }

  const t = translations[language] || translations.fr

  return (
    <div className="container-fluid py-4">
      
     
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="text-success">{t.welcome}</h1>
          <p className="lead text-muted">{t.subtitle}</p>

          {user && (
            <div className="alert alert-info mt-3">
              <strong>👋 Bon retour, {user.name}!</strong>
              {user.farmName && ` — ${user.farmName}`}
            </div>
          )}
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="text-warning mb-3" style={{ fontSize: '2rem' }}>📊</div>
              <h5 className="card-title">{t.stats}</h5>
              <p className="card-text">
                Vos cultures en cours : <strong>5</strong>
              </p>
              <p className="card-text">
                Stocks disponibles : <strong>3</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="text-primary mb-3" style={{ fontSize: '2rem' }}>🌤️</div>
              <h5 className="card-title">{t.weather}</h5>
              <p className="card-text">
                <strong>28°C – Ensoleillé</strong>
              </p>
              <p className="card-text">
                Ouagadougou, Burkina Faso
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="text-danger mb-3" style={{ fontSize: '2rem' }}>💬</div>
              <h5 className="card-title">{t.alerts}</h5>
              <p className="card-text">
                <strong>2 nouveaux messages</strong>
              </p>
              <p className="card-text">
                1 alerte météo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="row mt-5">
        <div className="col-12">
          <h3 className="text-success mb-4">Actions Rapides</h3>

          <div className="d-flex gap-3 flex-wrap">
            <Link to="/cultures" className="btn btn-outline-success">
              🌾 Ajouter une culture
            </Link>

            <Link to="/marketplace" className="btn btn-outline-primary">
              🛒 Voir le marché
            </Link>

            <Link to="/stocks" className="btn btn-outline-warning">
              📦 Gérer les stocks
            </Link>

            <Link to="/weather" className="btn btn-outline-info">
              🌤️ Prévisions météo
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
