
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Blog = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const articles = [
    {
      id: 1,
      title: "Les nouvelles techniques de riziculture au Mali",
      author: "Dr. Jean Traoré",
      category: "techniques",
      excerpt: "Découvrez comment les nouvelles méthodes de culture peuvent augmenter vos rendements de riz de 30%...",
      content: "Les agriculteurs maliens adoptent des techniques modernes pour améliorer leur production de riz. L'utilisation de semences certifiées et une meilleure gestion de l'eau permettent des rendements impressionnants...",
      image: "🌾",
      publishedDate: "2024-03-15",
      readTime: "5 min",
      tags: ["riziculture", "innovation", "Mali"]
    },
    {
      id: 2,
      title: "Marché des produits agricoles : tendances 2024",
      author: "Aminata Keita",
      category: "market",
      excerpt: "Analyse des prix et de la demande pour les principaux produits agricoles cette année...",
      content: "Le marché agricole malien montre une croissance stable avec des opportunités intéressantes. La demande pour les produits biologiques continue d'augmenter...",
      image: "📈",
      publishedDate: "2024-03-10",
      readTime: "7 min",
      tags: ["marché", "prix", "tendances"]
    },
    {
      id: 3,
      title: "Gestion efficace de l'eau en période de sécheresse",
      author: "Ing. Moussa Diallo",
      category: "water",
      excerpt: "Stratégies pour optimiser l'utilisation de l'eau dans vos cultures...",
      content: "Face aux changements climatiques, une gestion rationnelle de l'eau devient cruciale. Découvrez les techniques d'irrigation goutte-à-goutte...",
      image: "💧",
      publishedDate: "2024-03-05",
      readTime: "6 min",
      tags: ["eau", "sécheresse", "irrigation"]
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes les actualités', icon: '📰' },
    { id: 'techniques', name: 'Techniques agricoles', icon: '🌱' },
    { id: 'market', name: 'Marché et prix', icon: '💰' },
    { id: 'water', name: 'Gestion de l\'eau', icon: '💧' },
    { id: 'technology', name: 'Innovations', icon: '🚜' }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="text-success">📰 Actualités Agricoles</h1>
          <p className="text-muted">Restez informé des dernières tendances et innovations</p>
        </div>
      </div>

      {/* Catégories */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`btn ${selectedCategory === category.id ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="row">
        {filteredArticles.map(article => (
          <div key={article.id} className="col-lg-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-start mb-3">
                  <div className="me-3" style={{ fontSize: '3rem' }}>
                    {article.image}
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="card-title text-success">{article.title}</h5>
                    <div className="d-flex align-items-center text-muted small mb-2">
                      <span>✍️ {article.author}</span>
                      <span className="mx-2">•</span>
                      <span>📅 {new Date(article.publishedDate).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>⏱️ {article.readTime}</span>
                    </div>
                  </div>
                </div>
                
                <p className="card-text">{article.excerpt}</p>
                
                <div className="mb-3">
                  {article.tags.map(tag => (
                    <span key={tag} className="badge bg-light text-dark me-1">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <button className="btn btn-outline-success btn-sm">
                  Lire la suite →
                </button>
                <div className="btn-group ms-2">
                  <button className="btn btn-outline-secondary btn-sm">👍 24</button>
                  <button className="btn btn-outline-secondary btn-sm">💬 8</button>
                  <button className="btn btn-outline-secondary btn-sm">📤 Partager</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card bg-light border-0">
            <div className="card-body text-center py-5">
              <h3 className="text-success">📧 Restez informé</h3>
              <p className="text-muted">Recevez les dernières actualités agricoles directement dans votre boîte mail</p>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="input-group">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Votre adresse email" 
                    />
                    <button className="btn btn-success">S'abonner</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;