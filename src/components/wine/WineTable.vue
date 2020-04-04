<template>
  <v-data-table
    :headers="translateHeaders"
    :items="getWines"
    :items-per-page="getItemsPerPage"
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
      itemsPerPage: { type: Number, required: false },
      search: { type: String, required: false },
      wines: { type: Array, required: true },
    },

    data() {
      return {
        util: Utilities,
      }
    },
    computed: {
      getItemsPerPage() {
        return this.$props.itemsPerPage === undefined ? 10 : this.$props.itemsPerPage
      },

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
        this.$router.push({ name: 'wine', params: { wineId: + '' + wine.id } })
      }
    }

  }
</script>