<template>
  <div class="min-h-screen bg-gray-50">
    <!-- En-tête avec AdminHeader -->
    <AdminHeader
      title="Tableau de Bord"
      description="Vue d'ensemble complète de l'administration de l'église"
      icon="dashboard"
      :action-button="{ text: 'Exporter les données', icon: '📊' }"
      @action-click="showExportModal = true"
    />

    <!-- Modal d'exportation -->
    <div v-if="showExportModal" class="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900 flex items-center gap-2">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Exporter les données
          </h3>
          <button @click="showExportModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <!-- Sélection de la période -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Période d'exportation</label>
            <select v-model="exportPeriod" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">Toutes les données</option>
              <option value="thisMonth">Ce mois</option>
              <option value="lastMonth">Le mois dernier</option>
              <option value="thisYear">Cette année</option>
              <option value="lastYear">L'année dernière</option>
              <option value="custom">Période personnalisée</option>
            </select>
          </div>

          <!-- Dates personnalisées -->
          <div v-if="exportPeriod === 'custom'" class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
              <input 
                v-model="customStartDate" 
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
              <input 
                v-model="customEndDate" 
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Types de données à exporter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Données à inclure</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input v-model="exportOptions.members" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-700">Membres ({{ totalMembers }})</span>
              </label>
              <label class="flex items-center">
                <input v-model="exportOptions.children" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-700">Enfants ({{ totalChildren }})</span>
              </label>
              <label class="flex items-center">
                <input v-model="exportOptions.events" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-700">Événements ({{ totalEvents }})</span>
              </label>
              <label class="flex items-center">
                <input v-model="exportOptions.activities" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-700">Activités ({{ totalActivities }})</span>
              </label>
              <label class="flex items-center">
                <input v-model="exportOptions.statistics" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-700">Statistiques et rapports</span>
              </label>
            </div>
          </div>

          <!-- Format d'exportation -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Format d'exportation</label>
            <div class="flex gap-3">
              <label class="flex items-center">
                <input v-model="exportFormat" value="excel" type="radio" class="text-blue-600 focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-700">Excel (.xlsx)</span>
              </label>
              <label class="flex items-center">
                <input v-model="exportFormat" value="csv" type="radio" class="text-blue-600 focus:ring-blue-500">
                <span class="ml-2 text-sm text-gray-700">CSV</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 mt-8">
          <button 
            @click="showExportModal = false"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button 
            @click="handleExport"
            :disabled="isExporting || !hasSelectedData"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <svg v-if="isExporting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            {{ isExporting ? 'Exportation...' : 'Exporter' }}
          </button>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 md:px-8 py-8">
      
      <!-- Statistiques principales -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <!-- Total Membres -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Total Membres</p>
              <p class="text-4xl font-bold text-gray-800 mt-2">{{ totalMembers }}</p>
              <p class="text-sm text-green-600 mt-1 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
                +{{ newMembersThisMonth }} ce mois
              </p>
            </div>
            <div class="bg-blue-100 p-4 rounded-2xl">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Enfants -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Enfants</p>
              <p class="text-4xl font-bold text-gray-800 mt-2">{{ totalChildren }}</p>
              <p class="text-sm text-gray-500 mt-1">École du dimanche</p>
            </div>
            <div class="bg-pink-100 p-4 rounded-2xl">
              <svg class="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Événements -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Événements</p>
              <p class="text-4xl font-bold text-gray-800 mt-2">{{ totalEvents }}</p>
              <p class="text-sm text-blue-600 mt-1">{{ upcomingEvents }} à venir</p>
            </div>
            <div class="bg-green-100 p-4 rounded-2xl">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Activités -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium uppercase tracking-wide">Activités</p>
              <p class="text-4xl font-bold text-gray-800 mt-2">{{ totalActivities }}</p>
              <p class="text-sm text-orange-600 mt-1">{{ activeActivities }} actives</p>
            </div>
            <div class="bg-purple-100 p-4 rounded-2xl">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Graphiques principaux -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        <!-- Graphique évolution des membres -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              Évolution des Membres
            </h3>
            <select v-model="selectedPeriod" class="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="6months">6 derniers mois</option>
              <option value="year">Cette année</option>
              <option value="all">Tout</option>
            </select>
          </div>
          <div class="h-80">
            <Chart 
              type="line" 
              :data="membersEvolutionChart" 
              :options="chartOptions"
              class="h-full w-full"
            />
          </div>
        </div>

        <!-- Graphique répartition par âge -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/>
            </svg>
            Répartition par Catégorie
          </h3>
          <div class="h-80">
            <Chart 
              type="doughnut" 
              :data="ageDistributionChart" 
              :options="doughnutOptions"
              class="h-full w-full"
            />
          </div>
        </div>
      </div>

      <!-- Statistiques détaillées -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        <!-- Activités par mois -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Activités par Mois
          </h3>
          <div class="h-64">
            <Chart 
              type="bar" 
              :data="activitiesMonthChart" 
              :options="barOptions"
              class="h-full w-full"
            />
          </div>
        </div>

        <!-- Présence par département -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            Départements
          </h3>
          <div class="space-y-4">
            <div v-for="dept in departmentStats" :key="dept.name" class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div :class="dept.color" class="w-4 h-4 rounded-full"></div>
                <span class="font-medium text-gray-700">{{ dept.name }}</span>
              </div>
              <div class="text-right">
                <span class="text-lg font-bold text-gray-800">{{ dept.count }}</span>
                <div class="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div :class="dept.color.replace('bg-', 'bg-')" :style="`width: ${dept.percentage}%`" class="h-2 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Événements à venir -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Prochains Événements
            </h3>
            <router-link to="/dashboard/events" class="text-orange-600 text-sm font-medium">
              Voir tous →
            </router-link>
          </div>
          
          <div class="space-y-4">
            <div v-for="event in upcomingEventsList" :key="event.id" class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div class="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <span class="text-lg">{{ getEventIcon(event.type) }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-800 truncate">{{ event.titre }}</h4>
                <p class="text-sm text-gray-600">{{ formatDate(event.date) }}</p>
                <span class="text-xs font-medium text-orange-600">{{ getDaysUntil(event.date) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Résumé des activités récentes et actions rapides -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Activités récentes détaillées -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
            Activités Récentes
          </h3>
          
          <div class="space-y-4">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
              <div class="flex-shrink-0">
                <div :class="getActivityIconClass(activity.type)" class="w-12 h-12 rounded-full flex items-center justify-center">
                  <span class="text-lg">{{ getActivityIcon(activity.type) }}</span>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-gray-800">{{ activity.nom }}</h4>
                <p class="text-sm text-gray-600">{{ formatDate(activity.date) }} • {{ activity.responsable }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ activity.participants?.length || 0 }} participants</p>
              </div>
              <div class="text-right">
                <span :class="getStatusClass(activity.statut)" class="px-3 py-1 rounded-full text-xs font-semibold">
                  {{ getStatusLabel(activity.statut) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions rapides et raccourcis -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Actions Rapides
          </h3>
          
          <div class="grid grid-cols-2 gap-3 mb-6">
            <router-link to="/dashboard/membres" class="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-xl text-center">
              <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </div>
              <span class="text-sm font-medium text-gray-700">Nouveau Membre</span>
            </router-link>
            
            <router-link to="/dashboard/events" class="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-xl text-center">
              <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <span class="text-sm font-medium text-gray-700">Nouvel Événement</span>
            </router-link>
            
            <router-link to="/dashboard/activity" class="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-xl text-center">
              <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
              <span class="text-sm font-medium text-gray-700">Nouvelle Activité</span>
            </router-link>
            
            <router-link to="/dashboard/actuality" class="flex flex-col items-center gap-2 p-4 bg-orange-50 rounded-xl text-center">
              <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                </svg>
              </div>
              <span class="text-sm font-medium text-gray-700">Nouvelle Actualité</span>
            </router-link>
          </div>

          <!-- Statistiques rapides -->
          <div class="border-t pt-4">
            <h4 class="font-semibold text-gray-800 mb-3">Résumé Rapide</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Présence moyenne</span>
                <span class="font-semibold text-gray-900">{{ averageAttendance }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Événements ce mois</span>
                <span class="font-semibold text-gray-900">{{ eventsThisMonth }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Activités planifiées</span>
                <span class="font-semibold text-gray-900">{{ plannedActivities }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '../../stores/data.js'
import { useEventsStore } from '../../stores/events.js'
import { useExport } from '../../composables/useExport.js'
import AdminHeader from '../../components/layout/AdminHeader.vue'
import Chart from 'primevue/chart'

const dataStore = useDataStore()
const eventsStore = useEventsStore()

// Utiliser le composable d'exportation
const {
  showExportModal,
  exportPeriod,
  customStartDate,
  customEndDate,
  exportFormat,
  isExporting,
  exportOptions,
  hasSelectedData,
  handleExport: handleExportBase,
  resetExportOptions
} = useExport()

const selectedPeriod = ref('6months')

// Statistiques calculées
const totalMembers = computed(() => dataStore.users?.length || 0)
const totalChildren = computed(() => dataStore.children?.length || 0)
const totalEvents = computed(() => eventsStore.events?.length || 0)
const totalActivities = computed(() => dataStore.activities?.length || 0)

const newMembersThisMonth = computed(() => {
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  return dataStore.users?.filter(user => {
    const userDate = new Date(user.createdAt || new Date())
    return userDate.getMonth() === thisMonth && userDate.getFullYear() === thisYear
  }).length || 5
})

const upcomingEvents = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return eventsStore.events?.filter(event => event.date >= today).length || 0
})

const activeActivities = computed(() => {
  return dataStore.activities?.filter(activity => activity.statut === 'enCours').length || 0
})

// Répartition des membres par catégorie
const membersByCategory = computed(() => {
  const users = dataStore.users || []
  return {
    hommes: users.filter(u => u.groupe_id === 2).length || 150,
    femmes: users.filter(u => u.groupe_id === 1).length || 180,
    jeunes: users.filter(u => u.groupe_id === 3).length || 85
  }
})

// Activités récentes
const recentActivities = computed(() => {
  return (dataStore.activities || [])
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6)
})

// Prochains événements
const upcomingEventsList = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return (eventsStore.events || [])
    .filter(event => event.date >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5)
})

// Statistiques supplémentaires
const averageAttendance = computed(() => 85)
const eventsThisMonth = computed(() => {
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  return eventsStore.events?.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.getMonth() === thisMonth && eventDate.getFullYear() === thisYear
  }).length || 3
})

