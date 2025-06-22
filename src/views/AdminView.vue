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
          <Line v-if="qualityData.length > 0" :data="qualityChartData" :options="chartOptions" />
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
import { Line, Pie } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const router = useRouter();

const isLoading = ref(true);
const error = ref(null);
const overviewStats = ref({
  total_downloads: 0,
  successful_downloads: 0,
  failed_downloads: 0,
  downloads_today: 0,
  successful_downloads_today: 0,
});
const timeSeriesData = ref([]);
const qualityData = ref([]);
const countryData = ref([]);
const recentDownloads = ref([]);
const timeSeriesPeriod = ref('day'); // 'day', 'week', 'month'

// Options générales pour les graphiques (personnalisables)
const chartOptions = {
  responsive: true,
};

// Prépare les données pour le graphique en lignes de tendances
const timeSeriesChartData = computed(() => {
  const dates = timeSeriesData.value.map(d => d.date);
  const totalDownloads = timeSeriesData.value.map(d => d.total_downloads);
  const successfulDownloads = timeSeriesData.value.map(d => d.successful_downloads);
  const failedDownloads = timeSeriesData.value.map(d => d.failed_downloads);

  return {
    labels: dates,
    datasets: [
      {
        label: 'Total Téléchargements',
        data: totalDownloads,
        borderColor: '#3B82F6', // blue-500
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Succès',
        data: successfulDownloads,
        borderColor: '#10B981', // green-500
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Échecs',
        data: failedDownloads,
        borderColor: '#EF4444', // red-500
        tension: 0.3,
        fill: false,
      },
    ],
  };
});

// Prépare les données pour le graphique en cercle par qualité
const qualityChartData = computed(() => {
  const labels = qualityData.value.map(d => d.qualite_video);  
  const data = qualityData.value.map(d => d.count);
  return {
    labels: labels,
    datasets: [
      {
        backgroundColor: ['#6366F1', '#EC4899', '#F59E0B', '#14B8A6', '#64748B'], // Couleurs Tailwind
        data: data,
      },
    ],
  };
});

// Prépare les données pour le graphique en cercle par pays
const countryChartData = computed(() => {
  const labels = countryData.value.map(d => d.pays_ip);
  const data = countryData.value.map(d => d.count);
  return {
    labels: labels,
    datasets: [
      {
        backgroundColor: ['#06B6D4', '#8B5CF6', '#F87171', '#34D399', '#FCD34D'], // Couleurs Tailwind
        data: data,
      },
    ],
  };
});

// Fonction utilitaire pour faire des requêtes fetch authentifiées
async function fetchData(url) {
  const token = localStorage.getItem('authToken');
  if (!token) {
    router.push('/login');
    return;
  }
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        error.value = "Accès non autorisé. Veuillez vous reconnecter avec un compte administrateur.";
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAdmin');
        router.push('/login');
        return null;
      }
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Erreur lors de la récupération des données.');
    }
    return await response.json();
  } catch (err) {
    console.error("Erreur de récupération des données:", err);
    error.value = err.message || "Une erreur inattendue est survenue.";
    return null;
  } finally {
    // Ne définis isLoading sur false qu'après que toutes les fetches soient terminées dans fetchAllStats
    // ou gère cela de manière plus granulaire si nécessaire.
  }
}

async function fetchAllStats() {
  isLoading.value = true;
  error.value = null; // Réinitialise les erreurs

  try {
    // Récupération des statistiques globales
    const overview = await fetchData('http://127.0.0.1:8000/api/stats/overview/');
    if (overview) {
      overviewStats.value = overview;
    }

    // Récupération des données de séries temporelles
    await fetchTimeSeriesData();

    // Récupération des stats par qualité
    const quality = await fetchData('http://127.0.0.1:8000/api/stats/by-quality/');
    // Vérifie si les données sont différentes avant de les assigner
    if (quality && JSON.stringify(quality) !== JSON.stringify(qualityData.value)) {
      qualityData.value = quality;
    }

    // Récupération des stats par pays
    const country = await fetchData('http://127.0.0.1:8000/api/stats/by-country/');
    // Vérifie si les données sont différentes avant de les assigner
    if (country && JSON.stringify(country) !== JSON.stringify(countryData.value)) {
      countryData.value = country;
    }

    // Pour les derniers téléchargements, si tu as une API, appelle-la ici.
    // Sinon, garde les données fictives ou laisse vide.
    recentDownloads.value = [
      { id: 1, url_telechargement: "https://www.facebook.com/video123", adresse_ip: "192.168.1.1", statut_telechargement: true, horodatage: "2025-06-17T10:00:00Z", qualite_video: "720p", pays_ip: "France" },
      { id: 2, url_telechargement: "https://www.facebook.com/video456", adresse_ip: "192.168.1.2", statut_telechargement: false, horodatage: "2025-06-17T09:30:00Z", qualite_video: "1080p", pays_ip: "Germany" },
    ];
  } finally {
    isLoading.value = false;
  }
}

async function fetchTimeSeriesData() {
  const data = await fetchData(`http://127.0.0.1:8000/api/stats/timeseries/?period=${timeSeriesPeriod.value}`);
  // Vérifie si les données sont différentes avant de les assigner
  if (data && JSON.stringify(data) !== JSON.stringify(timeSeriesData.value)) {
    timeSeriesData.value = data;
  }
}

// Watcher pour mettre à jour les données de séries temporelles lorsque la période change
watch(timeSeriesPeriod, async (newVal, oldVal) => {
  if (newVal !== oldVal) {
    isLoading.value = true; // Affiche le chargement pendant le changement de période
    await fetchTimeSeriesData();
    isLoading.value = false; // Cache le chargement une fois les données chargées
  }
});

onMounted(() => {
  fetchAllStats();
});
</script>