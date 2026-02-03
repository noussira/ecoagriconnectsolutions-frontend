import React from 'react';
import { Link } from 'react-router-dom';

const Mission = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/about" className="text-success text-decoration-none">À propos</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Mission &amp; Vision</li>
            </ol>
          </nav>

          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="display-5 text-success fw-bold mb-4">🎯 Mission &amp; Vision</h1>
              
              {/* Mission */}
              <div className="row mb-5">
                <div className="col-md-6">
                  <div className="text-center p-4 border rounded bg-light">
              
                    <h2 className="h3 text-success"><strong>Notre Mission</strong></h2><br/>
                    <p className="fs-5">
                      <strong>Transformer l&apos;agriculture africaine</strong> en mettant 
                      la technologie au service des petits producteurs pour améliorer 
                      leurs rendements, leurs revenus et leur résilience face aux 
                      changements climatiques.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-center p-4 border rounded bg-light">
                    
                    <h2 className="h3 text-success"> <strong>Notre Vision</strong></h2><br/>
                    <p className="fs-5">
                      <strong>Une Afrique rurale prospère</strong> et altruiste où chaque agriculteur 
                      a accès aux outils numériques, aux connaissances et aux marchés 
                      nécessaires pour réussir durablement et en bonne santé
                    </p>
                  </div>
                </div>
              </div>

              {/* Objectifs */}
              <div className="mb-5">
                <h2 className="h3 text-success mb-4">🎯 Nos Objectifs Stratégiques</h2>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="card h-100 border-success">
                      <div className="card-body text-center">
                        <div className="h1 mb-3">🌱</div>
                        <h5 className="card-title">Productivité</h5>
                        <p className="card-text">
                          Augmenter les rendements de 30% grâce aux conseils personnalisés
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card h-100 border-success">
                      <div className="card-body text-center">
                        <div className="h1 mb-3">💧</div>
                        <h5 className="card-title">Durabilité</h5>
                        <p className="card-text">
                          Réduire de 40% la consommation d&apos;eau grâce à l&apos;irrigation intelligente
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card h-100 border-success">
                      <div className="card-body text-center">
                        <div className="h1 mb-3">📈</div>
                        <h5 className="card-title">Revenus</h5>
                        <p className="card-text">
                          Améliorer les revenus des agriculteurs de 50% via l&apos;accès aux marchés
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Retour */}
              <div className="text-center mt-4">
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

export default Mission;