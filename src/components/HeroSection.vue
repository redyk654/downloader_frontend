<script setup lang="ts">
defineProps<{
  onDownloader: () => void
  onSignUp: () => void
}>()
</script>

<template>
  <section class="relative overflow-hidden py-20 lg:py-32">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50"></div>
    <div class="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    <div class="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
    <div class="absolute bottom-0 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8">
          <span class="bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Download your videos
          </span>
          <br>
          <span class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            with ease
          </span>
        </h1>
        <p class="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Vidown lets you easily download your favorite videos from your favorite platforms.
          Fast, secure, and free.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button @click="onDownloader" class="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-105 font-semibold text-lg flex items-center space-x-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>Start Downloading</span>
          </button>
          <button @click="onSignUp" class="px-8 py-4 text-blue-600 bg-white/60 backdrop-blur-sm border-2 border-blue-300 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg">
            Create a free account
          </button>
        </div>
        <div class="relative max-w-4xl mx-auto">
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-105 transition-all duration-500">
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-dashed border-gray-300">
              <div class="flex items-center justify-center space-x-4 text-gray-500">
                <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                <div class="text-center">
                  <p class="text-lg font-medium">Paste your video link here</p>
                  <p class="text-sm">YouTube, Vimeo, Dailymotion and more...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>