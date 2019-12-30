<template>
  <v-card class="full-page-card" max-width="75%">
    <v-card-title class="card-title">Uusimmat arvostelut</v-card-title>

    <ReviewTable :reviews="reviews"/>

  </v-card>
</template>

<script>
  import ReviewService from "@/services/ReviewService.js";
  import ReviewTable from "@/components/review/ReviewTable.vue";

/*
TODO:
  - Add functionality to load more reviews. => I.e. page two has reviews 11-20, etc.
*/

  export default {
    components: { ReviewTable },

    data() {
      return {
        reviews: [],
      }
    },

    methods: {
      getExcerpt(text) {
        const firstSentence = Array.from(text.split(".")).shift();
        return firstSentence + "...";
      },
    },

    mounted() {
      new ReviewService()
        .quickSearch("newest")
        .then(newestReviews => this.reviews = newestReviews);
    },

  };
</script>