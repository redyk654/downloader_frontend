import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    path: '/unauthorized',
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
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('authToken');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const requiresAuth = to.matched.some(record => record.meta?.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta?.requiresAdmin);

  if (requiresAuth && !token) {
    next('/signin');
  } else if (to.name === 'signin' && token) {
    next('/');
  } else if (requiresAdmin && token && !isAdmin) {
    next('/unauthorized');
  } else {
    next();
  }
});

export default router