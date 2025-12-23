<template>
  <div class="bg-white shadow-lg border-b border-gray-200">
    <div class="container mx-auto px-4 md:px-8 py-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Titre et icône -->
        <div class="flex items-center gap-4 text-gray-800">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-2xl shadow-lg border border-indigo-200">
            <component :is="iconComponent" class="w-12 h-12 text-indigo-600 drop-shadow-sm" />
          </div>
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">{{ title }}</h1>
            <p class="text-gray-600 text-sm font-medium">{{ description }}</p>
          </div>
        </div>

        <!-- Actions à droite -->
        <div class="flex items-center gap-4">
          <!-- Barre de recherche -->
          <div v-if="showSearch" class="w-full md:w-auto">
            <div class="relative">
              <input 
                :value="searchValue" 
                @input="$emit('update:searchValue', $event.target.value)"
                type="text" 
                :placeholder="searchPlaceholder"
                class="w-full md:w-80 px-4 py-3 pl-10 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all text-gray-800"
              />
              <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>

          <!-- Bouton d'action principal -->
          <button 
            v-if="actionButton"
            @click="$emit('action-click')"
            class="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold flex items-center gap-2 whitespace-nowrap"
          >
            <span class="text-xl">{{ actionButton.icon }}</span>
            {{ actionButton.text }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'auto' // 'auto' pour détection automatique, ou spécifier: 'users', 'children', 'activities', etc.
  },
  showSearch: {
    type: Boolean,
    default: false
  },
  searchValue: {
    type: String,
    default: ''
  },
  searchPlaceholder: {
    type: String,
    default: 'Rechercher...'
  },
  actionButton: {
    type: Object,
    default: null
    // Format: { text: 'Nouveau', icon: '+' }
  }
})

const emit = defineEmits(['update:searchValue', 'action-click'])

