<template>
  <v-card class="full-page-card" max-width="60%" v-show="wineStore.searchDone">
    <v-card-title class="card-title">Haun tulokset</v-card-title>

    <WineTable :wines="wineStore.wines"/>    

  </v-card>
</template>

<script>
  import WineService from "@/services/WineService.js";
  import WineTable from "@/components/wine/WineTable.vue";
  
  export default {
    components: { WineTable },
    
    data() {
      return {
        wineStore: new WineService().getStore().data.searched,
      }
    },

  };
</script>