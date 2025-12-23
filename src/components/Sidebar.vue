<template>
  <aside
    :class="[
      'fixed md:sticky top-15 left-0 h-[calc(100vh-3.75rem)] bg-white shadow-lg z-50 overflow-y-auto border-r border-gray-200',
      'transition-transform duration-300 ease-in-out',
      'w-64 md:w-64',
      open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]"
  >
    <div class="p-6">
      <!-- Header -->
      <div class="mb-8 pb-6 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-bold text-gray-900">Dashboard</h1>
            <p class="text-xs text-gray-500">Administration</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="space-y-1">
        <!-- Statistiques -->
        <router-link 
          to="/dashboard/stats" 
          class="nav-item group"
          :class="{ 'nav-item-active': route.path.startsWith('/dashboard/stats') }"
        >
          <div class="nav-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <span class="nav-text">Statistiques</span>
        </router-link>

        <!-- Membres avec sous-menu -->
        <button 
          @click="toggleMenu('membres')" 
          class="nav-item group w-full text-left border-0 bg-transparent"
          :class="{ 
            'nav-item-active': openMenus.membres || isSubmenuActive('membres'),
            'nav-item-expanded': openMenus.membres 
          }"
        >
          <div class="nav-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <span class="nav-text">Membres</span>
          <svg 
            class="w-4 h-4 ml-auto transition-transform duration-200"
            :class="{ 'rotate-180': openMenus.membres }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        
        <!-- Sous-menu membres -->
        <div 
          v-show="openMenus.membres" 
          class="submenu-horizontal"
        >
          <router-link
            to="/dashboard/membres"
            class="submenu-item-horizontal"
            :class="{ 'submenu-item-active': route.path === '/dashboard/membres' }"
          >
            <div class="submenu-icon">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <span class="submenu-text">Liste des Membres</span>
          </router-link>
          
          <router-link
            to="/dashboard/children"
            class="submenu-item-horizontal"
            :class="{ 'submenu-item-active': route.path === '/dashboard/children' }"
          >
            <div class="submenu-icon">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            </div>
            <span class="submenu-text">Liste des Enfants</span>
          </router-link>
        </div>

        <!-- Événements -->
        <router-link 
          to="/dashboard/events" 
          class="nav-item group"
          :class="{ 'nav-item-active': route.path.startsWith('/dashboard/events') }"
        >
          <div class="nav-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <span class="nav-text">Événements</span>
        </router-link>

        <!-- Activités -->
        <router-link 
          to="/dashboard/activity" 
          class="nav-item group"
          :class="{ 'nav-item-active': route.path.startsWith('/dashboard/activity') }"
        >
          <div class="nav-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <span class="nav-text">Activités</span>
        </router-link>

        <!-- Actualités -->
        <router-link 
          to="/dashboard/actuality" 
          class="nav-item group"
          :class="{ 'nav-item-active': route.path.startsWith('/dashboard/actuality') }"
        >
          <div class="nav-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
            </svg>
          </div>
          <span class="nav-text">Actualités</span>
        </router-link>

        <!-- Programmes -->
        <router-link 
          to="/dashboard/programme" 
          class="nav-item group"
          :class="{ 'nav-item-active': route.path.startsWith('/dashboard/programme') }"
        >
          <div class="nav-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <span class="nav-text">Programmes</span>
        </router-link>

        <!-- Séparateur -->
        <div class="my-6 border-t border-gray-200"></div>

        <!-- Paramètres -->
        <router-link 
          to="/dashboard/settings" 
          class="nav-item group"
          :class="{ 'nav-item-active': route.path.startsWith('/dashboard/settings') }"
        >
          <div class="nav-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <span class="nav-text">Paramètres</span>
        </router-link>
      </nav>

      <!-- Footer info -->
      <div class="mt-8 pt-6 border-t border-gray-100">
        <div class="text-center">
          <p class="text-xs text-gray-400 font-medium">MERCV Dashboard</p>
          <p class="text-xs text-gray-400">v2.0</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const openMenus = ref({
  membres: false
})

defineProps({
  open: Boolean
})

defineEmits(['close'])

const toggleMenu = (menu) => {
  openMenus.value[menu] = !openMenus.value[menu]
}

// Fonction pour vérifier si un sous-menu est actif
const isSubmenuActive = (menu) => {
  if (menu === 'membres') {
    return route.path.startsWith('/dashboard/membres') || route.path.startsWith('/dashboard/children')
  }
  return false
}

// Ouvrir automatiquement le menu si on est sur une page du sous-menu
watch(() => route.path, (newPath) => {
  if (newPath.includes('/dashboard/membres') || newPath.includes('/dashboard/children')) {
    openMenus.value.membres = true
  }
}, { immediate: true })
</script>

<style scoped>
/* Navigation Items */
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  color: #374151;
  font-weight: 500;
  transition: all 0.2s;
  text-decoration: none;
}

/* Styles spécifiques pour les boutons nav-item */
button.nav-item {
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
}

.nav-item:hover {
  background-color: #f9fafb;
  color: #111827;
}

.nav-item-active {
  background-color: #eff6ff;
  color: #1d4ed8;
  font-weight: 600;
}

.nav-item-expanded {
  background-color: #f9fafb;
}

.nav-icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  flex: 1;
  font-size: 0.875rem;
}

/* Sous-menus */
/* Sous-menu horizontal */
.submenu-horizontal {
  margin-left: 2rem;
  margin-top: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid #dbeafe;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.submenu-item-horizontal {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  color: #4b5563;
  font-weight: 500;
  transition: all 0.2s;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
}

.submenu-item-horizontal:hover {
  background-color: #f9fafb;
  color: #111827;
}

.submenu-item-active {
  background-color: #eff6ff;
  color: #1d4ed8;
  font-weight: 600;
}

.submenu-text {
  font-size: 0.75rem;
  line-height: 1;
}

.submenu-icon {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Scrollbar */
aside {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
}

aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-text {
    font-size: 1rem;
  }
  
  .nav-item {
    padding: 0.75rem;
  }
}
</style>