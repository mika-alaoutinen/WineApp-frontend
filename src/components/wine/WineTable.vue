<template>
  <v-data-table
    @click:row="openWineDetails"
    :headers="translateHeaders"
    :items="getWines"
    :items-per-page="getItemsPerPage"
    :search="$props.search"
    loading-text="Haetaan viinejä..."
    no-data-text="Haulla ei löytynyt yhtään tulosta."
    no-results-text="Haulla ei löytynyt yhtään tulosta.">

    <template v-slot:item.type="{ item }">
      {{ dictionary.translate('wine', item.type) }}
    </template>

  </v-data-table>
</template>

<script>
  import Dictionary from "@/utilities/Dictionary.js";
  import ReviewService from "@/services/ReviewService.js";

  const reviewService = new ReviewService();

  export default {
    computed: {
      getItemsPerPage() {
        return this.$props.itemsPerPage === undefined ? 10 : this.$props.itemsPerPage;
      },

      getWines() {
        const reviews = reviewService.getStore().data.reviews;
        return reviewService.calculateAverageRatings(this.$props.wines, reviews);
      },

      translateHeaders() {
        const headers = ["name", "type", "country", "price", "volume", "avgrating"];

        return headers.map(header => ({ 
          text: this.dictionary.translate("wine", header),
          value: header
        }));
      }
    },

    data() {
      return {
        dictionary: Dictionary,
      };
    },

    methods: {
      openWineDetails(wine) {
        this.$router.push({ name: "wine", params: { wineId: + wine.id }});
      }
    },

    props: {
      itemsPerPage: { type: Number, required: false },
      search: { type: String, required: false },
      wines: { type: Array, required: true },
    }

};
</script>