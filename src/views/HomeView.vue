<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection from '@/components/HeroSection.vue'
import FeaturesSection from '@/components/FeaturesSection.vue'
import CtaSection from '@/components/CtaSection.vue'

const router = useRouter()

const features = ref([
  {
    icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    title: 'Téléchargement Rapide',
    description: 'Téléchargez vos vidéos préférées en quelques secondes avec notre technologie optimisée.'
  },
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Sécurisé & Fiable',
    description: 'Vos téléchargements sont sécurisés avec notre système de protection avancé.'
  },
  // {
  //   icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  //   title: 'Haute Qualité',
  //   description: 'Choisissez parmi différentes qualités de vidéo, du HD au 4K selon vos besoins.'
  // },
  // {
  //   icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  //   title: 'Ultra Rapide',
  //   description: 'Interface optimisée pour des téléchargements ultra-rapides et une expérience fluide.'
  // },
  {
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    title: 'Multi-Plateforme',
    description: 'Compatible avec tous vos appareils : ordinateur, tablette et smartphone.'
  },
  // {
  //   icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
  //   title: 'Stockage Cloud',
  //   description: 'Sauvegardez vos vidéos dans le cloud pour y accéder depuis n\'importe où.'
  // }
])

const goToDownloader = () => router.push('/videodownloader')
const goToSignUp = () => router.push('/signup')
</script>

<template>
  <div class="min-h-screen">
    <HeroSection :onDownloader="goToDownloader" :onSignUp="goToSignUp" />
    <FeaturesSection :features="features" />
    <!-- <StatsSection /> -->
    <CtaSection :onDownloader="goToDownloader" :onSignUp="goToSignUp" />
  </div>
</template>

<style scoped>
/* Animation delays for background elements */
.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Custom animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Glassmorphism support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(10px);
  }
  .backdrop-blur-md {
    backdrop-filter: blur(12px);
  }
}

/* Hover effects */
.group:hover .group-hover:scale-110 {
  transform: scale(1.1);
}

/* Gradient text animation */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
</style>
