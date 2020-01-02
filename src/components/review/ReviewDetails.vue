<template>
  <v-card class="details-card" max-width="60em">
    <v-img
      height="25em"
      src="https://cdn.pixabay.com/photo/2016/10/22/20/34/wine-1761613_960_720.jpg">
    </v-img>
    <v-card-title class="card-title">Viinin tiedot</v-card-title>

    <v-row v-for="(value, attribute) in displayReview" :key="attribute">

      <!-- Left column for attribute names. -->
      <v-col align="start" class="attribute-text" sm="3">
        {{ dictionary.translate("review", attribute) }}
      </v-col>

      <!-- Right column for values. -->
      <!-- Editing mode: -->
      <v-text-field v-if="editing"
        @keyup.enter="saveEditedReview(review)"
        align="start"
        class="text-field"
        v-model="review[attribute]">
      </v-text-field>

      <!-- View mode: -->
      <!-- Don't allow editing wine here -->
      <v-col v-else align="start">
        <div v-if="attribute === 'wine'">{{ value.name }}</div>
        <div v-else>{{ value }}</div>
      </v-col>
    </v-row>

    <!-- Edit and delete buttons -->
    <DetailsButtons
      @delete:item="deleteReview"
      @get:editing="getEditing"
      @save:item="saveEditedReview"
      :editing="editing"
      :item="review">
    </DetailsButtons>
    
  </v-card>
</template>

<script>

  /* TODO:
    - Explore nicer options for displaying the data.
  */

  import DetailsButtons from "@/components/vuetify/DetailsButtons.vue";
  import ReviewService from "@/services/ReviewService.js";
  import Dictionary from "@/utilities/Dictionary.js";

  const reviewService = new ReviewService();

  export default {
    components: { DetailsButtons },

    computed: {
      displayReview() {
        const reviewCopy = Object.assign({}, this.review);
        delete reviewCopy.id;
        return reviewCopy;
      },
    },

    data() {
      return {
        dictionary: Dictionary,
        editing: false,
        review: {},
      }
    },

    methods: {
      getEditing(boolean) { this.editing = boolean },
      
      deleteReview(review) {
        reviewService.delete(review.id);
        this.$router.push({ name: "reviews" });
      },
      
      saveEditedReview(review) {
        reviewService.put(review.id, review);
        this.editing = false;
      },
    },

    mounted() {
      reviewService.get(this.$props.reviewId)
                   .then(review => this.review = review);
    },

    props: {
      reviewId: { type: String, required: true }
    },

  };
</script>

<style scoped>
  .card-title { padding-left: 0 }
  .text-field { padding-top: 0 }
</style>