const plannedActivities = computed(() => {
  return dataStore.activities?.filter(activity => activity.statut === 'planifie').length || 0
})

// Données pour les graphiques
const membersEvolutionChart = computed(() => {
  return {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Nouveaux membres',
        data: [12, 19, 8, 15, 22, 18, 25, 14, 20, 16, 28, 24],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Total cumulé',
        data: [320, 339, 347, 362, 384, 402, 427, 441, 461, 477, 505, 529],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: false
      }
    ]
  }
})

const ageDistributionChart = computed(() => {
  const stats = membersByCategory.value
  return {
    labels: ['Hommes', 'Femmes', 'Jeunes', 'Enfants'],
    datasets: [
      {
        data: [stats.hommes, stats.femmes, stats.jeunes, totalChildren.value],
        backgroundColor: [
          '#3B82F6',
          '#EC4899',
          '#10B981',
          '#F59E0B'
        ],
        borderWidth: 0
      }
    ]
  }
})

const activitiesMonthChart = computed(() => {
  return {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Activités',
        data: [8, 12, 6, 15, 10, 18],
        backgroundColor: '#8B5CF6',
        borderRadius: 4
      }
    ]
  }
})

// Statistiques par département
const departmentStats = computed(() => {
  const total = totalMembers.value
  return [
    {
      name: "Service d'ordre",
      count: Math.floor(total * 0.25),
      percentage: 25,
      color: 'bg-blue-500'
    },
    {
      name: "Communication",
      count: Math.floor(total * 0.20),
      percentage: 20,
      color: 'bg-green-500'
    },
    {
      name: "Logistique",
      count: Math.floor(total * 0.30),
      percentage: 30,
      color: 'bg-purple-500'
    },
    {
      name: "Pastorale",
      count: Math.floor(total * 0.25),
      percentage: 25,
      color: 'bg-orange-500'
    }
  ]
})

