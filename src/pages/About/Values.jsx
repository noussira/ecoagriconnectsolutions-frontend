import React from 'react';
import { Link } from 'react-router-dom';

const Values = () => {
  const values = [
    {
      icon: "🌱",
      title: "Innovation Durable",
      description: "Nous développons des solutions qui répondent aux besoins actuels sans compromettre l'avenir des générations futures."
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "Nous croyons en la force du collectif et travaillons main dans la main avec les communautés agricoles."
    },
    {
      icon: "🎯",
      title: "Impact Mesurable",
      description: "Chaque action est guidée par la recherche d'un impact concret et mesurable sur la vie des agriculteurs."
    },
    {
      icon: "💡",
      title: "Simplicité",
      description: "Nous rendons la technologie accessible et facile à utiliser, même pour les moins familiarisés avec le numérique."
    },
    {
      icon: "🌍",
      title: "Respect de l'Environnement",
      description: "Toutes nos solutions sont conçues dans le respect de l'écosystème et de la biodiversité."
    },
    {
      icon: "👨‍🌾",
      title: "Centré sur l'Agriculteur",
      description: "L'agriculteur est au cœur de toutes nos décisions et innovations."
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
              <li className="breadcrumb-item active" aria-current="page">Valeurs</li>
            </ol>
          </nav>

          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="display-5 text-success fw-bold mb-4">💎 Nos Valeurs</h1>
              
              <p className="lead mb-5">
                Ces principes fondamentaux guident chacune de nos actions et décisions. 
                Ils sont l'ADN de notre entreprise et la base de notre relation de confiance 
                avec la communauté agricole.
              </p>

              {/* Grille des valeurs */}
              <div className="row g-4">
                {values.map((value, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card h-100 border-success text-center">
                      <div className="card-body p-4">
                        <div className="display-1 mb-3">{value.icon}</div>
                        <h3 className="h5 text-success mb-3">{value.title}</h3>
                        <p className="card-text">{value.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Engagement */}
              <div className="card bg-success text-white mt-5">
                <div className="card-body p-4 text-center">
                  <h2 className="h3 mb-3"> Notre Engagement</h2>
                  <p className="fs-5 mb-0">
                    &ldquo;Nous nous engageons à honorer ces valeurs dans chaque interaction, 
                    chaque innovation et chaque décision, pour construire ensemble 
                    un avenir meilleur pour l'agriculture africaine.&rdquo;
                  </p>
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

export default Values;