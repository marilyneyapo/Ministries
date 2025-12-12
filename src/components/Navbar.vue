<template>
  <div>
    <header 
      :class="[ 
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white shadow-sm'
      ]"
    >
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <div class="flex items-center gap-3">
              <img 
                src="/mercv.png" 
                alt="Logo" 
                class="w-12 h-12 object-contain rounded-lg transform hover:scale-105 transition-transform duration-300"
              />
              
            </div>
          </div>

          <!-- Navigation Desktop -->
          <div class="hidden md:flex md:items-center md:space-x-1">
            <a
              v-for="item in menuItems"
              :key="item.name"
              :href="item.link"
              @click.prevent="scrollToSection(item.link)"
              class="relative px-4 py-2 text-gray-700 font-medium text-base group"
            >
              <span class="relative z-10 transition-colors duration-300 group-hover:text-blue-600">
                {{ item.name }}
              </span>
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          <!-- Boutons d'action et Menu Mobile -->
          <div class="flex items-center gap-3">
            <!-- Bouton de connexion (desktop) -->
            <div class="hidden md:flex items-center gap-2">
              <router-link
                to="/login"
                class="px-4 py-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Connexion
              </router-link>
              <router-link
                to="/register"
                class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
              >
                S'inscrire
              </router-link>
            </div>

            <button
              @click="isMenuOpen = !isMenuOpen"
              class="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <svg v-if="isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Menu Mobile -->
        <div
          :class="[ 
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          ]"
        >
          <div class="py-4 space-y-1">
            <a
              v-for="(item, index) in menuItems"
              :key="item.name"
              :href="item.link"
              @click.prevent="scrollToSection(item.link)"
              class="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:translate-x-2"
            >
              {{ item.name }}
            </a>
            
            <!-- Boutons d'action mobile -->
            <div class="pt-4 border-t border-gray-200 space-y-2">
              <router-link
                to="/login"
                @click="isMenuOpen = false"
                class="block px-4 py-3 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all"
              >
                Connexion
              </router-link>
              <router-link
                to="/register"
                @click="isMenuOpen = false"
                class="block px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-center"
              >
                S'inscrire
              </router-link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const scrolled = ref(false)

const menuItems = [
  { name: 'Accueil', link: '#accueil' },
  { name: 'À propos', link: '#apropos' },
  { name: 'Programmes', link: '#programmes' },
  { name: 'Actualites', link: '#actualites' },
  { name: 'Contact', link: '#contact' }
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const scrollToSection = (link) => {
  const element = document.querySelector(link)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    isMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
