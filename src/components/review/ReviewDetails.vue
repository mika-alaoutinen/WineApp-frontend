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
        <!-- Left column for attributes, or "headers" -->
        <v-col sm="3">
          {{ util.translate("review", attribute) }}
        </v-col>

        <!-- Right column for values: -->
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

    <DetailsEditAndDeleteButtons
      v-if="review"
      :item="review"
      :redirect-route="route"
      @confirm:delete="deleteReview"
    />
  </v-card>
</template>

<script>
  import DetailsEditAndDeleteButtons from '@/components/buttons/DetailsEditAndDeleteButtons.vue'
  import ReviewDetailsHeroImage from '@/components/review/ReviewDetailsHeroImage.vue'
  import ReviewService from '@/services/ReviewService.js'
  import Utilities, { removeObjectId } from '@/utilities/Utilities.js'
  import { getUsername } from '@/services/UserService.js'

  const reviewService = new ReviewService()

  export default {
    components: { DetailsEditAndDeleteButtons, ReviewDetailsHeroImage },

    props: {
      reviewId: { required: true, type: [Number, String] }
    },

    data() {
      return {
        disabled: true,
        editing: false,
        review: null,
        util: Utilities,
      }
    },

    computed: {
      reviewWithoutId() {
        return removeObjectId(this.review)
      },

      route() {
        const reviewWithoutWine = { ...this.review }
        delete reviewWithoutWine.wine

        return {
          name: 'edit-review',
          params: {
            originalReview: reviewWithoutWine,
            wineName: this.review.wine.name,
          }
        }
      }
    },

    async mounted() {
      this.review = await reviewService.get(this.$props.reviewId)
      const username = await getUsername()
      this.disabled = username ? false : true
    },

    methods: {
      deleteReview(confirm) {
        if (confirm) {
          reviewService.delete(this.review.id)
          this.$router.push({ name: 'reviews' })
        }
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