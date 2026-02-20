import axios from 'axios'
import { toast } from 'react-toastify'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(
  (config) => {
    if (typeof window === 'undefined') return config

    const token = localStorage.getItem('token')

    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined') {
      const status = error?.response?.status
      const backendMessage = error?.response?.data?.message || error?.response?.data?.error
      const fallbackMessage = status === 401
        ? 'Não autorizado. Faça login novamente.'
        : 'Ocorreu um erro ao processar a requisição.'
      const message = backendMessage || fallbackMessage

      if (status && [400, 401, 403, 404, 500].includes(status)) {
        toast.error(message, {
          toastId: `${status}-${error?.config?.url || ''}`,
        })
      }

      if (status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }
    }

    return Promise.reject(error)
  },
)

export const register = (data) => api.post('/auth/register', data)

export default api