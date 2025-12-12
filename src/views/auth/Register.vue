<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden">
      <div class="flex flex-col md:flex-row">
        
        <!-- Section Photo -->
        <div class="md:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex flex-col items-center justify-center text-white">
          <div class="mb-6">
            <h2 class="text-3xl font-bold mb-2">Bienvenue !</h2>
            <p class="text-blue-100 text-center">Créez votre profil en quelques étapes</p>
          </div>
          
          <div class="relative group">
            <div class="w-40 h-40 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
              <img v-if="photo" :src="photo" alt="Photo de profil" class="w-full h-full object-cover"/>
              <span v-else class="text-5xl font-bold text-white">
                {{ getInitials(username, prenom) || '?' }}
              </span>
            </div>
            
            <label class="absolute bottom-0 right-0 bg-white text-blue-600 p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-50 transition-all transform hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <input type="file" accept="image/*" @change="handlePhotoUpload" class="hidden"/>
            </label>
          </div>
          
          <p class="mt-6 text-sm text-blue-100 text-center">
            Cliquez sur l'icône pour ajouter votre photo
          </p>
        </div>

        <!-- Section Formulaire -->
        <div class="md:w-3/5 p-8 md:p-10">
          <h1 class="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Enregistrement
          </h1>

          <div class="space-y-5">
            <!-- Nom et Prénom -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Nom <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="username"
                  type="text"
                  placeholder="KRA"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Prénom <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="prenom"
                  type="text"
                  placeholder="LOUIS"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email <span class="text-red-500">*</span>
              </label>
              <input
                v-model="email"
                type="email"
                placeholder="example@gmail.com"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <!-- Âge et Numéro -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Âge <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="age"
                  type="number"
                  placeholder="20"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Numéro de téléphone
                </label>
                <input
                  v-model="numero"
                  type="tel"
                  placeholder="00800000"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <!-- Lieu d'habitation -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Lieu d'habitation
              </label>
              <input
                v-model="lieu_d_habitation"
                type="text"
                placeholder="Sassandra"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <!-- Nationalité -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Nationalité
              </label>
              <input
                v-model="nationalité"
                type="text"
                placeholder="Ivoirienne"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <!-- Mot de passe -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="password"
                  type="password"
                  placeholder="Minimum 6 caractères"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
              
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmer le mot de passe <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="confirmPassword"
                  type="password"
                  placeholder="Répétez le mot de passe"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <!-- Bouton de soumission-->
            <button
              @click="submitForm"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Inscription...
              </span>
              <span v-else>Enregistrer</span>
            </button>

            <!-- Lien vers connexion -->
            <p class="text-center text-sm text-gray-600 mt-4">
              Vous avez déjà un compte ?
              <router-link 
                to="/login" 
                class="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Connectez-vous
              </router-link>
            </p>
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
const { success, error } = useNotification()

const username = ref('')
const prenom = ref('')
const age = ref('')
const nationalité = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const photo = ref('')
const numero = ref('')
const lieu_d_habitation = ref('')
const isLoading = ref(false)

function handlePhotoUpload(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (event) => {
    photo.value = event.target.result
  }
  reader.readAsDataURL(file)
}

function getInitials(n, p) {
  return ((n[0] || '') + (p[0] || '')).toUpperCase()
}

async function submitForm() {
  // Validation
  if (!username.value || !prenom.value || !email.value || !password.value) {
    error('Veuillez remplir tous les champs obligatoires !')
    return
  }

  if (password.value !== confirmPassword.value) {
    error('Les mots de passe ne correspondent pas !')
    return
  }

  if (password.value.length < 6) {
    error('Le mot de passe doit contenir au moins 6 caractères !')
    return
  }

  isLoading.value = true

  try {
    const userData = {
      name: `${prenom.value} ${username.value}`,
      email: email.value,
      password: password.value,
      phone: numero.value,
      address: lieu_d_habitation.value,
      age: age.value,
      nationality: nationalité.value,
      avatar: photo.value || '/user.png'
    }

    await authStore.register(userData)
    success('Inscription réussie ! Redirection...')
    
    // Redirection vers le dashboard
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
    
  } catch (err) {
    error(err.message || 'Erreur lors de l\'inscription')
  } finally {
    isLoading.value = false
  }
}
</script>