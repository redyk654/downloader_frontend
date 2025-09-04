<script setup>
import { ref } from 'vue';
import { checkDownloadStatus, recordVideoDownload } from '@/api/api';
import { API_BASE } from '../api/api';

const videoUrl = ref('');
const originalUrl = ref('');
const taskId = ref(null);
const taskStatus = ref('idle'); // idle, processing, success, error
const downloadUrl = ref(null);
const errorMessage = ref('');
let statusTimeout = null;

const getPlatformFromUrl = (url) => {
  if (!url) return null;
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.watch')) return 'Facebook';
  if (lowerUrl.includes('instagram.com')) return 'Instagram';
  if (lowerUrl.includes('tiktok.com')) return 'TikTok';
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) return 'Twitter';
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return 'YouTube';
  // snapchat, vimeo, dailymotion can be added here
  if (lowerUrl.includes('snapchat.com')) return 'Snapchat';
  return null;
};

const handleSubmit = async () => {
  if (!videoUrl.value) {
    alert('Please enter a valid video URL.');
    return;
  }

  const platform = getPlatformFromUrl(videoUrl.value);
  if (platform === 'YouTube') {
    alert("YouTube n'est pas supporté par cette plateforme.");
    return;
  }
  if (!platform) {
    alert("Impossible de détecter la plateforme. Veuillez entrer une URL valide.");
    return;
  }

  try {
    const data = await recordVideoDownload(videoUrl.value, platform, 'worst');
    // console.log('Video processed successfully:', data);
    taskId.value = data.task_id;
    taskStatus.value = 'processing';
    startStatusPolling(taskId.value);
  } catch (error) {
    alert(error.message || 'An error occurred while processing your request.');
  }
};

const startStatusPolling = (id) => {
  // Lance le premier polling
  pollStatus(id);
};

const stopStatusPolling = () => {
  if (statusTimeout) {
    clearTimeout(statusTimeout);
    statusTimeout = null;
    videoUrl.value = ''; // Réinitialise l'URL après l'arrêt du polling
  }
};

const pollStatus = async (id) => {
  try {
    const data = await checkDownloadStatus(id);
    // console.log('Download status:', data.task_status);
    if (data.task_status === 'SUCCESS') {
      downloadUrl.value = data.result.download_url;
      taskStatus.value = 'success';
      stopStatusPolling();
    } else if (data.task_status === 'FAILURE') {
      taskStatus.value = 'error';
      errorMessage.value = data.error_details;
      console.log('Task failed:', data.error_details);
      stopStatusPolling();
    } else {
      // Encore en cours, relance le polling après 3s
      statusTimeout = setTimeout(() => pollStatus(id), 3000);
    }
  } catch (error) {
    // console.error('Error fetching download status:', error);
    taskStatus.value = 'error';
    stopStatusPolling();
  }
};

const pasteLastClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text) videoUrl.value = text;
  } catch (e) {
    alert("Impossible d'accéder au presse-papier. Autorisez l'accès dans votre navigateur.");
  }
};

function downloadInNewTab(url) {
    const link = document.createElement('a');
    link.href = `${API_BASE}/api/downloads/proxy?url=${encodeURIComponent(url)}`;
    link.setAttribute('download', 'video.mp4');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-12">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h1 class="text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Rimeo Downloader
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Download your favorite videos from Facebook, Instagram, Snapchat, and Twitter with ease
        </p>
      </div>

      <!-- Main Card -->
      <div class="max-w-2xl mx-auto">
        <div class="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20 transition-all duration-300 hover:shadow-3xl">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- URL Input Section -->
            <div class="space-y-3">
              <label for="videoUrl" class="flex items-center text-sm font-semibold text-gray-700 cursor-pointer" @click="pasteLastClipboard">
                <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                </svg>
                Video URL
              </label>
              <div class="relative">
                <input
                  v-model.trim="videoUrl"
                  type="url"
                  id="videoUrl"
                  required
                  placeholder="Paste your video URL here..."
                  autocomplete="off"
                  class="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                />
                <svg class="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" @click="pasteLastClipboard">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="cursor-pointer w-full relative overflow-hidden px-6 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              :disabled="taskStatus === 'processing'"
            >
              <span v-if="taskStatus !== 'processing'" class="flex items-center justify-center">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Process Video
              </span>
              <span v-else class="flex items-center justify-center">
                <div class="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-2"></div>
                Processing...
              </span>
            </button>
          </form>

          <!-- Status Messages -->
          <div class="mt-8">
            <!-- Processing State -->
            <div v-if="taskStatus === 'processing'" class="text-center py-8">
              <div class="relative inline-flex items-center justify-center">
                <!-- Outer rotating ring -->
                <div class="absolute w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
                <!-- Inner pulsing circle -->
                <div class="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
              <p class="mt-6 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Processing your video...
              </p>
              <p class="text-gray-500 mt-2">This may take a few moments</p>
            </div>

            <!-- Success State -->
            <div v-if="taskStatus === 'success' && downloadUrl" class="text-center py-6">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-4 animate-bounce">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p class="text-lg font-semibold text-gray-700 mb-6">Video processed successfully!</p>
              <a 
                @click.prevent="downloadInNewTab(downloadUrl)"
                href="#"
                class="cursor-pointer inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-300 transform hover:scale-105"
              >
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Download Video
              </a>
            </div>

            <!-- Error State -->
            <div v-if="taskStatus === 'error'" class="text-center py-6">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <p class="text-lg font-semibold text-red-600 mb-2">Processing failed</p>
              <p class="text-gray-600">{{ errorMessage }}</p>
            </div>
          </div>
        </div>

        <!-- Platform Icons -->
        <div class="mt-12 text-center">
          <p class="text-gray-600 mb-6 font-medium">Supported platforms</p>
          <div class="flex justify-center space-x-8">
            <div class="flex flex-col items-center space-y-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-sm">FB</span>
              </div>
              <span class="text-xs text-gray-500">Facebook</span>
            </div>
            <!-- <div class="flex flex-col items-center space-y-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-sm">YT</span>
              </div>
              <span class="text-xs text-gray-500">YouTube</span>
            </div> -->
            <div class="flex flex-col items-center space-y-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-sm">IG</span>
              </div>
              <span class="text-xs text-gray-500">Instagram</span>
            </div>
            <div class="flex flex-col items-center space-y-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-sm">TT</span>
              </div>
              <span class="text-xs text-gray-500">TikTok</span>
            </div>
            <div class="flex flex-col items-center space-y-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-sm">TW</span>
              </div>
              <span class="text-xs text-gray-500">Twitter</span>
            </div>
            <!-- Snapshat -->
            <div class="flex flex-col items-center space-y-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-sm">SC</span>
              </div>
              <span class="text-xs text-gray-500">Snapchat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style>
