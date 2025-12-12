<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
          <div class="w-16 h-16 bg-white rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-white mb-1">Modification</h1>
          <p class="text-indigo-100 text-sm">Modifier votre mot de passe en toute sécurité !</p>
        </div>

        <!-- Contenu -->
        <div class="p-6">
          <div v-if="!emailSent">
            <!-- Formulaire de demande -->
            <form @submit.prevent="handleReset" class="space-y-4">
              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Adresse email
                </label>
                <div class="relative">
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    placeholder="Entrez votre adresse email"
                    required
                    class="w-full px-4 py-2.5 pl-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-all bg-gray-50 focus:bg-white"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isLoading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </span>
                <span v-else>Envoyer le lien de réinitialisation</span>
              </button>
            </form>
          </div>

          <!-- Confirmation d'envoi -->
          <div v-else class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Email envoyé !</h3>
            <p class="text-gray-600 mb-6">
              Un lien de réinitialisation a été envoyé à <strong>{{ email }}</strong>. 
              Vérifiez votre boîte de réception et suivez les instructions.
            </p>
            <button
              @click="goToLogin"
              class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Retour à la connexion
            </button>
          </div>

          <!-- Lien retour -->
          <div v-if="!emailSent" class="text-center mt-6">
            <router-link 
              to="/login" 
              class="text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              ← Retour à la connexion
            </router-link>
          </div>
        </div>
      </div>
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
const { success: showSuccess, error } = useNotification()

const email = ref('')
const isLoading = ref(false)
const emailSent = ref(false)

const handleReset = async () => {
  if (!email.value) {
    error('Veuillez saisir votre adresse email')
    return
  }

  isLoading.value = true

  try {
    await authStore.resetPassword(email.value)
    emailSent.value = true
    showSuccess('Email de réinitialisation envoyé avec succès !')
  } catch (err) {
    error(err.message || 'Erreur lors de l\'envoi de l\'email')
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>
