<template>
  <div>
    <!-- Wine search form -->
    <v-card class="full-page-card">
      <v-card-title class="card-title secondary--text">Hae viinejä</v-card-title>

      <v-form @submit.prevent>

        <!-- Search wines by name or country -->
        <v-subheader class="subheader">Hae nimen tai maan perusteella</v-subheader>
        <v-text-field label="Nimi" v-model="searchParams.name"/>
        <v-autocomplete
          @change="searchInput=''"
          :items="allCountries"
          :search-input.sync="searchInput"
          chips
          deletable-chips
          hide-selected
          label="Maa (yksi tai useampi)"
          multiple
          v-model="searchParams.countries">
        </v-autocomplete>

        <!-- Search wines by type -->
        <v-subheader class="subheader">Hae viinin tyypin perusteella</v-subheader>
        <v-radio-group row v-model="searchParams.type">
          <v-radio v-for="type in wineTypes" :key="type"
            :label="util.translate('wine', type)"
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

        <v-btn @click="submitForm" class="button-save secondary--text" large text>
          <v-icon>{{ searchIcon }}</v-icon>
          Hae viinejä
        </v-btn>
      </v-form>
    </v-card>

    <div class="search-results-table" v-show="searchDone">
      <v-card class="full-page-card">
        <v-card-title class="card-title secondary--text">Haun tulokset</v-card-title>
        <WineTable :wines="foundWines"/>
      </v-card>
    </div>

  </div>
</template>

<script>
  import RangeSlider from "@/components/vuetify/RangeSlider.vue";
  import Utilities from "@/utilities/Utilities.js";
  import WineService from "@/services/WineService.js";
  import WineTable from "@/components/wine/WineTable.vue";
  import { mdiMagnify } from '@mdi/js';
  
  const wineService = new WineService();

  export default {
    components: { RangeSlider, WineTable },

    computed: {
      allCountries() {
        const wines = wineService.getStore().data.wines;
        return wines.map(wine => wine.country);
      }
    },
    
    data() {
      return {
        searchIcon: mdiMagnify,

        util: Utilities,
        wineTypes: [ "sparkling", "red", "rose", "white", "other" ],
        wineVolumes: [ 0.75, 1, 1.5, 2, 3 ],
        
        // Contains the input for autocomplete:
        searchInput: "",

        // Placeholders for price search:
        price: {
          defaultRange: [ 0, 50 ],
          range: [],
        },
        
        // Search parameters that get sent to backend:
        searchParams: {
          name: "",
          type: "",
          country: "", // delete
          countries: [],
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
                   .finally(() => this.setSearchDone(true));
      },

      setSearchDone(boolean) {
        this.searchDone = boolean;
        wineService.resetObject(this.searchParams);
      },

    },
  };
</script>

<style scoped>
  .button-save { font-weight: bold }
  .full-page-card { margin-bottom: 0 }
  .search-results-table {
    margin-bottom: 4em;
    margin-top: 2em;
  }
  .subheader { padding-left: 0 }
</style>