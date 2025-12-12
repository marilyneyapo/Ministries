import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockEvents } from '../mocks/events.js'

export const useEventsStore = defineStore('events', () => {
  // State
  const events = ref([...mockEvents])
  const isLoading = ref(false)

  // Getters
  const upcomingEvents = computed(() => 
    events.value.filter(event => event.status === 'upcoming')
  )
  
  const completedEvents = computed(() => 
    events.value.filter(event => event.status === 'completed')
  )
  
  const eventsByCategory = computed(() => {
    const categories = {}
    events.value.forEach(event => {
      if (!categories[event.category]) {
        categories[event.category] = []
      }
      categories[event.category].push(event)
    })
    return categories
  })

  const totalEvents = computed(() => events.value.length)
  const totalParticipants = computed(() => 
    events.value.reduce((sum, event) => sum + event.participants, 0)
  )

  // Actions
  const getEvents = async () => {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 500))
    isLoading.value = false
    return events.value
  }

  const getEventById = (id) => {
    return events.value.find(event => event.id === id)
  }

  const addEvent = (event) => {
    event.id = Math.max(...events.value.map(e => e.id)) + 1
    event.status = event.status || 'upcoming'
    event.participants = event.participants || 0
    events.value.push(event)
  }

  const updateEvent = (id, updatedEvent) => {
    const index = events.value.findIndex(e => e.id === id)
    if (index !== -1) {
      events.value[index] = { ...events.value[index], ...updatedEvent }
    }
  }

  const deleteEvent = (id) => {
    events.value = events.value.filter(e => e.id !== id)
  }

  const registerToEvent = (eventId) => {
    const event = events.value.find(e => e.id === eventId)
    if (event && event.participants < event.maxParticipants) {
      event.participants++
    }
  }

  const unregisterFromEvent = (eventId) => {
    const event = events.value.find(e => e.id === eventId)
    if (event && event.participants > 0) {
      event.participants--
    }
  }

  return {
    // State
    events,
    isLoading,
    // Getters
    upcomingEvents,
    completedEvents,
    eventsByCategory,
    totalEvents,
    totalParticipants,
    // Actions
    getEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent,
    registerToEvent,
    unregisterFromEvent
  }
})