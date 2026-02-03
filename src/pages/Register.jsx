import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'farmer',
    farmName: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      type: formData.userType,
      farmName: formData.farmName,
      location: 'Burkina Faso'
    }

    // 🔥 On récupère la liste des users existants
    const existingUsers = JSON.parse(localStorage.getItem('users')) || []

    // 🔥 On ajoute le nouveau user
    existingUsers.push(newUser)

    // 🔥 On sauvegarde la liste complète
    localStorage.setItem('users', JSON.stringify(existingUsers))

    // 🔥 On connecte automatiquement
    login(newUser)
    navigate('/')
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow border-0 p-4" style={{ maxWidth: 450, width: '100%' }}>
        
        <h3 className="text-success text-center mb-4">
          Créer un compte
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom complet</label>
            <input
              type="text"
              className="form-control"
              placeholder="Votre nom et prénom"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email ou Téléphone</label>
            <input
              type="text"
              className="form-control"
              placeholder="exemple@email.com ou +226..."
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="Créer un mot de passe"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Type d'utilisateur</label>
            <select
              className="form-select"
              value={formData.userType}
              onChange={e => setFormData({ ...formData, userType: e.target.value })}
            >
              <option value="farmer">👨‍🌾 Agriculteur/Producteur</option>
              <option value="buyer">🛒 Acheteur/Revendeur</option>
              <option value="service_provider">🔧 Prestataire de services</option>
              <option value="advisor">🎓 Conseiller agricole</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label">Nom de la ferme (optionnel)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex : Ferme Bio Nature"
              value={formData.farmName}
              onChange={e => setFormData({ ...formData, farmName: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-success w-100 mb-3">
            Créer le compte
          </button>

          <div className="text-center">
            <Link to="/login" className="text-success text-decoration-none">
              Déjà un compte ? Se connecter
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
