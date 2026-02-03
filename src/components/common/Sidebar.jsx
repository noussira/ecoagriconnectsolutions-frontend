import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showAboutSubmenu, setShowAboutSubmenu] = useState(false)

  const menuItems = [
    { id: 'home', label: '🏠 Accueil', path: '/' },
    { id: 'cultures', label: '🌾 Mes Cultures', path: '/cultures' },
    { id: 'marketplace', label: '🛒 Marketplace', path: '/marketplace' },
    { id: 'stocks', label: '📦 Stocks', path: '/stocks' },
    { id: 'weather', label: '🌤️ Météo', path: '/weather' },
    { id: 'messages', label: '💬 Messages', path: '/messages' },
    { id: 'blog', label: '📰 Actualités', path: '/blog' }
  ]

  // Sous-menu À propos
  const aboutSubmenuItems = [
    { id: 'about-main', label: 'ℹ️ Page principale', path: '/about' },
    { id: 'about-history', label: '📜 Notre Histoire', path: '/about/history' },
    { id: 'about-mission', label: '🎯 Mission & Vision', path: '/about/mission' },
    { id: 'about-team', label: '👥 Notre Équipe', path: '/about/team' },
    { id: 'about-values', label: '💎 Nos Valeurs', path: '/about/values' }
  ]

  // Changer le thème 
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleAboutSubmenu = () => {
    setShowAboutSubmenu(!showAboutSubmenu);
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="bg-light vh-100 border-end position-relative" style={{width: '250px'}}>
      <div className="p-3 d-flex flex-column h-100">
        {/* Menu principal */}
        <div className="flex-grow-1">
          <ul className="nav nav-pills flex-column">
            {menuItems.map(item => (
              <li key={item.id} className="nav-item mb-1">
                <button
                  className={`nav-link w-100 text-start ${
                    location.pathname === item.path ? 'active bg-success' : 'text-dark'
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </button>
              </li>
            ))}

            
            <li className="nav-item my-2">
              <hr className="mx-2" />
            </li>

            {/* Menu À propos avec sous-menu */}
            <li className="nav-item mb-1">
              <div className="d-flex flex-column">
                {/* Bouton principal À propos */}
                <button
                  className={`nav-link w-100 text-start d-flex align-items-center justify-content-between ${
                    location.pathname.startsWith('/about') ? 'active bg-success text-white' : 'text-dark'
                  }`}
                  onClick={toggleAboutSubmenu}
                >
                  <span>ℹ️ À propos</span>
                  <span style={{ 
                    transform: showAboutSubmenu ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    fontSize: '0.8rem'
                  }}>
                    ▼
                  </span>
                </button>

                {/* Sous-menu À propos */}
                {showAboutSubmenu && (
                  <div className="about-submenu ps-3 mt-1">
                    {aboutSubmenuItems.map((item) => (
                      <button
                        key={item.id}
                        className={`nav-link w-100 text-start mb-1 ${
                          isActive(item.path) ? 'active bg-success text-white' : 'text-dark'
                        }`}
                        onClick={() => navigate(item.path)}
                        style={{
                          fontSize: '0.9rem',
                          padding: '6px 12px',
                          borderRadius: '6px'
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>

        {/* Contrôle du thème en bas */}
        <div className="mt-auto pt-3 border-top">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <small className="text-muted">Apparence</small>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleTheme}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className="btn w-100 d-flex align-items-center justify-content-center gap-2"
            style={{
              borderRadius: '20px',
              padding: '8px 16px',
              border: `1px solid ${isDarkMode ? '#495057' : '#dee2e6'}`,
              background: isDarkMode ? '#495057' : 'transparent',
              color: isDarkMode ? 'white' : 'inherit',
              transition: 'all 0.3s ease'
            }}
          >
            {isDarkMode ? (
              <>
                <span style={{ fontSize: '1.2rem' }}>☀️</span>
                <span>Mode clair</span>
              </>
            ) : (
              <>
                <span style={{ fontSize: '1.2rem' }}>🌙</span>
                <span>Mode sombre</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar