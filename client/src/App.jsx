import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import StudentPage from './pages/StudentPage'
import ClubPage from './pages/ClubPage'
import EventPage from './pages/EventPage'
import MembershipPage from './pages/MembershipPage'
import AnnouncementPage from './pages/AnnouncementPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { isAuthenticated, loading } = useAuth()

  const renderPage = () => {
    switch (currentPage) {
      case 'students':
        return <StudentPage />
      case 'clubs':
        return <ClubPage />
      case 'events':
        return <EventPage />
      case 'memberships':
        return <MembershipPage />
      case 'announcements':
        return <AnnouncementPage />
      case 'about':
        return <AboutPage />
      default:
        return <Dashboard />
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'spin 1s linear infinite' }}>⏳</div>
          <p style={{ color: 'var(--text-muted)' }}>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setCurrentPage('dashboard')} />
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%', 
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main style={{ 
        width: '100%', 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: '100%', 
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden'
        }}>
          {renderPage()}
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
