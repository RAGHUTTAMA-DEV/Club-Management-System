import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      verifyToken()
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (student_id) => {
    try {
      const response = await axios.post('/api/auth/login', { student_id })
      const { token, student, memberships } = response.data
      
      localStorage.setItem('token', token)
      setToken(token)
      setUser(student)
      setMemberships(memberships)
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      return { success: true, user, memberships }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setMemberships([])
    delete axios.defaults.headers.common['Authorization']
  }

  const verifyToken = async () => {
    try {
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      // Token is valid
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } catch (error) {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const isClubLeader = (clubId) => {
    return memberships.some(m => 
      m.club_id === clubId && ['President', 'Vice-President'].includes(m.role)
    )
  }

  const isClubMember = (clubId) => {
    return memberships.some(m => m.club_id === clubId)
  }

  const value = {
    user,
    token,
    memberships,
    loading,
    login,
    logout,
    isClubLeader,
    isClubMember,
    isAuthenticated: !!token
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
