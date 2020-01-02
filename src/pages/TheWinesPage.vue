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

    <WineTable
      :itemsPerPage=15
      :search="search"
      :wines="wineStore.wines">
    </WineTable>
    
  </v-card>
</template>

<script>
  import WineService from "@/services/WineService.js";
  import WineTable from "@/components/wine/WineTable.vue";

  /*
  TODO:
    - Bug fix: when wine is deleted in WineDetails, it still shows up in wine table.
      Deleted wine disappears once a different page is loaded.
    - Show wine type with the background color of the row?
    - Implement filters: only show red wines, wines with volume = 0.75, etc.
    - Use v-chip to present active filters?
  */

  export default {
    components: { WineTable },

    data() {
      return {
        search: "",
        wineStore: new WineService().getStore().data,
      }
    },

  };
</script>