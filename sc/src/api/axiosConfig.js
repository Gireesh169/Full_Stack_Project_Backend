import axios from 'axios'

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: configuredBaseUrl && configuredBaseUrl.trim() ? configuredBaseUrl : '/api',
})

export default api
