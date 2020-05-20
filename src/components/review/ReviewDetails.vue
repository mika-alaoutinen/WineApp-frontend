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

    <!-- Edit and delete buttons -->
    <v-btn
      v-if="review"
      id="go-to-edit"
      class="secondary--text"
      large
      text
      :disabled="disabled"
      :to="{ name: 'edit-review', params: createParams }"
    >
      <v-icon>{{ editIcon }}</v-icon>
      Muokkaa
    </v-btn>
  </v-card>
</template>

<script>
  import ReviewDetailsHeroImage from '@/components/review/ReviewDetailsHeroImage.vue'
  import ReviewService from '@/services/ReviewService.js'
  import Utilities, { removeObjectId } from '@/utilities/Utilities.js'
  import { getUsername } from '@/services/UserService.js'
  import { mdiPencil } from '@mdi/js'

  const reviewService = new ReviewService()

  export default {
    components: { ReviewDetailsHeroImage },

    props: {
      reviewId: { required: true, type: [Number, String] }
    },

    data() {
      return {
        editIcon: mdiPencil,
        util: Utilities,

        disabled: true,
        editing: false,
        review: null,
      }
    },

    computed: {
      reviewWithoutId() {
        return removeObjectId(this.review)
      },

      createParams() {
        const reviewWithoutWine = { ...this.review }
        delete reviewWithoutWine.wine

        return {
          originalReview: reviewWithoutWine,
          wineName: this.review.wine.name
        }
      }
    },

    async mounted() {
      this.review = await reviewService.get(this.$props.reviewId)

      const username = await getUsername()
      this.disabled = username ? false : true
    },

    methods: {
      deleteReview(review) {
        reviewService.delete(review.id)
        this.$router.push({ name: 'reviews' })
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