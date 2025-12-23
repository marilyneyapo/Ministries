<template>
  <header 
    :class="[ 
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-gray-200' 
        : 'bg-white border-gray-100'
    ]"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <img 
                src="/mercv.png" 
                alt="MERCV Logo" 
                class="w-6 h-6 object-contain"
              />
            </div>
            <div class="hidden sm:block">
              <h1 class="text-lg font-bold text-gray-900">MERCV</h1>
              <p class="text-xs text-gray-500 -mt-1">Jeunesse</p>
            </div>
          </div>
        </div>

        <!-- Navigation Desktop -->
        <div class="hidden md:flex md:items-center md:space-x-1">
          <a
            v-for="item in menuItems"
            :key="item.name"
            :href="item.link"
            @click.prevent="scrollToSection(item.link)"
            class="nav-link"
          >
            {{ item.name }}
          </a>
        </div>

        <!-- Actions utilisateur -->
        <div class="flex items-center gap-3">
          <!-- Section utilisateur connecté (desktop) -->
          <div v-if="authStore.isAuthenticated" class="hidden md:flex items-center gap-3">
            <!-- Notifications -->
            <button class="notification-btn">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.07 2.82l3.12 3.12c.944.944.944 2.475 0 3.419L8.5 14.04a1 1 0 01-.707.293H6v-1.793a1 1 0 01.293-.707l4.689-4.689c.944-.944 2.475-.944 3.419 0z"/>
              </svg>
              <span class="notification-badge">3</span>
            </button>

            <!-- Dropdown utilisateur -->
            <div class="relative">
              <button
                @click="showUserDropdown = !showUserDropdown"
                class="user-dropdown-btn"
              >
                <img
                  :src="authStore.user?.avatar || '/user.png'"
                  :alt="authStore.user?.name"
                  class="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                />
                <div class="hidden lg:block text-left">
                  <p class="text-sm font-medium text-gray-900">{{ authStore.user?.name }}</p>
                  <p class="text-xs text-gray-500">{{ authStore.user?.role || 'Membre' }}</p>
                </div>
                <svg class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': showUserDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Dropdown menu -->
              <div
                v-if="showUserDropdown"
                class="user-dropdown-menu"
              >
                <div class="dropdown-header">
                  <div class="flex items-center gap-3">
                    <img
                      :src="authStore.user?.avatar || '/user.png'"
                      :alt="authStore.user?.name"
                      class="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <p class="text-sm font-semibold text-gray-900">{{ authStore.user?.name }}</p>
                      <p class="text-xs text-gray-500">{{ authStore.user?.email }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="dropdown-content">
                  <router-link
                    to="/dashboard"
                    @click="showUserDropdown = false"
                    class="dropdown-item"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    <span>Tableau de bord</span>
                  </router-link>
                  
                  <router-link
                    to="/profile"
                    @click="showUserDropdown = false"
                    class="dropdown-item"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <span>Mon profil</span>
                  </router-link>

                  <div class="dropdown-divider"></div>
                  
                  <button
                    @click="handleLogout"
                    class="dropdown-item text-red-600 hover:bg-red-50"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                    </svg>
                    <span>Se déconnecter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Boutons de connexion (desktop) - si non connecté -->
          <div v-else class="hidden md:flex items-center gap-3">
            <router-link
              to="/login"
              class="login-btn"
            >
              Connexion
            </router-link>
            <router-link
              to="/register"
              class="register-btn"
            >
              S'inscrire
            </router-link>
          </div>

          <!-- Menu mobile toggle -->
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="mobile-menu-btn md:hidden"
            aria-label="Toggle menu"
          >
            <svg v-if="isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu Mobile -->
      <div
        :class="[ 
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-100',
          isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
        ]"
      >
        <div class="space-y-1">
          <!-- Navigation links -->
          <a
            v-for="item in menuItems"
            :key="item.name"
            :href="item.link"
            @click.prevent="scrollToSection(item.link)"
            class="mobile-nav-link"
          >
            {{ item.name }}
          </a>
          
          <!-- Section utilisateur mobile -->
          <div class="pt-4 mt-4 border-t border-gray-100">
            <!-- Si connecté -->
            <div v-if="authStore.isAuthenticated" class="space-y-2">
              <div class="flex items-center px-3 py-2 mb-3 bg-gray-50 rounded-lg">
                <img
                  :src="authStore.user?.avatar || '/user.png'"
                  :alt="authStore.user?.name"
                  class="w-10 h-10 rounded-full object-cover border-2 border-gray-200 mr-3"
                />
                <div>
                  <p class="text-sm font-semibold text-gray-900">{{ authStore.user?.name }}</p>
                  <p class="text-xs text-gray-500">{{ authStore.user?.email }}</p>
                </div>
              </div>
              
              <router-link
                to="/dashboard"
                @click="isMenuOpen = false"
                class="mobile-action-btn text-blue-600 hover:bg-blue-50"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <span>Tableau de bord</span>
              </router-link>
              
              <button
                @click="handleLogout"
                class="mobile-action-btn text-red-600 hover:bg-red-50"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                </svg>
                <span>Se déconnecter</span>
              </button>
            </div>

            <!-- Si non connecté -->
            <div v-else class="space-y-2">
              <router-link
                to="/login"
                @click="isMenuOpen = false"
                class="mobile-action-btn text-blue-600 hover:bg-blue-50"
              >
                <span>Connexion</span>
              </router-link>
              <router-link
                to="/register"
                @click="isMenuOpen = false"
                class="mobile-action-btn bg-blue-600 text-white hover:bg-blue-700"
              >
                <span>S'inscrire</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
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

<style scoped>
/* Navigation Links */
.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  color: #374151;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  text-decoration: none;
}

.nav-link:hover {
  color: #1d4ed8;
  background-color: #eff6ff;
}

/* Notification Button */
.notification-btn {
  position: relative;
  padding: 0.5rem;
  color: #6b7280;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.notification-btn:hover {
  color: #374151;
  background-color: #f9fafb;
}

.notification-badge {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 1.25rem;
  height: 1.25rem;
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* User Dropdown */
.user-dropdown-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.75rem;
  transition: all 0.2s;
}

.user-dropdown-btn:hover {
  background-color: #f9fafb;
}

.user-dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
  width: 16rem;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #e5e7eb;
  z-index: 50;
  overflow: hidden;
}

.dropdown-header {
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  background-color: #f9fafb;
}

.dropdown-content {
  padding: 0.5rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  color: #374151;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 0.5rem 0;
}

/* Auth Buttons */
.login-btn {
  padding: 0.5rem 1rem;
  color: #1d4ed8;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  text-decoration: none;
}

.login-btn:hover {
  background-color: #eff6ff;
}

.register-btn {
  padding: 0.5rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  text-decoration: none;
}

.register-btn:hover {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* Mobile Menu */
.mobile-menu-btn {
  padding: 0.5rem;
  color: #374151;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.mobile-menu-btn:hover {
  background-color: #f3f4f6;
}

.mobile-nav-link {
  display: block;
  padding: 0.75rem;
  color: #374151;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s;
  text-decoration: none;
}

.mobile-nav-link:hover {
  background-color: #f3f4f6;
  color: #1d4ed8;
}

.mobile-action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
}

.mobile-action-btn:hover {
  background-color: #f3f4f6;
}
</style>