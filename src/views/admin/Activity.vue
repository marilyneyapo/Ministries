<template>
  <div class="min-h-screen bg-gray-50">
    <!-- En-tête commun -->
    <AdminHeader
      title="Activités de l'Église"
      description="Gestion et planification des activités"
      icon="activities"
      :action-button="{ text: 'Nouvelle activité', icon: '+' }"
      @action-click="openForm()"
    />

    <div class="container mx-auto px-4 md:px-8 py-8">
      
      <!-- Statistiques rapides -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Total</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ activities.length }}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-xl">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Planifiées</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ plannedActivities }}</p>
            </div>
            <div class="bg-orange-100 p-3 rounded-xl">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">En cours</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ activeActivities }}</p>
            </div>
            <div class="bg-yellow-100 p-3 rounded-xl">
              <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Terminées</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ completedActivities }}</p>
            </div>
            <div class="bg-green-100 p-3 rounded-xl">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
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
              v-model="search"
              type="text" 
              placeholder="Nom de l'activité..."
              class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select v-model="filterType" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors">
              <option value="">Tous les types</option>
              <option value="evangelisation">Évangélisation</option>
              <option value="nettoyage">Nettoyage</option>
              <option value="visite">Visite</option>
              <option value="reunion">Réunion</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
            <select v-model="filterStatus" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors">
              <option value="">Tous les statuts</option>
              <option value="planifie">Planifiées</option>
              <option value="enCours">En cours</option>
              <option value="termine">Terminées</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Responsable</label>
            <input 
              v-model="filterResponsable"
              type="text" 
              placeholder="Nom du responsable..."
              class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <!-- Liste des activités -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Liste des Activités
            </h3>
            <span class="text-sm text-gray-600 bg-white px-3 py-1 rounded-full font-medium">
              {{ filteredActivities.length }} activité(s)
            </span>
          </div>
        </div>

        <div v-if="filteredActivities.length" class="divide-y divide-gray-200">
          <div 
            v-for="activite in filteredActivities" 
            :key="activite.id" 
            class="p-6 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-start justify-between">
              <!-- Informations principales -->
              <div class="flex items-start gap-4 flex-1">
                <!-- Icône et type -->
                <div class="flex-shrink-0">
                  <div :class="getTypeColorClass(activite.type)" class="w-12 h-12 rounded-xl flex items-center justify-center">
                    <span class="text-xl">{{ getTypeIcon(activite.type) }}</span>
                  </div>
                </div>

                <!-- Détails de l'activité -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h4 class="text-lg font-semibold text-gray-900 mb-1">{{ activite.nom }}</h4>
                      <p class="text-gray-600 text-sm">{{ getTypeLabel(activite.type) }}</p>
                    </div>
                    
                    <!-- Badge statut -->
                    <div class="flex-shrink-0 ml-4">
                      <span :class="getStatusBadgeClass(activite.statut)" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold">
                        {{ getStatusLabel(activite.statut) }}
                      </span>
                    </div>
                  </div>

                  <!-- Métadonnées -->
                  <div class="flex items-center gap-6 text-sm text-gray-500 mb-3">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span>{{ formatDate(activite.date) }} à {{ activite.heure }}</span>
                    </div>
                    
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      <span>{{ activite.responsable }}</span>
                    </div>
                    
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                      <span>{{ activite.participants.length }} participant(s)</span>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex items-center gap-2">
                    <!-- Modifier -->
                    <button 
                      @click="editActivity(activite)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      Modifier
                    </button>

                    <!-- Changer statut -->
                    <button 
                      v-if="activite.statut !== 'termine'"
                      @click="toggleActivityStatus(activite)"
                      :class="activite.statut === 'planifie' ? 
                        'bg-green-100 text-green-700 hover:bg-green-200' : 
                        'bg-orange-100 text-orange-700 hover:bg-orange-200'"
                      class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="activite.statut === 'planifie'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-10 5a9 9 0 1118 0 9 9 0 01-18 0z"/>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {{ activite.statut === 'planifie' ? 'Démarrer' : 'Terminer' }}
                    </button>

                    <!-- Supprimer -->
                    <button 
                      @click="deleteActivity(activite.id)"
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

        <!-- Message si aucune activité -->
        <div v-else class="text-center py-16">
          <div class="inline-block p-6 bg-gray-100 rounded-full mb-4">
            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Aucune activité trouvée</h3>
          <p class="text-gray-600 mb-6">Modifiez vos filtres ou créez une nouvelle activité</p>
          <button 
            @click="openForm()"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Créer une activité
          </button>
        </div>
      </div>

      <!-- Modal de formulaire -->
      <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <!-- En-tête du modal -->
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white rounded-t-2xl">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold flex items-center gap-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                {{ editingActivity ? 'Modifier' : 'Nouvelle' }} activité
              </h2>
              <button @click="closeForm" class="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Formulaire -->
          <form @submit.prevent="saveActivity" class="p-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nom de l'activité *</label>
                <input 
                  v-model="form.nom" 
                  type="text" 
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                  placeholder="Ex: Culte du dimanche"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Type d'activité *</label>
                <select v-model="form.type" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" required>
                  <option value="evangelisation">📖 Évangélisation</option>
                  <option value="nettoyage">🧹 Nettoyage</option>
                  <option value="visite">🏥 Visite</option>
                  <option value="reunion">👥 Réunion</option>
                </select>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input 
                    v-model="form.date" 
                    type="date" 
                    class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Heure *</label>
                  <input 
                    v-model="form.heure" 
                    type="time" 
                    class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                    required
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Responsable *</label>
                <input 
                  v-model="form.responsable" 
                  type="text" 
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                  placeholder="Nom du responsable"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Participants</label>
                <input 
                  v-model="form.participantsStr" 
                  type="text" 
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                  placeholder="Séparés par des virgules (ex: Jean, Marie, Paul)"
                />
                <p class="text-sm text-gray-500 mt-1">Séparez les noms par des virgules</p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Statut *</label>
                <select v-model="form.statut" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" required>
                  <option value="planifie">📅 Planifié</option>
                  <option value="enCours">⏳ En cours</option>
                  <option value="termine">✅ Terminé</option>
                </select>
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
                {{ editingActivity ? 'Mettre à jour' : 'Enregistrer' }}
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
import { useDataStore } from '../../stores/data.js'
import { useNotification } from '../../composables/useNotification.js'
import AdminHeader from '../../components/layout/AdminHeader.vue'

