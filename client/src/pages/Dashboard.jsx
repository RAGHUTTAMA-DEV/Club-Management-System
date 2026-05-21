import { useState, useEffect } from 'react'
import { studentAPI, clubAPI, eventAPI, membershipAPI, eventRegistrationAPI, announcementAPI } from '../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    clubs: 0,
    events: 0,
    memberships: 0,
    registrations: 0,
    announcements: 0
  })
  const [recentEvents, setRecentEvents] = useState([])
  const [recentAnnouncements, setRecentAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [students, clubs, events, memberships, registrations, announcements] = await Promise.all([
          studentAPI.getAll(),
          clubAPI.getAll(),
          eventAPI.getAll(),
          membershipAPI.getAll(),
          eventRegistrationAPI.getAll(),
          announcementAPI.getAll()
        ])

        setStats({
          students: students.data.length,
          clubs: clubs.data.length,
          events: events.data.length,
          memberships: memberships.data.length,
          registrations: registrations.data.length,
          announcements: announcements.data.length
        })

        setRecentEvents(events.data.slice(0, 3))
        setRecentAnnouncements(announcements.data.slice(0, 3))
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const StatCard = ({ label, value, icon, gradient, delay }) => (
    <div 
      className="card animate-fade-in-up"
      style={{
        animation: 'fadeInUp 0.6s ease-out',
        animationDelay: delay,
        animationFillMode: 'both',
        background: gradient,
        backgroundSize: '200% 200%',
        backgroundPosition: '0% 0%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.7)', 
          fontSize: '0.875rem', 
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {label}
        </p>
        <p style={{ 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          color: 'white', 
          marginTop: '0.5rem' 
        }}>
          {value}
        </p>
      </div>
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        fontSize: '2.5rem',
        opacity: 0.2,
        zIndex: 1
      }}>
        {icon}
      </div>
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
      `}</style>
    </div>
  )

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        paddingTop: '4rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem', 
            animation: 'floatingPulse 3s ease-in-out infinite' 
          }}>
            ⏳
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh',
      padding: '3rem 1.5rem',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Hero Section */}
        <div style={{ marginBottom: '3rem', animation: 'fadeInDown 0.6s ease-out' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome Back! 🎓
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '1.125rem',
            fontWeight: '500'
          }}>
            Here's your complete club management overview
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <StatCard 
            label="Total Students" 
            value={stats.students} 
            icon="👨‍🎓" 
            gradient="linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)"
            delay="0.1s"
          />
          <StatCard 
            label="Active Clubs" 
            value={stats.clubs} 
            icon="🎭" 
            gradient="linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)"
            delay="0.2s"
          />
          <StatCard 
            label="Upcoming Events" 
            value={stats.events} 
            icon="📅" 
            gradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)"
            delay="0.3s"
          />
          <StatCard 
            label="Memberships" 
            value={stats.memberships} 
            icon="👥" 
            gradient="linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
            delay="0.4s"
          />
          <StatCard 
            label="Registrations" 
            value={stats.registrations} 
            icon="✅" 
            gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
            delay="0.5s"
          />
          <StatCard 
            label="Announcements" 
            value={stats.announcements} 
            icon="📢" 
            gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
            delay="0.6s"
          />
        </div>

        {/* Recent Activity */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '2rem'
        }}>
          {/* Recent Events */}
          <div className="card animate-fade-in-up" style={{ animation: 'fadeInUp 0.8s ease-out 0.1s both' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              marginBottom: '1.5rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid var(--border-light)'
            }}>
              <span style={{ fontSize: '2rem' }}>📅</span>
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem'
                }}>
                  Recent Events
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Latest upcoming activities</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentEvents.length > 0 ? (
                recentEvents.map((event, idx) => (
                  <div 
                    key={event._id}
                    style={{
                      padding: '1rem',
                      background: 'var(--bg-hover)',
                      borderRadius: '0.875rem',
                      borderLeft: '4px solid #38bdf8',
                      animation: 'fadeInUp 0.5s ease-out',
                      animationDelay: `${idx * 0.1}s`,
                      animationFillMode: 'both',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <h4 style={{ 
                      color: 'var(--text-primary)', 
                      fontWeight: '600',
                      marginBottom: '0.25rem'
                    }}>
                      {event.event_name || event.name}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      {event.venue || event.description || 'Upcoming event'}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                  No recent events
                </p>
              )}
            </div>
          </div>

          {/* Recent Announcements */}
          <div className="card animate-fade-in-up" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              marginBottom: '1.5rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid var(--border-light)'
            }}>
              <span style={{ fontSize: '2rem' }}>📢</span>
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem'
                }}>
                  Announcements
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Latest updates and news</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentAnnouncements.length > 0 ? (
                recentAnnouncements.map((announcement, idx) => (
                  <div 
                    key={announcement._id}
                    style={{
                      padding: '1rem',
                      background: 'var(--bg-hover)',
                      borderRadius: '0.875rem',
                      borderLeft: '4px solid #a855f7',
                      animation: 'fadeInUp 0.5s ease-out',
                      animationDelay: `${idx * 0.1}s`,
                      animationFillMode: 'both',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <h4 style={{ 
                      color: 'var(--text-primary)', 
                      fontWeight: '600',
                      marginBottom: '0.25rem'
                    }}>
                      {announcement.title}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      {announcement.content || announcement.description || 'New announcement'}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                  No recent announcements
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
