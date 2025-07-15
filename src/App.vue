<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';

const router = useRouter();
const username = ref<string | null>('');
const isMobileMenuOpen = ref(false);

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

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Header moderne avec glassmorphism -->
    <header
      class="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 lg:py-6 bg-white/80 backdrop-blur-sm shadow-2xl border-b border-white/20 w-full fixed top-0 left-0 z-50 transition-all duration-300"
    >
      <!-- Logo à gauche avec gradient et icône -->
      <div class="flex-shrink-0">
        <div class="flex items-center space-x-2 sm:space-x-3">
          <div class="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Vidown
          </div>
        </div>
      </div>

      <!-- Navigation desktop (cachée sur mobile) -->
      <nav class="hidden lg:flex flex-1 justify-center">
        <ul class="flex space-x-2 bg-white/40 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/30">
          <li>
            <RouterLink
              to="/"
              class="px-4 xl:px-6 py-3 text-gray-700 hover:bg-white/60 hover:text-blue-600 rounded-xl transition-all duration-300 font-medium hover:shadow-md transform hover:scale-105"
              active-class="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
            >
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/videodownloader"
              class="px-4 xl:px-6 py-3 text-gray-700 hover:bg-white/60 hover:text-blue-600 rounded-xl transition-all duration-300 font-medium hover:shadow-md transform hover:scale-105"
              active-class="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
            >
              Video Downloader
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin"
              class="px-4 xl:px-6 py-3 text-gray-700 hover:bg-white/60 hover:text-blue-600 rounded-xl transition-all duration-300 font-medium hover:shadow-md transform hover:scale-105"
              active-class="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
            >
              Admin
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- Section droite avec auth et menu mobile -->
      <div class="flex items-center space-x-3">
        <!-- Auth/Profil (adapté pour mobile) -->
        <div class="flex-shrink-0">
          <template v-if="username">
            <!-- Version desktop -->
            <div class="hidden sm:flex items-center space-x-3 lg:space-x-4 bg-white/40 backdrop-blur-sm rounded-2xl p-2 lg:p-3 shadow-lg border border-white/30">
              <div class="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                <svg class="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                  <circle cx="12" cy="11" r="4" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
              </div>
              <span class="font-semibold bg-gradient-to-r from-gray-700 to-blue-600 bg-clip-text text-transparent text-sm lg:text-lg">{{ username }}</span>
              <button
                class="cursor-pointer px-3 lg:px-4 py-2 text-xs lg:text-sm text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-200"
                @click="logout"
              >
                Logout
              </button>
            </div>
            <!-- Version mobile -->
            <div class="sm:hidden flex items-center space-x-2">
              <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                  <circle cx="12" cy="11" r="4" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
              </div>
            </div>
          </template>
          <template v-else>
            <!-- Version desktop -->
            <div class="hidden sm:flex space-x-2 lg:space-x-3">
              <button
                class="cursor-pointer px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-105 font-medium"
                @click="$router.push('/signin')"
              >
                Sign In
              </button>
              <button
                class="cursor-pointer px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base text-blue-600 bg-white/60 backdrop-blur-sm border-2 border-blue-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg"
                @click="$router.push('/signup')"
              >
                Sign Up
              </button>
            </div>
            <!-- Version mobile - boutons plus petits -->
            <div class="sm:hidden flex space-x-2">
              <button
                class="cursor-pointer px-3 py-2 text-xs text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                @click="$router.push('/signin')"
              >
                Sign In
              </button>
            </div>
          </template>
        </div>

        <!-- Menu hamburger (visible sur mobile et tablette) -->
        <button
          class="lg:hidden flex items-center justify-center w-10 h-10 bg-white/40 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 transition-all duration-300 hover:bg-white/60"
          @click="toggleMobileMenu"
        >
          <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </header>

    <!-- Menu mobile (overlay) -->
    <div
      v-if="isMobileMenuOpen"
      class="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      @click="closeMobileMenu"
    >
      <div
        class="fixed top-20 right-4 left-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6"
        @click.stop
      >
        <!-- Navigation mobile -->
        <nav class="mb-6">
          <ul class="space-y-3">
            <li>
              <RouterLink
                to="/"
                class="block px-4 py-3 text-gray-700 hover:bg-white/60 hover:text-blue-600 rounded-xl transition-all duration-300 font-medium"
                active-class="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                @click="closeMobileMenu"
              >
                Home
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/videodownloader"
                class="block px-4 py-3 text-gray-700 hover:bg-white/60 hover:text-blue-600 rounded-xl transition-all duration-300 font-medium"
                active-class="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                @click="closeMobileMenu"
              >
                Video Downloader
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/admin"
                class="block px-4 py-3 text-gray-700 hover:bg-white/60 hover:text-blue-600 rounded-xl transition-all duration-300 font-medium"
                active-class="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                @click="closeMobileMenu"
              >
                Admin
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Auth mobile (si non connecté) -->
        <div v-if="!username" class="border-t border-gray-200 pt-4">
          <div class="space-y-3">
            <button
              class="w-full cursor-pointer px-4 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
              @click="$router.push('/signin'); closeMobileMenu()"
            >
              Sign In
            </button>
            <button
              class="w-full cursor-pointer px-4 py-3 text-blue-600 bg-white/60 backdrop-blur-sm border-2 border-blue-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 font-medium"
              @click="$router.push('/signup'); closeMobileMenu()"
            >
              Sign Up
            </button>
          </div>
        </div>

        <!-- User info et logout mobile (si connecté) -->
        <div v-if="username" class="border-t border-gray-200 pt-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                  <circle cx="12" cy="11" r="4" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
              </div>
              <span class="font-semibold bg-gradient-to-r from-gray-700 to-blue-600 bg-clip-text text-transparent">{{ username }}</span>
            </div>
            <button
              class="cursor-pointer px-4 py-2 text-sm text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-xl hover:shadow-lg transition-all duration-300 focus:outline-none"
              @click="logout; closeMobileMenu()"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu principal avec marge pour compenser le header fixe -->
    <main class="pt-20 sm:pt-24">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* Styles pour les effets avancés */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* Animation pour les liens actifs */
.router-link-active {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6) !important;
  color: white !important;
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4) !important;
}

/* Effet de flou pour le glassmorphism */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(10px);
  }
}

/* Animation pour le menu mobile */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-menu-enter-active {
  animation: slideDown 0.3s ease-out;
}
</style>
