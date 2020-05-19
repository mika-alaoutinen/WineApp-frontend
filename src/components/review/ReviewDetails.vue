<template>
  <v-card
    class="details-card"
    max-width="60em"
  >
    <ReviewDetailsHeroImage />

    <v-card-title class="card-title secondary--text">
      Arvostelun tiedot
    </v-card-title>

    <div class="card-body">
      <v-row
        v-for="(value, attribute) in reviewWithoutId"
        :id="attribute"
        :key="attribute"
      >
        <!-- Left column for attribute names. -->
        <v-col sm="3">
          {{ util.translate("review", attribute) }}
        </v-col>

        <!-- View mode: -->
        <v-col>
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
      v-if="review"
      :editing="editing"
      :item="review"
      @delete:item="deleteReview"
      @get:editing="getEditing"
      @save:item="saveEditedReview"
    />

    <v-btn
      id="go-to-edit"
      class="secondary--text"
      large
      text
      :to="{ name: 'edit-review', params: { originalReview: review } }"
    >
      <v-icon>{{ editIcon }}</v-icon>
      Muokkaa
    </v-btn>
  </v-card>
</template>

<script>
  import DetailsButtons from '@/components/vuetify/DetailsButtons.vue'
  import ReviewDetailsHeroImage from '@/components/review/ReviewDetailsHeroImage.vue'
  import ReviewService from '@/services/ReviewService.js'
  import Utilities from '@/utilities/Utilities.js'
  import { mdiPencil } from '@mdi/js'

  const reviewService = new ReviewService()

  export default {
    components: { DetailsButtons, ReviewDetailsHeroImage },

    props: {
      reviewId: { required: true, type: [Number, String] }
    },

    data() {
      return {
        editIcon: mdiPencil,
        util: Utilities,

        editing: false,
        review: null,
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
  .card-body { margin: 0 2em }
  .card-title { padding-left: 1.5em }
  .col {
    padding-bottom: 6px;
    padding-top: 6px;
    text-align: start;
  }
  .details-card { margin: 0 auto 4em }
</style>