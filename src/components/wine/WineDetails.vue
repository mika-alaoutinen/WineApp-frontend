<template>
  <v-card
    class="details-card"
    max-width="60em"
  >
    <WineDetailsHeroImage
      v-if="wine"
      :wine-type="wine.type"
    />

    <v-card-title class="card-title secondary--text">
      Viinin tiedot
    </v-card-title>

    <div class="card-body">
      <v-row
        v-for="(value, attribute) in wineWithoutId"
        :id="attribute"
        :key="attribute"
      >
        <!-- Left column for attribute names, or "headers" -->
        <v-col sm="3">
          {{ util.translate("wine", attribute) }}
        </v-col>

        <!-- Right column for values. -->
        <v-col>
          <div v-if="attribute === 'type'">
            {{ util.translate("wine", value) }}
          </div>

          <div v-else-if="attribute === 'description' || attribute === 'foodPairings'">
            <v-chip
              v-for="keyword in value"
              :key="keyword"
            >
              {{ keyword }}
            </v-chip>
          </div>

          <div v-else-if="attribute === 'url'">
            <a :href="value">{{ validateUrl(value) }}</a>
          </div>

          <div v-else>
            {{ value }}
          </div>
        </v-col>
      </v-row>

      <DetailsEditAndDeleteButtons
        v-if="wine"
        :item="wine"
        :redirect-route="route"
        @confirm:delete="deleteWine"
      />

      <!-- Show reviews of the wine: -->
      <ReviewDetailsCard :reviews="reviews" />
    </div>
  </v-card>
</template>

<script>
  import DetailsEditAndDeleteButtons from '@/components/common/DetailsEditAndDeleteButtons.vue'
  import ReviewDetailsCard from '@/components/review/ReviewDetailsCard.vue'
  import ReviewService from '@/services/ReviewService.js'
  import WineDetailsHeroImage from '@/components/wine/WineDetailsHeroImage.vue'
  import Utilities, { removeObjectId } from '@/utilities/Utilities.js'
  import WineService from '@/services/WineService.js'

  const reviewService = new ReviewService()
  const wineService = new WineService()

  export default {
    components: { DetailsEditAndDeleteButtons, ReviewDetailsCard, WineDetailsHeroImage },

    props: {
      wineId: { required: true, type: [Number, String] },
    },

    data() {
      return {
        wineImage: '',
        util: Utilities,

        reviews: [],
        wineTypes: [ 'sparkling', 'red', 'rose', 'white', 'other' ],
        wine: null
      }
    },

    computed: {
      wineWithoutId() {
        return removeObjectId(this.wine)
      },

      route() {
        return {
          name: 'edit-wine',
          params: { originalWine: this.wine },
        }
      }
    },

    async mounted() {
      this.wine = await wineService.get(this.$props.wineId)
      const type = this.wine.type.toLowerCase()
      this.wineImage = type
        ? require('@/../public/assets/wine-images/' + type + '.png')
        : require('@/../public/assets/wine-images/wines.png')

      this.reviews = await reviewService.getByWineId(this.$props.wineId)
    },

    methods: {
      deleteWine(wine) {
        console.log('delete wine', this.wine)
        // wineService.delete(wine.id)
        // this.$router.push({ name: 'wines' })
      },

      validateUrl(url) {
        return url.includes('http') || url.includes('https') ? url : ''
      },
    }
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