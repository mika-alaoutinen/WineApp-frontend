<template>
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

      <!-- TODO: Maybe change to a select-component..? -->
      <!-- Search by author: -->
      <v-subheader class="subheader">Hae arvostelijan nimen perusteella</v-subheader>
      <v-text-field label="Arvostelijan nimi" v-model="searchParams.author"/>

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
</template>

<script>
  import MonthPicker from "@/components/vuetify/MonthPicker.vue";
  import RangeSlider from "@/components/vuetify/RangeSlider.vue";
  import ReviewService from "@/services/ReviewService.js";

  const reviewService = new ReviewService();

  export default {
    components: {
      MonthPicker,
      RangeSlider,
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
        }
      }
    },

    methods: {
      getDateRange(range) { this.date.range = range },

      getRatingRange(range) { this.rating.range = range },

      quickSearch(searchType) {
        reviewService.quickSearch(searchType, 10)
                     .then(reviews => this.$emit("get:reviews", reviews));
      },

      submitForm() {
        this.searchParams.dateRange = this.date.range;
        this.searchParams.ratingRange = this.rating.range;

        reviewService.search(this.searchParams)
                     .then(reviews => reviewService.saveSearchResults(reviews));

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
  .card-title {
    font-weight: bold;
    padding-left: 0;
  }
  .slider-value-field { width: 60px }
  .slider-value-field >>> input { text-align: center }
  .subheader { padding-left: 0 }
</style>