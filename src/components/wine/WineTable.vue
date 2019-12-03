<template>
  <div id="wine-table">
    <p v-if="wineStore.wines.length < 1" class="empty-table">Ei viinejä</p>
    <table v-else>

      <thead>
        <th v-for="attribute in shownAttributes" :key="attribute">
          {{ dictionary.translate(attribute) }}
        </th>
      </thead>

      <tbody>
        <!-- TODO: wine info should be shown by clicking on a line in the wine table? -->
        <tr v-for="wine in wineStore.wines" :key="wine.id">
          <td v-for="attribute in shownAttributes" :key="attribute">
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
  import Dictionary from "@/utilities/Dictionary.js";
  
  const wineService = new WineService();

  /*
  TODO:
  - Change dictionary to have translate(word) method.
  - Add sorting buttons to table headings: sort by name, type, country, price or quantity.
  - Show wine type with the background color of the row?
  */

  export default {
    data() {
      return {
        dictionary: Dictionary,
        editing: null,
        shownAttributes: ["name", "type", "country", "price", "quantity"],
        wineStore: wineService.getWineStore(),
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