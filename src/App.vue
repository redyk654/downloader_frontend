<script setup lang="ts">
  import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header fixe qui occupe toute la largeur -->
    <header
      class="flex justify-between items-center px-6 py-4 bg-white shadow-md w-full fixed top-0 left-0 z-50"
    >
      <!-- Logo à gauche -->
      <div class="flex-shrink-0">
        <div class="text-xl font-bold text-gray-800">
          Logo
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
              to="/facebookdownloader"
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-all duration-200"
            >
              Facebook Downloader
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/youtubedownloader"
              class="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-all duration-200"
            >
              Youtube Downloader
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
      
      <!-- Bouton à droite -->
      <div class="flex-shrink-0">
        <button
          class="cursor-pointer px-6 py-2 min-w-[120px] text-center text-blue-700 border border-blue-600 rounded hover:bg-blue-500 hover:text-white active:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
        >
          Sign Up
        </button>
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
