<template>
  <aside
    :class="[
      'fixed md:sticky top-15 left-0 h-[calc(100vh-3.75rem)] bg-white shadow-lg z-50 text-black overflow-y-auto',
      'transition-transform duration-300 ease-in-out',
      'w-64 md:w-64',
      open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]"
  >
    <div class="p-6">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold tracking-wide items-center gap-2 inline-flex">
          <span class="text-4xl">🏠</span>
          DASHBOARD
        </h1>
      </div>

      <!-- Navigation -->
      <nav>
        <ul class="space-y-2">
          <!-- Statistiques -->
          <li>
            <router-link 
              to="/dashboard/stats" 
              class="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200"
              :class="{
                'active-link': route.path.startsWith('/dashboard/stats'),
                'hover:bg-green-50': !route.path.startsWith('/dashboard/stats')
              }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
              <span class="font-medium">Statistiques</span>
            </router-link>
          </li>

          <!-- Menu Item: Membres -->
          <li>
            <button 
              @click="toggleMenu('membres')" 
              class="w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group hover:bg-green-50"
              :class="{ 'active-link': openMenus.membres || isSubmenuActive(['membres', 'children']) }"
              :aria-expanded="openMenus.membres"
            >
              <div class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="font-medium hover:cursor-pointer">Membres</span>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 transform transition-transform duration-200"
                :class="{ 'rotate-180': openMenus.membres }"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Submenu membres -->
            <ul 
              v-show="openMenus.membres" 
              class="ml-6 mt-2 space-y-1 border-l-2 border-green-400 pl-4"
            >
              <li>
                <router-link
                  to="/dashboard/membres"
                  class="block p-2 rounded transition-colors text-xs"
                  :class="{
                    'active-submenu': route.path.startsWith('/dashboard/membres'),
                    'hover:bg-green-50 ': !route.path.startsWith('/dashboard/membres')
                  }"
                >
                  <span class="">📋 Liste des membres</span>
                </router-link>
              </li>
              <li>
                <router-link
                  to="/dashboard/children"
                  class="block p-2 rounded transition-colors text-xs"
                  :class="{
                    'active-submenu': route.path.startsWith('/dashboard/children'),
                    'hover:bg-green-50 ': !route.path.startsWith('/dashboard/children')
                  }"
                >
                  <span class="">📊 Gestion des Enfants</span>
                </router-link>
              </li>
            </ul>
          </li>

          <!-- Événements -->
          <li>
            <router-link 
              to="/dashboard/events" 
              class="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200"
              :class="{
                'active-link': route.path.startsWith('/dashboard/events'),
                'hover:bg-green-50 ': !route.path.startsWith('/dashboard/events')
              }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="font-medium">Événements</span>
            </router-link>
          </li>

          <!-- Activités -->
          <li>
            <router-link 
              to="/dashboard/activity" 
              class="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200"
              :class="{
                'active-link': route.path.startsWith('/dashboard/activity'),
                'hover:bg-green-50': !route.path.startsWith('/dashboard/activity')
              }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span class="font-medium ">Activités</span>
            </router-link>
          </li>

          <!-- Actualités -->
          <li>
            <router-link 
              to="/dashboard/actuality" 
              class="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200"
              :class="{
                'active-link': route.path.startsWith('/dashboard/actuality'),
                'hover:bg-green-50 ': !route.path.startsWith('/dashboard/actuality')
              }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span class="font-medium">Actualités</span>
            </router-link>
          </li>

          <!-- Programmes -->
          <li>
            <router-link 
              to="/dashboard/programme" 
              class="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200"
              :class="{
                'active-link': route.path.startsWith('/dashboard/programme'),
                'hover:bg-green-50 ': !route.path.startsWith('/dashboard/programme')
              }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>
              <span class="font-medium">Programmes</span>
            </router-link>
          </li>

          <!-- Paramètres -->
          <li>
            <router-link 
              to="/dashboard/settings" 
              class="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200"
              :class="{
                'active-link': route.path.startsWith('/dashboard/settings'),
                'hover:bg-green-50 hover:text-green-700': !route.path.startsWith('/dashboard/settings')
              }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="font-medium">Paramètres</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue';
// import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const openMenus = ref({
  membres: false
});

defineProps({
  open: Boolean
});

defineEmits(['close']);

const toggleMenu = (menu) => {
  openMenus.value[menu] = !openMenus.value[menu];
};

// Fonction pour vérifier si un sous-menu est actif
const isSubmenuActive = (paths) => {
  return paths.some(path => route.path.includes(`/dashboard/${path}`));
};

// Ouvrir automatiquement le menu si on est sur une page du sous-menu
watch(() => route.path, (newPath) => {
  if (newPath.includes('/dashboard/membres') || newPath.includes('/dashboard/children')) {
    openMenus.value.membres = true;
  }
}, { immediate: true });
</script>

<style scoped>
.active-link {
  background-color: #6de198;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(105, 142, 118, 0.3);
}

.active-submenu {
  background-color: #dcfce7;
  font-weight: 600;
  transition: fade;
}

.hover-underline:hover {
  text-decoration: underline;
}

aside {
  scrollbar-width: thin;
  scrollbar-color: rgba(162, 237, 189, 0.3) transparent;
}

aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background-color: rgba(186, 236, 204, 0.3);
  border-radius: 20px;
}

aside::-webkit-scrollbar-thumb:hover {
  background-color: rgba(181, 240, 203, 0.5);
}
</style>