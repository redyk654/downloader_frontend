<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-6 text-gray-600">Youtube Downloader</h1>
    <p class="text-center mb-8 text-gray-600">Download your Youtube video easily.</p>
    <div class="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <form>
        <div class="mb-6">
          <label for="facebookUrl" class="block text-sm font-medium text-gray-700 mb-2">Youtube Video URL</label>
          <input
            type="url"
            id="facebookUrl"
            required
            placeholder="Paste your Youtube video URL here..."
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
        >
          Process Data
        </button>
      </form>
    </div>
  </div>
</template>