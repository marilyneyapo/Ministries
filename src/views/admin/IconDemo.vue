<template>
  <div class="min-h-screen bg-gray-50">
    <!-- En-tête avec icône par défaut -->
    <AdminHeader
      title="Démonstration des Icônes"
      description="Aperçu de toutes les icônes personnalisées disponibles"
      icon="default"
    />

    <div class="container mx-auto px-4 md:px-8 py-8">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">🎨 Galerie des Icônes Personnalisées</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Icône Users -->
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-3 rounded-xl shadow-lg border border-indigo-200">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                <circle cx="18" cy="6" r="3" fill="currentColor" opacity="0.3"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.5 6h3M18 4.5v3" stroke="white"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">👥 Membres</h3>
              <p class="text-sm text-gray-600">Gestion des utilisateurs</p>
            </div>
          </div>

          <!-- Icône Children -->
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-3 rounded-xl shadow-lg border border-indigo-200">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                <circle cx="8" cy="10" r="1.5" fill="currentColor" opacity="0.6"/>
                <circle cx="16" cy="10" r="1.5" fill="currentColor" opacity="0.6"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 13h2M16 13h2" opacity="0.7"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">💝 Enfants</h3>
              <p class="text-sm text-gray-600">Suivi des plus petits</p>
            </div>
          </div>

          <!-- Icône Activities -->
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-3 rounded-xl shadow-lg border border-indigo-200">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                <path d="M12 15l-2-1.5L8 15l1-2.5L7 11h2.5L12 8.5 14.5 11H17l-2 1.5 1 2.5z" fill="currentColor" opacity="0.4"/>
                <circle cx="8" cy="11" r="1" fill="currentColor" opacity="0.3"/>
                <circle cx="16" cy="11" r="1" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">⭐ Activités</h3>
              <p class="text-sm text-gray-600">Planification d'événements</p>
            </div>
          </div>

          <!-- Icône Events -->
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-3 rounded-xl shadow-lg border border-indigo-200">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                <circle cx="19" cy="5" r="3" fill="currentColor" opacity="0.8"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.5 5h3M19 3.5v3" stroke="white"/>
                <rect x="9" y="13" width="6" height="4" rx="1" fill="currentColor" opacity="0.2"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 15h4M10 16h3"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">🔔 Événements</h3>
              <p class="text-sm text-gray-600">Gestion des événements</p>
            </div>
          </div>

          <!-- Icône News -->
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-3 rounded-xl shadow-lg border border-indigo-200">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                <path d="M18 3l-1.5 1.5L18 6l1.5-1.5L18 3z" fill="currentColor" opacity="0.6"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16.5 4.5L15 6"/>
                <rect x="7" y="8" width="6" height="4" fill="currentColor" opacity="0.1"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">📰 Actualités</h3>
              <p class="text-sm text-gray-600">Publication de nouvelles</p>
            </div>
          </div>

          <!-- Icône Finance -->
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-3 rounded-xl shadow-lg border border-indigo-200">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                <path d="M8 16l2-2 2 2 4-4" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
                <circle cx="8" cy="16" r="1" fill="currentColor" opacity="0.4"/>
                <circle cx="10" cy="14" r="1" fill="currentColor" opacity="0.4"/>
                <circle cx="12" cy="16" r="1" fill="currentColor" opacity="0.4"/>
                <circle cx="16" cy="12" r="1" fill="currentColor" opacity="0.4"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">💰 Finances</h3>
              <p class="text-sm text-gray-600">Gestion budgétaire</p>
            </div>
          </div>

          <!-- Icône Prayer -->
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-3 rounded-xl shadow-lg border border-indigo-200">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                <path d="M12 2l1 2-1 2-1-2 1-2z" fill="currentColor" opacity="0.6"/>
                <path d="M8 4l0.5 1.5L8 7l-0.5-1.5L8 4z" fill="currentColor" opacity="0.4"/>
                <path d="M16 4l0.5 1.5L16 7l-0.5-1.5L16 4z" fill="currentColor" opacity="0.4"/>
                <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">🙏 Prières</h3>
              <p class="text-sm text-gray-600">Demandes d'intercession</p>
            </div>
          </div>

          <!-- Icône Music -->
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-3 rounded-xl shadow-lg border border-indigo-200">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                <path d="M3 8c1 0 2-1 3-1s2 1 3 1" stroke="currentColor" stroke-width="1" opacity="0.5"/>
                <path d="M3 11c1 0 2-1 3-1s2 1 3 1" stroke="currentColor" stroke-width="1" opacity="0.4"/>
                <path d="M3 14c1 0 2-1 3-1s2 1 3 1" stroke="currentColor" stroke-width="1" opacity="0.3"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">🎵 Musique</h3>
              <p class="text-sm text-gray-600">Louange et worship</p>
            </div>
          </div>

          <!-- Icône Settings -->
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-3 rounded-xl shadow-lg border border-indigo-200">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                <path d="M12 10v4M10 12h4" stroke="currentColor" stroke-width="1.5" opacity="0.7"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">⚙️ Paramètres</h3>
              <p class="text-sm text-gray-600">Configuration système</p>
            </div>
          </div>
        </div>

        <div class="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 class="text-lg font-semibold text-blue-800 mb-2">💡 Comment utiliser</h3>
          <div class="text-sm text-blue-700 space-y-2">
            <p><strong>Détection automatique :</strong> Omettez la prop <code class="bg-white px-2 py-1 rounded">icon</code> pour une détection basée sur le titre</p>
            <p><strong>Icône spécifique :</strong> Utilisez <code class="bg-white px-2 py-1 rounded">icon="users"</code> pour forcer une icône particulière</p>
            <p><strong>Nouvelles icônes :</strong> finance, prayer, music sont maintenant disponibles !</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminHeader from '../../components/layout/AdminHeader.vue'
</script>