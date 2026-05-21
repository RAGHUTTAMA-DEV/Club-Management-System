import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

// ==================== STUDENTS ====================
export const studentAPI = {
  getAll: () => axios.get(`${API_URL}/students`),
  getById: (id) => axios.get(`${API_URL}/students/${id}`),
  create: (data) => axios.post(`${API_URL}/students`, data),
  update: (id, data) => axios.patch(`${API_URL}/students/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/students/${id}`)
}

// ==================== CLUBS ====================
export const clubAPI = {
  getAll: () => axios.get(`${API_URL}/clubs`),
  getById: (id) => axios.get(`${API_URL}/clubs/${id}`),
  create: (data) => axios.post(`${API_URL}/clubs`, data),
  update: (id, data) => axios.patch(`${API_URL}/clubs/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/clubs/${id}`)
}

// ==================== MEMBERSHIPS ====================
export const membershipAPI = {
  getAll: () => axios.get(`${API_URL}/memberships`),
  getById: (id) => axios.get(`${API_URL}/memberships/${id}`),
  create: (data) => axios.post(`${API_URL}/memberships`, data),
  update: (id, data) => axios.patch(`${API_URL}/memberships/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/memberships/${id}`),
  getByClub: (clubId) => axios.get(`${API_URL}/memberships?club_id=${clubId}`),
  getByStudent: (studentId) => axios.get(`${API_URL}/memberships?student_id=${studentId}`)
}

// ==================== EVENTS ====================
export const eventAPI = {
  getAll: () => axios.get(`${API_URL}/events`),
  getById: (id) => axios.get(`${API_URL}/events/${id}`),
  create: (data) => axios.post(`${API_URL}/events`, data),
  update: (id, data) => axios.patch(`${API_URL}/events/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/events/${id}`),
  getByClub: (clubId) => axios.get(`${API_URL}/events?club_id=${clubId}`)
}

// ==================== EVENT REGISTRATIONS ====================
export const eventRegistrationAPI = {
  getAll: () => axios.get(`${API_URL}/event-registrations`),
  getById: (id) => axios.get(`${API_URL}/event-registrations/${id}`),
  create: (data) => axios.post(`${API_URL}/event-registrations`, data),
  update: (id, data) => axios.patch(`${API_URL}/event-registrations/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/event-registrations/${id}`),
  getByEvent: (eventId) => axios.get(`${API_URL}/event-registrations?event_id=${eventId}`),
  getByStudent: (studentId) => axios.get(`${API_URL}/event-registrations?student_id=${studentId}`)
}

// ==================== ANNOUNCEMENTS ====================
export const announcementAPI = {
  getAll: () => axios.get(`${API_URL}/announcements`),
  getById: (id) => axios.get(`${API_URL}/announcements/${id}`),
  create: (data) => axios.post(`${API_URL}/announcements`, data),
  update: (id, data) => axios.patch(`${API_URL}/announcements/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/announcements/${id}`),
  getByClub: (clubId) => axios.get(`${API_URL}/announcements?club_id=${clubId}`)
}

// ==================== AUTH ====================
export const authAPI = {
  login: (student_id) => axios.post(`${API_URL}/auth/login`, { student_id }),
  verify: () => axios.get(`${API_URL}/auth/me`)
}

export default axios
