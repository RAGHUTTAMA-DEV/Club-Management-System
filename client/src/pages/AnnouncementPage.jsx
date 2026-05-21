import { useState, useEffect } from 'react'
import { announcementAPI, clubAPI } from '../services/api'

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
            <option key={opt._id} value={opt._id}>{opt.club_name}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
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
            minHeight: '120px',
            opacity: disabled ? 0.6 : 1,
            transition: 'all 0.3s ease',
            resize: 'vertical'
          }}
        />
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

// AnnouncementCard defined OUTSIDE to prevent re-creation on each render
const AnnouncementCard = ({ announcement, onEdit, onDelete, idx }) => {
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
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            marginBottom: '0.75rem'
          }}
        >
          📢 {announcement.club_id?.club_name || 'Unknown Club'}
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
          {announcement.title}
        </h3>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem', flex: 1, whiteSpace: 'pre-wrap' }}>
        {announcement.content}
      </p>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
        📅 {new Date(announcement.posted_date).toLocaleDateString()} at {new Date(announcement.posted_date).toLocaleTimeString()}
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit(announcement)
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
            onDelete(announcement._id)
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
export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([])
  const [clubs, setClubs] = useState([])
  const [formData, setFormData] = useState({
    club_id: '',
    title: '',
    content: ''
  })
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterClub, setFilterClub] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [announcementsRes, clubsRes] = await Promise.all([
        announcementAPI.getAll(),
        clubAPI.getAll()
      ])
      setAnnouncements(announcementsRes.data)
      setClubs(clubsRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    try {
      if (editing) {
        await announcementAPI.update(editing, formData)
      } else {
        await announcementAPI.create(formData)
      }
      setFormData({ club_id: '', title: '', content: '' })
      setEditing(null)
      setShowForm(false)
      fetchData()
    } catch (error) {
      setFormError(error.response?.data?.message || 'Failed to save announcement')
    }
  }

  const handleEdit = (announcement) => {
    setFormData({
      ...announcement,
      club_id: announcement.club_id?._id || announcement.club_id
    })
    setEditing(announcement._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await announcementAPI.delete(id)
        fetchData()
      } catch (error) {
        alert('Failed to delete announcement')
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const filteredAnnouncements = announcements.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       a.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchClub = !filterClub || a.club_id?._id === filterClub
    return matchSearch && matchClub
  })

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem 0' }}>Loading announcements...</div>

  return (
    <div style={{ width: '100%', padding: '3rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
          📢 Announcements
        </h1>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setFormError('')
            if (editing) {
              setEditing(null)
              setFormData({ club_id: '', title: '', content: '' })
            }
          }}
          style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(245, 87, 108, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {showForm ? '✕ Close' : '+ New Announcement'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: 'var(--bg-tertiary)', padding: '2rem', borderRadius: '1rem', marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            {editing ? 'Edit Announcement' : 'Create New Announcement'}
          </h2>
          {formError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
              {formError}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <FormField label="Club" name="club_id" placeholder="Select Club" value={formData.club_id} onChange={handleInputChange} options={clubs} disabled={editing} required />
            <FormField label="Title" name="title" placeholder="Announcement title" value={formData.title} onChange={handleInputChange} required />
            <FormField label="Content" name="content" type="textarea" placeholder="Write announcement content here..." value={formData.content} onChange={handleInputChange} required />
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(245, 87, 108, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {editing ? 'Update Announcement' : 'Post Announcement'}
            </button>
          </form>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search announcements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.875rem 1.25rem',
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
        <select
          value={filterClub}
          onChange={(e) => setFilterClub(e.target.value)}
          style={{
            padding: '0.875rem 1.25rem',
            background: 'var(--bg-secondary)',
            border: '2px solid var(--border-color)',
            borderRadius: '0.875rem',
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--text-primary)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)'
          }}
        >
          <option value="">All Clubs</option>
          {clubs.map(club => (
            <option key={club._id} value={club._id}>{club.club_name}</option>
          ))}
        </select>
      </div>

      {/* Announcements Feed */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement, idx) => (
            <AnnouncementCard key={announcement._id} announcement={announcement} onEdit={handleEdit} onDelete={handleDelete} idx={idx} />
          ))
        ) : (
          <div style={{ gridColumn: 'span 100%', textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            No announcements found
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>Total Announcements</p>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0.5rem 0 0 0' }}>{announcements.length}</p>
        </div>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>Active Clubs</p>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0.5rem 0 0 0' }}>{new Set(announcements.map(a => a.club_id?._id)).size}</p>
        </div>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>This Month</p>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0.5rem 0 0 0' }}>
            {announcements.filter(a => {
              const date = new Date(a.posted_date)
              const now = new Date()
              return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
            }).length}
          </p>
        </div>
      </div>
    </div>
  )
}
