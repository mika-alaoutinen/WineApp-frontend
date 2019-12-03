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
        </tr>
      </thead>

      <tbody>
        <!-- TODO: wine info should be shown by clicking on a line in the wine table? -->
        <tr v-for="wine in wineStore.wines" :key="wine.id">
          <td v-for="attribute in displayedWineAttributes" :key="attribute">
            {{ wine[attribute] }}
          </td>
          <button @click="openWineInfo(wine.id)">Info</button>
        </tr>
      </tbody>
      
    </table>
  </div>
</template>

<script>
  import WineService from "@/services/WineService.js";
  const wineService = new WineService();

  /*
  TODO:
  - Add sorting buttons to table headings: sort by name, type, country, price or quantity.
  - Reformat rows. Don't show ID, description, food pairings and URL.
  - Show wine type with the background color of the row?
  */

  export default {
    data() {
      return {
        editing: null,
        wineStore: wineService.getWineStore(),
        displayedWineAttributes: ["name", "type", "country", "price", "quantity"]
      }
    },

    mounted() {
      wineService.getWines();
    },

    methods: {
      openWineInfo(id) {
        this.$router.push("/wines/" + id);
      },
    },
  };

</script>

<style scoped>
  button { margin: 0 0.5rem 0 0 }
</style>