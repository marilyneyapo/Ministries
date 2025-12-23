<template>
  <div class="min-h-screen bg-gray-50">
    <!-- En-tête commun -->
    <AdminHeader
      title="Gestion des Actualités"
      description="Publiez les nouvelles et annonces de l'église"
      icon="news"
      :action-button="{ text: 'Nouvelle actualité', icon: '+' }"
      @action-click="openForm()"
    />

    <div class="container mx-auto px-4 md:px-8 py-8">
      
      <!-- Statistiques rapides -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Total</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ actualites.length }}</p>
            </div>
            <div class="bg-blue-100 p-3 rounded-xl">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Publiées</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ countByStatus(true) }}</p>
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
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Brouillons</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ countByStatus(false) }}</p>
            </div>
            <div class="bg-orange-100 p-3 rounded-xl">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Cette semaine</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">{{ countThisWeek }}</p>
            </div>
            <div class="bg-purple-100 p-3 rounded-xl">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
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
              placeholder="Titre ou contenu..."
              class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
            <select v-model="filterCategory" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors">
              <option value="">Toutes les catégories</option>
              <option value="Annonce">Annonce</option>
              <option value="Événement">Événement</option>
              <option value="Témoignage">Témoignage</option>
              <option value="Enseignement">Enseignement</option>
              <option value="Prière">Prière</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
            <select v-model="filterStatus" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors">
              <option value="">Tous les statuts</option>
              <option value="published">Publiées</option>
              <option value="draft">Brouillons</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Liste des actualités -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
              </svg>
              Liste des Actualités
            </h3>
            <span class="text-sm text-gray-600 bg-white px-3 py-1 rounded-full font-medium">
              {{ filteredActualites.length }} actualité(s)
            </span>
          </div>
        </div>

        <div v-if="filteredActualites.length" class="divide-y divide-gray-200">
          <div 
            v-for="actu in filteredActualites" 
            :key="actu.id" 
            class="p-6 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-start justify-between">
              <!-- Informations principales -->
              <div class="flex items-start gap-4 flex-1">
                <!-- Icône et catégorie -->
                <div class="flex-shrink-0">
                  <div :class="getCategoryColorClass(actu.categorie)" class="w-12 h-12 rounded-xl flex items-center justify-center">
                    <span class="text-xl">{{ getCategoryIcon(actu.categorie) }}</span>
                  </div>
                </div>

                <!-- Détails de l'actualité -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h4 class="text-lg font-semibold text-gray-900 mb-1">{{ actu.titre }}</h4>
                      <p class="text-gray-600 text-sm line-clamp-2">{{ actu.contenu }}</p>
                    </div>
                    
                    <!-- Badge statut -->
                    <div class="flex-shrink-0 ml-4">
                      <span :class="getStatusBadgeClass(actu.publiee)" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold">
                        {{ actu.publiee ? '✅ Publiée' : '📝 Brouillon' }}
                      </span>
                    </div>
                  </div>

                  <!-- Métadonnées -->
                  <div class="flex items-center gap-6 text-sm text-gray-500 mb-3">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span>{{ formatDate(actu.date) }}</span>
                    </div>
                    
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      <span>{{ actu.auteur }}</span>
                    </div>
                    
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                      </svg>
                      <span>{{ actu.categorie }}</span>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex items-center gap-2">
                    <!-- Modifier -->
                    <button 
                      @click="openForm(actu)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      Modifier
                    </button>

                    <!-- Publier/Dépublier -->
                    <button 
                      @click="togglePublish(actu)"
                      :class="actu.publiee ? 
                        'bg-orange-100 text-orange-700 hover:bg-orange-200' : 
                        'bg-green-100 text-green-700 hover:bg-green-200'"
                      class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="actu.publiee" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                      {{ actu.publiee ? 'Dépublier' : 'Publier' }}
                    </button>

                    <!-- Supprimer -->
                    <button 
                      @click="deleteActualite(actu.id)"
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

        <!-- Message si aucune actualité -->
        <div v-else class="text-center py-16">
          <div class="inline-block p-6 bg-gray-100 rounded-full mb-4">
            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Aucune actualité trouvée</h3>
          <p class="text-gray-600 mb-6">Modifiez vos filtres ou créez une nouvelle actualité</p>
          <button 
            @click="openForm()"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Créer une actualité
          </button>
        </div>
      </div>
      <!-- Modal Formulaire -->
      <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <!-- En-tête du modal -->
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white rounded-t-2xl">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold flex items-center gap-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                </svg>
                {{ selectedActualite ? 'Modifier' : 'Nouvelle' }} actualité
              </h2>
              <button @click="closeForm" class="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Formulaire -->
          <form @submit.prevent="saveActualite" class="p-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Titre *</label>
                <input 
                  v-model="actualiteForm.titre"
                  type="text" 
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                  placeholder="Ex: Nouvelle campagne d'évangélisation"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Contenu *</label>
                <textarea 
                  v-model="actualiteForm.contenu"
                  rows="6"
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                  placeholder="Décrivez l'actualité en détail..."
                  required
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Catégorie *</label>
                  <select v-model="actualiteForm.categorie" class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" required>
                    <option value="Annonce">Annonce</option>
                    <option value="Événement">Événement</option>
                    <option value="Témoignage">Témoignage</option>
                    <option value="Enseignement">Enseignement</option>
                    <option value="Prière">Prière</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input 
                    v-model="actualiteForm.date"
                    type="date" 
                    class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                    required
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Auteur *</label>
                <input 
                  v-model="actualiteForm.auteur"
                  type="text" 
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                  placeholder="Nom de l'auteur"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Image (URL)</label>
                <input 
                  v-model="actualiteForm.image"
                  type="url" 
                  class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors" 
                  placeholder="https://exemple.com/image.jpg"
                />
              </div>

              <div class="flex items-center">
                <input 
                  v-model="actualiteForm.publiee"
                  type="checkbox" 
                  id="publiee"
                  class="w-5 h-5 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="publiee" class="ml-3 text-sm font-medium text-gray-700">
                  Publier immédiatement sur la page d'accueil
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
                {{ selectedActualite ? 'Mettre à jour' : 'Publier' }}
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
import { useNewsStore } from '../../stores/news.js'
import { useNotification } from '../../composables/useNotification.js'
import AdminHeader from '../../components/layout/AdminHeader.vue'

