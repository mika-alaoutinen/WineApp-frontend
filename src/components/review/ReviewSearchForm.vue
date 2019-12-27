<template>
  <v-card class="full-page-card" max-width="60%">
    <v-card-title class="card-title">Hae arvosteluja</v-card-title>

    <v-form @submit.prevent="submitForm">

      <!-- Review quick search: -->  
      <v-subheader class="subheader">Pikahaut</v-subheader>
      <v-btn-toggle class="quick-search" group>
        <v-btn @click="doQuickSearch('best')" small>Parhaat</v-btn>
        <v-btn @click="doQuickSearch('worst')" small>Huonoimmat</v-btn>
        <v-btn @click="doQuickSearch('newest')" small>Uusimmat</v-btn>
        <v-btn @click="doSearch()" small>testi</v-btn>

      </v-btn-toggle>

      <!-- TODO: Maybe change to a select-component..? -->
      <!-- Search by author: -->
      <v-subheader class="subheader">Hae arvostelijan nimen perusteella</v-subheader>
      <v-text-field label="Arvostelijan nimi" v-model="searchParams.author"/>

      <!-- Search by date range: -->

      <!-- Search by rating: -->
      <v-subheader class="subheader">Hae arvosanan perusteella</v-subheader>
      <v-switch
        @change="resetSlider"
        label="Arvosanahaku päällä"
        v-model=searchEnabled>
      </v-switch>

      <v-range-slider
        :disabled=!searchEnabled
        :min=minRating
        :max=maxRating
        step="0.25"
        ticks
        tick-size="4"
        v-model="selectedRange">

        <template v-slot:prepend>
          <v-text-field
            class="slider-value-field"
            single-line
            type="number"
            v-model="selectedRange[0]">
          </v-text-field>
        </template>

        <template v-slot:append>
          <v-text-field
            class="slider-value-field"
            single-line
            type="number"
            v-model="selectedRange[1]">
          </v-text-field>
        </template>
        
      </v-range-slider>
      
    </v-form>

  </v-card>
</template>

<script>
  import ReviewService from "@/services/ReviewService.js";
  const reviewService = new ReviewService();

  export default {
    data() {
      return {
        minRating: 0.0,
        maxRating: 5.0,
        searchEnabled: false,
        selectedRange: [0.0, 5.0],

        // Search parameters that get sent to backend:
        searchParams: {
          author: "",
          date: "",
          ratingRange: [],
          wineId: "",
        }
      }
    },

    methods: {
      doQuickSearch(searchType) {
        reviewService.quickSearch(searchType, 10)
                     .then(reviews => this.$emit("get:reviews", reviews));
      },

      // TODO: delete
      doSearch() {
        reviewService.search(this.searchParams).then(response => console.log(response));
      },

      resetSlider() {
        this.searchParams.ratingRange = [ this.minRating, this.maxRating ];
      },

      submitForm() {
        reviewService.search(this.searchParams)
                     .then(reviews => this.$emit("get:reviews", reviews))
      }
    }
  };
</script>

<style scoped>
  .subheader { padding-left: 0 }
  .card-title {
    font-weight: bold;
    padding-left: 0;
  }
  .slider-value-field { width: 60px }
  .slider-value-field >>> input { text-align: center }
</style>