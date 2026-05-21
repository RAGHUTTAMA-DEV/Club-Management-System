import { useState, useEffect } from 'react'
import { clubAPI } from '../services/api'

// Curated club logo/cover images from Unsplash
const CLUB_IMAGES = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
]

const getClubImage = (club, idx) => {
  if (club.logo && club.logo.startsWith('http')) return club.logo
  return CLUB_IMAGES[idx % CLUB_IMAGES.length]
}

// Gradient palette for clubs
const GRADIENTS = [
  'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
  'linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  'linear-gradient(135deg, #10b981 0%, #059669 100%)',
]

// Reusable FormField component
const FormField = ({ label, name, type = 'text', placeholder, value, onChange, onFocus, onBlur, disabled, options, required }) => {
  const isSelect = options && options.length > 0
  return (
    <div>
      <label style={{ display: 'block', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </label>
      {isSelect ? (
        <select name={name} value={value} onChange={onChange}
          style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--bg-secondary)', border: '2px solid var(--border-color)', borderRadius: '0.75rem', color: 'var(--text-primary)', fontSize: '0.95rem', transition: 'all 0.3s ease', outline: 'none' }}
          onFocus={onFocus} onBlur={onBlur}>
          {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
      ) : (
        <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required} disabled={disabled}
          style={{ width: '100%', padding: '0.75rem 1rem', background: disabled ? 'var(--bg-tertiary)' : 'var(--bg-secondary)', border: '2px solid var(--border-color)', borderRadius: '0.75rem', color: 'var(--text-primary)', fontSize: '0.95rem', transition: 'all 0.3s ease', outline: 'none', opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'text' }}
          onFocus={onFocus} onBlur={onBlur} />
      )}
    </div>
  )
}

// ClubCard component
const ClubCard = ({ club, onEdit, onDelete, idx }) => {
  const imgUrl = getClubImage(club, idx)
  const gradient = GRADIENTS[idx % GRADIENTS.length]

  return (
    <div
      className="card"
      style={{
        animation: 'fadeInUp 0.5s ease-out',
        animationDelay: `${idx * 0.06}s`,
        animationFillMode: 'both',
        overflow: 'hidden',
        padding: 0
      }}
    >
      {/* Club Cover Image */}
      <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
        <img src={imgUrl} alt={club.club_name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onError={(e) => { e.target.src = CLUB_IMAGES[0] }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.2) 60%, transparent 100%)' }} />
        <div style={{
          position: 'absolute', top: '0.75rem', left: '0.75rem',
          background: gradient, color: 'white',
          padding: '0.3rem 0.75rem', borderRadius: '9999px',
          fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.05em',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          {club.club_id}
        </div>
        {/* Club avatar circle */}
        <div style={{
          position: 'absolute', bottom: '-1.5rem', left: '1.25rem',
          width: '3.5rem', height: '3.5rem', borderRadius: '1rem',
          background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', border: '3px solid var(--bg-primary)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          🎭
        </div>
      </div>

      {/* Club Info */}
      <div style={{ padding: '2rem 1.25rem 1.25rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {club.club_name}
        </h3>

        {club.description && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {club.description}
          </p>
        )}

        {club.faculty_coordinator && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem', background: 'var(--bg-secondary)', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', width: 'fit-content' }}>
            👨‍🏫 {club.faculty_coordinator}
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => onEdit(club)} style={{ flex: 1, padding: '0.6rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: '0.625rem', color: '#60a5fa', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.target.style.background = '#3b82f6'; e.target.style.color = 'white' }}
            onMouseLeave={(e) => { e.target.style.background = 'rgba(59, 130, 246, 0.1)'; e.target.style.color = '#60a5fa' }}>
            ✏️ Edit
          </button>
          <button onClick={() => onDelete(club._id)} style={{ flex: 1, padding: '0.6rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '0.625rem', color: '#f87171', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.target.style.background = '#ef4444'; e.target.style.color = 'white' }}
            onMouseLeave={(e) => { e.target.style.background = 'rgba(239, 68, 68, 0.1)'; e.target.style.color = '#f87171' }}>
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ClubPage() {
  const [clubs, setClubs] = useState([])
  const [formData, setFormData] = useState({ club_name: '', description: '', faculty_coordinator: '', logo: '' })
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => { fetchClubs() }, [])

  const fetchClubs = async () => {
    try { const response = await clubAPI.getAll(); setClubs(response.data) }
    catch (error) { console.error('Error fetching clubs:', error) }
    finally { setLoading(false) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setFormError('')
    try {
      if (editing) { await clubAPI.update(editing, formData) }
      else { await clubAPI.create(formData) }
      setFormData({ club_name: '', description: '', faculty_coordinator: '', logo: '' })
      setEditing(null); setShowForm(false); fetchClubs()
    } catch (error) { setFormError(error.response?.data?.message || 'Failed to save club') }
  }

  const handleEdit = (club) => { setFormData(club); setEditing(club._id); setShowForm(true) }

  const handleDelete = async (id) => {
    if (confirm('Delete this club?')) {
      try { await clubAPI.delete(id); fetchClubs() }
      catch (error) { alert('Failed to delete club') }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const filteredClubs = clubs.filter(c =>
    c.club_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.club_id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'floatingPulse 2s ease-in-out infinite' }}>🎭</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading clubs...</p>
      </div>
    </div>
  )

  return (
    <div style={{ width: '100%', padding: '2rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', animation: 'fadeInDown 0.6s ease-out' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', margin: '0 0 0.25rem 0', background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Clubs
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {clubs.length} active clubs
          </p>
        </div>
        <button onClick={() => { setShowForm(!showForm); if (showForm) { setFormData({ club_name: '', description: '', faculty_coordinator: '', logo: '' }); setEditing(null); setFormError('') } }}
          style={{ padding: '0.75rem 1.5rem', background: showForm ? 'rgba(239, 68, 68, 0.15)' : 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', border: 'none', borderRadius: '0.875rem', color: showForm ? '#fca5a5' : 'white', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem', boxShadow: showForm ? 'none' : '0 8px 20px rgba(168, 85, 247, 0.3)', letterSpacing: '0.02em', transition: 'all 0.3s ease' }}>
          {showForm ? '✕ Close' : '+ New Club'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '1.25rem', marginBottom: '2rem', border: '1px solid var(--border-color)', animation: 'fadeInUp 0.4s ease-out' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            {editing ? '✏️ Edit Club' : '🎭 Create New Club'}
          </h2>
          {formError && <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.75rem 1rem', borderRadius: '0.75rem', marginBottom: '1rem', fontSize: '0.9rem' }}>⚠️ {formError}</div>}
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <FormField label="Club Name" name="club_name" placeholder="Tech Club" value={formData.club_name} onChange={handleInputChange} required />
            <FormField label="Faculty Coordinator" name="faculty_coordinator" placeholder="Dr. Jane Smith" value={formData.faculty_coordinator} onChange={handleInputChange} />
            <div style={{ gridColumn: '1 / -1' }}>
              <FormField label="Logo / Cover Image URL" name="logo" placeholder="https://images.unsplash.com/..." value={formData.logo} onChange={handleInputChange} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <FormField label="Description" name="description" placeholder="A brief description of the club..." value={formData.description} onChange={handleInputChange} />
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.75rem' }}>
              <button type="submit" style={{ flex: 1, padding: '0.875rem', background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', border: 'none', borderRadius: '0.875rem', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem', boxShadow: '0 8px 20px rgba(168, 85, 247, 0.3)' }}>
                💾 {editing ? 'Update' : 'Create'} Club
              </button>
              <button type="button" onClick={() => { setFormData({ club_name: '', description: '', faculty_coordinator: '', logo: '' }); setEditing(null); setShowForm(false) }}
                style={{ padding: '0.875rem 1.5rem', background: 'transparent', border: '2px solid var(--border-color)', borderRadius: '0.875rem', color: 'var(--text-primary)', fontWeight: '700', cursor: 'pointer' }}>
                ✕ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div style={{ marginBottom: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', opacity: 0.5 }}>🔍</div>
        <input type="text" placeholder="Search clubs by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem', background: 'var(--bg-secondary)', border: '2px solid var(--border-color)', borderRadius: '0.875rem', color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s ease', fontSize: '0.95rem' }}
          onFocus={(e) => { e.target.style.borderColor = 'rgba(168,85,247,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.1)' }}
          onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none' }} />
      </div>

      {/* Clubs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredClubs.length > 0 ? (
          filteredClubs.map((club, idx) => <ClubCard key={club._id} club={club} onEdit={handleEdit} onDelete={handleDelete} idx={idx} />)
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>📭</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No clubs found</p>
          </div>
        )}
      </div>

      {filteredClubs.length > 0 && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--glass-bg)', border: '1px solid var(--border-color)', borderRadius: '0.875rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Showing <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{filteredClubs.length}</span> of <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{clubs.length}</span> clubs
          </p>
        </div>
      )}
    </div>
  )
}
