<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-100 to-purple-100">

    <!-- En-tête -->
    <div class="bg-gray-200 shadow-xl">
      <div class="container mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3 text-black">
          <div class="bg-gray-400 bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl md:text-4xl font-bold">Gestion des Membres</h1>
            <p class="text-black text-sm">Administration et suivi des membres de l'église</p>
          </div>
        </div>
        <div class="w-full md:w-auto">
          <div class="relative">
            <input v-model="search" type="text" placeholder="Rechercher un membre..."
              class="w-full md:w-80 px-4 py-3 pl-10 rounded-xl border-2 border-white border-opacity-30 bg-white bg-opacity-90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:bg-white transition-all" />
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 md:px-8 py-8">

      <!-- Statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase">Total Membres</p>
              <p class="text-3xl font-bold text-gray-800 mt-1">{{ membres.length }}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-500 transform hover:scale-105 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase">Femmes</p>
              <p class="text-3xl font-bold text-gray-800 mt-1">{{ countByGroup(1) }}</p>
            </div>
            <div class="bg-pink-100 p-3 rounded-full">
              <span class="text-3xl">👩</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500 transform hover:scale-105 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase">Hommes</p>
              <p class="text-3xl font-bold text-gray-800 mt-1">{{ countByGroup(2) }}</p>
            </div>
            <div class="bg-indigo-100 p-3 rounded-full">
              <span class="text-3xl">👨</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase">Jeunesse</p>
              <p class="text-3xl font-bold text-gray-800 mt-1">{{ countByGroup(3) }}</p>
            </div>
            <div class="bg-purple-100 p-3 rounded-full">
              <span class="text-3xl">👦</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtres et actions -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex flex-wrap gap-2">
          <button @click="clearFilter"
            :class="activeGroupe === null ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            class="px-4 py-2 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md">
            Tous ({{ membres.length }})
          </button>
          <button v-for="g in groupes" :key="g.id" @click="filterGroupe(g.id)"
            :class="activeGroupe === g.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            class="px-4 py-2 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2">
            <span class="text-xl">{{ getGroupIcon(g.nom) }}</span>
            {{ g.nom }} ({{ countByGroup(g.id) }})
          </button>
        </div>

        <button @click="openForm"
          class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold flex items-center gap-2 whitespace-nowrap">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Nouveau membre
        </button>
      </div>

      <!-- Tableau -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Liste des membres
          </h2>
          <span class="text-sm text-gray-600 bg-white px-3 py-1 rounded-full font-semibold">
            {{ filteredMembers.length }} membre(s)
          </span>
        </div>

        <!-- Tableau Desktop -->
        <div class="hidden md:block overflow-x-auto">
          <table v-if="filteredMembers.length" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nom et Prénoms
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Rôle</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Groupe / Département
                </th>
                <th class="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-for="m in filteredMembers" :key="m.id" class="hover:bg-blue-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-4">
                    <div class="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                      {{ getInitials(m.nom) }}
                    </div>
                    <div class="text-sm font-semibold text-gray-900">{{ m.nom }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ m.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <span class="text-xl">{{ getGroupIcon(groupes.find(g => g.id === m.groupe_id)?.nom) }}</span>
                    <span class="text-sm text-gray-900 font-medium">{{ groupes.find(g => g.id === m.groupe_id)?.nom || 'N/A' }}</span>
                    <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800" v-if="m.est_responsable">
                      ⭐ Responsable
                    </span>
                    <span class="text-xs px-1 py-1 inline-flex leading-3 font-semibold rounded-full bg-red-100 text-black" v-if="m.departement_id">
                      {{ departements.find(d => d.id === m.departement_id)?.nom }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <div class="flex gap-2 justify-end">
                    <button @click="editMember(m)"
                      class="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all hover:scale-110">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button @click="deleteMember(m.id)"
                      class="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all hover:scale-110">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-else class="text-center py-16">
            <div class="inline-block p-6 bg-gray-100 rounded-full  mb-4">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Aucun membre trouvé</h3>
            <p class="text-gray-600 mb-6">Modifiez vos filtres ou ajoutez un nouveau membre</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Formulaire -->
    <div v-if="showForm" class="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white rounded-t-2xl flex items-center justify-between">
          <h2 class="text-2xl font-bold flex items-center gap-2">
            <span v-if="!selectedMember">➕</span>
            <span v-else>✏️</span>
            {{ selectedMember ? 'Modifier' : 'Nouveau' }} membre
          </h2>
          <button @click="closeForm" class="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all">
            ✖️
          </button>
        </div>

        <form @submit.prevent="saveMember" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nom et Prénoms *</label>
            <input v-model="memberForm.nom" type="text" required
              class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Ex: Jean Dupont" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Rôle *</label>
            <select v-model="memberForm.role" required
              class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors">
              <option value="">Sélectionner un rôle</option>
              <option value="Membre">Membre</option>
              <option value="Admin">Admin</option>
              <option value="Responsable">Responsable</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Département</label>
            <select v-model="memberForm.departement_id"
              class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors">
              <option value="">Aucun</option>
              <option v-for="d in departements" :key="d.id" :value="d.id">{{ d.nom }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Groupe *</label>
            <select v-model="memberForm.groupe_id" :required="memberForm.departement_id"
              class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors">
              <option value="">Sélectionner un groupe</option>
              <option v-for="g in groupes" :key="g.id" :value="g.id">{{ getGroupIcon(g.nom) }} {{ g.nom }}
              </option>
            </select>
          </div>

          <div class="flex items-center">
            <input v-model="memberForm.est_responsable" type="checkbox" id="responsable"
              class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <label for="responsable" class="ml-3 text-sm font-medium text-gray-700">⭐ Responsable</label>
          </div>

          <div class="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <button type="button" @click="closeForm"
              class="px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all">
              Annuler
            </button>
            <button type="submit"
              class="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
              {{ selectedMember ? 'Modifier' : 'Ajouter' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '../../stores/data.js'
import { useNotification } from '../../composables/useNotification.js'

const dataStore = useDataStore()
const { success, error } = useNotification()

/* --- Données du store --- */
const membres = computed(() => dataStore.users)

const groupes = ref([
  { id: 1, nom: 'Femmes' }, // Femmes
  { id: 2, nom: 'Hommes' }, // Hommes
  { id: 3, nom: 'Jeunes' }  // Jeunesse
])

const departements = ref([
  { id: 1, nom: "Service d'ordre" },
  { id: 2, nom: "Communication" },
  { id: 3, nom: "Logistique" },
  { id: 4, nom: "Pastorale" }
])

/* --- Formulaire --- */
const showForm = ref(false)
const selectedMember = ref(null)
const memberForm = ref({
  nom: '',
  role: '',
  departement_id: '',
  groupe_id: '',
  est_responsable: false
})

/* --- Recherche et filtres --- */
const search = ref('')
const activeGroupe = ref(null)

const filteredMembers = computed(() => {
  return membres.value.filter(m => {
    const matchesSearch = m.nom.toLowerCase().includes(search.value.toLowerCase())
    const matchesGroupe = activeGroupe.value ? m.groupe_id === activeGroupe.value : true
    return matchesSearch && matchesGroupe
  })
})

function filterGroupe(id) { activeGroupe.value = id }
function clearFilter() { activeGroupe.value = null }

/* --- Statistiques --- */
function countByGroup(id) {
  if (!id) return membres.value.length
  return membres.value.filter(m => m.groupe_id === id).length
}

/* --- Helpers --- */
function getGroupIcon(nom) {
  if (nom === 'Femmes') return '👩'
  if (nom === 'Hommes') return '👨'
  if (nom === 'Jeunes') return '👦'
  return '👤'
}

function getInitials(nom) {
  return nom.split(' ').map(n => n[0]).join('').toUpperCase()
}

/* --- Actions --- */
function openForm() {
  selectedMember.value = null
  memberForm.value = { nom: '', role: '', departement_id: '', groupe_id: '', est_responsable: false }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

function saveMember() {
  if (memberForm.value.departement_id && !memberForm.value.groupe_id) {
    error("Un membre dans un département doit obligatoirement appartenir à un groupe.")
    return
  }

  try {
    if (selectedMember.value) {
      dataStore.updateUser(selectedMember.value.id, memberForm.value)
      success('Membre modifié avec succès !')
    } else {
      dataStore.addUser(memberForm.value)
      success('Nouveau membre ajouté avec succès !')
    }
    closeForm()
  } catch (err) {
    error('Erreur lors de la sauvegarde du membre')
  }
}

function editMember(m) {
  selectedMember.value = m
  memberForm.value = { ...m }
  showForm.value = true
}

function deleteMember(id) {
  if (confirm("Voulez-vous vraiment supprimer ce membre ?")) {
    try {
      dataStore.deleteUser(id)
      success('Membre supprimé avec succès !')
    } catch (err) {
      error('Erreur lors de la suppression du membre')
    }
  }
}
</script>

<style scoped>
/* Scrollbar pour le modal */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.2);
  border-radius: 4px;
}
</style>
