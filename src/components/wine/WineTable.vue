<template>
  <v-data-table
    :headers="translateHeaders"
    :items="getWines"
    :items-per-page="$props.itemsPerPage"
    :search="$props.search"
    loading-text="Haetaan viinejä..."
    no-data-text="Haulla ei löytynyt yhtään tulosta."
    no-results-text="Haulla ei löytynyt yhtään tulosta."
    @click:row="openWineDetails"
  >
    <template v-slot:item.type="{ item }">
      {{ util.translate('wine', item.type) }}
    </template>
  </v-data-table>
</template>

<script>
  import Utilities from '@/utilities/Utilities.js'
  import ReviewService from '@/services/ReviewService.js'

  const reviewService = new ReviewService()

  export default {
    props: {
      itemsPerPage: { type: Number, required: false, default: 10 },
      search: { type: String, required: false, default: '' },
      wines: { type: Array, required: true },
    },

    data() {
      return {
        util: Utilities,
      }
    },
    computed: {
      getWines() {
        const reviews = reviewService.getStore().data.reviews
        return reviewService.calculateAverageRatings(this.$props.wines, reviews)
      },

      translateHeaders() {
        const headers = ['name', 'type', 'country', 'volume', 'price', 'avgrating']

        return headers.map(header => ({
          text: this.util.translate('wine', header),
          value: header
        }))
      }
    },

    methods: {
      openWineDetails(wine) {
        this.$router.push({ name: 'wine', params: { wineId: wine.id } })
      }
    }

  }
</script>