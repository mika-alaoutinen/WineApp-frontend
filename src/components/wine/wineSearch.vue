<template>
  <v-card class="full-page-card" max-width="60%">
    <v-card-title class="card-title">Hae viinejä</v-card-title>

    <v-form @submit.prevent="submitForm" ref="search-wines">

      <!-- Search wines by name -->
      <v-text-field label="Nimi" v-model="searchParams.name"/>

      <!-- Search wines by type. Multiple types can be selected. -->
      <v-subheader>Valitse, minkälaisia viinejä haetaan</v-subheader>
      <v-row>
        <v-col v-for="wineType in wineTypes" :key="wineType">
        <v-checkbox
          v-model="searchParams.types"
          :label="dictionary.translate(wineType)"
          :value="wineType.toUpperCase()">
        </v-checkbox>
        </v-col>
      </v-row>

      <!-- Search wines by country -->
      <v-text-field label="Maa" v-model="searchParams.country"/>

      <!-- Search wines by price range -->
      <v-app class="slider-price-range">
        <v-subheader>Valitse hintahaitari</v-subheader>
        <v-range-slider
          v-model="searchParams.priceRange"
          :min="searchParams.minPrice"
          :max="searchParams.maxPrice">

          <template v-slot:prepend>
            <v-text-field
              v-model="searchParams.priceRange[0]"
              single-line
              type="number"
              style="width: 60px">
            </v-text-field>
          </template>

          <template v-slot:append>
            <v-text-field
              v-model="searchParams.priceRange[1]"
              single-line
              type="number"
              style="width: 60px">
            </v-text-field>
          </template>
          
        </v-range-slider>
      </v-app>

      <!-- Search wines by volume range -->

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
          maxPrice: 50, // TODO: Get the most expensive wine price
          priceRange: [10, 40],
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
  .slider-price-range {height: 125px;}
</style>