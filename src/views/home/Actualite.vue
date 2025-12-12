<template>
  <section id="actualites" class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- En-tête amélioré -->
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          📰 Actualités du Ministère
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez les dernières nouvelles, événements et témoignages de notre église
        </p>
        <div class="w-24 h-1 bg-black mx-auto mt-4 rounded-full"></div>
      </div>

      <!-- Carousel principal -->
      <div v-if="actualitesPubliees.length" class="relative max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-2xl mb-12">
        <!-- Slides -->
        <div class="flex transition-transform duration-700 ease-in-out" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div
            v-for="actualite in actualitesPubliees"
            :key="actualite.id"
            class="min-w-full bg-white rounded-3xl overflow-hidden"
          >
            <!-- Image avec overlay -->
            <div class="relative h-80 overflow-hidden bg-white">
              <img 
                v-if="actualite.image" 
                :src="actualite.image" 
                :alt="actualite.titre" 
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg class="w-32 h-32 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                </svg>
              </div>

              <!-- Overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

              <!-- Badge catégorie -->
              <div class="absolute top-6 left-6">
                <span class="px-4 py-2 bg-white bg-opacity-95 backdrop-blur-sm rounded-full text-sm font-bold text-gray-800 shadow-xl">
                  {{ getCategoryIcon(actualite.categorie) }} {{ actualite.categorie }}
                </span>
              </div>

              <!-- Badge nouveau -->
              <div v-if="isRecent(actualite.date)" class="absolute top-6 right-6">
                <span class="px-3 py-2 bg-green-400 text-white rounded-full text-xs font-bold shadow-xl animate-pulse flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  NOUVEAU
                </span>
              </div>

              <!-- Info en bas -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div class="flex items-center gap-4 text-sm mb-2">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span>{{ formatDate(actualite.date) }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span>{{ actualite.auteur }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contenu -->
            <div class="p-8">
              <h3 class="text-3xl font-bold mb-4 text-gray-900">{{ actualite.titre }}</h3>
              <p class="text-gray-700 text-lg leading-relaxed mb-6">{{ actualite.contenu }}</p>
              
              <!-- Bouton lire plus -->
              <button 
                @click="openModal(actualite)"
                class="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
                Lire la suite
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Boutons de navigation -->
        <button
          @click="prev"
          class="absolute top-1/2 left-4 md:left-6 transform -translate-y-1/2 bg-white text-gray-800 rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:bg-white hover:text-white transition-all shadow-xl hover:scale-110 z-10"
        >
          <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button
          @click="next"
          class="absolute top-1/2 right-4 md:right-6 transform -translate-y-1/2 bg-white text-gray-800 rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:bg-white hover:text-white transition-all shadow-xl hover:scale-110 z-10"
        >
          <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <!-- Pagination améliorée -->
        <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          <button
            v-for="(actualite, index) in actualitesPubliees"
            :key="index"
            @click="goTo(index)"
            :class="[
              'rounded-full cursor-pointer transition-all duration-300',
              currentIndex === index 
                ? 'w-10 h-3 bg-white' 
                : 'w-3 h-3 bg-white bg-opacity-70 hover:bg-opacity-100'
            ]"
          ></button>
        </div>
      </div>

      <!-- Grille d'actualités secondaires -->
      <div v-if="actualitesPubliees.length > 3" class="mt-12">
        <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
          </svg>
          Autres actualités
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article 
            v-for="actu in actualitesPubliees.slice(3, 9)" 
            :key="actu.id"
            class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2">
            
            <!-- Image miniature -->
            <div class="relative h-48 overflow-hidden bg-gradient-to-br from-orange-400 to-red-400">
              <img 
                v-if="actu.image" 
                :src="actu.image" 
                :alt="actu.titre"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <svg class="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                </svg>
              </div>
              
              <!-- Badge catégorie -->
              <div class="absolute top-3 left-3">
                <span class="px-3 py-1 bg-white bg-opacity-95 backdrop-blur-sm rounded-full text-xs font-bold text-gray-800">
                  {{ getCategoryIcon(actu.categorie) }} {{ actu.categorie }}
                </span>
              </div>
            </div>

            <!-- Contenu -->
            <div class="p-5">
              <div class="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <span>📅 {{ formatDateShort(actu.date) }}</span>
                <span>👤 {{ actu.auteur }}</span>
              </div>
              <h4 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-white transition-colors">
                {{ actu.titre }}
              </h4>
              <p class="text-gray-600 text-sm line-clamp-2 mb-3">
                {{ actu.contenu }}
              </p>
              <button 
                @click="openModal(actu)"
                class="text-white font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                Lire plus
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </article>
        </div>
      </div>

      <!-- Message si aucune actualité -->
      <div v-else class="text-center py-20">
        <div class="inline-block p-8 bg-white rounded-full shadow-lg mb-6">
          <svg class="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Aucune actualité disponible</h3>
        <p class="text-gray-600">Les nouvelles actualités apparaîtront ici prochainement</p>
      </div>
    </div>

    <!-- Modal pour lire l'actualité complète -->
    <div v-if="selectedActualite" class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 backdrop-blur-sm" @click="closeModal">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" @click.stop>
        <!-- Image -->
        <div class="relative h-72 overflow-hidden bg-white">
          <img 
            v-if="selectedActualite.image" 
            :src="selectedActualite.image" 
            :alt="selectedActualite.titre"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
          </div>

          <!-- Bouton fermer -->
          <button 
            @click="closeModal" 
            class="absolute top-4 right-4 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100 transition-all shadow-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Badge catégorie -->
          <div class="absolute top-4 left-4">
            <span class="px-4 py-2 bg-white bg-opacity-95 backdrop-blur-sm rounded-full text-sm font-bold text-gray-800">
              {{ getCategoryIcon(selectedActualite.categorie) }} {{ selectedActualite.categorie }}
            </span>
          </div>
        </div>

        <!-- Contenu -->
        <div class="p-8">
          <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span>📅 {{ formatDate(selectedActualite.date) }}</span>
            <span>👤 {{ selectedActualite.auteur }}</span>
          </div>
          
          <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ selectedActualite.titre }}</h2>
          <div class="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {{ selectedActualite.contenu }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Liste des actualités (à remplacer par un store Vuex ou Pinia dans une vraie app)
