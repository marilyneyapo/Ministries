<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-white">
    <div class="w-full max-w-md">
      <!-- Carte de connexion -->
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- En-tête -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
          <div class="w-16 h-16 bg-white rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-white mb-1">Connexion</h1>
          <p class="text-indigo-100 text-sm">Bienvenue sur E-GEST ! Votre Gestionnaire d'églises fiable </p>
          <p class="text-indigo-100 text-sm">Connectez-vous à votre compte</p>

        </div>

        <!-- Formulaire -->
        <div class="p-6">
          <div class="space-y-4">
            <!-- Champ Mot de passe -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Mot de passe
              </label>
              <div class="relative">
                <input
                  v-model="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  class="w-full px-4 py-2.5 pl-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white text-black"
                  @keyup.enter="handleLogin"
                />
                <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <!-- Champ Email -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Adresse email
              </label>
              <div class="relative">
                <input
                  v-model="email"
                  type="email"
                  placeholder="exemple@gmail.com"
                  class="w-full px-4 py-2.5 pl-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white text-black"
                />
                <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <!-- Mot de passe oublié -->
            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input 
                  v-model="rememberMe"
                  type="checkbox" 
                  class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                >
                <span class="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
              </label>
              <router-link 
                to="/reset-password" 
                class="text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Mot de passe oublié ?
              </router-link>
            </div>

            <!-- Bouton de connexion -->
            <button
              @click="handleLogin"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion...
              </span>
              <span v-else>Se connecter</span>
            </button>

            <!-- Lien inscription -->
            <p class="text-center text-sm text-gray-600 mt-4">
              Vous n'avez pas de compte ?
              <router-link 
                to="/register" 
                class="text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Inscrivez-vous
              </router-link>
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-white text-sm mt-6">
        © 2025 Mon Gestionnaire. Tous droits réservés.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.js'
import { useNotification } from '../../composables/useNotification.js'

const router = useRouter()
const authStore = useAuthStore()
const { success, error } = useNotification()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)

async function handleLogin() {
  if (!email.value || !password.value) {
    error('Veuillez remplir tous les champs !')
    return
  }

  isLoading.value = true
  
  try {
    await authStore.login(email.value, password.value)
    success('Connexion réussie ! Redirection...')
    
    // Redirection vers le dashboard
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
    
  } catch (err) {
    error(err.message || 'Erreur de connexion')
  } finally {
    isLoading.value = false
  }
}
</script>