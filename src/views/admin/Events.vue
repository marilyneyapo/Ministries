<template>
  <div class="min-h-screen bg-gray-50">
    <!-- En-tête commun -->
    <AdminHeader
      title="Gestion des Événements"
      description="Organisez et planifiez les événements de l'église"
      icon="events"
      :action-button="{ text: 'Nouvel événement', icon: '+' }"
      @action-click="openForm(null)"
    />

    <div class="container mx-auto px-4 md:px-8 py-8">
      
      <!-- Statistiques rapides -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Total</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ evenements.length }}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-xl">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">À venir</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ upcomingEvents }}</p>
            </div>
            <div class="bg-green-100 p-3 rounded-xl">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Suspendus</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ suspendedEvents }}</p>
            </div>
            <div class="bg-orange-100 p-3 rounded-xl">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Annulés</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ cancelledEvents }}</p>
            </div>
            <div class="bg-red-100 p-3 rounded-xl">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtres et recherche -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="flex items-center gap-2 mb-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
          </svg>
          <h3 class="text-lg font-semibold text-gray-800">Filtres et Recherche</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Titre ou description..."
              class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select v-model="filterType" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors">
              <option value="">Tous les types</option>
              <option value="Concert">Concert</option>
              <option value="Baptême">Baptême</option>
              <option value="Mariage">Mariage</option>
              <option value="Conférence">Conférence</option>
              <option value="Retraite">Retraite</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
            <select v-model="filterStatus" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors">
              <option value="">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="suspended">Suspendus</option>
              <option value="cancelled">Annulés</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Période</label>
            <select v-model="filterPeriod" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors">
              <option value="">Toutes les dates</option>
              <option value="upcoming">À venir</option>
              <option value="thisMonth">Ce mois</option>
              <option value="past">Passés</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Liste des événements -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Liste des Événements
            </h3>
            <span class="text-sm text-gray-600 bg-white px-3 py-1 rounded-full font-medium">
              {{ filteredEvents.length }} événement(s)
            </span>
          </div>
        </div>

        <div v-if="filteredEvents.length" class="divide-y divide-gray-200">
          <div 
            v-for="event in filteredEvents" 
            :key="event.id" 
            class="p-6 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-start justify-between">
              <!-- Informations principales -->
              <div class="flex items-start gap-4 flex-1">
                <!-- Icône et type -->
                <div class="flex-shrink-0">
                  <div :class="getTypeColorClass(event.type)" class="w-12 h-12 rounded-xl flex items-center justify-center">
                    <span class="text-xl">{{ getEventIcon(event.type) }}</span>
                  </div>
                </div>

                <!-- Détails de l'événement -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h4 class="text-lg font-semibold text-gray-900 mb-1">{{ event.titre }}</h4>
                      <p class="text-gray-600 text-sm line-clamp-2">{{ event.description }}</p>
                    </div>
                    
                    <!-- Badge statut -->
                    <div class="flex-shrink-0 ml-4">
                      <span :class="getStatusBadgeClass(event)" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold">
                        {{ getStatusText(event) }}
                      </span>
                    </div>
                  </div>

                  <!-- Métadonnées -->
                  <div class="flex items-center gap-6 text-sm text-gray-500 mb-3">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span>{{ formatDate(event.date) }}</span>
                    </div>
                    
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                      </svg>
                      <span>{{ event.type }}</span>
                    </div>
                    
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>{{ getDaysUntil(event.date) }}</span>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex items-center gap-2">
                    <!-- Modifier -->
                    <button 
                      @click="openForm(event)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      Modifier
                    </button>

                    <!-- Suspendre/Réactiver -->
                    <button 
                      v-if="!event.cancelled"
                      @click="toggleSuspendEvent(event)"
                      :class="event.suspended ? 
                        'bg-green-100 text-green-700 hover:bg-green-200' : 
                        'bg-orange-100 text-orange-700 hover:bg-orange-200'"
                      class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="event.suspended" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-10 5a9 9 0 1118 0 9 9 0 01-18 0z"/>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {{ event.suspended ? 'Réactiver' : 'Suspendre' }}
                    </button>

                    <!-- Annuler/Restaurer -->
                    <button 
                      @click="toggleCancelEvent(event)"
                      :class="event.cancelled ? 
                        'bg-blue-100 text-blue-700 hover:bg-blue-200' : 
                        'bg-red-100 text-red-700 hover:bg-red-200'"
                      class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="event.cancelled" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {{ event.cancelled ? 'Restaurer' : 'Annuler' }}
                    </button>

                    <!-- Supprimer -->
                    <button 
                      @click="deleteEvent(event.id)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors text-sm font-medium"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message si aucun événement -->
        <div v-else class="text-center py-16">
          <div class="inline-block p-6 bg-gray-100 rounded-full mb-4">
            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Aucun événement trouvé</h3>
          <p class="text-gray-600 mb-6">Modifiez vos filtres ou créez un nouvel événement</p>
          <button 
            @click="openForm(null)"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Créer un événement
          </button>
        </div>
      </div>

      <!-- Modal formulaire -->
      <div v-if="showForm" class="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <!-- En-tête du modal -->
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white rounded-t-2xl">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold flex items-center gap-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                {{ selectedEvent ? 'Modifier' : 'Nouvel' }} événement
              </h2>
              <button @click="closeForm" class="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Formulaire -->
          <form @submit.prevent="saveEvent" class="p-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Titre de l'événement *</label>
                <input 
                  v-model="eventForm.titre"
                  type="text" 
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                  placeholder="Ex: Concert de Noël"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea 
                  v-model="eventForm.description"
                  rows="4"
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                  placeholder="Décrivez l'événement..."
                  required
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Type *</label>
                  <select v-model="eventForm.type" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" required>
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
                    class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                    required
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Image (URL)</label>
                <input 
                  v-model="eventForm.image"
                  type="url" 
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
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
                class="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
                {{ selectedEvent ? 'Mettre à jour' : 'Créer' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useEventsStore } from '../../stores/events.js'
import { useNotification } from '../../composables/useNotification.js'
import AdminHeader from '../../components/layout/AdminHeader.vue'

const eventsStore = useEventsStore()
const { success, error } = useNotification()

// État local
const showForm = ref(false)
const selectedEvent = ref(null)
const searchQuery = ref('')
const filterType = ref('')
const filterStatus = ref('')
const filterPeriod = ref('')

// Formulaire
const eventForm = ref({
  titre: '',
  description: '',
  type: 'Concert',
  date: '',
  image: null,
  suspended: false,
  cancelled: false
})

// Données calculées
const evenements = computed(() => eventsStore.events || [])

// Statistiques
const upcomingEvents = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return evenements.value.filter(e => e.date >= today && !e.cancelled && !e.suspended).length
})

