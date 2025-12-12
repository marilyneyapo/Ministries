<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar :is-open="sidebarOpen" @toggle="toggleSidebar" />
    
    <!-- Contenu principal -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header du dashboard -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between px-6 py-4">
          <div class="flex items-center">
            <button
              @click="toggleSidebar"
              class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            >
              <Icon icon="heroicons:bars-3" class="h-6 w-6" />
            </button>
            <h1 class="ml-4 text-2xl font-semibold text-gray-900">
              {{ pageTitle }}
            </h1>
          </div>
          
          <!-- Actions utilisateur -->
          <div class="flex items-center space-x-4">
            <button class="p-2 text-gray-400 hover:text-gray-500">
              <Icon icon="heroicons:bell" class="h-6 w-6" />
            </button>
            
            <div class="relative">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
              >
                <img
                  :src="user?.avatar || '/user.png'"
                  :alt="user?.name"
                  class="h-8 w-8 rounded-full"
                />
                <span class="text-sm font-medium text-gray-700">
                  {{ user?.name }}
                </span>
                <Icon icon="heroicons:chevron-down" class="h-4 w-4 text-gray-400" />
              </button>
              
              <!-- Menu utilisateur -->
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profil
                </a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Paramètres
                </a>
                <hr class="my-1">
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Contenu de la page -->
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.js'
import Sidebar from '../Sidebar.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const sidebarOpen = ref(false)
const showUserMenu = ref(false)

const user = computed(() => authStore.user)

const pageTitle = computed(() => {
  const titles = {
    '/dashboard': 'Tableau de bord',
    '/dashboard/stats': 'Statistiques',
    '/dashboard/membres': 'Membres',
    '/dashboard/events': 'Événements',
    '/dashboard/children': 'Enfants',
    '/dashboard/programme': 'Activités',
    '/dashboard/actuality': 'Actualités',
    '/dashboard/activity': 'Activité'
  }
  return titles[route.path] || 'Dashboard'
})

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

// Fermer les menus quand on clique ailleurs
const handleClickOutside = (event) => {
  if (showUserMenu.value && !event.target.closest('.relative')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>