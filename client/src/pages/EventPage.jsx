import { useState, useEffect } from 'react'
import { eventAPI, clubAPI } from '../services/api'

// Curated event images from Unsplash
const EVENT_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop',
]

const getEventImage = (event, idx) => {
  if (event.image_url) return event.image_url
  return EVENT_IMAGES[idx % EVENT_IMAGES.length]
}

// FormField defined OUTSIDE to prevent re-creation on each render
const FormField = ({ label, name, type = 'text', placeholder, value, onChange, disabled, options, required }) => {
  const isSelect = options && options.length > 0
  return (
    <div>
      <label style={{ display: 'block', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </label>
      {isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          style={{
            width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-secondary)',
            border: '2px solid var(--border-color)', borderRadius: '0.75rem',
            color: 'var(--text-primary)', fontFamily: 'inherit',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1, transition: 'all 0.3s ease', outline: 'none'
          }}
        >
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map(opt => (
            <option key={opt._id} value={opt._id}>{opt.club_name || opt.event_name || opt.name}</option>
          ))}
        </select>
      ) : (
        <input
          type={type} name={name} placeholder={placeholder} value={value}
          onChange={onChange} required={required} disabled={disabled}
          style={{
            width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-secondary)',
            border: '2px solid var(--border-color)', borderRadius: '0.75rem',
            color: 'var(--text-primary)', fontFamily: 'inherit',
            opacity: disabled ? 0.6 : 1, transition: 'all 0.3s ease', outline: 'none'
          }}
        />
      )}
    </div>
  )
}

