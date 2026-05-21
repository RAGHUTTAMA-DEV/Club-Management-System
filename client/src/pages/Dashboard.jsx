import { useState, useEffect } from 'react'
import { studentAPI, clubAPI, eventAPI, membershipAPI, eventRegistrationAPI, announcementAPI } from '../services/api'

const EVENT_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=250&fit=crop',
]

// Stat card defined OUTSIDE
const StatCard = ({ label, value, icon, gradient, delay }) => (
  <div
    style={{
      animation: 'fadeInUp 0.6s ease-out',
      animationDelay: delay,
      animationFillMode: 'both',
      background: gradient,
      borderRadius: '1.25rem',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)'
      e.currentTarget.style.boxShadow = 'none'
    }}
  >
    {/* Background pattern */}
    <div style={{
      position: 'absolute', top: '-30%', right: '-10%',
      width: '120px', height: '120px', borderRadius: '50%',
      background: 'rgba(255,255,255,0.08)',
    }} />
    <div style={{
      position: 'absolute', bottom: '-20%', right: '20%',
      width: '60px', height: '60px', borderRadius: '50%',
      background: 'rgba(255,255,255,0.05)',
    }} />
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <p style={{
          color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.8rem', fontWeight: '600',
          textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0
        }}>
          {label}
        </p>
        <div style={{ fontSize: '1.75rem', opacity: 0.4 }}>{icon}</div>
      </div>
      <p style={{
        fontSize: '2.75rem', fontWeight: '800', color: 'white',
        margin: 0, lineHeight: 1, letterSpacing: '-0.02em'
      }}>
        {value}
      </p>
    </div>
  </div>
)