const suspendedEvents = computed(() => {
  return evenements.value.filter(e => e.suspended && !e.cancelled).length
})

const cancelledEvents = computed(() => {
  return evenements.value.filter(e => e.cancelled).length
})

// Événements filtrés
const filteredEvents = computed(() => {
  let filtered = evenements.value

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(event => 
      event.titre.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query)
    )
  }

  // Filtre par type
  if (filterType.value) {
    filtered = filtered.filter(event => event.type === filterType.value)
  }

  // Filtre par statut
  if (filterStatus.value) {
    switch (filterStatus.value) {
      case 'active':
        filtered = filtered.filter(event => !event.suspended && !event.cancelled)
        break
      case 'suspended':
        filtered = filtered.filter(event => event.suspended && !event.cancelled)
        break
      case 'cancelled':
        filtered = filtered.filter(event => event.cancelled)
        break
    }
  }

  // Filtre par période
  if (filterPeriod.value) {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    switch (filterPeriod.value) {
      case 'upcoming':
        filtered = filtered.filter(event => new Date(event.date) >= today)
        break
      case 'thisMonth':
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date)
          return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
        })
        break
      case 'past':
        filtered = filtered.filter(event => new Date(event.date) < today)
        break
    }
  }

  // Trier par date (plus récents en premier)
  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

// Fonctions utilitaires
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

