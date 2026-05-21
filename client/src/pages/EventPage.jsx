import { useState, useEffect } from 'react'
import { eventAPI, clubAPI } from '../services/api'

// FormField defined OUTSIDE to prevent re-creation on each render
const FormField = ({ label, name, type = 'text', placeholder, value, onChange, disabled, options, required }) => {
  const isSelect = options && options.length > 0
  return (
    <div>
      <label style={{ display: 'block', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '0.75rem' }}>
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
            width: '100%',
            padding: '0.875rem 1.25rem',
            background: 'var(--bg-secondary)',
            border: '2px solid var(--border-color)',
            borderRadius: '0.875rem',
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            transition: 'all 0.3s ease'
          }}
        >
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map(opt => (
            <option key={opt._id} value={opt._id}>{opt.club_name || opt.event_name || opt.name}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '0.875rem 1.25rem',
            background: 'var(--bg-secondary)',
            border: '2px solid var(--border-color)',
            borderRadius: '0.875rem',
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            opacity: disabled ? 0.6 : 1,
            transition: 'all 0.3s ease'
          }}
        />
      )}
    </div>
  )
}

// EventCard defined OUTSIDE to prevent re-creation on each render
const EventCard = ({ event, onEdit, onDelete, idx }) => {
  const statusColors = {
    'Upcoming': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'Ongoing': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'Completed': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'Cancelled': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  }

  return (
    <div
      style={{
        animation: 'fadeInUp 0.5s ease-out',
        animationDelay: `${idx * 0.05}s`,
        background: 'var(--bg-tertiary)',
        padding: '1.5rem',
        borderRadius: '1rem',
        border: '1px solid var(--border-color)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ marginBottom: '0.75rem' }}>
        <div
          style={{
            display: 'inline-block',
            background: statusColors[event.status],
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            marginBottom: '0.75rem'
          }}
        >
          {event.status}
        </div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
          {event.event_name}
        </h3>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', flex: 1 }}>
        📍 {event.venue || 'No venue'}
      </p>
      {event.date && (
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
          📅 {new Date(event.date).toLocaleDateString()}
        </p>
      )}
      {event.time && (
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          ⏰ {event.time}
        </p>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit(event)
          }}
          style={{
            flex: 1,
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--border-color)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-secondary)'
          }}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(event._id)
          }}
          style={{
            flex: 1,
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ef4444'
            e.currentTarget.style.color = 'white'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'
            e.currentTarget.style.color = '#ef4444'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default function EventPage() {
  const [events, setEvents] = useState([])
  const [clubs, setClubs] = useState([])
  const [formData, setFormData] = useState({
    event_name: '',
    venue: '',
    club_id: '',
    status: 'Upcoming',
    date: '',
    time: '',
    description: ''
  })
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [eventsRes, clubsRes] = await Promise.all([
        eventAPI.getAll(),
        clubAPI.getAll()
      ])
      setEvents(eventsRes.data)
      setClubs(clubsRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    try {
      if (editing) {
        await eventAPI.update(editing, formData)
      } else {
        await eventAPI.create(formData)
      }
      setFormData({
        event_name: '', venue: '', club_id: '',
        status: 'Upcoming', date: '', time: '', description: ''
      })
      setEditing(null)
      setShowForm(false)
      fetchData()
    } catch (error) {
      setFormError(error.response?.data?.message || 'Failed to save event')
    }
  }

  const handleEdit = (event) => {
    setFormData(event)
    setEditing(event._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this event?')) {
      try {
        await eventAPI.delete(id)
        fetchData()
      } catch (error) {
        alert('Failed to delete event')
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const filteredEvents = events.filter(e =>
    e.event_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem 0' }}>Loading events...</div>

  return (
    <div style={{ width: '100%', padding: '3rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
          📅 Events
        </h1>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setFormError('')
            if (editing) {
              setEditing(null)
              setFormData({
                event_name: '', venue: '', club_id: '',
                status: 'Upcoming', date: '', time: '', description: ''
              })
            }
          }}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '0.875rem 1.75rem',
            borderRadius: '0.875rem',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '1rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(102, 126, 234, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {showForm ? '✕ Close' : '+ Add Event'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: 'var(--bg-tertiary)', padding: '2rem', borderRadius: '1rem', marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            {editing ? 'Edit Event' : 'Add New Event'}
          </h2>
          {formError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
              {formError}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <FormField label="Event Name" name="event_name" placeholder="Event name" value={formData.event_name} onChange={handleInputChange} required />
            <FormField label="Venue" name="venue" placeholder="Venue location" value={formData.venue} onChange={handleInputChange} />
            <FormField label="Club" name="club_id" placeholder="Select Club" value={formData.club_id} onChange={handleInputChange} options={clubs} required />
            <FormField label="Date" name="date" type="date" value={formData.date} onChange={handleInputChange} />
            <FormField label="Time" name="time" type="time" value={formData.time} onChange={handleInputChange} />
            <FormField label="Status" name="status" placeholder="Select Status" value={formData.status} onChange={handleInputChange} options={[
              { _id: 'Upcoming', club_name: 'Upcoming' },
              { _id: 'Ongoing', club_name: 'Ongoing' },
              { _id: 'Completed', club_name: 'Completed' },
              { _id: 'Cancelled', club_name: 'Cancelled' }
            ]} />
            <div style={{ gridColumn: 'span 100%' }}>
              <FormField label="Description" name="description" placeholder="Event description" value={formData.description} onChange={handleInputChange} />
            </div>
            <button
              type="submit"
              style={{
                gridColumn: 'span 100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '0.875rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(102, 126, 234, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {editing ? 'Update Event' : 'Add Event'}
            </button>
          </form>
        </div>
      )}

      {/* Search */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search events by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 1.25rem',
            background: 'var(--bg-secondary)',
            border: '2px solid var(--border-color)',
            borderRadius: '0.875rem',
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            fontSize: '1rem',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--text-primary)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)'
          }}
        />
      </div>

      {/* Events Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, idx) => (
            <EventCard key={event._id} event={event} onEdit={handleEdit} onDelete={handleDelete} idx={idx} />
          ))
        ) : (
          <div style={{ gridColumn: 'span 100%', textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            No events found
          </div>
        )}
      </div>
    </div>
  )
}
