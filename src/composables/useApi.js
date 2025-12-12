import { ref } from 'vue'
import { api } from '../services/api.js'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const execute = async (apiCall) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await apiCall()
      return result
    } catch (err) {
      error.value = err.message || 'Une erreur est survenue'
      throw err
    } finally {
      loading.value = false
    }
  }

  const get = async (url, params = {}) => {
    return execute(() => api.get(url, { params }))
  }

  const post = async (url, data = {}) => {
    return execute(() => api.post(url, data))
  }

  const put = async (url, data = {}) => {
    return execute(() => api.put(url, data))
  }

  const del = async (url) => {
    return execute(() => api.delete(url))
  }

  return {
    loading,
    error,
    execute,
    get,
    post,
    put,
    delete: del
  }
}