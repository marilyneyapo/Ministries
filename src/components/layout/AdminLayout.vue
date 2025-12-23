<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-lg fixed h-full z-10">
      <!-- Logo/Titre -->
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-bold text-gray-800">Administration</h2>
        <p class="text-sm text-gray-600">Panneau de contrôle</p>
      </div>

      <!-- Navigation -->
      <nav class="mt-6">
        <div class="px-4 space-y-2">
          <router-link
            v-for="item in menuItems"
            :key="item.name"
            :to="item.path"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
            :class="{ 'bg-blue-50 text-blue-600 border-r-2 border-blue-600': $route.path === item.path }"
          >
            <component :is="item.iconComponent" class="w-5 h-5" />
            <span class="font-medium">{{ item.name }}</span>
            <span v-if="item.badge" class="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {{ item.badge }}
            </span>
          </router-link>
        </div>
      </nav>

      <!-- Actions rapides -->
      <div class="absolute bottom-6 left-4 right-4">
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
          <h3 class="font-semibold mb-2">Actions rapides</h3>
          <div class="space-y-2">
            <button class="w-full text-left text-sm hover:underline">
              📊 Voir les statistiques
            </button>
            <button class="w-full text-left text-sm hover:underline">
              📤 Exporter les données
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="flex-1 ml-64">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const menuItems = [
  {
    name: 'Membres',
    path: '/admin/membres',
    iconComponent: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>`
    }
  },
  {
    name: 'Enfants',
    path: '/admin/enfants',
    iconComponent: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>`
    }
  },
  {
    name: 'Activités',
    path: '/admin/activity',
    iconComponent: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>`
    }
  },
  {
    name: 'Paramètres',
    path: '/admin/settings',
    iconComponent: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>`
    }
  }
]
</script>

<style scoped>
.router-link-active {
  @apply bg-blue-50 text-blue-600;
}
</style>