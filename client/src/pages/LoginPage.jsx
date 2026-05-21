import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage({ onLoginSuccess }) {
  const { login } = useAuth()
  const [student_id, setStudent_id] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedCredential, setSelectedCredential] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(student_id)
    setLoading(false)

    if (result.success) {
      onLoginSuccess()
    } else {
      setError(result.error)
    }
  }

  const handleQuickLogin = async (id) => {
    setLoading(true)
    setError('')
    const result = await login(id)
    setLoading(false)

    if (result.success) {
      onLoginSuccess()
    } else {
      setError(result.error)
    }
  }

  const testCredentials = ['STU001', 'STU002', 'STU003', 'STU004', 'STU005']

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0f172a 0%, #1a2847 50%, #0f172a 100%)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Animated background blobs */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'blobBreathe 7s infinite',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'blobBreathe 7s infinite 2s',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'blobBreathe 7s infinite 4s',
        zIndex: 0
      }} />

      {/* Keyframes for blob animation */}
      <style>{`
        @keyframes blobBreathe {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-10px, 20px) scale(0.95); }
          75% { transform: translate(-30px, -10px) scale(1.05); }
        }
      `}</style>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '450px' }}>
        {/* Login Card */}
        <div 
          className="card animate-fade-in-up"
          style={{
            animation: 'fadeInUp 0.8s ease-out',
            boxShadow: '0 0 60px rgba(59, 130, 246, 0.3)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            marginBottom: 0
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '1.5rem',
              background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)',
              marginBottom: '1.5rem',
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
              animation: 'scalePulse 3s ease-in-out infinite'
            }}>
              <span style={{ fontSize: '2.5rem' }}>🎓</span>
            </div>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Club Connect
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500' }}>
              Manage your college clubs
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ animation: 'fadeInUp 0.8s ease-out 0.1s both' }}>
            {/* Student ID Input */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                color: 'var(--text-primary)',
                fontWeight: '600',
                marginBottom: '0.75rem',
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Student ID
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={student_id}
                  onChange={(e) => setStudent_id(e.target.value.toUpperCase())}
                  placeholder="STU001"
                  required
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    background: 'var(--bg-secondary)',
                    border: '2px solid var(--border-color)',
                    borderRadius: '0.875rem',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    outline: 'none',
                    fontWeight: '500'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary-500)';
                    e.target.style.background = 'var(--bg-tertiary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.background = 'var(--bg-secondary)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
                />
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                Example: STU001, STU002, STU003
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div 
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '2px solid rgba(239, 68, 68, 0.3)',
                  color: '#fca5a5',
                  padding: '1rem',
                  borderRadius: '0.875rem',
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  animation: 'fadeInUp 0.3s ease-out'
                }}
              >
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                background: loading ? 'rgba(59, 130, 246, 0.5)' : 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
                border: 'none',
                borderRadius: '0.875rem',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: loading ? 'none' : '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
                marginBottom: '1.5rem'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 20px 40px -5px rgba(59, 130, 246, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.3)';
                }
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            margin: '2rem 0',
            opacity: 0.5
          }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Quick Login</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
          </div>

          {/* Quick Login Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '0.75rem'
          }}>
            {testCredentials.map((credential, idx) => (
              <button
                key={credential}
                onClick={() => handleQuickLogin(credential)}
                disabled={loading}
                style={{
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-tertiary)',
                  border: '2px solid var(--border-color)',
                  borderRadius: '0.75rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: loading ? 0.5 : 1,
                  animation: 'fadeInUp 0.5s ease-out',
                  animationDelay: `${0.15 + idx * 0.05}s`,
                  animationFillMode: 'both'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.borderColor = 'var(--primary-500)';
                    e.target.style.background = 'var(--primary-500)';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.background = 'var(--bg-tertiary)';
                    e.target.style.color = 'var(--text-primary)';
                    e.target.style.transform = 'scale(1)';
                  }
                }}
              >
                {credential}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
          marginTop: '2rem',
          animation: 'fadeInUp 0.8s ease-out 0.2s both'
        }}>
          Use any test credential above to login
        </p>
      </div>
    </div>
  )
}
