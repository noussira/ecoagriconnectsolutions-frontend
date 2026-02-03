import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Register from './pages/Register';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import nature from './assets/images/nature.png';
import FAQ from "./pages/FAQ";
import Services from "./pages/Services";
import GeolocationPrompt from './components/common/GeolocationPrompt';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Marketplace from './pages/Marketplace';
import Cultures from './pages/Cultures';
import Stocks from './pages/Stocks';
import Weather from './pages/Weather';
import Messages from './pages/Messages';
import Blog from './pages/Blog';
// IMPORTS ABOUT
import About from './pages/About/About';
import History from './pages/About/History';
import Mission from './pages/About/Mission';
import Team from './pages/About/Team';
import Values from './pages/About/Values';

import ApiTester from './components/ApiTester'; 
import './App.css';

function App() {
  const [showGeolocationPrompt, setShowGeolocationPrompt] = useState(false);
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);

  useEffect(() => {
    const geoPreference = localStorage.getItem('geolocationEnabled');
    if (geoPreference === null) {
      const timer = setTimeout(() => {
        setShowGeolocationPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setGeolocationEnabled(geoPreference === 'true');
    }
  }, []);

  const handleGeolocationAccept = () => {
    setGeolocationEnabled(true);
    setShowGeolocationPrompt(false);
    localStorage.setItem('geolocationEnabled', 'true');
  };

  const handleGeolocationDeny = () => {
    setGeolocationEnabled(false);
    setShowGeolocationPrompt(false);
    localStorage.setItem('geolocationEnabled', 'false');
  };

  const handleGeolocationClose = () => {
    setShowGeolocationPrompt(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app d-flex flex-column min-vh-100">
          <Header />
          <div className="app-body d-flex flex-fill">
            <Sidebar />
            <main className="main-content flex-fill position-relative">

              

              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/services" element={<Services />} />

                <Route path="/" element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } />

                <Route path="/cultures" element={<ProtectedRoute><Cultures /></ProtectedRoute>} />
                <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
                <Route path="/stocks" element={<ProtectedRoute><Stocks /></ProtectedRoute>} />
                <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
                <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
                <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />

                {/* ROUTES ABOUT */}
                <Route path="/about" element={<About />} />
                <Route path="/about/history" element={<History />} />
                <Route path="/about/mission" element={<Mission />} />
                <Route path="/about/team" element={<Team />} />
                <Route path="/about/values" element={<Values />} />
              </Routes>
            </main>
          </div>

          {/* Footer */}
          <footer className="bg-success text-white py-4 mt-auto">
            <div className="container">
              <div className="row">
                <div className="col-md-4 mb-3 mb-md-0 text-start">
                  <h5><strong>EcoAgriConnect Solutions</strong></h5>
                  <p className="mb-0">
                    Votre partenaire pour une agriculture durable et connectée.
                  </p>
                </div>

                <div className="col-md-4 mb-3 mb-md-0 text-start">
                  <h5><strong>Contact</strong></h5>
                  <p className="mb-0">
                    <i className="bx bxl-whatsapp"></i> WhatsApp : +226 68 73 00 03
                  </p>
                  <p className="mb-0">
                    <i className="bx bx-envelope"></i> Email : contact@ecoagriconnectsolutions.com
                  </p>
                  <p className="mb-0">
                    <i className="bx bx-current-location"></i> Ouagadougou, Burkina Faso
                  </p>
                </div>

                <div className="col-md-4 text-start">
                  <h5><strong>Liens utiles</strong></h5>
                  <p className="mb-0">
                    <Link to="/about" className="text-white text-decoration-none">À propos</Link>
                  </p>
                  <p className="mb-0">
                    <Link to="/services" className="text-white text-decoration-none">Services</Link>
                  </p>
                  <p className="mb-0">
                    <Link to="/faq" className="text-white text-decoration-none">FAQ</Link>
                  </p>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12">
                  <img
                    src={nature}
                    alt="nature"
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                  />
                </div>
              </div>

              <hr className="border-light my-4" />

              <div className="row text-center">
                <div className="col-md-6 mb-2 mb-md-0">
                  <p className="mb-0">
                    La date et l'heure actuelles sont : {new Date().toLocaleString()}
                  </p>
                </div>

                <div className="col-md-6">
                  <p className="mb-0">
                    Suivez-nous :
                    <a href="#" className="text-white text-decoration-none ms-2">Facebook</a> |
                    <a href="#" className="text-white text-decoration-none ms-2">Instagram</a> |
                    <a href="#" className="text-white text-decoration-none ms-2">LinkedIn</a>
                  </p>
                </div>
              </div>

              <hr className="border-light my-4" />

              <p className="mb-0 text-center">
                &copy; 2025 EcoAgriConnect Solutions. Tous droits réservés.
              </p>
            </div>
          </footer>
          {showGeolocationPrompt && (
            <GeolocationPrompt
              onAccept={handleGeolocationAccept}
              onDeny={handleGeolocationDeny}
              onClose={handleGeolocationClose}
            />
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