// Système intelligent de détection d'icônes basé sur le titre
const iconComponent = computed(() => {
  // Si une icône spécifique est fournie, l'utiliser
  let iconKey = props.icon
  
  // Sinon, détecter automatiquement l'icône basée sur le titre
  if (!iconKey || iconKey === 'auto') {
    const title = props.title.toLowerCase()
    
    // Mapping intelligent des mots-clés vers les icônes
    if (title.includes('membre') || title.includes('utilisateur') || title.includes('user')) {
      iconKey = 'users'
    } else if (title.includes('enfant') || title.includes('jeune') || title.includes('child')) {
      iconKey = 'children'
    } else if (title.includes('activité') || title.includes('activity')) {
      iconKey = 'activities'
    } else if (title.includes('programme')) {
      iconKey = 'program'
    } else if (title.includes('événement') || title.includes('event') || title.includes('évènement')) {
      iconKey = 'events'
    } else if (title.includes('actualité') || title.includes('news') || title.includes('nouvelle')) {
      iconKey = 'news'
    } else if (title.includes('paramètre') || title.includes('setting') || title.includes('configuration')) {
      iconKey = 'settings'
    } else if (title.includes('dashboard') || title.includes('tableau') || title.includes('bord')) {
      iconKey = 'dashboard'
    } else if (title.includes('rapport') || title.includes('report') || title.includes('statistique')) {
      iconKey = 'reports'
    } else if (title.includes('finance') || title.includes('budget') || title.includes('dîme')) {
      iconKey = 'finance'
    } else if (title.includes('prière') || title.includes('prayer') || title.includes('intercession')) {
      iconKey = 'prayer'
    } else if (title.includes('musique') || title.includes('louange') || title.includes('worship')) {
      iconKey = 'music'
    } else {
      iconKey = 'default'
    }
    
    // Log pour debug (peut être retiré en production)
    console.log(`🎯 AdminHeader: Détection automatique d'icône pour "${props.title}" → "${iconKey}"`)
  }

  const icons = {
    // 👥 Icône personnalisée pour la gestion des membres - Groupe avec badge admin
    users: () => `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
      <circle cx="18" cy="6" r="3" fill="currentColor" opacity="0.3"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.5 6h3M18 4.5v3" stroke="white"/>
    </svg>`,
    
    // 💝 Icône personnalisée pour les enfants - Cœur avec silhouettes d'enfants
    children: () => `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      <circle cx="8" cy="10" r="1.5" fill="currentColor" opacity="0.6"/>
      <circle cx="16" cy="10" r="1.5" fill="currentColor" opacity="0.6"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 13h2M16 13h2" opacity="0.7"/>
    </svg>`,
    
    // ⭐ Icône personnalisée pour les activités - Calendrier avec étoile
    activities: () => `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      <path d="M12 15l-2-1.5L8 15l1-2.5L7 11h2.5L12 8.5 14.5 11H17l-2 1.5 1 2.5z" fill="currentColor" opacity="0.4"/>
      <circle cx="8" cy="11" r="1" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="11" r="1" fill="currentColor" opacity="0.3"/>
    </svg>`,
    
    // 🔔 Icône personnalisée pour les événements - Calendrier avec notification
    events: () => `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      <circle cx="19" cy="5" r="3" fill="currentColor" opacity="0.8"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.5 5h3M19 3.5v3" stroke="white"/>
      <rect x="9" y="13" width="6" height="4" rx="1" fill="currentColor" opacity="0.2"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 15h4M10 16h3"/>
    </svg>`,
    
    // 📰 Icône personnalisée pour les actualités - Journal avec plume
    news: () => `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
      <path d="M18 3l-1.5 1.5L18 6l1.5-1.5L18 3z" fill="currentColor" opacity="0.6"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16.5 4.5L15 6"/>
      <rect x="7" y="8" width="6" height="4" fill="currentColor" opacity="0.1"/>
    </svg>`,
    
    // ⚙️ Icône personnalisée pour les paramètres - Engrenage avec outils
    settings: () => `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
      <path d="M12 10v4M10 12h4" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
    </svg>`,
    
    // 📊 Icône personnalisée pour le dashboard - Graphiques avec indicateurs
    dashboard: () => `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      <circle cx="6" cy="16" r="1" fill="currentColor" opacity="0.6"/>
      <circle cx="12" cy="14" r="1" fill="currentColor" opacity="0.6"/>
      <circle cx="18" cy="10" r="1" fill="currentColor" opacity="0.6"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 15l6-2 6-4" opacity="0.5"/>
    </svg>`,
    
    // 📈 Icône personnalisée pour les rapports - Document avec graphique
    reports: () => `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 15v2M12 13v4M15 11v6" opacity="0.7"/>
      <circle cx="9" cy="15" r="1" fill="currentColor" opacity="0.4"/>
      <circle cx="12" cy="13" r="1" fill="currentColor" opacity="0.4"/>
      <circle cx="15" cy="11" r="1" fill="currentColor" opacity="0.4"/>
    </svg>`,
    
    // ✅ Icône personnalisée pour les programmes - Clipboard avec check
    program: () => `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>
      <circle cx="16" cy="8" r="2" fill="currentColor" opacity="0.3"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 8h2"/>
    </svg>`,
    
    // 🎯 Icône par défaut - Grille avec point central
    default: () => `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
      <circle cx="12" cy="14" r="2" fill="currentColor" opacity="0.4"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 14h4M12 12v4" opacity="0.6"/>
    </svg>`,

    // 💰 Icône pour les finances - Pièces avec graphique
    finance: () => `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
      <path d="M8 16l2-2 2 2 4-4" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
      <circle cx="8" cy="16" r="1" fill="currentColor" opacity="0.4"/>
      <circle cx="10" cy="14" r="1" fill="currentColor" opacity="0.4"/>
      <circle cx="12" cy="16" r="1" fill="currentColor" opacity="0.4"/>
      <circle cx="16" cy="12" r="1" fill="currentColor" opacity="0.4"/>
    </svg>`,

    // 🙏 Icône pour la prière - Mains jointes avec rayons
    prayer: () => `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      <path d="M12 2l1 2-1 2-1-2 1-2z" fill="currentColor" opacity="0.6"/>
      <path d="M8 4l0.5 1.5L8 7l-0.5-1.5L8 4z" fill="currentColor" opacity="0.4"/>
      <path d="M16 4l0.5 1.5L16 7l-0.5-1.5L16 4z" fill="currentColor" opacity="0.4"/>
      <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.3"/>
    </svg>`,

    // 🎵 Icône pour la musique - Note avec onde sonore
    music: () => `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
      <path d="M3 8c1 0 2-1 3-1s2 1 3 1" stroke="currentColor" stroke-width="1" opacity="0.5"/>
      <path d="M3 11c1 0 2-1 3-1s2 1 3 1" stroke="currentColor" stroke-width="1" opacity="0.4"/>
      <path d="M3 14c1 0 2-1 3-1s2 1 3 1" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    </svg>`
  }
  
  return {
    template: icons[iconKey] || icons.default
  }
})
</script>