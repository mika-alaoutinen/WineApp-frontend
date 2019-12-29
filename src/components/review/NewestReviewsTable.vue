<template>
  <v-card class="full-page-card" max-width="75%">
    <v-card-title class="card-title">Uusimmat arvostelut</v-card-title>

    <v-data-table
      :headers="translateHeaders"
      :items="reviews"
      disable-sort
      loading-text="Ladataan arvosteluja..."
      no-data-text="Yhtään arvostelua ei löytynyt.">

      <!-- Clicking on wine name redirects to wine details page: -->
      <template v-slot:item.wine="{ item }">
        <router-link tag="tr" :to="{ name: 'Wine', params: { wineId: '' + item.wine.id }}">
          {{ item.wine.name }}
        </router-link>
      </template>

      <!-- Review text column: -->
      <template v-slot:item.reviewText="{ item }">
        <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-expansion-panel-header>{{ getExcerpt(item.reviewText) }}</v-expansion-panel-header>
            <v-expansion-panel-content>{{ item.reviewText }}</v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
    computed: {
      translateHeaders() {
        const headers = [ "author", "date", "reviewText", "rating", "wine" ];
        return headers.map(header => ({ text: this.dictionary.translate("review", header), value: header}));
      },
    },

    data() {
      return {
        dictionary: Dictionary,
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
      reviewService.quickSearch("newest")
                   .then(newestReviews => this.reviews = newestReviews);
    },
  };
</script>

<style scoped>
  .card-title {
    font-weight: bold;
    padding-left: 0;
  }

  /* Hides the borders around epansion panels. */
  .v-expansion-panel:before { box-shadow: none !important }
</style>