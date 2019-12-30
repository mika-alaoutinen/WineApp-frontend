<template>
  <v-card class="full-page-card" max-width="60%" v-show="wineStore.searchDone">

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
        reviewStore: reviewService,
      }
    }
  };
</script>