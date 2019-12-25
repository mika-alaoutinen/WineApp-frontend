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
      </v-btn-toggle>

      <!-- TODO: Maybe change to a select-component..? -->
      <!-- Search by author: -->
      <v-subheader class="subheader">Hae arvostelijan nimen perusteella</v-subheader>
      <v-text-field label="Nimi" v-model="searchParams.author"/>

      <!-- Search by date range: -->

      <!-- Search by rating: -->

      
    </v-form>

  </v-card>
</template>

<script>
  import ReviewService from "@/services/ReviewService.js";
  const reviewService = new ReviewService();

  export default {
    data() {
      return {
        // Search parameters that get sent to backend:
        searchParams: {
          author: "",
          date: "",
          rating: 0,
          wineId: "",
        }
      }
    },

    methods: {
      doQuickSearch(searchType) {
        reviewService.quickSearch(searchType, 10)
                     .then(reviews => this.$emit("get:reviews", reviews));
      },

      submitForm() {
        reviewService.searchReviews(this.searchParams)
                     .then(reviews => this.$emit("get:reviews", reviews))
      }
    }
  };
</script>

<style scoped>
  .subheader { padding-left: 0 }
</style>