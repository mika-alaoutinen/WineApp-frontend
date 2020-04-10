<template>
  <v-card
    class="details-card"
    max-width="60em"
  >
    <v-img
      height="25em"
      :src="require('../../../public/assets/review.png')"
    />
    <v-card-title class="card-title secondary--text">
      Arvostelun tiedot
    </v-card-title>

    <div class="card-contents">
      <v-row
        v-for="(value, attribute) in reviewWithoutId"
        :id="attribute"
        :key="attribute"
      >
        <!-- Left column for attribute names. -->
        <v-col sm="3">
          {{ util.translate("review", attribute) }}
        </v-col>

        <!-- Right column for values. -->
        <!-- Editing mode: -->
        <v-col v-if="editing">
          <DatePicker
            v-if="attribute === 'date'"
            :enabled="true"
            :label-text="'Päivämäärä'"
            :selected-date="review.date"
            @get:date="getDate"
          />

          <v-textarea
            v-else-if="attribute === 'reviewText'"
            v-model="review[attribute]"
            auto-grow
            class="ma-0 pa-0"
          />

          <v-slider
            v-else-if="attribute === 'rating'"
            v-model="review.rating"
            :label="util.translate('review', 'rating')"
            min="0.0"
            max="5.0"
            step="0.25"
            ticks
            thumb-label
          />

          <v-text-field
            v-else-if="attribute === 'wine'"
            :value="value.name"
            class="ma-0 pa-0"
            disabled
          />

          <v-text-field
            v-else
            v-model="review[attribute]"
            class="ma-0 pa-0"
            @keyup.enter="saveEditedReview(review)"
          />
        </v-col>

        <!-- View mode: -->
        <v-col v-else>
          <div v-if="attribute === 'wine'">
            {{ value.name }}
          </div>
          <div v-else-if="attribute === 'date'">
            {{ util.formatDate(value) }}
          </div>
          <div v-else>
            {{ value }}
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- Edit and delete buttons -->
    <DetailsButtons
      :editing="editing"
      :item="review"
      @delete:item="deleteReview"
      @get:editing="getEditing"
      @save:item="saveEditedReview"
    />
  </v-card>
</template>

<script>
  import DatePicker from '@/components/vuetify/DatePicker.vue'
  import DetailsButtons from '@/components/vuetify/DetailsButtons.vue'
  import ReviewService from '@/services/ReviewService.js'
  import Utilities from '@/utilities/Utilities.js'

  const reviewService = new ReviewService()

  export default {
    components: { DatePicker, DetailsButtons },

    props: {
      reviewId: { required: true, type: [Number, String] }
    },

    data() {
      return {
        editing: false,
        review: {},
        util: Utilities
      }
    },

    computed: {
      reviewWithoutId() {
        return reviewService.removeObjectId(this.review)
      },
    },

    mounted() {
      reviewService.get(this.$props.reviewId)
        .then(review => this.review = review)
    },

    methods: {
      getDate(date) { this.review.date = date },

      getEditing(boolean) { this.editing = boolean },

      deleteReview(review) {
        reviewService.delete(review.id)
        this.$router.push({ name: 'reviews' })
      },

      saveEditedReview(review) {
        reviewService.put(review.id, review)
        this.editing = false
      },
    },

  }
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