const actualites = ref([
  { 
    id: 1, 
    titre: 'Nouvelle campagne d\'évangélisation', 
    contenu: 'Rejoignez-nous pour une grande campagne d\'évangélisation dans le quartier Nord. Ensemble, partageons la bonne nouvelle! Cette campagne durera 3 jours et touchera plus de 1000 personnes.',
    categorie: 'Annonce',
    date: '2025-11-25',
    auteur: 'Pasteur Jean',
    image: 'https://source.unsplash.com/800x400/?church,evangelism',
    publiee: true
  },
  
])

const currentIndex = ref(0)
const selectedActualite = ref(null)
let interval = null

// Filtrer uniquement les actualités publiées
const actualitesPubliees = computed(() => {
  return actualites.value.filter(a => a.publiee === true).sort((a, b) => new Date(b.date) - new Date(a.date))
})

// Compter par catégorie
const countByCategory = (category) => {
  return actualitesPubliees.value.filter(a => a.categorie === category).length
}

// Vérifier si l'actualité est récente (moins de 7 jours)
const isRecent = (dateStr) => {
  const actDate = new Date(dateStr)
  const today = new Date()
  const diffTime = Math.abs(today - actDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 7
}

// Obtenir l'icône de catégorie
const getCategoryIcon = (category) => {
  const icons = {
    'Annonce': '📢',
    'Événement': '🎉',
    'Témoignage': '💬',
    'Enseignement': '📖',
    'Prière': '🙏'
  }
  return icons[category] || '📰'
}

// Formater la date
const formatDate = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

const formatDateShort = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('fr-FR', { 
    day: 'numeric', 
    month: 'short'
  })
}

// Navigation du carousel
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % actualitesPubliees.value.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + actualitesPubliees.value.length) % actualitesPubliees.value.length
}

const goTo = (index) => {
  currentIndex.value = index
  // Réinitialiser l'interval quand on clique
  if (interval) clearInterval(interval)
  interval = setInterval(next, 5000)
}

// Modal
const openModal = (actualite) => {
  selectedActualite.value = actualite
  // Pause le carousel quand on ouvre le modal
  if (interval) clearInterval(interval)
}

const closeModal = () => {
  selectedActualite.value = null
  // Reprendre le carousel
  interval = setInterval(next, 5000)
}

// Auto slide toutes les 5 secondes
onMounted(() => {
  if (actualitesPubliees.value.length > 0) {
    interval = setInterval(next, 5000)
  }
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
/* Animation pour le badge NOUVEAU */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Smooth hover effect */
.min-w-full img {
  transition: transform 0.5s ease;
}
</style>