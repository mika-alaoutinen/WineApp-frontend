<template>
  <div id="wine-table">
    <p v-if="wineStore.wines.length < 1" class="empty-table">Ei viinejä</p>
    <v-data-table v-else
      :headers="translateHeaders"
      :items="wineStore.wines"
      :items-per-page="30"
      @click:row="openWineInfo"
    >
      <template v-slot:item.type="{ item }">
        <td>{{ dictionary.translate(item.type) }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import WineService from "@/services/WineService.js";
  import Dictionary from "@/utilities/Dictionary.js";
  
  const wineService = new WineService();

  /*
  TODO:
  - Show wine type with the background color of the row?
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
          { text: this.dictionary.translate("quantity"), value: "quantity" },
        ]
      },
      translateWineTypes() {
        for (let wine of this.wineStore.wines) {
          this.dictionary.translate(wine.type);
        }

        // wines.forEach(wine => wine.type = this.dictionary.translate(wine.type));
        return this.wineStore.wines;
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
  button { margin: 0 0.5rem 0 0 }
</style>