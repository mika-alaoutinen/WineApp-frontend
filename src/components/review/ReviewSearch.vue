<template>
  <div>

    <!-- Review search form -->
    <v-card class="full-page-card" max-width="60%">
      <v-card-title class="card-title">Hae arvosteluja</v-card-title>

      <v-form @submit.prevent="submitForm">

        <!-- Review quick search: -->  
        <v-subheader class="subheader">Pikahaut</v-subheader>
        <v-btn-toggle class="quick-search" group>
          <v-btn @click="quickSearch('best')" small>Parhaat</v-btn>
          <v-btn @click="quickSearch('worst')" small>Huonoimmat</v-btn>
          <v-btn @click="quickSearch('newest')" small>Uusimmat</v-btn>
        </v-btn-toggle>

        <!-- Search by author: -->
        <v-subheader class="subheader">Hae arvostelijan nimen perusteella</v-subheader>
        <v-autocomplete
          :items="allAuthors"
          label="Arvostelijan nimi"
          v-model="searchParams.author">
        </v-autocomplete>

        <!-- Search by date range: -->
        <v-subheader class="subheader">Hae arvostelun päivämäärän perusteella</v-subheader>
        <MonthPicker @get:range="getDateRange"></MonthPicker>

        <!-- Search by rating: -->
        <v-subheader class="subheader">Hae arvosanan perusteella</v-subheader>
        <RangeSlider
          @get:range="getRatingRange"
          :defaultRange="rating.defaultRange"
          :step="0.25"
          :switchLabel="'Arvosanahaku päällä'">
        </RangeSlider>

        <button class="button-save">Hae arvosteluja</button>
      </v-form>
    </v-card>

    <br/>

    <!-- Search results table -->
    <v-card class="full-page-card" max-width="60%" v-show="searchDone">
      <v-card-title class="card-title">Haun tulokset</v-card-title>

      <ReviewTable :reviews="foundReviews"/>
    </v-card>

  </div>
</template>

<script>
  import MonthPicker from "@/components/vuetify/MonthPicker.vue";
  import RangeSlider from "@/components/vuetify/RangeSlider.vue";
  import ReviewService from "@/services/ReviewService.js";
  import ReviewTable from "@/components/review/ReviewTable.vue";

  const reviewService = new ReviewService();

  export default {
    components: { MonthPicker, RangeSlider, ReviewTable, },

    computed: {
      allAuthors() {
        const reviews = reviewService.getStore().data.reviews;
        return reviews.map(review => review.author);
      }
    },

    data() {
      return {
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
          author: "",
          dateRange: [],
          ratingRange: [],
          wineId: "",
        },

        // Search results:
        foundReviews: [],
        searchDone: false,
      }
    },

    methods: {
      getDateRange(range) { this.date.range = range },

      getRatingRange(range) { this.rating.range = range },

      quickSearch(searchType) {
        reviewService.quickSearch(searchType, 10)
                     .then(reviews => this.foundReviews = reviews)
                     .finally(() => this.setSearchDone(true));
      },

      submitForm() {
        this.searchParams.dateRange = this.date.range;
        this.searchParams.ratingRange = this.rating.range;

        reviewService.search(this.searchParams)
                     .then(reviews => this.foundReviews = reviews)
                     .finally(() => this.setSearchDone(true));
      },

      setSearchDone(boolean) {
        this.searchDone = boolean;
        reviewService.resetObject(this.searchParams);
      },
      
    }
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