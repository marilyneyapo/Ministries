<template>
  <div class="min-h-screen bg-gray-50">
    <!-- En-tête commun -->
    <AdminHeader
      title="Paramètres"
      description="Configuration et préférences de l'application"
      icon="settings"
    />

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
import AdminHeader from '../../components/layout/AdminHeader.vue'

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
    // Préparer les données pour l'export Excel
    const exportDate = new Date().toLocaleDateString('fr-FR')
    const exportTime = new Date().toLocaleTimeString('fr-FR')
    
    // Créer le contenu Excel en format HTML (compatible Excel)
    const excelContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="UTF-8">
          <style>
            .header { font-weight: bold; background-color: #4F46E5; color: white; text-align: center; }
            .section { font-weight: bold; background-color: #E5E7EB; }
            .data { border: 1px solid #D1D5DB; }
            table { border-collapse: collapse; width: 100%; }
            td, th { border: 1px solid #D1D5DB; padding: 8px; text-align: left; }
          </style>
        </head>
        <body>
          <table>
            <tr>
              <td colspan="2" class="header">EXPORT DES PARAMÈTRES DE L'ÉGLISE</td>
            </tr>
            <tr>
              <td class="section">Date d'export</td>
              <td class="data">${exportDate} à ${exportTime}</td>
            </tr>
            <tr>
              <td colspan="2" class="section">INFORMATIONS DE L'ÉGLISE</td>
            </tr>
            <tr>
              <td class="data">Nom de l'église</td>
              <td class="data">${settings.value.churchName}</td>
            </tr>
            <tr>
              <td class="data">Adresse</td>
              <td class="data">${settings.value.address}</td>
            </tr>
            <tr>
              <td class="data">Téléphone</td>
              <td class="data">${settings.value.phone}</td>
            </tr>
            <tr>
              <td class="data">Email</td>
              <td class="data">${settings.value.email}</td>
            </tr>
            <tr>
              <td colspan="2" class="section">PARAMÈTRES DE NOTIFICATION</td>
            </tr>
            <tr>
              <td class="data">Notifications par email</td>
              <td class="data">${settings.value.emailNotifications ? 'Activé' : 'Désactivé'}</td>
            </tr>
            <tr>
              <td class="data">Notifications push</td>
              <td class="data">${settings.value.pushNotifications ? 'Activé' : 'Désactivé'}</td>
            </tr>
            <tr>
              <td class="data">Notifications d'événements</td>
              <td class="data">${settings.value.eventNotifications ? 'Activé' : 'Désactivé'}</td>
            </tr>
            <tr>
              <td colspan="2" class="section">PARAMÈTRES D'AFFICHAGE</td>
            </tr>
            <tr>
              <td class="data">Thème</td>
              <td class="data">${settings.value.theme === 'light' ? 'Clair' : settings.value.theme === 'dark' ? 'Sombre' : 'Automatique'}</td>
            </tr>
            <tr>
              <td class="data">Langue</td>
              <td class="data">${settings.value.language === 'fr' ? 'Français' : 'English'}</td>
            </tr>
            <tr>
              <td class="data">Éléments par page</td>
              <td class="data">${settings.value.itemsPerPage}</td>
            </tr>
          </table>
        </body>
      </html>
    `
    
    // Créer le blob avec le type Excel
    const blob = new Blob([excelContent], { 
      type: 'application/vnd.ms-excel;charset=utf-8' 
    })
    
    // Créer le lien de téléchargement
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `parametres_eglise_${new Date().toISOString().split('T')[0]}.xls`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    success('Données exportées en Excel avec succès!')
  } catch (err) {
    error('Erreur lors de l\'export des données')
    console.error(err)
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