// QuickActionCard
const QuickActionCard = ({ icon, title, desc, gradient, delay }) => (
  <div style={{
    animation: 'fadeInUp 0.6s ease-out',
    animationDelay: delay,
    animationFillMode: 'both',
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(10px)',
    border: '1px solid var(--border-color)',
    borderRadius: '1rem',
    padding: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  }}>
    <div style={{
      width: '3rem', height: '3rem', borderRadius: '0.875rem',
      background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '1.25rem', flexShrink: 0
    }}>
      {icon}
    </div>
    <div>
      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{title}</h4>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.15rem 0 0 0' }}>{desc}</p>
    </div>
  </div>
)

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0, clubs: 0, events: 0,
    memberships: 0, registrations: 0, announcements: 0
  })
  const [recentEvents, setRecentEvents] = useState([])
  const [recentAnnouncements, setRecentAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [students, clubs, events, memberships, registrations, announcements] = await Promise.all([
          studentAPI.getAll(), clubAPI.getAll(), eventAPI.getAll(),
          membershipAPI.getAll(), eventRegistrationAPI.getAll(), announcementAPI.getAll()
        ])
        setStats({
          students: students.data.length, clubs: clubs.data.length,
          events: events.data.length, memberships: memberships.data.length,
          registrations: registrations.data.length, announcements: announcements.data.length
        })
        setRecentEvents(events.data.slice(0, 3))
        setRecentAnnouncements(announcements.data.slice(0, 3))
      } catch (error) { console.error('Error fetching stats:', error) }
      finally { setLoading(false) }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'floatingPulse 2s ease-in-out infinite' }}>🎓</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', padding: '0', overflow: 'hidden' }}>

      {/* Hero Banner */}
      <div style={{
        position: 'relative', padding: '3rem 1.5rem 2.5rem',
        background: 'linear-gradient(135deg, rgba(102,126,234,0.15) 0%, rgba(168,85,247,0.1) 50%, rgba(236,72,153,0.08) 100%)',
        borderBottom: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}>
        {/* Animated background orbs */}
        <div style={{ position: 'absolute', top: '-50px', right: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)', animation: 'floatingPulse 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '5%', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)', animation: 'floatingPulse 4s ease-in-out infinite 1s' }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', animation: 'fadeInDown 0.6s ease-out' }}>
            <div style={{
              width: '3.5rem', height: '3.5rem', borderRadius: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', boxShadow: '0 8px 20px rgba(102,126,234,0.3)'
            }}>
              🎓
            </div>
            <div>
              <h1 style={{
                fontSize: '2.25rem', fontWeight: '800', margin: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text', backgroundSize: '200% auto',
              }}>
                Club Connect
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
                Your complete club management overview
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem', marginBottom: '2.5rem'
        }}>
          <StatCard label="Students" value={stats.students} icon="👨‍🎓"
            gradient="linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)" delay="0.05s" />
          <StatCard label="Clubs" value={stats.clubs} icon="🎭"
            gradient="linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)" delay="0.1s" />
          <StatCard label="Events" value={stats.events} icon="📅"
            gradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)" delay="0.15s" />
          <StatCard label="Members" value={stats.memberships} icon="👥"
            gradient="linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)" delay="0.2s" />
          <StatCard label="Registrations" value={stats.registrations} icon="✅"
            gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)" delay="0.25s" />
          <StatCard label="Announcements" value={stats.announcements} icon="📢"
            gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" delay="0.3s" />
        </div>

        {/* Recent Activity */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>

          {/* Recent Events */}
          <div style={{
            background: 'var(--glass-bg)', backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-color)', borderRadius: '1.25rem',
            padding: '1.5rem', animation: 'fadeInUp 0.7s ease-out 0.1s both'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>📅</div>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Recent Events</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>Latest activities</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentEvents.length > 0 ? recentEvents.map((event, idx) => (
                <div key={event._id} style={{
                  display: 'flex', gap: '0.75rem', padding: '0.75rem',
                  background: 'var(--bg-hover)', borderRadius: '0.875rem',
                  transition: 'all 0.3s ease', cursor: 'pointer',
                  animation: 'fadeInUp 0.5s ease-out', animationDelay: `${idx * 0.1}s`, animationFillMode: 'both'
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <img src={event.image_url || EVENT_IMAGES[idx % EVENT_IMAGES.length]} alt=""
                    style={{ width: '60px', height: '60px', borderRadius: '0.625rem', objectFit: 'cover', flexShrink: 0 }}
                    onError={(e) => { e.target.src = EVENT_IMAGES[0] }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.9rem', margin: '0 0 0.2rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {event.event_name}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>
                      {event.venue || event.description || 'Upcoming event'}
                    </p>
                    {event.date && (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', margin: '0.15rem 0 0 0' }}>
                        📅 {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    )}
                  </div>
                </div>
              )) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem', fontSize: '0.9rem' }}>No recent events</p>
              )}
            </div>
          </div>

          {/* Recent Announcements */}
          <div style={{
            background: 'var(--glass-bg)', backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-color)', borderRadius: '1.25rem',
            padding: '1.5rem', animation: 'fadeInUp 0.7s ease-out 0.2s both'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>📢</div>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>Announcements</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>Latest updates</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentAnnouncements.length > 0 ? recentAnnouncements.map((a, idx) => (
                <div key={a._id} style={{
                  padding: '0.75rem 1rem', background: 'var(--bg-hover)', borderRadius: '0.875rem',
                  borderLeft: '3px solid',
                  borderImage: idx === 0 ? 'linear-gradient(to bottom, #f59e0b, #d97706) 1' :
                    idx === 1 ? 'linear-gradient(to bottom, #a855f7, #7e22ce) 1' :
                    'linear-gradient(to bottom, #3b82f6, #1d4ed8) 1',
                  transition: 'all 0.3s ease', cursor: 'pointer',
                  animation: 'fadeInUp 0.5s ease-out', animationDelay: `${idx * 0.1}s`, animationFillMode: 'both'
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(4px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <h4 style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.9rem', margin: '0 0 0.25rem 0' }}>
                    {a.title}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {a.content || 'New announcement'}
                  </p>
                </div>
              )) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem', fontSize: '0.9rem' }}>No announcements yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0 0 1rem 0' }}>Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <QuickActionCard icon="📅" title="Create Event" desc="Schedule a new club event" gradient="linear-gradient(135deg, #ec4899 0%, #be185d 100%)" delay="0.1s" />
          <QuickActionCard icon="🎭" title="Register Club" desc="Add a new student club" gradient="linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)" delay="0.15s" />
          <QuickActionCard icon="👥" title="Add Members" desc="Invite students to clubs" gradient="linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)" delay="0.2s" />
          <QuickActionCard icon="📢" title="Post Update" desc="Share an announcement" gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" delay="0.25s" />
        </div>
      </div>
    </div>
  )
}
