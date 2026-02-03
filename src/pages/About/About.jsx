import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          {/* En-tête */}
          <div className="text-center mb-5">
            <h1 className="display-4 text-success fw-bold"> À Propos</h1>
            <p className="lead text-muted">
              Découvrez l'histoire et la vision d'EcoAgriConnect Solutions
            </p>
          </div>

          {/* Introduction */}
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              <h2 className="h3 text-success mb-3">Notre Engagement</h2>
              <p className="fs-5">
                EcoAgriConnect Solutions est née d'une passion pour l'agriculture durable 
                et d'un engagement ferme envers le développement rural africain. 
                Nous croyons en une agriculture intelligente, respectueuse de l'environnement 
                et économiquement viable pour les producteurs.
              </p>
            </div>
          </div>

          {/* Cartes de navigation */}
          <div className="row g-4">
            <div className="col-md-6">
              <Link to="/about/history" className="text-decoration-none">
                <div className="card h-100 shadow-hover border-success">
                  <div className="card-body text-center p-4">
                    <div className="display-1 mb-3">📜</div>
                    <h3 className="h5 text-success">Histoire</h3>
                    <p className="text-muted">
                      Découvrez notre parcours depuis nos débuts
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-6">
              <Link to="/about/mission" className="text-decoration-none">
                <div className="card h-100 shadow-hover border-success">
                  <div className="card-body text-center p-4">
                    <div className="display-1 mb-3">🎯</div>
                    <h3 className="h5 text-success">Mission &amp; Vision</h3>
                    <p className="text-muted">
                      Notre raison d&apos;être et nos aspirations
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-6">
              <Link to="/about/team" className="text-decoration-none">
                <div className="card h-100 shadow-hover border-success">
                  <div className="card-body text-center p-4">
                    <div className="display-1 mb-3">👥</div>
                    <h3 className="h5 text-success">Équipe</h3>
                    <p className="text-muted">
                      Rencontrez les fondateurs passionnés
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-6">
              <Link to="/about/values" className="text-decoration-none">
                <div className="card h-100 shadow-hover border-success">
                  <div className="card-body text-center p-4">
                    <div className="display-1 mb-3">💎</div>
                    <h3 className="h5 text-success">Valeurs</h3>
                    <p className="text-muted">
                      Les principes qui guident nos actions
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Chiffres clés */}
          <div className="card bg-light mt-5">
            <div className="card-body p-4">
              <h3 className="h4 text-center mb-4">📊 Notre Impact</h3>
              <div className="row text-center">
                <div className="col-6 col-md-3 mb-3">
                  <div className="h2 text-success fw-bold">500+</div>
                  <small>Agriculteurs Actifs</small>
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <div className="h2 text-success fw-bold">15+</div>
                  <small>Régions Couvertes</small>
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <div className="h2 text-success fw-bold">95%</div>
                  <small>De Satisfaction</small>
                </div>
                <div className="col-6 col-md-3 mb-3">
                  <div className="h2 text-success fw-bold">24/7</div>
                  <small>Support Technique</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;