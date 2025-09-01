<script setup lang="ts">
defineProps<{
  onDownloader: () => void
  onSignUp: () => void
}>()
</script>

<template>
  <section class="py-20 lg:py-32 bg-white/40 backdrop-blur-sm">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
        <span class="bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Ready to get started?
        </span>
      </h2>
      <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        Join <strong>Rimeo</strong> today and discover the easiest way to download your favorite videos.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          @click="onDownloader"
          class="cursor-pointer px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
        >
          Try now
        </button>
        <!-- <button
          @click="onSignUp"
          class="px-10 py-4 text-blue-600 bg-white/60 backdrop-blur-sm border-2 border-blue-300 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg"
        >
          Create an account
        </button> -->
      </div>
    </div>
  </section>
</template>