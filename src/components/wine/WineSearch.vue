<template>
  <div>

    <!-- Wine search form -->    
    <v-card class="full-page-card" id="search-form" max-width="60%">
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
            :label="dictionary.translate('wine', type)"
            :value="type.toUpperCase()">
          </v-radio>
        </v-radio-group>

        <!-- Search wines by volumes -->
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
        <v-subheader class="subheader">Hae hinnan perusteella (€)</v-subheader>
        <RangeSlider
          @get:range="getRange"
          :defaultRange="price.defaultRange"
          :switchLabel="'Hintahaku päällä'">
        </RangeSlider>

        <button class="button-save">Hae viinejä</button>
      </v-form>
    </v-card>

    <br/>

    <!-- Search results table -->
    <v-card class="full-page-card" max-width="60%" v-show="searchDone">
      <v-card-title class="card-title">Haun tulokset</v-card-title>

      <WineTable :wines="foundWines"/>
    </v-card>

  </div>
</template>

<script>
  import Dictionary from "@/utilities/Dictionary.js";
  import RangeSlider from "@/components/vuetify/RangeSlider.vue";
  import WineService from "@/services/WineService.js";
  import WineTable from "@/components/wine/WineTable.vue";
  
  const wineService = new WineService();

  /*
  TODO:
    - Validate form so that at least one search criteria is given.
    - Disable search button if no search criteria is given.
  */

  export default {
    components: { RangeSlider, WineTable },

    data() {
      return {
        dictionary: Dictionary,
        wineTypes: [ "sparkling", "red", "rose", "white", "other" ],
        wineVolumes: [ 0.75, 1, 1.5, 2, 3 ],

        // Placeholders for price search:
        price: {
          defaultRange: [ 0, 50 ],
          range: [],
        },
        
        // Search parameters that get sent to backend:
        searchParams: {
          name: "",
          type: "",
          country: "",
          priceRange: [],
          volumes: [],
        },

        // Search results:
        foundWines: [],
        searchDone: false,
      }
    },

    methods: {
      getRange(range) { this.price.range = range },

      submitForm() {
        this.searchParams.priceRange = this.price.range;

        wineService.search(this.searchParams)
                   .then(wines => this.foundWines = wines)

        this.searchDone = true;
        wineService.resetObject(this.searchParams);
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
  .card-title { padding-left: 0 }
  .subheader { padding-left: 0 }
</style>