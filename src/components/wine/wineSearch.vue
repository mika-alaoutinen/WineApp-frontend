<template>
  <v-card class="full-page-card" max-width="60%">
    <v-card-title class="card-title">Hae viinejä</v-card-title>

    <v-form @submit.prevent="submitForm" ref="search-wines">

      <!-- Search wines by name or country -->
      <v-subheader class="subheader">Hae nimen tai maan perusteella</v-subheader>
      <v-text-field label="Nimi" v-model="searchParams.name"/>
      <v-text-field label="Maa" v-model="searchParams.country"/>

      <!-- Search wines by type. Multiple types can be selected. -->
      <v-subheader class="subheader">Hae viinin tyypin perusteella</v-subheader>
      <v-row>
        <v-col v-for="wineType in wineTypes" :key="wineType">
        <v-checkbox
          v-model="searchParams.types"
          :label="dictionary.translate(wineType)"
          :value="wineType.toUpperCase()">
        </v-checkbox>
        </v-col>
      </v-row>

      <!-- Search wines by volume range -->
      <v-subheader class="subheader">Hae määrän perusteella (litraa)</v-subheader>
      <v-row>
        <v-col v-for="volume in wineVolumes" :key="volume">
        <v-checkbox
          v-model="searchParams.volumes"
          :label="volume.toString()"
          :value="volume">
        </v-checkbox>
        </v-col>
      </v-row>

      <!-- Search wines by price range -->
      <v-app class="range-slider">
        <v-subheader class="subheader">Hae hinnan perusteella (€)</v-subheader>
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

      <button class="button-save">Hae viinejä</button>

    </v-form>
  </v-card>
</template>

<script>
  import Dictionary from "@/utilities/Dictionary.js";
  import WineService from "@/services/WineService.js";
  
  const wineService = new WineService();

  /*
  TODO:
    - Maybe change wine type selection to radio buttons.
  */

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
          volumes: [],
        },
        wineTypes: [ "sparkling", "red", "rose", "white", "other" ],
        wineVolumes: [ 0.75, 1, 1.5, 2, 3 ],
      }
    },

    methods: {
      submitForm() {
        wineService.searchWines(this.searchParams);
      }
    },
  };
</script>

<style scoped>
  .button-save {
    color: green;
    font-weight: bold;
    padding: 1em;
  }
  .card-title {
    font-weight: bold;
    padding-left: 0;
  }
  .range-slider { height: 125px }
  .subheader { padding-left: 0 }
</style>