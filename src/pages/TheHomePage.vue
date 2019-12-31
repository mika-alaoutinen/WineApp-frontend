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
      wineService.getCount().then(wines => this.wineCount = wines);
      reviewService.getCount().then(reviews => this.reviewCount = reviews);
    }
  };
</script>