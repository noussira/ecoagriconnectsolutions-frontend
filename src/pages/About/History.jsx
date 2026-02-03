import React from 'react';
import { Link } from 'react-router-dom';

const History = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-10 mx-auto">
  
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/about" className="text-success text-decoration-none">À propos</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Histoire</li>
            </ol>
          </nav>

          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="display-5 text-success fw-bold mb-4">📜 Histoire de l'entreprise</h1>
              
              {/* Timeline */}
              <div className="timeline">
                <div className="timeline-item mb-4">
                  <div className="timeline-badge bg-success">2018</div>
                  <div className="timeline-content">
                    <h3 className="h5 text-success">Les Débuts</h3>
                    <p>
                      EcoAgriConnect Solutions a été fondée par un groupe d&apos;agronomes et 
                      d&apos;experts en technologies qui partageaient une vision commune : 
                      révolutionner l&apos;agriculture africaine grâce au numérique.
                    </p>
                  </div>
                </div>

                <div className="timeline-item mb-4">
                  <div className="timeline-badge bg-success">2019</div>
                  <div className="timeline-content">
                    <h3 className="h5 text-success">Premier Prototype</h3>
                    <p>
                      Lancement de notre première application mobile de suivi météorologique 
                      pour les agriculteurs du Burkina Faso. Plus de 100 agriculteurs ont 
                      participé à notre programme pilote.
                    </p>
                  </div>
                </div>

                <div className="timeline-item mb-4">
                  <div className="timeline-badge bg-success">2020</div>
                  <div className="timeline-content">
                    <h3 className="h5 text-success">Expansion Régionale</h3>
                    <p>
                      Extension de nos services au Mali et au Sénégal. Développement de 
                      fonctionnalités avancées d&apos;alertes agricoles et de conseils 
                      personnalisés.
                    </p>
                  </div>
                </div>

                <div className="timeline-item mb-4">
                  <div className="timeline-badge bg-success">2022</div>
                  <div className="timeline-content">
                    <h3 className="h5 text-success">Reconnaissance</h3>
                    <p>
                      Prix de l&apos;Innovation Agricole décerné par l&apos;Union Africaine. 
                      Partenariat avec le Ministère de l&apos;Agriculture de plusieurs pays.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-badge bg-success">2026</div>
                  <div className="timeline-content">
                    <h3 className="h5 text-success">Aujourd&apos;hui</h3>
                    <p>
                      Plus de 500 agriculteurs actifs, couverture dans 15 régions, 
                      et une communauté grandissante d&apos;experts agricoles et d&apos;acheteurs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Retour */}
              <div className="text-center mt-5">
                <Link to="/about" className="btn btn-success">
                  ← Retour à la page À propos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;  