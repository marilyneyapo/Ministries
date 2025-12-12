<template>
  <div>
    <header 
      :class="[ 
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white shadow-sm'
      ]"
    >
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <div class="flex items-center gap-3">
              <img 
                src="/mercv.png" 
                alt="Logo" 
                class="w-12 h-12 object-contain rounded-lg transform hover:scale-105 transition-transform duration-300"
              />
              
            </div>
          </div>

          <!-- Navigation Desktop -->
          <div class="hidden md:flex md:items-center md:space-x-1">
            <a
              v-for="item in menuItems"
              :key="item.name"
              :href="item.link"
              @click.prevent="scrollToSection(item.link)"
              class="relative px-4 py-2 text-gray-700 font-medium text-base group"
            >
              <span class="relative z-10 transition-colors duration-300 group-hover:text-blue-600">
                {{ item.name }}
              </span>
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          <!-- Boutons d'action et Menu Mobile -->
          <div class="flex items-center gap-3">
            <!-- Section utilisateur connecté (desktop) -->
            <div v-if="authStore.isAuthenticated" class="hidden md:flex items-center gap-4">
              <!-- Dropdown utilisateur -->
              <div class="relative">
                <button
                  @click="showUserDropdown = !showUserDropdown"
                  class="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                >
                  <img
                    :src="authStore.user?.avatar || '/user.png'"
                    :alt="authStore.user?.name"
                    class="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
                  />
                  <span class="text-gray-700 font-medium">{{ authStore.user?.name }}</span>
                  <svg class="w-4 h-4 text-gray-500 transition-transform" :class="{ 'rotate-180': showUserDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                <!-- Dropdown menu -->
                <div
                  v-if="showUserDropdown"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                >
                  <div class="px-4 py-2 border-b border-gray-100">
                    <p class="text-sm font-medium text-gray-900">{{ authStore.user?.name }}</p>
                    <p class="text-xs text-gray-500">{{ authStore.user?.email }}</p>
                  </div>
                  
                  <router-link
                    to="/dashboard"
                    @click="showUserDropdown = false"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10z"></path>
                    </svg>
                    Tableau de bord
                  </router-link>
                  
                  <button
                    @click="handleLogout"
                    class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                    Se déconnecter
                  </button>
                </div>
              </div>
            </div>

            <!-- Boutons de connexion (desktop) - si non connecté -->
            <div v-else class="hidden md:flex items-center gap-2">
              <router-link
                to="/login"
                class="px-4 py-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Connexion
              </router-link>
              <router-link
                to="/register"
                class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
              >
                S'inscrire
              </router-link>
            </div>

            <button
              @click="isMenuOpen = !isMenuOpen"
              class="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <svg v-if="isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Menu Mobile -->
        <div
          :class="[ 
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          ]"
        >
          <div class="py-4 space-y-1">
            <a
              v-for="(item, index) in menuItems"
              :key="item.name"
              :href="item.link"
              @click.prevent="scrollToSection(item.link)"
              class="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:translate-x-2"
            >
              {{ item.name }}
            </a>
            
            <!-- Section utilisateur mobile -->
            <div class="pt-4 border-t border-gray-200 space-y-2">
              <!-- Si connecté -->
              <div v-if="authStore.isAuthenticated">
                <div class="flex items-center px-4 py-2 mb-3">
                  <img
                    :src="authStore.user?.avatar || '/user.png'"
                    :alt="authStore.user?.name"
                    class="w-10 h-10 rounded-full object-cover border-2 border-blue-200 mr-3"
                  />
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ authStore.user?.name }}</p>
                    <p class="text-xs text-gray-500">{{ authStore.user?.email }}</p>
                  </div>
                </div>
                
                <router-link
                  to="/dashboard"
                  @click="isMenuOpen = false"
                  class="flex items-center px-4 py-3 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all"
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10z"></path>
                  </svg>
                  Tableau de bord
                </router-link>
                
                <button
                  @click="handleLogout"
                  class="flex items-center w-full px-4 py-3 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-all"
                >
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  Se déconnecter
                </button>
              </div>

              <!-- Si non connecté -->
              <div v-else>
                <router-link
                  to="/login"
                  @click="isMenuOpen = false"
                  class="block px-4 py-3 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all"
                >
                  Connexion
                </router-link>
                <router-link
                  to="/register"
                  @click="isMenuOpen = false"
                  class="block px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-center"
                >
                  S'inscrire
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useNotification } from '../composables/useNotification.js'

const router = useRouter()
const authStore = useAuthStore()
const { success } = useNotification()

const isMenuOpen = ref(false)
const showUserDropdown = ref(false)
const scrolled = ref(false)

const menuItems = [
  { name: 'Accueil', link: '#accueil' },
  { name: 'À propos', link: '#apropos' },
  { name: 'Programmes', link: '#programmes' },
  { name: 'Actualites', link: '#actualites' },
  { name: 'Contact', link: '#contact' }
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const scrollToSection = (link) => {
  const element = document.querySelector(link)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    isMenuOpen.value = false
  }
}

const handleLogout = () => {
  authStore.logout()
  showUserDropdown.value = false
  isMenuOpen.value = false
  success('Déconnexion réussie !')
  
  // Rediriger vers la page d'accueil
  router.push('/')
}

// Fermer les dropdowns quand on clique ailleurs
const handleClickOutside = (event) => {
  if (showUserDropdown.value && !event.target.closest('.relative')) {
    showUserDropdown.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>
