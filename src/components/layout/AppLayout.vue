<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation principale -->
    <Navbar v-if="!isDashboard" />
    
    <!-- Contenu principal -->
    <main :class="{ 'pt-16': !isDashboard }">
      <slot />
    </main>
    
    <!-- Footer -->
    <Footer v-if="!isDashboard" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../Navbar.vue'
import Footer from '../../views/home/Footer.vue'

const route = useRoute()

const isDashboard = computed(() => {
  return route.path.startsWith('/dashboard')
})
</script>