// Options pour les graphiques
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        color: 'rgba(0,0,0,0.1)'
      },
      beginAtZero: true
    }
  }
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true
      }
    }
  },
  cutout: '60%'
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        color: 'rgba(0,0,0,0.1)'
      },
      beginAtZero: true
    }
  }
}

// Fonctions utilitaires
function getActivityIcon(type) {
  const icons = {
    evangelisation: '📖',
    nettoyage: '🧹',
    visite: '🏥',
    reunion: '👥'
  }
  return icons[type] || '📋'
}

function getActivityIconClass(type) {
  const classes = {
    evangelisation: 'bg-purple-100 text-purple-600',
    nettoyage: 'bg-green-100 text-green-600',
    visite: 'bg-blue-100 text-blue-600',
    reunion: 'bg-orange-100 text-orange-600'
  }
  return classes[type] || 'bg-gray-100 text-gray-600'
}

function getStatusClass(status) {
  const classes = {
    planifie: 'bg-yellow-100 text-yellow-800',
    enCours: 'bg-blue-100 text-blue-800',
    termine: 'bg-green-100 text-green-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

function getStatusLabel(status) {
  const labels = {
    planifie: 'Planifié',
    enCours: 'En cours',
    termine: 'Terminé'
  }
  return labels[status] || status
}

function getEventIcon(type) {
  const icons = {
    Concert: '🎵',
    Baptême: '💧',
    Mariage: '💒',
    Conférence: '📚',
    Retraite: '⛰️',
    Autre: '📋'
  }
  return icons[type] || '📅'
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  })
}

