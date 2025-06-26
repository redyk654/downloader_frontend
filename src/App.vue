<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';

const router = useRouter();
const username = ref<string | null>('');

const checkAuth = () => {
  username.value = localStorage.getItem('authToken') ? localStorage.getItem('username') : '';
};

onMounted(() => {
  checkAuth();
  // Optionnel : écoute le storage pour MAJ si déconnexion dans un autre onglet
  window.addEventListener('storage', checkAuth);
});

const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('username');
  username.value = '';
  router.push('/signin');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
    <!-- Header fixe qui occupe toute la largeur -->
    <header
      class="flex justify-between items-center px-6 py-4 bg-white shadow-md w-full fixed top-0 left-0 z-50"
    >
      <!-- Logo à gauche -->
      <div class="flex-shrink-0">
        <div class="text-xl font-bold text-gray-800">
          Vidown
        </div>
      </div>
      
      <!-- Navigation centrée -->
      <nav class="flex-1 flex justify-center">
        <ul class="flex space-x-2">
          <li>
            <RouterLink
              to="/"
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-all duration-200"
            >
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/videodownloader"
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-all duration-200"
            >
              Video Downloader
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin"
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-all duration-200"
            >
              Admin
            </RouterLink>
          </li>
        </ul>
      </nav>
      
      <!-- Auth/Profil à droite -->
      <div class="flex-shrink-0">
        <template v-if="username">
          <div class="flex items-center space-x-3">
            <!-- User icon stylisé -->
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shadow">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                <circle cx="12" cy="11" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
            </div>
            <span class="font-semibold text-gray-700 text-lg">{{ username }}</span>
            <button
              class="ml-2 px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition"
              @click="logout"
            >
              Logout
            </button>
          </div>
        </template>
        <template v-else>
          <button
            class="cursor-pointer px-6 py-2 min-w-[120px] text-center text-white bg-blue-600 rounded hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
            @click="$router.push('/signin')"
          >
            Sign In
          </button>
          <button
            class="cursor-pointer px-6 py-2 min-w-[120px] text-center text-blue-700 border border-blue-600 rounded hover:bg-blue-500 hover:text-white active:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
            @click="$router.push('/signup')"
          >
            Sign Up
          </button>
        </template>
      </div>
    </header>

    <!-- Contenu principal avec marge pour compenser le header fixe -->
    <main class="pt-20">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

</style>
