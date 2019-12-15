<template>
  <v-card class="full-page-card" max-width="60%">
    <v-card-title class="card-title">Hae viinejä</v-card-title>

    <v-form @submit.prevent="submitForm" ref="search-wines">
      <v-text-field label="Nimi" v-model="searchParams.name"/>

      <!-- Search wines by type. Can select multiple types to search for! -->
      <v-row>
        <v-col v-for="wineType in wineTypes" :key="wineType">
        <v-checkbox
          v-model="searchParams.types"
          :label="dictionary.translate(wineType)"
          :value="wineType.toUpperCase()">
        </v-checkbox>
        </v-col>
      </v-row>

    </v-form>
  </v-card>
</template>

<script>
  import Dictionary from "@/utilities/Dictionary.js";
  import WineService from "@/services/WineService.js";
  
  const wineService = new WineService();

  export default {
    data() {
      return {
        dictionary: Dictionary,
        searchParams: {
          name: "",
          types: [],
          country: "",
          minPrice: 0,
          maxPrice: 0,
          minVolume: 0,
          maxVolume: 0,
        },
        wineTypes: [ "sparkling", "red", "rose", "white", "other" ],
      }
    },

    mounted() {
      wineService.getWineCount(); // TODO: delete
    }
  };
</script>

<style scoped>
  .card-title {
    font-weight: bold;
    padding-left: 0;
  }
</style>