<template>
  <v-data-table
    :headers="translateHeaders"
    :items="$props.reviews"
    :items-per-page="getItemsPerPage"
    :search="$props.search"
    loading-text="Haetaan arvosteluja..."
    no-data-text="Haulla ei löytynyt yhtään tulosta."
    no-results-text="Haulla ei löytynyt yhtään tulosta.">

    <!-- Date columns: -->
    <template v-slot:item.date="{ item }">
      {{ util.formatDate(item.date) }}
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

    <!-- Go to review details page by clicking the rating: -->
    <template v-slot:item.rating="{ item }">
      <router-link
        :to="{ name: 'review', params: { reviewId: '' + item.id } }"
        class="primary--text"
        tag="tr"
        text>
        {{ item.rating }}
      </router-link>
    </template>

    <!-- Clicking on wine name redirects to wine details page: -->
    <template v-slot:item.wine="{ item }">
      <router-link
        :to="{ name: 'wine', params: { wineId: '' + item.wine.id }}"
        class="secondary--text"
        tag="tr">
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
        const headers = [ "date", "author", "reviewText", "rating", "wine" ];
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
    },

    props: {
      reviews: { type: Array, required: true },
      itemsPerPage: { type: Number, required: false },
      search: { type: String, required: false },
    },

  };
</script>

<style scoped>
  /* Hides the borders around epansion panels. */
  .v-expansion-panel:before { box-shadow: none }
</style>