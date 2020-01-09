<template>
  <v-card class="full-page-card" max-width="75%">
    <v-card-title class="card-title">Arvostelut</v-card-title>

    <ReviewTable :reviews="reviewStore.reviews"/>
  </v-card>
</template>

<script>
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