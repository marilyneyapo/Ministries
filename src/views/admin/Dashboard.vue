<template>
  <div class="flex min-h-screen flex-col">
    <!-- Navbar avec toggle -->
    <Navdash @toggleSidebar="isSidebarOpen = !isSidebarOpen" />

    <div class="flex flex-1 relative">
      <!-- Overlay pour mobile (AVANT la Sidebar pour qu'il soit en dessous) -->
      <div 
        v-if="isSidebarOpen && isMobile"
        class="fixed inset-0 bg-black/50 z-40 md:hidden"
        @click="isSidebarOpen = false"
      ></div>

      <!-- Sidebar -->
      <Sidebar 
        :open="isSidebarOpen" 
        @close="isSidebarOpen = false"
      />

      <!-- Main -->
      <main
        class="flex-1 p-4 md:p-6 bg-gray-50 transition-all duration-300"
      >
       <transition name="fade-slide" mode="out-in">
            <router-view :key="$route.fullPath" />
        </transition>
      </main>
    </div>

    <footer class="bg-gray-200 text-gray-700 text-sm text-center py-2">
      &copy; 2025 Mon Dashboard. Tous droits réservés.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navdash from './Navdash.vue'
import Sidebar from '../../components/Sidebar.vue'

const isSidebarOpen = ref(false)
const isMobile = ref(false)

// Vérifie la largeur de l'écran
const checkScreen = () => {
  const mobile = window.innerWidth < 768
  isMobile.value = mobile
  
  // Ferme la sidebar automatiquement lors du passage en mode mobile
  if (mobile) {
    isSidebarOpen.value = false
  }
}

onMounted(() => {
  checkScreen() // Vérifier dès le montage
  window.addEventListener('resize', checkScreen)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen)
})
</script>
<style scoped>
    .fade-slide-enter-active, .fade-slide-leave-active {
    transition: all 0.3s ease;
    }
    .fade-slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
    }
    .fade-slide-enter-to {
    opacity: 1;
    transform: translateX(0);
    }
    .fade-slide-leave-from {
    opacity: 1;
    transform: translateX(0);
    }
    .fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
    }
</style>