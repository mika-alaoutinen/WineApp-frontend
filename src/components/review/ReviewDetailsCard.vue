<template>
  <div>
    <div class="subheading">Arvostelut</div>
    <div v-for="review in reviewsWithoutId" :key="review.id">

      <v-expansion-panels accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ review.author + " " + review.rating + "/5" }}
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-row v-for="(value, attribute) in review" :key="attribute">

              <v-col v-if="attribute !== 'wine'" align="start" sm="3">
                {{ dictionary.translate("review", attribute) }}
              </v-col>

              <v-col v-if="attribute !== 'wine'" align="start">
                {{ value }}
              </v-col>
            </v-row>
          </v-expansion-panel-content>

        </v-expansion-panel>
      </v-expansion-panels>
    </div>

  </div>
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
  .subheading {
    font-weight: bold;
    text-align: left;
  }
</style>