import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockNews } from '../mocks/news.js'

export const useNewsStore = defineStore('news', () => {
  // State
  const news = ref([...mockNews])
  const isLoading = ref(false)

  // Getters
  const publishedNews = computed(() => 
    news.value.filter(article => article.status === 'published')
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  )
  
  const draftNews = computed(() => 
    news.value.filter(article => article.status === 'draft')
  )
  
  const newsByCategory = computed(() => {
    const categories = {}
    publishedNews.value.forEach(article => {
      if (!categories[article.category]) {
        categories[article.category] = []
      }
      categories[article.category].push(article)
    })
    return categories
  })

  const latestNews = computed(() => 
    publishedNews.value.slice(0, 5)
  )

  const totalNews = computed(() => news.value.length)
  const totalViews = computed(() => 
    news.value.reduce((sum, article) => sum + article.views, 0)
  )

  // Actions
  const getNews = async () => {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 500))
    isLoading.value = false
    return news.value
  }

  const getNewsById = (id) => {
    return news.value.find(article => article.id === id)
  }

  const addNews = (article) => {
    article.id = Math.max(...news.value.map(n => n.id)) + 1
    article.publishedAt = new Date().toISOString().split('T')[0]
    article.views = 0
    article.status = article.status || 'draft'
    news.value.push(article)
  }

  const updateNews = (id, updatedArticle) => {
    const index = news.value.findIndex(n => n.id === id)
    if (index !== -1) {
      news.value[index] = { ...news.value[index], ...updatedArticle }
    }
  }

  const deleteNews = (id) => {
    news.value = news.value.filter(n => n.id !== id)
  }

  const publishNews = (id) => {
    const article = news.value.find(n => n.id === id)
    if (article) {
      article.status = 'published'
      article.publishedAt = new Date().toISOString().split('T')[0]
    }
  }

  const incrementViews = (id) => {
    const article = news.value.find(n => n.id === id)
    if (article) {
      article.views++
    }
  }

  return {
    // State
    news,
    isLoading,
    // Getters
    publishedNews,
    draftNews,
    newsByCategory,
    latestNews,
    totalNews,
    totalViews,
    // Actions
    getNews,
    getNewsById,
    addNews,
    updateNews,
    deleteNews,
    publishNews,
    incrementViews
  }
})