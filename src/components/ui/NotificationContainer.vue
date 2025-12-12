<template>
  <div class="fixed top-4 right-4 z-[9999] space-y-3 max-w-sm w-full">
    <transition-group
      name="notification"
      tag="div"
      class="space-y-3"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'relative bg-white shadow-xl rounded-xl pointer-events-auto ring-1 ring-black/5 overflow-hidden transform transition-all duration-300',
          getNotificationClasses(notification.type)
        ]"
      >
        <!-- Barre de couleur -->
        <div :class="getBarClasses(notification.type)" class="absolute top-0 left-0 w-full h-1"></div>
        
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div :class="getIconBgClasses(notification.type)" class="w-8 h-8 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-bold">{{ getNotificationIcon(notification.type) }}</span>
              </div>
            </div>
            <div class="ml-3 w-0 flex-1">
              <p :class="getTitleClasses(notification.type)" class="text-sm font-semibold mb-1">
                {{ getNotificationTitle(notification.type) }}
              </p>
              <p class="text-sm text-gray-600 leading-relaxed">
                {{ notification.message }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0">
              <button
                @click="remove(notification.id)"
                class="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <!-- Barre de progression -->
        <div v-if="notification.duration > 0" class="absolute bottom-0 left-0 h-1 bg-gray-200">
          <div 
            :class="getProgressClasses(notification.type)"
            class="h-full transition-all ease-linear"
            :style="{ 
              width: '100%',
              animation: `shrink ${notification.duration}ms linear forwards`
            }"
          ></div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useNotification } from '../../composables/useNotification.js'

const { notifications, remove } = useNotification()

const getNotificationClasses = (type) => {
  const classes = {
    success: 'border-green-100',
    error: 'border-red-100',
    warning: 'border-yellow-100',
    info: 'border-blue-100'
  }
  return classes[type] || classes.info
}

const getBarClasses = (type) => {
  const classes = {
    success: 'bg-gradient-to-r from-green-400 to-green-500',
    error: 'bg-gradient-to-r from-red-400 to-red-500',
    warning: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
    info: 'bg-gradient-to-r from-blue-400 to-blue-500'
  }
  return classes[type] || classes.info
}

const getIconBgClasses = (type) => {
  const classes = {
    success: 'bg-gradient-to-r from-green-400 to-green-500',
    error: 'bg-gradient-to-r from-red-400 to-red-500',
    warning: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
    info: 'bg-gradient-to-r from-blue-400 to-blue-500'
  }
  return classes[type] || classes.info
}

const getTitleClasses = (type) => {
  const classes = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  }
  return classes[type] || classes.info
}

const getProgressClasses = (type) => {
  const classes = {
    success: 'bg-green-400',
    error: 'bg-red-400',
    warning: 'bg-yellow-400',
    info: 'bg-blue-400'
  }
  return classes[type] || classes.info
}

const getNotificationIcon = (type) => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }
  return icons[type] || icons.info
}

const getNotificationTitle = (type) => {
  const titles = {
    success: 'Succès',
    error: 'Erreur',
    warning: 'Attention',
    info: 'Information'
  }
  return titles[type] || titles.info
}
</script>

<style scoped>
.notification-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.notification-leave-active {
  transition: all 0.3s ease-in;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>