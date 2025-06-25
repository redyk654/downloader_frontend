<script setup>
import { ref } from 'vue';
import { recordVideoDownload } from '@/api/api';

const videoUrl = ref('');

const handleSubmit = async () => {
  if (!videoUrl.value) {
    alert('Please enter a valid Facebook video URL.');
    return;
  }
  try {
    const data = await recordVideoDownload(videoUrl.value);
    console.log('Video processed successfully:', data);
  } catch (error) {
    alert(error.message || 'An error occurred while processing your request.');
  }
};

</script>
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-6 text-gray-600">Video Downloader</h1>
    <p class="text-center mb-8 text-gray-600">Download your Facebook, YouTube, Instagram, TikTok, and Twitter videos easily.</p>
    <div class="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="mb-6">
          <label for="videoUrl" class="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
          <input
            v-model.trim="videoUrl"
            type="url"
            id="videoUrl"
            required
            placeholder="Paste your video URL here..."
            autocomplete="off"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
          />
        </div>
        <button
          type="submit"
          class="cursor-pointer w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
        >
          Process Data
        </button>
      </form>
    </div>
  </div>
</template>