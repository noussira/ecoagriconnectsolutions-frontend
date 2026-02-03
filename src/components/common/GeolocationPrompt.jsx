// src/components/common/GeolocationPrompt.jsx
import React from 'react';

const GeolocationPrompt = ({ onAccept, onDeny, onClose }) => {
  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">🌍 Améliorez votre expérience EcoAgriConnect</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="text-center mb-4">
              <div style={{ fontSize: '3rem' }}>📍</div>
              <h4 className="text-success">Localisation Activée</h4>
            </div>
            
            <p className="mb-3">
              <strong>Autorisez la géolocalisation pour bénéficier de fonctionnalités personnalisées :</strong>
            </p>
            
            <div className="row">
              <div className="col-6 mb-3">
                <div className="text-center">
                  <div style={{ fontSize: '1.5rem' }}>🌤️</div>
                  <small>Météo précise de votre champ</small>
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="text-center">
                  <div style={{ fontSize: '1.5rem' }}>🛒</div>
                  <small>Marché local personnalisé</small>
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="text-center">
                  <div style={{ fontSize: '1.5rem' }}>🌾</div>
                  <small>Conseils régionaux adaptés</small>
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="text-center">
                  <div style={{ fontSize: '1.5rem' }}>🚨</div>
                  <small>Alertes météo spécifiques</small>
                </div>
              </div>
            </div>

            <div className="alert alert-info mt-3">
              <small>
                <strong>🔒 Respect de votre vie privée :</strong><br/>
                • Vos données restent confidentielles<br/>
                • Aucune localisation n'est partagée<br/>
                • Vous pouvez désactiver à tout moment
              </small>
            </div>
          </div>
          <div className="modal-footer">
            <button 
              className="btn btn-outline-secondary" 
              onClick={onDeny}
            >
              Ignorer pour l'instant
            </button>
            <button 
              className="btn btn-success" 
              onClick={onAccept}
            >
              🌍 Activer la localisation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeolocationPrompt;