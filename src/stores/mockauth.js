import { mockUsers } from '@/mocks/users'

// Simuler un délai réseau
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const authService = {
  async login(email, password) {
    await delay(800)
    
    const user = mockUsers.find(u => u.email === email)
    if (!user || user.password !== password) {
      throw new Error('Email ou mot de passe incorrect')
    }

    // Simuler un token JWT
    const token = btoa(JSON.stringify({ id: user.id, email: user.email }))
    
    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    }
  },

  async register(userData) {
    await delay(800)
    
    const userExists = mockUsers.some(u => u.email === userData.email)
    if (userExists) {
      throw new Error('Cet email est déjà utilisé')
    }

    const newUser = {
      id: mockUsers.length + 1,
      ...userData
    }
    mockUsers.push(newUser)

    const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email }))
    
    return {
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
    }
  },

  async resetPassword(email) {
    await delay(500)
    const userExists = mockUsers.some(u => u.email === email)
    if (!userExists) {
      throw new Error('Utilisateur non trouvé')
    }
    return { message: 'Email de réinitialisation envoyé' }
  }
}

export default authService