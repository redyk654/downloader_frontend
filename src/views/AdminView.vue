
<script>
export default {
  data() {
    return {
      operations: [],
      filterIp: ''
    }
  },
  computed: {
    filteredOperations() {
      return this.operations.filter(op => op.ip_address.includes(this.filterIp));
    }
  },
  mounted() {
    fetch('/api/download-operations/')
      .then(response => {
        this.operations = response.data;
      });
  }
}
</script>
<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Statistiques de Téléchargement</h1>
    <input v-model="filterIp" placeholder="Filtrer par IP" class="border p-2 mb-2" />
    <table class="min-w-full border-collapse border">
      <thead>
        <tr>
          <th class="border p-2">URL</th>
          <th class="border p-2">IP</th>
          <th class="border p-2">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="op in filteredOperations" :key="op.id">
          <td class="border p-2">{{ op.video_url.slice(0, 50) }}...</td>
          <td class="border p-2">{{ op.ip_address }}</td>
          <td class="border p-2">{{ op.timestamp }}</td>
        </tr>
      </tbody>
    </table>
    <p class="mt-2">Nombre total: {{ filteredOperations.length }}</p>
  </div>
</template>
