<template>
  <v-card class="full-page-card" max-width="75%">
    <v-card-title class="card-title">Viinilistaus<v-spacer/>
      <v-text-field
        class="search-bar"
        hide-details
        label="Hae viinejä"
        single-line
        v-model="search">
      </v-text-field>      
    </v-card-title>

    <v-data-table
      @click:row="openWineInfo"
      :headers="translateHeaders"
      :items="wineStore.wines"
      :items-per-page="15"
      :search="search"
      loading-text="Ladataan viinejä..."
      no-results-text="Haulla ei löytynyt yhtään tulosta.">

      <template v-slot:item.type="{ item }">
        {{ dictionary.translate("wine", item.type) }}
      </template>
      
    </v-data-table>
  </v-card>
</template>

<script>
  import Dictionary from "@/utilities/Dictionary.js";
  import WineService from "@/services/WineService.js";

  const wineService = new WineService();

  /*
  TODO:
    - Bug fix: when wine is deleted in WineDetails, it still shows up in wine table.
      Deleted wine disappears once a different page is loaded.
    - Show wine type with the background color of the row?
    - Implement filters: only show red wines, wines with volume = 0.75, etc.
    - Use v-chip to present active filters?
  */

  export default {
    data() {
      return {
        dictionary: Dictionary,
        search: "",
        wineStore: wineService.getWineStore(),
      }
    },

    computed: {
      translateHeaders() {
        const headers = [ "name", "type", "country", "price", "volume" ];
        return headers.map(header => ({ text: this.dictionary.translate("wine", header), value: header }));
      }
    },

    mounted() {
      wineService.getWines();
    },

    methods: {
      openWineInfo(wine) {
        this.$router.push({ name: "Wine", params: { wineId: "" + wine.id } });
      }
    },
  };
</script>

<style scoped>
  .card-title { font-weight: bold }
  .search-bar { font-weight: normal }
</style>