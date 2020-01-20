<template>
  <v-card class="full-page-card" max-width="75%">
    <v-card-title class="card-title secondary--text">Viinilistaus<v-spacer/>
      <v-text-field
        :append-icon="searchIcon"
        class="search-bar"
        hide-details
        label="Hae viinejä"
        single-line
        v-model="search">
      </v-text-field>      
    </v-card-title>

    <WineTable
      :itemsPerPage="15"
      :search="search"
      :wines="wineStore.wines">
    </WineTable>
    
  </v-card>
</template>

<script>
  import WineService from "@/services/WineService.js";
  import WineTable from "@/components/wine/WineTable.vue";
  import { mdiMagnify } from '@mdi/js';

  export default {
    components: { WineTable },

    data() {
      return {
        searchIcon: mdiMagnify,

        search: "",
        wineStore: new WineService().getStore().data,
      }
    },

  };
</script>

<style scoped>
  .full-page-card { margin-bottom: 4em }
</style>