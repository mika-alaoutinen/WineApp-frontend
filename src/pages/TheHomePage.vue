<template>
  <v-card class="full-page-card" max-width="60%">
    <v-card-title class="card-title secondary--text">Aloitus</v-card-title>
    <p>{{ wineCount }} maisteltua viiniä.</p>
    <p>{{ reviewCount }} Kirjoitettua arvostelua.</p>
  </v-card>
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
<style scoped>
  p { text-align: left }
</style>