function getDaysUntil(dateStr) {
  const today = new Date()
  const eventDate = new Date(dateStr + 'T00:00:00')
  const diffTime = eventDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return "Aujourd'hui"
  if (diffDays === 1) return "Demain"
  if (diffDays > 1) return `Dans ${diffDays} jours`
  return "Passé"
}

// Fonctions d'exportation
function getDateRange() {
  const today = new Date()
  let startDate, endDate
  
  switch (exportPeriod.value) {
    case 'thisMonth':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1)
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      break
    case 'lastMonth':
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      endDate = new Date(today.getFullYear(), today.getMonth(), 0)
      break
    case 'thisYear':
      startDate = new Date(today.getFullYear(), 0, 1)
      endDate = new Date(today.getFullYear(), 11, 31)
      break
    case 'lastYear':
      startDate = new Date(today.getFullYear() - 1, 0, 1)
      endDate = new Date(today.getFullYear() - 1, 11, 31)
      break
    case 'custom':
      startDate = customStartDate.value ? new Date(customStartDate.value) : null
      endDate = customEndDate.value ? new Date(customEndDate.value) : null
      break
    default:
      return { startDate: null, endDate: null }
  }
  
  return { startDate, endDate }
}

function filterDataByDate(data, dateField) {
  const { startDate, endDate } = getDateRange()
  
  if (!startDate && !endDate) return data
  
  return data.filter(item => {
    const itemDate = new Date(item[dateField])
    if (startDate && itemDate < startDate) return false
    if (endDate && itemDate > endDate) return false
    return true
  })
}

