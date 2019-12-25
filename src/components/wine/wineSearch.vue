<template>
  <div>
    <WineSearchForm @get:wines="getWines" />
    <br>
    <ReviewSearchForm @get:reviews="getReviews" />
    <br>
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
  */
  export default {
    components: {
      WineSearchForm,
      ReviewSearchForm,
      WineSearchResults
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
      },

      getWines(wines) {
        this.wines = wines;
        this.showResults = true;
      }
    }
  };
</script>