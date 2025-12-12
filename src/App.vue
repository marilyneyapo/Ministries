<template>
  <div id="app">
    <router-view />
    <NotificationContainer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth.js'
import NotificationContainer from './components/ui/NotificationContainer.vue'

const authStore = useAuthStore()

onMounted(async () => {
  // Initialiser l'authentification au démarrage
  await authStore.initializeAuth()
})
</script>

<style>
/* Styles globaux si nécessaire */
#app {
  min-height: 100vh;
}
</style>