// EventCard defined OUTSIDE to prevent re-creation on each render
const EventCard = ({ event, onEdit, onDelete, idx }) => {
  const statusConfig = {
    'Upcoming': { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: '🚀' },
    'Ongoing': { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', icon: '🔴' },
    'Completed': { bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', icon: '✅' },
    'Cancelled': { bg: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)', icon: '❌' }
  }
  const config = statusConfig[event.status] || statusConfig['Upcoming']
  const imgUrl = getEventImage(event, idx)

  return (
    <div
      style={{
        animation: 'fadeInUp 0.5s ease-out',
        animationDelay: `${idx * 0.06}s`,
        animationFillMode: 'both',
        background: 'var(--glass-bg)',
        borderRadius: '1.25rem',
        border: '1px solid var(--border-color)',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'
        e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'var(--border-color)'
      }}
    >
      {/* Event Image */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img
          src={imgUrl}
          alt={event.event_name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onError={(e) => { e.target.src = EVENT_IMAGES[0] }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.1) 60%, transparent 100%)'
        }} />
        <div style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          background: config.bg, color: 'white',
          padding: '0.35rem 0.85rem', borderRadius: '9999px',
          fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.05em',
          display: 'flex', alignItems: 'center', gap: '0.35rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          {config.icon} {event.status}
        </div>
        {event.club_id?.club_name && (
          <div style={{
            position: 'absolute', bottom: '0.75rem', left: '0.75rem',
            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
            color: 'white', padding: '0.3rem 0.75rem', borderRadius: '0.5rem',
            fontSize: '0.7rem', fontWeight: '600', border: '1px solid rgba(255,255,255,0.15)'
          }}>
            {event.club_id?.club_name}
          </div>
        )}
      </div>

      {/* Event Details */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0 0 0.5rem 0', lineHeight: 1.3 }}>
          {event.event_name}
        </h3>

        {event.description && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {event.description}
          </p>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem', flex: 1 }}>
          {event.venue && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.8rem', background: 'var(--bg-secondary)', padding: '0.3rem 0.65rem', borderRadius: '0.5rem' }}>
              📍 {event.venue}
            </div>
          )}
          {event.date && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.8rem', background: 'var(--bg-secondary)', padding: '0.3rem 0.65rem', borderRadius: '0.5rem' }}>
              📅 {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          )}
          {event.time && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.8rem', background: 'var(--bg-secondary)', padding: '0.3rem 0.65rem', borderRadius: '0.5rem' }}>
              ⏰ {event.time}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(event) }}
            style={{
              flex: 1, background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)',
              color: '#60a5fa', padding: '0.6rem', borderRadius: '0.625rem', cursor: 'pointer',
              fontWeight: '600', fontSize: '0.8rem', transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'; e.currentTarget.style.color = '#60a5fa' }}
          >
            ✏️ Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(event._id) }}
            style={{
              flex: 1, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#f87171', padding: '0.6rem', borderRadius: '0.625rem', cursor: 'pointer',
              fontWeight: '600', fontSize: '0.8rem', transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#f87171' }}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function EventPage() {
  const [events, setEvents] = useState([])
  const [clubs, setClubs] = useState([])
  const [formData, setFormData] = useState({
    event_name: '', venue: '', club_id: '', status: 'Upcoming',
    date: '', time: '', description: '', image_url: ''
  })
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [eventsRes, clubsRes] = await Promise.all([eventAPI.getAll(), clubAPI.getAll()])
      setEvents(eventsRes.data)
      setClubs(clubsRes.data)
    } catch (error) { console.error('Error fetching data:', error) }
    finally { setLoading(false) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    try {
      if (editing) { await eventAPI.update(editing, formData) }
      else { await eventAPI.create(formData) }
      setFormData({ event_name: '', venue: '', club_id: '', status: 'Upcoming', date: '', time: '', description: '', image_url: '' })
      setEditing(null); setShowForm(false); fetchData()
    } catch (error) { setFormError(error.response?.data?.message || 'Failed to save event') }
  }

  const handleEdit = (event) => { setFormData(event); setEditing(event._id); setShowForm(true) }

  const handleDelete = async (id) => {
    if (confirm('Delete this event?')) {
      try { await eventAPI.delete(id); fetchData() }
      catch (error) { alert('Failed to delete event') }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const filteredEvents = events.filter(e =>
    e.event_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'floatingPulse 2s ease-in-out infinite' }}>📅</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading events...</p>
      </div>
    </div>
  )

  return (
    <div style={{ width: '100%', padding: '2rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', animation: 'fadeInDown 0.6s ease-out' }}>
        <div>
          <h1 style={{
            fontSize: '2.25rem', fontWeight: '800', margin: '0 0 0.25rem 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>
            Events
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {events.length} events · {events.filter(e => e.status === 'Upcoming').length} upcoming
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm); setFormError('')
            if (editing) {
              setEditing(null)
              setFormData({ event_name: '', venue: '', club_id: '', status: 'Upcoming', date: '', time: '', description: '', image_url: '' })
            }
          }}
          style={{
            background: showForm ? 'rgba(239, 68, 68, 0.15)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: showForm ? '#fca5a5' : 'white',
            padding: '0.75rem 1.5rem', borderRadius: '0.875rem', border: 'none',
            cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem', transition: 'all 0.3s ease',
            boxShadow: showForm ? 'none' : '0 8px 20px rgba(102, 126, 234, 0.3)',
            letterSpacing: '0.02em'
          }}
        >
          {showForm ? '✕ Close' : '+ New Event'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{
          background: 'var(--glass-bg)', backdropFilter: 'blur(10px)',
          padding: '2rem', borderRadius: '1.25rem', marginBottom: '2rem',
          border: '1px solid var(--border-color)', animation: 'fadeInUp 0.4s ease-out'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            {editing ? '✏️ Edit Event' : '🎉 Create New Event'}
          </h2>
          {formError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.75rem 1rem', borderRadius: '0.75rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
              ⚠️ {formError}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <FormField label="Event Name" name="event_name" placeholder="Annual Tech Fest 2026" value={formData.event_name} onChange={handleInputChange} required />
            <FormField label="Venue" name="venue" placeholder="Main Auditorium" value={formData.venue} onChange={handleInputChange} />
            <FormField label="Club" name="club_id" placeholder="Select Club" value={formData.club_id} onChange={handleInputChange} options={clubs} required />
            <FormField label="Date" name="date" type="date" value={formData.date ? formData.date.substring(0,10) : ''} onChange={handleInputChange} />
            <FormField label="Time" name="time" type="time" value={formData.time} onChange={handleInputChange} />
            <FormField label="Status" name="status" placeholder="Select Status" value={formData.status} onChange={handleInputChange} options={[
              { _id: 'Upcoming', club_name: 'Upcoming' }, { _id: 'Ongoing', club_name: 'Ongoing' },
              { _id: 'Completed', club_name: 'Completed' }, { _id: 'Cancelled', club_name: 'Cancelled' }
            ]} />
            <div style={{ gridColumn: '1 / -1' }}>
              <FormField label="Cover Image URL" name="image_url" placeholder="https://images.unsplash.com/..." value={formData.image_url} onChange={handleInputChange} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <FormField label="Description" name="description" placeholder="A brief description of the event..." value={formData.description} onChange={handleInputChange} />
            </div>
            <button type="submit" style={{
              gridColumn: '1 / -1', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white', padding: '0.875rem 2rem', borderRadius: '0.875rem', border: 'none',
              cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem', transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)', letterSpacing: '0.02em'
            }}>
              {editing ? '💾 Update Event' : '🚀 Create Event'}
            </button>
          </form>
        </div>
      )}

      {/* Search */}
      <div style={{ marginBottom: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', opacity: 0.5 }}>🔍</div>
        <input
          type="text" placeholder="Search events..." value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem',
            background: 'var(--bg-secondary)', border: '2px solid var(--border-color)',
            borderRadius: '0.875rem', color: 'var(--text-primary)', fontFamily: 'inherit',
            fontSize: '0.95rem', transition: 'all 0.3s ease', outline: 'none'
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(102,126,234,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102,126,234,0.1)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none' }}
        />
      </div>

      {/* Events Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, idx) => (
            <EventCard key={event._id} event={event} onEdit={handleEdit} onDelete={handleDelete} idx={idx} />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>📅</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No events found</p>
          </div>
        )}
      </div>
    </div>
  )
}
