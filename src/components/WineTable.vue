<template>
  <div id="wine-table">
    <p v-if="wineStore.wines.length < 1" class="empty-table">Ei viinejä</p>
    <table v-else>
      
      <thead>
        <tr>
          <th>Nimi</th>
          <th>Tyyppi</th>
          <th>Maa</th>
          <th>Hinta (€)</th>
          <th>Määrä (l)</th>
          <th>Kuvaus</th>
          <th>Ruokasuositukset</th>
          <th>URL</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="wine in wineStore.wines" :key="wine.id">
          <td>{{ wine.name }}</td>
          <td>{{ wine.type }}</td>
          <td>{{ wine.country }}</td>
          <td>{{ wine.price }}</td>
          <td>{{ wine.quantity }}</td>
          <td>{{ wine.description }}</td>
          <td>{{ wine.foodPairings }}</td>
          <td>{{ wine.url }}</td>
          <!-- TODO: wine info should be shown by clicking on a line in the wine table? -->
          <button @click="openWineInfo(wine.id)">Info</button>
        </tr>
      </tbody>
      
    </table>
  </div>
</template>

<script>
  import WineService from "@/services/WineService.js";
  const wineService = new WineService();

  export default {
    data() {
      return {
        editing: null,
        wineStore: wineService.getWineStore()
      }
    },

    methods: {
      openWineInfo(id) {
        this.$router.push("/wine/" + id);
      },
    },
  };

</script>

<style scoped>
  button { margin: 0 0.5rem 0 0 }
</style>