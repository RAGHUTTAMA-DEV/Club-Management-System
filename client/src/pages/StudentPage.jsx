import { useState, useEffect } from 'react'
import { studentAPI } from '../services/api'

// Reusable FormField component
const FormField = ({ label, name, type = 'text', placeholder, value, onChange, onFocus, onBlur, disabled, options, required }) => {
  const isSelect = options && options.length > 0
  
  return (
    <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
      <label style={{
        display: 'block',
        color: 'var(--text-primary)',
        fontWeight: '600',
        marginBottom: '0.75rem',
        fontSize: '0.95rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {label}
      </label>
      {isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            padding: '0.875rem 1.25rem',
            background: 'var(--bg-secondary)',
            border: '2px solid var(--border-color)',
            borderRadius: '0.875rem',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            outline: 'none'
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {options.map(opt => <option key={opt}>{opt}</option>)}
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
            background: disabled ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
            border: '2px solid var(--border-color)',
            borderRadius: '0.875rem',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            outline: 'none',
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? 'not-allowed' : 'text'
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )}
    </div>
  )
}

// StudentCard component
const StudentCard = ({ student, onEdit, onDelete, idx }) => (
  <div
    className="card animate-fade-in-up"
    style={{
      animation: 'fadeInUp 0.5s ease-out',
      animationDelay: `${idx * 0.05}s`,
      animationFillMode: 'both'
    }}
  >
    <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)', color: 'white', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '700', marginBottom: '1rem' }}>
      {student.student_id}
    </div>
    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{student.name}</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem' }}><span>📧</span><span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{student.email}</span></div>
      <div style={{ display: 'flex', gap: '0.75rem' }}><span>📱</span><span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{student.phone || 'N/A'}</span></div>
      <div style={{ display: 'flex', gap: '0.75rem' }}><span>📚</span><span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{student.year}</span></div>
    </div>
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <button onClick={() => onEdit(student)} style={{ flex: 1, padding: '0.625rem', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '0.75rem', color: '#38bdf8', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.target.style.background = '#38bdf8'; e.target.style.color = 'white'; }} onMouseLeave={(e) => { e.target.style.background = 'rgba(59, 130, 246, 0.15)'; e.target.style.color = '#38bdf8'; }}>✏️ Edit</button>
      <button onClick={() => onDelete(student._id)} style={{ flex: 1, padding: '0.625rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.75rem', color: '#fca5a5', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.target.style.background = '#ef4444'; e.target.style.color = 'white'; }} onMouseLeave={(e) => { e.target.style.background = 'rgba(239, 68, 68, 0.15)'; e.target.style.color = '#fca5a5'; }}>🗑️ Delete</button>
    </div>
  </div>
)

