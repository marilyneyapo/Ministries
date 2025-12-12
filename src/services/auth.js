import { api } from './api.js'
import { mockUsers } from '../mocks/users.js'

class AuthService {
  async login(email, password) {
    // Simulation d'une API avec les données fictives
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = mockUsers.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw new Error('Email ou mot de passe incorrect')
    }

    if (!user.isActive) {
      throw new Error('Compte désactivé')
    }

    const token = `fake-jwt-token-${user.id}-${Date.now()}`
    
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      },
      token
    }
  }

  async register(userData) {
    // Simulation d'une API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const existingUser = mockUsers.find(u => u.email === userData.email)
    if (existingUser) {
      throw new Error('Un compte avec cet email existe déjà')
    }

    const newUser = {
      id: Math.max(...mockUsers.map(u => u.id)) + 1,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'user',
      avatar: '/user.png',
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true,
      phone: userData.phone || '',
      address: userData.address || ''
    }

    mockUsers.push(newUser)
    
    const token = `fake-jwt-token-${newUser.id}-${Date.now()}`
    
    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar
      },
      token
    }
  }

  async resetPassword(email) {
    // Simulation d'une API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = mockUsers.find(u => u.email === email)
    if (!user) {
      throw new Error('Aucun compte trouvé avec cet email')
    }

    // Simulation d'envoi d'email
    return {
      message: 'Un email de réinitialisation a été envoyé'
    }
  }

  async getCurrentUser() {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Aucun token trouvé')
    }

    // Simulation d'une API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Extraire l'ID du token fictif
    const userId = parseInt(token.split('-')[3])
    const user = mockUsers.find(u => u.id === userId)
    
    if (!user) {
      throw new Error('Utilisateur non trouvé')
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

export default new AuthService()