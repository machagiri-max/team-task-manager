import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use(function(cfg) {
  const token = localStorage.getItem('access')
  if (token) cfg.headers.Authorization = 'Bearer ' + token
  return cfg
})

api.interceptors.response.use(function(res) { return res }, async function(err) {
  if (err.response && err.response.status === 401) {
    try {
      const refresh = localStorage.getItem('refresh')
      const response = await axios.post(BASE_URL + '/auth/token/refresh/', { refresh: refresh })
      localStorage.setItem('access', response.data.access)
      err.config.headers.Authorization = 'Bearer ' + response.data.access
      return api(err.config)
    } catch(e) {
      localStorage.clear()
      window.location.href = '/login'
    }
  }
  return Promise.reject(err)
})

export default api
