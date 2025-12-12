<template>
  <header class="navbar bg-white sticky top-0 z-60 shadow-md px-4 md:px-10 flex items-center justify-between backdrop-blur-lg bg-opacity-80 border-b border-gray-200 h-15">
    <!-- Left Section -->
    <div class="flex items-center gap-3"> 
      <!-- Mobile menu toggle --> 
      <button class="btn btn-ghost btn-circle md:hidden" @click="$emit('toggleSidebar')" aria-label="Menu">
        <Icon icon="mdi:menu" class="text-3xl text-gray-700" /> 
      </button>
     

      <div class="flex items-center gap-2">
        <img src="/mercv.png" alt="Logo" class="w-11 h-11 object-contain drop-shadow-sm" />
        <span class="font-semibold text-xl text-[#3636a6] hidden sm:inline tracking-wide">Mon Gestionnaire</span>
      </div>
    </div>

    <!-- Search (Desktop) -->
    <div class="flex-1 hidden md:flex justify-center">
      <div class="relative w-full max-w-xl">
        <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Rechercher..."
          class="input input-bordered w-full pl-12 rounded-full shadow-sm focus:ring-2 focus:ring-[#3636a6]"
        />
      </div>
    </div>

    <!-- Right Section -->
    <div class="flex items-center gap-3 md:gap-5 relative">
      <!-- Mobile Search Toggle -->
      <button class="btn btn-ghost btn-circle md:hidden" @click="showSearchMobile = !showSearchMobile" aria-label="Recherche">
        <Icon icon="mdi:magnify" class="text-2xl" />
      </button>

      <!-- Notifications -->
      <button class="btn btn-ghost btn-circle relative" aria-label="Notifications">
        <span class="text-2xl text-gray-600">🔔</span>
        <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
      </button>

      <!-- Avatar Dropdown -->
      <div class="relative">
        <button 
          class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200" 
          @click="isOpen = !isOpen"
        >
          <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200">
            <img 
              :src="authStore.user?.avatar || '/user.png'" 
              :alt="authStore.user?.name || 'User'"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="hidden md:block text-left">
            <p class="text-sm font-semibold text-gray-900">{{ authStore.user?.name || 'Utilisateur' }}</p>
            <p class="text-xs text-gray-500 capitalize">{{ authStore.user?.role || 'Membre' }}</p>
          </div>
          <Icon 
            icon="mdi:chevron-down" 
            class="text-gray-500 transition-transform duration-200"
            :class="{ 'rotate-180': isOpen }"
          />
        </button>

        <transition name="fade">
          <div
            v-if="isOpen"
            class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
          >
            <!-- En-tête du dropdown -->
            <div class="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200">
                  <img 
                    :src="authStore.user?.avatar || '/user.png'" 
                    :alt="authStore.user?.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ authStore.user?.name }}</p>
                  <p class="text-sm text-gray-600">{{ authStore.user?.email }}</p>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {{ authStore.user?.role }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Menu items -->
            <div class="py-2">
              <button
                @click="goToProfile"
                class="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Icon icon="mdi:account-circle" class="w-5 h-5 mr-3 text-gray-500" />
                Mon Profil
              </button>
              
              <button
                @click="goToSettings"
                class="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Icon icon="mdi:cog" class="w-5 h-5 mr-3 text-gray-500" />
                Paramètres
              </button>

              <router-link
                to="/"
                @click="closeDropdown"
                class="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Icon icon="mdi:home" class="w-5 h-5 mr-3 text-gray-500" />
                Retour à l'accueil
              </router-link>

              <hr class="my-2 border-gray-100">
              
              <button
                @click="handleLogout"
                class="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <span class="w-5 h-5 mr-3 text-red-500">🚪</span>
                Se déconnecter
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>

  <!-- Mobile Search -->
  <div v-if="showSearchMobile" class="px-4 pb-3 md:hidden bg-white shadow-sm border-b border-gray-200">
    <div class="relative w-full">
      <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
      <input type="text" placeholder="Rechercher..." class="input input-bordered w-full pl-10 rounded-full" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
// import { Icon } from '@iconify/vue'
import { useAuthStore } from '../../stores/auth.js'
import { useNotification } from '../../composables/useNotification.js'

defineEmits(['toggleSidebar'])

const router = useRouter()
const authStore = useAuthStore()
const { success, info } = useNotification()

const isOpen = ref(false)
const showSearchMobile = ref(false)

const handleLogout = () => {
  authStore.logout()
  isOpen.value = false
  success('Déconnexion réussie !')
  
  // Rediriger vers la page de connexion
  router.push('/login')
}

const goToProfile = () => {
  isOpen.value = false
  info('Fonctionnalité en cours de développement')
  // TODO: Implémenter la navigation vers le profil
}

const goToSettings = () => {
  isOpen.value = false
  info('Fonctionnalité en cours de développement')
  // TODO: Implémenter la navigation vers les paramètres
}

const closeDropdown = () => {
  isOpen.value = false
}

// Fermer le dropdown quand on clique ailleurs
const handleClickOutside = (event) => {
  if (isOpen.value && !event.target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>