function generateExcelData() {
  const workbook = []
  
  if (exportOptions.value.members) {
    const members = filterDataByDate(dataStore.users || [], 'createdAt')
    workbook.push({
      name: 'Membres',
      data: [
        ['Nom', 'Prénom', 'Email', 'Téléphone', 'Groupe', 'Date d\'inscription'],
        ...members.map(member => [
          member.nom || '',
          member.prenom || '',
          member.email || '',
          member.telephone || '',
          member.groupe_id === 1 ? 'Femmes' : member.groupe_id === 2 ? 'Hommes' : 'Jeunes',
          member.createdAt ? new Date(member.createdAt).toLocaleDateString('fr-FR') : ''
        ])
      ]
    })
  }
  
  if (exportOptions.value.children) {
    const children = filterDataByDate(dataStore.children || [], 'createdAt')
    workbook.push({
      name: 'Enfants',
      data: [
        ['Nom', 'Prénom', 'Âge', 'Classe', 'Parent/Tuteur', 'Date d\'inscription'],
        ...children.map(child => [
          child.nom || '',
          child.prenom || '',
          child.age || '',
          child.classe || '',
          child.parent || '',
          child.createdAt ? new Date(child.createdAt).toLocaleDateString('fr-FR') : ''
        ])
      ]
    })
  }
  
  if (exportOptions.value.events) {
    const events = filterDataByDate(eventsStore.events || [], 'date')
    workbook.push({
      name: 'Événements',
      data: [
        ['Titre', 'Type', 'Date', 'Heure', 'Lieu', 'Description', 'Statut'],
        ...events.map(event => [
          event.titre || '',
          event.type || '',
          event.date || '',
          event.heure || '',
          event.lieu || '',
          event.description || '',
          event.statut || ''
        ])
      ]
    })
  }
  
  if (exportOptions.value.activities) {
    const activities = filterDataByDate(dataStore.activities || [], 'date')
    workbook.push({
      name: 'Activités',
      data: [
        ['Nom', 'Type', 'Date', 'Responsable', 'Participants', 'Statut'],
        ...activities.map(activity => [
          activity.nom || '',
          activity.type || '',
          activity.date || '',
          activity.responsable || '',
          activity.participants?.length || 0,
          activity.statut || ''
        ])
      ]
    })
  }
  
  if (exportOptions.value.statistics) {
    const stats = membersByCategory.value
    workbook.push({
      name: 'Statistiques',
      data: [
        ['Métrique', 'Valeur'],
        ['Total Membres', totalMembers.value],
        ['Total Enfants', totalChildren.value],
        ['Total Événements', totalEvents.value],
        ['Total Activités', totalActivities.value],
        ['Nouveaux membres ce mois', newMembersThisMonth.value],
        ['Événements à venir', upcomingEvents.value],
        ['Activités actives', activeActivities.value],
        ['Hommes', stats.hommes],
        ['Femmes', stats.femmes],
        ['Jeunes', stats.jeunes],
        ['Présence moyenne', averageAttendance.value + '%']
      ]
    })
  }
  
  return workbook
}

