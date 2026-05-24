import { useState } from 'react'
import { exportAPI } from '../services/api'
import '../styles/about.css'

export default function AboutPage() {
  const [downloading, setDownloading] = useState(false)

  const teamMembers = [
    {
      name: 'Raghuttama K G',
      role: 'Project Lead & Full Stack Developer',
      initials: 'RKG'
    },
    {
      name: 'Raj Aryan',
      role: 'Frontend & Backend Developer',
      initials: 'RA'
    },
    {
      name: 'Sahil Kumar',
      role: 'Database & DevOps Engineer',
      initials: 'SK'
    }
  ]

  const handleDownloadDatabase = async () => {
    try {
      setDownloading(true)
      const response = await exportAPI.downloadDatabase()
      
      // Convert to JSON string with formatting
      const jsonString = JSON.stringify(response.data, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `club-management-db-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading database:', error)
      alert('Failed to download database. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
          border: '1px solid var(--border-light)',
          borderRadius: '1rem',
          padding: '3rem 2rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            Club Management System
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            A comprehensive platform for managing student clubs, events, memberships, and announcements
          </p>
        </div>

        {/* What is this project? */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>📋</span> What is this project?
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            marginBottom: '1rem'
          }}>
            The Club Management System is a modern web application designed to streamline the operations of student clubs within an educational institution. It provides a centralized platform for managing all aspects of club activities, from membership tracking to event organization.
          </p>
        </div>

        {/* How it works */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>⚙️</span> How it works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#3b82f6', marginBottom: '0.5rem' }}>👥 Student Management</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Register students and manage their profiles, roles, and participation in various clubs and events.
              </p>
            </div>
            <div style={{
              background: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#a855f7', marginBottom: '0.5rem' }}>🎭 Club Organization</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Create and manage clubs, define club details, and organize club hierarchies with administrators.
              </p>
            </div>
            <div style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#22c55e', marginBottom: '0.5rem' }}>📅 Event Management</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Plan and schedule events, track registrations, and manage event details and attendees.
              </p>
            </div>
            <div style={{
              background: 'rgba(251, 146, 60, 0.1)',
              border: '1px solid rgba(251, 146, 60, 0.3)',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#fb923c', marginBottom: '0.5rem' }}>👫 Membership Tracking</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Track club memberships, manage member roles, and maintain membership history and status.
              </p>
            </div>
            <div style={{
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#f43f5e', marginBottom: '0.5rem' }}>📢 Announcements</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Send and manage announcements to reach students and keep them informed about club activities.
              </p>
            </div>
            <div style={{
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '0.75rem',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#06b6d4', marginBottom: '0.5rem' }}>🔐 Authentication</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Secure login system with role-based access control for students, club admins, and super admins.
              </p>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>👨‍💼</span> Project Team
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
                border: '1px solid var(--border-light)',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: 'white'
                }}>
                  {member.initials}
                </div>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem'
                }}>
                  {member.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)'
                }}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Database Export */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>💾</span> Database Management
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem'
          }}>
            Export the entire database as a JSON file for backup or analysis purposes.
          </p>
          <button
            onClick={handleDownloadDatabase}
            disabled={downloading}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: downloading ? 'not-allowed' : 'pointer',
              opacity: downloading ? 0.6 : 1,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!downloading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(34, 197, 94, 0.3)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {downloading ? '⏳ Downloading...' : '📥 Download Database (JSON)'}
          </button>
        </div>

        {/* Technologies Used */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-light)',
          borderRadius: '1rem',
          padding: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>🛠️</span> Technologies Used
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {[
              { name: 'React', icon: '⚛️' },
              { name: 'Express.js', icon: '🚀' },
              { name: 'MongoDB', icon: '🗄️' },
              { name: 'Mongoose', icon: '📦' },
              { name: 'JWT Auth', icon: '🔐' },
              { name: 'CORS', icon: '🌐' }
            ].map((tech, index) => (
              <div key={index} style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '0.75rem',
                padding: '1rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{tech.icon}</div>
                <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
