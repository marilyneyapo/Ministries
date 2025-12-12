import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockUsers } from '../mocks/users.js'
import { mockChildren } from '../mocks/children.js'
import { mockActivities } from '../mocks/activities.js'

export const useDataStore = defineStore('data', () => {
  // State
  const users = ref([...mockUsers])
  const children = ref([...mockChildren])
  const activities = ref([...mockActivities])
  const isLoading = ref(false)

  // Getters
  const activeUsers = computed(() => users.value.filter(user => user.isActive))
  const activeChildren = computed(() => children.value.filter(child => child.isActive))
  const activeActivities = computed(() => activities.value.filter(activity => activity.isActive))
  
  const totalUsers = computed(() => users.value.length)
  const totalChildren = computed(() => children.value.length)
  const totalActivities = computed(() => activities.value.length)

  // Actions
  const getUsers = async () => {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 500))
    isLoading.value = false
    return users.value
  }

  const addUser = (user) => {
    user.id = Math.max(...users.value.map(u => u.id)) + 1
    user.createdAt = new Date().toISOString().split('T')[0]
    users.value.push(user)
  }

  const updateUser = (id, updatedUser) => {
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...updatedUser }
    }
  }

  const deleteUser = (id) => {
    users.value = users.value.filter(u => u.id !== id)
  }

  const getChildren = async () => {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 500))
    isLoading.value = false
    return children.value
  }

  const addChild = (child) => {
    child.id = Math.max(...children.value.map(c => c.id)) + 1
    child.registrationDate = new Date().toISOString().split('T')[0]
    children.value.push(child)
  }

  const updateChild = (id, updatedChild) => {
    const index = children.value.findIndex(c => c.id === id)
    if (index !== -1) {
      children.value[index] = { ...children.value[index], ...updatedChild }
    }
  }

  const deleteChild = (id) => {
    children.value = children.value.filter(c => c.id !== id)
  }

  const getActivities = async () => {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 500))
    isLoading.value = false
    return activities.value
  }

  const addActivity = (activity) => {
    activity.id = Math.max(...activities.value.map(a => a.id)) + 1
    activities.value.push(activity)
  }

  const updateActivity = (id, updatedActivity) => {
    const index = activities.value.findIndex(a => a.id === id)
    if (index !== -1) {
      activities.value[index] = { ...activities.value[index], ...updatedActivity }
    }
  }

  const deleteActivity = (id) => {
    activities.value = activities.value.filter(a => a.id !== id)
  }

  return {
    // State
    users,
    children,
    activities,
    isLoading,
    // Getters
    activeUsers,
    activeChildren,
    activeActivities,
    totalUsers,
    totalChildren,
    totalActivities,
    // Actions
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    getChildren,
    addChild,
    updateChild,
    deleteChild,
    getActivities,
    addActivity,
    updateActivity,
    deleteActivity
  }
})