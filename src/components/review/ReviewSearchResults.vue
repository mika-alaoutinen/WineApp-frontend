<template>
  <v-card class="full-page-card" max-width="60%" v-show="reviewStore.searchDone">
    <v-card-title class="card-title">Haun tulokset</v-card-title>

    <v-data-table
      :headers="translateHeaders"
      :items="reviewStore.reviews"
      loading-text="Haetaan arvosteluja..."
      no-data-text="Haulla ei löytynyt yhtään tulosta.">

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
            <v-expansion-panel-header expand-icon>{{ getExcerpt(item.reviewText) }}</v-expansion-panel-header>
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

  export default {
    computed: {
      translateHeaders() {
        const headers = [ "author", "date", "reviewText", "rating", "wine" ];
        return headers.map(header => ({ text: this.dictionary.translate("review", header), value: header }));
      }
    },

    data() {
      return {
        dictionary: Dictionary,
        reviewStore: reviewService.getStore().data.searched,
      }
    },

    methods: {
      getExcerpt(text) {
        const firstSentence = Array.from(text.split(".")).shift();
        return firstSentence + "...";
      },
    },

  };
</script>

<style scoped>
  /* Hides the borders around epansion panels. */
  .v-expansion-panel:before { box-shadow: none }
</style>