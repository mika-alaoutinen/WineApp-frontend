<template>
  <v-card class="full-page-card" max-width="85%">
    <v-card-title class="card-title">Uusimmat arvostelut</v-card-title>

    <v-data-table
      :headers="translateHeaders"
      :items="reviews"
      class="align-left"
      disable-sort
      loading loading-text="Ladataan arvosteluja...">

      <template v-slot:item.wine="{ item }">
        {{ item.wine.name }}
      </template>

    </v-data-table>
    
  </v-card>
</template>

<script>
import Dictionary from "@/utilities/Dictionary.js";
import ReviewService from "@/services/ReviewService.js";

const reviewService = new ReviewService();

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
      reviewService.getNewestReviews(15)
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