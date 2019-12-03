<template>
  <div id="home-page">
    <p>Maisteltuja viinejä {{ wineCount }} kappaletta.</p>
    <p>Kirjoitettuja arvosteluja {{ reviewCount }} kappaletta.</p>
  </div>
</template>

<script>
  import WineService from "@/services/WineService.js";
  import ReviewService from "@/services/ReviewService.js";

  const wineService = new WineService();
  const reviewService = new ReviewService();

  export default {
    data() {
      return {
        wineCount: 0,
        reviewCount: 0
      }
    },

    mounted() {
      wineService.getWineCount()
                 .then(response => this.wineCount = response.data);
      
      reviewService.getReviewCount()
                   .then(response => this.reviewCount = response.data);
    }
  };
</script>

<style scoped>
</style>