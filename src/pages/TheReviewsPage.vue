<template>
  <v-card class="full-page-card" max-width="75%">
    <v-card-title class="card-title secondary--text">Arvostelut<v-spacer/>
      <v-text-field
        class="search-bar"
        hide-details
        label="Hae arvosteluja"
        single-line
        v-model="search">
      </v-text-field>   
    </v-card-title>

    <ReviewTable
      :itemsPerPage="15"
      :reviews="reviewStore.reviews"
      :search="search"/>
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
        search: "",
      }
    },

  };
</script>

<style scoped>
  .full-page-card { margin-bottom: 4em }
</style>