<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- En-tête -->
    <div class="bg-gray-200 shadow-xl">
      <div class="container mx-auto px-4 md:px-8 py-6">
        <div class="flex items-center gap-3 text-black">
          <div class="bg-gray-400 bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl md:text-4xl font-bold">Paramètres</h1>
            <p class="text-black text-sm">Configuration et préférences de l'application</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 md:px-8 py-8">
      <!-- Sections de paramètres -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Informations de l'église -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-2xl">⛪</span>
            Informations de l'église
          </h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nom de l'église</label>
              <input 
                v-model="settings.churchName" 
                type="text" 
                class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Impact Centre Chrétien"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
              <textarea 
                v-model="settings.address" 
                rows="3"
                class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="123 Rue de la Paix, Paris"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
              <input 
                v-model="settings.phone" 
                type="tel" 
                class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="+33 1 23 45 67 89"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="settings.email" 
                type="email" 
                class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="contact@eglise.com"
              />
            </div>
          </div>
        </div>

        <!-- Paramètres de notification -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-2xl">🔔</span>
            Notifications
          </h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label class="text-sm font-medium text-gray-700">Notifications par email</label>
                <p class="text-xs text-gray-500">Recevoir les notifications importantes par email</p>
              </div>
              <input 
                v-model="settings.emailNotifications" 
                type="checkbox" 
                class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <label class="text-sm font-medium text-gray-700">Notifications push</label>
                <p class="text-xs text-gray-500">Recevoir les notifications dans le navigateur</p>
              </div>
              <input 
                v-model="settings.pushNotifications" 
                type="checkbox" 
                class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <label class="text-sm font-medium text-gray-700">Notifications d'événements</label>
                <p class="text-xs text-gray-500">Être notifié des nouveaux événements</p>
              </div>
              <input 
                v-model="settings.eventNotifications" 
                type="checkbox" 
                class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <!-- Paramètres d'affichage -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-2xl">🎨</span>
            Affichage
          </h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Thème</label>
              <select 
                v-model="settings.theme" 
                class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="light">Clair</option>
                <option value="dark">Sombre</option>
                <option value="auto">Automatique</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Langue</label>
              <select 
                v-model="settings.language" 
                class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Éléments par page</label>
              <select 
                v-model="settings.itemsPerPage" 
                class="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Sécurité -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-2xl">🔒</span>
            Sécurité
          </h2>
          <div class="space-y-4">
            <button 
              @click="changePassword"
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Changer le mot de passe
            </button>
            <button 
              @click="exportData"
              class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Exporter les données
            </button>
            <button 
              @click="clearCache"
              class="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
            >
              Vider le cache
            </button>
          </div>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="flex justify-end gap-4 mt-8">
        <button 
          @click="resetSettings"
          class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Réinitialiser
        </button>
        <button 
          @click="saveSettings"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNotification } from '../../composables/useNotification.js'

const { success, error } = useNotification()

const settings = ref({
  churchName: 'Impact Centre Chrétien',
  address: '123 Rue de la Paix, Paris',
  phone: '+33 1 23 45 67 89',
  email: 'contact@eglise.com',
  emailNotifications: true,
  pushNotifications: true,
  eventNotifications: true,
  theme: 'light',
  language: 'fr',
  itemsPerPage: '25'
})

function saveSettings() {
  try {
    // Sauvegarder dans localStorage pour la démo
    localStorage.setItem('churchSettings', JSON.stringify(settings.value))
    success('Paramètres sauvegardés avec succès!')
  } catch (err) {
    error('Erreur lors de la sauvegarde des paramètres')
  }
}

function resetSettings() {
  if (confirm('Voulez-vous vraiment réinitialiser tous les paramètres ?')) {
    settings.value = {
      churchName: 'Impact Centre Chrétien',
      address: '123 Rue de la Paix, Paris',
      phone: '+33 1 23 45 67 89',
      email: 'contact@eglise.com',
      emailNotifications: true,
      pushNotifications: true,
      eventNotifications: true,
      theme: 'light',
      language: 'fr',
      itemsPerPage: '25'
    }
    success('Paramètres réinitialisés!')
  }
}

function changePassword() {
  // Placeholder pour la fonctionnalité de changement de mot de passe
  error('Fonctionnalité en cours de développement')
}

function exportData() {
  try {
    // Simuler l'export des données
    const data = {
      exported_at: new Date().toISOString(),
      settings: settings.value
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'church_settings_export.json'
    a.click()
    success('Données exportées avec succès!')
  } catch (err) {
    error('Erreur lors de l\'export des données')
  }
}

function clearCache() {
  try {
    // Vider le cache localStorage (sauf les paramètres)
    const settingsBackup = localStorage.getItem('churchSettings')
    localStorage.clear()
    if (settingsBackup) {
      localStorage.setItem('churchSettings', settingsBackup)
    }
    success('Cache vidé avec succès!')
  } catch (err) {
    error('Erreur lors du vidage du cache')
  }
}

// Charger les paramètres au montage
const loadSettings = () => {
  try {
    const saved = localStorage.getItem('churchSettings')
    if (saved) {
      settings.value = { ...settings.value, ...JSON.parse(saved) }
    }
  } catch (err) {
    console.error('Erreur lors du chargement des paramètres:', err)
  }
}

loadSettings()
</script>