import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import path from 'path';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/videodownloader',
    name: 'videodownloader',
    component: () => import('../views/VideoDownloaderView.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  {
    path: '/unauthorized', // Nouvelle route pour les non-admins
    name: 'unauthorized',
    component: () => import('../views/UnauthorizedView.vue'),
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignInView.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUpView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation Guard : Vérifie l'authentification et le rôle admin
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Récupère le statut admin
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth && !token) {
    next('/signin'); // Pas authentifié
  } else if (to.name === 'signin' && token) {
    next('/'); // Déjà authentifié, redirige vers l'accueil
  } else if (requiresAdmin && token && !isAdmin) {
    next('/unauthorized'); // Authentifié mais pas admin, redirige vers page non autorisée
  } else {
    next(); // Continue la navigation
  }
});


export default router
