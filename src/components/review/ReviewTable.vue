<template>
  <v-data-table
    :headers="translateHeaders"
    :items="$props.reviews"
    :items-per-page="getItemsPerPage"
    :search="$props.search"
    loading-text="Haetaan arvosteluja..."
    no-data-text="Haulla ei löytynyt yhtään tulosta."
    no-results-text="Haulla ei löytynyt yhtään tulosta.">

    <!-- Go to review details page by clicking the author's name. -->
    <template v-slot:item.author="{ item }">
      <button @click="openReviewDetails(item)">{{ item.author }}</button>
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

    <!-- Date columns -->
    <template v-slot:item.date="{ item }">
      {{ util.formatDate(item.date) }}
    </template>

    <!-- Clicking on wine name redirects to wine details page: -->
    <template v-slot:item.wine="{ item }">
      <router-link tag="tr" :to="{ name: 'wine', params: { wineId: + item.wine.id }}">
        {{ item.wine.name }}
      </router-link>
    </template>

  </v-data-table>
</template>

<script>
  import Utilities from "@/utilities/Utilities.js";

  export default {
    computed: {
      getItemsPerPage() {
        return this.$props.itemsPerPage === undefined ? 10 : this.$props.itemsPerPage;
      },

      translateHeaders() {
        const headers = [ "author", "date", "reviewText", "rating", "wine" ];
        return headers.map(header => ({ 
          text: this.util.translate("review", header),
          value: header
        }));
      },
    },
    
    data() {
      return {
        util: Utilities,
      }
    },

    methods: {
      getExcerpt(text) {
        const firstSentence = Array.from(text.split(".")).shift();
        return firstSentence + "...";
      },

      openReviewDetails(review) {
        this.$router.push({ name: "review", params: { reviewId: + review.id } });
      },
    },

    props: {
      itemsPerPage: { type: Number, required: false },
      reviews: { type: Array, required: true },
      search: { type: String, required: false },
    },

  };
</script>

<style scoped>
  /* Hides the borders around epansion panels. */
  .v-expansion-panel:before { box-shadow: none }
</style>