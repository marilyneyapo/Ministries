import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

// Import des pages
import Home from '../views/home/Home.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import Events from '../views/admin/Events.vue'
import Membres from '../views/admin/Membres.vue'
import Activity from '../views/admin/Activity.vue'
import Actualitydash from '../views/admin/Actualitydash.vue'
import AdminProgram from '../views/admin/AdminProgram.vue'
import Enfants from '../views/admin/Enfants.vue'
import Register from '../views/auth/Register.vue'
import Login from '../views/auth/Login.vue'
import ResetPassword from '../views/auth/ResetPassword.vue'
import Stats from '../components/stats/Stats.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false, hideForAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false, hideForAuth: true }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: { requiresAuth: false, hideForAuth: true }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      { 
        path: '', 
        redirect: '/dashboard/stats' 
      },      
      { 
        path: 'stats', 
        name: 'Stats', 
        component: Stats,
        meta: { requiresAuth: true }
      },
      {
        path: 'membres', 
        name: 'Membres',
        component: Membres,
        meta: { requiresAuth: true, requiresRole: ['admin', 'moderator'] }
      },
      {
        path: 'events', 
        name: 'Events', 
        component: Events,
        meta: { requiresAuth: true }
      },
      {
        path: 'activity', 
        name: 'Activity', 
        component: Activity,
        meta: { requiresAuth: true }
      },
      {
        path: 'actuality', 
        name: 'Actuality', 
        component: Actualitydash,
        meta: { requiresAuth: true, requiresRole: ['admin', 'moderator'] }
      },
      {
        path: 'programme', 
        name: 'Programme', 
        component: AdminProgram,
        meta: { requiresAuth: true }
      },
      {
        path: 'children', 
        name: 'Enfants', 
        component: Enfants,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Initialiser l'authentification si nécessaire
  if (!authStore.user && localStorage.getItem('token')) {
    await authStore.initializeAuth()
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const hideForAuth = to.matched.some(record => record.meta.hideForAuth)
  const requiresRole = to.meta.requiresRole

  // Rediriger les utilisateurs connectés loin des pages d'auth
  if (hideForAuth && authStore.isAuthenticated) {
    next('/dashboard')
    return
  }

  // Vérifier l'authentification
  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }

  // Vérifier les rôles
  if (requiresRole && authStore.user) {
    if (!requiresRole.includes(authStore.user.role)) {
      next('/dashboard')
      return
    }
  }

  next()
})

export default router
