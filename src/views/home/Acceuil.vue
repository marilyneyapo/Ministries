<template>
  <!-- Hero Section -->
  <section id="accueil" class="relative min-h-screen overflow-hidden">
    <!-- Background Carousel -->
    <div class="absolute inset-0">
        <div
          v-if="showIntro"
          class="absolute inset-0 flex items-center justify-center bg-black text-white text-3xl md:text-5xl font-bold tracking-wide"
        >
          NOUS SOMMES UN DANS UN LIEN D’AMOUR 💞
        </div>
    </div>

    <!-- CAROUSEL -->
    <transition name="fade">
      <div v-if="showCarousel" class="relative w-full h-full">
        <div class="absolute inset-0">
          <img
            :src="images[currentIndex].url"
            :alt="images[currentIndex].text"
            class="w-full h-full object-cover transition-opacity duration-1000"
          />
          <!-- Texte superposé -->
          <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
            <h2 class="text-white text-2xl md:text-4xl font-semibold text-center px-4 animate-fadeInUp mb-8">
              {{ images[currentIndex].text }}
            </h2>
            
            
          </div>
        </div>
      </div>
    </transition>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import image1 from '../../assets/image1.jpeg'
import image2 from '../../assets/image2.jpeg'
import image3 from '../../assets/image3.jpeg'

const showIntro = ref(true)
const showCarousel = ref(false)
const currentIndex = ref(0)



const images = [
  { url: image1, text: 'Un lien qui nous unit pour toujours ❤️' },
  { url: image2, text: 'L’amour est notre plus belle force ✨' },
  { url: image3, text: 'Chaque jour est une promesse d’unité 💫' }
]


onMounted(() => {
  setTimeout(() => {
    showIntro.value = false
    setTimeout(() => (showCarousel.value = true), 800) 
  }, 3000)

  setInterval(() => {
    if (showCarousel.value) {
      currentIndex.value = (currentIndex.value + 1) % images.length
    }
  }, 7000) 
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeInUp {
  animation: fadeInUp 1.5s ease-in-out;
}
</style>
