import { useState, useEffect } from 'react'
import { membershipAPI, studentAPI, clubAPI } from '../services/api'

// FormField defined OUTSIDE to prevent re-creation on each render
const FormField = ({ label, name, type = 'text', placeholder, value, onChange, disabled, options, required }) => {
  const isSelect = options && options.length > 0
  
  const getOptionDisplay = (opt) => {
    // For students
    if (opt.student_id) return `${opt.student_id} - ${opt.name}`
    // For clubs
    if (opt.club_name) return opt.club_name
    // For roles (simple objects)
    if (opt.label) return opt.label
    return opt.name || opt.label || ''
  }
  
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
            <option key={opt._id || opt.value} value={opt._id || opt.value}>
              {getOptionDisplay(opt)}
            </option>
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

// MembershipCard defined OUTSIDE to prevent re-creation on each render
const MembershipCard = ({ membership, onEdit, onDelete, idx }) => {
  const roleColors = {
    'President': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'Vice-President': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'Secretary': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'Treasurer': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'Member': 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
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
            background: roleColors[membership.role],
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            marginBottom: '0.75rem'
          }}
        >
          {membership.role}
        </div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
          {membership.student_id?.name || 'Unknown Student'}
        </h3>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', flex: 1 }}>
        🏢 {membership.club_id?.club_name || 'Unknown Club'}
      </p>
      {membership.join_date && (
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          📅 Joined {new Date(membership.join_date).toLocaleDateString()}
        </p>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onEdit(membership)
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
            onDelete(membership._id)
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

export default function MembershipPage() {
  const [memberships, setMemberships] = useState([])
  const [students, setStudents] = useState([])
  const [clubs, setClubs] = useState([])
  const [formData, setFormData] = useState({
    student_id: '',
    club_id: '',
    role: 'Member'
  })
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filterClub, setFilterClub] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [membershipsRes, studentsRes, clubsRes] = await Promise.all([
        membershipAPI.getAll(),
        studentAPI.getAll(),
        clubAPI.getAll()
      ])
      setMemberships(membershipsRes.data)
      setStudents(studentsRes.data)
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
        await membershipAPI.update(editing, formData)
      } else {
        await membershipAPI.create(formData)
      }
      setFormData({ student_id: '', club_id: '', role: 'Member' })
      setEditing(null)
      setShowForm(false)
      fetchData()
    } catch (error) {
      setFormError(error.response?.data?.message || 'Failed to save membership')
    }
  }

  const handleEdit = (membership) => {
    setFormData({
      ...membership,
      student_id: membership.student_id?._id || membership.student_id,
      club_id: membership.club_id?._id || membership.club_id
    })
    setEditing(membership._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await membershipAPI.delete(id)
        fetchData()
      } catch (error) {
        alert('Failed to delete membership')
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const filteredMemberships = memberships.filter(m => {
    const matchClub = !filterClub || m.club_id?._id === filterClub
    const matchRole = !filterRole || m.role === filterRole
    return matchClub && matchRole
  })


  if (loading) return <div style={{ textAlign: 'center', padding: '3rem 0' }}>Loading memberships...</div>

  return (
    <div style={{ width: '100%', padding: '3rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
          👥 Memberships
        </h1>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setFormError('')
            if (editing) {
              setEditing(null)
              setFormData({ student_id: '', club_id: '', role: 'Member' })
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
          {showForm ? '✕ Close' : '+ Add Membership'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: 'var(--bg-tertiary)', padding: '2rem', borderRadius: '1rem', marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            {editing ? 'Edit Membership' : 'Add New Membership'}
          </h2>
          {formError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
              {formError}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <FormField label="Student" name="student_id" placeholder="Select Student" value={formData.student_id} onChange={handleInputChange} options={students} disabled={editing} required />
            <FormField label="Club" name="club_id" placeholder="Select Club" value={formData.club_id} onChange={handleInputChange} options={clubs} disabled={editing} required />
            <FormField label="Role" name="role" placeholder="Select Role" value={formData.role} onChange={handleInputChange} options={[
              { value: 'President', label: 'President', _id: 'President' },
              { value: 'Vice-President', label: 'Vice-President', _id: 'Vice-President' },
              { value: 'Secretary', label: 'Secretary', _id: 'Secretary' },
              { value: 'Treasurer', label: 'Treasurer', _id: 'Treasurer' },
              { value: 'Member', label: 'Member', _id: 'Member' }
            ]} required />
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
              {editing ? 'Update Membership' : 'Add Membership'}
            </button>
          </form>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
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
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
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
          <option value="">All Roles</option>
          <option value="President">President</option>
          <option value="Vice-President">Vice-President</option>
          <option value="Secretary">Secretary</option>
          <option value="Treasurer">Treasurer</option>
          <option value="Member">Member</option>
        </select>
      </div>

      {/* Memberships Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {filteredMemberships.length > 0 ? (
          filteredMemberships.map((membership, idx) => (
            <MembershipCard key={membership._id} membership={membership} onEdit={handleEdit} onDelete={handleDelete} idx={idx} />
          ))
        ) : (
          <div style={{ gridColumn: 'span 100%', textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            No memberships found
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>Total Memberships</p>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0.5rem 0 0 0' }}>{memberships.length}</p>
        </div>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>Presidents</p>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0.5rem 0 0 0' }}>{memberships.filter(m => m.role === 'President').length}</p>
        </div>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>Active Clubs</p>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0.5rem 0 0 0' }}>{new Set(memberships.map(m => m.club_id?._id)).size}</p>
        </div>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>Active Members</p>
          <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0.5rem 0 0 0' }}>{new Set(memberships.map(m => m.student_id?._id)).size}</p>
        </div>
      </div>
    </div>
  )
}
