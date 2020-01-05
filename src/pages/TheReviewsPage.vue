<template>
  <v-card class="full-page-card" max-width="75%">
    <v-card-title class="card-title">Uusimmat arvostelut</v-card-title>

    <ReviewTable :reviews="reviewStore.reviews"/>
  </v-card>
</template>

<script>
  // TODO: Add functionality to load more reviews. => I.e. page two has reviews 11-20, etc.
  // TODO: delete this page?

  import ReviewService from "@/services/ReviewService.js";
  import ReviewTable from "@/components/review/ReviewTable.vue";

  export default {
    components: { ReviewTable },

    data() {
      return {
        reviewStore: new ReviewService().getStore().data,
      }
    },

  };
</script>