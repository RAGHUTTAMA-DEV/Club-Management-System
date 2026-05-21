import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar({ currentPage, setCurrentPage }) {
  const { user, logout, memberships } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'students', label: 'Students', icon: '👨‍🎓' },
    { id: 'clubs', label: 'Clubs', icon: '🎭' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'memberships', label: 'Memberships', icon: '👥' },
    { id: 'announcements', label: 'Announcements', icon: '📢' }
  ]

  const handleNavClick = (id) => {
    setCurrentPage(id)
    setMobileMenuOpen(false)
  }

  return (
    <nav style={{
      background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(26, 40, 71, 0.95) 50%, rgba(15, 23, 42, 0.95) 100%)',
      borderBottom: '1px solid var(--border-light)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%'
    }}>
      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0 1.5rem',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem',
          width: '100%'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            animation: 'fadeInDown 0.6s ease-out'
          }}>
            <div style={{
              fontSize: '1.875rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em'
            }}>
              🎓
            </div>
            <div style={{
              fontWeight: '700',
              color: 'var(--text-primary)',
              fontSize: '1.125rem',
              background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em'
            }}>
              Club Connect
            </div>
          </div>

          {/* Nav Items - Desktop */}
          <div className="navbar-desktop-items">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.75rem',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: currentPage === item.id
                    ? 'rgba(59, 130, 246, 0.15)'
                    : 'transparent',
                  color: currentPage === item.id
                    ? '#38bdf8'
                    : 'var(--text-secondary)',
                  borderColor: currentPage === item.id
                    ? 'rgba(59, 130, 246, 0.3)'
                    : 'transparent',
                  borderWidth: currentPage === item.id ? '1px' : '0px',
                  animation: 'fadeInDown 0.6s ease-out',
                  animationDelay: `${idx * 0.05}s`,
                  animationFillMode: 'both'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== item.id) {
                    e.target.style.background = 'rgba(203, 213, 225, 0.05)';
                    e.target.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== item.id) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* User Info & Logout */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div className="navbar-user-info">
              <p style={{
                fontWeight: '600',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                marginBottom: '0.125rem'
              }}>
                {user?.name}
              </p>
              <p style={{
                color: '#38bdf8',
                fontSize: '0.75rem',
                marginBottom: '0.125rem'
              }}>
                {user?.student_id}
              </p>
              {memberships.length > 0 && (
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem'
                }}>
                  {memberships.length} {memberships.length === 1 ? 'club' : 'clubs'}
                </p>
              )}
            </div>

            <div className="navbar-divider" />

            <button
              onClick={logout}
              style={{
                padding: '0.5rem 1rem',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                borderRadius: '0.75rem',
                transition: 'all 0.3s ease',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 0.25)';
                e.target.style.color = '#fecaca';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 0.15)';
                e.target.style.color = '#fca5a5';
              }}
            >
              Logout
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="navbar-mobile-menu-btn"
              style={{
                background: 'var(--bg-hover)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)',
                borderRadius: '0.75rem',
                padding: '0.5rem 0.75rem',
                cursor: 'pointer',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{mobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            paddingBottom: '1rem',
            animation: 'fadeInDown 0.3s ease-out',
            borderTop: '1px solid var(--border-light)',
            marginTop: '0.5rem',
            paddingTop: '0.5rem'
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: currentPage === item.id
                    ? 'rgba(59, 130, 246, 0.15)'
                    : 'rgba(203, 213, 225, 0.05)',
                  color: currentPage === item.id
                    ? '#38bdf8'
                    : 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
