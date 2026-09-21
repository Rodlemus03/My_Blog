import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext(null)
// const API_URL = 'https://cetaceans-blog-api.vercel.app'
const API_URL = 'http://127.0.0.1:3000' // Cambia esto a la URL de tu API

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ user: null, loading: true })

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await fetch(`${API_URL}/me`, { credentials: 'include' })
        if (!response.ok) {
          setAuthData({ user: null, loading: false })
          return
        }
        const data = await response.json()
        setAuthData({ user: data.user, loading: false })
      } catch {
        setAuthData({ user: null, loading: false })
      }
    }
    loadSession()
  }, [])

  const login = (user) => {
    setAuthData({ user, loading: false })
  }

  const logout = async () => {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    setAuthData({ user: null, loading: false })
  }

  const authContextValue = {
    authToken: authData.user ? 'cookie' : null,
    user: authData.user,
    loading: authData.loading,
    login,
    logout
  }

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useAuth = () => useContext(AuthContext)
