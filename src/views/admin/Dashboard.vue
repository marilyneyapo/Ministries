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
       <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

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
/* Transition plus fluide et professionnelle */
.fade-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(1.02);
}

/* Animation pour le main content */
main {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Amélioration de l'overlay */
.fixed.inset-0.bg-black\/50 {
  transition: opacity 0.3s ease-in-out;
  backdrop-filter: blur(2px);
}
</style>