function downloadExcel(workbook) {
  // Créer un fichier Excel professionnel avec formatage
  let excelContent = ''
  
  // En-tête du fichier Excel
  excelContent += '<?xml version="1.0"?>\n'
  excelContent += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n'
  excelContent += ' xmlns:o="urn:schemas-microsoft-com:office:office"\n'
  excelContent += ' xmlns:x="urn:schemas-microsoft-com:office:excel"\n'
  excelContent += ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\n'
  excelContent += ' xmlns:html="http://www.w3.org/TR/REC-html40">\n'
  
  // Styles Excel
  excelContent += '<Styles>\n'
  
  // Style pour les en-têtes
  excelContent += '<Style ss:ID="HeaderStyle">\n'
  excelContent += '<Font ss:Bold="1" ss:Size="12" ss:Color="#FFFFFF"/>\n'
  excelContent += '<Interior ss:Color="#4472C4" ss:Pattern="Solid"/>\n'
  excelContent += '<Alignment ss:Horizontal="Center" ss:Vertical="Center"/>\n'
  excelContent += '<Borders>\n'
  excelContent += '<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>\n'
  excelContent += '<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>\n'
  excelContent += '<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>\n'
  excelContent += '<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>\n'
  excelContent += '</Borders>\n'
  excelContent += '</Style>\n'
  
  // Style pour les données
  excelContent += '<Style ss:ID="DataStyle">\n'
  excelContent += '<Font ss:Size="10"/>\n'
  excelContent += '<Alignment ss:Horizontal="Left" ss:Vertical="Center"/>\n'
  excelContent += '<Borders>\n'
  excelContent += '<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
  excelContent += '<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
  excelContent += '<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
  excelContent += '<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
  excelContent += '</Borders>\n'
  excelContent += '</Style>\n'
  
  // Style pour les nombres
  excelContent += '<Style ss:ID="NumberStyle">\n'
  excelContent += '<Font ss:Size="10"/>\n'
  excelContent += '<Alignment ss:Horizontal="Right" ss:Vertical="Center"/>\n'
  excelContent += '<Borders>\n'
  excelContent += '<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
  excelContent += '<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
  excelContent += '<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
  excelContent += '<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
  excelContent += '</Borders>\n'
  excelContent += '</Style>\n'
  
  // Style pour les titres de feuilles
  excelContent += '<Style ss:ID="SheetTitleStyle">\n'
  excelContent += '<Font ss:Bold="1" ss:Size="16" ss:Color="#2F5597"/>\n'
  excelContent += '<Alignment ss:Horizontal="Center" ss:Vertical="Center"/>\n'
  excelContent += '</Style>\n'
  
  // Style pour les sous-titres
  excelContent += '<Style ss:ID="SubtitleStyle">\n'
  excelContent += '<Font ss:Bold="1" ss:Size="11" ss:Color="#70AD47"/>\n'
  excelContent += '<Alignment ss:Horizontal="Left" ss:Vertical="Center"/>\n'
  excelContent += '</Style>\n'
  
  excelContent += '</Styles>\n'
  
  // Créer chaque feuille de calcul
  workbook.forEach((sheet, sheetIndex) => {
    excelContent += `<Worksheet ss:Name="${sheet.name}">\n`
    excelContent += '<Table>\n'
    
    // Définir les colonnes avec largeur automatique
    const maxCols = Math.max(...sheet.data.map(row => row.length))
    for (let i = 0; i < maxCols; i++) {
      excelContent += '<Column ss:AutoFitWidth="1" ss:Width="120"/>\n'
    }
    
    // Ajouter le titre de la feuille
    excelContent += '<Row ss:Height="30">\n'
    excelContent += `<Cell ss:MergeAcross="${maxCols - 1}" ss:StyleID="SheetTitleStyle">\n`
    excelContent += `<Data ss:Type="String">📊 ${sheet.name} - MERCV Dashboard</Data>\n`
    excelContent += '</Cell>\n'
    excelContent += '</Row>\n'
    
    // Ajouter la date d'exportation
    const exportDate = new Date().toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    excelContent += '<Row ss:Height="20">\n'
    excelContent += `<Cell ss:MergeAcross="${maxCols - 1}" ss:StyleID="SubtitleStyle">\n`
    excelContent += `<Data ss:Type="String">Exporté le ${exportDate}</Data>\n`
    excelContent += '</Cell>\n'
    excelContent += '</Row>\n'
    
    // Ligne vide pour l'espacement
    excelContent += '<Row ss:Height="10"></Row>\n'
    
    // Ajouter les données
    sheet.data.forEach((row, rowIndex) => {
      const isHeader = rowIndex === 0
      const rowHeight = isHeader ? '25' : '20'
      
      excelContent += `<Row ss:Height="${rowHeight}">\n`
      
      row.forEach((cell, cellIndex) => {
        let cellStyle = 'DataStyle'
        let cellType = 'String'
        let cellValue = String(cell || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        
        if (isHeader) {
          cellStyle = 'HeaderStyle'
        } else if (typeof cell === 'number' || (!isNaN(cell) && cell !== '')) {
          cellStyle = 'NumberStyle'
          cellType = 'Number'
          cellValue = cell
        }
        
        excelContent += `<Cell ss:StyleID="${cellStyle}">\n`
        excelContent += `<Data ss:Type="${cellType}">${cellValue}</Data>\n`
        excelContent += '</Cell>\n'
      })
      
      excelContent += '</Row>\n'
    })
    
    // Ajouter un résumé en bas pour certaines feuilles
    if (sheet.name === 'Membres' || sheet.name === 'Enfants') {
      excelContent += '<Row ss:Height="10"></Row>\n'
      excelContent += '<Row>\n'
      excelContent += '<Cell ss:StyleID="SubtitleStyle">\n'
      excelContent += `<Data ss:Type="String">📈 Total: ${sheet.data.length - 1} enregistrements</Data>\n`
      excelContent += '</Cell>\n'
      excelContent += '</Row>\n'
    }
    
    excelContent += '</Table>\n'
    excelContent += '</Worksheet>\n'
  })
  
  // Ajouter une feuille de résumé
  const { startDate, endDate } = getDateRange()
  const periodText = getPeriodText()
  
  excelContent += '<Worksheet ss:Name="📋 Résumé Exécutif">\n'
  excelContent += '<Table>\n'
  excelContent += '<Column ss:AutoFitWidth="1" ss:Width="200"/>\n'
  excelContent += '<Column ss:AutoFitWidth="1" ss:Width="150"/>\n'
  
  // Titre du résumé
  excelContent += '<Row ss:Height="35">\n'
  excelContent += '<Cell ss:MergeAcross="1" ss:StyleID="SheetTitleStyle">\n'
  excelContent += '<Data ss:Type="String">📊 RÉSUMÉ EXÉCUTIF - MERCV</Data>\n'
  excelContent += '</Cell>\n'
  excelContent += '</Row>\n'
  
  excelContent += '<Row ss:Height="20">\n'
  excelContent += '<Cell ss:MergeAcross="1" ss:StyleID="SubtitleStyle">\n'
  excelContent += `<Data ss:Type="String">Période: ${periodText}</Data>\n`
  excelContent += '</Cell>\n'
  excelContent += '</Row>\n'
  
  excelContent += '<Row ss:Height="10"></Row>\n'
  
  // En-têtes du résumé
  excelContent += '<Row ss:Height="25">\n'
  excelContent += '<Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">📊 INDICATEUR</Data></Cell>\n'
  excelContent += '<Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">📈 VALEUR</Data></Cell>\n'
  excelContent += '</Row>\n'
  
  // Données du résumé
  const summaryData = [
    ['👥 Total Membres', totalMembers.value],
    ['👶 Total Enfants', totalChildren.value],
    ['📅 Total Événements', totalEvents.value],
    ['⭐ Total Activités', totalActivities.value],
    ['🆕 Nouveaux membres ce mois', newMembersThisMonth.value],
    ['🔜 Événements à venir', upcomingEvents.value],
    ['🏃 Activités actives', activeActivities.value],
    ['📊 Présence moyenne', averageAttendance.value + '%']
  ]
  
  summaryData.forEach(([label, value]) => {
    excelContent += '<Row ss:Height="22">\n'
    excelContent += '<Cell ss:StyleID="DataStyle">\n'
    excelContent += `<Data ss:Type="String">${label}</Data>\n`
    excelContent += '</Cell>\n'
    excelContent += '<Cell ss:StyleID="NumberStyle">\n'
    excelContent += `<Data ss:Type="String">${value}</Data>\n`
    excelContent += '</Cell>\n'
    excelContent += '</Row>\n'
  })
  
  // Pied de page
  excelContent += '<Row ss:Height="15"></Row>\n'
  excelContent += '<Row>\n'
  excelContent += '<Cell ss:MergeAcross="1" ss:StyleID="SubtitleStyle">\n'
  excelContent += '<Data ss:Type="String">🏛️ Mission Évangélique Réveil du Christ Vivant (MERCV)</Data>\n'
  excelContent += '</Cell>\n'
  excelContent += '</Row>\n'
  
  excelContent += '<Row>\n'
  excelContent += '<Cell ss:MergeAcross="1" ss:StyleID="DataStyle">\n'
  excelContent += '<Data ss:Type="String">📧 Contact: admin@mercv.org | 📞 Tél: +33 1 23 45 67 89</Data>\n'
  excelContent += '</Cell>\n'
  excelContent += '</Row>\n'
  
  excelContent += '</Table>\n'
  excelContent += '</Worksheet>\n'
  
  excelContent += '</Workbook>\n'
  
  // Créer et télécharger le fichier
  const blob = new Blob([excelContent], { 
    type: 'application/vnd.ms-excel;charset=utf-8' 
  })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  
  let filename = 'MERCV_Dashboard_Export'
  
  if (startDate && endDate) {
    const start = startDate.toISOString().split('T')[0]
    const end = endDate.toISOString().split('T')[0]
    filename += `_${start}_${end}`
  } else if (exportPeriod.value !== 'all') {
    filename += `_${exportPeriod.value}`
  }
  
  filename += '.xls'
  link.download = filename
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

// Fonction utilitaire pour obtenir le texte de la période
function getPeriodText() {
  const { startDate, endDate } = getDateRange()
  
  switch (exportPeriod.value) {
    case 'thisMonth':
      return 'Ce mois (' + new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) + ')'
    case 'lastMonth':
      const lastMonth = new Date()
      lastMonth.setMonth(lastMonth.getMonth() - 1)
      return 'Le mois dernier (' + lastMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) + ')'
    case 'thisYear':
      return 'Cette année (' + new Date().getFullYear() + ')'
    case 'lastYear':
      return 'L\'année dernière (' + (new Date().getFullYear() - 1) + ')'
    case 'custom':
      if (startDate && endDate) {
        return `Du ${startDate.toLocaleDateString('fr-FR')} au ${endDate.toLocaleDateString('fr-FR')}`
      }
      return 'Période personnalisée'
    default:
      return 'Toutes les données disponibles'
  }
}

async function handleExport() {
  // Préparer les statistiques personnalisées pour l'export
  const customStats = {
    totalMembers: totalMembers.value,
    totalChildren: totalChildren.value,
    totalEvents: totalEvents.value,
    totalActivities: totalActivities.value,
    newMembersThisMonth: newMembersThisMonth.value,
    upcomingEvents: upcomingEvents.value,
    activeActivities: activeActivities.value,
    averageAttendance: averageAttendance.value,
    membersByCategory: membersByCategory.value
  }
  
  // Utiliser la fonction d'export du composable
  const result = await handleExportBase(customStats)
  
  if (result.success) {
    console.log('Exportation réussie!')
  } else {
    console.error('Erreur lors de l\'exportation:', result.message)
  }
}

onMounted(async () => {
  // Charger les données si nécessaire
  if (!dataStore.users?.length) {
    await dataStore.getUsers()
  }
  if (!dataStore.children?.length) {
    await dataStore.getChildren()
  }
  if (!dataStore.activities?.length) {
    await dataStore.getActivities()
  }
  if (!eventsStore.events?.length) {
    await eventsStore.getEvents()
  }
})
</script>