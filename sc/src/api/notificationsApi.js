import api from './axiosConfig'

export const getNotificationsByRole = (role) => api.get(`/api/notifications/${role}`)
export const createNotification = (payload) => api.post('/api/notifications', payload)
export const markNotificationAsRead = (id) => api.put(`/api/notifications/${id}/read`)
