<template>
  <v-card class="full-page-card" max-width="60%" v-show="wineStore.searchDone">
    <v-card-title class="card-title">Haun tulokset</v-card-title>

    <v-data-table
      @click:row="openWineInfo"
      :headers="translateHeaders"
      :items="wineStore.wines"
      loading-text="Haetaan viinejä..."
      no-data-text="Haulla ei löytynyt yhtään tulosta.">

      <template v-slot:item.type="{ item }">
        {{ dictionary.translate('wine', item.type) }}
      </template>
    </v-data-table>
    
  </v-card>
</template>

<script>
  import Dictionary from "@/utilities/Dictionary.js";
  import WineService from "@/services/WineService.js";
  
  const wineService = new WineService();

  export default {
    computed: {
      translateHeaders() {
        const headers = [ "name", "type", "country", "price", "volume" ];
        return headers.map(header => ({ text: this.dictionary.translate("wine", header), value: header }));
      }
    },

    data() {
      return {
        dictionary: Dictionary,
        wineStore: wineService.getStore().data.searched,
      }
    },

    methods: {
      openWineInfo(wine) {
        this.$router.push({ name: "Wine", params: { wineId: "" + wine.id }});
      }
    },

  };
</script>