const newsStore = useNewsStore()
const { success, error } = useNotification()

const showForm = ref(false)
const selectedActualite = ref(null)
const searchQuery = ref('')
const filterCategory = ref('')
const filterStatus = ref('')

const actualites = computed(() => newsStore.news)

const actualiteForm = ref({
  titre: '',
  contenu: '',
  categorie: 'Annonce',
  date: '',
  auteur: '',
  image: null,
  publiee: false
})

onMounted(async () => {
  await newsStore.getNews()
})

const filteredActualites = computed(() => {
  let result = actualites.value

  if (searchQuery.value) {
    result = result.filter(a => 
      a.titre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      a.contenu.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (filterCategory.value) {
    result = result.filter(a => a.categorie === filterCategory.value)
  }

  if (filterStatus.value === 'published') {
    result = result.filter(a => a.publiee === true)
  } else if (filterStatus.value === 'draft') {
    result = result.filter(a => a.publiee === false)
  }

  return result.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const countByStatus = (published) => {
  return actualites.value.filter(a => a.publiee === published).length
}

const countThisWeek = computed(() => {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  return actualites.value.filter(a => new Date(a.date) >= oneWeekAgo).length
})

function getCategoryIcon(category) {
  const icons = {
    'Annonce': '📢',
    'Événement': '🎉',
    'Témoignage': '💬',
    'Enseignement': '📖',
    'Prière': '🙏'
  }
  return icons[category] || '📰'
}

function getCategoryColorClass(category) {
  const classes = {
    'Annonce': 'bg-blue-100 text-blue-600',
    'Événement': 'bg-purple-100 text-purple-600',
    'Témoignage': 'bg-green-100 text-green-600',
    'Enseignement': 'bg-orange-100 text-orange-600',
    'Prière': 'bg-pink-100 text-pink-600'
  }
  return classes[category] || 'bg-gray-100 text-gray-600'
}

function getStatusBadgeClass(published) {
  return published ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

function openForm(actualite = null) {
  selectedActualite.value = actualite
  if (actualite) {
    actualiteForm.value = { ...actualite }
  } else {
    actualiteForm.value = {
      titre: '',
      contenu: '',
      categorie: 'Annonce',
      date: new Date().toISOString().split('T')[0],
      auteur: '',
      image: null,
      publiee: false
    }
  }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  selectedActualite.value = null
}

function saveActualite() {
  try {
    if (selectedActualite.value) {
      newsStore.updateNews(selectedActualite.value.id, actualiteForm.value)
      success('Actualité mise à jour avec succès!')
    } else {
      newsStore.addNews(actualiteForm.value)
      success('Nouvelle actualité créée avec succès!')
    }
    closeForm()
  } catch (err) {
    error('Erreur lors de la sauvegarde de l\'actualité')
    console.error(err)
  }
}

function deleteActualite(id) {
  if (confirm('Voulez-vous vraiment supprimer cette actualité ?')) {
    try {
      newsStore.deleteNews(id)
      success('Actualité supprimée avec succès!')
    } catch (err) {
      error('Erreur lors de la suppression de l\'actualité')
      console.error(err)
    }
  }
}

function togglePublish(actualite) {
  try {
    const updatedData = { ...actualite, publiee: !actualite.publiee }
    newsStore.updateNews(actualite.id, updatedData)
    success(updatedData.publiee ? 'Actualité publiée!' : 'Actualité dépubliée!')
  } catch (err) {
    error('Erreur lors de la modification du statut')
    console.error(err)
  }
}
</script>