<template>
  <div>
    <v-tabs centered>
      
      <v-tab>Hae viinejä</v-tab>
      <v-tab-item>
        <WineSearchForm @get:wines="getWines" />
      </v-tab-item>
      
      <v-tab>Hae arvosteluja</v-tab>
      <v-tab-item>
        <ReviewSearchForm @get:reviews="getReviews" />
      </v-tab-item>

    </v-tabs>

    <WineSearchResults :searchResults="wines" :showResults="showResults" />
  </div>
</template>

<script>
  import ReviewSearchForm from "@/components/review/ReviewSearchForm.vue";
  import WineSearchForm from "@/components/wine/WineSearchForm.vue";
  import WineSearchResults from "@/components/wine/WineSearchResults.vue";
  
  /*
  TODO:
    - What to do with review results? Add ReviewSearchResults component?
    - Have wine and review searches be on their own tabs?
  */

  export default {
    components: {
      ReviewSearchForm,
      WineSearchForm,
      WineSearchResults,
    },

    data() {
      return {
        reviews: [],
        wines: [],
        showResults: false,
      }
    },

    methods: {
      getReviews(reviews) {
        this.reviews = reviews;
        this.showResults = true;
        console.log(this.reviews);
      },

      getWines(wines) {
        this.wines = wines;
        this.showResults = true;
      }
    }
  };
</script>