export default function StudentPage() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', year: '1st Year', department: '' })
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => { fetchStudents() }, [])

  const fetchStudents = async () => {
    try {
      const response = await studentAPI.getAll()
      setStudents(response.data)
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    try {
      if (editing) {
        await studentAPI.update(editing, formData)
      } else {
        await studentAPI.create(formData)
      }
      setFormData({ name: '', email: '', phone: '', year: '1st Year', department: '' })
      setEditing(null)
      setShowForm(false)
      fetchStudents()
    } catch (error) {
      setFormError(error.response?.data?.message || 'Failed to save student')
    }
  }

  const handleEdit = (student) => {
    setFormData(student)
    setEditing(student._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this student?')) {
      try {
        await studentAPI.delete(id)
        fetchStudents()
      } catch (error) {
        alert('Failed to delete student')
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '4rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem', animation: 'floatingPulse 3s ease-in-out infinite' }}>👨‍🎓</div>
        <p style={{ color: 'var(--text-muted)' }}>Loading students...</p>
      </div>
    </div>
  )

  return (
    <div style={{ width: '100%', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', animation: 'fadeInDown 0.6s ease-out' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>📚 Students</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage all students</p>
          </div>
          <button onClick={() => { setShowForm(!showForm); if (showForm) { setFormData({ name: '', email: '', phone: '', year: '1st Year', department: '' }); setEditing(null); setFormError(''); } }} style={{ padding: '0.875rem 1.75rem', background: showForm ? 'rgba(239, 68, 68, 0.15)' : 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)', border: 'none', borderRadius: '0.875rem', color: showForm ? '#fca5a5' : 'white', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: showForm ? 'none' : '0 10px 25px -5px rgba(59, 130, 246, 0.3)' }}>{showForm ? '✕ Close' : '+ Add'}</button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="card animate-fade-in-up" style={{ animation: 'fadeInUp 0.5s ease-out', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '2rem' }}>{editing ? '✏️ Edit' : '➕ Add'} Student</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <FormField label="Name" name="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required onFocus={(e) => { e.target.style.borderColor = 'var(--primary-500)'; e.target.style.background = 'var(--bg-tertiary)'; }} onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.background = 'var(--bg-secondary)'; }} />
              <FormField label="Email" name="email" type="email" placeholder="email@example.com" value={formData.email} onChange={handleInputChange} required onFocus={(e) => { e.target.style.borderColor = 'var(--primary-500)'; e.target.style.background = 'var(--bg-tertiary)'; }} onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.background = 'var(--bg-secondary)'; }} />
              <FormField label="Phone" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleInputChange} onFocus={(e) => { e.target.style.borderColor = 'var(--primary-500)'; e.target.style.background = 'var(--bg-tertiary)'; }} onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.background = 'var(--bg-secondary)'; }} />
              <FormField label="Year" name="year" value={formData.year} onChange={handleInputChange} options={['1st Year', '2nd Year', '3rd Year', '4th Year']} onFocus={(e) => { e.target.style.borderColor = 'var(--primary-500)'; e.target.style.background = 'var(--bg-tertiary)'; }} onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.background = 'var(--bg-secondary)'; }} />
              <FormField label="Department" name="department" placeholder="Computer Science" value={formData.department} onChange={handleInputChange} onFocus={(e) => { e.target.style.borderColor = 'var(--primary-500)'; e.target.style.background = 'var(--bg-tertiary)'; }} onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.background = 'var(--bg-secondary)'; }} />
            </form>
            {formError && <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '2px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', padding: '1rem', borderRadius: '0.875rem', marginBottom: '1.5rem' }}>⚠️ {formError}</div>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              <button onClick={handleSubmit} style={{ padding: '0.875rem 1.75rem', background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)', border: 'none', borderRadius: '0.875rem', color: 'white', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase', boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)' }}>💾 {editing ? 'Update' : 'Add'}</button>
              <button onClick={() => { setFormData({ name: '', email: '', phone: '', year: '1st Year', department: '' }); setEditing(null); setShowForm(false); }} style={{ padding: '0.875rem 1.75rem', background: 'transparent', border: '2px solid var(--border-color)', borderRadius: '0.875rem', color: 'var(--text-primary)', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase' }}>✕ Cancel</button>
            </div>
          </div>
        )}

        {/* Search */}
        <input type="text" placeholder="🔍 Search by name or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '1rem 1.5rem', background: 'var(--bg-secondary)', border: '2px solid var(--border-color)', borderRadius: '0.875rem', color: 'var(--text-primary)', marginBottom: '2rem', outline: 'none', transition: 'all 0.3s ease', animation: 'fadeInUp 0.6s ease-out 0.1s both' }} onFocus={(e) => { e.target.style.borderColor = 'var(--primary-500)'; e.target.style.background = 'var(--bg-tertiary)'; }} onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.background = 'var(--bg-secondary)'; }} />

        {/* Students Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, idx) => <StudentCard key={student._id} student={student} onEdit={handleEdit} onDelete={handleDelete} idx={idx} />)
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 2rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭</div>
              <p>No students found. Try a different search or add a new student.</p>
            </div>
          )}
        </div>

        {filteredStudents.length > 0 && (
          <div style={{ marginTop: '3rem', padding: '1.5rem 2rem', background: 'var(--glass-bg)', border: '1px solid var(--border-light)', borderRadius: '0.875rem', textAlign: 'center', animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
            <p style={{ color: 'var(--text-muted)' }}>Showing <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{filteredStudents.length}</span> of <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{students.length}</span> students</p>
          </div>
        )}
      </div>
    </div>
  )
}
