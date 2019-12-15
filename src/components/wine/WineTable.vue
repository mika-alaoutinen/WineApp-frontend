<template>
  <div>
    <h2>Viinilistaus</h2>

    <v-card class="card-wine-table" max-width="85%">
      <v-data-table
        @click:row="openWineInfo"
        :headers="translateHeaders"
        :items="wineStore.wines"
        :items-per-page="20"
        loading loading-text="Ladataan viinejä...">

        <template v-slot:item.type="{ item }">
          <td>{{ dictionary.translate(item.type) }}</td>
        </template>
        
      </v-data-table>
    </v-card>
  </div>
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
        headers: this.translateHeaders,
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
  /*
  TODO:
    - Align price and volume to the right.
  */
  .card-wine-table {
    margin: auto;
    padding-bottom: 1em;
    padding-top: 1em;
    padding-left: 2em;
    padding-right: 2em;
  }
</style>