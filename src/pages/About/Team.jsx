import React from 'react';
import { Link } from 'react-router-dom';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Aminata Diallo",
      role: "Fondatrice ; CEO",
      expertise: "Agronome - PhD en Agriculture Durable",
      description: "15 ans d'expérience dans le développement rural. Ancienne consultante pour la FAO.",
      avatar: "👩‍🌾"
    },
    {
      id: 2,
      name: "Noussiratou A. KINDE",
      role: "CTO ; Co-fondatrice",
      expertise: "Développeuse Web ; Réseau et Maintenance Informatique",
      description: "Spécialiste des technologies agricoles. A développée plusieurs applications primées.",
      avatar: "👨‍💻"
    },
    {
      id: 3,
      name: "Mariam Traoré",
      role: "Directrice des Opérations",
      expertise: "Gestion de Projets Agricoles",
      description: "Expertise en mise en œuvre de programmes agricoles à grande échelle.",
      avatar: "👩‍💼"
    },
    {
      id: 4,
      name: "Boubacar Sow",
      role: "Responsable Météorologique",
      expertise: "Météorologie Agricole",
      description: "Développe nos algorithmes de prédiction météorologique et des alertes.",
      avatar: "🔬"
    }
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-10 mx-auto">
  
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/about" className="text-success text-decoration-none">À propos</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Équipe</li>
            </ol>
          </nav>

          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="display-5 text-success fw-bold mb-4">👥 Équipe Fondatrice</h1>
              
              <p className="lead mb-5">
                Rencontrez l&apos;équipe passionnée qui travaille chaque jour pour révolutionner 
                l&apos;agriculture africaine grâce à l&apos;innovation et la technologie.
              </p>

              {/* Membres de l'équipe */}
              <div className="row g-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="col-md-6">
                    <div className="card h-100 border-success">
                      <div className="card-body text-center p-4">
                        <div className="display-1 mb-3">{member.avatar}</div>
                        <h3 className="h4 text-success">{member.name}</h3>
                        <h5 className="text-muted mb-3">{member.role}</h5>
                        <p className="fw-bold text-success">{member.expertise}</p>
                        <p className="card-text">{member.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Équipe étendue */}
              <div className="card bg-light mt-5">
                <div className="card-body p-4">
                  <h2 className="h3 text-success mb-3">👨‍👩‍👧‍👦 Notre Équipe Étendue</h2>
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="h2 text-success fw-bold">12</div>
                      <small>Experts Agricoles</small>
                    </div>
                    <div className="col-4">
                      <div className="h2 text-success fw-bold">8</div>
                      <small>Développeurs</small>
                    </div>
                    <div className="col-4">
                      <div className="h2 text-success fw-bold">15</div>
                      <small>Conseillers Terrain</small>
                    </div>
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

export default Team;