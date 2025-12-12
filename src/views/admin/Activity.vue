<template>
  <div class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <div class="container mx-auto p-4 md:p-8">
      <!-- Header avec gradient -->
      <div class="bg-gray-200 rounded-2xl shadow-xl p-8 mb-8 text-black">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold mb-2">Activités de l'Église</h1>
            <p class="text-indigo-100">Gestion et planification des événements</p>
          </div>
          <button 
            @click="openForm()"
            class="bg-white text-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold flex items-center gap-2">
            <span class="text-xl">+</span>
            Nouvelle activité
          </button>
        </div>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-400">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Planifiées</p>
              <p class="text-3xl font-bold text-gray-800">{{ activities.filter(a => a.statut === 'planifie').length }}</p>
            </div>
            <div class="bg-yellow-100 p-3 rounded-full">
              <span class="text-2xl">📅</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-400">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">En cours</p>
              <p class="text-3xl font-bold text-gray-800">{{ activities.filter(a => a.statut === 'enCours').length }}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <span class="text-2xl">⏳</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-400">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Terminées</p>
              <p class="text-3xl font-bold text-gray-800">{{ activities.filter(a => a.statut === 'termine').length }}</p>
            </div>
            <div class="bg-green-100 p-3 rounded-full">
              <span class="text-2xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtres  -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-xl">🔍</span>
          <h3 class="text-lg font-semibold text-gray-800">Filtres</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type d'activité</label>
            <select v-model="filterType" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition-colors">
              <option value="">Tous les types</option>
              <option value="evangelisation">Évangélisation</option>
              <option value="nettoyage">Nettoyage</option>
              <option value="visite">Visite</option>
              <option value="reunion">Réunion</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
            <select v-model="filterStatus" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition-colors">
              <option value="">Tous les statuts</option>
              <option value="planifie">📅 Planifié</option>
              <option value="enCours">⏳ En cours</option>
              <option value="termine">✅ Terminé</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
            <input 
              type="text" 
              v-model="search" 
              placeholder="Nom de l'activité..."
              class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <!-- Liste des activités  -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="activite in filteredActivities" 
          :key="activite.id" 
          class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
          
          <!-- En-tête coloré selon le type -->
          <div :class="getTypeGradient(activite.type)" class="p-4 text-white">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-2xl">{{ getTypeIcon(activite.type) }}</span>
                <span class="text-sm font-medium uppercase tracking-wide">{{ getTypeLabel(activite.type) }}</span>
              </div>
              <div class="flex gap-2">
                <button 
                  @click="editActivity(activite)" 
                  class="bg-green-200 bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-all">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button 
                  @click="deleteActivity(activite.id)" 
                  class="bg-red-200 bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-all">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Contenu de la card -->
          <div class="p-5">
            <h3 class="font-bold text-xl text-gray-800 mb-4">{{ activite.nom }}</h3>
            
            <div class="space-y-3 mb-4">
              <div class="flex items-center gap-3 text-gray-600">
                <div class="bg-indigo-100 p-2 rounded-lg">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <span class="font-medium">{{ formatDate(activite.date) }} à {{ activite.heure }}</span>
              </div>
              
              <div class="flex items-center gap-3 text-gray-600">
                <div class="bg-purple-100 p-2 rounded-lg">
                  <svg class="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <span><span class="font-semibold">Responsable:</span> {{ activite.responsable }}</span>
              </div>
              
              <div class="flex items-center gap-3 text-gray-600">
                <div class="bg-green-100 p-2 rounded-lg">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <span><span class="font-semibold">{{ activite.participants.length }}</span> participant(s)</span>
              </div>
            </div>

            <!-- Badge de statut -->
            <div class="flex justify-end">
              <span :class="getStatusClass(activite.statut)" class="px-4 py-2 rounded-full text-sm font-semibold">
                {{ getStatusLabel(activite.statut) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Message si aucune activité -->
      <div v-if="filteredActivities.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">📭</div>
        <p class="text-xl text-gray-600 font-medium">Aucune activité trouvée</p>
        <p class="text-gray-500 mt-2">Modifiez vos filtres ou ajoutez une nouvelle activité</p>
      </div>

      <!-- Modal de formulaire -->
      <div v-if="showForm" class="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <!-- En-tête du modal -->
          <div class="bg-gradient-to-r from-indigo-600 to-cyan-600 p-6 text-white rounded-t-2xl">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold flex items-center gap-2">
                <span v-if="!editingActivity">➕</span>
                <span v-else>✏️</span>
                {{ editingActivity ? 'Modifier' : 'Nouvelle' }} activité
              </h2>
              <button @click="closeForm" class="hover:bg-green-200 hover:bg-opacity-20 p-2 rounded-lg transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
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
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition-colors" 
                  placeholder="Ex: Culte du dimanche"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Type d'activité *</label>
                <select v-model="form.type" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition-colors" required>
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
                    class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition-colors" 
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Heure *</label>
                  <input 
                    v-model="form.heure" 
                    type="time" 
                    class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition-colors" 
                    required
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Responsable *</label>
                <input 
                  v-model="form.responsable" 
                  type="text" 
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition-colors" 
                  placeholder="Nom du responsable"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Participants</label>
                <input 
                  v-model="form.participantsStr" 
                  type="text" 
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition-colors" 
                  placeholder="Séparés par des virgules (ex: Jean, Marie, Paul)"
                />
                <p class="text-sm text-gray-500 mt-1">Séparez les noms par des virgules</p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Statut *</label>
                <select v-model="form.statut" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition-colors" required>
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
                class="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
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
import { ref, computed } from 'vue'

const showForm = ref(false)
const editingActivity = ref(null)
const filterType = ref('')
const filterStatus = ref('')
const search = ref('')

const activities = ref([
  { id: 1, nom: "Nettoyage de l'église", type: "nettoyage", date: "2025-11-23", heure: "9:00", responsable: "Marie", participants: ["Jean", "Paul"], statut: "planifie" },
  { id: 2, nom: "Évangélisation quartier Nord", type: "evangelisation", date: "2025-11-23", heure: "8:00", responsable: "Jean", participants: ["Marie"], statut: "planifie" },
  { id: 3, nom: "Visite orphelinat", type: "visite", date: "2025-11-24", heure: "15:00", responsable: "Comité Social", participants: ["Paul"], statut: "planifie" },
])

const form = ref({
  nom: '',
  type: 'evangelisation',
  date: '',
  heure: '',
  responsable: '',
  participantsStr: '',
  statut: 'planifie',
})

const filteredActivities = computed(() => {
  return activities.value.filter(a => 
    (filterType.value === '' || a.type === filterType.value) &&
    (filterStatus.value === '' || a.statut === filterStatus.value) &&
    (search.value === '' || a.nom.toLowerCase().includes(search.value.toLowerCase()))
  )
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

function getTypeGradient(type) {
  const gradients = {
    evangelisation: 'bg-gradient-to-r from-purple-500 to-purple-600',
    nettoyage: 'bg-gradient-to-r from-green-500 to-green-600',
    visite: 'bg-gradient-to-r from-blue-500 to-blue-600',
    reunion: 'bg-gradient-to-r from-orange-500 to-orange-600'
  }
  return gradients[type] || 'bg-gradient-to-r from-gray-500 to-gray-600'
}

function getStatusClass(status) {
  const classes = {
    planifie: 'bg-yellow-100 text-yellow-800',
    enCours: 'bg-blue-100 text-blue-800',
    termine: 'bg-green-100 text-green-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

function getStatusLabel(status) {
  const labels = {
    planifie: '📅 Planifié',
    enCours: '⏳ En cours',
    termine: '✅ Terminé'
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
  const participants = form.value.participantsStr ? form.value.participantsStr.split(',').map(p => p.trim()) : []
  if (editingActivity.value) {
    Object.assign(editingActivity.value, { ...form.value, participants })
  } else {
    const newActivity = { id: Date.now(), ...form.value, participants }
    activities.value.push(newActivity)
  }
  closeForm()
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

function deleteActivity(id) {
  if (confirm("Voulez-vous vraiment supprimer cette activité ?")) {
    activities.value = activities.value.filter(a => a.id !== id)
  }
}
</script>