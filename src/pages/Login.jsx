import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const result = login(formData)

    if (result.error) {
      alert(result.error)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow border-0 p-4" style={{ maxWidth: 450, width: '100%' }}>
        
        <h3 className="text-success text-center mb-4">
          Se connecter
        </h3>

        <form onSubmit={handleSubmit}>
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

          <div className="mb-4">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="Votre mot de passe"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 mb-3">
            Se connecter
          </button>

          <div className="text-center">
            <Link to="/register" className="text-success text-decoration-none">
              Pas encore de compte ? Créer un compte
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
