<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-8">Tableau de bord des Téléchargements</h1>

    <div v-if="isLoading" class="text-center py-10">
      <p class="text-lg text-gray-600">Chargement des données...</p>
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mt-4"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Erreur:</strong>
      <span class="block sm:inline"> {{ error }}</span>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-blue-100 rounded-lg shadow-md p-6 text-center">
          <h2 class="text-lg font-semibold text-gray-600">Total Téléchargements</h2>
          <p class="text-5xl font-bold text-blue-600 mt-2">{{ overviewStats.total_downloads }}</p>
        </div>
        <div class="bg-green-100 rounded-lg shadow-md p-6 text-center">
          <h2 class="text-lg font-semibold text-gray-600">Succès</h2>
          <p class="text-5xl font-bold text-green-600 mt-2">{{ overviewStats.successful_downloads }}</p>
        </div>
        <div class="bg-red-100 rounded-lg shadow-md p-6 text-center">
          <h2 class="text-lg font-semibold text-gray-600">Échecs</h2>
          <p class="text-5xl font-bold text-red-600 mt-2">{{ overviewStats.failed_downloads }}</p>
        </div>
        <div class="bg-purple-100 rounded-lg shadow-md p-6 text-center">
          <h2 class="text-lg font-semibold text-gray-600">Aujourd'hui</h2>
          <p class="text-5xl font-bold text-purple-600 mt-2">{{ overviewStats.downloads_today }}</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Tendances des Téléchargements</h2>
        <div class="flex space-x-4 mb-4">
          <button @click="timeSeriesPeriod = 'day'" :class="{'bg-blue-600 text-white': timeSeriesPeriod === 'day', 'bg-gray-200 text-gray-800': timeSeriesPeriod !== 'day'}" class="px-4 py-2 rounded-md cursor-pointer">Jour</button>
          <button @click="timeSeriesPeriod = 'week'" :class="{'bg-blue-600 text-white': timeSeriesPeriod === 'week', 'bg-gray-200 text-gray-800': timeSeriesPeriod !== 'week'}" class="px-4 py-2 rounded-md">Semaine</button>
          <button @click="timeSeriesPeriod = 'month'" :class="{'bg-blue-600 text-white': timeSeriesPeriod === 'month', 'bg-gray-200 text-gray-800': timeSeriesPeriod !== 'month'}" class="px-4 py-2 rounded-md">Mois</button>
        </div>
        <Line v-if="timeSeriesData.length > 0" :data="timeSeriesChartData" :options="chartOptions" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Téléchargements par Qualité</h2>
          <Bar v-if="qualityData.length > 0" :data="qualityChartData" :options="chartOptions" />
        </div>
        <!-- Necessite un service de géolocalisation -->
        <!-- <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Téléchargements par Pays</h2>
          <Pie v-if="countryData.length > 0" :data="countryChartData" />
        </div> -->
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Derniers Téléchargements</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qualité
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pays
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="download in recentDownloads" :key="download.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:underline">
                  <a :href="download.url_telechargement" target="_blank" rel="noopener noreferrer">
                    {{ download.url_telechargement.substring(0, 50) + '...' }}
                  </a>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ download.adresse_ip }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span :class="{'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true, 'bg-green-100 text-green-800': download.statut_telechargement, 'bg-red-100 text-red-800': !download.statut_telechargement}">
                    {{ download.statut_telechargement ? 'Succès' : 'Échec' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ new Date(download.horodatage).toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ download.qualite_video || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ download.pays_ip || 'N/A' }}
                </td>
              </tr>
              <tr v-if="recentDownloads.length === 0">
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">Aucun téléchargement récent.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Bar, Line, Pie } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import {
  fetchOverviewStats,
  fetchTimeSeries,
  fetchQualityStats,
  fetchCountryStats,
  fetchRecentDownloads
} from '@/api/api';

Chart.register(...registerables);

const router = useRouter();
const isLoading = ref(true);
const error = ref(null);
const overviewStats = ref({});
const timeSeriesData = ref([]);
const qualityData = ref([]);
const countryData = ref([]);
const recentDownloads = ref([]);
const timeSeriesPeriod = ref('day');

const chartOptions = Object.freeze({ responsive: true });

const timeSeriesChartData = computed(() => ({
  labels: timeSeriesData.value.map(d => d.date),
  datasets: [
    { label: 'Total Téléchargements', data: timeSeriesData.value.map(d => d.total_downloads), borderColor: '#3B82F6', backgroundColor: '#3B82F6', tension: 0.3, fill: false },
    { label: 'Succès', data: timeSeriesData.value.map(d => d.successful_downloads), borderColor: '#10B981', backgroundColor: '#10B981', tension: 0.3, fill: false },
    { label: 'Échecs', data: timeSeriesData.value.map(d => d.failed_downloads), borderColor: '#EF4444', backgroundColor: '#EF4444', tension: 0.3, fill: false },
  ],
}));

const qualityChartData = computed(() => ({
  labels: qualityData.value.map(d => d.qualite_video),
  datasets: [{ backgroundColor: ['#6366F1', '#EC4899', '#F59E0B', '#14B8A6', '#64748B'], data: qualityData.value.map(d => d.count) }],
}));

const countryChartData = computed(() => ({
  labels: countryData.value.map(d => d.pays_ip),
  datasets: [{ backgroundColor: ['#06B6D4', '#8B5CF6', '#F87171', '#34D399', '#FCD34D'], data: countryData.value.map(d => d.count) }],
}));

async function fetchAllStats() {
  isLoading.value = true;
  error.value = null;
  try {
    overviewStats.value = await fetchOverviewStats();
    timeSeriesData.value = await fetchTimeSeries(timeSeriesPeriod.value);
    qualityData.value = await fetchQualityStats();
    countryData.value = await fetchCountryStats();
    // recentDownloads.value = await fetchRecentDownloads(); // décommente si tu as l'API
    recentDownloads.value = [
      // fallback data
      { id: 1, url_telechargement: "https://www.facebook.com/video123", adresse_ip: "192.168.1.1", statut_telechargement: true, horodatage: "2025-06-17T10:00:00Z", qualite_video: "720p", pays_ip: "France" },
      { id: 2, url_telechargement: "https://www.facebook.com/video456", adresse_ip: "192.168.1.2", statut_telechargement: false, horodatage: "2025-06-17T09:30:00Z", qualite_video: "1080p", pays_ip: "Germany" },
    ];
  } catch (err) {
    error.value = err.message;
    if (err.message.includes('non autorisé')) {
      router.push('/login');
    }
  } finally {
    isLoading.value = false;
  }
}

watch(timeSeriesPeriod, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    isLoading.value = true;
    try {
      timeSeriesData.value = await fetchTimeSeries(newVal);
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }
});

onMounted(fetchAllStats);
</script>