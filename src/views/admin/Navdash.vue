<template>
  <header class="navbar bg-white sticky top-0 z-60 shadow-md px-4 md:px-10 flex items-center justify-between backdrop-blur-lg bg-opacity-80 border-b border-gray-200 h-15">
    <!-- Left Section -->
    <div class="flex items-center gap-3"> <!-- Mobile menu toggle --> 
<     <button class="btn btn-ghost btn-circle md:hidden" @click="$emit('toggleSidebar')" aria-label="Menu">
        <Icon icon="mdi:menu" class="text-3xl text-gray-700" /> 
      </button>
     

      <div class="flex items-center gap-2">
        <img src="/mercv.png" alt="Logo" class="w-11 h-11 object-contain drop-shadow-sm" />
        <span class="font-semibold text-xl text-[#3636a6] hidden sm:inline tracking-wide">Mon Gestionnaire</span>
      </div>
    </div>

    <!-- Search (Desktop) -->
    <div class="flex-1 hidden md:flex justify-center">
      <div class="relative w-full max-w-xl">
        <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Rechercher..."
          class="input input-bordered w-full pl-12 rounded-full shadow-sm focus:ring-2 focus:ring-[#3636a6]"
        />
      </div>
    </div>

    <!-- Right Section -->
    <div class="flex items-center gap-3 md:gap-5 relative">
      <!-- Mobile Search Toggle -->
      <button class="btn btn-ghost btn-circle md:hidden" @click="showSearchMobile = !showSearchMobile" aria-label="Recherche">
        <Icon icon="mdi:magnify" class="text-2xl" />
      </button>

      <!-- Avatar Dropdown -->
      <div class="relative">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar hover:shadow-md transition" @click="isOpen = !isOpen">
          <div class="w-11 rounded-full overflow-hidden">
            <img src="/user.png" alt="user" />
          </div>
        </div>

        <transition name="fade">
          <ul
            v-if="isOpen"
            class="absolute right-0 mt-3 p-3 shadow-lg bg-white rounded-xl w-52 space-y-3 font-medium text-base text-black border border-gray-100 z-40"
          >
            <li><a href="#" class="hover:text-blue-900 hover:underline transition">Profil</a></li>
            <li><a href="#" class="hover:text-blue-900  hover:underline transition">Paramètre</a></li>
            <li><a href="#" class="hover:text-blue-900  hover:underline transition">Déconnexion</a></li>
          </ul>
        </transition>
      </div>
    </div>
  </header>

  <!-- Mobile Search -->
  <div v-if="showSearchMobile" class="px-4 pb-3 md:hidden bg-white shadow-sm border-b border-gray-200">
    <div class="relative w-full">
      <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
      <input type="text" placeholder="Rechercher..." class="input input-bordered w-full pl-10 rounded-full" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

defineEmits(['toggleSidebar'])

const isOpen = ref(false)
const showSearchMobile = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>