<script setup lang="ts">
defineProps<{
  features: Array<{ icon: string, title: string, description: string }>
}>()
</script>

<template>
  <section class="py-20 lg:py-32 bg-white/40 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          <span class="bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why choose Vidown?
          </span>
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover all the features that make Vidown the best solution for downloading your videos.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="group bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-2xl hover:bg-white/80 transition-all duration-300 transform hover:scale-105"
        >
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>