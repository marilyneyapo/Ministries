import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '../services/auth.js'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isModerator = computed(() => user.value?.role === 'moderator' || isAdmin.value)
  const userInitials = computed(() => {
    if (!user.value?.name) return ''
    return user.value.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  // Actions
  const login = async (email, password) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authService.login(email, password)
      token.value = response.token
      user.value = response.user
      
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authService.register(userData)
      token.value = response.token
      user.value = response.user
      
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const resetPassword = async (email) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authService.resetPassword(email)
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    error.value = null
    
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    authService.logout()
  }

  const initializeAuth = async () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      try {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
        
        // Vérifier si le token est toujours valide
        await authService.getCurrentUser()
      } catch (error) {
        // Token invalide, déconnecter l'utilisateur
        logout()
      }
    }
  }

  const updateProfile = (updatedUser) => {
    user.value = { ...user.value, ...updatedUser }
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  const clearError = () => {
    error.value = null
  }

  const hasPermission = (permission) => {
    if (!user.value) return false
    
    const permissions = {
      admin: ['read', 'write', 'delete', 'manage'],
      moderator: ['read', 'write'],
      user: ['read']
    }
    
    return permissions[user.value.role]?.includes(permission) || false
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    isAdmin,
    isModerator,
    userInitials,
    // Actions
    login,
    register,
    resetPassword,
    logout,
    initializeAuth,
    updateProfile,
    clearError,
    hasPermission
  }
})