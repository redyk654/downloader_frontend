import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/facebookdownloader',
      name: 'facebookdownloader',
      component: () => import('../views/FacebookDownloaderView.vue'),
    },
    {
      path: '/youtubedownloader',
      name: 'youtubedownloader',
      // Lazy load the YouTube Downloader view
      component: () => import('../views/YoutubeDownloaderView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true }, // Example of a route that requires authentication
    }
  ],
})

export default router