const dataStore = useDataStore()
const { success, error } = useNotification()

const showForm = ref(false)
const editingActivity = ref(null)
const filterType = ref('')
const filterStatus = ref('')
const filterResponsable = ref('')
const search = ref('')

const activities = computed(() => dataStore.activities)

const form = ref({
  nom: '',
  type: 'evangelisation',
  date: '',
  heure: '',
  responsable: '',
  participantsStr: '',
  statut: 'planifie',
})

onMounted(async () => {
  await dataStore.getActivities()
})

// Statistiques calculées
const plannedActivities = computed(() => {
  return activities.value.filter(a => a.statut === 'planifie').length
})

const activeActivities = computed(() => {
  return activities.value.filter(a => a.statut === 'enCours').length
})

const completedActivities = computed(() => {
  return activities.value.filter(a => a.statut === 'termine').length
})

const filteredActivities = computed(() => {
  let filtered = activities.value

  // Filtre par recherche
  if (search.value) {
    const query = search.value.toLowerCase()
    filtered = filtered.filter(a => 
      a.nom.toLowerCase().includes(query)
    )
  }

  // Filtre par type
  if (filterType.value) {
    filtered = filtered.filter(a => a.type === filterType.value)
  }

  // Filtre par statut
  if (filterStatus.value) {
    filtered = filtered.filter(a => a.statut === filterStatus.value)
  }

  // Filtre par responsable
  if (filterResponsable.value) {
    const query = filterResponsable.value.toLowerCase()
    filtered = filtered.filter(a => 
      a.responsable.toLowerCase().includes(query)
    )
  }

  // Trier par date (plus récents en premier)
  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

function getTypeIcon(type) {
  const icons = {
    evangelisation: '📖',
    nettoyage: '🧹',
    visite: '🏥',
    reunion: '👥'
  }
  return icons[type] || '📋'
}

function getTypeLabel(type) {
  const labels = {
    evangelisation: 'Évangélisation',
    nettoyage: 'Nettoyage',
    visite: 'Visite',
    reunion: 'Réunion'
  }
  return labels[type] || type
}

function getTypeColorClass(type) {
  const classes = {
    evangelisation: 'bg-purple-100 text-purple-600',
    nettoyage: 'bg-green-100 text-green-600',
    visite: 'bg-blue-100 text-blue-600',
    reunion: 'bg-orange-100 text-orange-600'
  }
  return classes[type] || 'bg-gray-100 text-gray-600'
}

function getStatusBadgeClass(status) {
  const classes = {
    planifie: 'bg-orange-100 text-orange-800',
    enCours: 'bg-yellow-100 text-yellow-800',
    termine: 'bg-green-100 text-green-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

function getStatusLabel(status) {
  const labels = {
    planifie: '📅 Planifiée',
    enCours: '⏳ En cours',
    termine: '✅ Terminée'
  }
  return labels[status] || status
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

function openForm() {
  showForm.value = true
  editingActivity.value = null
  form.value = {
    nom: '',
    type: 'evangelisation',
    date: '',
    heure: '',
    responsable: '',
    participantsStr: '',
    statut: 'planifie',
  }
}

function closeForm() {
  showForm.value = false
}

function saveActivity() {
  try {
    const participants = form.value.participantsStr ? form.value.participantsStr.split(',').map(p => p.trim()) : []
    const activityData = { 
      ...form.value, 
      participants,
      isActive: true
    }
    
    if (editingActivity.value) {
      dataStore.updateActivity(editingActivity.value.id, activityData)
      success('Activité mise à jour avec succès!')
    } else {
      dataStore.addActivity(activityData)
      success('Nouvelle activité créée avec succès!')
    }
    closeForm()
  } catch (err) {
    error('Erreur lors de la sauvegarde de l\'activité')
    console.error(err)
  }
}

function editActivity(activity) {
  editingActivity.value = activity
  form.value = {
    nom: activity.nom,
    type: activity.type,
    date: activity.date,
    heure: activity.heure,
    responsable: activity.responsable,
    participantsStr: activity.participants.join(', '),
    statut: activity.statut,
  }
  showForm.value = true
}

function toggleActivityStatus(activity) {
  const newStatus = activity.statut === 'planifie' ? 'enCours' : 'termine'
  const action = newStatus === 'enCours' ? 'démarrée' : 'terminée'
  
  if (confirm(`Voulez-vous marquer cette activité comme ${action} ?`)) {
    try {
      const updatedActivity = { 
        ...activity, 
        statut: newStatus
      }
      dataStore.updateActivity(activity.id, updatedActivity)
      success(`Activité ${action} avec succès !`)
    } catch (err) {
      error(`Erreur lors de la modification de l'activité`)
      console.error(err)
    }
  }
}

function deleteActivity(id) {
  if (confirm("Voulez-vous vraiment supprimer cette activité ?")) {
    try {
      dataStore.deleteActivity(id)
      success('Activité supprimée avec succès!')
    } catch (err) {
      error('Erreur lors de la suppression de l\'activité')
      console.error(err)
    }
  }
}
</script>