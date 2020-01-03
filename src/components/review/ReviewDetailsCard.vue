<template>
  <v-card class="details-card" max-width="60em">
    <v-card-title class="card-title">Arvostelut</v-card-title>

    <div v-for="review in reviewsWithoutId" :key="review.id">
      <v-row v-for="(value, attribute) in review" :key="attribute">

        <v-col v-if="attribute !== 'wine'" align="start" sm="3">
          {{ dictionary.translate("review", attribute) }}
        </v-col>

        <v-col v-if="attribute !== 'wine'" align="start">
          {{ value }}
        </v-col>
      </v-row>

    </div>
  </v-card>
</template>

<script>
  import Dictionary from "@/utilities/Dictionary.js";
  import ReviewService from "@/services/ReviewService.js";

  const reviewService = new ReviewService();

  export default {
    computed: {
      reviewsWithoutId() {
        return this.$props.reviews.map(review => reviewService.removeObjectId(review));
      },
    },

    data() {
      return {
        dictionary: Dictionary,
      }
    },

    props: {
      reviews: { type: Array, required: true },
    }
  };
</script>

<style scoped>
  .card-title { padding-left: 0 }
</style>