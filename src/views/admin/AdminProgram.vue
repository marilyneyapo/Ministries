<template>
  <div class="min-h-screen bg-gray-50">
    <!-- En-tête commun -->
    <AdminHeader
      title="Gestion des Programmes"
      description="Organisez et planifiez les programmes de l'église"
      icon="program"
      :action-button="{ text: 'Nouveau programme', icon: '+' }"
      @action-click="openForm()"
    />

    <div class="container mx-auto px-4 md:px-8 py-8">
      
      <!-- Statistiques rapides -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Actifs</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ programmesActifs }}</p>
            </div>
            <div class="bg-green-100 p-3 rounded-xl">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Inactifs</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ programmesInactifs }}</p>
            </div>
            <div class="bg-red-100 p-3 rounded-xl">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Total</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ programmes.length }}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-xl">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
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
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Nom du programme..."
              class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
            <select v-model="filterStatus" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors">
              <option value="">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
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

      <!-- Liste des programmes -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Liste des Programmes
            </h3>
            <span class="text-sm text-gray-600 bg-white px-3 py-1 rounded-full font-medium">
              {{ filteredProgrammes.length }} programme(s)
            </span>
          </div>
        </div>

        <div v-if="filteredProgrammes.length" class="divide-y divide-gray-200">
          <div 
            v-for="programme in filteredProgrammes" 
            :key="programme.id" 
            class="p-6 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-start justify-between">
              <!-- Informations principales -->
              <div class="flex items-start gap-4 flex-1">
                <!-- Icône et statut -->
                <div class="flex-shrink-0">
                  <div :class="getStatusColorClass(programme.actif)" class="w-12 h-12 rounded-xl flex items-center justify-center">
                    <svg v-if="programme.actif" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>

                <!-- Détails du programme -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h4 class="text-lg font-semibold text-gray-900 mb-1">{{ programme.nom }}</h4>
                      <p class="text-gray-600 text-sm">Programme #{{ programme.id }}</p>
                    </div>
                    
                    <!-- Badge statut -->
                    <div class="flex-shrink-0 ml-4">
                      <span :class="getStatusBadgeClass(programme.actif)" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold">
                        <span :class="programme.actif ? 'bg-green-500' : 'bg-red-500'" class="w-2 h-2 rounded-full mr-2"></span>
                        {{ programme.actif ? 'Actif' : 'Inactif' }}
                      </span>
                    </div>
                  </div>

                  <!-- Métadonnées -->
                  <div class="flex items-center gap-6 text-sm text-gray-500 mb-3">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span>{{ formatDate(programme.date) }}</span>
                    </div>
                    
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      <span>{{ programme.responsable }}</span>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex items-center gap-2">
                    <!-- Modifier -->
                    <button 
                      @click="editProgramme(programme)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      Modifier
                    </button>

                    <!-- Activer/Désactiver -->
                    <button 
                      @click="toggleProgrammeStatus(programme)"
                      :class="programme.actif ? 
                        'bg-orange-100 text-orange-700 hover:bg-orange-200' : 
                        'bg-green-100 text-green-700 hover:bg-green-200'"
                      class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
                    >
                      <svg v-if="programme.actif" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-10 5a9 9 0 1118 0 9 9 0 01-18 0z"/>
                      </svg>
                      {{ programme.actif ? 'Désactiver' : 'Activer' }}
                    </button>

                    <!-- Supprimer -->
                    <button 
                      @click="deleteProgramme(programme.id)"
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

        <!-- Message si aucun programme -->
        <div v-else class="text-center py-16">
          <div class="inline-block p-6 bg-gray-100 rounded-full mb-4">
            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Aucun programme trouvé</h3>
          <p class="text-gray-600 mb-6">Modifiez vos filtres ou créez un nouveau programme</p>
          <button 
            @click="openForm()"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Créer un programme
          </button>
        </div>
      </div>
      <!-- Modal Formulaire -->
      <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <!-- En-tête du modal -->
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white rounded-t-2xl">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold flex items-center gap-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                {{ isEditing ? 'Modifier' : 'Nouveau' }} programme
              </h2>
              <button @click="closeForm" class="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Formulaire -->
          <form @submit.prevent="saveProgramme" class="p-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nom du programme *</label>
                <input 
                  v-model="programmeForm.nom" 
                  type="text"
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                  placeholder="Ex: École du Dimanche"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Responsable *</label>
                <input 
                  v-model="programmeForm.responsable" 
                  type="text"
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                  placeholder="Nom du responsable"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                <input 
                  v-model="programmeForm.date" 
                  type="date"
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                  required
                />
              </div>

              <div class="flex items-center p-4 bg-gray-50 rounded-lg">
                <input 
                  v-model="programmeForm.actif"
                  type="checkbox" 
                  id="actif"
                  class="w-5 h-5 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="actif" class="ml-3 text-sm font-medium text-gray-700">
                  Programme actif
                </label>
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
                {{ isEditing ? 'Mettre à jour' : 'Enregistrer' }}
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
import AdminHeader from '../../components/layout/AdminHeader.vue'