function getTypeColorClass(type) {
  const classes = {
    'Concert': 'bg-purple-100 text-purple-600',
    'Baptême': 'bg-blue-100 text-blue-600',
    'Mariage': 'bg-pink-100 text-pink-600',
    'Conférence': 'bg-green-100 text-green-600',
    'Retraite': 'bg-orange-100 text-orange-600',
    'Autre': 'bg-gray-100 text-gray-600'
  }
  return classes[type] || 'bg-gray-100 text-gray-600'
}

function getStatusBadgeClass(event) {
  if (event.cancelled) {
    return 'bg-red-100 text-red-800'
  }
  if (event.suspended) {
    return 'bg-orange-100 text-orange-800'
  }
  
  const today = new Date()
  const eventDate = new Date(event.date)
  
  if (eventDate < today) {
    return 'bg-gray-100 text-gray-800'
  } else if (eventDate.toDateString() === today.toDateString()) {
    return 'bg-blue-100 text-blue-800'
  } else {
    return 'bg-green-100 text-green-800'
  }
}

function getStatusText(event) {
  if (event.cancelled) {
    return '❌ Annulé'
  }
  if (event.suspended) {
    return '⏸️ Suspendu'
  }
  
  const today = new Date()
  const eventDate = new Date(event.date)
  
  if (eventDate < today) {
    return '✅ Terminé'
  } else if (eventDate.toDateString() === today.toDateString()) {
    return '🔴 Aujourd\'hui'
  } else {
    return '📅 À venir'
  }
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

function getDaysUntil(dateStr) {
  const today = new Date()
  const eventDate = new Date(dateStr + 'T00:00:00')
  const diffTime = eventDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return "Aujourd'hui"
  if (diffDays === 1) return "Demain"
  if (diffDays > 1) return `Dans ${diffDays} jours`
  if (diffDays === -1) return "Hier"
  return `Il y a ${Math.abs(diffDays)} jours`
}

// Actions sur les événements
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
      image: null,
      suspended: false,
      cancelled: false
    }
  }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  selectedEvent.value = null
}

function saveEvent() {
  try {
    if (selectedEvent.value) {
      eventsStore.updateEvent(selectedEvent.value.id, eventForm.value)
      success('Événement modifié avec succès !')
    } else {
      eventsStore.addEvent(eventForm.value)
      success('Nouvel événement créé avec succès !')
    }
    closeForm()
  } catch (err) {
    error('Erreur lors de la sauvegarde de l\'événement')
    console.error(err)
  }
}

function toggleSuspendEvent(event) {
  const action = event.suspended ? 'réactivé' : 'suspendu'
  const confirmMessage = event.suspended 
    ? 'Voulez-vous réactiver cet événement ?' 
    : 'Voulez-vous suspendre cet événement ?'
  
  if (confirm(confirmMessage)) {
    try {
      const updatedEvent = { 
        ...event, 
        suspended: !event.suspended,
        cancelled: false // Si on réactive, on annule l'annulation
      }
      eventsStore.updateEvent(event.id, updatedEvent)
      success(`Événement ${action} avec succès !`)
    } catch (err) {
      error(`Erreur lors de la modification de l'événement`)
      console.error(err)
    }
  }
}

function toggleCancelEvent(event) {
  const action = event.cancelled ? 'restauré' : 'annulé'
  const confirmMessage = event.cancelled 
    ? 'Voulez-vous restaurer cet événement ?' 
    : 'Voulez-vous annuler cet événement ?'
  
  if (confirm(confirmMessage)) {
    try {
      const updatedEvent = { 
        ...event, 
        cancelled: !event.cancelled,
        suspended: false // Si on restaure, on annule la suspension
      }
      eventsStore.updateEvent(event.id, updatedEvent)
      success(`Événement ${action} avec succès !`)
    } catch (err) {
      error(`Erreur lors de la modification de l'événement`)
      console.error(err)
    }
  }
}

function deleteEvent(id) {
  if (confirm('Voulez-vous vraiment supprimer définitivement cet événement ? Cette action est irréversible.')) {
    try {
      eventsStore.deleteEvent(id)
      success('Événement supprimé avec succès !')
    } catch (err) {
      error('Erreur lors de la suppression de l\'événement')
      console.error(err)
    }
  }
}

// Chargement initial
onMounted(async () => {
  await eventsStore.getEvents()
})
</script>