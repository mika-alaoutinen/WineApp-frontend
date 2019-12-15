<template>
  <v-card class="full-page-card" max-width="85%">
    <v-card-title><b>Viinilistaus</b> <v-spacer/>
      <v-text-field
        label="Hae viinejä"
        hide-details
        single-line
        v-model="search">
      </v-text-field>
    </v-card-title>

    <v-data-table
      @click:row="openWineInfo"
      class="align-left"
      loading loading-text="Ladataan viinejä..."
      :headers="translateHeaders"
      :items="wineStore.wines"
      :items-per-page="15"
      :search="search">

      <template v-slot:item.type="{ item }">
        {{ dictionary.translate(item.type) }}
      </template>
      
    </v-data-table>
  </v-card>
</template>

<script>
  import WineService from "@/services/WineService.js";
  import Dictionary from "@/utilities/Dictionary.js";
  
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
        return [
          { text: this.dictionary.translate("name"), value: "name" },
          { text: this.dictionary.translate("type"), value: "type" },
          { text: this.dictionary.translate("country"), value: "country" },
          { text: this.dictionary.translate("price"), value: "price" },
          { text: this.dictionary.translate("volume"), value: "volume" },
        ]
      }
    },

    mounted() {
      wineService.getWines();
    },

    methods: {
      openWineInfo(wine) {
        this.$router.push("/wines/" + wine.id);
      }
    },
  };
</script>

<style scoped>
  .align-left { text-align: left }
</style>