const programmes = ref([
  {
    id: 1,
    date: "2025-01-14",
    nom: "École du Dimanche",
    responsable: "Pasteur Jean Kouassi",
    actif: true
  }
])

const showForm = ref(false)
const isEditing = ref(false)
const searchQuery = ref('')
const filterStatus = ref('')
const filterResponsable = ref('')

const programmeForm = ref({
  id: null,
  nom: "",
  responsable: "",
  date: "",
  actif: true
})

const programmesActifs = computed(() => {
  return programmes.value.filter(p => p.actif).length
})

const programmesInactifs = computed(() => {
  return programmes.value.filter(p => !p.actif).length
})

const filteredProgrammes = computed(() => {
  let filtered = programmes.value

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.nom.toLowerCase().includes(query)
    )
  }

  // Filtre par statut
  if (filterStatus.value === 'active') {
    filtered = filtered.filter(p => p.actif === true)
  } else if (filterStatus.value === 'inactive') {
    filtered = filtered.filter(p => p.actif === false)
  }

  // Filtre par responsable
  if (filterResponsable.value) {
    const query = filterResponsable.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.responsable.toLowerCase().includes(query)
    )
  }

  // Trier par date (plus récents en premier)
  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

function getStatusColorClass(actif) {
  return actif ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
}

function getStatusBadgeClass(actif) {
  return actif ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

function openForm() {
  resetForm()
  showForm.value = true
  isEditing.value = false
}

function closeForm() {
  showForm.value = false
}

function resetForm() {
  programmeForm.value = {
    id: null,
    nom: "",
    responsable: "",
    date: "",
    actif: true
  }
}

function editProgramme(programme) {
  programmeForm.value = { ...programme }
  showForm.value = true
  isEditing.value = true
}

function saveProgramme() {
  if (!programmeForm.value.nom || !programmeForm.value.responsable || !programmeForm.value.date) {
    alert("Veuillez remplir tous les champs obligatoires")
    return
  }

  if (isEditing.value) {
    const index = programmes.value.findIndex(p => p.id === programmeForm.value.id)
    if (index !== -1) {
      programmes.value.splice(index, 1, { ...programmeForm.value })
    }
  } else {
    programmes.value.push({
      id: Date.now(),
      ...programmeForm.value
    })
  }

  closeForm()
}

function toggleProgrammeStatus(programme) {
  const action = programme.actif ? 'désactivé' : 'activé'
  
  if (confirm(`Voulez-vous ${programme.actif ? 'désactiver' : 'activer'} ce programme ?`)) {
    const index = programmes.value.findIndex(p => p.id === programme.id)
    if (index !== -1) {
      programmes.value[index] = { 
        ...programme, 
        actif: !programme.actif 
      }
    }
  }
}

function deleteProgramme(id) {
  if (confirm("Voulez-vous vraiment supprimer ce programme ?")) {
    programmes.value = programmes.value.filter(p => p.id !== id)
  }
}
</script>