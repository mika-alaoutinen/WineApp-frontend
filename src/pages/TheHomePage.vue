<template>
  <v-card class="full-page-card" min-width="30%" max-width="60%">
    <v-card-title class="card-title secondary--text">Aloitus</v-card-title>
    <p>{{ wineCount }} maisteltua viiniä.</p>
    <p>{{ reviewCount }} Kirjoitettua arvostelua.</p>

    <v-divider/>

    <p>Uusin arvostelu:</p>
    <p>
      <v-icon>{{ wineIcon }}</v-icon>
      <router-link :to="{ name: 'wine', params: { wineId: '' + wine.id }}">
        {{ wine.name }}
      </router-link>
    </p>
    <p>
      <v-icon>{{ reviewerIcon }}</v-icon>
      {{ newestReview.author }}

      <v-icon class="ratingIcon">{{ ratingIcon }}</v-icon>
      <router-link :to="{ name: 'review', params: { reviewId: '' + newestReview.id }}">
        {{ newestReview.rating }}
      </router-link>
    </p>
  </v-card>
</template>

<script>
  import WineService from "@/services/WineService.js";
  import ReviewService from "@/services/ReviewService.js";
  import { mdiAccount, mdiBottleWine, mdiStar } from '@mdi/js';

  const wineService = new WineService();
  const reviewService = new ReviewService();

  export default {
    data() {
      return {
        ratingIcon: mdiStar,
        reviewerIcon: mdiAccount,
        wineIcon: mdiBottleWine,

        newestReview: {},
        wine: {},

        reviewCount: 0,
        wineCount: 0,
      }
    },

    mounted() {
      wineService.getCount().then(wines => this.wineCount = wines);
      reviewService.getCount().then(reviews => this.reviewCount = reviews);

      // Get the newest review:
      reviewService.quickSearch("newest", 1)
                   .then(reviewArray => this.newestReview = reviewArray[0])
                   .then(newestReview => this.wine = newestReview.wine);
    }
  };
</script>
<style scoped>
  p { text-align: left }
  .ratingIcon { margin-left: 1em }
  .v-divider { margin-bottom: 1em }
</style>