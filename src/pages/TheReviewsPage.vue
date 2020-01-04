<template>
  <v-card class="full-page-card" max-width="75%">
    <v-card-title class="card-title">Uusimmat arvostelut</v-card-title>

    <ReviewTable/>

  </v-card>
</template>

<script>
  // TODO: Add functionality to load more reviews. => I.e. page two has reviews 11-20, etc.

  import ReviewTable from "@/components/review/ReviewTable.vue";

  export default {
    components: { ReviewTable },
  };
</script>