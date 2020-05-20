<template>
  <v-card
    class="details-card"
    max-width="60em"
  >
    <ReviewDetailsHeroImage />

    <v-card-title class="card-title secondary--text">
      Muokkaa arvostelua
    </v-card-title>

    <div class="card-body">
      <!-- Review's author -->
      <v-row>
        <v-col sm="3">
          {{ util.translate('review', 'author') }}
        </v-col>
        <v-col>
          <v-text-field
            v-model="review.author"
            class="ma-0 pa-0"
            @keyup.enter="savereview(review)"
          />
        </v-col>
      </v-row>

      <!-- Review's date -->
      <v-row>
        <v-col sm="3">
          {{ util.translate('review', 'date') }}
        </v-col>
        <v-col>
          <DatePicker
            :enabled="true"
            :label-text="'Päivämäärä'"
            :selected-date="review.date"
            @get:date="setDate"
          />
        </v-col>
      </v-row>

      <!-- Review text field -->
      <v-row>
        <v-col sm="3">
          {{ util.translate('review', 'reviewText') }}
        </v-col>
        <v-col>
          <v-textarea
            v-model="review.reviewText"
            auto-grow
            class="ma-0 pa-0"
          />
        </v-col>
      </v-row>

      <!-- Review rating on scale of 0-5 -->
      <v-row>
        <v-col sm="3">
          {{ util.translate('review', 'rating') }}
        </v-col>
        <v-col>
          <v-slider
            v-model="review.rating"
            min="0.0"
            max="5.0"
            step="0.25"
            ticks
            thumb-label
          />
        </v-col>
      </v-row>

      <!-- Wine name, not possible to edit -->
      <v-row>
        <v-col sm="3">
          {{ util.translate('wine', 'name') }}
        </v-col>
        <v-col>
          <v-text-field
            :value="wineName"
            class="ma-0 pa-0"
            disabled
          />
        </v-col>
      </v-row>
    </div>

    <!-- Buttons for saving and cancelling changes. Probably want to make a component for the buttons
    that emits true or false to indicate editing and cancelling. -->
    <ConfirmEditButtons
      :disabled="disabled"
      @edit:confirm="confirmEdit"
    />
  </v-card>
</template>

<script>
  import ConfirmEditButtons from '@/components/common/ConfirmEditButtons.vue'
  import DatePicker from '@/components/vuetify/DatePicker.vue'
  import ReviewDetailsHeroImage from '@/components/review/ReviewDetailsHeroImage.vue'
  import ReviewService from '@/services/ReviewService.js'
  import Utilities from '@/utilities/Utilities.js'

  const reviewService = new ReviewService()

  export default {
    components: { ConfirmEditButtons, DatePicker, ReviewDetailsHeroImage },

    props: {
      originalReview: { required: true, type: Object },
      wineName: { required: true, type: String },
    },

    data() {
      return {
        util: Utilities,
        disabled: false,
        review: {},
      }
    },

    mounted() {
      // Create deep copy of review
      this.review = JSON.parse(JSON.stringify(this.$props.originalReview))
    },

    methods: {
      setDate(date) { this.review.date = date },

      confirmEdit(confirm) {
        console.log('confirm', confirm)
      }
    },

  }
</script>

<style scoped>
  .card-body { margin: 0 2em }
  .card-title { padding-left: 1.5em }
  .col {
    padding-bottom: 6px;
    padding-top: 6px;
    text-align: start;
  }
  .details-card { margin: 0 auto 4em }
</style>