<template>
  <section class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8">
    
    <!-- En-tête avec gradient -->
    <div class="bg-gray-200 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-black">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold mb-2">Gestion des Événements</h1>
          <p class="text-black">Organisez et planifiez les événements de l'église</p>
        </div>
        <button 
          @click="openForm(null)" 
          class="bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Nouvel événement
        </button>
      </div>
    </div>

    <!-- Statistiques  -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Total événements -->
      <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Événements</p>
            <p class="text-4xl font-bold text-gray-800 mt-2">{{ evenements.length }}</p>
            <p class="text-sm text-gray-500 mt-1">Tous les événements</p>
          </div>
          <div class="bg-purple-100 p-4 rounded-2xl">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Événements à venir -->
      <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 transform hover:scale-105 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">À Venir</p>
            <p class="text-4xl font-bold text-gray-800 mt-2">{{ upcomingEvents }}</p>
            <p class="text-sm text-gray-500 mt-1">Prochains événements</p>
          </div>
          <div class="bg-green-100 p-4 rounded-2xl">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Ce mois-ci -->
      <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Ce Mois-ci</p>
            <p class="text-4xl font-bold text-gray-800 mt-2">{{ thisMonthEvents }}</p>
            <p class="text-sm text-gray-500 mt-1">Événements du mois</p>
          </div>
          <div class="bg-blue-100 p-4 rounded-2xl">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtres et recherche -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div class="flex items-center gap-2 mb-4">
        <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-800">Recherche et Filtres</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Rechercher un événement..."
            class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Type d'événement</label>
          <select v-model="filterType" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none transition-colors">
            <option value="">Tous les types</option>
            <option value="Concert">Concert</option>
            <option value="Baptême">Baptême</option>
            <option value="Mariage">Mariage</option>
            <option value="Conférence">Conférence</option>
            <option value="Retraite">Retraite</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Liste des événements -->
    <div v-if="filteredEvents.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="event in filteredEvents" 
        :key="event.id" 
        class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
        
        <div class="relative h-48 overflow-hidden bg-gray-100">
          <img 
            v-if="event.image" 
            :src="event.image" 
            alt="Image de l'événement" 
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          
          <!-- Badge type -->
          <div class="absolute top-3 left-3">
            <span class="px-3 py-1 bg-white bg-opacity-90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800">
              {{ getEventIcon(event.type) }} {{ event.type }}
            </span>
          </div>

          <!-- Actions en hover -->
          <div class="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              @click="openForm(event)" 
              class="p-2 bg-white bg-opacity-90 backdrop-blur-sm hover:bg-blue-500 hover:text-white rounded-lg transition-all shadow-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button 
              @click="deleteEvent(event.id)" 
              class="p-2 bg-white bg-opacity-90 backdrop-blur-sm hover:bg-red-500 hover:text-white rounded-lg transition-all shadow-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Contenu de la carte -->
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">{{ event.titre }}</h2>
          <p class="text-gray-600 mb-4 line-clamp-2">{{ event.description }}</p>
          
          <div class="space-y-2">
            <div class="flex items-center gap-3 text-gray-700">
              <div class="bg-purple-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                <p class="font-semibold">{{ formatDate(event.date) }}</p>
              </div>
            </div>

            <!-- Badge statut -->
            <div class="pt-2">
              <span :class="getStatusBadge(event.date).class" class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold">
                {{ getStatusBadge(event.date).text }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Message si aucun événement -->
    <div v-else class="text-center py-20">
      <div class="inline-block p-6 bg-white rounded-full shadow-lg mb-4">
        <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-800 mb-2">Aucun événement trouvé</h3>
      <p class="text-gray-600 mb-6">Modifiez vos filtres ou ajoutez un nouvel événement</p>
      <button 
        @click="openForm(null)"
        class="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all shadow-lg">
        Créer mon premier événement
      </button>
    </div>

    <!-- Modal formulaire (à intégrer) -->
    <div v-if="showForm" class="fixed inset-0  backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <!-- En-tête du modal -->
        <div class="bg-gradient-to-r from-purple-600 to-cyan-600 p-6 text-white rounded-t-2xl">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold flex items-center gap-2">
              <span v-if="!selectedEvent">➕</span>
              <span v-else>✏️</span>
              {{ selectedEvent ? 'Modifier' : 'Nouvel' }} événement
            </h2>
            <button @click="closeForm" class="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="saveEvent" class="p-6 ">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Titre de l'événement *</label>
              <input 
                v-model="eventForm.titre"
                type="text" 
                class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none transition-colors" 
                placeholder="Ex: Concert de Noël"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <textarea 
                v-model="eventForm.description"
                rows="4"
                class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none transition-colors" 
                placeholder="Décrivez l'événement..."
                required
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Type *</label>
                <select v-model="eventForm.type" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none transition-colors" required>
                  <option value="Concert">Concert</option>
                  <option value="Baptême">Baptême</option>
                  <option value="Mariage">Mariage</option>
                  <option value="Conférence">Conférence</option>
                  <option value="Retraite">Retraite</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                <input 
                  v-model="eventForm.date"
                  type="date" 
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none transition-colors" 
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Image (URL)</label>
              <input 
                v-model="eventForm.image"
                type="url" 
                class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-500 focus:outline-none transition-colors" 
                placeholder="https://exemple.com/image.jpg"
              />
            </div>
          </div>

          <!-- Boutons du formulaire -->
          <div class="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <button 
              type="button" 
              @click="closeForm" 
              class="px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all">
              Annuler
            </button>
            <button 
              type="submit" 
              class="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl">
              {{ selectedEvent ? 'Mettre à jour' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const evenements = ref([
  { id: 1, titre: 'Concert gospel', description: 'Concert au centre ville', type: 'Concert', date: '2025-12-25', image: null },
  { id: 2, titre: 'Baptême de Samuel', description: 'Baptême à l\'église centrale', type: 'Baptême', date: '2025-11-30', image: null },
  { id: 3, titre: 'Retraite spirituelle', description: 'Week-end de retraite à la montagne', type: 'Retraite', date: '2025-12-10', image: null }
])

const showForm = ref(false)
const selectedEvent = ref(null)
const searchQuery = ref('')
const filterType = ref('')

const eventForm = ref({
  titre: '',
  description: '',
  type: 'Concert',
  date: '',
  image: null
})

// Statistiques calculées
const upcomingEvents = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return evenements.value.filter(e => e.date >= today).length
})

const thisMonthEvents = computed(() => {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  return evenements.value.filter(e => {
    const eventDate = new Date(e.date)
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
  }).length
})

// Événements filtrés
const filteredEvents = computed(() => {
  return evenements.value.filter(event => {
    const matchesSearch = event.titre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = filterType.value === '' || event.type === filterType.value
    return matchesSearch && matchesType
  })
})

function getEventIcon(type) {
  const icons = {
    'Concert': '🎵',
    'Baptême': '💧',
    'Mariage': '💒',
    'Conférence': '📚',
    'Retraite': '⛰️',
    'Autre': '📋'
  }
  return icons[type] || '📅'
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

function getStatusBadge(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDate = new Date(dateStr + 'T00:00:00')
  
  if (eventDate < today) {
    return { text: '✓ Terminé', class: 'bg-gray-100 text-gray-700' }
  } else if (eventDate.toDateString() === today.toDateString()) {
    return { text: '🔴 Aujourd\'hui', class: 'bg-red-100 text-red-700' }
  } else {
    const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24))
    if (daysUntil <= 7) {
      return { text: `⚡ Dans ${daysUntil} jour${daysUntil > 1 ? 's' : ''}`, class: 'bg-orange-100 text-orange-700' }
    }
    return { text: '📅 À venir', class: 'bg-green-100 text-green-700' }
  }
}

function openForm(event) {
  selectedEvent.value = event
  if (event) {
    eventForm.value = { ...event }
  } else {
    eventForm.value = {
      titre: '',
      description: '',
      type: 'Concert',
      date: '',
      image: null
    }
  }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  selectedEvent.value = null
}

function saveEvent() {
  if (selectedEvent.value) {
    const index = evenements.value.findIndex(e => e.id === selectedEvent.value.id)
    evenements.value[index] = { ...eventForm.value, id: selectedEvent.value.id }
  } else {
    evenements.value.push({ id: Date.now(), ...eventForm.value })
  }
  closeForm()
}

function deleteEvent(id) {
  if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
    evenements.value = evenements.value.filter(e => e.id !== id)
  }
}
</script>