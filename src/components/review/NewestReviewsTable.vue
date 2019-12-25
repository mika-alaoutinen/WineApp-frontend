<template>
  <v-card class="full-page-card" max-width="85%">
    <v-card-title class="card-title">Uusimmat arvostelut</v-card-title>

    <v-data-table
      :headers="translateHeaders"
      :items="reviews"
      class="align-left"
      disable-sort
      loading loading-text="Ladataan arvosteluja...">

      <!-- Clicking on wine name redirects to wine details page: -->
      <template v-slot:item.wine="{ item }">
        <router-link tag="tr" :to="'wines/' + item.wine.id">
          {{ item.wine.name }}
        </router-link>
      </template>
    </v-data-table>
    
  </v-card>
</template>

<script>
import Dictionary from "@/utilities/Dictionary.js";
import ReviewService from "@/services/ReviewService.js";

const reviewService = new ReviewService();

/*
TODO:
  - Add functionality to load more reviews. => I.e. page two has reviews 11-20, etc.
*/

  export default {
    data() {
      return {
        dictionary: Dictionary,
        reviews: [],
      }
    },

    computed: {
      translateHeaders() {
        const headers = [ "author", "date", "reviewText", "rating", "wine" ];
        return headers.map(header => ({ text: this.dictionary.translate(header), value: header}));
      }
    },

    methods: {},

    mounted() {
      reviewService.getNewestReviews()
                   .then(newestReviews => this.reviews = newestReviews);
    },
  };
</script>

<style scoped>
  .align-left { text-align: left }
  .card-title {
    font-weight: bold;
    padding-left: 0;
  }
</style>