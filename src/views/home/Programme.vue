<template>
  <section id="programmes" class="p-8 bg-gradient-to-b from-gray-100 to-gray-200">
    <h2 class="text-4xl font-extrabold text-center text-gray-900 mb-12 animate-fadeIn">
      Agenda du Ministère
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Programmes réguliers -->
      <div class="bg-white rounded-3xl shadow-2xl p-6 transform transition duration-500 hover:-translate-y-3 hover:scale-105 animate-slideUp">
        <h3 class="text-2xl font-bold mb-6 border-b pb-2 border-gray-300">Programmes réguliers</h3>
        <ul class="space-y-4">
          <li
            v-for="programme in regularPrograms"
            :key="programme.id"
            class="p-4 bg-green-100 rounded-xl border-l-8 border-green-500 shadow-sm hover:shadow-lg transition transform hover:-translate-x-2 hover:scale-105 duration-300"
          >
            <p class="font-semibold text-gray-800">{{ programme.name }}</p>
            <p class="text-gray-600 text-sm">{{ programme.day }} - {{ programme.time }}</p>
          </li>
        </ul>
      </div>

      <!-- Jours de prière -->
      <div class="bg-white rounded-3xl shadow-2xl p-6 transform transition duration-500 hover:-translate-y-3 hover:scale-105 animate-slideUp">
        <h3 class="text-2xl font-bold mb-6 border-b pb-2 border-gray-300">Jours de prière</h3>
        <ul class="space-y-4">
          <li
            v-for="prayer in weeklyPrayers"
            :key="prayer.id"
            class="p-4 bg-yellow-100 rounded-xl border-l-8 border-yellow-500 shadow-sm hover:shadow-lg transition transform hover:-translate-x-2 hover:scale-105 duration-300"
          >
            <p class="font-semibold text-gray-800">{{ prayer.name }}</p>
            <p class="text-gray-600 text-sm">{{ prayer.day }} - {{ prayer.time }}</p>
          </li>
        </ul>
      </div>

      <!-- Programmes extraordinaires -->
      <div class="bg-white rounded-3xl shadow-2xl p-6 transform transition duration-500 hover:-translate-y-3 hover:scale-105 animate-slideUp">
        <h3 class="text-2xl font-bold mb-6 border-b pb-2 border-gray-300">Programmes extraordinaires</h3>
        <ul class="space-y-4">
          <li
            v-for="special in specialPrograms"
            :key="special.id"
            class="p-4 bg-blue-100 rounded-xl border-l-8 border-blue-500 shadow-sm hover:shadow-lg transition transform hover:-translate-x-2 hover:scale-105 duration-300"
          >
            <p class="font-semibold text-gray-800">{{ special.name }}</p>
            <p class="text-gray-600 text-sm">{{ special.date }} - {{ special.time }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const regularPrograms = ref([
  { id: 1, day: "Lundi", name: "Réunion du ministère", time: "10h00" },
  { id: 2, day: "Mercredi", name: "Enseignement biblique", time: "18h00" },
])

const weeklyPrayers = ref([
  { id: 1, day: "Vendredi", name: "Prière communautaire", time: "19h00" },
  { id: 2, day: "Dimanche", name: "Prière matinale", time: "08h00" },
])

const specialPrograms = ref([
  { id: 1, date: "2025-11-20", name: "Conférence spéciale", time: "15h00" },
  { id: 2, date: "2025-12-01", name: "Retraite spirituelle", time: "09h00" },
])
</script>

<style>
/* Animations personnalisées */
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px);}
  100% { opacity: 1; transform: translateY(0);}
}
.animate-fadeIn {
  animation: fadeIn 1s ease forwards;
}

@keyframes slideUp {
  0% { opacity: 0; transform: translateY(30px);}
  100% { opacity: 1; transform: translateY(0);}
}
.animate-slideUp {
  animation: slideUp 0.8s ease forwards;
}
</style>
