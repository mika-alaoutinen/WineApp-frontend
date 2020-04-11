<template>
  <div>
    <!-- Review search form -->
    <v-card class="full-page-card">
      <v-card-title class="card-title secondary--text">
        Hae arvosteluja
      </v-card-title>

      <v-form @submit.prevent>
        <!-- Review quick search: -->
        <v-subheader class="subheader">
          Pikahaut
        </v-subheader>
        <v-btn-toggle
          class="quick-search"
          group
        >
          <v-btn
            class="primary--text"
            small
            @click="quickSearch('best')"
          >
            Parhaat
          </v-btn>
          <v-btn
            class="primary--text"
            small
            @click="quickSearch('worst')"
          >
            Huonoimmat
          </v-btn>
          <v-btn
            class="primary--text"
            small
            @click="quickSearch('newest')"
          >
            Uusimmat
          </v-btn>
        </v-btn-toggle>

        <!-- Search by author: -->
        <v-subheader class="subheader">
          Hae arvostelijan nimen perusteella
        </v-subheader>
        <v-autocomplete
          v-model="searchParams.author"
          :items="allAuthors"
          label="Arvostelijan nimi"
        />

        <!-- Search by date range: -->
        <v-subheader class="subheader">
          Hae arvostelun päivämäärän perusteella
        </v-subheader>
        <MonthPicker @get:range="getDateRange" />

        <!-- Search by rating: -->
        <v-subheader class="subheader">
          Hae arvosanan perusteella
        </v-subheader>
        <RangeSlider
          :default-range="rating.defaultRange"
          :step="0.25"
          :switch-label="'Arvosanahaku päällä'"
          @get:range="getRatingRange"
        />

        <v-btn
          id="submit-review-search"
          class="button-save secondary--text"
          large
          text
          @click="submitForm"
        >
          <v-icon>{{ searchIcon }}</v-icon>
          Hae arvosteluja
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
        <ReviewTable :reviews="foundReviews" />
      </v-card>
    </div>
  </div>
</template>

<script>
  import MonthPicker from '@/components/vuetify/MonthPicker.vue'
  import RangeSlider from '@/components/vuetify/RangeSlider.vue'
  import ReviewService from '@/services/ReviewService.js'
  import ReviewTable from '@/components/review/ReviewTable.vue'
  import { mdiMagnify } from '@mdi/js'

  const reviewService = new ReviewService()

  export default {
    components: { MonthPicker, RangeSlider, ReviewTable, },

    data() {
      return {
        searchIcon: mdiMagnify,

        // Placeholders for date search:
        date: {
          range: [],
        },

        // Placeholders for rating search:
        rating: {
          defaultRange: [ 0.0, 5.0 ],
          range: [],
        },

        // Search parameters that get sent to backend:
        searchParams: {
          author: '',
          dateRange: [],
          ratingRange: [],
          wineId: '',
        },

        // Search results:
        foundReviews: [],
        searchDone: false,
      }
    },

    computed: {
      allAuthors() {
        const reviews = reviewService.getStore().data.reviews
        return reviews.map(review => review.author)
      }
    },

    methods: {
      getDateRange(range) { this.date.range = range },

      getRatingRange(range) { this.rating.range = range },

      quickSearch(searchType) {
        reviewService.quickSearch(searchType, 10)
          .then(reviews => this.foundReviews = reviews)
          .finally(() => this.setSearchDone(true))
      },

      submitForm() {
        this.searchParams.dateRange = this.date.range
        this.searchParams.ratingRange = this.rating.range

        reviewService.search(this.searchParams)
          .then(reviews => this.foundReviews = reviews)
          .finally(() => this.setSearchDone(true))
      },

      setSearchDone(boolean) {
        this.searchDone = boolean
        reviewService.resetObject(this.searchParams)
      },

    }
  }
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