<template>
  <v-card class="full-page-card" max-width="60%">
    <v-card-title class="card-title">Hae viinejä</v-card-title>

    <v-form @submit.prevent="submitForm">

      <!-- Search wines by name or country -->
      <v-subheader class="subheader">Hae nimen tai maan perusteella</v-subheader>
      <v-text-field label="Nimi" v-model="searchParams.name"/>
      <v-text-field label="Maa" v-model="searchParams.country"/>

      <!-- Search wines by type. -->
      <v-subheader class="subheader">Hae viinin tyypin perusteella</v-subheader>
      <v-radio-group row v-model="searchParams.type">
        <v-radio v-for="type in wineTypes" :key="type"
          :label="dictionary.translate(type)"
          :value="type.toUpperCase()">
        </v-radio>
      </v-radio-group>

      <!-- Search wines by volume range -->
      <v-subheader class="subheader">Hae määrän perusteella (litraa)</v-subheader>
      <v-row>
        <v-col v-for="volume in wineVolumes" :key="volume">
        <v-checkbox
          :label="volume.toString()"
          :value="volume"
          v-model="searchParams.volumes">
        </v-checkbox>
        </v-col>
      </v-row>

      <!-- Search wines by price range -->
      <v-app class="range-slider">
        <v-subheader class="subheader">Hae hinnan perusteella (€)</v-subheader>
        <v-switch
          @change="resetPriceRange"
          label="Hintahaku päällä"
          v-model=priceSearchEnabled>
        </v-switch>

        <v-range-slider
          :disabled=!priceSearchEnabled
          :min=minPrice
          :max=maxPrice
          v-model="selectedPriceRange">

          <template v-slot:prepend>
            <v-text-field
              class="slider-value-field"
              single-line
              type="number"
              v-model="selectedPriceRange[0]">
            </v-text-field>
          </template>

          <template v-slot:append>
            <v-text-field
              class="slider-value-field"
              single-line
              type="number"
              v-model="selectedPriceRange[1]">
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
    - Validate form so that at least one search criteria is given.
    - Disable search button if no search criteria is given.
  */

  export default {
    data() {
      return {
        dictionary: Dictionary,

        minPrice: 0,
        maxPrice: 50,
        priceSearchEnabled: false,
        selectedPriceRange: [ 0, 50 ],

        wineTypes: [ "sparkling", "red", "rose", "white", "other" ],
        wineVolumes: [ 0.75, 1, 1.5, 2, 3 ],
        
        // Search parameters that get sent to backend:
        searchParams: {
          name: "",
          type: "",
          country: "",
          priceRange: [],
          volumes: [],
        },
      }
    },

    methods: {
      resetPriceRange() {
       this.searchParams.priceRange = [ this.minPrice, this.maxPrice ];
      },

      submitForm() {
        // Update price range if it has been set:
        if (this.priceSearchEnabled) {
          this.searchParams.priceRange = this.selectedPriceRange;
        }

        // Send retrieved wines to parent component:
        wineService.searchWines(this.searchParams)
                   .then(wines => this.$emit("get:wines", wines))
                   .catch(error => console.log(error))
      },
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
  .range-slider {
    height: 14em;
    overflow: hidden;
  }
  .slider-value-field { width: 60px }
  .slider-value-field >>> input { text-align: center }
  .subheader { padding-left: 0 }
</style>