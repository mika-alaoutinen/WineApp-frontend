<template>
  <div>
    <!-- Wine search form -->
    <v-card class="full-page-card">
      <v-card-title class="card-title secondary--text">
        Hae viinejä
      </v-card-title>

      <v-form @submit.prevent>
        <!-- Search wines by name or country -->
        <v-subheader class="subheader">
          Hae nimen tai maan perusteella
        </v-subheader>
        <v-text-field
          id="name-input"
          v-model="searchParams.name"
          label="Nimi"
        />
        <v-autocomplete
          id="country-autocomplete"
          v-model="searchParams.countries"
          :items="allCountries"
          :search-input.sync="searchInput"
          chips
          deletable-chips
          hide-selected
          label="Maa (yksi tai useampi)"
          multiple
          @change="searchInput=''"
        />

        <!-- Search wines by type -->
        <v-subheader class="subheader">
          Hae viinin tyypin perusteella
        </v-subheader>
        <v-radio-group
          id="wine-types-radio-group"
          v-model="searchParams.type"
          row
        >
          <v-radio
            v-for="type in wineTypes"
            :key="type"
            :label="util.translate('wine', type)"
            :value="type.toUpperCase()"
          />
        </v-radio-group>

        <!-- Search wines by volumes -->
        <v-subheader class="subheader">
          Hae määrän perusteella (litraa)
        </v-subheader>
        <v-row id="volume-checkboxes">
          <v-col
            v-for="volume in wineVolumes"
            :key="volume"
          >
            <v-checkbox
              v-model="searchParams.volumes"
              :label="volume.toString()"
              :value="volume"
            />
          </v-col>
        </v-row>

        <!-- Search wines by price range -->
        <v-subheader class="subheader">
          Hae hinnan perusteella (€)
        </v-subheader>
        <RangeSlider
          id="price-range-slider"
          :default-range="price.defaultRange"
          :switch-label="'Hintahaku päällä'"
          @get:range="getRange"
        />

        <v-btn
          id="submit-wine-search"
          class="button-save secondary--text"
          large
          text
          @click="submitForm"
        >
          <v-icon>{{ searchIcon }}</v-icon>
          Hae viinejä
        </v-btn>
      </v-form>
    </v-card>

    <div
      v-show="searchDone"
      class="search-results-table"
    >
      <v-card class="full-page-card">
        <v-card-title class="card-title secondary--text">
          Haun tulokset
        </v-card-title>
        <WineTable :wines="foundWines" />
      </v-card>
    </div>
  </div>
</template>

<script>
  import RangeSlider from '@/components/common/RangeSlider.vue'
  import Utilities, { resetObject } from '@/utilities/Utilities.js'
  import WineService from '@/services/WineService.js'
  import WineTable from '@/components/wine/WineTable.vue'
  import { mdiMagnify } from '@mdi/js'

  const wineService = new WineService()

  export default {
    components: { RangeSlider, WineTable },

    data() {
      return {
        searchIcon: mdiMagnify,

        util: Utilities,
        wineTypes: [ 'sparkling', 'red', 'rose', 'white', 'other' ],
        wineVolumes: [ 0.75, 1, 1.5, 2, 3 ],

        // Contains the input for autocomplete:
        searchInput: '',

        // Placeholders for price search:
        price: {
          defaultRange: [ 0, 50 ],
          range: [],
        },

        // Search parameters that get sent to backend:
        searchParams: {
          name: '',
          type: '',
          countries: [],
          priceRange: [],
          volumes: [],
        },

        // Search results:
        foundWines: [],
        searchDone: false,
      }
    },

    computed: {
      allCountries() {
        const wines = wineService.getStore().data.wines
        return wines.map(wine => wine.country)
      }
    },

    methods: {
      getRange(range) { this.price.range = range },

      submitForm() {
        this.searchParams.priceRange = this.price.range

        wineService.search(this.searchParams)
          .then(wines => this.foundWines = wines)
          .finally(() => this.setSearchDone(true))
      },

      setSearchDone(boolean) {
        this.searchDone = boolean
        resetObject(this.searchParams)
      },

    },
  }
</script>

<style scoped>
  .full-page-card { margin-bottom: 0 }
  .search-results-table {
    margin-bottom: 4em;
    margin-top: 2em;
  }
  .subheader { padding-left: 0 }
</style>