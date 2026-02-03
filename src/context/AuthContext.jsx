import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [language, setLanguage] = useState('fr')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
    setLoading(false)
  }, [])

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    users.push(userData)
    localStorage.setItem('users', JSON.stringify(users))

    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('users')) || []

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    )

    if (!foundUser) {
      return { error: 'Utilisateur introuvable ou mot de passe incorrect' }
    }

    setUser(foundUser)
    localStorage.setItem('user', JSON.stringify(foundUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{
      user,
      register,
      login,
      logout,
      language,
      setLanguage,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
