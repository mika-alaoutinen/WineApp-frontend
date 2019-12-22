<template>
  <v-card class="full-page-card" max-width="60%" v-show="showResults">
    <v-card-title class="card-title">Haun tulokset</v-card-title>

    <v-simple-table>
      <thead>
        <tr>
          <th v-for="attribute in wineAttributes" :key="attribute">
            {{ dictionary.translate(attribute) }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="wine in searchResults" :key="wine.id">
          <td v-for="attribute in wineAttributes" :key="attribute">
            {{ wine[attribute] }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>

  </v-card>
</template>

<script>
  import Dictionary from "@/utilities/Dictionary.js";

  export default {
    data() {
      return {
        dictionary: Dictionary,
        wineAttributes: [ "name", "type", "country", "price", "volume" ],
      }
    },

    props: {
      searchResults: Array,
      showResults: Boolean,
    }    
  };
</script>