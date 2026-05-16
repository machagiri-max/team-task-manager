import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
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
      const response = await axios.post('http://localhost:8000/api/auth/token/refresh/', { refresh: refresh })
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
