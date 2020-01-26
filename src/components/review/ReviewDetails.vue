<template>
  <v-card class="details-card" max-width="60em">
    <v-img height="25em" src="https://cdn.pixabay.com/photo/2016/10/22/20/34/wine-1761613_960_720.jpg" />
    <v-card-title class="card-title secondary--text">Arvostelun tiedot</v-card-title>

    <div class="card-contents">
      <v-row v-for="(value, attribute) in reviewWithoutId" :key="attribute">

        <!-- Left column for attribute names. -->
        <v-col sm="3">{{ util.translate("review", attribute) }}</v-col>

        <!-- Right column for values. -->
        <!-- Editing mode: -->
        <v-col v-if="editing">
          <DatePickerComponent v-if="attribute === 'date'"
            @get:date="getDate"
            :enabled="true"
            :labelText="'Päivämäärä'"
            :selectedDate="review.date">
          </DatePickerComponent>

          <v-textarea v-else-if="attribute === 'reviewText'"
            auto-grow
            class="ma-0 pa-0"
            v-model="review[attribute]">
          </v-textarea>

          <v-slider v-else-if="attribute === 'rating'"
            :label="util.translate('review', 'rating')"
            min="0.0"
            max="5.0"
            step="0.25"
            ticks
            thumb-label
            v-model="review.rating">
          </v-slider>

          <v-text-field v-else-if="attribute === 'wine'"
            :value="value.name"
            class="ma-0 pa-0"
            disabled>
          </v-text-field>

          <v-text-field v-else
            @keyup.enter="saveEditedReview(review)"
            class="ma-0 pa-0"
            v-model="review[attribute]">
          </v-text-field>
        </v-col>

        <!-- View mode: -->
        <v-col v-else>
          <div v-if="attribute === 'wine'">{{ value.name }}</div>
          <div v-else-if="attribute === 'date'">{{ util.formatDate(value) }}</div>
          <div v-else>{{ value }}</div>
        </v-col>
      </v-row>
    </div>

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
  import DatePickerComponent from "@/components/vuetify/DatePickerComponent.vue";
  import DetailsButtons from "@/components/vuetify/DetailsButtons.vue";
  import ReviewService from "@/services/ReviewService.js";
  import Utilities from "@/utilities/Utilities.js";

  const reviewService = new ReviewService();

  export default {
    components: { DatePickerComponent, DetailsButtons },

    computed: {
      reviewWithoutId() {
        return reviewService.removeObjectId(this.review);
      },
    },

    data() {
      return {
        editing: false,
        review: {},
        util: Utilities
      }
    },

    methods: {
      getDate(date) { this.review.date = date },

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
      reviewId: { required: true }
    },

  };
</script>

<style scoped>
  .card-contents { margin: 0 2em }
  .card-title { padding-left: 1.5em }
  .col {
    padding-bottom: 6px;
    padding-top: 6px;
    text-align: start;
  }
  .details-card { margin: 0 auto 4em }
</style>