
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Messages = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const messages = [
    {
      id: 1,
      sender: 'Aminata Keita',
      type: 'buyer',
      subject: 'Commande de riz',
      content: 'Bonjour, je suis intéressée par votre riz local. Pouvez-vous me proposer un prix pour 100kg ?',
      timestamp: '2024-03-20 10:30',
      read: false,
      category: 'inquiry'
    },
    {
      id: 2,
      sender: 'Dr. Jean Traoré',
      type: 'advisor',
      subject: 'Conseil technique',
      content: 'Vos cultures de tomates pourraient bénéficier d\'un apport en potassium. Disponible pour une visite ?',
      timestamp: '2024-03-19 14:15',
      read: true,
      category: 'advice'
    },
    {
      id: 3,
      sender: 'Service Météo',
      type: 'system',
      subject: 'Alerte météo',
      content: 'Risque de pluies intenses dans les 48h. Protégez vos cultures sensibles.',
      timestamp: '2024-03-20 08:00',
      read: false,
      category: 'alert'
    }
  ];

  const filteredMessages = messages.filter(msg => 
    activeTab === 'inbox' || msg.category === activeTab
  );

  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-success">💬 Messages</h1>
          <p className="text-muted">Communiquez avec vos partenaires agricoles</p>
        </div>
      </div>

      <div className="row">
        {/* Liste des messages */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <ul className="nav nav-pills card-header-pills">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'inbox' ? 'active' : ''}`}
                    onClick={() => setActiveTab('inbox')}
                  >
                    Boîte de réception {unreadCount > 0 && <span className="badge bg-danger">{unreadCount}</span>}
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'advice' ? 'active' : ''}`}
                    onClick={() => setActiveTab('advice')}
                  >
                    Conseils
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {filteredMessages.map(message => (
                  <button
                    key={message.id}
                    className={`list-group-item list-group-item-action ${!message.read ? 'fw-bold' : ''} ${selectedMessage?.id === message.id ? 'active' : ''}`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">{message.sender}</h6>
                      <small>{message.timestamp}</small>
                    </div>
                    <p className="mb-1">{message.subject}</p>
                    <small className={`${selectedMessage?.id === message.id ? 'text-white' : 'text-muted'}`}>
                      {message.content.substring(0, 50)}...
                    </small>
                    {!message.read && <span className="badge bg-primary ms-2">Nouveau</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Détail du message */}
        <div className="col-md-8">
          {selectedMessage ? (
            <div className="card shadow-sm h-100">
              <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0">{selectedMessage.subject}</h5>
                  <small>De: {selectedMessage.sender}</small>
                </div>
                <div>
                  <small>{selectedMessage.timestamp}</small>
                  {!selectedMessage.read && <span className="badge bg-warning ms-2">Non lu</span>}
                </div>
              </div>
              <div className="card-body">
                <p>{selectedMessage.content}</p>
                
                {/* Actions selon le type de message */}
                {selectedMessage.category === 'inquiry' && (
                  <div className="mt-4 p-3 bg-light rounded">
                    <h6>📞 Répondre à cette demande</h6>
                    <div className="btn-group">
                      <button className="btn btn-success btn-sm">Accepter la commande</button>
                      <button className="btn btn-outline-secondary btn-sm">Proposer un prix</button>
                      <button className="btn btn-outline-danger btn-sm">Refuser</button>
                    </div>
                  </div>
                )}

                {selectedMessage.category === 'advice' && (
                  <div className="mt-4 p-3 bg-info bg-opacity-10 rounded">
                    <h6>🎓 Conseil professionnel</h6>
                    <button className="btn btn-primary btn-sm">Prendre rendez-vous</button>
                    <button className="btn btn-outline-primary btn-sm ms-2">Demander plus d'infos</button>
                  </div>
                )}
              </div>
              <div className="card-footer">
                <div className="btn-group">
                  <button className="btn btn-outline-primary btn-sm">📧 Répondre</button>
                  <button className="btn btn-outline-secondary btn-sm">📁 Archiver</button>
                  <button className="btn btn-outline-danger btn-sm">🗑️ Supprimer</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex align-items-center justify-content-center">
                <div className="text-center text-muted">
                  <h3>📨</h3>
                  <p>Sélectionnez un message pour lire son contenu</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;