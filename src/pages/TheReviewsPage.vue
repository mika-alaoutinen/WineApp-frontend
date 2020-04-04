<template>
  <v-card
    class="full-page-card"
    max-width="75%"
  >
    <v-card-title class="card-title secondary--text">
      Arvostelut<v-spacer />
      <v-text-field
        v-model="search"
        :append-icon="searchIcon"
        class="search-bar"
        hide-details
        label="Hae arvosteluja"
        single-line
      />
    </v-card-title>

    <ReviewTable
      :items-per-page="15"
      :reviews="reviewStore.reviews"
      :search="search"
    />
  </v-card>
</template>

<script>
  import ReviewService from '@/services/ReviewService.js'
  import ReviewTable from '@/components/review/ReviewTable.vue'
  import { mdiMagnify } from '@mdi/js'

  export default {
    components: { ReviewTable },

    data() {
      return {
        searchIcon: mdiMagnify,

        reviewStore: new ReviewService().getStore().data,
        search: '',
      }
    },

  }
</script>

<style scoped>
  .full-page-card { margin-bottom: 4em }
</style>